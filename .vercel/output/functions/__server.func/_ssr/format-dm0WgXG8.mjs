import { t as formatDistanceToNowStrict } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-dm0WgXG8.js
function compactNumber(value) {
	if (value < 1e3) return String(value);
	if (value < 1e4) return `${(value / 1e3).toFixed(1).replace(/\.0$/, "")}K`;
	if (value < 1e6) return `${Math.round(value / 1e3)}K`;
	return `${(value / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
}
function relativeTime(iso) {
	try {
		return formatDistanceToNowStrict(new Date(iso), { addSuffix: true });
	} catch {
		return "";
	}
}
//#endregion
export { relativeTime as n, compactNumber as t };
