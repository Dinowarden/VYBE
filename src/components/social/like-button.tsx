import { Heart } from "lucide-react";
import { useState } from "react";
import { compactNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export function LikeButton({
  liked: likedProp,
  count,
  variant = "row",
  className,
}: {
  liked: boolean;
  count: number;
  variant?: "row" | "rail";
  className?: string;
}) {
  const [liked, setLiked] = useState(likedProp);
  const [value, setValue] = useState(count);

  return (
    <button
      type="button"
      onClick={() => {
        const next = !liked;
        setLiked(next);
        setValue((n) => n + (next ? 1 : -1));
      }}
      aria-pressed={liked}
      aria-label={liked ? "Unlike" : "Like"}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm transition-colors",
        variant === "rail" ? "flex-col gap-1 text-fg" : "text-muted hover:text-fg",
        liked && "text-brand",
        className,
      )}
    >
      <Heart
        className={cn(variant === "rail" ? "size-7" : "size-5", liked && "fill-brand text-brand")}
        strokeWidth={1.75}
      />
      <span className="tabular-nums">{compactNumber(value)}</span>
    </button>
  );
}
