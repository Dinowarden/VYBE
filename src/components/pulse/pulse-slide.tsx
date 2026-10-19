import { Link } from "@tanstack/react-router";
import { MessageCircle, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef } from "react";
import { FollowButton } from "@/components/social/follow-button";
import { LikeButton } from "@/components/social/like-button";
import { SaveButton } from "@/components/social/save-button";
import { ReportButton } from "@/components/safety/report-button";
import { ShareButton } from "@/components/social/share-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { compactNumber } from "@/lib/format";
import type { FeedPost } from "@/lib/types";

export function PulseSlide({
  post,
  active,
  muted,
  onMutedChange,
}: {
  post: FeedPost;
  active: boolean;
  muted: boolean;
  onMutedChange: (muted: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const media = post.media[0];
  const initials = post.author.displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (active) void el.play().catch(() => undefined);
    else el.pause();
  }, [active]);

  return (
    <section className="relative h-full w-full snap-start bg-bg">
      {media ? (
        <video
          ref={videoRef}
          src={media.url}
          poster={media.posterUrl}
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          loop
          muted={muted}
          preload={active ? "auto" : "metadata"}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-bg/20" />

      <button
        type="button"
        onClick={() => onMutedChange(!muted)}
        className="absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-bg/50 text-fg"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      </button>

      <div className="absolute right-3 bottom-36 z-10 flex flex-col items-center gap-5 md:bottom-16">
        <Link to="/u/$username" params={{ username: post.author.username }}>
          <Avatar className="size-12 shadow-[var(--shadow-lift)]">
            <AvatarImage src={post.author.avatarUrl} alt="" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Link>
        <LikeButton liked={post.liked} count={post.likeCount} targetType="post" targetId={post.id} variant="rail" />
        <Link to="/post/$postId" params={{ postId: post.id }} className="flex flex-col items-center gap-1 text-sm">
          <MessageCircle className="size-7" strokeWidth={1.6} />
          <span className="tabular-nums">{compactNumber(post.commentCount)}</span>
        </Link>
        <ShareButton postId={post.id} caption={post.caption} count={post.shareCount} variant="rail" />
        <SaveButton postId={post.id} saved={post.saved} variant="rail" />
        <ReportButton targetType="post" targetId={post.id} ownerId={post.author.id} variant="rail" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 pb-32 md:pb-8">
        <div className="flex max-w-[calc(100%-4.5rem)] items-center gap-3">
          <div className="min-w-0 flex-1">
            <Link
              to="/u/$username"
              params={{ username: post.author.username }}
              className="font-display text-lg font-semibold hover:underline"
            >
              @{post.author.username}
            </Link>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-fg/90">
              {post.caption}{" "}
              {post.hashtags.map((tag) => (
                <span key={tag} className="text-brand">#{tag} </span>
              ))}
            </p>
          </div>
          <FollowButton username={post.author.username} following={post.followingAuthor} />
        </div>
      </div>
    </section>
  );
}
