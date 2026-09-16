import { API_BASE } from "../config/routes";

const USE_REAL_AUTH = import.meta.env.VITE_USE_REAL_AUTH === "true";

export async function signInWithPin(pin) {
  if (!USE_REAL_AUTH) {
    return { access_token: `mock-session-${pin}` };
  }

  const response = await fetch(`${API_BASE}/api/auth/pin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin }),
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(typeof payload.detail === "string" ? payload.detail : `Sign-in failed (${response.status})`);
  }

  return payload;
}
