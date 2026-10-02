import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, type = "text", ...props }, ref) {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-xl bg-elevated px-3.5 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-ring/70 disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
});
