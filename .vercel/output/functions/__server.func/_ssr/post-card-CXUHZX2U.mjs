import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { l as Share2, p as MessageCircle, x as Bookmark } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as FollowButton, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-D9yfcyjT.mjs";
import { n as relativeTime, t as compactNumber } from "./format-dm0WgXG8.mjs";
import { t as LikeButton } from "./like-button-DX9GuhZy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post-card-CXUHZX2U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PostCard({ post }) {
	const [saved, setSaved] = (0, import_react.useState)(post.saved);
	const media = post.media[0];
	const initials = post.author.displayName.split(" ").map((part) => part[0]).join("").slice(0, 2);
	async function share() {
		const url = `${window.location.origin}/post/${post.id}`;
		try {
			if (navigator.share) {
				await navigator.share({
					title: "VYBE",
					text: post.caption,
					url
				});
				return;
			}
		} catch {}
		await navigator.clipboard.writeText(url);
		toast.success("Link copied");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-[1.75rem] bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/u/$username",
						params: { username: post.author.username },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
							src: post.author.avatarUrl,
							alt: ""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: initials })] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/u/$username",
							params: { username: post.author.username },
							className: "block truncate font-medium leading-tight hover:underline",
							children: post.author.displayName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								"@",
								post.author.username,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-subtle",
									children: [" · ", relativeTime(post.createdAt)]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowButton, {
						username: post.author.username,
						following: post.followingAuthor
					})
				]
			}),
			post.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-[0.95rem] leading-relaxed",
				children: [
					post.caption,
					" ",
					post.hashtags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/search",
						search: { q: `#${tag}` },
						className: "text-brand hover:underline",
						children: ["#", tag]
					}, tag))
				]
			}) : null,
			post.kind === "image" && media ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/post/$postId",
				params: { postId: post.id },
				className: "mt-3 block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: media.url,
					alt: "",
					className: "aspect-[4/5] w-full rounded-2xl object-cover sm:aspect-[16/10]"
				})
			}) : null,
			post.kind === "video" && media ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/discover",
				className: "relative mt-3 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: media.posterUrl ?? media.url,
					alt: "",
					className: "aspect-[4/5] max-h-[28rem] w-full rounded-2xl object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-3 bottom-3 rounded-full bg-bg/70 px-2 py-1 text-xs",
					children: "Clip"
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-3 flex items-center justify-between px-1 text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LikeButton, {
						liked: post.liked,
						count: post.likeCount
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/post/$postId",
						params: { postId: post.id },
						className: "inline-flex items-center gap-1.5 text-sm hover:text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
							className: "size-5",
							strokeWidth: 1.75
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: compactNumber(post.commentCount)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void share(),
						className: "inline-flex items-center gap-1.5 text-sm hover:text-fg",
						"aria-label": "Share",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
							className: "size-5",
							strokeWidth: 1.75
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: compactNumber(post.shareCount)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSaved((v) => !v),
						className: cn("inline-flex items-center gap-1.5 text-sm hover:text-fg", saved && "text-brand"),
						"aria-pressed": saved,
						"aria-label": saved ? "Unsave" : "Save",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
							className: cn("size-5", saved && "fill-brand text-brand"),
							strokeWidth: 1.75
						})
					})
				]
			})
		]
	});
}
//#endregion
export { PostCard as t };
