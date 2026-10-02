import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CommentItem } from "@/components/feed/comment-item";
import { PostCard } from "@/components/feed/post-card";
import { EmptyState } from "@/components/states/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoComments, findPost } from "@/lib/demo-data";

export const Route = createFileRoute("/post/$postId")({ component: PostDetail });

function PostDetail() {
  const { postId } = Route.useParams();
  const post = findPost(postId);
  const comments = demoComments.filter((comment) => comment.postId === postId);

  if (!post) {
    return (
      <EmptyState
        icon={ArrowLeft}
        title="That post is gone"
        description="It may have been removed, or the link is incomplete."
        action={<Button asChild variant="secondary"><Link to="/">Back to Circle</Link></Button>}
      />
    );
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-6">
      <Link to="/" className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" />
        Circle
      </Link>
      <PostCard post={post} />
      <section className="mt-4 rounded-[1.75rem] bg-surface px-4 py-2 shadow-[var(--shadow-border)]">
        <h2 className="px-1 pt-3 font-display text-base font-semibold">Comments</h2>
        {comments.length === 0 ? (
          <p className="px-1 py-6 text-sm text-muted">Be the first to reply.</p>
        ) : (
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
        )}
        <form className="flex gap-2 py-3" onSubmit={(event) => event.preventDefault()}>
          <Input placeholder="Write a comment" aria-label="Write a comment" />
          <Button type="submit" size="sm">Send</Button>
        </form>
      </section>
    </main>
  );
}
