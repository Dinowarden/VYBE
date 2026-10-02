import { createFileRoute, Link } from "@tanstack/react-router";
import { RequireAuth } from "@/components/auth/auth-guard";
import { FollowButton } from "@/components/social/follow-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { demoNotifications } from "@/lib/demo-data";
import { relativeTime } from "@/lib/format";

export const Route = createFileRoute("/notifications")({ component: NotificationsPage });

function NotificationsPage() {
  return (
    <RequireAuth>
      <Notifications />
    </RequireAuth>
  );
}

function Notifications() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-6">
      <div className="mb-5 hidden md:block">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Signals</p>
        <h1 className="font-display mt-1 text-3xl font-semibold">What moved</h1>
      </div>
      <ul className="divide-y divide-border rounded-3xl bg-surface px-2 shadow-[var(--shadow-border)]">
        {demoNotifications.map((item) => (
          <li key={item.id} className="flex items-center gap-3 px-3 py-4">
            <Avatar className="size-11">
              <AvatarImage src={item.actor.avatarUrl} alt="" />
              <AvatarFallback>{item.actor.displayName[0]}</AvatarFallback>
            </Avatar>
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
              <FollowButton username={item.actor.username} following={false} />
            ) : item.post ? (
              <Button asChild size="sm" variant="secondary">
                <Link to="/post/$postId" params={{ postId: item.post.id }}>View</Link>
              </Button>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
