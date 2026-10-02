import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { compactNumber } from "@/lib/format";
import type { FeedPost } from "@/lib/types";

export function VideoCard({ post }: { post: FeedPost }) {
  const media = post.media[0];
  return (
    <Link to="/discover" className="group relative block overflow-hidden rounded-2xl bg-elevated">
      <img
        src={media?.posterUrl ?? media?.url}
        alt=""
        className="aspect-[9/14] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/80 to-transparent p-3">
        <p className="line-clamp-2 text-sm font-medium">{post.caption}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted">
          <Play className="size-3" />
          <span className="tabular-nums">{compactNumber(post.viewCount)}</span>
        </p>
      </div>
    </Link>
  );
}
