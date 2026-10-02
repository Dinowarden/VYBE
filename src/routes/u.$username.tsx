import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/$username")({ component: PublicProfileLayout });

function PublicProfileLayout() {
  return <Outlet />;
}
