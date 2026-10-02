import { createFileRoute, Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { ProfileHero } from "@/components/profile/profile-hero";
import { EmptyState } from "@/components/states/empty-state";
import { PagePending } from "@/components/states/loading-spinner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyProfile } from "@/lib/server/profile";
import type { ProfileRow } from "@/lib/types";

export const Route = createFileRoute("/profile/")({ component: Profile });

function Profile() {
  const { user, isPending } = useCurrentUserState();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setLoaded(true);
      setProfile(null);
      return;
    }
    let cancelled = false;
    void getMyProfile()
      .then((row) => {
        if (!cancelled) {
          setProfile(row);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  if (isPending || !loaded) return <PagePending />;

  if (!user || !profile) {
    return (
      <main className="mx-auto w-full max-w-xl px-4 py-6">
        <div className="overflow-hidden rounded-[1.75rem] bg-surface shadow-[var(--shadow-border)]">
          <div className="h-28 bg-elevated" />
          <div className="px-5 pb-6">
            <div className="-mt-10 mb-4 grid size-20 place-items-center rounded-full bg-bg shadow-[var(--shadow-border)]">
              <UserRound className="size-8 text-muted" />
            </div>
            <h1 className="font-display text-2xl font-semibold">Your VYBE</h1>
            <p className="mt-1 text-sm text-muted">Claim a username, keep a Circle, and publish to Pulse.</p>
            <div className="mt-5 flex gap-2">
              <Button asChild className="flex-1"><Link to="/signup">Join VYBE</Link></Button>
              <Button asChild variant="outline" className="flex-1"><Link to="/login">Sign in</Link></Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-6">
      <ProfileHero profile={profile} isOwner />
      <div className="mt-3 flex items-center justify-between px-1">
        <Link
          to="/u/$username"
          params={{ username: profile.username }}
          className="text-sm text-muted hover:text-fg hover:underline"
        >
          View public profile
        </Link>
        <div className="md:hidden">
          <UserButton />
        </div>
      </div>
      <Tabs defaultValue="posts" className="mt-6">
        <TabsList className="w-full">
          <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
          <TabsTrigger value="videos" className="flex-1">Videos</TabsTrigger>
          <TabsTrigger value="saved" className="flex-1">Saved</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <EmptyState
            icon={UserRound}
            title="Nothing here yet"
            description="Your text and image posts will live on this tab."
            action={<Button asChild variant="secondary"><Link to="/create">Create a post</Link></Button>}
          />
        </TabsContent>
        <TabsContent value="videos">
          <EmptyState icon={UserRound} title="No clips yet" description="Short videos you publish will collect here." />
        </TabsContent>
        <TabsContent value="saved">
          <EmptyState icon={UserRound} title="Saved is empty" description="Bookmarks from Circle and Pulse will wait for you here." />
        </TabsContent>
      </Tabs>
    </main>
  );
}
