import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { unreadSignalCount } from "@/lib/server/signals";

let count = 0;
const listeners = new Set<() => void>();

function publish(next: number) {
  count = next;
  for (const listener of listeners) listener();
}

export function clearUnreadSignals() {
  publish(0);
}

export function useUnreadSignals() {
  const { user, isPending } = useCurrentUserState();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [, setTick] = useState(0);
  const userId = user?.id ?? null;

  useEffect(() => {
    const listener = () => setTick((n) => n + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    if (isPending) return;
    if (!userId) {
      publish(0);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(() => {
      void unreadSignalCount({ data: {} })
        .then((next) => {
          if (!cancelled) publish(next);
        })
        .catch(() => undefined);
    }, pathname.startsWith("/notifications") ? 600 : 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [userId, isPending, pathname]);

  return userId ? count : 0;
}
