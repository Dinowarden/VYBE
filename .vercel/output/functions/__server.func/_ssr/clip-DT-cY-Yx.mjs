//#region node_modules/.nitro/vite/services/ssr/assets/clip-DT-cY-Yx.js
var MAX_EDGE = 1080;
var MAX_DATA_URL$1 = 7e5;
async function resizeFeedImage(file) {
	if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
	if (file.size > 12e6) throw new Error("That image is too large.");
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
	const width = Math.max(1, Math.round(bitmap.width * scale));
	const height = Math.max(1, Math.round(bitmap.height * scale));
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not process that image.");
	ctx.drawImage(bitmap, 0, 0, width, height);
	bitmap.close();
	for (const quality of [
		.82,
		.7,
		.58
	]) {
		const dataUrl = canvas.toDataURL("image/jpeg", quality);
		if (dataUrl.length <= MAX_DATA_URL$1) return {
			dataUrl,
			width,
			height
		};
	}
	throw new Error("Could not compress that image. Try a simpler photo.");
}
function isSafeImageUrl(value) {
	if (!value) return false;
	if (value.startsWith("data:image/")) return value.length <= MAX_DATA_URL$1;
	try {
		const url = new URL(value);
		return url.protocol === "https:" || url.protocol === "http:";
	} catch {
		return false;
	}
}
var MAX_BYTES = 4e6;
var MAX_DATA_URL = 6e6;
var ALLOWED = /* @__PURE__ */ new Set([
	"video/mp4",
	"video/webm",
	"video/quicktime"
]);
function isSafeVideoUrl(value) {
	if (!value) return false;
	if (value.startsWith("data:video/")) return value.length <= MAX_DATA_URL;
	try {
		const url = new URL(value);
		return url.protocol === "https:" || url.protocol === "http:";
	} catch {
		return false;
	}
}
function fileToDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read that clip."));
		reader.readAsDataURL(file);
	});
}
function loadVideo(src) {
	return new Promise((resolve, reject) => {
		const video = document.createElement("video");
		video.preload = "auto";
		video.muted = true;
		video.playsInline = true;
		video.onloadedmetadata = () => resolve(video);
		video.onerror = () => reject(/* @__PURE__ */ new Error("Could not read that clip."));
		video.src = src;
	});
}
function capturePoster(video) {
	const width = video.videoWidth || 360;
	const height = video.videoHeight || 640;
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not make a poster for that clip.");
	ctx.drawImage(video, 0, 0, width, height);
	return canvas.toDataURL("image/jpeg", .72);
}
async function readClip(file) {
	if (!ALLOWED.has(file.type)) throw new Error("Use an MP4 or WebM clip.");
	if (file.size > MAX_BYTES) throw new Error("That clip is over 4 MB. Trim it and try again.");
	const objectUrl = URL.createObjectURL(file);
	try {
		const video = await loadVideo(objectUrl);
		const duration = video.duration;
		if (!Number.isFinite(duration) || duration <= 0) throw new Error("Could not read that clip.");
		if (duration > 60) throw new Error("Clips must be 60 seconds or shorter.");
		try {
			video.currentTime = Math.min(.2, duration / 2);
			await Promise.race([new Promise((resolve) => {
				video.onseeked = () => resolve(null);
			}), new Promise((resolve) => setTimeout(resolve, 500))]);
		} catch {}
		const posterUrl = capturePoster(video);
		const dataUrl = await fileToDataUrl(file);
		if (!isSafeVideoUrl(dataUrl)) throw new Error("That clip is too large after encoding.");
		return {
			dataUrl,
			posterUrl,
			mime: file.type === "video/quicktime" ? "video/mp4" : file.type,
			width: video.videoWidth || 0,
			height: video.videoHeight || 0,
			durationMs: Math.round(duration * 1e3)
		};
	} finally {
		URL.revokeObjectURL(objectUrl);
	}
}
//#endregion
export { resizeFeedImage as i, isSafeVideoUrl as n, readClip as r, isSafeImageUrl as t };
