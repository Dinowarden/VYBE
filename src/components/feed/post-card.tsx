import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { FollowButton } from "@/components/social/follow-button";
import { LikeButton } from "@/components/social/like-button";
import { SaveButton } from "@/components/social/save-button";
import { ShareButton } from "@/components/social/share-button";
import { ReportButton } from "@/components/safety/report-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { compactNumber, relativeTime } from "@/lib/format";
import type { FeedPost } from "@/lib/types";
import { useFollowing } from "@/lib/use-following";

export function PostCard({ post }: { post: FeedPost }) {
  const { user } = useCurrentUserState();
  const { myUsername } = useFollowing();
  const media = post.media[0];
  const initials = post.author.displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  const isSelf = user?.id === post.author.id || myUsername === post.author.username;

  return (
    <article className="rounded-[1.75rem] bg-surface p-4 shadow-[var(--shadow-border)]">
      <header className="flex items-center gap-3">
        <Link to="/u/$username" params={{ username: post.author.username }}>
          <Avatar>
            <AvatarImage src={post.author.avatarUrl} alt="" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="min-w-0 flex-1">
          <Link
            to="/u/$username"
            params={{ username: post.author.username }}
            className="block truncate font-medium leading-tight hover:underline"
          >
            {post.author.displayName}
          </Link>
          <p className="text-xs text-muted">
            @{post.author.username}
            <span className="text-subtle"> · {relativeTime(post.createdAt)}</span>
          </p>
        </div>
        {isSelf ? null : (
          <div className="flex items-center gap-1">
            <ReportButton targetType="post" targetId={post.id} ownerId={post.author.id} />
            <FollowButton username={post.author.username} following={post.followingAuthor} />
          </div>
        )}
      </header>

      {post.caption ? <Caption text={post.caption} tags={post.hashtags} /> : null}

      {post.kind === "image" && media ? (
        <Link to="/post/$postId" params={{ postId: post.id }} className="mt-3 block">
          <img src={media.url} alt="" className="max-h-[32rem] w-full rounded-2xl object-cover" />
        </Link>
      ) : null}

      {post.kind === "video" && media ? (
        <Link to="/discover" className="relative mt-3 block">
          {media.posterUrl ? (
            <img
              src={media.posterUrl}
              alt=""
              className="aspect-[4/5] max-h-[28rem] w-full rounded-2xl object-cover"
            />
          ) : (
            <video
              src={media.url}
              muted
              playsInline
              preload="metadata"
              className="aspect-[4/5] max-h-[28rem] w-full rounded-2xl object-cover"
            />
          )}
          <span className="absolute right-3 bottom-3 rounded-full bg-bg/70 px-2 py-1 text-xs">Clip</span>
        </Link>
      ) : null}

      <footer className="mt-3 flex items-center justify-between px-1 text-muted">
        <LikeButton liked={post.liked} count={post.likeCount} targetType="post" targetId={post.id} />
        <Link
          to="/post/$postId"
          params={{ postId: post.id }}
          className="inline-flex items-center gap-1.5 text-sm hover:text-fg"
        >
          <MessageCircle className="size-5" strokeWidth={1.75} />
          <span className="tabular-nums">{compactNumber(post.commentCount)}</span>
        </Link>
        <ShareButton postId={post.id} caption={post.caption} count={post.shareCount} />
        <SaveButton postId={post.id} saved={post.saved} />
      </footer>
    </article>
  );
}

function Caption({ text, tags }: { text: string; tags: string[] }) {
  const parts = text.split(/(#[a-z0-9_]{1,32})/gi);
  const inCaption = new Set(
    parts.filter((part) => part.startsWith("#")).map((part) => part.slice(1).toLowerCase()),
  );
  const extra = tags.filter((tag) => !inCaption.has(tag));
  return (
    <p className="mt-3 text-[0.95rem] leading-relaxed">
      {parts.map((part, index) =>
        part.startsWith("#") ? (
          <Link key={`${part}-${index}`} to="/search" search={{ q: part }} className="text-brand hover:underline">
            {part}
          </Link>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
      {extra.map((tag) => (
        <Link key={tag} to="/search" search={{ q: `#${tag}` }} className="text-brand hover:underline">
          {" "}
          #{tag}
        </Link>
      ))}
    </p>
  );
}
