/* ============================================================
   LOCAL BACKEND — localStorage, same interface as SupabaseBackend.
   Used for offline play and for `?local=1` testing. Verifies the
   password before every action, mirroring the RPC security model.
   ============================================================ */
const LS = { students: "mhq.students", progress: "mhq.progress", struggles: "mhq.struggles", quests: "mhq.quests", meta: "mhq.meta" };
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const DEMO_ROSTER = ["Demo Learner", "Aanton M", "Bongani K", "Chloé V", "Dineo P", "Ethan R"];
const QUEST_IDS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];
const DEFAULT_OPEN = ["q1", "q2", "q3"];   // mirrors the seed; open the rest via admin

function seed() {
  if (!read(LS.students, null)) {
    const students = {};
    DEMO_ROSTER.forEach((name, i) => { const id = "s" + (i + 1); students[id] = { id, display_name: name, password: null, last_active_at: null }; });
    write(LS.students, students);
  }
  if (!read(LS.quests, null)) write(LS.quests, Object.fromEntries(QUEST_IDS.map((q, i) => [q, { is_open: DEFAULT_OPEN.includes(q), sort: i + 1 }])));
  if (!read(LS.progress, null)) write(LS.progress, {});
  if (!read(LS.struggles, null)) write(LS.struggles, {});
  if (!read(LS.meta, null)) write(LS.meta, { adminPassword: "admin" });
}
const findByName = name => Object.values(read(LS.students, {})).find(s => s.display_name === name) || null;
function verify(name, pw) { const s = findByName(name); return (s && s.password != null && s.password === pw) ? s : null; }
function touch(id) { const st = read(LS.students, {}); if (st[id]) { st[id].last_active_at = Date.now(); write(LS.students, st); } }
const openQuests = () => { const q = read(LS.quests, {}); return Object.keys(q).filter(id => q[id].is_open).sort((a, b) => q[a].sort - q[b].sort); };

export const LocalBackend = {
  async listStudents() {
    seed();
    return Object.values(read(LS.students, {}))
      .map(s => ({ id: s.id, display_name: s.display_name, has_password: s.password != null }))
      .sort((a, b) => a.display_name.localeCompare(b.display_name));
  },
  async login(name, pw) {
    seed();
    const s = findByName(name);
    if (!s) return { ok: false, error: "no_such_user" };
    if (s.password == null) return { ok: false, firstLogin: true };
    if (s.password !== pw) return { ok: false, error: "wrong_password" };
    touch(s.id); return { ok: true };
  },
  async firstLogin(name, pw) {
    seed();
    if ((pw || "").length < 4) return { ok: false, error: "too_short" };
    const st = read(LS.students, {});
    const s = Object.values(st).find(x => x.display_name === name);
    if (!s) return { ok: false, error: "no_such_user" };
    if (s.password != null) return { ok: false, error: "already_set" };
    s.password = pw; s.last_active_at = Date.now(); write(LS.students, st);
    return { ok: true };
  },
  async getState(name, pw) {
    const s = verify(name, pw);
    if (!s) return { ok: false, error: "auth" };
    touch(s.id);
    const progress = read(LS.progress, {})[s.id] || {};
    const totalXp = Object.values(progress).reduce((a, p) => a + (p.total_xp || 0), 0);
    return { ok: true, student: { id: s.id, name: s.display_name }, progress, totalXp, openQuests: openQuests() };
  },
  async submitQuest(name, pw, quest, { score, xp }) {
    const s = verify(name, pw);
    if (!s) return { ok: false, error: "auth" };
    const all = read(LS.progress, {});
    const p = all[s.id] || {};
    const prev = p[quest] || { best_score: 0, attempts: 0, total_xp: 0, passed: false };
    const wasPassed = prev.passed;
    const passed = score >= 0.8;
    const award = wasPassed ? 0 : Math.max(0, Math.min(Math.round(xp) || 0, 1000));
    p[quest] = {
      best_score: Math.max(prev.best_score, score), attempts: prev.attempts + 1,
      total_xp: prev.total_xp + award, passed: prev.passed || passed, last_played_at: Date.now(),
    };
    all[s.id] = p; write(LS.progress, all); touch(s.id);
    return { ok: true, passed, badgeEarned: passed && !wasPassed, xpAwarded: award, alreadyPassed: wasPassed };
  },
  async logStruggle(name, pw, concept) {
    const s = verify(name, pw);
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
      id: s.id, name: s.display_name, password: s.password, lastActive: s.last_active_at,
      totalXp: Object.values(progress[s.id] || {}).reduce((a, p) => a + (p.total_xp || 0), 0),
      quests: progress[s.id] || {},
    })).sort((a, b) => a.name.localeCompare(b.name));
    const qs = Object.keys(quests).sort((a, b) => quests[a].sort - quests[b].sort).map(q => ({ quest_id: q, is_open: quests[q].is_open }));
    const cByConcept = {};
    Object.values(struggles).forEach(byC => Object.entries(byC).forEach(([c, v]) => {
      const g = cByConcept[c] || (cByConcept[c] = { concept: c, count: 0, students: 0 });
      g.count += v.count; g.students += 1;
    }));
    const strug = Object.values(cByConcept).sort((a, b) => b.count - a.count);
    return { ok: true, rows, quests: qs, struggles: strug, inactiveDays: 7 };
  },
  async adminSetQuestOpen(pw, quest, open) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const q = read(LS.quests, {}); if (q[quest]) { q[quest].is_open = !!open; write(LS.quests, q); } return { ok: true };
  },
  async adminResetPassword(pw, id) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const st = read(LS.students, {}); if (st[id]) { st[id].password = null; write(LS.students, st); } return { ok: true };
  },
  async adminAddStudent(pw, name) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const st = read(LS.students, {});
    const id = "s" + (Math.max(0, ...Object.keys(st).map(k => +k.slice(1))) + 1);
    if (!Object.values(st).some(s => s.display_name === name)) { st[id] = { id, display_name: name, password: null, last_active_at: null }; write(LS.students, st); }
    return { ok: true };
  },
  async adminRemoveStudent(pw, id) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const st = read(LS.students, {}); delete st[id]; write(LS.students, st); return { ok: true };
  },
  async adminResolveStruggle(pw, concept) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const all = read(LS.struggles, {}); Object.values(all).forEach(byC => delete byC[concept]); write(LS.struggles, all); return { ok: true };
  },
};
