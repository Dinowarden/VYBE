import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { C as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { D as _enum, F as object, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as useCurrentUserState, n as Button, t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { n as optionalAuthMiddleware, t as authMiddleware } from "./middleware-Cw7doLtA.mjs";
import { S as Bookmark, _ as Flag, g as Heart, l as Share2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as compactNumber } from "./format-dm0WgXG8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/share-button-DareN5E5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var listComments = createServerFn({ method: "POST" }).middleware([optionalAuthMiddleware]).validator((postId) => string().min(1).max(80).parse(postId)).handler(createSsrRpc("398ab1cb21b01e25773582d904d292ac2830d5c9c1b530c3a194d5e5349eb755"));
var addComment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	postId: string().min(1).max(80),
	body: string().trim().min(1).max(500)
}).parse(input)).handler(createSsrRpc("4cf54f7b79718cb661b083fb7fd174ff2c7c2667b1d1c8bb16e83a0f98c92fe9"));
var toggleSave = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ postId: string().min(1).max(80) }).parse(input)).handler(createSsrRpc("60b4722219a698b231709e0f2bff8d88723f932cef8d586c3c18d157b490a542"));
var recordShare = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	postId: string().min(1).max(80),
	channel: _enum(["link", "native"])
}).parse(input)).handler(createSsrRpc("172b10e56bbebcce4808315eeb3497d6f529863bf8f91a6f035318d39143784d"));
var listMyLikes = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(() => ({})).handler(createSsrRpc("a84c364cde0fbae70a79f76b50f2a1531a6ccbdb4216efb2c9eb83d3f7ee2ac6"));
var toggleLike = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	targetType: _enum(["post", "comment"]),
	targetId: string().min(1).max(80)
}).parse(input)).handler(createSsrRpc("b48389b6a3d1174ccf88917cf4c04b9b65328ce52ae89183c24c96cc4a7a0cf4"));
var cache = null;
var listeners = /* @__PURE__ */ new Set();
function notify() {
	for (const listener of listeners) listener();
}
function remember(userId, type, id, liked) {
	if (!cache || cache.userId !== userId) cache = {
		userId,
		ready: true,
		posts: /* @__PURE__ */ new Set(),
		comments: /* @__PURE__ */ new Set()
	};
	const bucket = type === "post" ? cache.posts : cache.comments;
	if (liked) bucket.add(id);
	else bucket.delete(id);
	notify();
}
function useLikeFlag(type, id) {
	const { user, isPending } = useCurrentUserState();
	const [, setTick] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const listener = () => setTick((n) => n + 1);
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			cache = null;
			notify();
			return;
		}
		if (cache?.userId === user.id && cache.ready) return;
		let cancelled = false;
		listMyLikes({ data: {} }).then((rows) => {
			if (cancelled) return;
			cache = {
				userId: user.id,
				ready: true,
				posts: new Set(rows.posts),
				comments: new Set(rows.comments)
			};
			notify();
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [user?.id, isPending]);
	if (!user || !cache || cache.userId !== user.id || !cache.ready) return null;
	return (type === "post" ? cache.posts : cache.comments).has(id);
}
function LikeButton({ liked: likedProp, count, targetType, targetId, variant = "row", className }) {
	const router = useRouter();
	const { user } = useCurrentUserState();
	const remote = useLikeFlag(targetType, targetId);
	const [liked, setLiked] = (0, import_react.useState)(likedProp);
	const [value, setValue] = (0, import_react.useState)(count);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setLiked(remote ?? likedProp);
	}, [
		remote,
		likedProp,
		targetId
	]);
	(0, import_react.useEffect)(() => {
		setValue(count);
	}, [count, targetId]);
	async function toggle() {
		if (!user) {
			await router.navigate({ to: "/login" });
			return;
		}
		const next = !liked;
		setLiked(next);
		setValue((n) => Math.max(0, n + (next ? 1 : -1)));
		setBusy(true);
		try {
			const result = await toggleLike({ data: {
				targetType,
				targetId
			} });
			setLiked(result.liked);
			setValue(result.likeCount);
			remember(user.id, targetType, targetId, result.liked);
		} catch (err) {
			setLiked(!next);
			setValue((n) => Math.max(0, n + (next ? -1 : 1)));
			const message = err instanceof Error ? err.message : "Could not update that like.";
			if (message === "Unauthorized") {
				await router.navigate({ to: "/login" });
				return;
			}
			toast.error(message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => void toggle(),
		disabled: busy,
		"aria-pressed": liked,
		"aria-label": liked ? "Unlike" : "Like",
		className: cn("inline-flex items-center gap-1.5 text-sm transition-colors", variant === "rail" ? "flex-col gap-1 text-fg" : "text-muted hover:text-fg", liked && "text-brand", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
			className: cn(variant === "rail" ? "size-7" : "size-5", liked && "fill-brand text-brand"),
			strokeWidth: 1.75
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums",
			children: compactNumber(value)
		})]
	});
}
function SaveButton({ postId, saved, variant = "row" }) {
	const router = useRouter();
	const { user } = useCurrentUserState();
	const [on, setOn] = (0, import_react.useState)(saved);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function toggle() {
		if (!user) {
			await router.navigate({ to: "/login" });
			return;
		}
		const next = !on;
		setOn(next);
		setBusy(true);
		try {
			const result = await toggleSave({ data: { postId } });
			setOn(result.saved);
		} catch (err) {
			setOn(!next);
			const message = err instanceof Error ? err.message : "Could not save that.";
			if (message === "Unauthorized") {
				await router.navigate({ to: "/login" });
				return;
			}
			toast.error(message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => void toggle(),
		disabled: busy,
		className: cn("inline-flex items-center gap-1.5 text-sm hover:text-fg", variant === "rail" && "flex-col gap-1", on && "text-brand"),
		"aria-pressed": on,
		"aria-label": on ? "Unsave" : "Save",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
			className: cn(variant === "rail" ? "size-7" : "size-5", on && "fill-brand text-brand"),
			strokeWidth: variant === "rail" ? 1.6 : 1.75
		})
	});
}
var categories = [
	"spam",
	"harassment",
	"hate",
	"sexual",
	"violence",
	"copyright",
	"other"
];
var submitReport = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	targetType: _enum([
		"user",
		"post",
		"comment"
	]),
	targetId: string().min(1).max(80),
	category: _enum(categories),
	details: string().max(280).optional()
}).parse(input)).handler(createSsrRpc("21af2a0229f09d00e9966e8f64b4364ac2de2959444d3e4440f845cfdb197094"));
var reasons = [
	{
		id: "spam",
		label: "Spam"
	},
	{
		id: "harassment",
		label: "Harassment"
	},
	{
		id: "hate",
		label: "Hate"
	},
	{
		id: "sexual",
		label: "Sexual content"
	},
	{
		id: "violence",
		label: "Violence"
	},
	{
		id: "copyright",
		label: "Copyright"
	},
	{
		id: "other",
		label: "Something else"
	}
];
var noun = {
	user: "profile",
	post: "post",
	comment: "comment"
};
function ReportButton({ targetType, targetId, ownerId, variant = "icon" }) {
	const router = useRouter();
	const { user } = useCurrentUserState();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)(null);
	const [details, setDetails] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	if (user && ownerId && user.id === ownerId) return null;
	async function onSubmit(event) {
		event.preventDefault();
		if (!category || sending) return;
		if (!user) {
			await router.navigate({ to: "/login" });
			return;
		}
		setSending(true);
		try {
			const result = await submitReport({ data: {
				targetType,
				targetId,
				category,
				details
			} });
			toast.success(result.already ? "You already reported this." : "Report sent. We'll review it.");
			setOpen(false);
			setCategory(null);
			setDetails("");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not send that report.";
			if (message === "Unauthorized") {
				await router.navigate({ to: "/login" });
				return;
			}
			toast.error(message);
		} finally {
			setSending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => {
			if (!user) {
				router.navigate({ to: "/login" });
				return;
			}
			setOpen(true);
		},
		"aria-label": `Report this ${noun[targetType]}`,
		className: cn(variant === "text" && "text-xs text-muted hover:text-fg", variant === "icon" && "grid size-9 place-items-center rounded-full text-muted hover:bg-elevated hover:text-fg", variant === "rail" && "grid size-11 place-items-center text-fg"),
		children: variant === "text" ? "Report" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
			className: variant === "rail" ? "size-6" : "size-4",
			strokeWidth: 1.7
		})
	}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-end bg-bg/70 p-4 sm:place-items-center",
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "w-full max-w-sm rounded-3xl bg-surface p-5 shadow-[var(--shadow-lift)]",
			onClick: (event) => event.stopPropagation(),
			onSubmit: (event) => void onSubmit(event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
					children: "Report"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display mt-1 text-2xl font-semibold",
					children: [
						"Why this ",
						noun[targetType],
						"?"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-2 gap-2",
					children: reasons.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCategory(reason.id),
						className: cn("rounded-2xl px-3 py-2 text-left text-sm", category === reason.id ? "bg-brand text-brand-fg" : "bg-elevated text-fg"),
						children: reason.label
					}, reason.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: details,
					onChange: (event) => setDetails(event.target.value.slice(0, 280)),
					placeholder: "Optional detail. Keep it short.",
					className: "mt-3 min-h-20 w-full rounded-2xl bg-elevated px-3 py-2 text-sm outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: () => setOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "sm",
						disabled: !category || sending,
						children: sending ? "Sending" : "Send"
					})]
				})
			]
		})
	}) : null] });
}
function ShareButton({ postId, caption, count, variant = "row" }) {
	const { user } = useCurrentUserState();
	const [value, setValue] = (0, import_react.useState)(count);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function share() {
		const url = `${window.location.origin}/post/${postId}`;
		let channel = "link";
		let delivered = false;
		if (typeof navigator.share === "function") try {
			await navigator.share({
				title: "VYBE",
				text: caption,
				url
			});
			channel = "native";
			delivered = true;
			toast.success("Shared");
		} catch (err) {
			if (err instanceof DOMException && err.name === "AbortError") return;
		}
		if (!delivered) try {
			await navigator.clipboard.writeText(url);
			toast.success("Link copied");
		} catch {
			toast.message("Share this link", { description: url });
		}
		if (!user) return;
		setBusy(true);
		try {
			const result = await recordShare({ data: {
				postId,
				channel
			} });
			setValue(result.shareCount);
		} catch {} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => void share(),
		disabled: busy,
		className: cn("inline-flex items-center gap-1.5 text-sm hover:text-fg", variant === "rail" && "flex-col gap-1"),
		"aria-label": "Share",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
			className: variant === "rail" ? "size-7" : "size-5",
			strokeWidth: variant === "rail" ? 1.6 : 1.75
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums",
			children: compactNumber(value)
		})]
	});
}
//#endregion
export { addComment as a, ShareButton as i, ReportButton as n, listComments as o, SaveButton as r, LikeButton as t };
