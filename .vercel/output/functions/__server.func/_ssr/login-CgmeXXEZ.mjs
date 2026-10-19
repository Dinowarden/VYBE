import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { C as useRouter, b as Link, x as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as authClient } from "./client-B40BzJxt.mjs";
import { i as useCurrentUserState, n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { a as passwordError, n as emailError } from "./auth-D2ebFRuG.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as VybeWordmark } from "./router-BKbEaJrO.mjs";
import { t as Label } from "./label-CUR8A75G.mjs";
import { n as authErrorMessage, t as SocialButtons } from "./auth-errors-BEbK4L52.mjs";
import { t as Input } from "./input-DIG8Stcl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CgmeXXEZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	const router = useRouter();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [formError, setFormError] = (0, import_react.useState)(null);
	if (!isPending && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	async function onSubmit(event) {
		event.preventDefault();
		const nextError = emailError(email) ?? passwordError(password);
		if (nextError) {
			setFormError(nextError);
			return;
		}
		setSubmitting(true);
		setFormError(null);
		try {
			const { error } = await authClient.signIn.email({
				email: email.trim(),
				password
			});
			if (error) {
				setFormError(authErrorMessage(error.message, "Those credentials do not match."));
				return;
			}
			await authClient.getSession();
			toast.success("Welcome back");
			await router.invalidate();
			await router.navigate({ to: "/" });
		} catch (err) {
			setFormError(authErrorMessage(err instanceof Error ? err.message : void 0, "Sign-in failed."));
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VybeWordmark, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-8 text-3xl font-semibold",
				children: "Welcome back"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Your Circle is waiting. Pulse never stopped."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-4",
				onSubmit: (e) => void onSubmit(e),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							autoComplete: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "password",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "password",
							type: "password",
							autoComplete: "current-password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true,
							minLength: 8
						})]
					}),
					formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: formError
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						disabled: submitting || isPending,
						children: submitting ? "Signing in…" : "Sign in"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-6 flex items-center gap-3 text-xs text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
					"or",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
				]
			}),
			isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-2xl bg-elevated" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialButtons, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-center text-sm text-muted",
				children: [
					"New here?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						className: "text-brand hover:underline",
						children: "Join VYBE"
					})
				]
			})
		]
	});
}
//#endregion
export { Login as component };
