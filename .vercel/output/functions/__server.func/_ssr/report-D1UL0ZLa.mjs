import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { D as _enum, F as object, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-Bs_oVv3x.mjs";
import { t as authMiddleware } from "./middleware-Cw7doLtA.mjs";
import { t as ensureDemoPosts } from "./seed-D2Fu0ZYk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-D1UL0ZLa.js
var categories = [
	"spam",
	"harassment",
	"hate",
	"sexual",
	"violence",
	"copyright",
	"other"
];
var submitReport_createServerFn_handler = createServerRpc({
	id: "21af2a0229f09d00e9966e8f64b4364ac2de2959444d3e4440f845cfdb197094",
	name: "submitReport",
	filename: "src/lib/server/report.ts"
}, (opts) => submitReport.__executeServer(opts));
var submitReport = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	targetType: _enum([
		"user",
		"post",
		"comment"
	]),
	targetId: string().min(1).max(80),
	category: _enum(categories),
	details: string().max(280).optional()
}).parse(input)).handler(submitReport_createServerFn_handler, async ({ context, data }) => {
	await ensureDemoPosts();
	const sql = await getSql();
	const details = (data.details ?? "").trim().slice(0, 280);
	if (data.targetType === "post") {
		const rows = await sql`
        select author_id from post where id = ${data.targetId} and is_removed = false limit 1
      `;
		if (!rows[0]) throw new Error("That post is gone.");
		if (rows[0].author_id === context.userId) throw new Error("You cannot report your own post.");
	} else if (data.targetType === "comment") {
		const rows = await sql`
        select author_id from comment where id = ${data.targetId} limit 1
      `;
		if (!rows[0]) throw new Error("That comment is gone.");
		if (rows[0].author_id === context.userId) throw new Error("You cannot report your own comment.");
	} else {
		const rows = await sql`
        select user_id from profile where user_id = ${data.targetId} and is_suspended = false limit 1
      `;
		if (!rows[0]) throw new Error("That profile is gone.");
		if (rows[0].user_id === context.userId) throw new Error("You cannot report yourself.");
	}
	if ((await sql`
      select id from report
      where reporter_id = ${context.userId}
        and target_type = ${data.targetType}
        and target_id = ${data.targetId}
        and status = ${"open"}
      limit 1
    `)[0]) return { already: true };
	await sql`
      insert into report (id, reporter_id, target_type, target_id, category, details)
      values (${`r_${crypto.randomUUID()}`}, ${context.userId}, ${data.targetType}, ${data.targetId}, ${data.category}, ${details})
    `;
	return { already: false };
});
//#endregion
export { submitReport_createServerFn_handler };
