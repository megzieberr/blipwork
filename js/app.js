/* App controller: shell, routing, session boot, backend-agnostic state. */
import { api } from "./api.js";
import { getSession, isLoggedIn, clearSession } from "./session.js";
import { el, clear } from "./ui.js";
import { renderLogin } from "./auth.js";
import { renderHub, renderChapter, renderResults, renderDiceResults, renderFunfunResults, renderExamChapter } from "./screens.js";
import { renderPlay } from "./play.js";
import { renderExamPlay } from "./exam-play.js";
import { renderFunfunPlay, destroyFunfunMount } from "./funfun-play.js";
import { renderBlip } from "./blip.js";
import { closeActiveTour } from "./companion/tour.js";
import { renderGallery } from "./gallery.js";
import { registerServiceWorker } from "./pwa.js";
import { mountFeedback } from "./feedback.js";

const app = {
  root: null, state: null, screen: "login", params: {},

  async boot() {
    this.root = document.getElementById("app");
    registerServiceWorker();                     // make the app installable (fire-and-forget)
    if (isLoggedIn()) { const ok = await this.refresh(); if (!ok) clearSession(); }
    // Room build §1 (2026-08-09, her ruling): the room is home. Login lands
    // Blip's room, not the hub — the study desk is what opens the quests now.
    this.go(isLoggedIn() ? "blip" : "login");
  },

  // pull the learner's state (progress, XP, open quests) from the backend
  async refresh() {
    const s = getSession();
    if (!s) return false;
    try { const r = await api.getState(s.username, s.password); if (!r || !r.ok) return false; this.state = r; return true; }
    catch { return false; }
  },

  // Room tutorial fix (session 6, 2026-08-21): the tour overlay mounts on
  // <body>, outside #app, so render()'s clear(this.root) never reaches it.
  // go() is the one choke point every navigation runs through (logout
  // included, via this.go("login")) — closing any live tour here means a
  // screen swap mid-tour can never leave it stranded on top of whatever
  // renders next.
  // FUNFUN-PART2-BRIEF.md D8 (2026-08-23): the Fun Functions mount lives in
  // a shadow root on the funfunPlay screen and must be torn down whenever
  // that screen goes away — back, finish, logout, anything. go() is the one
  // choke point every navigation runs through, so destroying here means a
  // second mount can never start while one is still alive.
  go(screen, params) { closeActiveTour(); destroyFunfunMount(); this.screen = screen; this.params = params || {}; window.scrollTo(0, 0); this.render(); },
  logout() { clearSession(); this.state = null; this.go("login"); },

  render() {
    clear(this.root);
    // EXAM-FOCUS-PLAN.md, session 0 + EXAM-SKILLS-BRIEF.md, Session B
    // (2026-08-22): examChapter is a nav screen (skill tiles), same
    // posture as "chapter" — it gets the top chrome. examTopic is GONE
    // (dead code removed — tapping a tile goes straight to the player,
    // no intermediate question-list screen). examPlay does NOT get
    // chrome, matching "play" — the part player is the focused,
    // distraction-free pen-and-paper screen (no HUD).
    const chromeScreens = ["hub", "chapter", "blip", "gallery", "examChapter"];
    if (chromeScreens.includes(this.screen) && this.state) this.root.appendChild(chrome(this));
    const view = el("main", "view");
    this.root.appendChild(view);
    switch (this.screen) {
      case "login": renderLogin(this, view); break;
      case "hub": renderHub(this, view); break;
      case "chapter": renderChapter(this, view, this.params); break;
      case "play": renderPlay(this, view, this.params); break;
      // funfunPlay gets NO chrome, matching "play": one Fun Functions quest
      // fills the screen, with only its own slim back bar above it.
      case "funfunPlay": renderFunfunPlay(this, view, this.params); break;
      // DICE-PLAN.md: dice rounds route to the SAME "results" screen id, just
      // a different renderer (params.dice flag) — no pass/fail language.
      // FUNFUN-PART2-BRIEF.md D9: a Fun Functions quest lands on the same
      // "results" screen id with its own renderer (params.funfun), exactly
      // the way the dice does — the three cards share nothing but the route.
      case "results":
        if (this.params && this.params.funfun) renderFunfunResults(this, view, this.params);
        else if (this.params && this.params.dice) renderDiceResults(this, view, this.params);
        else renderResults(this, view, this.params);
        break;
      case "blip": renderBlip(this, view); break;
      case "gallery": renderGallery(this, view); break;
      case "examChapter": renderExamChapter(this, view, this.params); break;
      case "examPlay": renderExamPlay(this, view, this.params); break;
      default: renderHub(this, view);
    }
    // FEEDBACK-PAPERS-BRIEF.md (2026-08-24): the 💬 button belongs to the
    // CHROME, not to any screen — mounted here, once, so it exists on hub,
    // chapter, play, blip, gallery, exam and results without a line of code
    // in any of those files (and cannot be forgotten in the next one).
    // It owns a single <body>-level element outside #app, which clear()
    // above never reaches, so this call only shows/hides it. Gated on
    // js/config.js's FEEDBACK_ENABLED inside mountFeedback().
    mountFeedback(this);
  },
};

/* Top HUD: gold (shop currency) + level with a mini XP-to-next-level bar.
   Tapping the level/gold chip is a quick way into the Blip screen. XP shown
   here is the lifetime levelling counter (state.xp), never the old
   per-quest totalXp badge — gold and XP are deliberately decoupled. */
function chrome(app) {
  const c = el("div", "chrome");
  const levelInfo = app.state.levelInfo || { level: 1, intoLevel: 0, nextCost: 300 };
  const pct = levelInfo.nextCost ? Math.min(100, Math.round((levelInfo.intoLevel / levelInfo.nextCost) * 100)) : 100;
  c.innerHTML = `<div class="brand"><img class="brand-logo" src="assets/companion/blip-base-blue.png" alt=""> Blipwork</div>
    <div class="chrome-right">
      <button class="hud" title="Visit Blip">
        <span class="hud-level">Lv ${levelInfo.level}</span>
        <span class="hud-bar"><i style="width:${pct}%"></i></span>
        <span class="goldchip"><span class="crystal">💎</span> <b>${app.state.gold || 0}</b></span>
      </button>
      <button class="link-btn logout" title="Log out" aria-label="Log out">⎋</button>
    </div>`;
  const brand = c.querySelector(".brand");
  brand.style.cursor = "pointer";
  // The logo means "go home" — home is the room now (room build §1).
  brand.addEventListener("click", () => app.go("blip"));
  c.querySelector(".hud").addEventListener("click", () => app.go("blip"));
  c.querySelector(".logout").addEventListener("click", () => app.logout());
  return c;
}

app.boot();
window.__APP__ = app;
