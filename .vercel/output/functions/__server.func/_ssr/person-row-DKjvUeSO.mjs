import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as FollowButton, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-D9yfcyjT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/person-row-DKjvUeSO.js
var import_jsx_runtime = require_jsx_runtime();
function PersonRow({ person, viewerUsername, onFollow }) {
	const isSelf = viewerUsername === person.username;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/u/$username",
			params: { username: person.username },
			className: "flex min-w-0 flex-1 items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
				src: person.avatarUrl ?? void 0,
				alt: ""
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: person.displayName[0] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate font-medium",
					children: person.displayName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate text-sm text-muted",
					children: ["@", person.username]
				})]
			})]
		}), isSelf ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowButton, {
			username: person.username,
			following: person.following,
			onChange: (next) => onFollow?.(person.username, next.following)
		})]
	});
}
//#endregion
export { PersonRow as t };
