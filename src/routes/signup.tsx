import { createFileRoute, Link, Navigate, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { SocialButtons } from "@/components/auth/social-buttons";
import { VybeWordmark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { completeOnboarding, usernameAvailable } from "@/lib/server/profile";
import { authErrorMessage } from "@/lib/auth-errors";
import {
  ageError,
  emailError,
  normalizeUsername,
  passwordError,
  usernameError,
} from "@/lib/validation/auth";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const { user, isPending } = useCurrentUserState();
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [usernameHint, setUsernameHint] = useState<string | null>(null);

  if (!isPending && user) return <Navigate to="/onboarding" />;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const handle = normalizeUsername(username);
    const nextError =
      (!name.trim() ? "Enter your name." : null) ??
      usernameError(handle) ??
      emailError(email) ??
      passwordError(password) ??
      ageError(dob);
    if (nextError) {
      setFormError(nextError);
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      const availability = await usernameAvailable({ data: handle });
      if (!availability.available) {
        setFormError(
          availability.reason === "taken" ? "That username is taken." : usernameError(handle),
        );
        return;
      }
      const { error } = await authClient.signUp.email({
        email: email.trim(),
        password,
        name: name.trim(),
      });
      if (error) {
        setFormError(authErrorMessage(error.message, "Could not create that account."));
        return;
      }
      await authClient.getSession();
      try {
        await completeOnboarding({
          data: {
            username: handle,
            displayName: name.trim(),
            dateOfBirth: dob,
          },
        });
      } catch (err) {
        setFormError(err instanceof Error ? err.message : "Account created. Finish your profile.");
        await router.navigate({ to: "/onboarding" });
        return;
      }
      toast.success("You are in");
      await router.invalidate();
      await router.navigate({ to: "/" });
    } catch (err) {
      setFormError(authErrorMessage(err instanceof Error ? err.message : undefined, "Sign-up failed."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center px-5 py-12">
      <VybeWordmark />
      <h1 className="font-display mt-8 text-3xl font-semibold">Join the Circle</h1>
      <p className="mt-2 text-sm text-muted">One identity for friends and discovery.</p>
      <form className="mt-8 space-y-4" onSubmit={(e) => void onSubmit(e)}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value.toLowerCase());
              setUsernameHint(null);
            }}
            onBlur={() => {
              const handle = normalizeUsername(username);
              const invalid = usernameError(handle);
              if (invalid) {
                setUsernameHint(invalid);
                return;
              }
              void usernameAvailable({ data: handle }).then((result) => {
                setUsernameHint(result.available ? "Available" : "That username is taken.");
              });
            }}
            autoComplete="username"
            required
            minLength={3}
            maxLength={24}
          />
          {usernameHint ? (
            <p className={usernameHint === "Available" ? "text-xs text-success" : "text-xs text-danger"}>
              {usernameHint}
            </p>
          ) : (
            <p className="text-xs text-subtle">3–24 characters. Letters, numbers, periods, underscores.</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            minLength={8}
          />
          <p className="text-xs text-subtle">At least 8 characters. Stored hashed, never shown again.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of birth</Label>
          <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
          <p className="text-xs text-subtle">You must be 13 or older. This is never shown on your profile.</p>
        </div>
        {formError ? <p className="text-sm text-danger">{formError}</p> : null}
        <Button type="submit" className="w-full" disabled={submitting || isPending}>
          {submitting ? "Creating account…" : "Create account"}
        </Button>
      </form>
      <div className="my-6 flex items-center gap-3 text-xs text-subtle">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
      {isPending ? (
        <div className="h-24 animate-pulse rounded-2xl bg-elevated" />
      ) : (
        <SocialButtons />
      )}
      <p className="mt-6 text-center text-sm text-muted">
        Already on VYBE?{" "}
        <Link to="/login" className="text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </main>
  );
}
