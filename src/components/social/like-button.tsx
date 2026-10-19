import { useRouter } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { compactNumber } from "@/lib/format";
import { listMyLikes, toggleLike } from "@/lib/server/engage";
import { cn } from "@/lib/utils";

type Target = "post" | "comment";

type LikeCache = {
  userId: string;
  ready: boolean;
  posts: Set<string>;
  comments: Set<string>;
};

let cache: LikeCache | null = null;
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function remember(userId: string, type: Target, id: string, liked: boolean) {
  if (!cache || cache.userId !== userId) {
    cache = { userId, ready: true, posts: new Set(), comments: new Set() };
  }
  const bucket = type === "post" ? cache.posts : cache.comments;
  if (liked) bucket.add(id);
  else bucket.delete(id);
  notify();
}

function useLikeFlag(type: Target, id: string) {
  const { user, isPending } = useCurrentUserState();
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((n) => n + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      cache = null;
      notify();
      return;
    }
    if (cache?.userId === user.id && cache.ready) return;
    let cancelled = false;
    void listMyLikes({ data: {} })
      .then((rows) => {
        if (cancelled) return;
        cache = {
          userId: user.id,
          ready: true,
          posts: new Set(rows.posts),
          comments: new Set(rows.comments),
        };
        notify();
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [user?.id, isPending]);

  if (!user || !cache || cache.userId !== user.id || !cache.ready) return null;
  return (type === "post" ? cache.posts : cache.comments).has(id);
}

export function LikeButton({
  liked: likedProp,
  count,
  targetType,
  targetId,
  variant = "row",
  className,
}: {
  liked: boolean;
  count: number;
  targetType: Target;
  targetId: string;
  variant?: "row" | "rail";
  className?: string;
}) {
  const router = useRouter();
  const { user } = useCurrentUserState();
  const remote = useLikeFlag(targetType, targetId);
  const [liked, setLiked] = useState(likedProp);
  const [value, setValue] = useState(count);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setLiked(remote ?? likedProp);
  }, [remote, likedProp, targetId]);

  useEffect(() => {
    setValue(count);
  }, [count, targetId]);

  async function toggle() {
    if (!user) {
      await router.navigate({ to: "/login" });
      return;
    }
    const next = !liked;
    setLiked(next);
    setValue((n) => Math.max(0, n + (next ? 1 : -1)));
    setBusy(true);
    try {
      const result = await toggleLike({ data: { targetType, targetId } });
      setLiked(result.liked);
      setValue(result.likeCount);
      remember(user.id, targetType, targetId, result.liked);
    } catch (err) {
      setLiked(!next);
      setValue((n) => Math.max(0, n + (next ? -1 : 1)));
      const message = err instanceof Error ? err.message : "Could not update that like.";
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
