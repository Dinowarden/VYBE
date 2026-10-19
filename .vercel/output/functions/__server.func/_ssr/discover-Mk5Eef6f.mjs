import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as VolumeX, p as MessageCircle, r as Volume2 } from "../_libs/lucide-react.mjs";
import { a as listPulseFeed } from "./posts-D2_cdl82.mjs";
import { c as pulseFeed } from "./demo-data-CRXOTHOZ.mjs";
import { c as useFollowing, i as FollowButton, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./use-following-D41X06CL.mjs";
import { t as compactNumber } from "./format-dm0WgXG8.mjs";
import { i as ShareButton, n as ReportButton, r as SaveButton, t as LikeButton } from "./share-button-DareN5E5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discover-Mk5Eef6f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PulseSlide({ post, active, muted, onMutedChange }) {
	const videoRef = (0, import_react.useRef)(null);
	const media = post.media[0];
	const initials = post.author.displayName.split(" ").map((part) => part[0]).join("").slice(0, 2);
	(0, import_react.useEffect)(() => {
		const el = videoRef.current;
		if (!el) return;
		if (active) el.play().catch(() => void 0);
		else el.pause();
	}, [active]);
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
						targetType: "post",
						targetId: post.id,
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButton, {
						postId: post.id,
						caption: post.caption,
						count: post.shareCount,
						variant: "rail"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
						postId: post.id,
						saved: post.saved,
						variant: "rail"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportButton, {
						targetType: "post",
						targetId: post.id,
						ownerId: post.author.id,
						variant: "rail"
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
	const [live, setLive] = (0, import_react.useState)([]);
	const { follows } = useFollowing();
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		listPulseFeed({ data: {} }).then((rows) => {
			if (!cancelled) setLive(rows);
		}).catch(() => {
			if (!cancelled) setLive([]);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	const posts = (0, import_react.useMemo)(() => {
		const seen = new Set(live.map((post) => post.id));
		const demo = pulseFeed.filter((post) => !seen.has(post.id)).map((post) => ({
			...post,
			followingAuthor: follows(post.author.username)
		}));
		return [...live.map((post) => ({
			...post,
			followingAuthor: follows(post.author.username) || post.followingAuthor
		})), ...demo];
	}, [live, follows]);
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
	}, [posts.length]);
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
