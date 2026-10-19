import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { C as useRouter, b as Link, x as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as authClient } from "./client-B40BzJxt.mjs";
import { i as useCurrentUserState, n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { a as passwordError, i as normalizeUsername, n as emailError, s as usernameError, t as ageError } from "./auth-D2ebFRuG.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as usernameAvailable, f as VybeWordmark, s as completeOnboarding } from "./router-BKbEaJrO.mjs";
import { t as Label } from "./label-CUR8A75G.mjs";
import { n as authErrorMessage, t as SocialButtons } from "./auth-errors-BEbK4L52.mjs";
import { t as Input } from "./input-DIG8Stcl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-CpU0vIHL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Signup() {
	const { user, isPending } = useCurrentUserState();
	const router = useRouter();
	const [name, setName] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [dob, setDob] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [formError, setFormError] = (0, import_react.useState)(null);
	const [usernameHint, setUsernameHint] = (0, import_react.useState)(null);
	if (!isPending && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	async function onSubmit(event) {
		event.preventDefault();
		const handle = normalizeUsername(username);
		const nextError = (!name.trim() ? "Enter your name." : null) ?? usernameError(handle) ?? emailError(email) ?? passwordError(password) ?? ageError(dob);
		if (nextError) {
			setFormError(nextError);
			return;
		}
		setSubmitting(true);
		setFormError(null);
		try {
			const availability = await usernameAvailable({ data: handle });
			if (!availability.available) {
				setFormError(availability.reason === "taken" ? "That username is taken." : usernameError(handle));
				return;
			}
			const { error } = await authClient.signUp.email({
				email: email.trim(),
				password,
				name: name.trim()
			});
			if (error) {
				setFormError(authErrorMessage(error.message, "Could not create that account."));
				return;
			}
			await authClient.getSession();
			try {
				await completeOnboarding({ data: {
					username: handle,
					displayName: name.trim(),
					dateOfBirth: dob
				} });
			} catch (err) {
				setFormError(err instanceof Error ? err.message : "Account created. Finish your profile.");
				await router.navigate({ to: "/onboarding" });
				return;
			}
			toast.success("You are in");
			await router.invalidate();
			await router.navigate({ to: "/" });
		} catch (err) {
			setFormError(authErrorMessage(err instanceof Error ? err.message : void 0, "Sign-up failed."));
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
				children: "Join the Circle"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "One identity for friends and discovery."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-4",
				onSubmit: (e) => void onSubmit(e),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							value: name,
							onChange: (e) => setName(e.target.value),
							autoComplete: "name",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "username",
								children: "Username"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "username",
								value: username,
								onChange: (e) => {
									setUsername(e.target.value.toLowerCase());
									setUsernameHint(null);
								},
								onBlur: () => {
									const handle = normalizeUsername(username);
									const invalid = usernameError(handle);
									if (invalid) {
										setUsernameHint(invalid);
										return;
									}
									usernameAvailable({ data: handle }).then((result) => {
										setUsernameHint(result.available ? "Available" : "That username is taken.");
									});
								},
								autoComplete: "username",
								required: true,
								minLength: 3,
								maxLength: 24
							}),
							usernameHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: usernameHint === "Available" ? "text-xs text-success" : "text-xs text-danger",
								children: usernameHint
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: "3–24 characters. Letters, numbers, periods, underscores."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							autoComplete: "email",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "Password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								autoComplete: "new-password",
								required: true,
								minLength: 8
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: "At least 8 characters. Stored hashed, never shown again."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "dob",
								children: "Date of birth"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "dob",
								type: "date",
								value: dob,
								onChange: (e) => setDob(e.target.value),
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: "You must be 13 or older. This is never shown on your profile."
							})
						]
					}),
					formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: formError
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						disabled: submitting || isPending,
						children: submitting ? "Creating account…" : "Create account"
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
					"Already on VYBE?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "text-brand hover:underline",
						children: "Sign in"
					})
				]
			})
		]
	});
}
//#endregion
export { Signup as component };
