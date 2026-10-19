//#region node_modules/.nitro/vite/services/ssr/assets/auth-D2ebFRuG.js
var USERNAME_RE = /^[a-z0-9._]{3,24}$/;
function normalizeUsername(value) {
	return value.trim().toLowerCase();
}
function usernameError(value) {
	const username = normalizeUsername(value);
	if (!USERNAME_RE.test(username)) return "Use 3–24 characters: lowercase letters, numbers, periods, or underscores.";
	return null;
}
function passwordError(value) {
	if (value.length < 8) return "Password needs at least 8 characters.";
	return null;
}
function emailError(value) {
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email.";
	return null;
}
function ageError(isoDate) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return "Enter your date of birth.";
	const dob = /* @__PURE__ */ new Date(`${isoDate}T00:00:00Z`);
	if (Number.isNaN(dob.getTime())) return "Enter a valid date.";
	const cutoff = /* @__PURE__ */ new Date();
	cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 13);
	if (dob > cutoff) return `You must be at least 13 to join VYBE.`;
	const oldest = /* @__PURE__ */ new Date();
	oldest.setUTCFullYear(oldest.getUTCFullYear() - 120);
	if (dob < oldest) return "Enter a valid date of birth.";
	return null;
}
function suggestUsername(name, email) {
	const raw = (name || email.split("@")[0] || "member").toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.+|\.+$/g, "").slice(0, 20);
	return raw.length >= 3 ? raw : `vybe${Math.random().toString(36).slice(2, 6)}`;
}
function isSafeAvatarUrl(value) {
	if (!value) return true;
	if (value.startsWith("data:image/")) return value.length <= 38e4;
	try {
		const url = new URL(value);
		return url.protocol === "https:" || url.protocol === "http:";
	} catch {
		return false;
	}
}
//#endregion
export { passwordError as a, normalizeUsername as i, emailError as n, suggestUsername as o, isSafeAvatarUrl as r, usernameError as s, ageError as t };
