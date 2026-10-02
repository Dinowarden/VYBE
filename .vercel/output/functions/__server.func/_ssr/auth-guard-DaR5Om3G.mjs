import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { i as useCurrentUserState } from "./createSsrRpc-B2Izd0c7.mjs";
import { h as PagePending, p as RedirectToSignIn } from "./router-eLR-UVIk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-guard-DaR5Om3G.js
var import_jsx_runtime = require_jsx_runtime();
function RequireAuth({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePending, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { RequireAuth as t };
