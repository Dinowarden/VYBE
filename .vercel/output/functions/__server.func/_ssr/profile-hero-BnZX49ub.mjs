import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { i as FollowButton, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./use-following-D41X06CL.mjs";
import { t as compactNumber } from "./format-dm0WgXG8.mjs";
import { n as ReportButton } from "./share-button-DareN5E5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-hero-BnZX49ub.js
var import_jsx_runtime = require_jsx_runtime();
function ProfileHero({ profile, isOwner, following = false, onFollowChange }) {
	const initial = profile.displayName.charAt(0).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "overflow-hidden rounded-[1.75rem] bg-surface shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 bg-[linear-gradient(135deg,#1e1d26_0%,#2a1a16_55%,#16151c_100%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 pb-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "-mt-10 flex items-end gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "size-20 shadow-[var(--shadow-lift)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								src: profile.avatarUrl ?? void 0,
								alt: ""
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								className: "text-2xl",
								children: initial
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display truncate text-2xl font-semibold",
								children: profile.displayName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: ["@", profile.username]
							})]
						}),
						isOwner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profile/edit",
								children: "Edit"
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex flex-col items-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowButton, {
								username: profile.username,
								following,
								onChange: onFollowChange
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportButton, {
								targetType: "user",
								targetId: profile.userId,
								ownerId: profile.userId,
								variant: "text"
							})]
						})
					]
				}),
				profile.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed",
					children: profile.bio
				}) : isOwner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Add a bio so people know what you make."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-5 grid grid-cols-3 gap-2 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Followers",
							value: profile.followerCount,
							to: "/u/$username/followers",
							username: profile.username
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Following",
							value: profile.followingCount,
							to: "/u/$username/following",
							username: profile.username
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Likes",
							value: profile.likeCount
						})
					]
				})
			]
		})]
	});
}
function Stat({ label, value, to, username }) {
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "font-display text-lg font-semibold tabular-nums",
		children: compactNumber(value)
	})] });
	if (to && username) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		params: { username },
		className: "rounded-xl py-1 hover:bg-elevated",
		children: inner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: inner });
}
//#endregion
export { ProfileHero as t };
