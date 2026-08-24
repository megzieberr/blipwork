/* Hub (chapter blocks), chapter (quest map, gated by open/closed) and results. */
import { CHAPTERS, chapterById, questAccent, PASS, CQ_URL, DICE_CHAPTERS, FUNFUN_ENABLED, PAPERS_ENABLED, EXAM_CHAPTERS, examChapters, examChapterById } from "./config.js";
import { questDef } from "./quests/index.js";
import { dicePool } from "./quests/dice-pools.js";
import { openDiceRound } from "./dice-play.js";
import { examQuestionsForTopic, examFirstCardForSkill } from "./exam/index.js";
import { skillsForChapter, isLevel4Skill } from "./exam/skills.js";
import { getExamLang, uiStr } from "./exam/lang.js";
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el, clear, showToast } from "./ui.js";
import { openCalculator } from "./calculator.js";
import { renderBlip, playMoment } from "./companion/renderer.js";
import { itemLabel } from "./companion/blip-ui.js";
import { openColourUnlock } from "./companion/unlock-modal.js";
import { renderAssignmentCard } from "./assignment.js";
import { mountCqCollect } from "./cq-collect.js";
import { mountPapers } from "./papers.js";
/* FUNFUN-PART2-BRIEF.md (2026-08-23) — js/funfun/ is a SYNCED COPY of the
   graph-quest app (generated output, never hand-edited). Only three things
   are read from it here: the quest list, its grandfathered unlock rule, and
   its bilingual-string resolver. Everything else about a Fun Functions quest
   happens inside the shadow root js/funfun-play.js builds. */
import { QUESTS as FF_QUESTS } from "./funfun/quests/index.js";
import { questUnlocked as ffUnlocked } from "./funfun/screens.js";
import { L as ffL, setLang as ffSetLang } from "./funfun/i18n.js";

/* Fun Functions' L() reads a MODULE-LEVEL language that defaults to Afrikaans
   (its standalone remembers the learner's toggle in localStorage under
   "gq.lang"). Blipwork and the standalone live on the SAME ORIGIN
   (megzieberr.github.io), so that key is genuinely shared — a learner who
   once opened the standalone would otherwise see Afrikaans quest names here.
   Brief D6: blipwork is English and never shows the toggle. `persist:false`
   is the mount's own idiom: set it for this read only, never write it back
   into the shared key. */
const ffTitle = (q) => { ffSetLang("en", { persist: false }); return ffL(q.title); };

/* ---------------- Phase 2 helpers (mirrors blip.js's normalizers —
   duplicated rather than shared, since this file and blip.js are each
   owned independently; keep both in sync if the contract shifts).
   renderBlip (companion/renderer.js) owns growth/health scaling and
   sick-accessory-hiding itself, applied via `transform` on whatever
   element it's given — so mountBlip just needs a plain nested div,
   not a sizing helper of our own. */
function mountBlip(hostEl, opts) {
  const inner = el("div");
  hostEl.appendChild(inner);
  return renderBlip(inner, opts);
}
function normalizeBlips(state) {
  const legacy = (state && state.blip) || { name: "Blip", colour: "cream", owned: [], equipped: {} };
  if (Array.isArray(state.blips) && state.blips.length) {
    return state.blips.map((b, i) => ({
      slot: b.slot != null ? b.slot : i,
      name: b.name || "Blip",
      colour: b.colour || "cream",
      growthStage: b.growthStage || 0,
      equipped: (b.equipped && typeof b.equipped === "object") ? b.equipped : (i === 0 ? (legacy.equipped || {}) : {}),
    }));
  }
  return [{ slot: 0, name: legacy.name, colour: legacy.colour, growthStage: 0, equipped: legacy.equipped || {} }];
}
function normalizeHealth(state) {
  const h = (state && state.health) || {};
  const locks = h.locks || {};
  return {
    stage: h.stage || 0,
    recovering: !!h.recovering,
    careStreak: Math.max(0, Math.min(3, h.careStreak || 0)),
    locks: { dress: !!locks.dress, shop: !!locks.shop, gallery: !!locks.gallery },
  };
}
const readyFlag = (v) => (v === undefined ? true : !!v);

/* Sick-state login warning: dismissible per stage, not per render — a
   fresh escalation (e.g. stage 1 -> 3) shows again even if the
   learner dismissed the earlier, gentler line. Resets on page reload. */
let dismissedForStage = null;
function sickBanner(health) {
  if (health.stage < 1 || dismissedForStage === health.stage) return null;
  const stage = health.stage;
  const msg = stage >= 3
    ? "Blip really needs you today — soup and medicine would help a lot."
    : stage === 2 ? "Blip isn't feeling great and is resting in bed."
    : "Blip isn't feeling great…";
  const banner = el("div", "card sick-banner");
  banner.innerHTML = `<span class="sb-icon">${stage >= 3 ? "💔" : "😴"}</span><span class="sb-text">${msg}</span><button class="sb-x" aria-label="Dismiss">✕</button>`;
  banner.querySelector(".sb-x").addEventListener("click", () => { dismissedForStage = stage; banner.remove(); });
  return banner;
}

function setTheme(chapterSig, accent) {
  const r = document.documentElement.style;
  if (chapterSig) r.setProperty("--chapter", chapterSig);
  if (accent) r.setProperty("--accent", accent);
}
/* EXAM FOCUS · the Level 4 tile's own colour (2026-08-23). Deliberately
   NOT the chapter's signature: the brave round is amber everywhere in
   this tab, matching the per-part star badge (.exam-star reads --warn)
   so a learner meets one consistent "this is the hard one" colour. Same
   legendary gold the palette already uses, spelled out here because
   .quest's --qc wants a real colour value, not a token name. */
const L4_ACCENT = "#fbbf24";

const progressOf = (app, id) => (app.state && app.state.progress && app.state.progress[id]) || { best_score: 0, attempts: 0, passed: false, total_xp: 0 };
const openSet = app => new Set((app.state && app.state.openQuests) || []);

/* EXAM FOCUS · teacher-gate eligibility (session E ruling, 2026-08-21):
   "if Probability is closed, then the Probability Exam Focus rounds
   should also be closed." A chapter's exam focus is reachable only when
   BOTH the build switch (js/config.js EXAM_CHAPTERS) includes it AND at
   least one of its quests is open (state.openQuests) — replaces session
   0's flag-only gate. Exported so js/exam-play.js's player guard can
   reuse the identical rule rather than re-deriving it. */
export function examChapterEligible(app, ch) {
  if (!ch || !EXAM_CHAPTERS.includes(ch.id)) return false;
  /* HER RULING, morning of 2026-08-22 (EXAM-FOCUS-PLAN.md): an
     EXAM-FOCUS-ONLY chapter — Euclidean, whose drill rounds live in
     Circle Quest and always will — owns NO quests, so the "at least one
     open quest" half of the session-E gate could never be satisfied and
     the chapter could never be reached. Documented exception, her call:
     an exam-only chapter is eligible on its build flag alone. The gate
     it loses is not the gate it needed — the flag (js/config.js
     EXAM_CHAPTERS) is still the teacher's switch for it. */
  if (ch.examOnly) return true;
  const open = openSet(app);
  return (ch.quests || []).some(q => open.has(q.id));
}

/* ---------------- HUB ---------------- */
/* the three tabs; current term first, revision (already-taught chapters)
   below, Circle Geo last. Circle Geo isn't chapter-based (CQ-BRIDGE-PLAN.md
   Part 2 — it's an out-link, not a chapter), so it's excluded from the
   byTerm() filter below and drawn by circleGeoCard() instead. */
const TABS = [
  { id: "term3", label: "Term 3", sub: "This term’s homework" },
  { id: "revision", label: "Revision", sub: "Earlier chapters to revise" },
  // EXAM-FOCUS-PLAN.md, session 0 (2026-08-21): the tab only ever shows
  // when at least one chapter is ELIGIBLE — session E ruling (2026-08-21)
  // widened this from "flagged on" to "flagged on AND has an open quest"
  // (examChapterEligible() above) — "if Probability is closed, its Exam
  // Focus rounds are closed too." NOT chapter-based the way term3/
  // revision are (a chapter here is exam-focus content, not a quest
  // chapter), so it's excluded from the byTerm() filter below, same as
  // Circle Geo.
  { id: "exam", label: "📝 Exam Focus", sub: "Real exam questions, one part at a time" },
  { id: "cgeo", label: "⭕ Circle Geo", sub: "Circle Quest" },
  // FEEDBACK-PAPERS-BRIEF.md (2026-08-24): practice + past papers,
  // downloadable from a PRIVATE bucket. Not chapter-based either, so it
  // is excluded from the byTerm() filter exactly like cgeo — and it is
  // additionally gated on PAPERS_ENABLED, so it does not exist at all
  // until the edge functions are deployed and she has uploaded one.
  { id: "papers", label: "📄 Papers", sub: "Practice + past papers" },
];
let hubTab = "term3";                                   // remembered across hub visits

function chapterCard(app, ch, open) {
  const live = ch.open && !ch.comingSoon;
  const card = el("div", "ch-card" + (live ? "" : " locked"));
  card.style.setProperty("--cc", ch.signature);
  card.style.setProperty("--accent", ch.signature);
  if (live) {
    const openQ = (ch.quests || []).filter(q => open.has(q.id));
    const total = openQ.length;
    const done = openQ.filter(q => progressOf(app, q.id).passed).length;
    const pct = total ? Math.round(done / total * 100) : 0;
    card.innerHTML = `
      <div class="ico">${ch.icon}</div>
      <h2>${ch.name} <span class="pill ${total ? "open" : "soon"}">${total ? "Open" : "Soon"}</span></h2>
      <p>${ch.blurb || ""}</p>
      <div class="ch-meta"><span>${total ? `${total} quest${total > 1 ? "s" : ""} open` : "Opening soon"}</span>${total ? `<span class="num">${done} / ${total} done</span>` : ""}</div>
      ${total ? `<div class="ch-prog" style="--p:${pct}%"><i></i></div>` : ""}
      <div class="ch-foot"></div>`;
    const btn = el("button", "btn primary", "Enter chapter →");
    btn.addEventListener("click", () => app.go("chapter", { chapterId: ch.id }));
    card.querySelector(".ch-foot").appendChild(btn);
  } else {
    card.innerHTML = `<div class="ico">${ch.icon}</div><h2>${ch.name} <span class="pill soon">Soon</span></h2><p>Opens once we’ve covered it in class.</p>`;
  }
  return card;
}

/* ---------------- HUB · Circle Geo tab (CQ-BRIDGE-PLAN.md Part 2 + 3) ----------------
   One plain card, not a chapter card — no per-chapter accent to key off.
   Circle Quest is reached by a plain out-link (a new tab, her ruling: never
   merged, never iframed); the learner logs in there with their own CQ
   password, same as always. The .cg-collect div is the mount point for the
   session-3 Collect panel (js/cq-collect.js) — it renders nothing itself
   when the learner has no cq_name link (mountCqCollect's own rule). */
function circleGeoCard(app) {
  const card = el("div", "card cg-card");
  card.innerHTML = `
    <div class="ico">⭕</div>
    <h2>Circle Quest</h2>
    <p>Your circle geometry quests live in Circle Quest.</p>
    <a class="btn primary big cg-open" href="${CQ_URL}" target="_blank" rel="noopener">Open Circle Quest</a>`;
  card.appendChild(el("div", "cg-collect"));
  card.querySelector(".cg-collect").setAttribute("data-mount", "cq-collect");
  mountCqCollect(app, card.querySelector(".cg-collect"));
  return card;
}

/* ---------------- HUB · Papers tab (FEEDBACK-PAPERS-BRIEF.md, 2026-08-24)
   ---------------- One plain card, same shape as the Circle Geo one above
   and for the same reason: papers aren't a chapter, so there's no
   per-chapter accent to key off. The .pp-mount div is the mount point for
   the list (js/papers.js) — the fetch is async, so this function returns
   a card with a "Loading papers…" line in it and mountPapers fills it in.
   The list itself is auth-gated server-side; the files are behind an edge
   function holding the service role (see js/papers.js's header). */
function papersCard(app) {
  const card = el("div", "card pp-card");
  card.innerHTML = `
    <div class="ico">📄</div>
    <h2>Papers</h2>
    <p>Practice papers and past papers to download and work through.</p>`;
  const mount = el("div", "pp-mount");
  mount.setAttribute("data-mount", "papers");
  card.appendChild(mount);
  mountPapers(app, mount);
  return card;
}

/* ---------------- HUB · Exam Focus tab (EXAM-FOCUS-PLAN.md, session 0;
   gating widened session E, 2026-08-21) ---------------- One card per
   ELIGIBLE chapter (examChapterEligible() above) — session 0 shipped
   this gated purely on EXAM_CHAPTERS ("NOT gated by the teacher's
   per-quest open/closed toggle"); her ruling that same evening replaced
   that reading: exam focus now DOES follow the teacher's per-quest gate,
   same as chapterCard() above, on top of the build flag. Shows the
   topic COUNT only — "worked N of M" lives one screen deeper, per
   topic, where it actually means something. */
function examChapterCard(app, ch) {
  const card = el("div", "ch-card");
  card.style.setProperty("--cc", ch.signature);
  card.style.setProperty("--accent", ch.signature);
  const skills = skillsForChapter(ch.id);
  card.innerHTML = `
    <div class="ico">${ch.icon}</div>
    <h2>${ch.name}</h2>
    <p>${ch.blurb || ""}</p>
    <div class="ch-meta"><span>${skills.length} skill${skills.length === 1 ? "" : "s"}</span></div>
    <div class="ch-foot"></div>`;
  const btn = el("button", "btn primary", "Enter chapter →");
  btn.addEventListener("click", () => app.go("examChapter", { chapterId: ch.id }));
  card.querySelector(".ch-foot").appendChild(btn);
  return card;
}

export function renderHub(app, host) {
  setTheme("#3aa0ff", "#3aa0ff"); // hub neutral = the system's own electric blue
  const name = ((app.state && app.state.student && app.state.student.name) || "").split(" ")[0];
  const head = el("div", "hub-head");
  head.innerHTML = `<span class="eyebrow">Grade 11 Maths</span>
    <div class="hub-head-row"><h1>Hi, ${name || "there"} 👋</h1></div>
    <p class="muted small">Pick a chapter to practise.</p>`;
  host.appendChild(head);

  const health = normalizeHealth(app.state || {});
  const banner = sickBanner(health);
  if (banner) host.appendChild(banner);

  // Phase 3: teacher-assigned homework — pinned above the blip button and the
  // chapter tabs. Appends nothing and returns null when nothing is assigned.
  renderAssignmentCard(app, host);

  // Room build S1 (2026-08-08): the rectangular "tap to visit Blip" card is
  // gone — a small pulsing button beside the greeting is the only entry
  // point now. Feeding moved entirely onto the Blip screen (now his room),
  // which has its own top-right daily cookie button — the hub no longer
  // shows a cookie badge at all.
  if (app.state && (app.state.blip || app.state.blips)) {
    const blips = normalizeBlips(app.state);
    const primary = blips[0];
    const btn = el("button", "hub-blip-btn", "");
    btn.type = "button";
    btn.title = "Visit Blip";
    btn.setAttribute("aria-label", "Visit Blip");
    btn.innerHTML = `<div class="hbb-stage"><div class="blip-pedestal"><i></i></div></div>`;
    mountBlip(btn.querySelector(".hbb-stage"), {
      colour: primary.colour, equipped: primary.equipped, growthStage: primary.growthStage,
      healthStage: health.stage, recovering: health.recovering,
    });
    btn.addEventListener("click", () => app.go("blip"));
    const row = head.querySelector(".hub-head-row");
    row.appendChild(btn);
  }

  const open = openSet(app);
  const byTerm = (t) => CHAPTERS.filter(ch => (ch.term || "term3") === t);

  // only show tabs that actually have chapters — except Circle Geo, which
  // isn't chapter-based and always shows (CQ-BRIDGE-PLAN.md Part 2); Exam
  // Focus is examChapterEligible()-gated instead (EXAM-FOCUS-PLAN.md,
  // session 0's flag-only gate, widened session E, 2026-08-21, to also
  // require an open quest) — hidden entirely, not just empty, when no
  // flagged chapter has one. (The `t.id === "cgeo" || byTerm(t.id).length`
  // prefix is kept byte-for-byte — verify-store.html regex-checks that
  // exact substring.)
  // 📄 Papers rides on the same "not chapter-based" exemption as cgeo, on
  // its build flag alone — but its clause goes on the END: the
  // `t.id === "cgeo" || byTerm(t.id).length` prefix is kept byte-for-byte
  // because verify-store.html regex-checks that exact substring.
  const tabs = TABS.filter(t => t.id === "cgeo" || byTerm(t.id).length || (t.id === "exam" && examChapters().some(ch => examChapterEligible(app, ch))) || (t.id === "papers" && PAPERS_ENABLED));
  if (!tabs.some(t => t.id === hubTab)) hubTab = tabs[0] ? tabs[0].id : "term3";

  const tabbar = el("div", "hub-tabs");
  const cards = el("div", "chapter-cards");
  const draw = () => {
    clear(cards);
    if (hubTab === "cgeo") { cards.appendChild(circleGeoCard(app)); return; }
    if (hubTab === "papers") { cards.appendChild(papersCard(app)); return; }
    // EXAM-ONLY CHAPTERS (2026-08-22): examChapters() = CHAPTERS + the
    // exam-only list, so Euclidean shows HERE and only here. byTerm()
    // below still reads CHAPTERS, so it can never reach a Term 3 or
    // Revision tab — an exam-only chapter has no term to be filed under.
    if (hubTab === "exam") { examChapters().filter(ch => examChapterEligible(app, ch)).forEach(ch => cards.appendChild(examChapterCard(app, ch))); return; }
    byTerm(hubTab).forEach(ch => cards.appendChild(chapterCard(app, ch, open)));
  };
  tabs.forEach(t => {
    const b = el("button", "hub-tab" + (t.id === hubTab ? " active" : ""));
    b.innerHTML = `${t.label}<span class="ht-sub">${t.sub}</span>`;
    b.addEventListener("click", () => {
      hubTab = t.id;
      [...tabbar.children].forEach(c => c.classList.remove("active"));
      b.classList.add("active");
      draw();
    });
    tabbar.appendChild(b);
  });
  if (tabs.length > 1) host.appendChild(tabbar);
  host.appendChild(cards);
  draw();
}

/* ---------------- CHAPTER · quest map (only OPEN quests show) ---------------- */
export function renderChapter(app, host, params) {
  const ch = chapterById(params.chapterId);
  if (!ch) return app.go("hub");
  setTheme(ch.signature, ch.signature);

  const head = el("div", "chap-head");
  head.innerHTML = `<div><span class="eyebrow">${ch.icon} ${ch.name}</span><h1>Quests</h1></div>
    <div style="display:flex;gap:8px;align-items:center">
      <button class="calc-btn" title="Calculator" aria-label="Open calculator">🧮</button>
      <button class="link-btn back" aria-label="Back">←</button>
    </div>`;
  head.querySelector(".back").addEventListener("click", () => app.go("hub"));
  head.querySelector(".calc-btn").addEventListener("click", () => openCalculator());
  host.appendChild(head);

  const open = openSet(app);
  const quests = (ch.quests || []).filter(q => open.has(q.id));
  if (!quests.length) {
    host.appendChild(el("div", "card", `<p class="muted center" style="padding:20px 0">No quests open yet — your teacher opens each one once it’s been taught. Check back soon!</p>`));
    return;
  }

  const grid = el("div", "quest-grid");

  // DICE-PLAN.md 🎲 — visible only when this chapter is BOTH allow-listed
  // (config.js DICE_CHAPTERS) AND has a pool wired (js/quests/dice-pools.js).
  // NEVER locked, regardless of quest gating above — a kid who skips
  // straight to dice practice is a kid practising maths (her ruling).
  // Learner-facing and deliberately stat-free: no best score, no streak —
  // just the card itself and the round's own results screen after.
  if (DICE_CHAPTERS.includes(ch.id) && dicePool(ch.id)) {
    const dcard = el("div", "quest dice-card");
    dcard.style.setProperty("--qc", ch.signature);
    dcard.innerHTML = `
      <div class="qn">🎲</div>
      <h3>Dice round</h3>
      <p>Fresh numbers every roll — practise as many rounds as you like.</p>
      <div class="qstate"><span class="led"></span>Always open</div>`;
    dcard.addEventListener("click", () => {
      if (dcard.classList.contains("busy")) return;
      dcard.classList.add("busy");
      Promise.resolve(openDiceRound(app, ch)).catch(() => showToast("Couldn’t start the dice round — check your connection.", "error"))
        .finally(() => dcard.classList.remove("busy"));
    });
    grid.appendChild(dcard);
  }

  // FUNFUN-PART2-BRIEF.md D7 📈 — the Fun Functions strip: 15 tiles, one per
  // graph-quest quest, mounted one at a time by js/funfun-play.js. Sits AFTER
  // the 🎲 card and BEFORE the static quest cards, spanning the grid. Like the
  // dice it is NEVER gated by the teacher's open/close switches (her ruling:
  // a kid who skips straight to practice is a kid practising maths) — but it
  // still lives below the "no quests open yet" return above, so a chapter the
  // class hasn't started shows nothing at all.
  if (FUNFUN_ENABLED && ch.id === "func") grid.appendChild(funfunStrip(app, ch));

  quests.forEach(q => {
    const accent = questAccent(ch, q.n);
    const def = questDef(q.id);
    const playable = q.built && !!def;
    const prog = progressOf(app, q.id);
    const card = el("div", "quest" + (playable ? "" : " locked"));
    card.style.setProperty("--qc", accent);
    const state = !playable ? "Coming soon" : prog.passed ? "Mastered" : prog.attempts ? "In progress" : "Open";
    card.innerHTML = `
      <div class="qn">${q.n}</div>
      ${prog.passed ? '<div class="qcheck">✓</div>' : ""}
      <h3>${q.title}</h3>
      <p>${q.blurb || ""}</p>
      <div class="qstate"><span class="led"></span>${state}</div>`;
    if (playable) card.addEventListener("click", () => app.go("play", { chapter: ch, quest: q, def, accent }));
    grid.appendChild(card);
  });
  host.appendChild(grid);
}

/* ---------------- FUN FUNCTIONS strip (brief D7) ----------------
   Built synchronously (renderChapter is sync) with a placeholder line, then
   repainted once the learner's Fun Functions profile arrives. The profile is
   its OWN call — mhq_funfun_state, not a new field bolted onto mhq_get_state
   (brief D3, the copy-forward danger the dice migration's header spells out).
   If it can't be fetched (offline, or the migration not applied yet) the strip
   still draws with an empty profile: quest 1 open, the rest locked, and a
   plain line saying so — never a blank space the learner can't explain. */
function funfunStrip(app, ch) {
  const block = el("div", "ff-strip");
  block.innerHTML = `<div class="ff-strip-head">
      <span class="ff-strip-title">📈 Fun Functions</span>
      <span class="muted small">Always open</span>
    </div>
    <p class="muted small ff-strip-blurb">Drag, tap and read the graphs. Tap a quest to play it.</p>
    <div class="ff-tiles"><p class="muted small ff-strip-msg">Loading your progress…</p></div>`;
  const tiles = block.querySelector(".ff-tiles");

  const paint = (profileIn, note) => {
    if (!block.isConnected) return;                 // the learner walked off mid-fetch
    const profile = { quests: (profileIn && profileIn.quests) || {}, met: (profileIn && profileIn.met) || {} };
    tiles.textContent = "";
    if (note) block.insertBefore(el("p", "muted small ff-strip-msg", note), tiles);
    FF_QUESTS.forEach((q, i) => {
      const st = profile.quests[q.id] || {};
      const locked = !ffUnlocked(profile, i);
      // `best` is a 0..1 fraction (see migration-funfun.sql / local-backend.js)
      const pct = st.plays > 0 ? Math.round((st.best || 0) * 100) : null;
      const tile = el("button", "ff-tile" + (locked ? " locked" : ""));
      tile.type = "button";
      tile.disabled = locked;
      tile.style.setProperty("--qc", q.accent || ch.signature);
      tile.innerHTML = `<span class="qn">${locked ? "🔒" : i + 1}</span>
        ${st.done ? '<span class="qcheck">✓</span>' : ""}
        <span class="ff-tt">${ffTitle(q)}</span>
        <span class="ff-ts">${pct == null ? (locked ? "Locked" : "Open") : pct + "%"}</span>`;
      if (locked) tile.title = "Finish the quest before this one to open it.";
      else tile.addEventListener("click", () => app.go("funfunPlay", { chapter: ch, questId: q.id }));
      tiles.appendChild(tile);
    });
  };

  const sess = getSession();
  const blank = { quests: {}, met: {} };
  const offline = "Couldn’t load your Fun Functions progress — only the first quest is open until it loads.";
  if (!sess) { paint(blank, offline); return block; }
  api.funfunState(sess.username, sess.password)
    .then(r => (r && r.ok) ? paint(r) : paint(blank, offline))
    .catch(() => paint(blank, offline));
  return block;
}

/* ---------------- EXAM FOCUS · skill tiles (EXAM-SKILLS-BRIEF.md, Session
   B, 2026-08-22 — replaces the old topic-list -> question-list two-step).
   ---------------- tab -> CHAPTER -> SKILL TILE -> straight into the
   player, no intermediate question-list screen (her drawing: "tap a tile
   -> straight into the first card, no list screen"). One tile per skill
   in js/exam/skills.js's skillsForChapter() order — including a skill
   with zero cards yet, which renders muted/"coming soon" and un-tappable
   (gtrig's Identities / Super Special Sums, per the brief's table).

   Progress round-trip: fired ONCE per screen load (progressPromise),
   shared by both the "worked k of n" fill-in below AND every tile's own
   click handler (which needs the SAME progress map to resolve
   examFirstCardForSkill's "first not-completed card" rule) — a learner
   tapping a tile before the fetch settles still gets exactly one network
   call, not two. */
export function renderExamChapter(app, host, params) {
  const ch = examChapterById(params.chapterId);   // CHAPTERS + EXAM_ONLY_CHAPTERS (2026-08-22)
  if (!examChapterEligible(app, ch)) return app.go("hub");   // build flag AND an open quest (session E)
  setTheme(ch.signature, ch.signature);
  const lang = getExamLang();
  const ui = uiStr(lang);

  const head = el("div", "chap-head");
  head.innerHTML = `<div><span class="eyebrow">${ch.icon} ${ch.name}</span><h1>${ui.tabLabel}</h1></div>
    <div style="display:flex;gap:8px;align-items:center">
      <button class="link-btn back" aria-label="Back">←</button>
    </div>`;
  head.querySelector(".back").addEventListener("click", () => app.go("hub"));
  host.appendChild(head);

  /* THE LEVEL 4 TILE GOES LAST (her ruling 5, 2026-08-23 —
     EXAM-BUILD-DAY.md): "Levels 1-3 on the normal tiles; every chapter
     gets a last tile Level 4 ★ … the low achievers must never meet a ★
     while drilling basics." js/exam/skills.js already lists it last in
     every chapter, so this sort normally changes nothing — it is here so
     that a chapter whose list is edited later can never accidentally
     bury the brave round in the middle of the grid. Stable: everything
     else keeps her order exactly. */
  const skills = skillsForChapter(ch.id)
    .map((sk, i) => ({ sk, i }))
    .sort((a, b) => (Number(isLevel4Skill(a.sk.id)) - Number(isLevel4Skill(b.sk.id))) || (a.i - b.i))
    .map(x => x.sk);
  if (!skills.length) {
    host.appendChild(el("div", "card", `<p class="muted center" style="padding:20px 0">${ui.noTopicsYet}</p>`));
    return;
  }

  // one real backend round trip for this whole screen (see header note).
  const sess = getSession();
  const progressPromise = sess
    ? api.examState(sess.username, sess.password).then(res => (res && res.ok) ? (res.progress || {}) : {}).catch(() => ({}))
    : Promise.resolve({});

  const grid = el("div", "exam-skill-grid");
  skills.forEach(skill => {
    const cards = examQuestionsForTopic(ch.id, skill.id);
    const empty = !cards.length;
    /* The Level 4 tile is its own thing: full width across the bottom of
       the grid, amber rather than the chapter's own colour, and a
       one-line note under the label saying what it is for. It still goes
       muted / "coming soon" with no cards, exactly like any other tile —
       nothing about being the brave round makes it tappable early. */
    const isL4 = isLevel4Skill(skill.id);
    const card = el("div", "quest exam-skill-card" + (isL4 ? " exam-tile-l4" : "") + (empty ? " locked" : ""));
    card.style.setProperty("--qc", isL4 ? L4_ACCENT : ch.signature);
    card.innerHTML = `<h3>${skill.label}</h3>`
      + (isL4 ? `<p class="muted small exam-tile-l4-note">mixed hard questions — for when the basics sit</p>` : "")
      + `<p class="muted small exam-skill-count">${empty ? ui.comingSoon : `${cards.length} card${cards.length === 1 ? "" : "s"}`}</p>`;
    if (!empty) {
      card.addEventListener("click", () => {
        if (card.classList.contains("busy")) return;   // double-submit rule
        card.classList.add("busy");
        progressPromise.then(progress => {
          card.classList.remove("busy");
          const first = examFirstCardForSkill(ch.id, skill.id, progress);
          if (!first) return;   // shouldn't happen (cards.length > 0 checked above) — never a dead end
          app.go("examPlay", {
            chapter: ch, skillId: skill.id, question: first, accent: ch.signature,
            onBack: () => app.go("examChapter", { chapterId: ch.id }),
          });
        });
      });
    }
    grid.appendChild(card);
  });
  host.appendChild(grid);

  fillWorkedCounts(ch.id, skills, grid, ui, progressPromise);
}

async function fillWorkedCounts(chapterId, skills, grid, ui, progressPromise) {
  const progress = await progressPromise;
  if (!progress || !Object.keys(progress).length) return;   // offline / no session — leave "n cards" showing
  const cards = [...grid.querySelectorAll(".exam-skill-card")];
  skills.forEach((skill, i) => {
    const qs = examQuestionsForTopic(chapterId, skill.id);
    if (!qs.length) return;   // "coming soon" tiles keep their own text
    const done = qs.filter(q => progress[q.id] && progress[q.id].completed).length;
    const line = cards[i] && cards[i].querySelector(".exam-skill-count");
    if (line) line.textContent = ui.workedOf(done, qs.length);
  });
}

/* ---------------- RESULTS ---------------- */
export function renderResults(app, host, params) {
  const {
    chapter, quest, accent, score, firstTry, total, badgeEarned, alreadyPassed,
    xpAwarded, goldAwarded, levelUp, level, firstUnlock, unlockedItem, unlockedCount,
  } = params;
  setTheme(chapter.signature, accent);
  const pct = Math.round(score * 100);
  const passed = score >= PASS;

  const screen = el("div", "results");
  screen.style.setProperty("--accent", accent);
  const card = el("div", "card result-card");
  card.innerHTML = `
    <div class="result-emoji">${passed ? "🎉" : "💪"}</div>
    <h1>Quest complete</h1>
    <div class="big-score">${pct}%</div>
    <p class="muted">${firstTry} / ${total} right first time</p>
    <div class="result-reward system-notice"><span class="sys-label">Reward</span><div class="sys-value">+${xpAwarded ?? 0} XP · +${goldAwarded ?? 0} <span class="crystal">💎</span></div></div>
    <div class="result-msg ${passed ? "good" : "warn"}">${passed ? "Quest passed — badge earned!" : "So close! Get 80% right first-time to earn the badge."}</div>
    ${badgeEarned ? `<div class="badge-pop"><span class="bi">${chapter.icon}</span>${quest.title} mastered</div>` : ""}
    ${alreadyPassed ? `<div class="result-msg">${(questDef(quest.id) || {}).xpOnce ? "Replay of a discovery round — it paid its XP the first time; this one was free practice." : "Replay — already mastered, so this round paid a smaller XP top-up."}</div>` : ""}
    ${levelUp ? `<div class="result-levelup system-notice"><span class="sys-label">System</span><div class="sys-value"><span class="sparkle tw">✦</span> LEVEL UP — LV. ${level} <span class="sparkle tw">✦</span></div>${unlockedItem ? `<div class="sys-sub">New unlock: ${itemLabel(unlockedItem)}${unlockedCount > 1 ? ` +${unlockedCount - 1} more in the shop` : ""}</div>` : ""}</div>` : ""}
    <div class="result-actions"></div>`;

  // Results screen mounts no Blip normally (unlike the hub/blip screens),
  // so a pass here gets its own small celebratory mount beside the
  // reward notice, playing the jumping moment once — matches the brief's
  // "plays on the results-screen blip if one is rendered there; if the
  // results screen renders no blip, mount a small one" ruling. Uses the
  // household's PRIMARY blip (slot 0) — this screen has no slot-switcher
  // concept of its own the way blip.js does.
  if (passed && app.state && (app.state.blip || app.state.blips)) {
    const blips = normalizeBlips(app.state);
    const health = normalizeHealth(app.state);
    const primary = blips[0];
    const rewardNotice = card.querySelector(".result-reward");
    const miniWrap = el("div", "result-blip-mini");
    const miniStage = el("div");
    miniWrap.appendChild(miniStage);
    if (rewardNotice) rewardNotice.insertAdjacentElement("afterend", miniWrap);
    else card.insertBefore(miniWrap, card.querySelector(".result-actions"));
    const miniHandle = renderBlip(miniStage, {
      colour: primary.colour, equipped: primary.equipped, growthStage: primary.growthStage,
      healthStage: health.stage, recovering: health.recovering, size: 90,
    });
    playMoment(miniHandle, "jumping");
  }

  const actions = card.querySelector(".result-actions");
  const mk = (label, primary, fn) => { const b = el("button", "btn " + (primary ? "primary" : "ghost"), label); b.addEventListener("click", fn); actions.appendChild(b); };
  const replay = () => app.go("play", { chapter, quest, def: questDef(quest.id), accent });
  const toChapter = () => app.go("chapter", { chapterId: chapter.id });

  if (firstUnlock) {
    const cta = el("button", "btn primary big result-unlock-btn", "🎨 Pick Blip's colour");
    cta.addEventListener("click", () => openColourUnlock(app, () => { app.refresh().then(() => app.render()); }));
    card.insertBefore(cta, actions);
  }

  if (passed) { mk("Back to quests", true, toChapter); mk("Play again", false, replay); }
  else { mk("Try again", true, replay); mk("Back to quests", false, toChapter); }
  screen.appendChild(card);
  host.appendChild(screen);
}

/* ---------------- FUN FUNCTIONS RESULTS (brief D9) ----------------
   Modelled on renderDiceResults, and separate from it for the same reason it
   is separate from renderResults: no pass/fail, no badge, no mastery language
   on this card. The only "you finished it" signal a learner ever sees is the
   ✓ the strip tile picks up afterwards.

   `correct` is a SCORE, not a count, and it may be fractional — a question got
   right on the second chance is worth half a mark — so it renders as e.g.
   "3.5 / 6". Both numbers come from the server's own recompute (mhq_submit_
   funfun), never from the client's tally. */
export function renderFunfunResults(app, host, params) {
  const { chapter, accent, questId, total, ok, xpAwarded, goldAwarded, levelUp, level } = params;
  setTheme(chapter.signature, accent);
  const q = FF_QUESTS.find(x => x.id === questId);
  const correct = Number(params.correct) || 0;
  const items = Number(total) || 0;
  const pct = items ? Math.round((correct / items) * 100) : 0;
  // SA decimal COMMA (foreman review fix, 2026-08-23): blipwork's own maths
  // content writes 0,5 — a half-credit score reads "3,5 / 6", never "3.5".
  // No trailing ",0" on a whole score.
  const scored = String(Math.round(correct * 100) / 100).replace(".", ",");

  const screen = el("div", "results");
  screen.style.setProperty("--accent", accent);
  const card = el("div", "card result-card");
  card.innerHTML = `
    <div class="result-emoji">📈</div>
    <h1>${q ? ffTitle(q) : "Fun Functions"} complete</h1>
    <div class="big-score">${pct}%</div>
    <p class="muted">${scored} / ${items}</p>
    <div class="result-reward system-notice"><span class="sys-label">Reward</span><div class="sys-value">+${xpAwarded ?? 0} XP · +${goldAwarded ?? 0} <span class="crystal">💎</span></div></div>
    ${ok ? "" : `<div class="result-msg warn">Couldn’t reach the server to pay this round out — check your connection and try again later; what you did in this round wasn’t lost.</div>`}
    ${levelUp ? `<div class="result-levelup system-notice"><span class="sys-label">System</span><div class="sys-value"><span class="sparkle tw">✦</span> LEVEL UP — LV. ${level} <span class="sparkle tw">✦</span></div></div>` : ""}
    <div class="result-actions"></div>`;

  const actions = card.querySelector(".result-actions");
  // her double-submit rule: one tap only, flagged before anything navigates
  let spent = false;
  const mk = (label, primary, fn) => {
    const b = el("button", "btn " + (primary ? "primary" : "ghost"), label);
    b.addEventListener("click", () => { if (spent) return; spent = true; b.disabled = true; fn(); });
    actions.appendChild(b);
  };
  mk("Play again", true, () => app.go("funfunPlay", { chapter, questId }));
  mk("Back to quests", false, () => app.go("chapter", { chapterId: chapter.id }));

  screen.appendChild(card);
  host.appendChild(screen);
}

/* ---------------- DICE RESULTS (DICE-PLAN.md, session 0b) ----------------
   Deliberately NOT renderResults with a `dice` flag bolted on — dice has no
   pass/fail, no badge, no mastery language, so a separate small screen
   keeps that ruling honest instead of a maze of `passed ? … : …` branches
   for a mode with nothing to pass. Stat-free ruling only covers the
   CHAPTER page (no best score/streak there) — the round's own results
   screen is explicitly fine (DICE-PLAN). */
export function renderDiceResults(app, host, params) {
  const { chapter, accent, correct, total, ok, xpAwarded, goldAwarded, levelUp, level } = params;
  setTheme(chapter.signature, accent);
  const pct = total ? Math.round((correct / total) * 100) : 0;

  const screen = el("div", "results");
  screen.style.setProperty("--accent", accent);
  const card = el("div", "card result-card");
  card.innerHTML = `
    <div class="result-emoji">🎲</div>
    <h1>Dice round complete</h1>
    <div class="big-score">${pct}%</div>
    <p class="muted">${correct} / ${total} right</p>
    <div class="result-reward system-notice"><span class="sys-label">Reward</span><div class="sys-value">+${xpAwarded ?? 0} XP · +${goldAwarded ?? 0} <span class="crystal">💎</span></div></div>
    ${ok ? "" : `<div class="result-msg warn">Couldn’t reach the server to pay this round out — check your connection and try again later; your progress in this round wasn’t lost.</div>`}
    ${levelUp ? `<div class="result-levelup system-notice"><span class="sys-label">System</span><div class="sys-value"><span class="sparkle tw">✦</span> LEVEL UP — LV. ${level} <span class="sparkle tw">✦</span></div></div>` : ""}
    <div class="result-actions"></div>`;

  const actions = card.querySelector(".result-actions");
  const mk = (label, primary, fn) => { const b = el("button", "btn " + (primary ? "primary" : "ghost"), label); b.addEventListener("click", fn); actions.appendChild(b); };
  mk("Roll again", true, () => openDiceRound(app, chapter));
  mk("Back to quests", false, () => app.go("chapter", { chapterId: chapter.id }));

  screen.appendChild(card);
  host.appendChild(screen);
}
