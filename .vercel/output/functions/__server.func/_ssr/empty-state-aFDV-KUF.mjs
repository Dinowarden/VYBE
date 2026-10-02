import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/empty-state-aFDV-KUF.js
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ icon: Icon, title, description, action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center px-6 py-16 text-center", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 grid size-14 place-items-center rounded-2xl bg-elevated text-brand shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-6",
					strokeWidth: 1.75
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm leading-relaxed text-muted",
				children: description
			}),
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: action
			}) : null
		]
	});
}
//#endregion
export { EmptyState as t };
