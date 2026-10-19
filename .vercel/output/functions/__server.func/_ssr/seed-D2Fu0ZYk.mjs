import { r as getSql } from "./db-Bs_oVv3x.mjs";
import { i as demoUsers, n as demoComments, r as demoPosts } from "./demo-data-CRXOTHOZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seed-D2Fu0ZYk.js
var profilesSeeded = false;
var postsSeeded = false;
var tagsSeeded = false;
/** Upsert the sample creators so follow edges can land on real profile rows. */
async function ensureDemoProfiles() {
	if (profilesSeeded) return;
	const sql = await getSql();
	for (const user of demoUsers) try {
		await sql`
        insert into profile (user_id, username, display_name, bio, avatar_url)
        values (
          ${user.id},
          ${user.username},
          ${user.displayName},
          ${user.bio},
          ${user.avatarUrl}
        )
        on conflict (user_id) do nothing
      `;
	} catch {}
	profilesSeeded = true;
}
/** Sample posts and their starter comments, so saves and replies have a real row. */
async function ensureDemoPosts() {
	await ensureDemoProfiles();
	if (postsSeeded) {
		await ensureDemoTags();
		return;
	}
	const sql = await getSql();
	for (const post of demoPosts) {
		await sql`
      insert into post (
        id, author_id, kind, caption, like_count, comment_count, share_count, save_count, view_count, created_at
      )
      values (
        ${post.id},
        ${post.author.id},
        ${post.kind},
        ${post.caption},
        ${post.likeCount},
        ${post.commentCount},
        ${post.shareCount},
        ${post.saveCount},
        ${post.viewCount},
        ${post.createdAt}
      )
      on conflict (id) do nothing
    `;
		const media = post.media[0];
		if (!media) continue;
		const kind = post.kind === "video" ? "video" : "image";
		await sql`
      insert into media (id, post_id, kind, url, position)
      values (${`${post.id}_media`}, ${post.id}, ${kind}, ${media.url}, ${0})
      on conflict (id) do nothing
    `;
		if (media.posterUrl) await sql`
        insert into media (id, post_id, kind, url, position)
        values (${`${post.id}_poster`}, ${post.id}, ${"poster"}, ${media.posterUrl}, ${1})
        on conflict (id) do nothing
      `;
	}
	for (const comment of demoComments) await sql`
      insert into comment (id, post_id, author_id, body, like_count, created_at)
      values (
        ${comment.id},
        ${comment.postId},
        ${comment.author.id},
        ${comment.body},
        ${comment.likeCount},
        ${comment.createdAt}
      )
      on conflict (id) do nothing
    `;
	postsSeeded = true;
	await ensureDemoTags();
}
async function ensureDemoTags() {
	if (tagsSeeded) return;
	const sql = await getSql();
	for (const post of demoPosts) for (const tag of post.hashtags) {
		await sql`
        insert into hashtag (id, tag, use_count)
        values (${`h_${tag}`}, ${tag}, 1)
        on conflict (tag) do nothing
      `;
		const row = await sql`select id from hashtag where tag = ${tag} limit 1`;
		if (!row[0]) continue;
		await sql`
        insert into content_hashtag (post_id, hashtag_id)
        values (${post.id}, ${row[0].id})
        on conflict do nothing
      `;
	}
	tagsSeeded = true;
}
//#endregion
export { ensureDemoProfiles as n, ensureDemoPosts as t };
