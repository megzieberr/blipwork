/* ============================================================
   LOCAL BACKEND — localStorage, same interface as SupabaseBackend.
   Self sign-up model. Used for offline play and `?local=1` testing.
   (Passwords are kept locally only; the admin view never exposes them.)

   BLIPWORK ADDITION (2026-07-19): mirrors the gold/XP/level/shop/
   equip/gallery RPCs added in supabase/migration-blipwork.sql, so
   `?local=1` behaves like production. Level maths comes from the one
   shared module (js/companion/level.js) — never recompute the curve
   here. Server behaviour reproduced 1:1:
     • XP is a lifetime counter; first completion of a quest pays it
       in full, a replay of an already-passed quest pays 25% (both
       clamped to the same 0..1000 band as p_xp before the cut).
     • Gold is flat 10 per submitted round, pass or fail, every time.
     • First non-cream colour requires xp > 0 (server: colour_locked).
     • Shop catalogue/prices/level-gates match the live seed exactly
       (item ids match js/companion/renderer.js ACCESSORIES keys).
   ============================================================ */
import { levelInfo } from "./companion/level.js";

const LS = { students: "mhq.students", progress: "mhq.progress", struggles: "mhq.struggles", quests: "mhq.quests", meta: "mhq.meta" };
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const QUEST_IDS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8",
  "f1", "f2", "f3", "f4", "f5", "f6", "f7",
  "p1", "p2", "p3", "p4", "p5", "p6", "p7",
  "t1", "t2", "t3", "t4", "t5", "t6", "t7",
  "m1", "m2", "m3", "m4", "m5", "m6",
  "fn1", "fn2", "fn3", "fn4", "fn5", "fn6", "fn7",
  "tg1", "tg2", "tg3", "tg4", "tg5", "tg6", "tg7",
  "ag1", "ag2", "ag3", "ag4", "ag5", "ag6", "ag7",
  "np1", "np2", "np3", "np4", "np5", "np6", "np7",
  "es1", "es2", "es3", "es4", "es5", "es6", "es7", "es8",
  "eq1", "eq2", "eq3", "eq4", "eq5", "eq6", "eq7", "eq8"];
/* offline sandbox opens stats q1–q3 and every later chapter's quests, so each
   whole chapter is playable locally; on the live backend the teacher opens each. */
const DEFAULT_OPEN = ["q1", "q2", "q3", "f1", "f2", "f3", "f4", "f5", "f6", "f7",
  "p1", "p2", "p3", "p4", "p5", "p6", "p7",
  "t1", "t2", "t3", "t4", "t5", "t6", "t7",
  "m1", "m2", "m3", "m4", "m5", "m6",
  "fn1", "fn2", "fn3", "fn4", "fn5", "fn6", "fn7",
  "tg1", "tg2", "tg3", "tg4", "tg5", "tg6", "tg7",
  "ag1", "ag2", "ag3", "ag4", "ag5", "ag6", "ag7",
  "np1", "np2", "np3", "np4", "np5", "np6", "np7",
  "es1", "es2", "es3", "es4", "es5", "es6", "es7", "es8",
  "eq1", "eq2", "eq3", "eq4", "eq5", "eq6", "eq7", "eq8"];

/* Shop catalogue — identical ids/slots/prices/minLevel to the live seed in
   supabase/migration-blipwork.sql (sort order matches too). */
const SHOP_ITEMS = [
  { id: "round-glasses", slot: "glasses", price: 40, minLevel: 1 },
  { id: "cat-ears", slot: "ears", price: 60, minLevel: 2 },
  { id: "party-hat", slot: "hat", price: 80, minLevel: 3 },
  { id: "stubby-arms", slot: "arms", price: 100, minLevel: 4 },
  { id: "angel-wings", slot: "wings", price: 150, minLevel: 6 },
];
const VALID_COLOURS = ["cream", "pink", "mint", "sky", "lilac", "peach", "lemon", "seafoam", "coral", "lavender"];
const VALID_SLOTS = ["hat", "ears", "glasses", "wings", "arms"];

/* A couple of fixed fake classmates so the gallery has something to lay
   out locally — never persisted, never real, purely for testing the grid. */
const FAKE_CLASSMATES = [
  { username: "keabetswe", colour: "mint", equipped: { hat: "party-hat" }, level: 5 },
  { username: "sipho", colour: "sky", equipped: { glasses: "round-glasses", ears: "cat-ears" }, level: 3 },
  { username: "amahle", colour: "coral", equipped: {}, level: 8 },
];

/* Adds the Blipwork fields to a student record in place (mutates); returns
   true if anything was missing/changed, so the caller knows to persist. */
function ensureBlipFields(s) {
  let changed = false;
  if (typeof s.gold !== "number") { s.gold = 0; changed = true; }
  if (typeof s.xp !== "number") { s.xp = 0; changed = true; }
  if (typeof s.blip_name !== "string" || !s.blip_name) { s.blip_name = "Blip"; changed = true; }
  if (typeof s.blip_colour !== "string" || !VALID_COLOURS.includes(s.blip_colour)) { s.blip_colour = "cream"; changed = true; }
  if (!Array.isArray(s.owned_items)) { s.owned_items = []; changed = true; }
  if (!s.equipped || typeof s.equipped !== "object" || Array.isArray(s.equipped)) { s.equipped = {}; changed = true; }
  return changed;
}

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

  // Blipwork field migration: backfill lifetime xp from historical per-quest
  // progress once (mirrors the live migration's one-time `where xp = 0` backfill).
  const st = read(LS.students, {});
  const progress = read(LS.progress, {});
  let stChanged = false;
  Object.values(st).forEach((s) => {
    const wasMigrated = typeof s.gold === "number";
    if (ensureBlipFields(s)) stChanged = true;
    if (!wasMigrated) {
      const sum = Object.values(progress[s.id] || {}).reduce((a, p) => a + (p.total_xp || 0), 0);
      if (s.xp === 0 && sum > 0) { s.xp = sum; stChanged = true; }
    }
  });
  if (stChanged) write(LS.students, st);
}
const findByUser = u => Object.values(read(LS.students, {})).find(s => s.username === String(u).toLowerCase()) || null;
function verify(u, pw) { const s = findByUser(u); return (s && s.password != null && s.password === pw) ? s : null; }
function touch(id) { const st = read(LS.students, {}); if (st[id]) { st[id].last_active_at = Date.now(); write(LS.students, st); } }
const openQuests = () => { const q = read(LS.quests, {}); return Object.keys(q).filter(id => q[id].is_open).sort((a, b) => q[a].sort - q[b].sort); };
function shopCatalogue() { return SHOP_ITEMS.map(it => ({ id: it.id, slot: it.slot, price: it.price, minLevel: it.minLevel })); }

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
    st[id] = {
      id, username: u, display_name: String(name).trim(), password, last_active_at: Date.now(),
      gold: 0, xp: 0, blip_name: "Blip", blip_colour: "cream", owned_items: [], equipped: {},
    };
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
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    if (ensureBlipFields(rec)) write(LS.students, stAll);
    const progress = read(LS.progress, {})[s.id] || {};
    const totalXp = Object.values(progress).reduce((a, p) => a + (p.total_xp || 0), 0);
    return {
      ok: true, student: { id: s.id, name: s.display_name, username: s.username }, progress, totalXp, openQuests: openQuests(),
      gold: rec.gold, xp: rec.xp, levelInfo: levelInfo(rec.xp),
      blip: { name: rec.blip_name, colour: rec.blip_colour, owned: rec.owned_items, equipped: rec.equipped },
      shop: shopCatalogue(),
    };
  },
  async submitQuest(username, password, quest, { score, xp }) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const all = read(LS.progress, {});
    const p = all[s.id] || {};
    const prev = p[quest] || { best_score: 0, attempts: 0, total_xp: 0, passed: false };
    const wasPassed = prev.passed, passed = score >= 0.8;
    const clamped = Math.max(0, Math.min(Math.round(xp) || 0, 1000));
    const xpGain = wasPassed ? Math.round(clamped * 0.25) : clamped;   // first completion = full XP, replay = 25%
    const goldGain = 10;                                              // flat, every completed round
    p[quest] = { best_score: Math.max(prev.best_score, score), attempts: prev.attempts + 1, total_xp: prev.total_xp + xpGain, passed: prev.passed || passed, last_played_at: Date.now() };
    all[s.id] = p; write(LS.progress, all); touch(s.id);

    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const oldLevel = levelInfo(rec.xp).level;
    rec.xp += xpGain;
    rec.gold += goldGain;
    write(LS.students, stAll);
    const info = levelInfo(rec.xp);

    return {
      ok: true, passed, badgeEarned: passed && !wasPassed, xpAwarded: xpGain, alreadyPassed: wasPassed,
      goldAwarded: goldGain, xp: rec.xp, gold: rec.gold, level: info.level, levelUp: info.level > oldLevel, levelInfo: info,
    };
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

  // ---- Blip: shop / equip / gallery ----
  async buyItem(username, password, item) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const itm = SHOP_ITEMS.find(x => x.id === item);
    if (!itm) return { ok: false, error: "no_item" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    if (rec.owned_items.includes(item)) return { ok: false, error: "owned" };
    const lvl = levelInfo(rec.xp).level;
    if (lvl < itm.minLevel) return { ok: false, error: "locked", minLevel: itm.minLevel };
    if (rec.gold < itm.price) return { ok: false, error: "gold", price: itm.price, gold: rec.gold };
    rec.gold -= itm.price;
    rec.owned_items = [...rec.owned_items, item];
    write(LS.students, stAll);
    return { ok: true, gold: rec.gold, owned: rec.owned_items };
  },
  async equip(username, password, { equipped, colour, blipName } = {}) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);

    if (equipped != null) {
      if (typeof equipped !== "object" || Array.isArray(equipped)) return { ok: false, error: "bad_equipped" };
      const bad = Object.entries(equipped).some(([k, v]) => !VALID_SLOTS.includes(k) || (!!v && !rec.owned_items.includes(v)));
      if (bad) return { ok: false, error: "bad_equipped" };
      rec.equipped = { ...equipped };
    }
    if (colour != null) {
      if (!VALID_COLOURS.includes(colour)) return { ok: false, error: "bad_colour" };
      if (colour !== "cream" && rec.xp <= 0) return { ok: false, error: "colour_locked" };
      rec.blip_colour = colour;
    }
    if (blipName != null) {
      const nm = String(blipName).trim().slice(0, 24);
      if (!nm) return { ok: false, error: "bad_name" };
      rec.blip_name = nm;
    }
    write(LS.students, stAll);
    return { ok: true, blip: { name: rec.blip_name, colour: rec.blip_colour, owned: rec.owned_items, equipped: rec.equipped } };
  },
  async gallery(username, password) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const mine = { username: rec.username, colour: rec.blip_colour, equipped: rec.equipped, level: levelInfo(rec.xp).level, me: true };
    const rows = [mine, ...FAKE_CLASSMATES.map(c => ({ ...c, me: false }))];
    rows.sort((a, b) => a.username.localeCompare(b.username));
    return { ok: true, gallery: rows };
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
    // mirrors mhq_admin_reset_progress: XP (level) drops to 0, but gold,
    // owned items, equipped set, colour and nickname are all kept as-is.
    const st = read(LS.students, {}); if (st[id]) { st[id].xp = 0; write(LS.students, st); }
    return { ok: true };
  },
  async adminResolveStruggle(pw, concept) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const all = read(LS.struggles, {}); Object.values(all).forEach(byC => delete byC[concept]); write(LS.struggles, all); return { ok: true };
  },
};
