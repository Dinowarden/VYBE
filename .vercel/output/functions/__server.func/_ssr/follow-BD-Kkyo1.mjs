import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { F as object, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-Bs_oVv3x.mjs";
import { n as optionalAuthMiddleware, t as authMiddleware } from "./middleware-Cw7doLtA.mjs";
import { i as normalizeUsername } from "./auth-D2ebFRuG.mjs";
import { n as ensureDemoProfiles } from "./seed-D2Fu0ZYk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/follow-BD-Kkyo1.js
function mapPerson(row, following) {
	return {
		userId: row.user_id,
		username: row.username,
		displayName: row.display_name,
		bio: row.bio,
		avatarUrl: row.avatar_url,
		following
	};
}
var getFollowContext_createServerFn_handler = createServerRpc({
	id: "b0501509ba9bc0f35fc929b5fdf3bb8c7aff121fcc955d7a9608518f6edc1703",
	name: "getFollowContext",
	filename: "src/lib/server/follow.ts"
}, (opts) => getFollowContext.__executeServer(opts));
var getFollowContext = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getFollowContext_createServerFn_handler, async ({ context }) => {
	await ensureDemoProfiles();
	const sql = await getSql();
	const me = await sql`
      select username from profile where user_id = ${context.userId} limit 1
    `;
	const rows = await sql`
      select p.username
      from follow f
      join profile p on p.user_id = f.following_id
      where f.follower_id = ${context.userId}
    `;
	return {
		myUsername: me[0]?.username ?? null,
		following: rows.map((row) => row.username)
	};
});
var toggleFollow_createServerFn_handler = createServerRpc({
	id: "a376c2c97279466804744bee94349b744d5ca3a1a91bcf92356a15c6121d0c77",
	name: "toggleFollow",
	filename: "src/lib/server/follow.ts"
}, (opts) => toggleFollow.__executeServer(opts));
var toggleFollow = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ username: string().min(1) }).parse(input)).handler(toggleFollow_createServerFn_handler, async ({ context, data }) => {
	await ensureDemoProfiles();
	const username = normalizeUsername(data.username);
	const sql = await getSql();
	const target = await sql`
      select user_id, follower_count, is_suspended
      from profile
      where username = ${username}
      limit 1
    `;
	if (!target[0] || target[0].is_suspended) throw new Error("That person is not on VYBE.");
	if (target[0].user_id === context.userId) throw new Error("You cannot follow yourself.");
	const existing = await sql`
      select 1 as x from follow
      where follower_id = ${context.userId} and following_id = ${target[0].user_id}
      limit 1
    `;
	if (existing[0]) {
		await sql`
        delete from follow
        where follower_id = ${context.userId} and following_id = ${target[0].user_id}
      `;
		await sql`
        update profile
        set follower_count = greatest(follower_count - 1, 0), updated_at = now()
        where user_id = ${target[0].user_id}
      `;
		await sql`
        update profile
        set following_count = greatest(following_count - 1, 0), updated_at = now()
        where user_id = ${context.userId}
      `;
		await sql`
        delete from notification
        where recipient_id = ${target[0].user_id}
          and actor_id = ${context.userId}
          and type = 'follow'
      `;
	} else {
		await sql`
        insert into follow (follower_id, following_id)
        values (${context.userId}, ${target[0].user_id})
      `;
		await sql`
        update profile
        set follower_count = follower_count + 1, updated_at = now()
        where user_id = ${target[0].user_id}
      `;
		await sql`
        update profile
        set following_count = following_count + 1, updated_at = now()
        where user_id = ${context.userId}
      `;
		const notifId = `follow:${context.userId}:${target[0].user_id}`;
		try {
			await sql`
          insert into notification (id, recipient_id, actor_id, type)
          values (${notifId}, ${target[0].user_id}, ${context.userId}, 'follow')
        `;
		} catch {}
	}
	const next = await sql`
      select follower_count from profile where user_id = ${target[0].user_id} limit 1
    `;
	return {
		following: !existing[0],
		followerCount: Number(next[0]?.follower_count ?? 0)
	};
});
var listFollowers_createServerFn_handler = createServerRpc({
	id: "19efe4e97c272ab8b39c325d863b957f70389e7ff5a549c8c765d7aa9f8a5fb5",
	name: "listFollowers",
	filename: "src/lib/server/follow.ts"
}, (opts) => listFollowers.__executeServer(opts));
var listFollowers = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((username) => normalizeUsername(username)).handler(listFollowers_createServerFn_handler, async ({ context, data: username }) => {
	await ensureDemoProfiles();
	const sql = await getSql();
	const owner = await sql`
      select user_id from profile where username = ${username} and is_suspended = false limit 1
    `;
	if (!owner[0]) return {
		username,
		people: []
	};
	const rows = await sql`
      select p.user_id, p.username, p.display_name, p.bio, p.avatar_url
      from follow f
      join profile p on p.user_id = f.follower_id
      where f.following_id = ${owner[0].user_id}
      order by f.created_at desc
    `;
	const mine = /* @__PURE__ */ new Set();
	if (context.userId) {
		const following = await sql`
        select following_id as id from follow where follower_id = ${context.userId}
      `;
		for (const row of following) mine.add(row.id);
	}
	return {
		username,
		people: rows.map((row) => mapPerson(row, mine.has(row.user_id)))
	};
});
var listFollowing_createServerFn_handler = createServerRpc({
	id: "c20cb79b4ab4559c55890b7229e7b5d10cec29dac03963f514eed88c95c097d1",
	name: "listFollowing",
	filename: "src/lib/server/follow.ts"
}, (opts) => listFollowing.__executeServer(opts));
var listFollowing = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((username) => normalizeUsername(username)).handler(listFollowing_createServerFn_handler, async ({ context, data: username }) => {
	await ensureDemoProfiles();
	const sql = await getSql();
	const owner = await sql`
      select user_id from profile where username = ${username} and is_suspended = false limit 1
    `;
	if (!owner[0]) return {
		username,
		people: []
	};
	const rows = await sql`
      select p.user_id, p.username, p.display_name, p.bio, p.avatar_url
      from follow f
      join profile p on p.user_id = f.following_id
      where f.follower_id = ${owner[0].user_id}
      order by f.created_at desc
    `;
	const mine = /* @__PURE__ */ new Set();
	if (context.userId) {
		const following = await sql`
        select following_id as id from follow where follower_id = ${context.userId}
      `;
		for (const row of following) mine.add(row.id);
	}
	return {
		username,
		people: rows.map((row) => mapPerson(row, mine.has(row.user_id)))
	};
});
var listSuggestedPeople_createServerFn_handler = createServerRpc({
	id: "9fcb103995b99719d2259cdb10679c76cbacc62fb85daf9229d8d3565a760156",
	name: "listSuggestedPeople",
	filename: "src/lib/server/follow.ts"
}, (opts) => listSuggestedPeople.__executeServer(opts));
var listSuggestedPeople = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).handler(listSuggestedPeople_createServerFn_handler, async ({ context }) => {
	await ensureDemoProfiles();
	const sql = await getSql();
	const viewer = context.userId;
	return (viewer ? await sql`
          select user_id, username, display_name, bio, avatar_url
          from profile
          where is_suspended = false
            and user_id <> ${viewer}
            and user_id not in (
              select following_id from follow where follower_id = ${viewer}
            )
          order by follower_count desc, created_at desc
          limit 8
        ` : await sql`
          select user_id, username, display_name, bio, avatar_url
          from profile
          where is_suspended = false
          order by follower_count desc, created_at desc
          limit 8
        `).map((row) => mapPerson(row, false));
});
//#endregion
export { getFollowContext_createServerFn_handler, listFollowers_createServerFn_handler, listFollowing_createServerFn_handler, listSuggestedPeople_createServerFn_handler, toggleFollow_createServerFn_handler };
