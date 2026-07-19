/* ============================================================
   GALLERY — "everyone's Blips". A showcase, not a leaderboard: no
   scores, no ranking, alphabetical exactly as the backend returns it.
   Fetches mhq_gallery fresh on each visit (not part of getState).
   ============================================================ */
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el, clear } from "./ui.js";
import { renderCompanion } from "./companion/renderer.js";
import { equippedToAccessories } from "./companion/blip-ui.js";

export function renderGallery(app, host) {
  clear(host);
  const sess = getSession();

  const head = el("div", "blip-head");
  head.innerHTML = `<div><span class="eyebrow">Showcase</span><h1>Everyone's Blips</h1></div>
    <button class="link-btn back" aria-label="Back">←</button>`;
  head.querySelector(".back").addEventListener("click", () => app.go("blip"));
  host.appendChild(head);

  const body = el("div", "gallery-body");
  body.appendChild(el("p", "muted small center", "Loading…"));
  host.appendChild(body);

  api.gallery(sess.username, sess.password).then((r) => {
    clear(body);
    if (!r || !r.ok) { body.appendChild(el("p", "muted small center", "Couldn't load the gallery — try again later.")); return; }
    const grid = el("div", "gallery-grid");
    (r.gallery || []).forEach((row) => {
      const card = el("div", "gallery-card" + (row.me ? " me" : ""));
      card.innerHTML = `<div class="gc-stage"></div>
        <div class="gc-name">${row.username}${row.me ? " (you)" : ""}</div>
        <div class="gc-level">Level ${row.level}</div>`;
      renderCompanion(card.querySelector(".gc-stage"), { colour: row.colour, accessories: equippedToAccessories(row.equipped) });
      grid.appendChild(card);
    });
    body.appendChild(grid);
  }).catch(() => {
    clear(body);
    body.appendChild(el("p", "muted small center", "Can't reach the server — try again later."));
  });
}
