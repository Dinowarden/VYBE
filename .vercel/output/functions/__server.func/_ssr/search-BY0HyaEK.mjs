import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as Search } from "../_libs/lucide-react.mjs";
import { o as Route$9 } from "./router-BKbEaJrO.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-6NeIfz2l.mjs";
import { s as searchVybe } from "./posts-D2_cdl82.mjs";
import { c as useFollowing, i as FollowButton, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./use-following-D41X06CL.mjs";
import { t as Input } from "./input-DIG8Stcl.mjs";
import { t as EmptyState } from "./empty-state-aFDV-KUF.mjs";
import { t as PostCard } from "./post-card-DwmGq5N2.mjs";
import { t as VideoCard } from "./video-card-DquZDAID.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-BY0HyaEK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	people: [],
	tags: [],
	posts: [],
	videos: []
};
function SearchPage() {
	const { q: initial } = Route$9.useSearch();
	const [q, setQ] = (0, import_react.useState)(initial ?? "");
	const [tab, setTab] = (0, import_react.useState)(initial?.trim().startsWith("#") ? "tags" : "people");
	const [result, setResult] = (0, import_react.useState)(empty);
	const [ready, setReady] = (0, import_react.useState)(false);
	const { follows, myUsername } = useFollowing();
	(0, import_react.useEffect)(() => {
		setQ(initial ?? "");
	}, [initial]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const timer = setTimeout(() => {
			searchVybe({ data: { q } }).then((next) => {
				if (cancelled) return;
				setResult(next);
				setReady(true);
				if (q.trim().startsWith("#")) setTab("tags");
				else if (next.people.length) setTab("people");
				else if (next.posts.length) setTab("posts");
				else if (next.videos.length) setTab("videos");
				else if (next.tags.length) setTab("tags");
			}).catch(() => {
				if (!cancelled) {
					setResult(empty);
					setReady(true);
				}
			});
		}, 180);
		return () => {
			cancelled = true;
			clearTimeout(timer);
		};
	}, [q]);
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
			value: tab,
			onValueChange: setTab,
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
					children: ready && result.people.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Search,
						title: "No people found",
						description: "Try a name or username."
					}) : result.people.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					children: ready && result.tags.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Search,
						title: "No tags found",
						description: "Hashtags from posts show up here."
					}) : result.tags.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setQ(`#${item.tag}`),
						className: "flex w-full items-center justify-between rounded-2xl bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium",
							children: ["#", item.tag]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm tabular-nums text-muted",
							children: item.count
						})]
					}, item.tag))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "posts",
					className: "mt-4 flex flex-col gap-4",
					children: ready && result.posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Search,
						title: "No posts found",
						description: "Try a word from a caption or a #tag."
					}) : result.posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "videos",
					className: "mt-4 grid grid-cols-2 gap-2",
					children: ready && result.videos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Search,
						title: "No clips found",
						description: "Short videos that match will collect here.",
						className: "col-span-2"
					}) : result.videos.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, { post }, post.id))
				})
			]
		})]
	});
}
//#endregion
export { SearchPage as component };
