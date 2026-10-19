import { useRouter } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { toggleSave } from "@/lib/server/engage";
import { cn } from "@/lib/utils";

export function SaveButton({
  postId,
  saved,
  variant = "row",
}: {
  postId: string;
  saved: boolean;
  variant?: "row" | "rail";
}) {
  const router = useRouter();
  const { user } = useCurrentUserState();
  const [on, setOn] = useState(saved);
  const [busy, setBusy] = useState(false);

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

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      disabled={busy}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm hover:text-fg",
        variant === "rail" && "flex-col gap-1",
        on && "text-brand",
      )}
      aria-pressed={on}
      aria-label={on ? "Unsave" : "Save"}
    >
      <Bookmark className={cn(variant === "rail" ? "size-7" : "size-5", on && "fill-brand text-brand")} strokeWidth={variant === "rail" ? 1.6 : 1.75} />
    </button>
  );
}
