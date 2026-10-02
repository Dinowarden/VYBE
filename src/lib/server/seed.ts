import { demoUsers } from "@/lib/demo-data";
import { getSql } from "@/lib/db";

let seeded = false;

/** Upsert the sample creators so follow edges can land on real profile rows. */
export async function ensureDemoProfiles() {
  if (seeded) return;
  const sql = await getSql();
  for (const user of demoUsers) {
    try {
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
    } catch {
      /* username may already belong to a real account */
    }
  }
  seeded = true;
}
