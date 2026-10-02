import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Compass, Home, Plus, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Home", icon: Home, match: (p: string) => p === "/", featured: false },
  { to: "/discover", label: "Discover", icon: Compass, match: (p: string) => p.startsWith("/discover"), featured: false },
  { to: "/create", label: "Create", icon: Plus, match: (p: string) => p.startsWith("/create"), featured: true },
  { to: "/notifications", label: "Alerts", icon: Bell, match: (p: string) => p.startsWith("/notifications"), featured: false },
  { to: "/profile", label: "Profile", icon: UserRound, match: (p: string) => p.startsWith("/profile") || p.startsWith("/u/"), featured: false },
] as const;

export function BottomNav({ inverted }: { inverted?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      aria-label="Primary"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border/80 md:hidden",
        inverted ? "bg-bg/40 backdrop-blur-md" : "bg-bg/95 backdrop-blur-md",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5 px-2 pt-1">
        {items.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <li key={item.to} className="flex justify-center">
              <Link
                to={item.to}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
                className={cn(
                  "flex min-h-12 min-w-12 flex-col items-center justify-center gap-0.5 text-[11px]",
                  active ? "text-fg" : "text-muted",
                )}
              >
                {item.featured ? (
                  <span className="grid size-11 -translate-y-1 place-items-center rounded-full bg-brand text-brand-fg shadow-[var(--shadow-lift)]">
                    <Icon className="size-5" strokeWidth={2.2} />
                  </span>
                ) : (
                  <>
                    <Icon className="size-6" strokeWidth={active ? 2.2 : 1.7} />
                    <span>{item.label}</span>
                  </>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
