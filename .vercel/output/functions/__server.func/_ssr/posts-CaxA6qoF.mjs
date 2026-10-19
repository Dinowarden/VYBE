import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { D as _enum, F as object, P as number, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { n as isSafeVideoUrl, t as isSafeImageUrl } from "./clip-DT-cY-Yx.mjs";
import { r as getSql } from "./db-Bs_oVv3x.mjs";
import { n as optionalAuthMiddleware, t as authMiddleware } from "./middleware-Cw7doLtA.mjs";
import { i as normalizeUsername } from "./auth-D2ebFRuG.mjs";
import { t as ensureDemoPosts } from "./seed-D2Fu0ZYk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/posts-CaxA6qoF.js
var TAG_RE = /#([a-z0-9_]{1,32})/gi;
function parseHashtags(caption) {
	const found = /* @__PURE__ */ new Set();
	for (const match of caption.matchAll(TAG_RE)) {
		found.add(match[1].toLowerCase());
		if (found.size >= 8) break;
	}
	return [...found];
}
function asIso(value) {
	if (/^\d{4}-\d{2}-\d{2}/.test(value) && value.includes("T")) return value;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? value : date.toISOString();
}
function toAuthor(row) {
	return {
		id: row.author_id,
		username: row.username,
		displayName: row.display_name,
		bio: row.bio,
		avatarUrl: row.avatar_url ?? "",
		followerCount: Number(row.follower_count),
		followingCount: Number(row.following_count),
		likeCount: Number(row.like_total)
	};
}
async function attachMediaAndTags(sql, rows, followingIds, viewerId) {
	if (!rows.length) return [];
	const posts = [];
	for (const row of rows) {
		const media = await sql`
      select post_id, url, kind, mime, width, height, duration_ms, position
      from media where post_id = ${row.id} order by position
    `;
		const tags = await sql`
      select h.tag
      from content_hashtag ch
      join hashtag h on h.id = ch.hashtag_id
      where ch.post_id = ${row.id}
    `;
		const poster = media.find((item) => item.kind === "poster");
		const playable = media.filter((item) => item.kind !== "poster");
		const assets = (playable.length ? playable : media).map((item) => ({
			url: item.url,
			posterUrl: item.kind === "video" ? poster?.url : void 0,
			mime: item.mime ?? void 0,
			width: item.width ?? void 0,
			height: item.height ?? void 0,
			durationMs: item.duration_ms ?? void 0
		}));
		const savedHit = viewerId ? await sql`
          select 1 as x from save where user_id = ${viewerId} and post_id = ${row.id} limit 1
        ` : [];
		const likedHit = viewerId ? await sql`
          select 1 as x from likes
          where user_id = ${viewerId} and target_type = ${"post"} and target_id = ${row.id}
          limit 1
        ` : [];
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
			followingAuthor: Boolean(viewerId && viewerId !== row.author_id && followingIds.has(row.author_id))
		});
	}
	return posts;
}
async function followingSet(sql, viewerId) {
	if (!viewerId) return /* @__PURE__ */ new Set();
	const edges = await sql`
    select following_id as id from follow where follower_id = ${viewerId}
  `;
	return new Set(edges.map((row) => row.id));
}
var createPost_createServerFn_handler = createServerRpc({
	id: "9a441e5ecf31d0e6db8f41b458bd431e94be334995ce09f28fde78c493ae50b7",
	name: "createPost",
	filename: "src/lib/server/posts.ts"
}, (opts) => createPost.__executeServer(opts));
var createPost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	kind: _enum([
		"text",
		"image",
		"video"
	]),
	caption: string().max(500),
	imageUrl: string().max(8e5).nullable().optional(),
	videoUrl: string().max(6e6).nullable().optional(),
	posterUrl: string().max(8e5).nullable().optional(),
	mime: string().max(80).nullable().optional(),
	width: number().int().positive().optional(),
	height: number().int().positive().optional(),
	durationMs: number().int().positive().max(6e4).optional()
}).parse(input)).handler(createPost_createServerFn_handler, async ({ context, data }) => {
	const caption = data.caption.trim();
	if (data.kind === "text" && !caption) throw new Error("Write something first.");
	if (data.kind === "image") {
		if (!data.imageUrl || !isSafeImageUrl(data.imageUrl)) throw new Error("Add a photo first.");
	}
	if (data.kind === "video") {
		if (!data.videoUrl || !isSafeVideoUrl(data.videoUrl)) throw new Error("Add a clip first.");
		if (!data.durationMs || data.durationMs > 6e4) throw new Error("Clips must be 60 seconds or shorter.");
	}
	const sql = await getSql();
	if (!(await sql`
      select username from profile where user_id = ${context.userId} and is_suspended = false limit 1
    `)[0]) throw new Error("Finish joining VYBE first.");
	const id = `p_${crypto.randomUUID()}`;
	await sql`
      insert into post (id, author_id, kind, caption)
      values (${id}, ${context.userId}, ${data.kind}, ${caption})
    `;
	if (data.kind === "image" && data.imageUrl) await sql`
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
		if (data.posterUrl && isSafeImageUrl(data.posterUrl)) await sql`
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
	for (const tag of parseHashtags(caption)) {
		await sql`
        insert into hashtag (id, tag, use_count)
        values (${`h_${tag}`}, ${tag}, 1)
        on conflict (tag) do update set use_count = hashtag.use_count + 1
      `;
		const hashtag = await sql`select id from hashtag where tag = ${tag} limit 1`;
		if (hashtag[0]) await sql`
          insert into content_hashtag (post_id, hashtag_id)
          values (${id}, ${hashtag[0].id})
          on conflict do nothing
        `;
	}
	const created = await sql`
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
	const [post] = await attachMediaAndTags(sql, created, /* @__PURE__ */ new Set(), context.userId);
	return post;
});
var listCircleFeed_createServerFn_handler = createServerRpc({
	id: "c076698b7ace1f97ab58786b63195c010c5738dd214f1c8cc5642e620626f2df",
	name: "listCircleFeed",
	filename: "src/lib/server/posts.ts"
}, (opts) => listCircleFeed.__executeServer(opts));
var listCircleFeed = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(() => ({})).handler(listCircleFeed_createServerFn_handler, async ({ context }) => {
	const viewer = context.userId;
	const sql = await getSql();
	const rows = await sql`
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
	const followed = await sql`
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
	return attachMediaAndTags(sql, [...rows, ...followed].sort((a, b) => new Date(String(b.created_at)).getTime() - new Date(String(a.created_at)).getTime()).slice(0, 40), await followingSet(sql, viewer), viewer);
});
var listPostsByUsername_createServerFn_handler = createServerRpc({
	id: "86576dad4db6163ce95a1001aa34a44db152382c5647189240cb4c591c305aeb",
	name: "listPostsByUsername",
	filename: "src/lib/server/posts.ts"
}, (opts) => listPostsByUsername.__executeServer(opts));
var listPostsByUsername = createServerFn({ method: "POST" }).middleware([optionalAuthMiddleware]).validator((username) => normalizeUsername(username)).handler(listPostsByUsername_createServerFn_handler, async ({ context, data: username }) => {
	const sql = await getSql();
	return attachMediaAndTags(sql, await sql`
      select
        p.id, p.kind, p.caption, p.like_count, p.comment_count, p.share_count, p.save_count, p.view_count, p.created_at,
        a.user_id as author_id, a.username, a.display_name, a.bio, a.avatar_url,
        a.follower_count, a.following_count, a.like_count as like_total
      from post p
      join profile a on a.user_id = p.author_id
      where p.is_removed = false and a.username = ${username}
      order by p.created_at desc
      limit 40
    `, await followingSet(sql, context.userId), context.userId);
});
var getPostById_createServerFn_handler = createServerRpc({
	id: "cc8ac7bad7076a206aaa67487d52655dc8ebd5585d0a2ea5123e66eda448ee2c",
	name: "getPostById",
	filename: "src/lib/server/posts.ts"
}, (opts) => getPostById.__executeServer(opts));
var getPostById = createServerFn({ method: "POST" }).middleware([optionalAuthMiddleware]).validator((postId) => string().min(1).max(80).parse(postId)).handler(getPostById_createServerFn_handler, async ({ context, data: postId }) => {
	const sql = await getSql();
	const rows = await sql`
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
var listPulseFeed_createServerFn_handler = createServerRpc({
	id: "95d96a014fd47f944abb534ce255904d5688cefbef5256d93cc69141e439bef2",
	name: "listPulseFeed",
	filename: "src/lib/server/posts.ts"
}, (opts) => listPulseFeed.__executeServer(opts));
var listPulseFeed = createServerFn({ method: "POST" }).middleware([optionalAuthMiddleware]).validator(() => ({})).handler(listPulseFeed_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	return attachMediaAndTags(sql, await sql`
      select
        p.id, p.kind, p.caption, p.like_count, p.comment_count, p.share_count, p.save_count, p.view_count, p.created_at,
        a.user_id as author_id, a.username, a.display_name, a.bio, a.avatar_url,
        a.follower_count, a.following_count, a.like_count as like_total
      from post p
      join profile a on a.user_id = p.author_id
      where p.is_removed = false and p.kind = ${"video"}
      order by p.created_at desc
      limit 20
    `, await followingSet(sql, context.userId), context.userId);
});
var listSaved_createServerFn_handler = createServerRpc({
	id: "ba1f3ba4903039149b02aa4a858400c1164f4a9f93c3b7b8db57a58b5829dd64",
	name: "listSaved",
	filename: "src/lib/server/posts.ts"
}, (opts) => listSaved.__executeServer(opts));
var listSaved = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(() => ({})).handler(listSaved_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const saved = await sql`
      select post_id from save where user_id = ${context.userId} order by created_at desc limit 40
    `;
	const posts = [];
	for (const item of saved) {
		const rows = await sql`
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
		if (post) posts.push({
			...post,
			saved: true
		});
	}
	return posts;
});
function searchPattern(raw) {
	const cleaned = raw.trim().replace(/^#/, "").slice(0, 60).replace(/[%_\\]/g, "");
	return {
		open: cleaned.length === 0,
		pattern: `%${cleaned}%`
	};
}
var searchVybe_createServerFn_handler = createServerRpc({
	id: "f371f13f9ab37ba44522e7664c9461903ededf57e2b2ed7fb78e28c078e6ca99",
	name: "searchVybe",
	filename: "src/lib/server/posts.ts"
}, (opts) => searchVybe.__executeServer(opts));
var searchVybe = createServerFn({ method: "POST" }).middleware([optionalAuthMiddleware]).validator((input) => object({ q: string().max(80).optional() }).parse(input ?? {})).handler(searchVybe_createServerFn_handler, async ({ context, data }) => {
	await ensureDemoPosts();
	const sql = await getSql();
	const { open, pattern } = searchPattern(data.q ?? "");
	const people = await sql`
      select user_id, username, display_name, bio, avatar_url
      from profile
      where is_suspended = false
        and (${open} or username ilike ${pattern} or display_name ilike ${pattern})
      order by follower_count desc, username asc
      limit 12
    `;
	const tags = await sql`
      select tag, use_count from hashtag
      where ${open} or tag ilike ${pattern}
      order by use_count desc, tag asc
      limit 20
    `;
	const textRows = await sql`
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
	const videoRows = await sql`
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
			avatarUrl: person.avatar_url ?? ""
		})),
		tags: tags.map((tag) => ({
			tag: tag.tag,
			count: Number(tag.use_count)
		})),
		posts,
		videos
	};
});
//#endregion
export { createPost_createServerFn_handler, getPostById_createServerFn_handler, listCircleFeed_createServerFn_handler, listPostsByUsername_createServerFn_handler, listPulseFeed_createServerFn_handler, listSaved_createServerFn_handler, searchVybe_createServerFn_handler };
