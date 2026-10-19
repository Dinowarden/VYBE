import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { compactNumber } from "@/lib/format";
import { recordShare } from "@/lib/server/engage";
import { cn } from "@/lib/utils";

export function ShareButton({
  postId,
  caption,
  count,
  variant = "row",
}: {
  postId: string;
  caption: string;
  count: number;
  variant?: "row" | "rail";
}) {
  const { user } = useCurrentUserState();
  const [value, setValue] = useState(count);
  const [busy, setBusy] = useState(false);

  async function share() {
    const url = `${window.location.origin}/post/${postId}`;
    let channel: "link" | "native" = "link";
    let delivered = false;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "VYBE", text: caption, url });
        channel = "native";
        delivered = true;
        toast.success("Shared");
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    if (!delivered) {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      } catch {
        toast.message("Share this link", { description: url });
      }
    }
    if (!user) return;
    setBusy(true);
    try {
      const result = await recordShare({ data: { postId, channel } });
      setValue(result.shareCount);
    } catch {
      /* the link already went out */
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void share()}
      disabled={busy}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm hover:text-fg",
        variant === "rail" && "flex-col gap-1",
      )}
      aria-label="Share"
    >
      <Share2 className={variant === "rail" ? "size-7" : "size-5"} strokeWidth={variant === "rail" ? 1.6 : 1.75} />
      <span className="tabular-nums">{compactNumber(value)}</span>
    </button>
  );
}
