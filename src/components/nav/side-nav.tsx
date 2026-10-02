import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Compass, Home, Plus, Search, UserRound } from "lucide-react";
import { AuthSlot } from "@/components/auth/auth-slot";
import { VybeWordmark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Circle", icon: Home, match: (p: string) => p === "/" },
  { to: "/discover", label: "Pulse", icon: Compass, match: (p: string) => p.startsWith("/discover") },
  { to: "/search", label: "Search", icon: Search, match: (p: string) => p.startsWith("/search") },
  { to: "/notifications", label: "Signals", icon: Bell, match: (p: string) => p.startsWith("/notifications") },
  { to: "/profile", label: "You", icon: UserRound, match: (p: string) => p.startsWith("/profile") || p.startsWith("/u/") },
] as const;

export function SideNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="sticky top-0 hidden h-dvh w-[15.5rem] shrink-0 flex-col border-r border-border px-4 py-5 md:flex">
      <VybeWordmark className="px-2" />
      <nav aria-label="Primary" className="mt-8 flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-full px-3 text-sm font-medium transition-colors",
                active
                  ? "bg-elevated text-fg shadow-[var(--shadow-border)]"
                  : "text-muted hover:bg-elevated/70 hover:text-fg",
              )}
            >
              <Icon className="size-5" strokeWidth={active ? 2.1 : 1.7} />
              {item.label}
            </Link>
          );
        })}
        <Button asChild className="mt-4 w-full">
          <Link to="/create">
            <Plus className="size-4" />
            Create
          </Link>
        </Button>
      </nav>
      <div className="px-1">
        <AuthSlot />
      </div>
    </aside>
  );
}
