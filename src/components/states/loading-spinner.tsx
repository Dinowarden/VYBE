import { cn } from "@/lib/utils";

export function LoadingSpinner({
  className,
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3 text-muted", className)}
      role="status"
      aria-live="polite"
    >
      <span className="size-5 animate-spin rounded-full border-2 border-border border-t-brand" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function PagePending() {
  return (
    <div className="grid min-h-[50dvh] place-items-center">
      <LoadingSpinner label="Opening VYBE" />
    </div>
  );
}
