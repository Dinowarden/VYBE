import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { i as Video, m as Image, s as Type } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as RequireAuth } from "./auth-guard-DaR5Om3G.mjs";
import { t as Label } from "./label-CUR8A75G.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-6NeIfz2l.mjs";
import { t as Textarea } from "./textarea-Bh-ZS9iN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/create-CUKZfJau.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CreatePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Create, {}) });
}
function Create() {
	const [caption, setCaption] = (0, import_react.useState)("");
	function publish(kind) {
		if (!caption.trim() && kind === "text") {
			toast.error("Write something first");
			return;
		}
		toast.message("Saved locally for now", { description: "Publishing to the Circle lands in the next build step." });
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "text",
					className: "mt-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "caption-text",
							children: "What is on your mind"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "caption-text",
							value: caption,
							onChange: (e) => setCaption(e.target.value),
							placeholder: "Just launched something I have been circling for months.",
							maxLength: 500
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-right text-xs tabular-nums text-subtle",
							children: [caption.length, "/500"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							onClick: () => publish("text"),
							children: "Publish"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "image",
					className: "mt-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-48 place-items-center rounded-3xl border border-dashed border-border bg-elevated text-sm text-muted",
							children: "Drop an image, or tap to choose"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: caption,
							onChange: (e) => setCaption(e.target.value),
							placeholder: "Add a caption and #hashtags",
							maxLength: 500
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							onClick: () => publish("image"),
							children: "Publish image"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "video",
					className: "mt-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-56 place-items-center rounded-3xl border border-dashed border-border bg-elevated px-6 text-center text-sm text-muted",
							children: "Short clip, vertical preferred. MP4 or WebM, under 60 seconds."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: caption,
							onChange: (e) => setCaption(e.target.value),
							placeholder: "Caption this clip",
							maxLength: 500
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							onClick: () => publish("video"),
							children: "Publish clip"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { CreatePage as component };
