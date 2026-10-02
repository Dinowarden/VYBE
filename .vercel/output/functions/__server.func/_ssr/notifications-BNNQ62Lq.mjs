import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { t as RequireAuth } from "./auth-guard-DaR5Om3G.mjs";
import { r as demoNotifications } from "./demo-data-Ce69zrXT.mjs";
import { i as FollowButton, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-D9yfcyjT.mjs";
import { n as relativeTime } from "./format-dm0WgXG8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-BNNQ62Lq.js
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notifications, {}) });
}
function Notifications() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-xl px-4 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 hidden md:block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
				children: "Signals"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-1 text-3xl font-semibold",
				children: "What moved"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border rounded-3xl bg-surface px-2 shadow-[var(--shadow-border)]",
			children: demoNotifications.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-3 px-3 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "size-11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
							src: item.actor.avatarUrl,
							alt: ""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: item.actor.displayName[0] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm leading-snug",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/u/$username",
									params: { username: item.actor.username },
									className: "font-medium hover:underline",
									children: item.actor.displayName
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: item.body
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: relativeTime(item.createdAt)
						})]
					}),
					item.type === "follow" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowButton, {
						username: item.actor.username,
						following: false
					}) : item.post ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/post/$postId",
							params: { postId: item.post.id },
							children: "View"
						})
					}) : null
				]
			}, item.id))
		})]
	});
}
//#endregion
export { NotificationsPage as component };
