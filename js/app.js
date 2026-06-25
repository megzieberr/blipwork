/* App controller: shell, routing, session boot, backend-agnostic state. */
import { api } from "./api.js";
import { getSession, isLoggedIn, clearSession } from "./session.js";
import { el, clear } from "./ui.js";
import { renderLogin } from "./auth.js";
import { renderHub, renderChapter, renderResults } from "./screens.js";
import { renderPlay } from "./play.js";
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
    if ((this.screen === "hub" || this.screen === "chapter") && this.state) this.root.appendChild(chrome(this));
    const view = el("main", "view");
    this.root.appendChild(view);
    switch (this.screen) {
      case "login": renderLogin(this, view); break;
      case "hub": renderHub(this, view); break;
      case "chapter": renderChapter(this, view, this.params); break;
      case "play": renderPlay(this, view, this.params); break;
      case "results": renderResults(this, view, this.params); break;
      default: renderHub(this, view);
    }
  },
};

function chrome(app) {
  const c = el("div", "chrome");
  c.innerHTML = `<div class="brand"><span class="dot"></span> Maths Quest</div>
    <div class="chrome-right">
      <span class="xpchip">★ <b>${app.state.totalXp || 0}</b> XP</span>
      <button class="link-btn logout" title="Log out" aria-label="Log out">⎋</button>
    </div>`;
  const brand = c.querySelector(".brand");
  brand.style.cursor = "pointer";
  brand.addEventListener("click", () => app.go("hub"));
  c.querySelector(".logout").addEventListener("click", () => app.logout());
  return c;
}

app.boot();
window.__APP__ = app;
