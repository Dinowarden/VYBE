import { Link } from "@tanstack/react-router";
import { FollowButton } from "@/components/social/follow-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Person } from "@/lib/server/follow";

export function PersonRow({
  person,
  viewerUsername,
  onFollow,
}: {
  person: Person;
  viewerUsername?: string | null;
  onFollow?: (username: string, following: boolean) => void;
}) {
  const isSelf = viewerUsername === person.username;

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-[var(--shadow-border)]">
      <Link to="/u/$username" params={{ username: person.username }} className="flex min-w-0 flex-1 items-center gap-3">
        <Avatar>
          <AvatarImage src={person.avatarUrl ?? undefined} alt="" />
          <AvatarFallback>{person.displayName[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate font-medium">{person.displayName}</p>
          <p className="truncate text-sm text-muted">@{person.username}</p>
        </div>
      </Link>
      {isSelf ? null : (
        <FollowButton
          username={person.username}
          following={person.following}
          onChange={(next) => onFollow?.(person.username, next.following)}
        />
      )}
    </div>
  );
}
