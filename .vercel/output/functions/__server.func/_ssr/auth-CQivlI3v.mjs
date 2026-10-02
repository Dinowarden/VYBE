import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CQivlI3v.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-B40BzJxt.mjs").then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-LtRs5gN_.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
/**
* Same bearer forwarding as `authMiddleware`, but signed-out callers get
* `userId: null` instead of a 401. Use for public reads that personalize
* when a session exists (follow state on a profile).
*/
var optionalAuthMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-B40BzJxt.mjs").then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { getSessionUser } = await import("./verify.server-LtRs5gN_.mjs");
	return next({ context: { userId: (await getSessionUser(context.bearerToken))?.id ?? null } });
});
var USERNAME_RE = /^[a-z0-9._]{3,24}$/;
function normalizeUsername(value) {
	return value.trim().toLowerCase();
}
function usernameError(value) {
	const username = normalizeUsername(value);
	if (!USERNAME_RE.test(username)) return "Use 3–24 characters: lowercase letters, numbers, periods, or underscores.";
	return null;
}
function passwordError(value) {
	if (value.length < 8) return "Password needs at least 8 characters.";
	return null;
}
function emailError(value) {
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email.";
	return null;
}
function ageError(isoDate) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return "Enter your date of birth.";
	const dob = /* @__PURE__ */ new Date(`${isoDate}T00:00:00Z`);
	if (Number.isNaN(dob.getTime())) return "Enter a valid date.";
	const cutoff = /* @__PURE__ */ new Date();
	cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 13);
	if (dob > cutoff) return `You must be at least 13 to join VYBE.`;
	const oldest = /* @__PURE__ */ new Date();
	oldest.setUTCFullYear(oldest.getUTCFullYear() - 120);
	if (dob < oldest) return "Enter a valid date of birth.";
	return null;
}
function suggestUsername(name, email) {
	const raw = (name || email.split("@")[0] || "member").toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.+|\.+$/g, "").slice(0, 20);
	return raw.length >= 3 ? raw : `vybe${Math.random().toString(36).slice(2, 6)}`;
}
function isSafeAvatarUrl(value) {
	if (!value) return true;
	if (value.startsWith("data:image/")) return value.length <= 38e4;
	try {
		const url = new URL(value);
		return url.protocol === "https:" || url.protocol === "http:";
	} catch {
		return false;
	}
}
//#endregion
export { normalizeUsername as a, suggestUsername as c, isSafeAvatarUrl as i, usernameError as l, authMiddleware as n, optionalAuthMiddleware as o, emailError as r, passwordError as s, ageError as t };
