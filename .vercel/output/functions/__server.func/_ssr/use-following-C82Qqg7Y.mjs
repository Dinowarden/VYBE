import { o as __toESM } from "../_runtime.mjs";
import { p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { i as useCurrentUserState } from "./createSsrRpc-B2Izd0c7.mjs";
import { a as getFollowContext } from "./avatar-D9yfcyjT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-following-C82Qqg7Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useFollowing() {
	const { user, isPending } = useCurrentUserState();
	const [following, setFollowing] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [myUsername, setMyUsername] = (0, import_react.useState)(null);
	const [graphLoaded, setGraphLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
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
	}, [user, isPending]);
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
export { useFollowing as t };
