import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useCurrentUserState, n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { o as UserRound } from "../_libs/lucide-react.mjs";
import { c as getMyProfile, h as PagePending, m as UserButton } from "./router-eLR-UVIk.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-6NeIfz2l.mjs";
import { t as EmptyState } from "./empty-state-aFDV-KUF.mjs";
import { t as ProfileHero } from "./profile-hero-BOlSjusu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.index-DPILQ1xm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Profile() {
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			setLoaded(true);
			setProfile(null);
			return;
		}
		let cancelled = false;
		getMyProfile().then((row) => {
			if (!cancelled) {
				setProfile(row);
				setLoaded(true);
			}
		}).catch(() => {
			if (!cancelled) setLoaded(true);
		});
		return () => {
			cancelled = true;
		};
	}, [user, isPending]);
	if (isPending || !loaded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePending, {});
	if (!user || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto w-full max-w-xl px-4 py-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-[1.75rem] bg-surface shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 bg-elevated" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "-mt-10 mb-4 grid size-20 place-items-center rounded-full bg-bg shadow-[var(--shadow-border)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-8 text-muted" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-semibold",
						children: "Your VYBE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Claim a username, keep a Circle, and publish to Pulse."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/signup",
								children: "Join VYBE"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Sign in"
							})
						})]
					})
				]
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-xl px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileHero, {
				profile,
				isOwner: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/u/$username",
					params: { username: profile.username },
					className: "text-sm text-muted hover:text-fg hover:underline",
					children: "View public profile"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "posts",
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "posts",
								className: "flex-1",
								children: "Posts"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "videos",
								className: "flex-1",
								children: "Videos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "saved",
								className: "flex-1",
								children: "Saved"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "posts",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: UserRound,
							title: "Nothing here yet",
							description: "Your text and image posts will live on this tab.",
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/create",
									children: "Create a post"
								})
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "videos",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: UserRound,
							title: "No clips yet",
							description: "Short videos you publish will collect here."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "saved",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: UserRound,
							title: "Saved is empty",
							description: "Bookmarks from Circle and Pulse will wait for you here."
						})
					})
				]
			})
		]
	});
}
//#endregion
export { Profile as component };
