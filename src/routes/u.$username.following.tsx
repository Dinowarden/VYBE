import { createFileRoute, Link } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { PersonRow } from "@/components/profile/person-row";
import { EmptyState } from "@/components/states/empty-state";
import { PagePending } from "@/components/states/loading-spinner";
import { listFollowing, type Person } from "@/lib/server/follow";
import { useFollowing } from "@/lib/use-following";

export const Route = createFileRoute("/u/$username/following")({ component: FollowingPage });

function FollowingPage() {
  const { username } = Route.useParams();
  const { myUsername, setFollows } = useFollowing();
  const [people, setPeople] = useState<Person[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    void listFollowing({ data: username })
      .then((result) => {
        if (!cancelled) setPeople(result.people);
      })
      .catch(() => {
        if (!cancelled) setPeople([]);
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-6">
      <div className="mb-5">
        <Link to="/u/$username" params={{ username }} className="text-sm text-muted hover:text-fg hover:underline">
          ← @{username}
        </Link>
        <h1 className="font-display mt-2 text-2xl font-semibold">Following</h1>
      </div>
      {people === null ? (
        <PagePending />
      ) : people.length === 0 ? (
        <EmptyState icon={Users} title="Not following anyone" description="People they follow will collect here." />
      ) : (
        <div className="space-y-3">
          {people.map((person) => (
            <PersonRow
              key={person.userId}
              person={person}
              viewerUsername={myUsername}
              onFollow={(handle, following) => setFollows(handle, following)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
