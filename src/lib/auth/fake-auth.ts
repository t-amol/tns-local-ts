// src/lib/auth/fake-auth.ts
export type FakeUser = { id: string; name: string; email?: string | null };
const KEY = "fake_auth_session";

export function getUser(): FakeUser | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(KEY) || "{}").user ?? null; } catch { return null; }
}
export const isLoggedIn = () => !!getUser();
export function login(name: string) {
  const user: FakeUser = { id: "dev", name: name.trim() || "Dev User", email: "dev@example.com" };
  localStorage.setItem(KEY, JSON.stringify({ user }));
}
export function logout() { localStorage.removeItem(KEY); }
