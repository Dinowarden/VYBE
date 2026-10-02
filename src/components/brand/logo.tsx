import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function VybeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true">
      <rect width="32" height="32" rx="9" className="fill-elevated" />
      <path
        d="M6.5 22.5c5.5-13 13.5-13 19 0"
        fill="none"
        className="stroke-brand"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="16" cy="10.5" r="2.3" className="fill-fg" />
    </svg>
  );
}

export function VybeWordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 text-fg", className)} aria-label="VYBE home">
      <VybeMark />
      <span className="font-display text-xl font-semibold tracking-tight">VYBE</span>
    </Link>
  );
}
