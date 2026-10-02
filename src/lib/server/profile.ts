import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { ensureDemoProfiles } from "@/lib/server/seed";
import type { ProfileRow } from "@/lib/types";
import {
  ageError,
  isSafeAvatarUrl,
  normalizeUsername,
  usernameError,
} from "@/lib/validation/auth";

type ProfileSql = {
  user_id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string | null;
  date_of_birth: string | null;
  role: string;
  follower_count: number;
  following_count: number;
  like_count: number;
};

function mapProfile(row: ProfileSql): ProfileRow {
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
    likeCount: Number(row.like_count),
  };
}

export const usernameAvailable = createServerFn({ method: "POST" })
  .validator((username: string) => normalizeUsername(username))
  .handler(async ({ data: username }) => {
    if (usernameError(username)) return { available: false as const, reason: "invalid" as const };
    const sql = await getSql();
    const rows = await sql<{ x: number }>`
      select 1 as x from profile where username = ${username} limit 1
    `;
    return { available: rows.length === 0, reason: rows.length ? ("taken" as const) : null };
  });

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<ProfileSql>`
      select user_id, username, display_name, bio, avatar_url, date_of_birth,
             role, follower_count, following_count, like_count
      from profile
      where user_id = ${context.userId}
      limit 1
    `;
    return rows[0] ? mapProfile(rows[0]) : null;
  });

export const getProfileByUsername = createServerFn({ method: "GET" })
  .validator((username: string) => normalizeUsername(username))
  .handler(async ({ data: username }) => {
    await ensureDemoProfiles();
    const sql = await getSql();
    const rows = await sql<ProfileSql>`
      select user_id, username, display_name, bio, avatar_url, date_of_birth,
             role, follower_count, following_count, like_count
      from profile
      where username = ${username} and is_suspended = false
      limit 1
    `;
    return rows[0] ? mapProfile(rows[0]) : null;
  });

const onboardingSchema = z.object({
  username: z.string().min(3).max(24),
  displayName: z.string().trim().min(1).max(48),
  dateOfBirth: z.string(),
});

export const completeOnboarding = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => onboardingSchema.parse(input))
  .handler(async ({ context, data }) => {
    const username = normalizeUsername(data.username);
    const userErr = usernameError(username);
    if (userErr) throw new Error(userErr);
    const dobErr = ageError(data.dateOfBirth);
    if (dobErr) throw new Error(dobErr);

    const sql = await getSql();
    const existing = await sql<ProfileSql>`
      select user_id, username, display_name, bio, avatar_url, date_of_birth,
             role, follower_count, following_count, like_count
      from profile where user_id = ${context.userId} limit 1
    `;
    if (existing[0]) return mapProfile(existing[0]);

    const taken = await sql<{ x: number }>`
      select 1 as x from profile where username = ${username} limit 1
    `;
    if (taken.length) throw new Error("That username is taken.");

    try {
      await sql`
        insert into profile (user_id, username, display_name, date_of_birth)
        values (${context.userId}, ${username}, ${data.displayName.trim()}, ${data.dateOfBirth})
      `;
    } catch {
      throw new Error("That username is taken.");
    }

    const created = await sql<ProfileSql>`
      select user_id, username, display_name, bio, avatar_url, date_of_birth,
             role, follower_count, following_count, like_count
      from profile where user_id = ${context.userId} limit 1
    `;
    if (!created[0]) throw new Error("Could not create your profile.");
    return mapProfile(created[0]);
  });

const updateSchema = z.object({
  username: z.string().min(3).max(24),
  displayName: z.string().trim().min(1).max(48),
  bio: z.string().max(160),
  avatarUrl: z.string().nullable(),
});

export const updateProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => updateSchema.parse(input))
  .handler(async ({ context, data }) => {
    const username = normalizeUsername(data.username);
    const userErr = usernameError(username);
    if (userErr) throw new Error(userErr);
    const displayName = data.displayName.trim();
    if (!displayName) throw new Error("Enter a display name.");
    const bio = data.bio.trim();
    if (bio.length > 160) throw new Error("Bio must be 160 characters or less.");
    if (!isSafeAvatarUrl(data.avatarUrl)) throw new Error("That photo could not be saved.");

    const sql = await getSql();
    const mine = await sql<ProfileSql>`
      select user_id, username, display_name, bio, avatar_url, date_of_birth,
             role, follower_count, following_count, like_count
      from profile where user_id = ${context.userId} limit 1
    `;
    if (!mine[0]) throw new Error("Finish joining VYBE first.");

    const taken = await sql<{ x: number }>`
      select 1 as x from profile
      where username = ${username} and user_id <> ${context.userId}
      limit 1
    `;
    if (taken.length) throw new Error("That username is taken.");

    await sql`
      update profile
      set username = ${username},
          display_name = ${displayName},
          bio = ${bio},
          avatar_url = ${data.avatarUrl},
          updated_at = now()
      where user_id = ${context.userId}
    `;

    const updated = await sql<ProfileSql>`
      select user_id, username, display_name, bio, avatar_url, date_of_birth,
             role, follower_count, following_count, like_count
      from profile where user_id = ${context.userId} limit 1
    `;
    if (!updated[0]) throw new Error("Could not save your profile.");
    return mapProfile(updated[0]);
  });
