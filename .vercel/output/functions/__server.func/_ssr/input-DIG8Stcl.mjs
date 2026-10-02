import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-DIG8Stcl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = (0, import_react.forwardRef)(function Input({ className, type = "text", ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		ref,
		className: cn("flex h-11 w-full rounded-xl bg-elevated px-3.5 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-ring/70 disabled:opacity-40", className),
		...props
	});
});
//#endregion
export { Input as t };
