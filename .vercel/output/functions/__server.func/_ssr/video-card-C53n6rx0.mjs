import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Play } from "../_libs/lucide-react.mjs";
import { t as compactNumber } from "./format-dm0WgXG8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/video-card-C53n6rx0.js
var import_jsx_runtime = require_jsx_runtime();
function VideoCard({ post }) {
	const media = post.media[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/discover",
		className: "group relative block overflow-hidden rounded-2xl bg-elevated",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: media?.posterUrl ?? media?.url,
			alt: "",
			className: "aspect-[9/14] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/80 to-transparent p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "line-clamp-2 text-sm font-medium",
				children: post.caption
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 flex items-center gap-1 text-xs text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: compactNumber(post.viewCount)
				})]
			})]
		})]
	});
}
//#endregion
export { VideoCard as t };
