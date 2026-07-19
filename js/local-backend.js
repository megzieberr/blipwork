/* ============================================================
   LOCAL BACKEND — localStorage, same interface as SupabaseBackend.
   Self sign-up model. Used for offline play and `?local=1` testing.
   (Passwords are kept locally only; the admin view never exposes them.)

   BLIPWORK ADDITION (2026-07-19): mirrors the gold/XP/level/shop/
   equip/gallery RPCs added in supabase/migration-blipwork.sql.

   PHASE 2 ADDITION (2026-07-19): mirrors supabase/migration-phase2-
   blip-care.sql 1:1 so `?local=1` behaves like production —
   feeding + growth, the computed sickness clock, pharmacy/recovery,
   the cosmetic locks and the second blip. Server behaviour reproduced:
     • Health is COMPUTED, never stored. A qualifying day = weekday AND
       the term toggle is ON. days_unfed = qualifying days since
       max(last_fed_day, term_on_since). Stages 0/1/2/3 at 0–2/3–4/5–6/7+.
       Turning the term ON stamps term_on_since = today (forgives all
       accrued sickness). Health is household-wide.
     • FREE cookie: one/day (guarded by last_fed_day), the ONLY thing
       that grows a blip (feed_count, +1 to EVERY blip), and it resets
       the sickness clock. Refused while sick (REFUSES_FOOD).
     • Paid treat: gold sink, no growth, no clock, refused while sick.
     • Care = soup + medicine (bought into the pantry, prices server-
       side); 3 consecutive qualifying care days fully heal; a skipped
       qualifying day resets the streak (weekends/term-off never do).
     • Locks: stage>=2 blocks equip; stage 3 blocks accessory buys +
       gallery reads — but soup/medicine buys ALWAYS work.
     • Second blip: level>=10, one claim, any colour, feed_count 0.
   Growth/sick thresholds + food prices come from the shared config
   (js/config.js BLIP) and level maths from js/companion/level.js —
   never recompute either curve here.

   DEV: globalThis.__BLIP_DEV__.skipDays(n) advances the local clock so
   sick states can be tested without waiting a week; .reset() clears it.
   ============================================================ */
import { levelInfo } from "./companion/level.js";
import { BLIP } from "./config.js";

const LS = { students: "mhq.students", progress: "mhq.progress", struggles: "mhq.struggles", quests: "mhq.quests", meta: "mhq.meta", blips: "mhq.blips" };
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

/* Cosmetic shop — identical ids/slots/prices/minLevel to the live seed. */
const SHOP_ITEMS = [
  { id: "round-glasses", slot: "glasses", price: 40, minLevel: 1 },
  { id: "cat-ears", slot: "ears", price: 60, minLevel: 2 },
  { id: "party-hat", slot: "hat", price: 80, minLevel: 3 },
  { id: "stubby-arms", slot: "arms", price: 100, minLevel: 4 },
  { id: "angel-wings", slot: "wings", price: 150, minLevel: 6 },
];
/* Pharmacy / grocery — prices mirror the server shop_items 'food' rows. */
const FOOD_ITEMS = [
  { id: "soup", kind: "soup", price: BLIP.food.soup },
  { id: "medicine", kind: "medicine", price: BLIP.food.medicine },
  { id: "treat", kind: "treat", price: BLIP.food.treat },
];
const VALID_COLOURS = ["cream", "pink", "mint", "sky", "lilac", "peach", "lemon", "seafoam", "coral", "lavender"];
const VALID_SLOTS = ["hat", "ears", "glasses", "wings", "arms"];

/* Three fake classmates with VARIED blips + health, so the gallery has real
   layout content: a healthy solo grown blip, a tired two-blip household, and a
   bedridden learner. Never persisted, never real, purely for testing the grid. */
const FAKE_CLASSMATES = [
  {
    username: "keabetswe", level: 8, stage: 0,
    blips: [{ slot: 1, colour: "mint", equipped: { hat: "party-hat" }, feedCount: 47, growthStage: 3 }],
  },
  {
    username: "sipho", level: 12, stage: 1,
    blips: [
      { slot: 1, colour: "sky", equipped: { glasses: "round-glasses", ears: "cat-ears" }, feedCount: 30, growthStage: 2 },
      { slot: 2, colour: "coral", equipped: {}, feedCount: 4, growthStage: 0 },
    ],
  },
  {
    username: "amahle", level: 5, stage: 2,
    blips: [{ slot: 1, colour: "lilac", equipped: {}, feedCount: 12, growthStage: 1 }],
  },
];

/* ---------- clock (day-index; dev offset lets tests skip days) ---------- */
const DAY_MS = 86400000;
function dayOffset() { return read(LS.meta, {}).dayOffset || 0; }
function today() { return Math.floor(Date.now() / DAY_MS) + dayOffset(); }
function isWeekday(dayIdx) { const dow = new Date(dayIdx * DAY_MS).getUTCDay(); return dow >= 1 && dow <= 5; } // 1..5 = Mon..Fri
/* count qualifying weekdays d with fromExcl < d <= toIncl */
function countQualWeekdays(fromExcl, toIncl) { let n = 0; for (let d = fromExcl + 1; d <= toIncl; d++) if (isWeekday(d)) n++; return n; }
function growthStage(feed) { return BLIP.growthThresholds.filter(t => (feed || 0) >= t).length; }

/* ---------- term config (mirrors app_config) ---------- */
function termConfig() { const m = read(LS.meta, {}); return { running: !!m.term_running, onSince: (typeof m.term_on_since === "number" ? m.term_on_since : null) }; }
function isQualDay() { const { running } = termConfig(); return running && isWeekday(today()); }

/* Household health, computed exactly like _mhq_health(). */
function computeHealth(lastFed, careStreak) {
  const { running, onSince } = termConfig();
  let du = 0;
  if (running && onSince != null) {
    const wstart = Math.max(lastFed == null ? onSince : lastFed, onSince);
    du = countQualWeekdays(wstart, today());
  }
  const stage = du >= 7 ? 3 : du >= 5 ? 2 : du >= 3 ? 1 : 0;
  const cs = careStreak || 0;
  return { stage, daysUnfed: du, recovering: cs >= 1 && stage >= 2, careStreak: cs,
    locks: { dress: stage >= 2, shop: stage >= 3, gallery: stage >= 3 } };
}

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
  // Phase 2 care/feeding bookkeeping
  if (!("last_fed_day" in s)) { s.last_fed_day = null; changed = true; }
  if (typeof s.care_streak !== "number") { s.care_streak = 0; changed = true; }
  if (!("last_care_day" in s)) { s.last_care_day = null; changed = true; }
  if (!s.pantry || typeof s.pantry !== "object" || Array.isArray(s.pantry)) { s.pantry = {}; changed = true; }
  return changed;
}

/* ---------- blips store: { [studentId]: [ {slot,name,colour,feed_count,owned_items,equipped} ] } ---------- */
function allBlips() { return read(LS.blips, {}); }
function getBlips(sid) { return (read(LS.blips, {})[sid] || []).slice().sort((a, b) => a.slot - b.slot); }
function ensureBlip(sid, rec) {
  // create the slot-1 blip from the (migrated) student record if missing
  const store = read(LS.blips, {});
  const arr = store[sid] || [];
  if (!arr.some(b => b.slot === 1)) {
    arr.push({ slot: 1, name: rec.blip_name || "Blip", colour: rec.blip_colour || "cream", feed_count: 0, owned_items: Array.isArray(rec.owned_items) ? rec.owned_items.slice() : [], equipped: (rec.equipped && typeof rec.equipped === "object") ? { ...rec.equipped } : {} });
    store[sid] = arr; write(LS.blips, store);
  }
  return arr.slice().sort((a, b) => a.slot - b.slot);
}
function writeBlips(sid, arr) { const store = read(LS.blips, {}); store[sid] = arr; write(LS.blips, store); }

function seed() {
  if (!read(LS.students, null)) write(LS.students, {});
  // create the quests store, and merge in any quest ids added since (e.g. a new chapter)
  const q = read(LS.quests, null) || {};
  let changed = !read(LS.quests, null);
  QUEST_IDS.forEach((id, i) => { if (!q[id]) { q[id] = { is_open: DEFAULT_OPEN.includes(id), sort: i + 1 }; changed = true; } });
  if (changed) write(LS.quests, q);
  if (!read(LS.progress, null)) write(LS.progress, {});
  if (!read(LS.struggles, null)) write(LS.struggles, {});
  // meta: admin pw + Phase 2 term config + dev clock offset
  const meta = read(LS.meta, null) || {};
  let metaChanged = read(LS.meta, null) == null;
  if (!("adminPassword" in meta)) { meta.adminPassword = "admin"; metaChanged = true; }
  if (!("term_running" in meta)) { meta.term_running = false; metaChanged = true; }   // starts OFF, like live
  if (!("term_on_since" in meta)) { meta.term_on_since = null; metaChanged = true; }
  if (!("dayOffset" in meta)) { meta.dayOffset = 0; metaChanged = true; }
  if (metaChanged) write(LS.meta, meta);
  if (!read(LS.blips, null)) write(LS.blips, {});

  // Blipwork field migration + blips-table backfill (mirrors the live migrations).
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
    ensureBlip(s.id, s); // backfill slot-1 blip row
  });
  if (stChanged) write(LS.students, st);
}
const findByUser = u => Object.values(read(LS.students, {})).find(s => s.username === String(u).toLowerCase()) || null;
function verify(u, pw) { const s = findByUser(u); return (s && s.password != null && s.password === pw) ? s : null; }
function touch(id) { const st = read(LS.students, {}); if (st[id]) { st[id].last_active_at = Date.now(); write(LS.students, st); } }
const openQuests = () => { const q = read(LS.quests, {}); return Object.keys(q).filter(id => q[id].is_open).sort((a, b) => q[a].sort - q[b].sort); };
function shopCatalogue() { return SHOP_ITEMS.map(it => ({ id: it.id, slot: it.slot, price: it.price, minLevel: it.minLevel })); }
function foodCatalogue() { return FOOD_ITEMS.map(it => ({ id: it.id, kind: it.kind, price: it.price })); }
function blipsView(sid) { return getBlips(sid).map(b => ({ slot: b.slot, name: b.name, colour: b.colour, feedCount: b.feed_count, growthStage: growthStage(b.feed_count), owned: b.owned_items, equipped: b.equipped })); }

/* dev clock control — advance/reset the local "today" so sick states are testable */
globalThis.__BLIP_DEV__ = {
  skipDays(n) { const m = read(LS.meta, {}); m.dayOffset = (m.dayOffset || 0) + (Number(n) || 0); write(LS.meta, m); return { dayOffset: m.dayOffset, today: today() }; },
  reset() { const m = read(LS.meta, {}); m.dayOffset = 0; write(LS.meta, m); return { dayOffset: 0, today: today() }; },
  today,
};

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
      last_fed_day: null, care_streak: 0, last_care_day: null, pantry: {},
    };
    write(LS.students, st);
    ensureBlip(id, st[id]); // create the slot-1 blip up front
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
    ensureBlip(s.id, rec);
    const progress = read(LS.progress, {})[s.id] || {};
    const totalXp = Object.values(progress).reduce((a, p) => a + (p.total_xp || 0), 0);
    const health = computeHealth(rec.last_fed_day, rec.care_streak);
    const blips = blipsView(s.id);
    const slot1 = blips.find(b => b.slot === 1) || null;
    const { running } = termConfig();
    const canFeedToday = health.stage < 2 && (rec.last_fed_day == null || rec.last_fed_day < today());
    const canCareToday = health.stage >= 2 && isQualDay() && (rec.last_care_day == null || rec.last_care_day < today());
    return {
      ok: true, student: { id: s.id, name: s.display_name, username: s.username }, progress, totalXp, openQuests: openQuests(),
      gold: rec.gold, xp: rec.xp, levelInfo: levelInfo(rec.xp),
      blip: slot1 ? { name: slot1.name, colour: slot1.colour, owned: slot1.owned, equipped: slot1.equipped } : { name: "Blip", colour: "cream", owned: [], equipped: {} },
      blips, shop: shopCatalogue(), foodShop: foodCatalogue(), pantry: rec.pantry || {},
      health, canFeedToday, canCareToday, termRunning: running,
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
  async buyItem(username, password, item, slot = 1) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    slot = (slot === 1 || slot === 2) ? slot : 1;
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    ensureBlip(s.id, rec);
    const stage = computeHealth(rec.last_fed_day, rec.care_streak).stage;

    const food = FOOD_ITEMS.find(f => f.id === item);
    if (food) {
      if (food.kind === "treat") {
        if (stage >= 2) return { ok: false, error: "REFUSES_FOOD" };
        if (rec.gold < food.price) return { ok: false, error: "gold", price: food.price, gold: rec.gold };
        rec.gold -= food.price; write(LS.students, stAll);
        return { ok: true, gold: rec.gold, treat: true };
      }
      // soup / medicine — pharmacy is ALWAYS open, even at critical
      if (rec.gold < food.price) return { ok: false, error: "gold", price: food.price, gold: rec.gold };
      rec.gold -= food.price;
      rec.pantry = { ...(rec.pantry || {}) };
      rec.pantry[food.id] = (rec.pantry[food.id] || 0) + 1;
      write(LS.students, stAll);
      return { ok: true, gold: rec.gold, pantry: rec.pantry };
    }

    const itm = SHOP_ITEMS.find(x => x.id === item);
    if (!itm) return { ok: false, error: "no_item" };
    if (stage >= 3) return { ok: false, error: "BLIP_TOO_SICK" };
    const blips = ensureBlip(s.id, rec);
    const blip = blips.find(b => b.slot === slot);
    if (!blip) return { ok: false, error: "no_blip" };
    if (blip.owned_items.includes(item)) return { ok: false, error: "owned" };
    const lvl = levelInfo(rec.xp).level;
    if (lvl < itm.minLevel) return { ok: false, error: "locked", minLevel: itm.minLevel };
    if (rec.gold < itm.price) return { ok: false, error: "gold", price: itm.price, gold: rec.gold };
    rec.gold -= itm.price;
    blip.owned_items = [...blip.owned_items, item];
    write(LS.students, stAll); writeBlips(s.id, blips);
    return { ok: true, gold: rec.gold, owned: blip.owned_items, slot };
  },
  async equip(username, password, { equipped, colour, blipName, slot = 1 } = {}) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    slot = (slot === 1 || slot === 2) ? slot : 1;
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const stage = computeHealth(rec.last_fed_day, rec.care_streak).stage;
    if (stage >= 2) return { ok: false, error: "BLIP_TOO_SICK" };  // he won't get up
    const blips = ensureBlip(s.id, rec);
    const blip = blips.find(b => b.slot === slot);
    if (!blip) return { ok: false, error: "no_blip" };

    if (equipped != null) {
      if (typeof equipped !== "object" || Array.isArray(equipped)) return { ok: false, error: "bad_equipped" };
      const bad = Object.entries(equipped).some(([k, v]) => !VALID_SLOTS.includes(k) || (!!v && !blip.owned_items.includes(v)));
      if (bad) return { ok: false, error: "bad_equipped" };
      blip.equipped = { ...equipped };
    }
    if (colour != null) {
      if (!VALID_COLOURS.includes(colour)) return { ok: false, error: "bad_colour" };
      // slot-1's first non-cream colour needs xp>0; the 2nd blip is any colour at hatch
      if (colour !== "cream" && slot === 1 && rec.xp <= 0) return { ok: false, error: "colour_locked" };
      blip.colour = colour;
    }
    if (blipName != null) {
      const nm = String(blipName).trim().slice(0, 24);
      if (!nm) return { ok: false, error: "bad_name" };
      blip.name = nm;
    }
    writeBlips(s.id, blips);
    return { ok: true, slot, blip: { name: blip.name, colour: blip.colour, owned: blip.owned_items, equipped: blip.equipped } };
  },
  async gallery(username, password) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    ensureBlip(s.id, rec);
    const myStage = computeHealth(rec.last_fed_day, rec.care_streak).stage;
    if (myStage >= 3) return { ok: false, error: "BLIP_TOO_SICK" };  // gallery locked at critical
    const myBlips = blipsView(s.id).map(b => ({ slot: b.slot, colour: b.colour, equipped: b.equipped, feedCount: b.feedCount, growthStage: b.growthStage }));
    const slot1 = myBlips.find(b => b.slot === 1) || { colour: rec.blip_colour, equipped: {} };
    const mine = { username: rec.username, level: levelInfo(rec.xp).level, me: true, stage: myStage, colour: slot1.colour, equipped: slot1.equipped, blips: myBlips };
    const others = FAKE_CLASSMATES.map(c => {
      const s1 = c.blips.find(b => b.slot === 1) || c.blips[0];
      return { username: c.username, level: c.level, me: false, stage: c.stage, colour: s1.colour, equipped: s1.equipped, blips: c.blips };
    });
    const rows = [mine, ...others].sort((a, b) => a.username.localeCompare(b.username));
    return { ok: true, gallery: rows };
  },

  // ---- Blip: Phase 2 feeding / care / second blip ----
  async feed(username, password) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const blips = ensureBlip(s.id, rec);
    const stage = computeHealth(rec.last_fed_day, rec.care_streak).stage;
    if (stage >= 2) return { ok: false, error: "REFUSES_FOOD" };
    if (rec.last_fed_day != null && rec.last_fed_day >= today()) return { ok: false, error: "already_fed" };
    blips.forEach(b => { b.feed_count = (b.feed_count || 0) + 1; }); // household growth
    rec.last_fed_day = today();
    write(LS.students, stAll); writeBlips(s.id, blips);
    return { ok: true, blips: blipsView(s.id).map(b => ({ slot: b.slot, name: b.name, colour: b.colour, feedCount: b.feedCount, growthStage: b.growthStage })),
      health: computeHealth(rec.last_fed_day, rec.care_streak), canFeedToday: false };
  },
  async care(username, password) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const stage = computeHealth(rec.last_fed_day, rec.care_streak).stage;
    if (stage < 2) return { ok: false, error: "not_sick" };
    if (!isQualDay()) return { ok: false, error: "not_care_day" };
    if (rec.last_care_day != null && rec.last_care_day >= today()) return { ok: false, error: "already_cared" };
    const nSoup = (rec.pantry && rec.pantry.soup) || 0;
    const nMed = (rec.pantry && rec.pantry.medicine) || 0;
    if (nSoup < 1 || nMed < 1) return { ok: false, error: "need_supplies", needSoup: nSoup < 1, needMedicine: nMed < 1 };
    rec.pantry = { ...(rec.pantry || {}), soup: nSoup - 1, medicine: nMed - 1 };

    const { onSince } = termConfig();
    let newStreak;
    if (rec.last_care_day == null) {
      newStreak = 1;
    } else {
      const from = Math.max(rec.last_care_day, onSince == null ? rec.last_care_day : onSince);
      const skipped = countQualWeekdays(from, today() - 1);
      newStreak = skipped === 0 ? (rec.care_streak || 0) + 1 : 1;
    }
    let healed = false;
    rec.last_care_day = today();
    if (newStreak >= BLIP.careDaysToHeal) {
      healed = true; newStreak = 0; rec.last_fed_day = today(); // back to healthy; growth kept
    }
    rec.care_streak = newStreak;
    write(LS.students, stAll);
    return { ok: true, healed, pantry: rec.pantry, health: computeHealth(rec.last_fed_day, rec.care_streak) };
  },
  async claimSecondBlip(username, password, name, colour) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const blips = ensureBlip(s.id, rec);
    if (levelInfo(rec.xp).level < BLIP.secondBlipLevel) return { ok: false, error: "level_locked", minLevel: BLIP.secondBlipLevel };
    if (blips.some(b => b.slot === 2)) return { ok: false, error: "already_claimed" };
    const col = colour || "cream";
    if (!VALID_COLOURS.includes(col)) return { ok: false, error: "bad_colour" };
    const nm = String(name || "").trim().slice(0, 24);
    if (!nm) return { ok: false, error: "bad_name" };
    blips.push({ slot: 2, name: nm, colour: col, feed_count: 0, owned_items: [], equipped: {} });
    writeBlips(s.id, blips);
    return { ok: true, blips: blipsView(s.id) };
  },

  // ---- admin ----
  async adminLogin(pw) { seed(); return { ok: read(LS.meta, {}).adminPassword === pw }; },
  async adminData(pw) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const students = read(LS.students, {}), progress = read(LS.progress, {}), struggles = read(LS.struggles, {}), quests = read(LS.quests, {});
    const rows = Object.values(students).map(s => {
      ensureBlipFields(s);
      const blips = getBlips(s.id);
      const slot1 = blips.find(b => b.slot === 1);
      return {
        id: s.id, name: s.display_name, username: s.username, hasPassword: s.password != null, lastActive: s.last_active_at,
        totalXp: Object.values(progress[s.id] || {}).reduce((a, p) => a + (p.total_xp || 0), 0),
        health: computeHealth(s.last_fed_day, s.care_streak),
        growthStage: slot1 ? growthStage(slot1.feed_count) : 0,
        blipCount: blips.length,
        quests: progress[s.id] || {},
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
    const qs = Object.keys(quests).sort((a, b) => quests[a].sort - quests[b].sort).map(q => ({ quest_id: q, is_open: quests[q].is_open }));
    const cByConcept = {};
    Object.values(struggles).forEach(byC => Object.entries(byC).forEach(([c, v]) => {
      const g = cByConcept[c] || (cByConcept[c] = { concept: c, count: 0, students: 0 });
      g.count += v.count; g.students += 1;
    }));
    const { running, onSince } = termConfig();
    return { ok: true, rows, quests: qs, struggles: Object.values(cByConcept).sort((a, b) => b.count - a.count), inactiveDays: 7,
      termRunning: running, termOnSince: onSince };
  },
  async adminSetQuestOpen(pw, quest, open) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const q = read(LS.quests, {}); if (q[quest]) { q[quest].is_open = !!open; write(LS.quests, q); } return { ok: true };
  },
  async adminSetTerm(pw, running) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const m = read(LS.meta, {});
    m.term_running = !!running;
    if (running) m.term_on_since = today(); // turning ON stamps today = forgives accrued sickness
    write(LS.meta, m);
    return { ok: true, termRunning: !!running, termOnSince: m.term_on_since };
  },
  async setTerm(pw, running) { return this.adminSetTerm(pw, running); },
  async adminResetPassword(pw, id) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const st = read(LS.students, {}); if (st[id]) { st[id].password = null; write(LS.students, st); } return { ok: true };
  },
  async adminRemoveStudent(pw, id) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const st = read(LS.students, {}); delete st[id]; write(LS.students, st);
    const bl = read(LS.blips, {}); delete bl[id]; write(LS.blips, bl); return { ok: true };
  },
  async adminResetProgress(pw, id) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const pr = read(LS.progress, {}); delete pr[id]; write(LS.progress, pr);
    const sg = read(LS.struggles, {}); delete sg[id]; write(LS.struggles, sg);
    // mirrors mhq_admin_reset_progress: XP (level) drops to 0, but gold,
    // owned items, equipped set, colour, nickname AND the blip(s) are all kept.
    const st = read(LS.students, {}); if (st[id]) { st[id].xp = 0; write(LS.students, st); }
    return { ok: true };
  },
  async adminResolveStruggle(pw, concept) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const all = read(LS.struggles, {}); Object.values(all).forEach(byC => delete byC[concept]); write(LS.struggles, all); return { ok: true };
  },
};
