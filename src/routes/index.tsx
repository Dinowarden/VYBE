import { createFileRoute, Link } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PostCard } from "@/components/feed/post-card";
import { PersonRow } from "@/components/profile/person-row";
import { EmptyState } from "@/components/states/empty-state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FollowButton } from "@/components/social/follow-button";
import { circleFeed, demoPosts, pulseFeed } from "@/lib/demo-data";
import { compactNumber } from "@/lib/format";
import { listSuggestedPeople, type Person } from "@/lib/server/follow";
import { useFollowing } from "@/lib/use-following";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { user, following, follows, setFollows, myUsername, isPending } = useFollowing();
  const [mounted, setMounted] = useState(false);
  const [suggested, setSuggested] = useState<Person[]>([]);
  const rising = pulseFeed.slice(0, 3);
  const waiting = !mounted || isPending;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isPending) return;
    let cancelled = false;
    void listSuggestedPeople()
      .then((people) => {
        if (!cancelled) setSuggested(people);
      })
      .catch(() => {
        if (!cancelled) setSuggested([]);
      });
    return () => {
      cancelled = true;
    };
  }, [user, following, isPending]);

  const posts = useMemo(() => {
    if (!user) return circleFeed;
    return demoPosts
      .filter((post) => following.has(post.author.username))
      .map((post) => ({ ...post, followingAuthor: true }));
  }, [user, following]);

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-6 lg:grid-cols-[minmax(0,36rem)_16rem] lg:justify-center">
      <section className="min-w-0">
        <div className="mb-5 hidden md:block">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Circle</p>
          <h1 className="font-display mt-1 text-3xl font-semibold">From people you chose</h1>
        </div>
        {waiting ? (
          <div className="space-y-4">
            <div className="h-52 animate-pulse rounded-[1.75rem] bg-elevated" />
            <div className="h-52 animate-pulse rounded-[1.75rem] bg-elevated" />
          </div>
        ) : user && posts.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Your Circle is quiet"
            description="Follow a few people. Their posts land here, in the order they published."
          />
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
        {!waiting && user && suggested.length ? (
          <div className="mt-8 lg:hidden">
            <h2 className="font-display text-base font-semibold">People to meet</h2>
            <div className="mt-3 space-y-3">
              {suggested.map((person) => (
                <PersonRow
                  key={person.userId}
                  person={person}
                  viewerUsername={myUsername}
                  onFollow={(username, following) => setFollows(username, following)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </section>
      <aside className="hidden lg:flex lg:flex-col lg:gap-6">
        <div className="rounded-3xl bg-surface p-4 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-base font-semibold">Rising on Pulse</h2>
          <ul className="mt-3 space-y-3">
            {rising.map((post) => (
              <li key={post.id}>
                <Link to="/discover" className="flex gap-3">
                  <img src={post.media[0]?.posterUrl} alt="" className="size-14 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{post.caption}</p>
                    <p className="text-xs text-muted">
                      @{post.author.username} · {compactNumber(post.viewCount)} views
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {suggested.length ? (
          <div className="rounded-3xl bg-surface p-4 shadow-[var(--shadow-border)]">
            <h2 className="font-display text-base font-semibold">People to meet</h2>
            <ul className="mt-3 space-y-3">
              {suggested.map((person) => (
                <li key={person.userId} className="flex items-center gap-2">
                  <Link to="/u/$username" params={{ username: person.username }} className="flex min-w-0 flex-1 items-center gap-2">
                    <Avatar className="size-9">
                      <AvatarImage src={person.avatarUrl ?? undefined} alt="" />
                      <AvatarFallback>{person.displayName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{person.displayName}</p>
                      <p className="truncate text-xs text-muted">@{person.username}</p>
                    </div>
                  </Link>
                  {myUsername === person.username ? null : (
                    <FollowButton
                      username={person.username}
                      following={follows(person.username)}
                      onChange={(next) => setFollows(person.username, next.following)}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </aside>
    </main>
  );
}
