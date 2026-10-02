import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { C as useRouter, x as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useCurrentUserState, n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { a as normalizeUsername, c as suggestUsername, l as usernameError, t as ageError } from "./auth-CQivlI3v.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as getMyProfile, f as VybeWordmark, h as PagePending, p as RedirectToSignIn, s as completeOnboarding } from "./router-eLR-UVIk.mjs";
import { t as Label } from "./label-CUR8A75G.mjs";
import { t as Input } from "./input-DIG8Stcl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-DE5FDJGE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Onboarding() {
	const { user, isPending } = useCurrentUserState();
	const router = useRouter();
	const [ready, setReady] = (0, import_react.useState)(false);
	const [hasProfile, setHasProfile] = (0, import_react.useState)(false);
	const [username, setUsername] = (0, import_react.useState)("");
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [dob, setDob] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [formError, setFormError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		setDisplayName((current) => current || user.displayName || "");
		setUsername((current) => current || suggestUsername(user.displayName ?? "", user.primaryEmail ?? ""));
		let cancelled = false;
		getMyProfile().then((profile) => {
			if (cancelled) return;
			setHasProfile(Boolean(profile));
			setReady(true);
		}).catch(() => {
			if (!cancelled) setReady(true);
		});
		return () => {
			cancelled = true;
		};
	}, [user, isPending]);
	if (isPending || user && !ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePending, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (hasProfile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	async function onSubmit(event) {
		event.preventDefault();
		const handle = normalizeUsername(username);
		const nextError = (!displayName.trim() ? "Enter a display name." : null) ?? usernameError(handle) ?? ageError(dob);
		if (nextError) {
			setFormError(nextError);
			return;
		}
		setSubmitting(true);
		setFormError(null);
		try {
			await completeOnboarding({ data: {
				username: handle,
				displayName: displayName.trim(),
				dateOfBirth: dob
			} });
			toast.success("Profile ready");
			await router.navigate({ to: "/" });
		} catch (err) {
			setFormError(err instanceof Error ? err.message : "Could not save your profile.");
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
				children: "Claim your name"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "One last step. This is how people find you on VYBE."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-4",
				onSubmit: (e) => void onSubmit(e),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "displayName",
							children: "Display name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "displayName",
							value: displayName,
							onChange: (e) => setDisplayName(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "username",
							children: "Username"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "username",
							value: username,
							onChange: (e) => setUsername(e.target.value.toLowerCase()),
							required: true,
							minLength: 3,
							maxLength: 24
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "dob",
							children: "Date of birth"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "dob",
							type: "date",
							value: dob,
							onChange: (e) => setDob(e.target.value),
							required: true
						})]
					}),
					formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: formError
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						disabled: submitting,
						children: submitting ? "Saving…" : "Finish"
					})
				]
			})
		]
	});
}
//#endregion
export { Onboarding as component };
