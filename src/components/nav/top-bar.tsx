import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AuthSlot } from "@/components/auth/auth-slot";
import { VybeWordmark } from "@/components/brand/logo";

export function TopBar({ title }: { title?: string }) {
  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/70 bg-bg/90 px-4 backdrop-blur-md md:hidden"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {title ? (
        <h1 className="font-display text-lg font-semibold">{title}</h1>
      ) : (
        <VybeWordmark />
      )}
      <div className="flex items-center">
        <Link to="/search" aria-label="Search" className="grid size-11 place-items-center rounded-full text-fg">
          <Search className="size-5" />
        </Link>
        <AuthSlot compact />
      </div>
    </header>
  );
}
