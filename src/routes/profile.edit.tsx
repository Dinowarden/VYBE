import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Camera, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/auth/auth-guard";
import { PagePending } from "@/components/states/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { resizeAvatar } from "@/lib/avatar";
import { getMyProfile, updateProfile, usernameAvailable } from "@/lib/server/profile";
import {
  normalizeUsername,
  usernameError,
} from "@/lib/validation/auth";

export const Route = createFileRoute("/profile/edit")({ component: EditProfilePage });

function EditProfilePage() {
  return (
    <RequireAuth>
      <EditProfile />
    </RequireAuth>
  );
}

function EditProfile() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [originalUsername, setOriginalUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [usernameHint, setUsernameHint] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void getMyProfile()
      .then((profile) => {
        if (cancelled) return;
        if (!profile) {
          void router.navigate({ to: "/onboarding" });
          return;
        }
        setOriginalUsername(profile.username);
        setDisplayName(profile.displayName);
        setUsername(profile.username);
        setBio(profile.bio);
        setAvatarUrl(profile.avatarUrl);
        setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) void router.navigate({ to: "/onboarding" });
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!loaded) return <PagePending />;

  async function onPick(file: File | undefined) {
    if (!file) return;
    try {
      const next = await resizeAvatar(file);
      setAvatarUrl(next);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not use that photo.");
    }
  }

  async function onUsernameBlur() {
    const handle = normalizeUsername(username);
    if (handle === originalUsername) {
      setUsernameHint(null);
      return;
    }
    const invalid = usernameError(handle);
    if (invalid) {
      setUsernameHint(invalid);
      return;
    }
    const result = await usernameAvailable({ data: handle });
    setUsernameHint(result.available ? "Available" : "That username is taken.");
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const handle = normalizeUsername(username);
    const nextError =
      (!displayName.trim() ? "Enter a display name." : null) ??
      usernameError(handle) ??
      (bio.length > 160 ? "Bio must be 160 characters or less." : null);
    if (nextError) {
      setFormError(nextError);
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      await updateProfile({
        data: {
          username: handle,
          displayName: displayName.trim(),
          bio,
          avatarUrl,
        },
      });
      toast.success("Profile saved");
      await router.invalidate();
      await router.navigate({ to: "/profile" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-6">
      <div className="mb-5 hidden md:block">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">You</p>
        <h1 className="font-display mt-1 text-3xl font-semibold">Edit profile</h1>
      </div>
      <form className="space-y-5" onSubmit={(e) => void onSubmit(e)}>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="relative grid size-24 place-items-center overflow-hidden rounded-full bg-elevated shadow-[var(--shadow-border)]"
            aria-label="Change photo"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="size-full object-cover" />
            ) : (
              <span className="font-display text-3xl">{displayName.charAt(0).toUpperCase() || "Y"}</span>
            )}
            <span className="absolute inset-x-0 bottom-0 flex justify-center bg-bg/70 py-1">
              <Camera className="size-4" />
            </span>
          </button>
          <div className="min-w-0">
            <p className="text-sm font-medium">Profile photo</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Square crop, kept on your profile. JPG or PNG.
            </p>
            <div className="mt-2 flex gap-2">
              <Button type="button" size="sm" variant="secondary" onClick={() => fileRef.current?.click()}>
                Upload
              </Button>
              {avatarUrl ? (
                <Button type="button" size="sm" variant="ghost" onClick={() => setAvatarUrl(null)}>
                  <X className="size-4" />
                  Remove
                </Button>
              ) : null}
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => void onPick(e.target.files?.[0])}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="displayName">Display name</Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={48}
            required
          />
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
            onBlur={() => void onUsernameBlur()}
            minLength={3}
            maxLength={24}
            required
          />
          {usernameHint ? (
            <p className={usernameHint === "Available" ? "text-xs text-success" : "text-xs text-danger"}>
              {usernameHint}
            </p>
          ) : (
            <p className="text-xs text-subtle">This is how people find you: @{normalizeUsername(username) || "you"}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={160}
            placeholder="What you make. Where you are. One line is enough."
            className="min-h-28"
          />
          <p className="text-right text-xs tabular-nums text-subtle">{bio.length}/160</p>
        </div>
        {formError ? <p className="text-sm text-danger">{formError}</p> : null}
        <div className="flex gap-2">
          <Button type="submit" className="flex-1" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
          <Button asChild type="button" variant="outline">
            <Link to="/profile">Cancel</Link>
          </Button>
        </div>
      </form>
    </main>
  );
}
