/** Map Better Auth errors to copy that never leaks credentials or existence details. */
export function authErrorMessage(raw: string | undefined, fallback: string) {
  const message = (raw ?? "").toLowerCase();
  if (!message) return fallback;
  if (message.includes("already exists") || message.includes("already registered") || message.includes("user already")) {
    return "That email is already on VYBE. Sign in instead.";
  }
  if (message.includes("invalid email or password") || message.includes("invalid password") || message.includes("invalid credentials")) {
    return "Those credentials do not match.";
  }
  if (message.includes("password") && message.includes("too short")) {
    return "Password needs at least 8 characters.";
  }
  if (message.includes("invalid origin")) {
    return "Open VYBE from the app itself to sign in.";
  }
  if (message.includes("unauthorized")) return fallback;
  return raw?.trim() || fallback;
}
