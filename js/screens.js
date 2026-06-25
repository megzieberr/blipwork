/* Hub (chapter blocks), chapter (quest map, gated by open/closed) and results. */
import { CHAPTERS, chapterById, questAccent, PASS } from "./config.js";
import { questDef } from "./quests/index.js";
import { el } from "./ui.js";
import { openCalculator } from "./calculator.js";
import { maybeShowInstall } from "./install.js";

function setTheme(chapterSig, accent) {
  const r = document.documentElement.style;
  if (chapterSig) r.setProperty("--chapter", chapterSig);
  if (accent) r.setProperty("--accent", accent);
}
const progressOf = (app, id) => (app.state && app.state.progress && app.state.progress[id]) || { best_score: 0, attempts: 0, passed: false, total_xp: 0 };
const openSet = app => new Set((app.state && app.state.openQuests) || []);

/* ---------------- HUB ---------------- */
export function renderHub(app, host) {
  setTheme("#8b5cf6", "#8b5cf6");
  const name = ((app.state && app.state.student && app.state.student.name) || "").split(" ")[0];
  const head = el("div", "hub-head");
  head.innerHTML = `<span class="eyebrow">Grade 11 · Paper 2</span><h1>Hi, ${name || "there"} 👋</h1><p class="muted small">Pick a chapter to practise.</p>`;
  host.appendChild(head);

  try { maybeShowInstall(host); } catch { /* non-critical */ }

  const open = openSet(app);
  const cards = el("div", "chapter-cards");
  CHAPTERS.forEach(ch => {
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
    cards.appendChild(card);
  });
  host.appendChild(cards);
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

/* ---------------- RESULTS ---------------- */
export function renderResults(app, host, params) {
  const { chapter, quest, accent, score, xp, firstTry, total, badgeEarned, alreadyPassed } = params;
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
    <p class="muted">${firstTry} / ${total} right first time · <span class="num">★ +${xp} XP</span></p>
    <div class="result-msg ${passed ? "good" : "warn"}">${passed ? "Quest passed — badge earned!" : "So close! Get 80% right first-time to earn the badge."}</div>
    ${badgeEarned ? `<div class="badge-pop"><span class="bi">${chapter.icon}</span>${quest.title} mastered</div>` : ""}
    ${alreadyPassed ? `<div class="result-msg">Replay — already mastered, so no new XP this time.</div>` : ""}
    <div class="result-actions"></div>`;
  const actions = card.querySelector(".result-actions");
  const mk = (label, primary, fn) => { const b = el("button", "btn " + (primary ? "primary" : "ghost"), label); b.addEventListener("click", fn); actions.appendChild(b); };
  const replay = () => app.go("play", { chapter, quest, def: questDef(quest.id), accent });
  const toChapter = () => app.go("chapter", { chapterId: chapter.id });
  if (passed) { mk("Back to quests", true, toChapter); mk("Play again", false, replay); }
  else { mk("Try again", true, replay); mk("Back to quests", false, toChapter); }
  screen.appendChild(card);
  host.appendChild(screen);
}
