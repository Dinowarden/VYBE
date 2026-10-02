import { type ReactNode } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { PagePending } from "@/components/states/loading-spinner";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <PagePending />;
  if (!user) return <RedirectToSignIn />;
  return <>{children}</>;
}
