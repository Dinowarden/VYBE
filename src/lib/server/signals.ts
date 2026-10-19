import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";

type SignalType = "follow" | "like" | "comment" | "share";

type SignalSql = {
  id: string;
  type: SignalType;
  post_id: string | null;
  comment_id: string | null;
  read_at: string | null;
  created_at: string;
  actor_id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
};

export type SignalItem = {
  id: string;
  type: SignalType;
  postId: string | null;
  actor: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
  };
  body: string;
  createdAt: string;
  read: boolean;
};

function asIso(value: string) {
  if (/^\d{4}-\d{2}-\d{2}/.test(value) && value.includes("T")) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString();
}

function bodyFor(row: SignalSql) {
  if (row.type === "follow") return "started following you";
  if (row.type === "comment") return "commented on your post";
  if (row.type === "share") return "shared your post";
  if (row.comment_id) return "liked your comment";
  return "liked your post";
}

function toSignal(row: SignalSql): SignalItem {
  return {
    id: row.id,
    type: row.type,
    postId: row.post_id,
    actor: {
      id: row.actor_id,
      username: row.username,
      displayName: row.display_name,
      avatarUrl: row.avatar_url ?? "",
    },
    body: bodyFor(row),
    createdAt: asIso(String(row.created_at)),
    read: Boolean(row.read_at),
  };
}

export const listSignals = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(() => ({}))
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<SignalSql>`
      select
        n.id, n.type, n.post_id, n.comment_id, n.read_at, n.created_at,
        a.user_id as actor_id, a.username, a.display_name, a.avatar_url
      from notification n
      join profile a on a.user_id = n.actor_id
      where n.recipient_id = ${context.userId}
      order by n.created_at desc
      limit 50
    `;
    await sql`
      update notification set read_at = now()
      where recipient_id = ${context.userId} and read_at is null
    `;
    return rows.map(toSignal);
  });

export const unreadSignalCount = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(() => ({}))
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ n: number }>`
      select count(*)::int as n from notification
      where recipient_id = ${context.userId} and read_at is null
    `;
    return Number(rows[0]?.n ?? 0);
  });
