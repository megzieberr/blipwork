/* The logged-in learner's name + password, kept in localStorage. */
const KEY = "mhq.session";
export function getSession() { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } }
export function setSession(name, password) { localStorage.setItem(KEY, JSON.stringify({ name, password })); }
export function clearSession() { localStorage.removeItem(KEY); }
export function isLoggedIn() { return !!getSession(); }
