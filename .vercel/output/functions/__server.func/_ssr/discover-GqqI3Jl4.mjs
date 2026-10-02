import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { l as Share2, n as VolumeX, p as MessageCircle, r as Volume2, x as Bookmark } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as pulseFeed } from "./demo-data-Ce69zrXT.mjs";
import { i as FollowButton, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-D9yfcyjT.mjs";
import { t as compactNumber } from "./format-dm0WgXG8.mjs";
import { t as LikeButton } from "./like-button-DX9GuhZy.mjs";
import { t as useFollowing } from "./use-following-C82Qqg7Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discover-GqqI3Jl4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PulseSlide({ post, active, muted, onMutedChange }) {
	const videoRef = (0, import_react.useRef)(null);
	const [saved, setSaved] = (0, import_react.useState)(post.saved);
	const media = post.media[0];
	const initials = post.author.displayName.split(" ").map((part) => part[0]).join("").slice(0, 2);
	(0, import_react.useEffect)(() => {
		const el = videoRef.current;
		if (!el) return;
		if (active) el.play().catch(() => void 0);
		else el.pause();
	}, [active]);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative h-full w-full snap-start bg-bg",
		children: [
			media ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src: media.url,
				poster: media.posterUrl,
				className: "absolute inset-0 h-full w-full object-cover",
				playsInline: true,
				loop: true,
				muted,
				preload: active ? "auto" : "metadata"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-bg/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onMutedChange(!muted),
				className: "absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-bg/50 text-fg",
				"aria-label": muted ? "Unmute" : "Mute",
				children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-3 bottom-36 z-10 flex flex-col items-center gap-5 md:bottom-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/u/$username",
						params: { username: post.author.username },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "size-12 shadow-[var(--shadow-lift)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								src: post.author.avatarUrl,
								alt: ""
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: initials })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LikeButton, {
						liked: post.liked,
						count: post.likeCount,
						variant: "rail"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/post/$postId",
						params: { postId: post.id },
						className: "flex flex-col items-center gap-1 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
							className: "size-7",
							strokeWidth: 1.6
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: compactNumber(post.commentCount)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void share(),
						className: "flex flex-col items-center gap-1 text-sm",
						"aria-label": "Share",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
							className: "size-7",
							strokeWidth: 1.6
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: compactNumber(post.shareCount)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSaved((v) => !v),
						className: "flex flex-col items-center gap-1 text-sm",
						"aria-pressed": saved,
						"aria-label": saved ? "Unsave" : "Save",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
							className: cn("size-7", saved && "fill-brand text-brand"),
							strokeWidth: 1.6
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 bottom-0 z-10 p-4 pb-32 md:pb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex max-w-[calc(100%-4.5rem)] items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/u/$username",
							params: { username: post.author.username },
							className: "font-display text-lg font-semibold hover:underline",
							children: ["@", post.author.username]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 line-clamp-2 text-sm leading-relaxed text-fg/90",
							children: [
								post.caption,
								" ",
								post.hashtags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-brand",
									children: [
										"#",
										tag,
										" "
									]
								}, tag))
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowButton, {
						username: post.author.username,
						following: post.followingAuthor
					})]
				})
			})
		]
	});
}
function Discover() {
	const scrollerRef = (0, import_react.useRef)(null);
	const [active, setActive] = (0, import_react.useState)(0);
	const [muted, setMuted] = (0, import_react.useState)(true);
	const { follows } = useFollowing();
	const posts = (0, import_react.useMemo)(() => pulseFeed.map((post) => ({
		...post,
		followingAuthor: follows(post.author.username)
	})), [follows]);
	(0, import_react.useEffect)(() => {
		const root = scrollerRef.current;
		if (!root) return;
		const slides = [...root.querySelectorAll("[data-pulse-slide]")];
		const io = new IntersectionObserver((entries) => {
			const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (!visible) return;
			const index = Number(visible.target.dataset.index);
			if (!Number.isNaN(index)) setActive(index);
		}, {
			root,
			threshold: .65
		});
		slides.forEach((slide) => io.observe(slide));
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "relative h-[100dvh] bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: scrollerRef,
			className: "no-scrollbar h-full snap-y snap-mandatory overflow-y-auto",
			children: posts.map((post, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-pulse-slide": true,
				"data-index": index,
				className: "h-[100dvh] snap-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PulseSlide, {
					post,
					active: active === index,
					muted,
					onMutedChange: setMuted
				})
			}, post.id))
		})
	});
}
//#endregion
export { Discover as component };
