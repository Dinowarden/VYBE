import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { C as Bell } from "../_libs/lucide-react.mjs";
import { _ as PagePending, g as listSignals, h as clearUnreadSignals } from "./router-BKbEaJrO.mjs";
import { t as RequireAuth } from "./auth-guard-CNj-GCw_.mjs";
import { c as useFollowing, i as FollowButton, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./use-following-D41X06CL.mjs";
import { n as relativeTime } from "./format-dm0WgXG8.mjs";
import { t as EmptyState } from "./empty-state-aFDV-KUF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-BkMwPe40.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notifications, {}) });
}
function Notifications() {
	const { follows } = useFollowing();
	const [items, setItems] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		listSignals({ data: {} }).then((rows) => {
			if (cancelled) return;
			setItems(rows);
			clearUnreadSignals();
		}).catch(() => {
			if (!cancelled) setItems([]);
		});
		return () => {
			cancelled = true;
		};
	}, []);
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
		}), items === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePending, {}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Bell,
			title: "Nothing moving yet",
			description: "Follows, likes, comments, and shares will show up here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border rounded-3xl bg-surface px-2 shadow-[var(--shadow-border)]",
			children: items.map((item) => {
				const initials = item.actor.displayName.split(" ").map((part) => part[0]).join("").slice(0, 2);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("flex items-center gap-3 px-3 py-4", !item.read && "bg-brand/5"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/u/$username",
							params: { username: item.actor.username },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "size-11",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									src: item.actor.avatarUrl,
									alt: ""
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: initials })]
							})
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
							following: follows(item.actor.username)
						}) : item.postId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/post/$postId",
								params: { postId: item.postId },
								children: "View"
							})
						}) : null
					]
				}, item.id);
			})
		})]
	});
}
//#endregion
export { NotificationsPage as component };
