import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { i as useCurrentUserState } from "./createSsrRpc-B2Izd0c7.mjs";
import { _ as PagePending, p as RedirectToSignIn } from "./router-BKbEaJrO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-guard-CNj-GCw_.js
var import_jsx_runtime = require_jsx_runtime();
function RequireAuth({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePending, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { RequireAuth as t };
