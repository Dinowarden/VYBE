import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as UserRound } from "../_libs/lucide-react.mjs";
import { i as Route$2, l as getProfileByUsername } from "./router-BKbEaJrO.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-6NeIfz2l.mjs";
import { i as listPostsByUsername } from "./posts-D2_cdl82.mjs";
import { o as findUser, s as postsByUser } from "./demo-data-CRXOTHOZ.mjs";
import { c as useFollowing } from "./use-following-D41X06CL.mjs";
import { t as EmptyState } from "./empty-state-aFDV-KUF.mjs";
import { t as PostCard } from "./post-card-DwmGq5N2.mjs";
import { t as VideoCard } from "./video-card-DquZDAID.mjs";
import { t as ProfileHero } from "./profile-hero-BnZX49ub.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/u._username.index-BPW_KXZi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PublicProfile() {
	const { username } = Route$2.useParams();
	const demo = findUser(username);
	const { myUsername, follows, setFollows } = useFollowing();
	const [live, setLive] = (0, import_react.useState)(void 0);
	const [livePosts, setLivePosts] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		Promise.all([getProfileByUsername({ data: username }), listPostsByUsername({ data: username })]).then(([row, posts]) => {
			if (cancelled) return;
			setLive(row);
			setLivePosts(posts);
		}).catch(() => {
			if (!cancelled) {
				setLive(null);
				setLivePosts([]);
			}
		});
		return () => {
			cancelled = true;
		};
	}, [username]);
	const posts = (0, import_react.useMemo)(() => {
		const demoList = demo ? postsByUser(demo.id) : [];
		const seen = new Set(livePosts.map((post) => post.id));
		return [...livePosts, ...demoList.filter((post) => !seen.has(post.id))].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	}, [livePosts, demo]);
	const videos = posts.filter((post) => post.kind === "video");
	const rest = posts.filter((post) => post.kind !== "video");
	if (live === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "px-4 py-16 text-center text-sm text-muted",
		children: [
			"Looking up @",
			username,
			"…"
		]
	});
	if (!demo && !live) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: UserRound,
		title: "No one by that name",
		description: "That username is not on VYBE yet.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "text-sm text-brand hover:underline",
			children: "Back to Circle"
		})
	});
	const profile = live ?? {
		userId: demo?.id ?? "",
		username: demo?.username ?? username,
		displayName: demo?.displayName ?? username,
		bio: demo?.bio ?? "",
		avatarUrl: demo?.avatarUrl ?? null,
		dateOfBirth: null,
		role: "user",
		followerCount: demo?.followerCount ?? 0,
		followingCount: demo?.followingCount ?? 0,
		likeCount: demo?.likeCount ?? 0
	};
	const isOwner = Boolean(myUsername && myUsername === profile.username);
	const defaultTab = rest.length ? "posts" : videos.length ? "videos" : "posts";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-xl px-4 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileHero, {
			profile,
			isOwner,
			following: follows(profile.username),
			onFollowChange: (next) => {
				setFollows(profile.username, next.following);
				setLive((current) => current ? {
					...current,
					followerCount: next.followerCount
				} : {
					...profile,
					followerCount: next.followerCount
				});
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: defaultTab,
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "posts",
						className: "flex-1",
						children: "Posts"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "videos",
						className: "flex-1",
						children: "Videos"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "posts",
					className: "mt-4 flex flex-col gap-4",
					children: rest.length ? rest.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post: {
						...post,
						followingAuthor: follows(post.author.username)
					} }, post.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-sm text-muted",
						children: "No posts yet."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "videos",
					className: "mt-4 grid grid-cols-2 gap-2",
					children: videos.length ? videos.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, { post }, post.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "col-span-2 py-10 text-center text-sm text-muted",
						children: "No clips yet."
					})
				})
			]
		})]
	});
}
//#endregion
export { PublicProfile as component };
