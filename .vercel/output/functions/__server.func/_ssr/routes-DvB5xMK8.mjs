import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Users } from "../_libs/lucide-react.mjs";
import { i as demoPosts, l as pulseFeed, t as circleFeed } from "./demo-data-Ce69zrXT.mjs";
import { c as listSuggestedPeople, i as FollowButton, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-D9yfcyjT.mjs";
import { t as compactNumber } from "./format-dm0WgXG8.mjs";
import { t as useFollowing } from "./use-following-C82Qqg7Y.mjs";
import { t as PostCard } from "./post-card-CXUHZX2U.mjs";
import { t as EmptyState } from "./empty-state-aFDV-KUF.mjs";
import { t as PersonRow } from "./person-row-DKjvUeSO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DvB5xMK8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { user, following, follows, setFollows, myUsername, isPending } = useFollowing();
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [suggested, setSuggested] = (0, import_react.useState)([]);
	const rising = pulseFeed.slice(0, 3);
	const waiting = !mounted || isPending;
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		let cancelled = false;
		listSuggestedPeople().then((people) => {
			if (!cancelled) setSuggested(people);
		}).catch(() => {
			if (!cancelled) setSuggested([]);
		});
		return () => {
			cancelled = true;
		};
	}, [
		user,
		following,
		isPending
	]);
	const posts = (0, import_react.useMemo)(() => {
		if (!user) return circleFeed;
		return demoPosts.filter((post) => following.has(post.author.username)).map((post) => ({
			...post,
			followingAuthor: true
		}));
	}, [user, following]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid w-full max-w-6xl gap-8 px-4 py-6 lg:grid-cols-[minmax(0,36rem)_16rem] lg:justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 hidden md:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
						children: "Circle"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-1 text-3xl font-semibold",
						children: "From people you chose"
					})]
				}),
				waiting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-52 animate-pulse rounded-[1.75rem] bg-elevated" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-52 animate-pulse rounded-[1.75rem] bg-elevated" })]
				}) : user && posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Users,
					title: "Your Circle is quiet",
					description: "Follow a few people. Their posts land here, in the order they published."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-4",
					children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id))
				}),
				!waiting && user && suggested.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-semibold",
						children: "People to meet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-3",
						children: suggested.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonRow, {
							person,
							viewerUsername: myUsername,
							onFollow: (username, following) => setFollows(username, following)
						}, person.userId))
					})]
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden lg:flex lg:flex-col lg:gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-semibold",
					children: "Rising on Pulse"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-3",
					children: rising.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/discover",
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: post.media[0]?.posterUrl,
							alt: "",
							className: "size-14 rounded-xl object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: post.caption
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									"@",
									post.author.username,
									" · ",
									compactNumber(post.viewCount),
									" views"
								]
							})]
						})]
					}) }, post.id))
				})]
			}), suggested.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-semibold",
					children: "People to meet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-3",
					children: suggested.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/u/$username",
							params: { username: person.username },
							className: "flex min-w-0 flex-1 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "size-9",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									src: person.avatarUrl ?? void 0,
									alt: ""
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: person.displayName[0] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: person.displayName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs text-muted",
									children: ["@", person.username]
								})]
							})]
						}), myUsername === person.username ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowButton, {
							username: person.username,
							following: follows(person.username),
							onChange: (next) => setFollows(person.username, next.following)
						})]
					}, person.userId))
				})]
			}) : null]
		})]
	});
}
//#endregion
export { Home as component };
