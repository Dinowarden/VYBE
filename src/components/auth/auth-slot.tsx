import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";

export function AuthSlot({ compact = false }: { compact?: boolean }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-11 w-24 animate-pulse rounded-full bg-elevated" />;
  }
  if (!user) {
    return (
      <Button asChild size={compact ? "sm" : "md"} variant={compact ? "ghost" : "outline"}>
        <Link to="/login">Sign in</Link>
      </Button>
    );
  }
  if (compact) {
    return (
      <Link to="/profile" aria-label="Your profile" className="grid size-11 place-items-center">
        {user.profileImageUrl ? (
          <img src={user.profileImageUrl} alt="" className="size-9 rounded-full object-cover" />
        ) : (
          <span className="grid size-9 place-items-center rounded-full bg-elevated font-display text-sm">
            {(user.displayName ?? "Y").charAt(0).toUpperCase()}
          </span>
        )}
      </Link>
    );
  }
  return <UserButton />;
}
