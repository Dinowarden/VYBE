import { Link } from "@tanstack/react-router";
import { Bookmark, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FollowButton } from "@/components/social/follow-button";
import { LikeButton } from "@/components/social/like-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { compactNumber, relativeTime } from "@/lib/format";
import type { FeedPost } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PostCard({ post }: { post: FeedPost }) {
  const [saved, setSaved] = useState(post.saved);
  const media = post.media[0];
  const initials = post.author.displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  async function share() {
    const url = `${window.location.origin}/post/${post.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "VYBE", text: post.caption, url });
        return;
      }
    } catch {
      /* cancelled */
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied");
  }

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
        <FollowButton username={post.author.username} following={post.followingAuthor} />
      </header>

      {post.caption ? (
        <p className="mt-3 text-[0.95rem] leading-relaxed">
          {post.caption}{" "}
          {post.hashtags.map((tag) => (
            <Link key={tag} to="/search" search={{ q: `#${tag}` }} className="text-brand hover:underline">
              #{tag}
            </Link>
          ))}
        </p>
      ) : null}

      {post.kind === "image" && media ? (
        <Link to="/post/$postId" params={{ postId: post.id }} className="mt-3 block">
          <img src={media.url} alt="" className="aspect-[4/5] w-full rounded-2xl object-cover sm:aspect-[16/10]" />
        </Link>
      ) : null}

      {post.kind === "video" && media ? (
        <Link to="/discover" className="relative mt-3 block">
          <img
            src={media.posterUrl ?? media.url}
            alt=""
            className="aspect-[4/5] max-h-[28rem] w-full rounded-2xl object-cover"
          />
          <span className="absolute right-3 bottom-3 rounded-full bg-bg/70 px-2 py-1 text-xs">Clip</span>
        </Link>
      ) : null}

      <footer className="mt-3 flex items-center justify-between px-1 text-muted">
        <LikeButton liked={post.liked} count={post.likeCount} />
        <Link
          to="/post/$postId"
          params={{ postId: post.id }}
          className="inline-flex items-center gap-1.5 text-sm hover:text-fg"
        >
          <MessageCircle className="size-5" strokeWidth={1.75} />
          <span className="tabular-nums">{compactNumber(post.commentCount)}</span>
        </Link>
        <button type="button" onClick={() => void share()} className="inline-flex items-center gap-1.5 text-sm hover:text-fg" aria-label="Share">
          <Share2 className="size-5" strokeWidth={1.75} />
          <span className="tabular-nums">{compactNumber(post.shareCount)}</span>
        </button>
        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          className={cn("inline-flex items-center gap-1.5 text-sm hover:text-fg", saved && "text-brand")}
          aria-pressed={saved}
          aria-label={saved ? "Unsave" : "Save"}
        >
          <Bookmark className={cn("size-5", saved && "fill-brand text-brand")} strokeWidth={1.75} />
        </button>
      </footer>
    </article>
  );
}
