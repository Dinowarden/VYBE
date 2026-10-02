import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { C as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as Navigate, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { i as signOut } from "./client-B40BzJxt.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as useCurrentUserState, n as Button, r as useCurrentUser, t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { a as hasGateSessionMarker, n as auth } from "./server-Cs3vF-XQ.mjs";
import { a as normalizeUsername, n as authMiddleware } from "./auth-CQivlI3v.mjs";
import { S as Bell, _ as Compass, c as TriangleAlert, d as Plus, h as House, o as UserRound, u as Search } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-eLR-UVIk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-[60dvh] flex-col items-center justify-center gap-3 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error instanceof Error && error.message ? error.message : "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
function LoadingSpinner({ className, label = "Loading" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center justify-center gap-3 text-muted", className),
		role: "status",
		"aria-live": "polite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-5 animate-spin rounded-full border-2 border-border border-t-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm",
			children: label
		})]
	});
}
function PagePending() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[50dvh] place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSpinner, { label: "Opening VYBE" })
	});
}
var items$1 = [
	{
		to: "/",
		label: "Home",
		icon: House,
		match: (p) => p === "/",
		featured: false
	},
	{
		to: "/discover",
		label: "Discover",
		icon: Compass,
		match: (p) => p.startsWith("/discover"),
		featured: false
	},
	{
		to: "/create",
		label: "Create",
		icon: Plus,
		match: (p) => p.startsWith("/create"),
		featured: true
	},
	{
		to: "/notifications",
		label: "Alerts",
		icon: Bell,
		match: (p) => p.startsWith("/notifications"),
		featured: false
	},
	{
		to: "/profile",
		label: "Profile",
		icon: UserRound,
		match: (p) => p.startsWith("/profile") || p.startsWith("/u/"),
		featured: false
	}
];
function BottomNav({ inverted }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Primary",
		className: cn("fixed inset-x-0 bottom-0 z-40 border-t border-border/80 md:hidden", inverted ? "bg-bg/40 backdrop-blur-md" : "bg-bg/95 backdrop-blur-md"),
		style: { paddingBottom: "env(safe-area-inset-bottom)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-5 px-2 pt-1",
			children: items$1.map((item) => {
				const active = item.match(pathname);
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						"aria-current": active ? "page" : void 0,
						"aria-label": item.label,
						className: cn("flex min-h-12 min-w-12 flex-col items-center justify-center gap-0.5 text-[11px]", active ? "text-fg" : "text-muted"),
						children: item.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-11 -translate-y-1 place-items-center rounded-full bg-brand text-brand-fg shadow-[var(--shadow-lift)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: 2.2
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-6",
							strokeWidth: active ? 2.2 : 1.7
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })] })
					})
				}, item.to);
			})
		})
	});
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function AuthSlot({ compact = false }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-24 animate-pulse rounded-full bg-elevated" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		size: compact ? "sm" : "md",
		variant: compact ? "ghost" : "outline",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			children: "Sign in"
		})
	});
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/profile",
		"aria-label": "Your profile",
		className: "grid size-11 place-items-center",
		children: user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: user.profileImageUrl,
			alt: "",
			className: "size-9 rounded-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-9 place-items-center rounded-full bg-elevated font-display text-sm",
			children: (user.displayName ?? "Y").charAt(0).toUpperCase()
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {});
}
function VybeMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "9",
				className: "fill-elevated"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6.5 22.5c5.5-13 13.5-13 19 0",
				fill: "none",
				className: "stroke-brand",
				strokeWidth: "2.4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "10.5",
				r: "2.3",
				className: "fill-fg"
			})
		]
	});
}
function VybeWordmark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: cn("flex items-center gap-2 text-fg", className),
		"aria-label": "VYBE home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VybeMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-xl font-semibold tracking-tight",
			children: "VYBE"
		})]
	});
}
var items = [
	{
		to: "/",
		label: "Circle",
		icon: House,
		match: (p) => p === "/"
	},
	{
		to: "/discover",
		label: "Pulse",
		icon: Compass,
		match: (p) => p.startsWith("/discover")
	},
	{
		to: "/search",
		label: "Search",
		icon: Search,
		match: (p) => p.startsWith("/search")
	},
	{
		to: "/notifications",
		label: "Signals",
		icon: Bell,
		match: (p) => p.startsWith("/notifications")
	},
	{
		to: "/profile",
		label: "You",
		icon: UserRound,
		match: (p) => p.startsWith("/profile") || p.startsWith("/u/")
	}
];
function SideNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "sticky top-0 hidden h-dvh w-[15.5rem] shrink-0 flex-col border-r border-border px-4 py-5 md:flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VybeWordmark, { className: "px-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Primary",
				className: "mt-8 flex flex-1 flex-col gap-1",
				children: [items.map((item) => {
					const active = item.match(pathname);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						"aria-current": active ? "page" : void 0,
						className: cn("flex min-h-11 items-center gap-3 rounded-full px-3 text-sm font-medium transition-colors", active ? "bg-elevated text-fg shadow-[var(--shadow-border)]" : "text-muted hover:bg-elevated/70 hover:text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							strokeWidth: active ? 2.1 : 1.7
						}), item.label]
					}, item.to);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-4 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/create",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Create"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
			})
		]
	});
}
function TopBar({ title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/70 bg-bg/90 px-4 backdrop-blur-md md:hidden",
		style: { paddingTop: "env(safe-area-inset-top)" },
		children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-lg font-semibold",
			children: title
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VybeWordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/search",
				"aria-label": "Search",
				className: "grid size-11 place-items-center rounded-full text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, { compact: true })]
		})]
	});
}
var usernameAvailable = createServerFn({ method: "POST" }).validator((username) => normalizeUsername(username)).handler(createSsrRpc("23264ed1be370fb29a4e584a160f8aa46342831960f33228a1947b8c2964e219"));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("43089abf67b0d2fc04dd8ee11c57f4f4a6f26a675e0ebab772a5634a77d97f36"));
var getProfileByUsername = createServerFn({ method: "GET" }).validator((username) => normalizeUsername(username)).handler(createSsrRpc("a096fdc2ea6e5d44b352f9ffcbec76e215294ed08495646515e3562eb1f91375"));
var onboardingSchema = object({
	username: string().min(3).max(24),
	displayName: string().trim().min(1).max(48),
	dateOfBirth: string()
});
var completeOnboarding = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => onboardingSchema.parse(input)).handler(createSsrRpc("f42ed024f5be771c30793f3dfbd561a86c7c6c44b56ec83c5c0f86a3a689c25d"));
var updateSchema = object({
	username: string().min(3).max(24),
	displayName: string().trim().min(1).max(48),
	bio: string().max(160),
	avatarUrl: string().nullable()
});
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => updateSchema.parse(input)).handler(createSsrRpc("580eb9cacacfd10e534ae986491eec3b15431475b909edd07b8eb72a9cf24ce9"));
var titles = {
	"/create": "Create",
	"/notifications": "Signals",
	"/profile": "You",
	"/profile/edit": "Edit profile",
	"/search": "Search",
	"/onboarding": "Finish joining"
};
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isPulse = pathname.startsWith("/discover");
	if (pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.startsWith("/onboarding") || pathname.startsWith("/pitch")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-bg",
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg md:flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [!isPulse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { title: titles[pathname] }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex-1", isPulse ? "h-dvh overflow-hidden md:h-auto md:min-h-dvh" : "pb-nav md:pb-0"),
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, { inverted: isPulse })
		]
	}) });
}
function ProfileGate({ children }) {
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			setProfile(null);
			return;
		}
		let cancelled = false;
		getMyProfile().then((row) => {
			if (!cancelled) setProfile(row);
		}).catch(() => {
			if (!cancelled) setProfile(null);
		});
		return () => {
			cancelled = true;
		};
	}, [user, isPending]);
	if (!isPending && user && profile === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var styles_default = "/assets/styles-NrpzkBgK.css";
var APP_NAME = "VYBE";
var fetchSessionUser = createServerFn({ method: "GET" }).handler(createSsrRpc("2c4985e96c199268f7f639534cb5e8e31d6b19d43286bf77416413db60ffde26"));
var Route$18 = createRootRoute({
	beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Your people. Your pulse. A social network for Circles and short-form discovery."
			},
			{
				name: "theme-color",
				content: "#0C0B10"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Syne:wght@500;600;700&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "top-center"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$16 = () => import("./routes-DvB5xMK8.mjs");
var Route$17 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./create-CUKZfJau.mjs");
var Route$16 = createFileRoute("/create")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./discover-GqqI3Jl4.mjs");
var Route$15 = createFileRoute("/discover")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./login-cquXNIsd.mjs");
var Route$14 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./notifications-BNNQ62Lq.mjs");
var Route$13 = createFileRoute("/notifications")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./onboarding-DE5FDJGE.mjs");
var Route$12 = createFileRoute("/onboarding")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./pitch-BFgRgzxU.mjs");
var Route$11 = createFileRoute("/pitch")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "VYBE — Pitch Deck" }] })
});
var $$splitComponentImporter$9 = () => import("./profile-C3nQVX98.mjs");
var Route$10 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./search-B3KGNgGb.mjs");
var Route$9 = createFileRoute("/search")({
	validateSearch: (search) => ({ q: typeof search.q === "string" ? search.q : "" }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./signup-3-XbqDb1.mjs");
var Route$8 = createFileRoute("/signup")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./post._postId-Demm0vXT.mjs");
var Route$7 = createFileRoute("/post/$postId")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./profile.index-DPILQ1xm.mjs");
var Route$6 = createFileRoute("/profile/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./profile.edit-CLsj4d1w.mjs");
var Route$5 = createFileRoute("/profile/edit")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./u._username-MAsTZ64p.mjs");
var Route$4 = createFileRoute("/u/$username")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var Route$3 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var $$splitComponentImporter$2 = () => import("./u._username.index-BrQcB0kj.mjs");
var Route$2 = createFileRoute("/u/$username/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./u._username.followers-sJaQiT-w.mjs");
var Route$1 = createFileRoute("/u/$username/followers")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./u._username.following-CNmc1LXh.mjs");
var Route = createFileRoute("/u/$username/following")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$17.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$18
});
var CreateRoute = Route$16.update({
	id: "/create",
	path: "/create",
	getParentRoute: () => Route$18
});
var DiscoverRoute = Route$15.update({
	id: "/discover",
	path: "/discover",
	getParentRoute: () => Route$18
});
var LoginRoute = Route$14.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$18
});
var NotificationsRoute = Route$13.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => Route$18
});
var OnboardingRoute = Route$12.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$18
});
var PitchRoute = Route$11.update({
	id: "/pitch",
	path: "/pitch",
	getParentRoute: () => Route$18
});
var ProfileRoute = Route$10.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$18
});
var SearchRoute = Route$9.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$18
});
var SignupRoute = Route$8.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$18
});
var PostPostIdRoute = Route$7.update({
	id: "/post/$postId",
	path: "/post/$postId",
	getParentRoute: () => Route$18
});
var ProfileIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => ProfileRoute
});
var ProfileEditRoute = Route$5.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => ProfileRoute
});
var UUsernameRoute = Route$4.update({
	id: "/u/$username",
	path: "/u/$username",
	getParentRoute: () => Route$18
});
var ApiAuthSplatRoute = Route$3.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$18
});
var UUsernameIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => UUsernameRoute
});
var UUsernameFollowersRoute = Route$1.update({
	id: "/followers",
	path: "/followers",
	getParentRoute: () => UUsernameRoute
});
var UUsernameFollowingRoute = Route.update({
	id: "/following",
	path: "/following",
	getParentRoute: () => UUsernameRoute
});
var ProfileRouteChildren = {
	ProfileEditRoute,
	ProfileIndexRoute
};
var ProfileRouteWithChildren = ProfileRoute._addFileChildren(ProfileRouteChildren);
var UUsernameRouteChildren = {
	UUsernameFollowersRoute,
	UUsernameFollowingRoute,
	UUsernameIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	CreateRoute,
	DiscoverRoute,
	LoginRoute,
	NotificationsRoute,
	OnboardingRoute,
	PitchRoute,
	ProfileRoute: ProfileRouteWithChildren,
	SearchRoute,
	SignupRoute,
	PostPostIdRoute,
	UUsernameRoute: UUsernameRoute._addFileChildren(UUsernameRouteChildren),
	ApiAuthSplatRoute
};
var routeTree = Route$18._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPendingComponent: PagePending,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { Route$7 as a, getMyProfile as c, usernameAvailable as d, VybeWordmark as f, PagePending as h, Route$2 as i, getProfileByUsername as l, UserButton as m, Route as n, Route$9 as o, RedirectToSignIn as p, Route$1 as r, completeOnboarding as s, router_exports as t, updateProfile as u };
