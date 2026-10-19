import { createFileRoute, Link } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { PostCard } from "@/components/feed/post-card";
import { VideoCard } from "@/components/feed/video-card";
import { FollowButton } from "@/components/social/follow-button";
import { EmptyState } from "@/components/states/empty-state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { searchVybe } from "@/lib/server/posts";
import type { FeedPost } from "@/lib/types";
import { useFollowing } from "@/lib/use-following";

type Search = { q?: string };
type PersonHit = { id: string; username: string; displayName: string; bio: string; avatarUrl: string };
type SearchResult = { people: PersonHit[]; tags: { tag: string; count: number }[]; posts: FeedPost[]; videos: FeedPost[] };

const empty: SearchResult = { people: [], tags: [], posts: [], videos: [] };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q: initial } = Route.useSearch();
  const [q, setQ] = useState(initial ?? "");
  const [tab, setTab] = useState(initial?.trim().startsWith("#") ? "tags" : "people");
  const [result, setResult] = useState<SearchResult>(empty);
  const [ready, setReady] = useState(false);
  const { follows, myUsername } = useFollowing();

  useEffect(() => {
    setQ(initial ?? "");
  }, [initial]);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      void searchVybe({ data: { q } })
        .then((next) => {
          if (cancelled) return;
          setResult(next);
          setReady(true);
          const word = q.trim();
          if (word.startsWith("#")) setTab("tags");
          else if (next.people.length) setTab("people");
          else if (next.posts.length) setTab("posts");
          else if (next.videos.length) setTab("videos");
          else if (next.tags.length) setTab("tags");
        })
        .catch(() => {
          if (!cancelled) {
            setResult(empty);
            setReady(true);
          }
        });
    }, 180);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [q]);

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-6">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-subtle" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search people, tags, posts"
          className="pl-10"
          aria-label="Search VYBE"
        />
      </div>
      <Tabs value={tab} onValueChange={setTab} className="mt-5">
        <TabsList className="w-full">
          <TabsTrigger value="people" className="flex-1">People</TabsTrigger>
          <TabsTrigger value="tags" className="flex-1">Tags</TabsTrigger>
          <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
          <TabsTrigger value="videos" className="flex-1">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="people" className="mt-4 space-y-3">
          {ready && result.people.length === 0 ? (
            <EmptyState icon={SearchIcon} title="No people found" description="Try a name or username." />
          ) : (
            result.people.map((user) => (
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
          {ready && result.tags.length === 0 ? (
            <EmptyState icon={SearchIcon} title="No tags found" description="Hashtags from posts show up here." />
          ) : (
            result.tags.map((item) => (
              <button
                key={item.tag}
                type="button"
                onClick={() => setQ(`#${item.tag}`)}
                className="flex w-full items-center justify-between rounded-2xl bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)]"
              >
                <span className="font-medium">#{item.tag}</span>
                <span className="text-sm tabular-nums text-muted">{item.count}</span>
              </button>
            ))
          )}
        </TabsContent>
        <TabsContent value="posts" className="mt-4 flex flex-col gap-4">
          {ready && result.posts.length === 0 ? (
            <EmptyState icon={SearchIcon} title="No posts found" description="Try a word from a caption or a #tag." />
          ) : (
            result.posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </TabsContent>
        <TabsContent value="videos" className="mt-4 grid grid-cols-2 gap-2">
          {ready && result.videos.length === 0 ? (
            <EmptyState icon={SearchIcon} title="No clips found" description="Short videos that match will collect here." className="col-span-2" />
          ) : (
            result.videos.map((post) => <VideoCard key={post.id} post={post} />)
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
