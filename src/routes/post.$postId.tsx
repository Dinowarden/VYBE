import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CommentItem } from "@/components/feed/comment-item";
import { PostCard } from "@/components/feed/post-card";
import { EmptyState } from "@/components/states/empty-state";
import { PagePending } from "@/components/states/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { demoComments, findPost } from "@/lib/demo-data";
import { addComment, listComments } from "@/lib/server/engage";
import { getPostById } from "@/lib/server/posts";
import type { FeedComment, FeedPost } from "@/lib/types";

export const Route = createFileRoute("/post/$postId")({ component: PostDetail });

function PostDetail() {
  const { postId } = Route.useParams();
  const router = useRouter();
  const { user } = useCurrentUserState();
  const demo = findPost(postId);
  const [live, setLive] = useState<FeedPost | null | undefined>(undefined);
  const [comments, setComments] = useState<FeedComment[] | null>(null);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void getPostById({ data: postId })
      .then((row) => {
        if (!cancelled) setLive(row);
      })
      .catch(() => {
        if (!cancelled) setLive(null);
      });
    void listComments({ data: postId })
      .then((rows) => {
        if (!cancelled) setComments(rows);
      })
      .catch(() => {
        if (!cancelled) setComments(demoComments.filter((comment) => comment.postId === postId));
      });
    return () => {
      cancelled = true;
    };
  }, [postId]);

  const post = live ?? demo;
  const shown = comments ?? demoComments.filter((comment) => comment.postId === postId);

  async function send(event: FormEvent) {
    event.preventDefault();
    if (!body.trim()) return;
    if (!user) {
      await router.navigate({ to: "/login" });
      return;
    }
    setSending(true);
    try {
      const result = await addComment({ data: { postId, body } });
      setComments((current) => [...(current ?? shown), result.comment]);
      setBody("");
      if (live) setLive({ ...live, commentCount: result.commentCount });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not comment.";
      if (message === "Unauthorized") {
        await router.navigate({ to: "/login" });
        return;
      }
      toast.error(message);
    } finally {
      setSending(false);
    }
  }

  if (live === undefined && !demo) return <PagePending />;

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
        {shown.length === 0 ? (
          <p className="px-1 py-6 text-sm text-muted">Be the first to reply.</p>
        ) : (
          shown.map((comment) => <CommentItem key={comment.id} comment={comment} />)
        )}
        <form className="flex gap-2 py-3" onSubmit={(event) => void send(event)}>
          <Input
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Write a comment"
            aria-label="Write a comment"
            maxLength={500}
          />
          <Button type="submit" size="sm" disabled={sending || !body.trim()}>
            {sending ? "Sending…" : "Send"}
          </Button>
        </form>
      </section>
    </main>
  );
}
