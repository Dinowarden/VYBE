import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { PagePending } from "@/components/states/loading-spinner";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultPendingComponent: PagePending,
    defaultPreload: "intent",
    scrollRestoration: true,
  });
}
