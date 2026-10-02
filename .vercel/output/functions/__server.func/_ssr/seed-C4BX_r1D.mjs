import { r as getSql } from "./db-Bs_oVv3x.mjs";
import { a as demoUsers } from "./demo-data-Ce69zrXT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seed-C4BX_r1D.js
var seeded = false;
/** Upsert the sample creators so follow edges can land on real profile rows. */
async function ensureDemoProfiles() {
	if (seeded) return;
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
	seeded = true;
}
//#endregion
export { ensureDemoProfiles as t };
