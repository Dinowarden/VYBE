const MAX_BYTES = 4_000_000;
const MAX_DATA_URL = 6_000_000;
const ALLOWED = new Set(["video/mp4", "video/webm", "video/quicktime"]);

export type ClipFile = {
  dataUrl: string;
  posterUrl: string;
  mime: string;
  width: number;
  height: number;
  durationMs: number;
};

export function isSafeVideoUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  if (value.startsWith("data:video/")) return value.length <= MAX_DATA_URL;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read that clip."));
    reader.readAsDataURL(file);
  });
}

function loadVideo(src: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.onloadedmetadata = () => resolve(video);
    video.onerror = () => reject(new Error("Could not read that clip."));
    video.src = src;
  });
}

function capturePoster(video: HTMLVideoElement): string {
  const width = video.videoWidth || 360;
  const height = video.videoHeight || 640;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not make a poster for that clip.");
  ctx.drawImage(video, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.72);
}

export async function readClip(file: File): Promise<ClipFile> {
  if (!ALLOWED.has(file.type)) throw new Error("Use an MP4 or WebM clip.");
  if (file.size > MAX_BYTES) throw new Error("That clip is over 4 MB. Trim it and try again.");

  const objectUrl = URL.createObjectURL(file);
  try {
    const video = await loadVideo(objectUrl);
    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) throw new Error("Could not read that clip.");
    if (duration > 60) throw new Error("Clips must be 60 seconds or shorter.");
    try {
      video.currentTime = Math.min(0.2, duration / 2);
      await Promise.race([
        new Promise((resolve) => {
          video.onseeked = () => resolve(null);
        }),
        new Promise((resolve) => setTimeout(resolve, 500)),
      ]);
    } catch {
      /* poster from the first frame is fine */
    }
    const posterUrl = capturePoster(video);
    const dataUrl = await fileToDataUrl(file);
    if (!isSafeVideoUrl(dataUrl)) throw new Error("That clip is too large after encoding.");
    return {
      dataUrl,
      posterUrl,
      mime: file.type === "video/quicktime" ? "video/mp4" : file.type,
      width: video.videoWidth || 0,
      height: video.videoHeight || 0,
      durationMs: Math.round(duration * 1000),
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
