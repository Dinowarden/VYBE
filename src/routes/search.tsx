import { createFileRoute, Link } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { PostCard } from "@/components/feed/post-card";
import { VideoCard } from "@/components/feed/video-card";
import { FollowButton } from "@/components/social/follow-button";
import { EmptyState } from "@/components/states/empty-state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoPosts, demoUsers } from "@/lib/demo-data";
import { useFollowing } from "@/lib/use-following";

type Search = { q?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q: initial } = Route.useSearch();
  const [q, setQ] = useState(initial ?? "");
  const query = q.trim().toLowerCase().replace(/^#/, "");
  const { follows, myUsername } = useFollowing();

  const people = useMemo(
    () =>
      demoUsers.filter(
        (user) =>
          !query ||
          user.username.includes(query) ||
          user.displayName.toLowerCase().includes(query),
      ),
    [query],
  );
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of demoPosts) {
      for (const tag of post.hashtags) {
        if (!query || tag.includes(query)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [query]);
  const posts = useMemo(
    () =>
      demoPosts.filter(
        (post) =>
          post.kind !== "video" &&
          (!query || post.caption.toLowerCase().includes(query) || post.hashtags.some((tag) => tag.includes(query))),
      ),
    [query],
  );
  const videos = useMemo(
    () =>
      demoPosts.filter(
        (post) =>
          post.kind === "video" &&
          (!query || post.caption.toLowerCase().includes(query) || post.hashtags.some((tag) => tag.includes(query))),
      ),
    [query],
  );

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-6">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-subtle" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search people, tags, posts" className="pl-10" aria-label="Search VYBE" />
      </div>
      <Tabs defaultValue="people" className="mt-5">
        <TabsList className="w-full">
          <TabsTrigger value="people" className="flex-1">People</TabsTrigger>
          <TabsTrigger value="tags" className="flex-1">Tags</TabsTrigger>
          <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
          <TabsTrigger value="videos" className="flex-1">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="people" className="mt-4 space-y-3">
          {people.length === 0 ? (
            <EmptyState icon={SearchIcon} title="No people found" description="Try a name or username." />
          ) : (
            people.map((user) => (
              <div key={user.id} className="flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-[var(--shadow-border)]">
                <Link to="/u/$username" params={{ username: user.username }} className="flex min-w-0 flex-1 items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatarUrl} alt="" />
                    <AvatarFallback>{user.displayName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{user.displayName}</p>
                    <p className="truncate text-sm text-muted">@{user.username}</p>
                  </div>
                </Link>
                {myUsername === user.username ? null : (
                  <FollowButton username={user.username} following={follows(user.username)} />
                )}
              </div>
            ))
          )}
        </TabsContent>
        <TabsContent value="tags" className="mt-4 space-y-2">
          {tags.map(([tag, count]) => (
            <button key={tag} type="button" onClick={() => setQ(`#${tag}`)} className="flex w-full items-center justify-between rounded-2xl bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)]">
              <span className="font-medium">#{tag}</span>
              <span className="text-sm tabular-nums text-muted">{count}</span>
            </button>
          ))}
        </TabsContent>
        <TabsContent value="posts" className="mt-4 flex flex-col gap-4">
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
        </TabsContent>
        <TabsContent value="videos" className="mt-4 grid grid-cols-2 gap-2">
          {videos.map((post) => <VideoCard key={post.id} post={post} />)}
        </TabsContent>
      </Tabs>
    </main>
  );
}
