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
import { emailError, passwordError } from "@/lib/validation/auth";
import { authErrorMessage } from "@/lib/auth-errors";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isPending && user) return <Navigate to="/onboarding" />;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const nextError = emailError(email) ?? passwordError(password);
    if (nextError) {
      setFormError(nextError);
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });
      if (error) {
        setFormError(authErrorMessage(error.message, "Those credentials do not match."));
        return;
      }
      await authClient.getSession();
      toast.success("Welcome back");
      await router.invalidate();
      await router.navigate({ to: "/" });
    } catch (err) {
      setFormError(authErrorMessage(err instanceof Error ? err.message : undefined, "Sign-in failed."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center px-5 py-12">
      <VybeWordmark />
      <h1 className="font-display mt-8 text-3xl font-semibold">Welcome back</h1>
      <p className="mt-2 text-sm text-muted">Your Circle is waiting. Pulse never stopped.</p>
      <form className="mt-8 space-y-4" onSubmit={(e) => void onSubmit(e)}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        {formError ? <p className="text-sm text-danger">{formError}</p> : null}
        <Button type="submit" className="w-full" disabled={submitting || isPending}>
          {submitting ? "Signing in…" : "Sign in"}
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
        New here?{" "}
        <Link to="/signup" className="text-brand hover:underline">
          Join VYBE
        </Link>
      </p>
    </main>
  );
}
