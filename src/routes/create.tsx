import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ImageIcon, Type, Video } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { resizeFeedImage } from "@/lib/image";
import { readClip, type ClipFile } from "@/lib/clip";
import { createPost } from "@/lib/server/posts";

export const Route = createFileRoute("/create")({ component: CreatePage });

function CreatePage() {
  return (
    <RequireAuth>
      <Create />
    </RequireAuth>
  );
}

function positive(value: number | undefined) {
  return value && value > 0 ? value : undefined;
}

function Create() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const clipRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<{ dataUrl: string; width: number; height: number } | null>(null);
  const [clip, setClip] = useState<ClipFile | null>(null);
  const [publishing, setPublishing] = useState(false);

  async function onPick(file: File | undefined) {
    if (!file) return;
    try {
      setImage(await resizeFeedImage(file));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not use that photo.");
    }
  }

  async function onPickClip(file: File | undefined) {
    if (!file) return;
    try {
      setClip(await readClip(file));
    } catch (err) {
      setClip(null);
      toast.error(err instanceof Error ? err.message : "Could not use that clip.");
    }
  }

  async function publish(kind: "text" | "image" | "video", event?: FormEvent) {
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
      await createPost({
        data: {
          kind,
          caption,
          imageUrl: kind === "image" ? image?.dataUrl ?? null : null,
          videoUrl: kind === "video" ? clip?.dataUrl ?? null : null,
          posterUrl: kind === "video" ? clip?.posterUrl ?? null : null,
          mime: kind === "video" ? clip?.mime : null,
          width: positive(kind === "video" ? clip?.width : image?.width),
          height: positive(kind === "video" ? clip?.height : image?.height),
          durationMs: kind === "video" ? clip?.durationMs : undefined,
        },
      });
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

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-6">
      <div className="hidden md:block">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Create</p>
        <h1 className="font-display mt-1 text-3xl font-semibold">Make a mark</h1>
      </div>
      <Tabs defaultValue="text" className="mt-6">
        <TabsList className="w-full justify-between">
          <TabsTrigger value="text" className="flex-1 gap-1.5">
            <Type className="size-4" /> Text
          </TabsTrigger>
          <TabsTrigger value="image" className="flex-1 gap-1.5">
            <ImageIcon className="size-4" /> Image
          </TabsTrigger>
          <TabsTrigger value="video" className="flex-1 gap-1.5">
            <Video className="size-4" /> Clip
          </TabsTrigger>
        </TabsList>
        <TabsContent value="text" className="mt-5">
          <form className="space-y-4" onSubmit={(e) => void publish("text", e)}>
            <Label htmlFor="caption-text">What is on your mind</Label>
            <Textarea
              id="caption-text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Just launched something I have been circling for months. #build"
              maxLength={500}
            />
            <p className="text-right text-xs tabular-nums text-subtle">{caption.length}/500</p>
            <Button className="w-full" type="submit" disabled={publishing}>
              {publishing ? "Publishing…" : "Publish"}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="image" className="mt-5">
          <form className="space-y-4" onSubmit={(e) => void publish("image", e)}>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="grid min-h-48 w-full place-items-center overflow-hidden rounded-3xl border border-dashed border-border bg-elevated text-sm text-muted"
            >
              {image ? (
                <img src={image.dataUrl} alt="" className="max-h-80 w-full object-cover" />
              ) : (
                "Drop an image, or tap to choose"
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => void onPick(e.target.files?.[0])}
            />
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption and #hashtags"
              maxLength={500}
            />
            <Button className="w-full" type="submit" disabled={publishing}>
              {publishing ? "Publishing…" : "Publish image"}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="video" className="mt-5">
          <form className="space-y-4" onSubmit={(e) => void publish("video", e)}>
            <button
              type="button"
              onClick={() => clipRef.current?.click()}
              className="grid min-h-56 w-full place-items-center overflow-hidden rounded-3xl border border-dashed border-border bg-elevated text-sm text-muted"
            >
              {clip ? (
                <video src={clip.dataUrl} poster={clip.posterUrl} className="max-h-80 w-full object-cover" muted playsInline />
              ) : (
                <span className="px-6 text-center">Short clip, vertical preferred. MP4 or WebM, under 60 seconds and 4 MB.</span>
              )}
            </button>
            <input
              ref={clipRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              className="sr-only"
              onChange={(e) => void onPickClip(e.target.files?.[0])}
            />
            {clip ? (
              <p className="text-right text-xs tabular-nums text-subtle">{Math.max(1, Math.round(clip.durationMs / 1000))}s</p>
            ) : null}
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Caption this clip #pulse"
              maxLength={500}
            />
            <Button className="w-full" type="submit" disabled={publishing}>
              {publishing ? "Publishing…" : "Publish clip"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </main>
  );
}
