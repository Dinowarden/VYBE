import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { C as useRouter, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { i as normalizeUsername, s as usernameError } from "./auth-D2ebFRuG.mjs";
import { t as X, x as Camera } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as PagePending, c as getMyProfile, d as usernameAvailable, u as updateProfile } from "./router-BKbEaJrO.mjs";
import { t as RequireAuth } from "./auth-guard-CNj-GCw_.mjs";
import { t as Label } from "./label-CUR8A75G.mjs";
import { t as Textarea } from "./textarea-Bh-ZS9iN.mjs";
import { t as Input } from "./input-DIG8Stcl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.edit-DgTNoAXW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SIZE = 320;
var MAX_DATA_URL = 38e4;
async function resizeAvatar(file) {
	if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
	if (file.size > 8e6) throw new Error("That image is too large.");
	const bitmap = await createImageBitmap(file);
	const canvas = document.createElement("canvas");
	canvas.width = SIZE;
	canvas.height = SIZE;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not process that image.");
	const scale = Math.max(SIZE / bitmap.width, SIZE / bitmap.height);
	const w = bitmap.width * scale;
	const h = bitmap.height * scale;
	ctx.drawImage(bitmap, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
	bitmap.close();
	const dataUrl = canvas.toDataURL("image/jpeg", .84);
	if (dataUrl.length > MAX_DATA_URL) throw new Error("Could not compress that image. Try a simpler photo.");
	return dataUrl;
}
function EditProfilePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditProfile, {}) });
}
function EditProfile() {
	const router = useRouter();
	const fileRef = (0, import_react.useRef)(null);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const [originalUsername, setOriginalUsername] = (0, import_react.useState)("");
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [bio, setBio] = (0, import_react.useState)("");
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)(null);
	const [usernameHint, setUsernameHint] = (0, import_react.useState)(null);
	const [formError, setFormError] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getMyProfile().then((profile) => {
			if (cancelled) return;
			if (!profile) {
				router.navigate({ to: "/onboarding" });
				return;
			}
			setOriginalUsername(profile.username);
			setDisplayName(profile.displayName);
			setUsername(profile.username);
			setBio(profile.bio);
			setAvatarUrl(profile.avatarUrl);
			setLoaded(true);
		}).catch(() => {
			if (!cancelled) router.navigate({ to: "/onboarding" });
		});
		return () => {
			cancelled = true;
		};
	}, [router]);
	if (!loaded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePending, {});
	async function onPick(file) {
		if (!file) return;
		try {
			const next = await resizeAvatar(file);
			setAvatarUrl(next);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not use that photo.");
		}
	}
	async function onUsernameBlur() {
		const handle = normalizeUsername(username);
		if (handle === originalUsername) {
			setUsernameHint(null);
			return;
		}
		const invalid = usernameError(handle);
		if (invalid) {
			setUsernameHint(invalid);
			return;
		}
		const result = await usernameAvailable({ data: handle });
		setUsernameHint(result.available ? "Available" : "That username is taken.");
	}
	async function onSubmit(event) {
		event.preventDefault();
		const handle = normalizeUsername(username);
		const nextError = (!displayName.trim() ? "Enter a display name." : null) ?? usernameError(handle) ?? (bio.length > 160 ? "Bio must be 160 characters or less." : null);
		if (nextError) {
			setFormError(nextError);
			return;
		}
		setSaving(true);
		setFormError(null);
		try {
			await updateProfile({ data: {
				username: handle,
				displayName: displayName.trim(),
				bio,
				avatarUrl
			} });
			toast.success("Profile saved");
			await router.invalidate();
			await router.navigate({ to: "/profile" });
		} catch (err) {
			setFormError(err instanceof Error ? err.message : "Could not save your profile.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-xl px-4 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 hidden md:block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
				children: "You"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-1 text-3xl font-semibold",
				children: "Edit profile"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-5",
			onSubmit: (e) => void onSubmit(e),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => fileRef.current?.click(),
							className: "relative grid size-24 place-items-center overflow-hidden rounded-full bg-elevated shadow-[var(--shadow-border)]",
							"aria-label": "Change photo",
							children: [avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: avatarUrl,
								alt: "",
								className: "size-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl",
								children: displayName.charAt(0).toUpperCase() || "Y"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-x-0 bottom-0 flex justify-center bg-bg/70 py-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Profile photo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted",
									children: "Square crop, kept on your profile. JPG or PNG."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "secondary",
										onClick: () => fileRef.current?.click(),
										children: "Upload"
									}), avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										size: "sm",
										variant: "ghost",
										onClick: () => setAvatarUrl(null),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), "Remove"]
									}) : null]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/*",
							className: "sr-only",
							onChange: (e) => void onPick(e.target.files?.[0])
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "displayName",
						children: "Display name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "displayName",
						value: displayName,
						onChange: (e) => setDisplayName(e.target.value),
						maxLength: 48,
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
							onBlur: () => void onUsernameBlur(),
							minLength: 3,
							maxLength: 24,
							required: true
						}),
						usernameHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: usernameHint === "Available" ? "text-xs text-success" : "text-xs text-danger",
							children: usernameHint
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-subtle",
							children: ["This is how people find you: @", normalizeUsername(username) || "you"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "bio",
							children: "Bio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "bio",
							value: bio,
							onChange: (e) => setBio(e.target.value),
							maxLength: 160,
							placeholder: "What you make. Where you are. One line is enough.",
							className: "min-h-28"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-right text-xs tabular-nums text-subtle",
							children: [bio.length, "/160"]
						})
					]
				}),
				formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					children: formError
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "flex-1",
						disabled: saving,
						children: saving ? "Saving…" : "Save"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						type: "button",
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/profile",
							children: "Cancel"
						})
					})]
				})
			]
		})]
	});
}
//#endregion
export { EditProfilePage as component };
