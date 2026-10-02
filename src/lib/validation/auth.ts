export const USERNAME_RE = /^[a-z0-9._]{3,24}$/;
export const MIN_PASSWORD = 8;
export const MIN_AGE = 13;

export function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

export function usernameError(value: string): string | null {
  const username = normalizeUsername(value);
  if (!USERNAME_RE.test(username)) {
    return "Use 3–24 characters: lowercase letters, numbers, periods, or underscores.";
  }
  return null;
}

export function passwordError(value: string): string | null {
  if (value.length < MIN_PASSWORD) return "Password needs at least 8 characters.";
  return null;
}

export function emailError(value: string): string | null {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email.";
  return null;
}

export function ageError(isoDate: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return "Enter your date of birth.";
  const dob = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(dob.getTime())) return "Enter a valid date.";
  const cutoff = new Date();
  cutoff.setUTCFullYear(cutoff.getUTCFullYear() - MIN_AGE);
  if (dob > cutoff) return `You must be at least ${MIN_AGE} to join VYBE.`;
  const oldest = new Date();
  oldest.setUTCFullYear(oldest.getUTCFullYear() - 120);
  if (dob < oldest) return "Enter a valid date of birth.";
  return null;
}

export function suggestUsername(name: string, email: string) {
  const raw = (name || email.split("@")[0] || "member")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "")
    .slice(0, 20);
  return raw.length >= 3 ? raw : `vybe${Math.random().toString(36).slice(2, 6)}`;
}

export function isSafeAvatarUrl(value: string | null): boolean {
  if (!value) return true;
  if (value.startsWith("data:image/")) return value.length <= 380_000;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
