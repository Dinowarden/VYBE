import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { C as ArrowLeft } from "../_libs/lucide-react.mjs";
import { a as Route$7 } from "./router-eLR-UVIk.mjs";
import { n as demoComments, o as findPost } from "./demo-data-Ce69zrXT.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-D9yfcyjT.mjs";
import { n as relativeTime } from "./format-dm0WgXG8.mjs";
import { t as LikeButton } from "./like-button-DX9GuhZy.mjs";
import { t as Input } from "./input-DIG8Stcl.mjs";
import { t as PostCard } from "./post-card-CXUHZX2U.mjs";
import { t as EmptyState } from "./empty-state-aFDV-KUF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post._postId-Demm0vXT.js
var import_jsx_runtime = require_jsx_runtime();
function CommentItem({ comment }) {
	const initials = comment.author.displayName.split(" ").map((part) => part[0]).join("").slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex gap-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/u/$username",
				params: { username: comment.author.username },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
					className: "size-9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
						src: comment.author.avatarUrl,
						alt: ""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: initials })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/u/$username",
						params: { username: comment.author.username },
						className: "truncate text-sm font-medium hover:underline",
						children: comment.author.displayName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
						className: "text-xs text-subtle",
						dateTime: comment.createdAt,
						children: relativeTime(comment.createdAt)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed text-fg/90",
					children: comment.body
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LikeButton, {
				liked: comment.liked,
				count: comment.likeCount
			})
		]
	});
}
function PostDetail() {
	const { postId } = Route$7.useParams();
	const post = findPost(postId);
	const comments = demoComments.filter((comment) => comment.postId === postId);
	if (!post) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: ArrowLeft,
		title: "That post is gone",
		description: "It may have been removed, or the link is incomplete.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: "Back to Circle"
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-xl px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mb-4 inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Circle"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-[1.75rem] bg-surface px-4 py-2 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "px-1 pt-3 font-display text-base font-semibold",
						children: "Comments"
					}),
					comments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-1 py-6 text-sm text-muted",
						children: "Be the first to reply."
					}) : comments.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommentItem, { comment }, comment.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex gap-2 py-3",
						onSubmit: (event) => event.preventDefault(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Write a comment",
							"aria-label": "Write a comment"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "sm",
							children: "Send"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { PostDetail as component };
