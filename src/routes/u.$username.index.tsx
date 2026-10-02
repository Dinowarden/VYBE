import { createFileRoute, Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { PostCard } from "@/components/feed/post-card";
import { VideoCard } from "@/components/feed/video-card";
import { ProfileHero } from "@/components/profile/profile-hero";
import { EmptyState } from "@/components/states/empty-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { findUser, postsByUser } from "@/lib/demo-data";
import { getProfileByUsername } from "@/lib/server/profile";
import { useFollowing } from "@/lib/use-following";
import type { ProfileRow } from "@/lib/types";

export const Route = createFileRoute("/u/$username/")({ component: PublicProfile });

function PublicProfile() {
  const { username } = Route.useParams();
  const demo = findUser(username);
  const { myUsername, follows, setFollows } = useFollowing();
  const [live, setLive] = useState<ProfileRow | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    void getProfileByUsername({ data: username })
      .then((row) => {
        if (!cancelled) setLive(row);
      })
      .catch(() => {
        if (!cancelled) setLive(null);
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  const posts = demo ? postsByUser(demo.id) : [];
  const videos = posts.filter((post) => post.kind === "video");
  const rest = posts.filter((post) => post.kind !== "video");

  if (live === undefined) {
    return <p className="px-4 py-16 text-center text-sm text-muted">Looking up @{username}…</p>;
  }

  if (!demo && !live) {
    return (
      <EmptyState
        icon={UserRound}
        title="No one by that name"
        description="That username is not on VYBE yet."
        action={<Link to="/" className="text-sm text-brand hover:underline">Back to Circle</Link>}
      />
    );
  }

  const profile: ProfileRow = live ?? {
    userId: demo?.id ?? "",
    username: demo?.username ?? username,
    displayName: demo?.displayName ?? username,
    bio: demo?.bio ?? "",
    avatarUrl: demo?.avatarUrl ?? null,
    dateOfBirth: null,
    role: "user",
    followerCount: demo?.followerCount ?? 0,
    followingCount: demo?.followingCount ?? 0,
    likeCount: demo?.likeCount ?? 0,
  };

  const isOwner = Boolean(myUsername && myUsername === profile.username);
  const defaultTab = rest.length ? "posts" : videos.length ? "videos" : "posts";

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-6">
      <ProfileHero
        profile={profile}
        isOwner={isOwner}
        following={follows(profile.username)}
        onFollowChange={(next) => {
          setFollows(profile.username, next.following);
          setLive((current) =>
            current ? { ...current, followerCount: next.followerCount } : { ...profile, followerCount: next.followerCount },
          );
        }}
      />
      <Tabs defaultValue={defaultTab} className="mt-6">
        <TabsList className="w-full">
          <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
          <TabsTrigger value="videos" className="flex-1">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-4 flex flex-col gap-4">
          {rest.length ? rest.map((post) => (
            <PostCard key={post.id} post={{ ...post, followingAuthor: follows(post.author.username) }} />
          )) : (
            <p className="py-10 text-center text-sm text-muted">No posts yet.</p>
          )}
        </TabsContent>
        <TabsContent value="videos" className="mt-4 grid grid-cols-2 gap-2">
          {videos.length ? videos.map((post) => <VideoCard key={post.id} post={post} />) : (
            <p className="col-span-2 py-10 text-center text-sm text-muted">No clips yet.</p>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
