import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { ensureDemoPosts } from "@/lib/server/seed";

const categories = ["spam", "harassment", "hate", "sexual", "violence", "copyright", "other"] as const;

export const submitReport = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z
      .object({
        targetType: z.enum(["user", "post", "comment"]),
        targetId: z.string().min(1).max(80),
        category: z.enum(categories),
        details: z.string().max(280).optional(),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    await ensureDemoPosts();
    const sql = await getSql();
    const details = (data.details ?? "").trim().slice(0, 280);

    if (data.targetType === "post") {
      const rows = await sql<{ author_id: string }>`
        select author_id from post where id = ${data.targetId} and is_removed = false limit 1
      `;
      if (!rows[0]) throw new Error("That post is gone.");
      if (rows[0].author_id === context.userId) throw new Error("You cannot report your own post.");
    } else if (data.targetType === "comment") {
      const rows = await sql<{ author_id: string }>`
        select author_id from comment where id = ${data.targetId} limit 1
      `;
      if (!rows[0]) throw new Error("That comment is gone.");
      if (rows[0].author_id === context.userId) throw new Error("You cannot report your own comment.");
    } else {
      const rows = await sql<{ user_id: string }>`
        select user_id from profile where user_id = ${data.targetId} and is_suspended = false limit 1
      `;
      if (!rows[0]) throw new Error("That profile is gone.");
      if (rows[0].user_id === context.userId) throw new Error("You cannot report yourself.");
    }

    const existing = await sql<{ id: string }>`
      select id from report
      where reporter_id = ${context.userId}
        and target_type = ${data.targetType}
        and target_id = ${data.targetId}
        and status = ${"open"}
      limit 1
    `;
    if (existing[0]) return { already: true };

    const id = `r_${crypto.randomUUID()}`;
    await sql`
      insert into report (id, reporter_id, target_type, target_id, category, details)
      values (${id}, ${context.userId}, ${data.targetType}, ${data.targetId}, ${data.category}, ${details})
    `;
    return { already: false };
  });
