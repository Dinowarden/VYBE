import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Users } from "../_libs/lucide-react.mjs";
import { _ as PagePending, r as Route$1 } from "./router-BKbEaJrO.mjs";
import { a as listFollowers, c as useFollowing } from "./use-following-D41X06CL.mjs";
import { t as EmptyState } from "./empty-state-aFDV-KUF.mjs";
import { t as PersonRow } from "./person-row-DP71nFs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/u._username.followers-CRCyh73u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FollowersPage() {
	const { username } = Route$1.useParams();
	const { myUsername, setFollows } = useFollowing();
	const [people, setPeople] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		listFollowers({ data: username }).then((result) => {
			if (!cancelled) setPeople(result.people);
		}).catch(() => {
			if (!cancelled) setPeople([]);
		});
		return () => {
			cancelled = true;
		};
	}, [username]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-xl px-4 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/u/$username",
				params: { username },
				className: "text-sm text-muted hover:text-fg hover:underline",
				children: ["← @", username]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-2xl font-semibold",
				children: "Followers"
			})]
		}), people === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePending, {}) : people.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Users,
			title: "No followers yet",
			description: "When people follow, they show up here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: people.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonRow, {
				person,
				viewerUsername: myUsername,
				onFollow: (handle, following) => setFollows(handle, following)
			}, person.userId))
		})]
	});
}
//#endregion
export { FollowersPage as component };
