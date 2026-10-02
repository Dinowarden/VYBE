import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon, Type, Video } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/create")({ component: CreatePage });

function CreatePage() {
  return (
    <RequireAuth>
      <Create />
    </RequireAuth>
  );
}

function Create() {
  const [caption, setCaption] = useState("");

  function publish(kind: string) {
    if (!caption.trim() && kind === "text") {
      toast.error("Write something first");
      return;
    }
    toast.message("Saved locally for now", {
      description: "Publishing to the Circle lands in the next build step.",
    });
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
        <TabsContent value="text" className="mt-5 space-y-4">
          <Label htmlFor="caption-text">What is on your mind</Label>
          <Textarea
            id="caption-text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Just launched something I have been circling for months."
            maxLength={500}
          />
          <p className="text-right text-xs tabular-nums text-subtle">{caption.length}/500</p>
          <Button className="w-full" onClick={() => publish("text")}>Publish</Button>
        </TabsContent>
        <TabsContent value="image" className="mt-5 space-y-4">
          <div className="grid h-48 place-items-center rounded-3xl border border-dashed border-border bg-elevated text-sm text-muted">
            Drop an image, or tap to choose
          </div>
          <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Add a caption and #hashtags" maxLength={500} />
          <Button className="w-full" onClick={() => publish("image")}>Publish image</Button>
        </TabsContent>
        <TabsContent value="video" className="mt-5 space-y-4">
          <div className="grid h-56 place-items-center rounded-3xl border border-dashed border-border bg-elevated px-6 text-center text-sm text-muted">
            Short clip, vertical preferred. MP4 or WebM, under 60 seconds.
          </div>
          <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption this clip" maxLength={500} />
          <Button className="w-full" onClick={() => publish("video")}>Publish clip</Button>
        </TabsContent>
      </Tabs>
    </main>
  );
}
