import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { g as Heart } from "../_libs/lucide-react.mjs";
import { t as compactNumber } from "./format-dm0WgXG8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/like-button-DX9GuhZy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LikeButton({ liked: likedProp, count, variant = "row", className }) {
	const [liked, setLiked] = (0, import_react.useState)(likedProp);
	const [value, setValue] = (0, import_react.useState)(count);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => {
			const next = !liked;
			setLiked(next);
			setValue((n) => n + (next ? 1 : -1));
		},
		"aria-pressed": liked,
		"aria-label": liked ? "Unlike" : "Like",
		className: cn("inline-flex items-center gap-1.5 text-sm transition-colors", variant === "rail" ? "flex-col gap-1 text-fg" : "text-muted hover:text-fg", liked && "text-brand", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
			className: cn(variant === "rail" ? "size-7" : "size-5", liked && "fill-brand text-brand"),
			strokeWidth: 1.75
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums",
			children: compactNumber(value)
		})]
	});
}
//#endregion
export { LikeButton as t };
