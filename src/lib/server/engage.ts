import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware, optionalAuthMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { ensureDemoPosts } from "@/lib/server/seed";
import type { FeedComment } from "@/lib/types";

type CommentSql = {
  id: string;
  post_id: string;
  body: string;
  like_count: number;
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

function asIso(value: string) {
  if (/^\d{4}-\d{2}-\d{2}/.test(value) && value.includes("T")) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString();
}

function toComment(row: CommentSql): FeedComment {
  return {
    id: row.id,
    postId: row.post_id,
    body: row.body,
    createdAt: asIso(String(row.created_at)),
    likeCount: Number(row.like_count),
    liked: false,
    author: {
      id: row.author_id,
      username: row.username,
      displayName: row.display_name,
      bio: row.bio,
      avatarUrl: row.avatar_url ?? "",
      followerCount: Number(row.follower_count),
      followingCount: Number(row.following_count),
      likeCount: Number(row.like_total),
    },
  };
}

async function notify(recipientId: string, actorId: string, type: "comment" | "share" | "like", postId: string, commentId: string | null) {
  if (recipientId === actorId) return;
  const id = `${type}:${actorId}:${postId}:${commentId ?? "-"}`;
  const sql = await getSql();
  try {
    await sql`
      insert into notification (id, recipient_id, actor_id, type, post_id, comment_id)
      values (${id}, ${recipientId}, ${actorId}, ${type}, ${postId}, ${commentId})
    `;
  } catch {
    /* already sent */
  }
}

export const listComments = createServerFn({ method: "POST" })
  .middleware([optionalAuthMiddleware])
  .validator((postId: string) => z.string().min(1).max(80).parse(postId))
  .handler(async ({ context, data: postId }) => {
    await ensureDemoPosts();
    const sql = await getSql();
    const rows = await sql<CommentSql>`
      select
        c.id, c.post_id, c.body, c.like_count, c.created_at,
        a.user_id as author_id, a.username, a.display_name, a.bio, a.avatar_url,
        a.follower_count, a.following_count, a.like_count as like_total
      from comment c
      join profile a on a.user_id = c.author_id
      where c.post_id = ${postId} and c.is_removed = false
      order by c.created_at asc
      limit 80
    `;
    const liked = new Set<string>();
    if (context.userId) {
      const hits = await sql<{ id: string }>`
        select l.target_id as id
        from likes l
        join comment c on c.id = l.target_id
        where l.user_id = ${context.userId}
          and l.target_type = ${"comment"}
          and c.post_id = ${postId}
      `;
      for (const hit of hits) liked.add(hit.id);
    }
    return rows.map((row) => ({ ...toComment(row), liked: liked.has(row.id) }));
  });

export const addComment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z
      .object({
        postId: z.string().min(1).max(80),
        body: z.string().trim().min(1).max(500),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    await ensureDemoPosts();
    const sql = await getSql();
    const me = await sql<{ username: string }>`
      select username from profile where user_id = ${context.userId} and is_suspended = false limit 1
    `;
    if (!me[0]) throw new Error("Finish joining VYBE first.");
    const post = await sql<{ author_id: string }>`
      select author_id from post where id = ${data.postId} and is_removed = false limit 1
    `;
    if (!post[0]) throw new Error("That post is gone.");

    const id = `c_${crypto.randomUUID()}`;
    await sql`
      insert into comment (id, post_id, author_id, body)
      values (${id}, ${data.postId}, ${context.userId}, ${data.body})
    `;
    await sql`
      update post set comment_count = comment_count + 1, updated_at = now() where id = ${data.postId}
    `;
    await notify(post[0].author_id, context.userId, "comment", data.postId, id);

    const rows = await sql<CommentSql>`
      select
        c.id, c.post_id, c.body, c.like_count, c.created_at,
        a.user_id as author_id, a.username, a.display_name, a.bio, a.avatar_url,
        a.follower_count, a.following_count, a.like_count as like_total
      from comment c
      join profile a on a.user_id = c.author_id
      where c.id = ${id}
      limit 1
    `;
    if (!rows[0]) throw new Error("Could not post that comment.");
    const counts = await sql<{ comment_count: number }>`
      select comment_count from post where id = ${data.postId} limit 1
    `;
    return { comment: toComment(rows[0]), commentCount: Number(counts[0]?.comment_count ?? 0) };
  });

export const toggleSave = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ postId: z.string().min(1).max(80) }).parse(input))
  .handler(async ({ context, data }) => {
    await ensureDemoPosts();
    const sql = await getSql();
    const post = await sql<{ id: string }>`
      select id from post where id = ${data.postId} and is_removed = false limit 1
    `;
    if (!post[0]) throw new Error("That post is gone.");
    const existing = await sql<{ x: number }>`
      select 1 as x from save where user_id = ${context.userId} and post_id = ${data.postId} limit 1
    `;
    if (existing[0]) {
      await sql`delete from save where user_id = ${context.userId} and post_id = ${data.postId}`;
      await sql`
        update post set save_count = greatest(save_count - 1, 0), updated_at = now() where id = ${data.postId}
      `;
    } else {
      await sql`
        insert into save (user_id, post_id) values (${context.userId}, ${data.postId})
      `;
      await sql`
        update post set save_count = save_count + 1, updated_at = now() where id = ${data.postId}
      `;
    }
    const counts = await sql<{ save_count: number }>`
      select save_count from post where id = ${data.postId} limit 1
    `;
    return { saved: !existing[0], saveCount: Number(counts[0]?.save_count ?? 0) };
  });

export const recordShare = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z
      .object({
        postId: z.string().min(1).max(80),
        channel: z.enum(["link", "native"]),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    await ensureDemoPosts();
    const sql = await getSql();
    const post = await sql<{ author_id: string }>`
      select author_id from post where id = ${data.postId} and is_removed = false limit 1
    `;
    if (!post[0]) throw new Error("That post is gone.");
    await sql`
      insert into share (id, user_id, post_id, channel)
      values (${`s_${crypto.randomUUID()}`}, ${context.userId}, ${data.postId}, ${data.channel})
    `;
    await sql`
      update post set share_count = share_count + 1, updated_at = now() where id = ${data.postId}
    `;
    await notify(post[0].author_id, context.userId, "share", data.postId, null);
    const counts = await sql<{ share_count: number }>`
      select share_count from post where id = ${data.postId} limit 1
    `;
    return { shareCount: Number(counts[0]?.share_count ?? 0) };
  });

export const listMyLikes = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(() => ({}))
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ target_type: string; target_id: string }>`
      select target_type, target_id from likes where user_id = ${context.userId}
    `;
    return {
      posts: rows.filter((row) => row.target_type === "post").map((row) => row.target_id),
      comments: rows.filter((row) => row.target_type === "comment").map((row) => row.target_id),
    };
  });

export const toggleLike = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z
      .object({
        targetType: z.enum(["post", "comment"]),
        targetId: z.string().min(1).max(80),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    await ensureDemoPosts();
    const sql = await getSql();
    let authorId = "";
    let postId = data.targetId;
    let commentId: string | null = null;
    if (data.targetType === "post") {
      const post = await sql<{ author_id: string }>`
        select author_id from post where id = ${data.targetId} and is_removed = false limit 1
      `;
      if (!post[0]) throw new Error("That post is gone.");
      authorId = post[0].author_id;
    } else {
      const comment = await sql<{ author_id: string; post_id: string }>`
        select author_id, post_id from comment where id = ${data.targetId} and is_removed = false limit 1
      `;
      if (!comment[0]) throw new Error("That comment is gone.");
      authorId = comment[0].author_id;
      postId = comment[0].post_id;
      commentId = data.targetId;
    }

    const existing = await sql<{ x: number }>`
      select 1 as x from likes
      where user_id = ${context.userId} and target_type = ${data.targetType} and target_id = ${data.targetId}
      limit 1
    `;
    const liked = !existing[0];
    if (existing[0]) {
      await sql`
        delete from likes
        where user_id = ${context.userId} and target_type = ${data.targetType} and target_id = ${data.targetId}
      `;
    } else {
      await sql`
        insert into likes (user_id, target_type, target_id)
        values (${context.userId}, ${data.targetType}, ${data.targetId})
      `;
    }

    const delta = liked ? 1 : -1;
    if (data.targetType === "post") {
      await sql`
        update post set like_count = greatest(like_count + ${delta}, 0), updated_at = now()
        where id = ${postId}
      `;
    } else if (commentId) {
      await sql`
        update comment set like_count = greatest(like_count + ${delta}, 0) where id = ${commentId}
      `;
    }
    await sql`
      update profile set like_count = greatest(like_count + ${delta}, 0), updated_at = now()
      where user_id = ${authorId}
    `;

    const notice = `like:${context.userId}:${postId}:${commentId ?? "-"}`;
    if (liked) {
      await notify(authorId, context.userId, "like", postId, commentId);
    } else {
      await sql`delete from notification where id = ${notice}`;
    }

    const counts = data.targetType === "post"
      ? await sql<{ like_count: number }>`select like_count from post where id = ${postId} limit 1`
      : await sql<{ like_count: number }>`select like_count from comment where id = ${data.targetId} limit 1`;
    return { liked, likeCount: Number(counts[0]?.like_count ?? 0) };
  });

