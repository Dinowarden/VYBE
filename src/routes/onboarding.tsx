import { createFileRoute, Navigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { VybeWordmark } from "@/components/brand/logo";
import { PagePending } from "@/components/states/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { completeOnboarding, getMyProfile } from "@/lib/server/profile";
import {
  ageError,
  normalizeUsername,
  suggestUsername,
  usernameError,
} from "@/lib/validation/auth";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

function Onboarding() {
  const { user, isPending } = useCurrentUserState();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [dob, setDob] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (isPending || !user) return;
    setDisplayName((current) => current || user.displayName || "");
    setUsername((current) => current || suggestUsername(user.displayName ?? "", user.primaryEmail ?? ""));
    let cancelled = false;
    void getMyProfile()
      .then((profile) => {
        if (cancelled) return;
        setHasProfile(Boolean(profile));
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  if (isPending || (user && !ready)) return <PagePending />;
  if (!user) return <RedirectToSignIn />;
  if (hasProfile) return <Navigate to="/" />;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const handle = normalizeUsername(username);
    const nextError =
      (!displayName.trim() ? "Enter a display name." : null) ??
      usernameError(handle) ??
      ageError(dob);
    if (nextError) {
      setFormError(nextError);
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      await completeOnboarding({
        data: { username: handle, displayName: displayName.trim(), dateOfBirth: dob },
      });
      toast.success("Profile ready");
      await router.navigate({ to: "/" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not save your profile.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center px-5 py-12">
      <VybeWordmark />
      <h1 className="font-display mt-8 text-3xl font-semibold">Claim your name</h1>
      <p className="mt-2 text-sm text-muted">
        One last step. This is how people find you on VYBE.
      </p>
      <form className="mt-8 space-y-4" onSubmit={(e) => void onSubmit(e)}>
        <div className="space-y-2">
          <Label htmlFor="displayName">Display name</Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            required
            minLength={3}
            maxLength={24}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of birth</Label>
          <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
        </div>
        {formError ? <p className="text-sm text-danger">{formError}</p> : null}
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Saving…" : "Finish"}
        </Button>
      </form>
    </main>
  );
}
