import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center px-6 py-16 text-center", className)}>
      <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-elevated text-brand shadow-[var(--shadow-border)]">
        <Icon className="size-6" strokeWidth={1.75} />
      </div>
      <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
