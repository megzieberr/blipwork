/* App controller: shell, routing, session boot, backend-agnostic state. */
import { api } from "./api.js";
import { getSession, isLoggedIn, clearSession } from "./session.js";
import { el, clear } from "./ui.js";
import { renderLogin } from "./auth.js";
import { renderHub, renderChapter, renderResults } from "./screens.js";
import { renderPlay } from "./play.js";
import { renderBlip } from "./blip.js";
import { renderGallery } from "./gallery.js";
import { registerServiceWorker } from "./pwa.js";

const app = {
  root: null, state: null, screen: "login", params: {},

  async boot() {
    this.root = document.getElementById("app");
    registerServiceWorker();                     // make the app installable (fire-and-forget)
    if (isLoggedIn()) { const ok = await this.refresh(); if (!ok) clearSession(); }
    this.go(isLoggedIn() ? "hub" : "login");
  },

  // pull the learner's state (progress, XP, open quests) from the backend
  async refresh() {
    const s = getSession();
    if (!s) return false;
    try { const r = await api.getState(s.username, s.password); if (!r || !r.ok) return false; this.state = r; return true; }
    catch { return false; }
  },

  go(screen, params) { this.screen = screen; this.params = params || {}; window.scrollTo(0, 0); this.render(); },
  logout() { clearSession(); this.state = null; this.go("login"); },

  render() {
    clear(this.root);
    const chromeScreens = ["hub", "chapter", "blip", "gallery"];
    if (chromeScreens.includes(this.screen) && this.state) this.root.appendChild(chrome(this));
    const view = el("main", "view");
    this.root.appendChild(view);
    switch (this.screen) {
      case "login": renderLogin(this, view); break;
      case "hub": renderHub(this, view); break;
      case "chapter": renderChapter(this, view, this.params); break;
      case "play": renderPlay(this, view, this.params); break;
      case "results": renderResults(this, view, this.params); break;
      case "blip": renderBlip(this, view); break;
      case "gallery": renderGallery(this, view); break;
      default: renderHub(this, view);
    }
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
  c.innerHTML = `<div class="brand"><img class="brand-logo" src="assets/companion/blip-base.png" alt=""> Blipwork</div>
    <div class="chrome-right">
      <button class="hud" title="Visit Blip">
        <span class="hud-level">Lv ${levelInfo.level}</span>
        <span class="hud-bar"><i style="width:${pct}%"></i></span>
        <span class="goldchip">🪙 <b>${app.state.gold || 0}</b></span>
      </button>
      <button class="link-btn logout" title="Log out" aria-label="Log out">⎋</button>
    </div>`;
  const brand = c.querySelector(".brand");
  brand.style.cursor = "pointer";
  brand.addEventListener("click", () => app.go("hub"));
  c.querySelector(".hud").addEventListener("click", () => app.go("blip"));
  c.querySelector(".logout").addEventListener("click", () => app.logout());
  return c;
}

app.boot();
window.__APP__ = app;
