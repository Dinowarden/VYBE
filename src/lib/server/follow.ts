import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware, optionalAuthMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { ensureDemoProfiles } from "@/lib/server/seed";
import { normalizeUsername } from "@/lib/validation/auth";

export type Person = {
  userId: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string | null;
  following: boolean;
};

type PersonSql = {
  user_id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string | null;
};

function mapPerson(row: PersonSql, following: boolean): Person {
  return {
    userId: row.user_id,
    username: row.username,
    displayName: row.display_name,
    bio: row.bio,
    avatarUrl: row.avatar_url,
    following,
  };
}

export const getFollowContext = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureDemoProfiles();
    const sql = await getSql();
    const me = await sql<{ username: string }>`
      select username from profile where user_id = ${context.userId} limit 1
    `;
    const rows = await sql<{ username: string }>`
      select p.username
      from follow f
      join profile p on p.user_id = f.following_id
      where f.follower_id = ${context.userId}
    `;
    return {
      myUsername: me[0]?.username ?? null,
      following: rows.map((row) => row.username),
    };
  });

export const toggleFollow = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ username: z.string().min(1) }).parse(input))
  .handler(async ({ context, data }) => {
    await ensureDemoProfiles();
    const username = normalizeUsername(data.username);
    const sql = await getSql();
    const target = await sql<{ user_id: string; follower_count: number; is_suspended: boolean }>`
      select user_id, follower_count, is_suspended
      from profile
      where username = ${username}
      limit 1
    `;
    if (!target[0] || target[0].is_suspended) throw new Error("That person is not on VYBE.");
    if (target[0].user_id === context.userId) throw new Error("You cannot follow yourself.");

    const existing = await sql<{ x: number }>`
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
      } catch {
        /* already signalled */
      }
    }

    const next = await sql<{ follower_count: number }>`
      select follower_count from profile where user_id = ${target[0].user_id} limit 1
    `;
    return {
      following: !existing[0],
      followerCount: Number(next[0]?.follower_count ?? 0),
    };
  });

export const listFollowers = createServerFn({ method: "GET" })
  .middleware([optionalAuthMiddleware])
  .validator((username: string) => normalizeUsername(username))
  .handler(async ({ context, data: username }) => {
    await ensureDemoProfiles();
    const sql = await getSql();
    const owner = await sql<{ user_id: string }>`
      select user_id from profile where username = ${username} and is_suspended = false limit 1
    `;
    if (!owner[0]) return { username, people: [] as Person[] };
    const rows = await sql<PersonSql>`
      select p.user_id, p.username, p.display_name, p.bio, p.avatar_url
      from follow f
      join profile p on p.user_id = f.follower_id
      where f.following_id = ${owner[0].user_id}
      order by f.created_at desc
    `;
    const mine = new Set<string>();
    if (context.userId) {
      const following = await sql<{ id: string }>`
        select following_id as id from follow where follower_id = ${context.userId}
      `;
      for (const row of following) mine.add(row.id);
    }
    return {
      username,
      people: rows.map((row) => mapPerson(row, mine.has(row.user_id))),
    };
  });

export const listFollowing = createServerFn({ method: "GET" })
  .middleware([optionalAuthMiddleware])
  .validator((username: string) => normalizeUsername(username))
  .handler(async ({ context, data: username }) => {
    await ensureDemoProfiles();
    const sql = await getSql();
    const owner = await sql<{ user_id: string }>`
      select user_id from profile where username = ${username} and is_suspended = false limit 1
    `;
    if (!owner[0]) return { username, people: [] as Person[] };
    const rows = await sql<PersonSql>`
      select p.user_id, p.username, p.display_name, p.bio, p.avatar_url
      from follow f
      join profile p on p.user_id = f.following_id
      where f.follower_id = ${owner[0].user_id}
      order by f.created_at desc
    `;
    const mine = new Set<string>();
    if (context.userId) {
      const following = await sql<{ id: string }>`
        select following_id as id from follow where follower_id = ${context.userId}
      `;
      for (const row of following) mine.add(row.id);
    }
    return {
      username,
      people: rows.map((row) => mapPerson(row, mine.has(row.user_id))),
    };
  });

export const listSuggestedPeople = createServerFn({ method: "GET" })
  .middleware([optionalAuthMiddleware])
  .handler(async ({ context }) => {
    await ensureDemoProfiles();
    const sql = await getSql();
    const viewer = context.userId;
    const rows = viewer
      ? await sql<PersonSql>`
          select user_id, username, display_name, bio, avatar_url
          from profile
          where is_suspended = false
            and user_id <> ${viewer}
            and user_id not in (
              select following_id from follow where follower_id = ${viewer}
            )
          order by follower_count desc, created_at desc
          limit 8
        `
      : await sql<PersonSql>`
          select user_id, username, display_name, bio, avatar_url
          from profile
          where is_suspended = false
          order by follower_count desc, created_at desc
          limit 8
        `;
    return rows.map((row) => mapPerson(row, false));
  });
