import { Navigate, useRouterState } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import { BottomNav } from "@/components/nav/bottom-nav";
import { SideNav } from "@/components/nav/side-nav";
import { TopBar } from "@/components/nav/top-bar";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyProfile } from "@/lib/server/profile";
import type { ProfileRow } from "@/lib/types";
import { cn } from "@/lib/utils";

const titles: Record<string, string | undefined> = {
  "/create": "Create",
  "/notifications": "Signals",
  "/profile": "You",
  "/profile/edit": "Edit profile",
  "/search": "Search",
  "/onboarding": "Finish joining",
};

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isPulse = pathname.startsWith("/discover");
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/pitch");

  if (isAuthPage) {
    return <div className="min-h-dvh bg-bg">{children}</div>;
  }

  return (
    <ProfileGate>
      <div className="min-h-dvh bg-bg md:flex">
        <SideNav />
        <div className="flex min-w-0 flex-1 flex-col">
          {!isPulse ? <TopBar title={titles[pathname]} /> : null}
          <div className={cn("flex-1", isPulse ? "h-dvh overflow-hidden md:h-auto md:min-h-dvh" : "pb-nav md:pb-0")}>
            {children}
          </div>
        </div>
        <BottomNav inverted={isPulse} />
      </div>
    </ProfileGate>
  );
}

function ProfileGate({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  const [profile, setProfile] = useState<ProfileRow | null | undefined>(undefined);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setProfile(null);
      return;
    }
    let cancelled = false;
    void getMyProfile()
      .then((row) => {
        if (!cancelled) setProfile(row);
      })
      .catch(() => {
        if (!cancelled) setProfile(null);
      });
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  if (!isPending && user && profile === null) {
    return <Navigate to="/onboarding" />;
  }
  return <>{children}</>;
}
