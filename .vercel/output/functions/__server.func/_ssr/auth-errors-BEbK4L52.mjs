import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { r as signIn } from "./client-B40BzJxt.mjs";
import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { t as GROK_PROVIDERS } from "./server-Cs3vF-XQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-errors-BEbK4L52.js
var import_jsx_runtime = require_jsx_runtime();
function SocialButtons({ callbackURL = "/onboarding" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-2",
		children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			className: "w-full",
			onClick: () => void signIn(provider.providerId, {
				callbackURL,
				errorCallbackURL: "/login"
			}),
			children: ["Continue with ", provider.label]
		}, provider.providerId))
	});
}
/** Map Better Auth errors to copy that never leaks credentials or existence details. */
function authErrorMessage(raw, fallback) {
	const message = (raw ?? "").toLowerCase();
	if (!message) return fallback;
	if (message.includes("already exists") || message.includes("already registered") || message.includes("user already")) return "That email is already on VYBE. Sign in instead.";
	if (message.includes("invalid email or password") || message.includes("invalid password") || message.includes("invalid credentials")) return "Those credentials do not match.";
	if (message.includes("password") && message.includes("too short")) return "Password needs at least 8 characters.";
	if (message.includes("invalid origin")) return "Open VYBE from the app itself to sign in.";
	if (message.includes("unauthorized")) return fallback;
	return raw?.trim() || fallback;
}
//#endregion
export { authErrorMessage as n, SocialButtons as t };
