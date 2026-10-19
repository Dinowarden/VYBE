import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, n as AvatarFallback$1, p as require_react, r as AvatarImage$1, t as Avatar$1 } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { F as object, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as useCurrentUserState, n as Button, t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { n as optionalAuthMiddleware, t as authMiddleware } from "./middleware-Cw7doLtA.mjs";
import { i as normalizeUsername } from "./auth-D2ebFRuG.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-following-D41X06CL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getFollowContext = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b0501509ba9bc0f35fc929b5fdf3bb8c7aff121fcc955d7a9608518f6edc1703"));
var toggleFollow = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ username: string().min(1) }).parse(input)).handler(createSsrRpc("a376c2c97279466804744bee94349b744d5ca3a1a91bcf92356a15c6121d0c77"));
var listFollowers = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((username) => normalizeUsername(username)).handler(createSsrRpc("19efe4e97c272ab8b39c325d863b957f70389e7ff5a549c8c765d7aa9f8a5fb5"));
var listFollowing = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((username) => normalizeUsername(username)).handler(createSsrRpc("c20cb79b4ab4559c55890b7229e7b5d10cec29dac03963f514eed88c95c097d1"));
var listSuggestedPeople = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).handler(createSsrRpc("9fcb103995b99719d2259cdb10679c76cbacc62fb85daf9229d8d3565a760156"));
function FollowButton({ username, following: followingProp, className, onChange }) {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const [following, setFollowing] = (0, import_react.useState)(followingProp);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setFollowing(followingProp);
	}, [followingProp]);
	async function toggle() {
		if (isPending) return;
		if (!user) {
			navigate({ to: "/login" });
			return;
		}
		const previous = following;
		setFollowing(!previous);
		setBusy(true);
		try {
			const result = await toggleFollow({ data: { username } });
			setFollowing(result.following);
			onChange?.(result);
		} catch (err) {
			setFollowing(previous);
			const message = err instanceof Error ? err.message : "Could not update follow.";
			if (message === "Unauthorized") {
				navigate({ to: "/login" });
				return;
			}
			toast.error(message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		size: "sm",
		variant: following ? "outline" : "default",
		onClick: () => void toggle(),
		disabled: busy,
		"aria-pressed": following,
		className: cn("min-w-[6.5rem]", className),
		children: following ? "Following" : "Follow"
	});
}
function Avatar({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
		className: cn("relative flex size-10 shrink-0 overflow-hidden rounded-full bg-elevated shadow-[var(--shadow-border)]", className),
		...props
	});
}
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
		className: cn("aspect-square size-full object-cover", className),
		...props
	});
}
function AvatarFallback({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
		delayMs: 0,
		className: cn("flex size-full items-center justify-center bg-elevated font-display text-sm font-medium text-muted", className),
		...props
	});
}
function useFollowing() {
	const { user, isPending } = useCurrentUserState();
	const [following, setFollowing] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [myUsername, setMyUsername] = (0, import_react.useState)(null);
	const [graphLoaded, setGraphLoaded] = (0, import_react.useState)(false);
	const userId = user?.id ?? null;
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!userId) {
			setFollowing(/* @__PURE__ */ new Set());
			setMyUsername(null);
			setGraphLoaded(true);
			return;
		}
		setGraphLoaded(false);
		let cancelled = false;
		getFollowContext().then((ctx) => {
			if (cancelled) return;
			setFollowing(new Set(ctx.following));
			setMyUsername(ctx.myUsername);
			setGraphLoaded(true);
		}).catch(() => {
			if (!cancelled) setGraphLoaded(true);
		});
		return () => {
			cancelled = true;
		};
	}, [userId, isPending]);
	const setFollows = (0, import_react.useCallback)((username, next) => {
		setFollowing((prev) => {
			const copy = new Set(prev);
			if (next) copy.add(username);
			else copy.delete(username);
			return copy;
		});
	}, []);
	return {
		user,
		isPending: isPending || Boolean(user && !graphLoaded),
		myUsername,
		following,
		follows: (username) => following.has(username),
		setFollows
	};
}
//#endregion
export { listFollowers as a, useFollowing as c, FollowButton as i, AvatarFallback as n, listFollowing as o, AvatarImage as r, listSuggestedPeople as s, Avatar as t };
