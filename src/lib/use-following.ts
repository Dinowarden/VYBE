import { useCallback, useEffect, useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getFollowContext } from "@/lib/server/follow";

export function useFollowing() {
  const { user, isPending } = useCurrentUserState();
  const [following, setFollowing] = useState<Set<string>>(new Set());
  const [myUsername, setMyUsername] = useState<string | null>(null);
  const [graphLoaded, setGraphLoaded] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setFollowing(new Set());
      setMyUsername(null);
      setGraphLoaded(true);
      return;
    }
    setGraphLoaded(false);
    let cancelled = false;
    void getFollowContext()
      .then((ctx) => {
        if (cancelled) return;
        setFollowing(new Set(ctx.following));
        setMyUsername(ctx.myUsername);
        setGraphLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setGraphLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  const setFollows = useCallback((username: string, next: boolean) => {
    setFollowing((prev) => {
      const copy = new Set(prev);
      if (next) copy.add(username);
      else copy.delete(username);
      return copy;
    });
  }, []);

  return {
    user,
    isPending: isPending || Boolean(user && !graphLoaded),
    myUsername,
    following,
    follows: (username: string) => following.has(username),
    setFollows,
  };
}
