import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { L as string, P as object } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-Bs_oVv3x.mjs";
import { a as normalizeUsername, i as isSafeAvatarUrl, l as usernameError, n as authMiddleware, t as ageError } from "./auth-CQivlI3v.mjs";
import { t as ensureDemoProfiles } from "./seed-C4BX_r1D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CpJNYjbo.js
function mapProfile(row) {
	return {
		userId: row.user_id,
		username: row.username,
		displayName: row.display_name,
		bio: row.bio,
		avatarUrl: row.avatar_url,
		dateOfBirth: row.date_of_birth,
		role: row.role,
		followerCount: Number(row.follower_count),
		followingCount: Number(row.following_count),
		likeCount: Number(row.like_count)
	};
}
var usernameAvailable_createServerFn_handler = createServerRpc({
	id: "23264ed1be370fb29a4e584a160f8aa46342831960f33228a1947b8c2964e219",
	name: "usernameAvailable",
	filename: "src/lib/server/profile.ts"
}, (opts) => usernameAvailable.__executeServer(opts));
var usernameAvailable = createServerFn({ method: "POST" }).validator((username) => normalizeUsername(username)).handler(usernameAvailable_createServerFn_handler, async ({ data: username }) => {
	if (usernameError(username)) return {
		available: false,
		reason: "invalid"
	};
	const rows = await (await getSql())`
      select 1 as x from profile where username = ${username} limit 1
    `;
	return {
		available: rows.length === 0,
		reason: rows.length ? "taken" : null
	};
});
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "43089abf67b0d2fc04dd8ee11c57f4f4a6f26a675e0ebab772a5634a77d97f36",
	name: "getMyProfile",
	filename: "src/lib/server/profile.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	const rows = await (await getSql())`
      select user_id, username, display_name, bio, avatar_url, date_of_birth,
             role, follower_count, following_count, like_count
      from profile
      where user_id = ${context.userId}
      limit 1
    `;
	return rows[0] ? mapProfile(rows[0]) : null;
});
var getProfileByUsername_createServerFn_handler = createServerRpc({
	id: "a096fdc2ea6e5d44b352f9ffcbec76e215294ed08495646515e3562eb1f91375",
	name: "getProfileByUsername",
	filename: "src/lib/server/profile.ts"
}, (opts) => getProfileByUsername.__executeServer(opts));
var getProfileByUsername = createServerFn({ method: "GET" }).validator((username) => normalizeUsername(username)).handler(getProfileByUsername_createServerFn_handler, async ({ data: username }) => {
	await ensureDemoProfiles();
	const rows = await (await getSql())`
      select user_id, username, display_name, bio, avatar_url, date_of_birth,
             role, follower_count, following_count, like_count
      from profile
      where username = ${username} and is_suspended = false
      limit 1
    `;
	return rows[0] ? mapProfile(rows[0]) : null;
});
var onboardingSchema = object({
	username: string().min(3).max(24),
	displayName: string().trim().min(1).max(48),
	dateOfBirth: string()
});
var completeOnboarding_createServerFn_handler = createServerRpc({
	id: "f42ed024f5be771c30793f3dfbd561a86c7c6c44b56ec83c5c0f86a3a689c25d",
	name: "completeOnboarding",
	filename: "src/lib/server/profile.ts"
}, (opts) => completeOnboarding.__executeServer(opts));
var completeOnboarding = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => onboardingSchema.parse(input)).handler(completeOnboarding_createServerFn_handler, async ({ context, data }) => {
	const username = normalizeUsername(data.username);
	const userErr = usernameError(username);
	if (userErr) throw new Error(userErr);
	const dobErr = ageError(data.dateOfBirth);
	if (dobErr) throw new Error(dobErr);
	const sql = await getSql();
	const existing = await sql`
      select user_id, username, display_name, bio, avatar_url, date_of_birth,
             role, follower_count, following_count, like_count
      from profile where user_id = ${context.userId} limit 1
    `;
	if (existing[0]) return mapProfile(existing[0]);
	if ((await sql`
      select 1 as x from profile where username = ${username} limit 1
    `).length) throw new Error("That username is taken.");
	try {
		await sql`
        insert into profile (user_id, username, display_name, date_of_birth)
        values (${context.userId}, ${username}, ${data.displayName.trim()}, ${data.dateOfBirth})
      `;
	} catch {
		throw new Error("That username is taken.");
	}
	const created = await sql`
      select user_id, username, display_name, bio, avatar_url, date_of_birth,
             role, follower_count, following_count, like_count
      from profile where user_id = ${context.userId} limit 1
    `;
	if (!created[0]) throw new Error("Could not create your profile.");
	return mapProfile(created[0]);
});
var updateSchema = object({
	username: string().min(3).max(24),
	displayName: string().trim().min(1).max(48),
	bio: string().max(160),
	avatarUrl: string().nullable()
});
var updateProfile_createServerFn_handler = createServerRpc({
	id: "580eb9cacacfd10e534ae986491eec3b15431475b909edd07b8eb72a9cf24ce9",
	name: "updateProfile",
	filename: "src/lib/server/profile.ts"
}, (opts) => updateProfile.__executeServer(opts));
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => updateSchema.parse(input)).handler(updateProfile_createServerFn_handler, async ({ context, data }) => {
	const username = normalizeUsername(data.username);
	const userErr = usernameError(username);
	if (userErr) throw new Error(userErr);
	const displayName = data.displayName.trim();
	if (!displayName) throw new Error("Enter a display name.");
	const bio = data.bio.trim();
	if (bio.length > 160) throw new Error("Bio must be 160 characters or less.");
	if (!isSafeAvatarUrl(data.avatarUrl)) throw new Error("That photo could not be saved.");
	const sql = await getSql();
	if (!(await sql`
      select user_id, username, display_name, bio, avatar_url, date_of_birth,
             role, follower_count, following_count, like_count
      from profile where user_id = ${context.userId} limit 1
    `)[0]) throw new Error("Finish joining VYBE first.");
	if ((await sql`
      select 1 as x from profile
      where username = ${username} and user_id <> ${context.userId}
      limit 1
    `).length) throw new Error("That username is taken.");
	await sql`
      update profile
      set username = ${username},
          display_name = ${displayName},
          bio = ${bio},
          avatar_url = ${data.avatarUrl},
          updated_at = now()
      where user_id = ${context.userId}
    `;
	const updated = await sql`
      select user_id, username, display_name, bio, avatar_url, date_of_birth,
             role, follower_count, following_count, like_count
      from profile where user_id = ${context.userId} limit 1
    `;
	if (!updated[0]) throw new Error("Could not save your profile.");
	return mapProfile(updated[0]);
});
//#endregion
export { completeOnboarding_createServerFn_handler, getMyProfile_createServerFn_handler, getProfileByUsername_createServerFn_handler, updateProfile_createServerFn_handler, usernameAvailable_createServerFn_handler };
