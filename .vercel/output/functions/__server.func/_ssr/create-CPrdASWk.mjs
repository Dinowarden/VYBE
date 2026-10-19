import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { C as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as resizeFeedImage, r as readClip } from "./clip-DT-cY-Yx.mjs";
import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { i as Video, m as Image, s as Type } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as RequireAuth } from "./auth-guard-CNj-GCw_.mjs";
import { t as Label } from "./label-CUR8A75G.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-6NeIfz2l.mjs";
import { t as Textarea } from "./textarea-Bh-ZS9iN.mjs";
import { t as createPost } from "./posts-D2_cdl82.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/create-CPrdASWk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CreatePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Create, {}) });
}
function positive(value) {
	return value && value > 0 ? value : void 0;
}
function Create() {
	const router = useRouter();
	const fileRef = (0, import_react.useRef)(null);
	const clipRef = (0, import_react.useRef)(null);
	const [caption, setCaption] = (0, import_react.useState)("");
	const [image, setImage] = (0, import_react.useState)(null);
	const [clip, setClip] = (0, import_react.useState)(null);
	const [publishing, setPublishing] = (0, import_react.useState)(false);
	async function onPick(file) {
		if (!file) return;
		try {
			setImage(await resizeFeedImage(file));
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not use that photo.");
		}
	}
	async function onPickClip(file) {
		if (!file) return;
		try {
			setClip(await readClip(file));
		} catch (err) {
			setClip(null);
			toast.error(err instanceof Error ? err.message : "Could not use that clip.");
		}
	}
	async function publish(kind, event) {
		event?.preventDefault();
		if (kind === "text" && !caption.trim()) {
			toast.error("Write something first.");
			return;
		}
		if (kind === "image" && !image) {
			toast.error("Add a photo first.");
			return;
		}
		if (kind === "video" && !clip) {
			toast.error("Add a clip first.");
			return;
		}
		setPublishing(true);
		try {
			await createPost({ data: {
				kind,
				caption,
				imageUrl: kind === "image" ? image?.dataUrl ?? null : null,
				videoUrl: kind === "video" ? clip?.dataUrl ?? null : null,
				posterUrl: kind === "video" ? clip?.posterUrl ?? null : null,
				mime: kind === "video" ? clip?.mime : null,
				width: positive(kind === "video" ? clip?.width : image?.width),
				height: positive(kind === "video" ? clip?.height : image?.height),
				durationMs: kind === "video" ? clip?.durationMs : void 0
			} });
			toast.success(kind === "video" ? "Clip is on Pulse" : kind === "image" ? "Image published" : "Posted to Circle");
			setCaption("");
			setImage(null);
			setClip(null);
			await router.invalidate();
			await router.navigate({ to: kind === "video" ? "/discover" : "/" });
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not publish.";
			if (message === "Unauthorized") {
				await router.navigate({ to: "/login" });
				return;
			}
			toast.error(message);
		} finally {
			setPublishing(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-xl px-4 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden md:block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
				children: "Create"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-1 text-3xl font-semibold",
				children: "Make a mark"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "text",
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "w-full justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "text",
							className: "flex-1 gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, { className: "size-4" }), " Text"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "image",
							className: "flex-1 gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-4" }), " Image"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "video",
							className: "flex-1 gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-4" }), " Clip"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "text",
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-4",
						onSubmit: (e) => void publish("text", e),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "caption-text",
								children: "What is on your mind"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "caption-text",
								value: caption,
								onChange: (e) => setCaption(e.target.value),
								placeholder: "Just launched something I have been circling for months. #build",
								maxLength: 500
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-right text-xs tabular-nums text-subtle",
								children: [caption.length, "/500"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								type: "submit",
								disabled: publishing,
								children: publishing ? "Publishing…" : "Publish"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "image",
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-4",
						onSubmit: (e) => void publish("image", e),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => fileRef.current?.click(),
								className: "grid min-h-48 w-full place-items-center overflow-hidden rounded-3xl border border-dashed border-border bg-elevated text-sm text-muted",
								children: image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: image.dataUrl,
									alt: "",
									className: "max-h-80 w-full object-cover"
								}) : "Drop an image, or tap to choose"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/*",
								className: "sr-only",
								onChange: (e) => void onPick(e.target.files?.[0])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: caption,
								onChange: (e) => setCaption(e.target.value),
								placeholder: "Add a caption and #hashtags",
								maxLength: 500
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								type: "submit",
								disabled: publishing,
								children: publishing ? "Publishing…" : "Publish image"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "video",
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-4",
						onSubmit: (e) => void publish("video", e),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => clipRef.current?.click(),
								className: "grid min-h-56 w-full place-items-center overflow-hidden rounded-3xl border border-dashed border-border bg-elevated text-sm text-muted",
								children: clip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
									src: clip.dataUrl,
									poster: clip.posterUrl,
									className: "max-h-80 w-full object-cover",
									muted: true,
									playsInline: true
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-6 text-center",
									children: "Short clip, vertical preferred. MP4 or WebM, under 60 seconds and 4 MB."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: clipRef,
								type: "file",
								accept: "video/mp4,video/webm,video/quicktime",
								className: "sr-only",
								onChange: (e) => void onPickClip(e.target.files?.[0])
							}),
							clip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-right text-xs tabular-nums text-subtle",
								children: [Math.max(1, Math.round(clip.durationMs / 1e3)), "s"]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: caption,
								onChange: (e) => setCaption(e.target.value),
								placeholder: "Caption this clip #pulse",
								maxLength: 500
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								type: "submit",
								disabled: publishing,
								children: publishing ? "Publishing…" : "Publish clip"
							})
						]
					})
				})
			]
		})]
	});
}
//#endregion
export { CreatePage as component };
