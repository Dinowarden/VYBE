import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { C as useRouter, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useCurrentUserState, n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { w as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as PagePending, a as Route$7 } from "./router-BKbEaJrO.mjs";
import { n as getPostById } from "./posts-D2_cdl82.mjs";
import { a as findPost, n as demoComments } from "./demo-data-CRXOTHOZ.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./use-following-D41X06CL.mjs";
import { n as relativeTime } from "./format-dm0WgXG8.mjs";
import { a as addComment, n as ReportButton, o as listComments, t as LikeButton } from "./share-button-DareN5E5.mjs";
import { t as Input } from "./input-DIG8Stcl.mjs";
import { t as EmptyState } from "./empty-state-aFDV-KUF.mjs";
import { t as PostCard } from "./post-card-DwmGq5N2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post._postId-DDyV1C4f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
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
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-fg/90",
						children: comment.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportButton, {
						targetType: "comment",
						targetId: comment.id,
						ownerId: comment.author.id,
						variant: "text"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LikeButton, {
				liked: comment.liked,
				count: comment.likeCount,
				targetType: "comment",
				targetId: comment.id
			})
		]
	});
}
function PostDetail() {
	const { postId } = Route$7.useParams();
	const router = useRouter();
	const { user } = useCurrentUserState();
	const demo = findPost(postId);
	const [live, setLive] = (0, import_react.useState)(void 0);
	const [comments, setComments] = (0, import_react.useState)(null);
	const [body, setBody] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getPostById({ data: postId }).then((row) => {
			if (!cancelled) setLive(row);
		}).catch(() => {
			if (!cancelled) setLive(null);
		});
		listComments({ data: postId }).then((rows) => {
			if (!cancelled) setComments(rows);
		}).catch(() => {
			if (!cancelled) setComments(demoComments.filter((comment) => comment.postId === postId));
		});
		return () => {
			cancelled = true;
		};
	}, [postId]);
	const post = live ?? demo;
	const shown = comments ?? demoComments.filter((comment) => comment.postId === postId);
	async function send(event) {
		event.preventDefault();
		if (!body.trim()) return;
		if (!user) {
			await router.navigate({ to: "/login" });
			return;
		}
		setSending(true);
		try {
			const result = await addComment({ data: {
				postId,
				body
			} });
			setComments((current) => [...current ?? shown, result.comment]);
			setBody("");
			if (live) setLive({
				...live,
				commentCount: result.commentCount
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not comment.";
			if (message === "Unauthorized") {
				await router.navigate({ to: "/login" });
				return;
			}
			toast.error(message);
		} finally {
			setSending(false);
		}
	}
	if (live === void 0 && !demo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePending, {});
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
					shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-1 py-6 text-sm text-muted",
						children: "Be the first to reply."
					}) : shown.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommentItem, { comment }, comment.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex gap-2 py-3",
						onSubmit: (event) => void send(event),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: body,
							onChange: (event) => setBody(event.target.value),
							placeholder: "Write a comment",
							"aria-label": "Write a comment",
							maxLength: 500
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "sm",
							disabled: sending || !body.trim(),
							children: sending ? "Sending…" : "Send"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { PostDetail as component };
