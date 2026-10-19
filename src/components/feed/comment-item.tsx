import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LikeButton } from "@/components/social/like-button";
import { ReportButton } from "@/components/safety/report-button";
import { relativeTime } from "@/lib/format";
import type { FeedComment } from "@/lib/types";

export function CommentItem({ comment }: { comment: FeedComment }) {
  const initials = comment.author.displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return (
    <article className="flex gap-3 py-3">
      <Link to="/u/$username" params={{ username: comment.author.username }}>
        <Avatar className="size-9">
          <AvatarImage src={comment.author.avatarUrl} alt="" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <Link
            to="/u/$username"
            params={{ username: comment.author.username }}
            className="truncate text-sm font-medium hover:underline"
          >
            {comment.author.displayName}
          </Link>
          <time className="text-xs text-subtle" dateTime={comment.createdAt}>
            {relativeTime(comment.createdAt)}
          </time>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-fg/90">{comment.body}</p>
        <ReportButton targetType="comment" targetId={comment.id} ownerId={comment.author.id} variant="text" />
      </div>
      <LikeButton liked={comment.liked} count={comment.likeCount} targetType="comment" targetId={comment.id} />
    </article>
  );
}
