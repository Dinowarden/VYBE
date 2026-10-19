import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useCurrentUserState } from "./createSsrRpc-B2Izd0c7.mjs";
import { p as MessageCircle } from "../_libs/lucide-react.mjs";
import { c as useFollowing, i as FollowButton, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./use-following-D41X06CL.mjs";
import { n as relativeTime, t as compactNumber } from "./format-dm0WgXG8.mjs";
import { i as ShareButton, n as ReportButton, r as SaveButton, t as LikeButton } from "./share-button-DareN5E5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post-card-DwmGq5N2.js
var import_jsx_runtime = require_jsx_runtime();
function PostCard({ post }) {
	const { user } = useCurrentUserState();
	const { myUsername } = useFollowing();
	const media = post.media[0];
	const initials = post.author.displayName.split(" ").map((part) => part[0]).join("").slice(0, 2);
	const isSelf = user?.id === post.author.id || myUsername === post.author.username;
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
					isSelf ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportButton, {
							targetType: "post",
							targetId: post.id,
							ownerId: post.author.id
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowButton, {
							username: post.author.username,
							following: post.followingAuthor
						})]
					})
				]
			}),
			post.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Caption, {
				text: post.caption,
				tags: post.hashtags
			}) : null,
			post.kind === "image" && media ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/post/$postId",
				params: { postId: post.id },
				className: "mt-3 block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: media.url,
					alt: "",
					className: "max-h-[32rem] w-full rounded-2xl object-cover"
				})
			}) : null,
			post.kind === "video" && media ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/discover",
				className: "relative mt-3 block",
				children: [media.posterUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: media.posterUrl,
					alt: "",
					className: "aspect-[4/5] max-h-[28rem] w-full rounded-2xl object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: media.url,
					muted: true,
					playsInline: true,
					preload: "metadata",
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
						count: post.likeCount,
						targetType: "post",
						targetId: post.id
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButton, {
						postId: post.id,
						caption: post.caption,
						count: post.shareCount
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
						postId: post.id,
						saved: post.saved
					})
				]
			})
		]
	});
}
function Caption({ text, tags }) {
	const parts = text.split(/(#[a-z0-9_]{1,32})/gi);
	const inCaption = new Set(parts.filter((part) => part.startsWith("#")).map((part) => part.slice(1).toLowerCase()));
	const extra = tags.filter((tag) => !inCaption.has(tag));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-3 text-[0.95rem] leading-relaxed",
		children: [parts.map((part, index) => part.startsWith("#") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/search",
			search: { q: part },
			className: "text-brand hover:underline",
			children: part
		}, `${part}-${index}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, index)), extra.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/search",
			search: { q: `#${tag}` },
			className: "text-brand hover:underline",
			children: [
				" ",
				"#",
				tag
			]
		}, tag))]
	});
}
//#endregion
export { PostCard as t };
