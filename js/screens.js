/* Hub (chapter blocks), chapter (quest map, gated by open/closed) and results. */
import { CHAPTERS, chapterById, questAccent, PASS } from "./config.js";
import { questDef } from "./quests/index.js";
import { el, clear } from "./ui.js";
import { openCalculator } from "./calculator.js";
import { maybeShowInstall } from "./install.js";
import { renderCompanion } from "./companion/renderer.js";
import { equippedToAccessories, itemLabel } from "./companion/blip-ui.js";
import { openColourUnlock } from "./companion/unlock-modal.js";

function setTheme(chapterSig, accent) {
  const r = document.documentElement.style;
  if (chapterSig) r.setProperty("--chapter", chapterSig);
  if (accent) r.setProperty("--accent", accent);
}
const progressOf = (app, id) => (app.state && app.state.progress && app.state.progress[id]) || { best_score: 0, attempts: 0, passed: false, total_xp: 0 };
const openSet = app => new Set((app.state && app.state.openQuests) || []);

/* ---------------- HUB ---------------- */
/* the two tabs; current term first, revision (already-taught chapters) below */
const TABS = [
  { id: "term3", label: "Term 3", sub: "This term’s homework" },
  { id: "revision", label: "Revision", sub: "Earlier chapters to revise" },
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

export function renderHub(app, host) {
  setTheme("#b17f22", "#b17f22");
  const name = ((app.state && app.state.student && app.state.student.name) || "").split(" ")[0];
  const head = el("div", "hub-head");
  head.innerHTML = `<span class="eyebrow">Grade 11 Maths</span><h1>Hi, ${name || "there"} 👋</h1><p class="muted small">Pick a chapter to practise.</p>`;
  host.appendChild(head);

  if (app.state && app.state.blip) {
    const blip = app.state.blip;
    const tile = el("div", "hub-blip");
    tile.innerHTML = `<div class="hb-stage"></div>
      <div class="hb-info"><div class="hb-name">${blip.name || "Blip"}</div><div class="hb-cta">Tap to visit Blip →</div></div>`;
    renderCompanion(tile.querySelector(".hb-stage"), { colour: blip.colour, accessories: equippedToAccessories(blip.equipped) });
    tile.addEventListener("click", () => app.go("blip"));
    host.appendChild(tile);
  }

  try { maybeShowInstall(host); } catch { /* non-critical */ }

  const open = openSet(app);
  const byTerm = (t) => CHAPTERS.filter(ch => (ch.term || "term3") === t);

  // only show tabs that actually have chapters
  const tabs = TABS.filter(t => byTerm(t.id).length);
  if (!tabs.some(t => t.id === hubTab)) hubTab = tabs[0] ? tabs[0].id : "term3";

  const tabbar = el("div", "hub-tabs");
  const cards = el("div", "chapter-cards");
  const draw = () => {
    clear(cards);
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
  const {
    chapter, quest, accent, score, firstTry, total, badgeEarned, alreadyPassed,
    xpAwarded, goldAwarded, levelUp, level, firstUnlock, unlockedItem,
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
    <div class="result-reward">★ +${xpAwarded ?? 0} XP · 🪙 +${goldAwarded ?? 0} gold</div>
    <div class="result-msg ${passed ? "good" : "warn"}">${passed ? "Quest passed — badge earned!" : "So close! Get 80% right first-time to earn the badge."}</div>
    ${badgeEarned ? `<div class="badge-pop"><span class="bi">${chapter.icon}</span>${quest.title} mastered</div>` : ""}
    ${alreadyPassed ? `<div class="result-msg">Replay — already mastered, so this round paid a smaller XP top-up.</div>` : ""}
    ${levelUp ? `<div class="result-levelup">Level ${level}!${unlockedItem ? ` New in the shop: ${itemLabel(unlockedItem)}.` : ""}</div>` : ""}
    <div class="result-actions"></div>`;
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
