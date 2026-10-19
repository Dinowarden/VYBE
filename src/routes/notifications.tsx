import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { RequireAuth } from "@/components/auth/auth-guard";
import { FollowButton } from "@/components/social/follow-button";
import { EmptyState } from "@/components/states/empty-state";
import { PagePending } from "@/components/states/loading-spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { relativeTime } from "@/lib/format";
import { listSignals, type SignalItem } from "@/lib/server/signals";
import { clearUnreadSignals } from "@/lib/use-signals";
import { useFollowing } from "@/lib/use-following";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({ component: NotificationsPage });

function NotificationsPage() {
  return (
    <RequireAuth>
      <Notifications />
    </RequireAuth>
  );
}

function Notifications() {
  const { follows } = useFollowing();
  const [items, setItems] = useState<SignalItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    void listSignals({ data: {} })
      .then((rows) => {
        if (cancelled) return;
        setItems(rows);
        clearUnreadSignals();
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-6">
      <div className="mb-5 hidden md:block">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Signals</p>
        <h1 className="font-display mt-1 text-3xl font-semibold">What moved</h1>
      </div>
      {items === null ? (
        <PagePending />
      ) : items.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="Nothing moving yet"
          description="Follows, likes, comments, and shares will show up here."
        />
      ) : (
        <ul className="divide-y divide-border rounded-3xl bg-surface px-2 shadow-[var(--shadow-border)]">
          {items.map((item) => {
            const initials = item.actor.displayName
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2);
            return (
              <li
                key={item.id}
                className={cn("flex items-center gap-3 px-3 py-4", !item.read && "bg-brand/5")}
              >
                <Link to="/u/$username" params={{ username: item.actor.username }}>
                  <Avatar className="size-11">
                    <AvatarImage src={item.actor.avatarUrl} alt="" />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug">
                    <Link to="/u/$username" params={{ username: item.actor.username }} className="font-medium hover:underline">
                      {item.actor.displayName}
                    </Link>{" "}
                    <span className="text-muted">{item.body}</span>
                  </p>
                  <p className="mt-1 text-xs text-subtle">{relativeTime(item.createdAt)}</p>
                </div>
                {item.type === "follow" ? (
                  <FollowButton username={item.actor.username} following={follows(item.actor.username)} />
                ) : item.postId ? (
                  <Button asChild size="sm" variant="secondary">
                    <Link to="/post/$postId" params={{ postId: item.postId }}>View</Link>
                  </Button>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
