/* Hub (chapter blocks), chapter (quest map, gated by open/closed) and results. */
import { CHAPTERS, chapterById, questAccent, PASS } from "./config.js";
import { questDef } from "./quests/index.js";
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el, clear, showToast } from "./ui.js";
import { openCalculator } from "./calculator.js";
import { maybeShowInstall } from "./install.js";
import { renderBlip, playMoment } from "./companion/renderer.js";
import { itemLabel } from "./companion/blip-ui.js";
import { openColourUnlock } from "./companion/unlock-modal.js";
import { renderAssignmentCard } from "./assignment.js";

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
  setTheme("#3aa0ff", "#3aa0ff"); // hub neutral = the system's own electric blue
  const name = ((app.state && app.state.student && app.state.student.name) || "").split(" ")[0];
  const head = el("div", "hub-head");
  head.innerHTML = `<span class="eyebrow">Grade 11 Maths</span><h1>Hi, ${name || "there"} 👋</h1><p class="muted small">Pick a chapter to practise.</p>`;
  host.appendChild(head);

  const health = normalizeHealth(app.state || {});
  const banner = sickBanner(health);
  if (banner) host.appendChild(banner);

  // Phase 3: teacher-assigned homework — pinned above the blip tile and the
  // chapter tabs. Appends nothing and returns null when nothing is assigned.
  renderAssignmentCard(app, host);

  if (app.state && (app.state.blip || app.state.blips)) {
    const blips = normalizeBlips(app.state);
    const tile = el("div", "hub-blip");
    tile.innerHTML = `<div class="hb-stages${blips.length > 1 ? " two" : ""}"></div>
      <div class="hb-info"><div class="hb-name">${blips.map(b => b.name).join(" & ")}</div><div class="hb-cta">Tap to visit Blip →</div></div>`;
    // gentle, non-nagging feed prompt — a small badge, not a popup
    // (hoisted above the stage mounts — they need it too, for the idle
    // hungry-loop hint)
    const canFeedToday = readyFlag(app.state.canFeedToday);
    const stagesHost = tile.querySelector(".hb-stages");
    const blipHandles = blips.map((b) => {
      const s = el("div", "hb-stage");
      s.innerHTML = `<div class="blip-pedestal"><i></i></div>`;
      stagesHost.appendChild(s);
      return mountBlip(s, { colour: b.colour, equipped: b.equipped, growthStage: b.growthStage, healthStage: health.stage, recovering: health.recovering, hungry: canFeedToday });
    });
    tile.addEventListener("click", () => app.go("blip"));

    if (canFeedToday) {
      const badge = el("button", "cookie-badge", "🍪");
      badge.type = "button";
      badge.title = "Feed Blip";
      badge.addEventListener("click", async (e) => {
        e.stopPropagation();
        badge.disabled = true;
        const sess = getSession();
        try {
          const r = await api.feed(sess.username, sess.password);
          if (!r || !r.ok) {
            const code = r && r.error;
            showToast(code === "REFUSES_FOOD" ? `${blips[0].name} doesn't feel like eating right now.` : "Something went wrong — try again.", "error");
            badge.disabled = false; return;
          }
          blipHandles.forEach((h) => playMoment(h, "excited"));
          showToast(blips.length > 1 ? `${blips[0].name} and ${blips[1].name} shared a cookie!` : `${blips[0].name} enjoyed a cookie!`, "good");
          await app.refresh(); app.render();
        } catch { showToast("Can't reach the server — try again.", "error"); badge.disabled = false; }
      });
      tile.appendChild(badge);
    }
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
    <div class="result-reward system-notice"><span class="sys-label">Reward</span><div class="sys-value">+${xpAwarded ?? 0} XP · +${goldAwarded ?? 0} <span class="crystal">💎</span></div></div>
    <div class="result-msg ${passed ? "good" : "warn"}">${passed ? "Quest passed — badge earned!" : "So close! Get 80% right first-time to earn the badge."}</div>
    ${badgeEarned ? `<div class="badge-pop"><span class="bi">${chapter.icon}</span>${quest.title} mastered</div>` : ""}
    ${alreadyPassed ? `<div class="result-msg">Replay — already mastered, so this round paid a smaller XP top-up.</div>` : ""}
    ${levelUp ? `<div class="result-levelup system-notice"><span class="sys-label">System</span><div class="sys-value"><span class="sparkle tw">✦</span> LEVEL UP — LV. ${level} <span class="sparkle tw">✦</span></div>${unlockedItem ? `<div class="sys-sub">New unlock: ${itemLabel(unlockedItem)}</div>` : ""}</div>` : ""}
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
