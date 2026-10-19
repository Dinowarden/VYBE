import { Link } from "@tanstack/react-router";
import { FollowButton } from "@/components/social/follow-button";
import { ReportButton } from "@/components/safety/report-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { compactNumber } from "@/lib/format";
import type { ProfileRow } from "@/lib/types";

export function ProfileHero({
  profile,
  isOwner,
  following = false,
  onFollowChange,
}: {
  profile: ProfileRow;
  isOwner?: boolean;
  following?: boolean;
  onFollowChange?: (next: { following: boolean; followerCount: number }) => void;
}) {
  const initial = profile.displayName.charAt(0).toUpperCase();

  return (
    <header className="overflow-hidden rounded-[1.75rem] bg-surface shadow-[var(--shadow-border)]">
      <div className="h-24 bg-[linear-gradient(135deg,#1e1d26_0%,#2a1a16_55%,#16151c_100%)]" />
      <div className="px-5 pb-5">
        <div className="-mt-10 flex items-end gap-4">
          <Avatar className="size-20 shadow-[var(--shadow-lift)]">
            <AvatarImage src={profile.avatarUrl ?? undefined} alt="" />
            <AvatarFallback className="text-2xl">{initial}</AvatarFallback>
          </Avatar>
          <div className="mb-1 min-w-0 flex-1">
            <h1 className="font-display truncate text-2xl font-semibold">{profile.displayName}</h1>
            <p className="text-sm text-muted">@{profile.username}</p>
          </div>
          {isOwner ? (
            <Button asChild size="sm" variant="outline">
              <Link to="/profile/edit">Edit</Link>
            </Button>
          ) : (
            <div className="mb-1 flex flex-col items-end gap-2">
              <FollowButton
                username={profile.username}
                following={following}
                onChange={onFollowChange}
              />
              <ReportButton targetType="user" targetId={profile.userId} ownerId={profile.userId} variant="text" />
            </div>
          )}
        </div>
        {profile.bio ? (
          <p className="mt-4 text-sm leading-relaxed">{profile.bio}</p>
        ) : isOwner ? (
          <p className="mt-4 text-sm text-muted">Add a bio so people know what you make.</p>
        ) : null}
        <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
          <Stat
            label="Followers"
            value={profile.followerCount}
            to="/u/$username/followers"
            username={profile.username}
          />
          <Stat
            label="Following"
            value={profile.followingCount}
            to="/u/$username/following"
            username={profile.username}
          />
          <Stat label="Likes" value={profile.likeCount} />
        </dl>
      </div>
    </header>
  );
}

function Stat({
  label,
  value,
  to,
  username,
}: {
  label: string;
  value: number;
  to?: "/u/$username/followers" | "/u/$username/following";
  username?: string;
}) {
  const inner = (
    <>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="font-display text-lg font-semibold tabular-nums">{compactNumber(value)}</dd>
    </>
  );
  if (to && username) {
    return (
      <Link to={to} params={{ username }} className="rounded-xl py-1 hover:bg-elevated">
        {inner}
      </Link>
    );
  }
  return <div>{inner}</div>;
}
