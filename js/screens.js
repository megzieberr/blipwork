/* Hub (chapter blocks), chapter (quest map, gated by open/closed) and results. */
import { CHAPTERS, chapterById, questAccent, PASS, CQ_URL, DICE_CHAPTERS, EXAM_CHAPTERS, examChapters, examChapterById } from "./config.js";
import { questDef } from "./quests/index.js";
import { dicePool } from "./quests/dice-pools.js";
import { openDiceRound } from "./dice-play.js";
import { examTopicsForChapter, examQuestionsForTopic } from "./exam/index.js";
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
      <h2>${ch.name} <span class="pill open">Open</span></h2>
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
  const topics = examTopicsForChapter(ch.id);
  card.innerHTML = `
    <div class="ico">${ch.icon}</div>
    <h2>${ch.name}</h2>
    <p>${ch.blurb || ""}</p>
    <div class="ch-meta"><span>${topics.length} topic${topics.length === 1 ? "" : "s"}</span></div>
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
  const tabs = TABS.filter(t => t.id === "cgeo" || byTerm(t.id).length || (t.id === "exam" && examChapters().some(ch => examChapterEligible(app, ch))));
  if (!tabs.some(t => t.id === hubTab)) hubTab = tabs[0] ? tabs[0].id : "term3";

  const tabbar = el("div", "hub-tabs");
  const cards = el("div", "chapter-cards");
  const draw = () => {
    clear(cards);
    if (hubTab === "cgeo") { cards.appendChild(circleGeoCard(app)); return; }
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

/* ---------------- EXAM FOCUS · topic list (EXAM-FOCUS-PLAN.md, session 0)
   ---------------- tab -> CHAPTER -> topic -> question -> player. This
   screen is the chapter step: one card per topic registered in
   js/exam/index.js for this chapter, "N questions" up front and "worked
   N of M" filled in after a round trip (mhq_exam_state) resolves — the
   list never blocks its first paint on the network. EN/AF toggle lives
   here (and on every screen deeper in the tab) and re-renders the WHOLE
   screen on flip via app.go(), same route the card clicks already take —
   simpler than hand-patching every localized string in place, and this
   screen has no per-part state worth preserving across a toggle. */
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

  const topics = examTopicsForChapter(ch.id);
  if (!topics.length) {
    host.appendChild(el("div", "card", `<p class="muted center" style="padding:20px 0">${ui.noTopicsYet}</p>`));
    return;
  }

  const grid = el("div", "exam-topic-grid");
  topics.forEach(topic => {
    const qs = examQuestionsForTopic(ch.id, topic.id);
    const card = el("div", "quest exam-topic-card");
    card.style.setProperty("--qc", ch.signature);
    card.innerHTML = `<h3>${topic.label}</h3><p class="muted small exam-topic-count">${qs.length} question${qs.length === 1 ? "" : "s"}</p>`;
    card.addEventListener("click", () => app.go("examTopic", { chapterId: ch.id, topicId: topic.id }));
    grid.appendChild(card);
  });
  host.appendChild(grid);

  fillWorkedCounts(ch.id, topics, grid, ui);
}

async function fillWorkedCounts(chapterId, topics, grid, ui) {
  const sess = getSession();
  if (!sess) return;
  let progress;
  try {
    const res = await api.examState(sess.username, sess.password);
    if (!res || !res.ok) return;
    progress = res.progress || {};
  } catch { return; }
  const cards = [...grid.querySelectorAll(".exam-topic-card")];
  topics.forEach((topic, i) => {
    const qs = examQuestionsForTopic(chapterId, topic.id);
    const done = qs.filter(q => progress[q.id] && progress[q.id].completed).length;
    const line = cards[i] && cards[i].querySelector(".exam-topic-count");
    if (line) line.textContent = ui.workedOf(done, qs.length);
  });
}

/* ---------------- EXAM FOCUS · question list ---------------- one card
   per seeded question in this topic; a ✓ badge (mirrors .qcheck's look
   from the quest grid) marks a question already completed. Clicking a
   question resolves the real question OBJECT here (not just an id) and
   hands it straight to renderExamPlay via app.go("examPlay", …) — the
   player never has to know how to look a question up. */
export function renderExamTopic(app, host, params) {
  const ch = examChapterById(params.chapterId);   // CHAPTERS + EXAM_ONLY_CHAPTERS (2026-08-22)
  if (!examChapterEligible(app, ch)) return app.go("hub");   // build flag AND an open quest (session E)
  const topic = examTopicsForChapter(ch.id).find(tp => tp.id === params.topicId);
  if (!topic) return app.go("examChapter", { chapterId: ch.id });
  setTheme(ch.signature, ch.signature);
  const lang = getExamLang();
  const ui = uiStr(lang);

  const head = el("div", "chap-head");
  head.innerHTML = `<div><span class="eyebrow">${ch.icon} ${ch.name}</span><h1>${topic.label}</h1></div>
    <div style="display:flex;gap:8px;align-items:center">
      <button class="link-btn back" aria-label="Back">←</button>
    </div>`;
  head.querySelector(".back").addEventListener("click", () => app.go("examChapter", { chapterId: ch.id }));
  host.appendChild(head);

  const questions = examQuestionsForTopic(ch.id, topic.id);
  if (!questions.length) {
    host.appendChild(el("div", "card", `<p class="muted center" style="padding:20px 0">${ui.noQuestionsYet}</p>`));
    return;
  }

  const grid = el("div", "exam-question-grid");
  questions.forEach((q, i) => {
    const card = el("div", "quest exam-question-card");
    card.style.setProperty("--qc", ch.signature);
    card.innerHTML = `<div class="qn">${i + 1}</div><h3>${q.marks} marks</h3><p class="muted small">${q.parts.length} part${q.parts.length === 1 ? "" : "s"}</p>`;
    card.addEventListener("click", () => app.go("examPlay", {
      chapter: ch, topicId: topic.id, question: q, accent: ch.signature,
      onBack: () => app.go("examTopic", params),
    }));
    grid.appendChild(card);
  });
  host.appendChild(grid);

  fillCompletedChecks(questions, grid);
}

async function fillCompletedChecks(questions, grid) {
  const sess = getSession();
  if (!sess) return;
  let progress;
  try {
    const res = await api.examState(sess.username, sess.password);
    if (!res || !res.ok) return;
    progress = res.progress || {};
  } catch { return; }
  const cards = [...grid.querySelectorAll(".exam-question-card")];
  questions.forEach((q, i) => {
    if (progress[q.id] && progress[q.id].completed && cards[i]) {
      cards[i].insertAdjacentHTML("afterbegin", `<div class="qcheck">✓</div>`);
    }
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
