/* The logged-in learner's username + password, kept in localStorage. */
const KEY = "mhq.session";
export function getSession() { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } }
export function setSession(username, password) { localStorage.setItem(KEY, JSON.stringify({ username, password })); }
export function clearSession() { localStorage.removeItem(KEY); }
export function isLoggedIn() { return !!getSession(); }
