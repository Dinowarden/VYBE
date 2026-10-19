import { useRouter } from "@tanstack/react-router";
import { Flag } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { submitReport } from "@/lib/server/report";
import { cn } from "@/lib/utils";

const reasons = [
  { id: "spam", label: "Spam" },
  { id: "harassment", label: "Harassment" },
  { id: "hate", label: "Hate" },
  { id: "sexual", label: "Sexual content" },
  { id: "violence", label: "Violence" },
  { id: "copyright", label: "Copyright" },
  { id: "other", label: "Something else" },
] as const;

type TargetType = "user" | "post" | "comment";

const noun: Record<TargetType, string> = {
  user: "profile",
  post: "post",
  comment: "comment",
};

export function ReportButton({
  targetType,
  targetId,
  ownerId,
  variant = "icon",
}: {
  targetType: TargetType;
  targetId: string;
  ownerId?: string;
  variant?: "icon" | "rail" | "text";
}) {
  const router = useRouter();
  const { user } = useCurrentUserState();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<(typeof reasons)[number]["id"] | null>(null);
  const [details, setDetails] = useState("");
  const [sending, setSending] = useState(false);

  if (user && ownerId && user.id === ownerId) return null;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!category || sending) return;
    if (!user) {
      await router.navigate({ to: "/login" });
      return;
    }
    setSending(true);
    try {
      const result = await submitReport({
        data: { targetType, targetId, category, details },
      });
      toast.success(result.already ? "You already reported this." : "Report sent. We'll review it.");
      setOpen(false);
      setCategory(null);
      setDetails("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not send that report.";
      if (message === "Unauthorized") {
        await router.navigate({ to: "/login" });
        return;
      }
      toast.error(message);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (!user) {
            void router.navigate({ to: "/login" });
            return;
          }
          setOpen(true);
        }}
        aria-label={`Report this ${noun[targetType]}`}
        className={cn(
          variant === "text" && "text-xs text-muted hover:text-fg",
          variant === "icon" && "grid size-9 place-items-center rounded-full text-muted hover:bg-elevated hover:text-fg",
          variant === "rail" && "grid size-11 place-items-center text-fg",
        )}
      >
        {variant === "text" ? "Report" : <Flag className={variant === "rail" ? "size-6" : "size-4"} strokeWidth={1.7} />}
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 grid place-items-end bg-bg/70 p-4 sm:place-items-center"
          onClick={() => setOpen(false)}
        >
          <form
            className="w-full max-w-sm rounded-3xl bg-surface p-5 shadow-[var(--shadow-lift)]"
            onClick={(event) => event.stopPropagation()}
            onSubmit={(event) => void onSubmit(event)}
          >
            <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Report</p>
            <h2 className="font-display mt-1 text-2xl font-semibold">Why this {noun[targetType]}?</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {reasons.map((reason) => (
                <button
                  key={reason.id}
                  type="button"
                  onClick={() => setCategory(reason.id)}
                  className={cn(
                    "rounded-2xl px-3 py-2 text-left text-sm",
                    category === reason.id ? "bg-brand text-brand-fg" : "bg-elevated text-fg",
                  )}
                >
                  {reason.label}
                </button>
              ))}
            </div>
            <textarea
              value={details}
              onChange={(event) => setDetails(event.target.value.slice(0, 280))}
              placeholder="Optional detail. Keep it short."
              className="mt-3 min-h-20 w-full rounded-2xl bg-elevated px-3 py-2 text-sm outline-none"
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={!category || sending}>
                {sending ? "Sending" : "Send"}
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
