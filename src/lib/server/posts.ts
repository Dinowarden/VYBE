import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware, optionalAuthMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { parseHashtags } from "@/lib/hashtags";
import { isSafeImageUrl } from "@/lib/image";
import { isSafeVideoUrl } from "@/lib/clip";
import { ensureDemoPosts } from "@/lib/server/seed";
import { normalizeUsername } from "@/lib/validation/auth";
import type { FeedPost, PublicUser } from "@/lib/types";

type PostSql = {
  id: string;
  kind: "text" | "image" | "video";
  caption: string;
  like_count: number;
  comment_count: number;
  share_count: number;
  save_count: number;
  view_count: number;
  created_at: string;
  author_id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string | null;
  follower_count: number;
  following_count: number;
  like_total: number;
};

type MediaSql = {
  post_id: string;
  url: string;
  kind: string;
  mime: string | null;
  width: number | null;
  height: number | null;
  duration_ms: number | null;
  position: number;
};

function asIso(value: string) {
  if (/^\d{4}-\d{2}-\d{2}/.test(value) && value.includes("T")) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString();
}

function toAuthor(row: PostSql): PublicUser {
  return {
    id: row.author_id,
    username: row.username,
    displayName: row.display_name,
    bio: row.bio,
    avatarUrl: row.avatar_url ?? "",
    followerCount: Number(row.follower_count),
    followingCount: Number(row.following_count),
    likeCount: Number(row.like_total),
  };
}

async function attachMediaAndTags(
  sql: Awaited<ReturnType<typeof getSql>>,
  rows: PostSql[],
  followingIds: Set<string>,
  viewerId: string | null,
): Promise<FeedPost[]> {
  if (!rows.length) return [];
  const posts: FeedPost[] = [];
  for (const row of rows) {
    const media = await sql<MediaSql>`
      select post_id, url, kind, mime, width, height, duration_ms, position
      from media where post_id = ${row.id} order by position
    `;
    const tags = await sql<{ tag: string }>`
      select h.tag
      from content_hashtag ch
      join hashtag h on h.id = ch.hashtag_id
      where ch.post_id = ${row.id}
    `;
    const poster = media.find((item) => item.kind === "poster");
    const playable = media.filter((item) => item.kind !== "poster");
    const assets = (playable.length ? playable : media).map((item) => ({
      url: item.url,
      posterUrl: item.kind === "video" ? poster?.url : undefined,
      mime: item.mime ?? undefined,
      width: item.width ?? undefined,
      height: item.height ?? undefined,
      durationMs: item.duration_ms ?? undefined,
    }));
    const savedHit = viewerId
      ? await sql<{ x: number }>`
          select 1 as x from save where user_id = ${viewerId} and post_id = ${row.id} limit 1
        `
      : [];
    const likedHit = viewerId
      ? await sql<{ x: number }>`
          select 1 as x from likes
          where user_id = ${viewerId} and target_type = ${"post"} and target_id = ${row.id}
          limit 1
        `
      : [];
    posts.push({
      id: row.id,
      author: toAuthor(row),
      kind: row.kind,
      caption: row.caption,
      hashtags: tags.map((item) => item.tag),
      createdAt: asIso(String(row.created_at)),
      likeCount: Number(row.like_count),
      commentCount: Number(row.comment_count),
      shareCount: Number(row.share_count),
      saveCount: Number(row.save_count),
      viewCount: Number(row.view_count),
      media: assets,
      liked: Boolean(likedHit[0]),
      saved: Boolean(savedHit[0]),
      followingAuthor: Boolean(viewerId && viewerId !== row.author_id && followingIds.has(row.author_id)),
    });
  }
  return posts;
}

async function followingSet(sql: Awaited<ReturnType<typeof getSql>>, viewerId: string | null) {
  if (!viewerId) return new Set<string>();
  const edges = await sql<{ id: string }>`
    select following_id as id from follow where follower_id = ${viewerId}
  `;
  return new Set(edges.map((row) => row.id));
}

export const createPost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z
      .object({
        kind: z.enum(["text", "image", "video"]),
        caption: z.string().max(500),
        imageUrl: z.string().max(800_000).nullable().optional(),
        videoUrl: z.string().max(6_000_000).nullable().optional(),
        posterUrl: z.string().max(800_000).nullable().optional(),
        mime: z.string().max(80).nullable().optional(),
        width: z.number().int().positive().optional(),
        height: z.number().int().positive().optional(),
        durationMs: z.number().int().positive().max(60_000).optional(),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const caption = data.caption.trim();
    if (data.kind === "text" && !caption) throw new Error("Write something first.");
    if (data.kind === "image") {
      if (!data.imageUrl || !isSafeImageUrl(data.imageUrl)) throw new Error("Add a photo first.");
    }
    if (data.kind === "video") {
      if (!data.videoUrl || !isSafeVideoUrl(data.videoUrl)) throw new Error("Add a clip first.");
      if (!data.durationMs || data.durationMs > 60_000) throw new Error("Clips must be 60 seconds or shorter.");
    }

    const sql = await getSql();
    const me = await sql<{ username: string }>`
      select username from profile where user_id = ${context.userId} and is_suspended = false limit 1
    `;
    if (!me[0]) throw new Error("Finish joining VYBE first.");

    const id = `p_${crypto.randomUUID()}`;
    await sql`
      insert into post (id, author_id, kind, caption)
      values (${id}, ${context.userId}, ${data.kind}, ${caption})
    `;

    if (data.kind === "image" && data.imageUrl) {
      await sql`
        insert into media (id, post_id, kind, url, mime, width, height, position)
        values (
          ${`m_${crypto.randomUUID()}`},
          ${id},
          ${"image"},
          ${data.imageUrl},
          ${"image/jpeg"},
          ${data.width ?? null},
          ${data.height ?? null},
          ${0}
        )
      `;
    }

    if (data.kind === "video" && data.videoUrl) {
      await sql`
        insert into media (id, post_id, kind, url, mime, width, height, duration_ms, position)
        values (
          ${`m_${crypto.randomUUID()}`},
          ${id},
          ${"video"},
          ${data.videoUrl},
          ${data.mime ?? "video/mp4"},
          ${data.width ?? null},
          ${data.height ?? null},
          ${data.durationMs ?? null},
          ${0}
        )
      `;
      if (data.posterUrl && isSafeImageUrl(data.posterUrl)) {
        await sql`
          insert into media (id, post_id, kind, url, mime, width, height, position)
          values (
            ${`m_${crypto.randomUUID()}`},
            ${id},
            ${"poster"},
            ${data.posterUrl},
            ${"image/jpeg"},
            ${data.width ?? null},
            ${data.height ?? null},
            ${1}
          )
        `;
      }
    }

    for (const tag of parseHashtags(caption)) {
      const tagId = `h_${tag}`;
      await sql`
        insert into hashtag (id, tag, use_count)
        values (${tagId}, ${tag}, 1)
        on conflict (tag) do update set use_count = hashtag.use_count + 1
      `;
      const hashtag = await sql<{ id: string }>`select id from hashtag where tag = ${tag} limit 1`;
      if (hashtag[0]) {
        await sql`
          insert into content_hashtag (post_id, hashtag_id)
          values (${id}, ${hashtag[0].id})
          on conflict do nothing
        `;
      }
    }

    const created = await sql<PostSql>`
      select
        p.id, p.kind, p.caption, p.like_count, p.comment_count, p.share_count, p.save_count, p.view_count, p.created_at,
        a.user_id as author_id, a.username, a.display_name, a.bio, a.avatar_url,
        a.follower_count, a.following_count, a.like_count as like_total
      from post p
      join profile a on a.user_id = p.author_id
      where p.id = ${id}
      limit 1
    `;
    if (!created[0]) throw new Error("Could not publish.");
    const [post] = await attachMediaAndTags(sql, created, new Set(), context.userId);
    return post;
  });

export const listCircleFeed = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(() => ({}))
  .handler(async ({ context }) => {
    const viewer = context.userId;
    const sql = await getSql();
    const rows = await sql<PostSql>`
      select
        p.id, p.kind, p.caption, p.like_count, p.comment_count, p.share_count, p.save_count, p.view_count, p.created_at,
        a.user_id as author_id, a.username, a.display_name, a.bio, a.avatar_url,
        a.follower_count, a.following_count, a.like_count as like_total
      from post p
      join profile a on a.user_id = p.author_id
      where p.is_removed = false
        and p.author_id = ${viewer}
      order by p.created_at desc
      limit 40
    `;
    const followed = await sql<PostSql>`
      select
        p.id, p.kind, p.caption, p.like_count, p.comment_count, p.share_count, p.save_count, p.view_count, p.created_at,
        a.user_id as author_id, a.username, a.display_name, a.bio, a.avatar_url,
        a.follower_count, a.following_count, a.like_count as like_total
      from post p
      join profile a on a.user_id = p.author_id
      join follow f on f.following_id = p.author_id
      where p.is_removed = false
        and f.follower_id = ${viewer}
        and p.author_id <> ${viewer}
      order by p.created_at desc
      limit 40
    `;
    const merged = [...rows, ...followed].sort(
      (a, b) => new Date(String(b.created_at)).getTime() - new Date(String(a.created_at)).getTime(),
    );
    return attachMediaAndTags(sql, merged.slice(0, 40), await followingSet(sql, viewer), viewer);
  });

export const listPostsByUsername = createServerFn({ method: "POST" })
  .middleware([optionalAuthMiddleware])
  .validator((username: string) => normalizeUsername(username))
  .handler(async ({ context, data: username }) => {
    const sql = await getSql();
    const rows = await sql<PostSql>`
      select
        p.id, p.kind, p.caption, p.like_count, p.comment_count, p.share_count, p.save_count, p.view_count, p.created_at,
        a.user_id as author_id, a.username, a.display_name, a.bio, a.avatar_url,
        a.follower_count, a.following_count, a.like_count as like_total
      from post p
      join profile a on a.user_id = p.author_id
      where p.is_removed = false and a.username = ${username}
      order by p.created_at desc
      limit 40
    `;
    return attachMediaAndTags(sql, rows, await followingSet(sql, context.userId), context.userId);
  });

export const getPostById = createServerFn({ method: "POST" })
  .middleware([optionalAuthMiddleware])
  .validator((postId: string) => z.string().min(1).max(80).parse(postId))
  .handler(async ({ context, data: postId }) => {
    const sql = await getSql();
    const rows = await sql<PostSql>`
      select
        p.id, p.kind, p.caption, p.like_count, p.comment_count, p.share_count, p.save_count, p.view_count, p.created_at,
        a.user_id as author_id, a.username, a.display_name, a.bio, a.avatar_url,
        a.follower_count, a.following_count, a.like_count as like_total
      from post p
      join profile a on a.user_id = p.author_id
      where p.id = ${postId} and p.is_removed = false
      limit 1
    `;
    if (!rows[0]) return null;
    const [post] = await attachMediaAndTags(sql, rows, await followingSet(sql, context.userId), context.userId);
    return post ?? null;
  });

export const listPulseFeed = createServerFn({ method: "POST" })
  .middleware([optionalAuthMiddleware])
  .validator(() => ({}))
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<PostSql>`
      select
        p.id, p.kind, p.caption, p.like_count, p.comment_count, p.share_count, p.save_count, p.view_count, p.created_at,
        a.user_id as author_id, a.username, a.display_name, a.bio, a.avatar_url,
        a.follower_count, a.following_count, a.like_count as like_total
      from post p
      join profile a on a.user_id = p.author_id
      where p.is_removed = false and p.kind = ${"video"}
      order by p.created_at desc
      limit 20
    `;
    return attachMediaAndTags(sql, rows, await followingSet(sql, context.userId), context.userId);
  });

export const listSaved = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(() => ({}))
  .handler(async ({ context }) => {
    const sql = await getSql();
    const saved = await sql<{ post_id: string }>`
      select post_id from save where user_id = ${context.userId} order by created_at desc limit 40
    `;
    const posts: FeedPost[] = [];
    for (const item of saved) {
      const rows = await sql<PostSql>`
        select
          p.id, p.kind, p.caption, p.like_count, p.comment_count, p.share_count, p.save_count, p.view_count, p.created_at,
          a.user_id as author_id, a.username, a.display_name, a.bio, a.avatar_url,
          a.follower_count, a.following_count, a.like_count as like_total
        from post p
        join profile a on a.user_id = p.author_id
        where p.id = ${item.post_id} and p.is_removed = false
        limit 1
      `;
      if (!rows[0]) continue;
      const [post] = await attachMediaAndTags(sql, rows, await followingSet(sql, context.userId), context.userId);
      if (post) posts.push({ ...post, saved: true });
    }
    return posts;
  });

function searchPattern(raw: string) {
  const cleaned = raw.trim().replace(/^#/, "").slice(0, 60).replace(/[%_\\]/g, "");
  return { open: cleaned.length === 0, pattern: `%${cleaned}%` };
}

export const searchVybe = createServerFn({ method: "POST" })
  .middleware([optionalAuthMiddleware])
  .validator((input: unknown) => z.object({ q: z.string().max(80).optional() }).parse(input ?? {}))
  .handler(async ({ context, data }) => {
    await ensureDemoPosts();
    const sql = await getSql();
    const { open, pattern } = searchPattern(data.q ?? "");
    const people = await sql<{
      user_id: string;
      username: string;
      display_name: string;
      bio: string;
      avatar_url: string | null;
    }>`
      select user_id, username, display_name, bio, avatar_url
      from profile
      where is_suspended = false
        and (${open} or username ilike ${pattern} or display_name ilike ${pattern})
      order by follower_count desc, username asc
      limit 12
    `;
    const tags = await sql<{ tag: string; use_count: number }>`
      select tag, use_count from hashtag
      where ${open} or tag ilike ${pattern}
      order by use_count desc, tag asc
      limit 20
    `;
    const textRows = await sql<PostSql>`
      select
        p.id, p.kind, p.caption, p.like_count, p.comment_count, p.share_count, p.save_count, p.view_count, p.created_at,
        a.user_id as author_id, a.username, a.display_name, a.bio, a.avatar_url,
        a.follower_count, a.following_count, a.like_count as like_total
      from post p
      join profile a on a.user_id = p.author_id
      where p.is_removed = false
        and p.kind <> ${"video"}
        and (
          ${open}
          or p.caption ilike ${pattern}
          or exists (
            select 1 from content_hashtag ch
            join hashtag h on h.id = ch.hashtag_id
            where ch.post_id = p.id and h.tag ilike ${pattern}
          )
        )
      order by p.created_at desc
      limit 20
    `;
    const videoRows = await sql<PostSql>`
      select
        p.id, p.kind, p.caption, p.like_count, p.comment_count, p.share_count, p.save_count, p.view_count, p.created_at,
        a.user_id as author_id, a.username, a.display_name, a.bio, a.avatar_url,
        a.follower_count, a.following_count, a.like_count as like_total
      from post p
      join profile a on a.user_id = p.author_id
      where p.is_removed = false
        and p.kind = ${"video"}
        and (
          ${open}
          or p.caption ilike ${pattern}
          or exists (
            select 1 from content_hashtag ch
            join hashtag h on h.id = ch.hashtag_id
            where ch.post_id = p.id and h.tag ilike ${pattern}
          )
        )
      order by p.created_at desc
      limit 20
    `;
    const followed = await followingSet(sql, context.userId);
    const posts = await attachMediaAndTags(sql, textRows, followed, context.userId);
    const videos = await attachMediaAndTags(sql, videoRows, followed, context.userId);
    return {
      people: people.map((person) => ({
        id: person.user_id,
        username: person.username,
        displayName: person.display_name,
        bio: person.bio,
        avatarUrl: person.avatar_url ?? "",
      })),
      tags: tags.map((tag) => ({ tag: tag.tag, count: Number(tag.use_count) })),
      posts,
      videos,
    };
  });

