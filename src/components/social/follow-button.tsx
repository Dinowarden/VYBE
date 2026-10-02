import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { toggleFollow } from "@/lib/server/follow";
import { cn } from "@/lib/utils";

export function FollowButton({
  username,
  following: followingProp,
  className,
  onChange,
}: {
  username: string;
  following: boolean;
  className?: string;
  onChange?: (next: { following: boolean; followerCount: number }) => void;
}) {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [following, setFollowing] = useState(followingProp);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setFollowing(followingProp);
  }, [followingProp]);

  async function toggle() {
    if (isPending) return;
    if (!user) {
      void navigate({ to: "/login" });
      return;
    }
    const previous = following;
    setFollowing(!previous);
    setBusy(true);
    try {
      const result = await toggleFollow({ data: { username } });
      setFollowing(result.following);
      onChange?.(result);
    } catch (err) {
      setFollowing(previous);
      const message = err instanceof Error ? err.message : "Could not update follow.";
      if (message === "Unauthorized") {
        void navigate({ to: "/login" });
        return;
      }
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      size="sm"
      variant={following ? "outline" : "default"}
      onClick={() => void toggle()}
      disabled={busy}
      aria-pressed={following}
      className={cn("min-w-[6.5rem]", className)}
    >
      {following ? "Following" : "Follow"}
    </Button>
  );
}
