import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useCurrentUserState, n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { o as UserRound } from "../_libs/lucide-react.mjs";
import { _ as PagePending, c as getMyProfile, m as UserButton } from "./router-BKbEaJrO.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-6NeIfz2l.mjs";
import { i as listPostsByUsername, o as listSaved } from "./posts-D2_cdl82.mjs";
import { t as EmptyState } from "./empty-state-aFDV-KUF.mjs";
import { t as PostCard } from "./post-card-DwmGq5N2.mjs";
import { t as VideoCard } from "./video-card-DquZDAID.mjs";
import { t as ProfileHero } from "./profile-hero-BnZX49ub.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.index-CDvl0aaw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Profile() {
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [savedPosts, setSavedPosts] = (0, import_react.useState)([]);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const userId = user?.id ?? null;
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!userId) {
			setLoaded(true);
			setProfile(null);
			setPosts([]);
			setSavedPosts([]);
			return;
		}
		let cancelled = false;
		getMyProfile().then(async (row) => {
			if (cancelled) return;
			setProfile(row);
			const live = row ? await listPostsByUsername({ data: row.username }) : [];
			const saved = row ? await listSaved({ data: {} }) : [];
			if (cancelled) return;
			setPosts(live);
			setSavedPosts(saved);
			setLoaded(true);
		}).catch(() => {
			if (!cancelled) setLoaded(true);
		});
		return () => {
			cancelled = true;
		};
	}, [userId, isPending]);
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
	const videos = posts.filter((post) => post.kind === "video");
	const rest = posts.filter((post) => post.kind !== "video");
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
						className: "mt-4 flex flex-col gap-4",
						children: rest.length ? rest.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
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
						children: videos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid grid-cols-2 gap-2",
							children: videos.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, { post }, post.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: UserRound,
							title: "No clips yet",
							description: "Short videos you publish will collect here."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "saved",
						className: "mt-4 flex flex-col gap-4",
						children: savedPosts.length ? savedPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
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
