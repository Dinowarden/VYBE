import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as Search } from "../_libs/lucide-react.mjs";
import { o as Route$9 } from "./router-eLR-UVIk.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-6NeIfz2l.mjs";
import { a as demoUsers, i as demoPosts } from "./demo-data-Ce69zrXT.mjs";
import { i as FollowButton, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-D9yfcyjT.mjs";
import { t as useFollowing } from "./use-following-C82Qqg7Y.mjs";
import { t as Input } from "./input-DIG8Stcl.mjs";
import { t as PostCard } from "./post-card-CXUHZX2U.mjs";
import { t as EmptyState } from "./empty-state-aFDV-KUF.mjs";
import { t as VideoCard } from "./video-card-C53n6rx0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-B3KGNgGb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q: initial } = Route$9.useSearch();
	const [q, setQ] = (0, import_react.useState)(initial ?? "");
	const query = q.trim().toLowerCase().replace(/^#/, "");
	const { follows, myUsername } = useFollowing();
	const people = (0, import_react.useMemo)(() => demoUsers.filter((user) => !query || user.username.includes(query) || user.displayName.toLowerCase().includes(query)), [query]);
	const tags = (0, import_react.useMemo)(() => {
		const counts = /* @__PURE__ */ new Map();
		for (const post of demoPosts) for (const tag of post.hashtags) if (!query || tag.includes(query)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
		return [...counts.entries()].sort((a, b) => b[1] - a[1]);
	}, [query]);
	const posts = (0, import_react.useMemo)(() => demoPosts.filter((post) => post.kind !== "video" && (!query || post.caption.toLowerCase().includes(query) || post.hashtags.some((tag) => tag.includes(query)))), [query]);
	const videos = (0, import_react.useMemo)(() => demoPosts.filter((post) => post.kind === "video" && (!query || post.caption.toLowerCase().includes(query) || post.hashtags.some((tag) => tag.includes(query)))), [query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-xl px-4 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search people, tags, posts",
				className: "pl-10",
				"aria-label": "Search VYBE"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "people",
			className: "mt-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "people",
							className: "flex-1",
							children: "People"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "tags",
							className: "flex-1",
							children: "Tags"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "posts",
							className: "flex-1",
							children: "Posts"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "videos",
							className: "flex-1",
							children: "Videos"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "people",
					className: "mt-4 space-y-3",
					children: people.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Search,
						title: "No people found",
						description: "Try a name or username."
					}) : people.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/u/$username",
							params: { username: user.username },
							className: "flex min-w-0 flex-1 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								src: user.avatarUrl,
								alt: ""
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: user.displayName[0] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: user.displayName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm text-muted",
									children: ["@", user.username]
								})]
							})]
						}), myUsername === user.username ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowButton, {
							username: user.username,
							following: follows(user.username)
						})]
					}, user.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "tags",
					className: "mt-4 space-y-2",
					children: tags.map(([tag, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setQ(`#${tag}`),
						className: "flex w-full items-center justify-between rounded-2xl bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium",
							children: ["#", tag]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm tabular-nums text-muted",
							children: count
						})]
					}, tag))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "posts",
					className: "mt-4 flex flex-col gap-4",
					children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "videos",
					className: "mt-4 grid grid-cols-2 gap-2",
					children: videos.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, { post }, post.id))
				})
			]
		})]
	});
}
//#endregion
export { SearchPage as component };
