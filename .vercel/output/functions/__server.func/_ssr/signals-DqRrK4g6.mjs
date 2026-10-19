import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-Bs_oVv3x.mjs";
import { t as authMiddleware } from "./middleware-Cw7doLtA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signals-DqRrK4g6.js
function asIso(value) {
	if (/^\d{4}-\d{2}-\d{2}/.test(value) && value.includes("T")) return value;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? value : date.toISOString();
}
function bodyFor(row) {
	if (row.type === "follow") return "started following you";
	if (row.type === "comment") return "commented on your post";
	if (row.type === "share") return "shared your post";
	if (row.comment_id) return "liked your comment";
	return "liked your post";
}
function toSignal(row) {
	return {
		id: row.id,
		type: row.type,
		postId: row.post_id,
		actor: {
			id: row.actor_id,
			username: row.username,
			displayName: row.display_name,
			avatarUrl: row.avatar_url ?? ""
		},
		body: bodyFor(row),
		createdAt: asIso(String(row.created_at)),
		read: Boolean(row.read_at)
	};
}
var listSignals_createServerFn_handler = createServerRpc({
	id: "a3e36d7dfd5486e406752f1d34039cf5f495bba59fbe1415b645e30baca56ffb",
	name: "listSignals",
	filename: "src/lib/server/signals.ts"
}, (opts) => listSignals.__executeServer(opts));
var listSignals = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(() => ({})).handler(listSignals_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const rows = await sql`
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
var unreadSignalCount_createServerFn_handler = createServerRpc({
	id: "b3076f291e5cc6cc952c09c9637e853a80cb302b23478a8639940f6a7caf7439",
	name: "unreadSignalCount",
	filename: "src/lib/server/signals.ts"
}, (opts) => unreadSignalCount.__executeServer(opts));
var unreadSignalCount = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(() => ({})).handler(unreadSignalCount_createServerFn_handler, async ({ context }) => {
	const rows = await (await getSql())`
      select count(*)::int as n from notification
      where recipient_id = ${context.userId} and read_at is null
    `;
	return Number(rows[0]?.n ?? 0);
});
//#endregion
export { listSignals_createServerFn_handler, unreadSignalCount_createServerFn_handler };
