/* ============================================================
   LOCAL BACKEND — localStorage, same interface as SupabaseBackend.
   Self sign-up model. Used for offline play and `?local=1` testing.
   (Passwords are kept locally only; the admin view never exposes them.)
   ============================================================ */
const LS = { students: "mhq.students", progress: "mhq.progress", struggles: "mhq.struggles", quests: "mhq.quests", meta: "mhq.meta" };
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const QUEST_IDS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8",
  "f1", "f2", "f3", "f4", "f5", "f6", "f7"];
/* offline sandbox opens stats q1–q3 and all Finance quests so the whole new
   chapter is playable locally; on the live backend the teacher opens each. */
const DEFAULT_OPEN = ["q1", "q2", "q3", "f1", "f2", "f3", "f4", "f5", "f6", "f7"];

function seed() {
  if (!read(LS.students, null)) write(LS.students, {});
  // create the quests store, and merge in any quest ids added since (e.g. a new chapter)
  const q = read(LS.quests, null) || {};
  let changed = !read(LS.quests, null);
  QUEST_IDS.forEach((id, i) => { if (!q[id]) { q[id] = { is_open: DEFAULT_OPEN.includes(id), sort: i + 1 }; changed = true; } });
  if (changed) write(LS.quests, q);
  if (!read(LS.progress, null)) write(LS.progress, {});
  if (!read(LS.struggles, null)) write(LS.struggles, {});
  if (!read(LS.meta, null)) write(LS.meta, { adminPassword: "admin" });
}
const findByUser = u => Object.values(read(LS.students, {})).find(s => s.username === String(u).toLowerCase()) || null;
function verify(u, pw) { const s = findByUser(u); return (s && s.password != null && s.password === pw) ? s : null; }
function touch(id) { const st = read(LS.students, {}); if (st[id]) { st[id].last_active_at = Date.now(); write(LS.students, st); } }
const openQuests = () => { const q = read(LS.quests, {}); return Object.keys(q).filter(id => q[id].is_open).sort((a, b) => q[a].sort - q[b].sort); };

export const LocalBackend = {
  async signup(username, name, password) {
    seed();
    const u = String(username).trim().toLowerCase();
    if (u.length < 3) return { ok: false, error: "username_short" };
    if (!/^[a-z0-9_.]+$/.test(u)) return { ok: false, error: "username_chars" };
    if ((password || "").length < 4) return { ok: false, error: "too_short" };
    if (!String(name).trim()) return { ok: false, error: "no_name" };
    if (findByUser(u)) return { ok: false, error: "username_taken" };
    const st = read(LS.students, {});
    const id = "s" + (Math.max(0, ...Object.keys(st).map(k => +k.slice(1) || 0)) + 1);
    st[id] = { id, username: u, display_name: String(name).trim(), password, last_active_at: Date.now() };
    write(LS.students, st);
    return { ok: true };
  },
  async login(username, password) {
    seed();
    const s = findByUser(username);
    if (!s) return { ok: false, error: "no_such_user" };
    if (s.password == null) return { ok: false, needsReset: true };
    if (s.password !== password) return { ok: false, error: "wrong_password" };
    touch(s.id); return { ok: true };
  },
  async setPassword(username, password) {
    seed();
    if ((password || "").length < 4) return { ok: false, error: "too_short" };
    const st = read(LS.students, {});
    const s = Object.values(st).find(x => x.username === String(username).toLowerCase());
    if (!s) return { ok: false, error: "no_such_user" };
    if (s.password != null) return { ok: false, error: "already_set" };
    s.password = password; s.last_active_at = Date.now(); write(LS.students, st);
    return { ok: true };
  },
  async getState(username, password) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    touch(s.id);
    const progress = read(LS.progress, {})[s.id] || {};
    const totalXp = Object.values(progress).reduce((a, p) => a + (p.total_xp || 0), 0);
    return { ok: true, student: { id: s.id, name: s.display_name, username: s.username }, progress, totalXp, openQuests: openQuests() };
  },
  async submitQuest(username, password, quest, { score, xp }) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const all = read(LS.progress, {});
    const p = all[s.id] || {};
    const prev = p[quest] || { best_score: 0, attempts: 0, total_xp: 0, passed: false };
    const wasPassed = prev.passed, passed = score >= 0.8;
    const award = wasPassed ? 0 : Math.max(0, Math.min(Math.round(xp) || 0, 1000));
    p[quest] = { best_score: Math.max(prev.best_score, score), attempts: prev.attempts + 1, total_xp: prev.total_xp + award, passed: prev.passed || passed, last_played_at: Date.now() };
    all[s.id] = p; write(LS.progress, all); touch(s.id);
    return { ok: true, passed, badgeEarned: passed && !wasPassed, xpAwarded: award, alreadyPassed: wasPassed };
  },
  async logStruggle(username, password, concept) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const all = read(LS.struggles, {});
    const g = all[s.id] || (all[s.id] = {});
    g[concept] = { count: ((g[concept] && g[concept].count) || 0) + 1, last_ts: Date.now() };
    write(LS.struggles, all);
    return { ok: true };
  },

  // ---- admin ----
  async adminLogin(pw) { seed(); return { ok: read(LS.meta, {}).adminPassword === pw }; },
  async adminData(pw) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const students = read(LS.students, {}), progress = read(LS.progress, {}), struggles = read(LS.struggles, {}), quests = read(LS.quests, {});
    const rows = Object.values(students).map(s => ({
      id: s.id, name: s.display_name, username: s.username, hasPassword: s.password != null, lastActive: s.last_active_at,
      totalXp: Object.values(progress[s.id] || {}).reduce((a, p) => a + (p.total_xp || 0), 0),
      quests: progress[s.id] || {},
    })).sort((a, b) => a.name.localeCompare(b.name));
    const qs = Object.keys(quests).sort((a, b) => quests[a].sort - quests[b].sort).map(q => ({ quest_id: q, is_open: quests[q].is_open }));
    const cByConcept = {};
    Object.values(struggles).forEach(byC => Object.entries(byC).forEach(([c, v]) => {
      const g = cByConcept[c] || (cByConcept[c] = { concept: c, count: 0, students: 0 });
      g.count += v.count; g.students += 1;
    }));
    return { ok: true, rows, quests: qs, struggles: Object.values(cByConcept).sort((a, b) => b.count - a.count), inactiveDays: 7 };
  },
  async adminSetQuestOpen(pw, quest, open) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const q = read(LS.quests, {}); if (q[quest]) { q[quest].is_open = !!open; write(LS.quests, q); } return { ok: true };
  },
  async adminResetPassword(pw, id) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const st = read(LS.students, {}); if (st[id]) { st[id].password = null; write(LS.students, st); } return { ok: true };
  },
  async adminRemoveStudent(pw, id) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const st = read(LS.students, {}); delete st[id]; write(LS.students, st); return { ok: true };
  },
  async adminResetProgress(pw, id) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const pr = read(LS.progress, {}); delete pr[id]; write(LS.progress, pr);
    const sg = read(LS.struggles, {}); delete sg[id]; write(LS.struggles, sg);
    return { ok: true };
  },
  async adminResolveStruggle(pw, concept) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const all = read(LS.struggles, {}); Object.values(all).forEach(byC => delete byC[concept]); write(LS.struggles, all); return { ok: true };
  },
};
