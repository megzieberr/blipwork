/* ============================================================
   GALLERY — "everyone's Blips". A showcase, not a leaderboard: no
   scores, no ranking, alphabetical exactly as the backend returns it.
   Fetches mhq_gallery fresh on each visit (not part of getState).
   ============================================================ */
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el, clear } from "./ui.js";
import { renderBlip } from "./companion/renderer.js";

/* renderBlip (companion/renderer.js) owns growth scaling itself via
   `transform` on whatever element it's given — mountBlip just needs a
   plain nested div, matching the pattern in blip.js/screens.js
   (duplicated rather than shared — each file is owned independently). */
function mountBlip(hostEl, opts) {
  const inner = el("div");
  hostEl.appendChild(inner);
  return renderBlip(inner, opts);
}
function healthLocksGallery(state) {
  return !!(state && state.health && state.health.locks && state.health.locks.gallery);
}

export function renderGallery(app, host) {
  clear(host);
  const sess = getSession();

  const head = el("div", "blip-head");
  head.innerHTML = `<div><span class="eyebrow">Showcase</span><h1>Everyone's Blips</h1></div>
    <button class="link-btn back" aria-label="Back">←</button>`;
  head.querySelector(".back").addEventListener("click", () => app.go("blip"));
  host.appendChild(head);

  // Critical-stage lock: the whole cosmetic layer (gallery included)
  // steps aside until Blip's nursed back — communicated warmly, not
  // as a punishment screen.
  if (healthLocksGallery(app.state)) {
    const locked = el("div", "card gallery-locked");
    locked.innerHTML = `<div class="gl-icon">🛌</div>
      <p>Blip is too sick to go out right now.</p>
      <p class="muted small">Give him some soup and medicine, and you'll both be back here soon.</p>`;
    host.appendChild(locked);
    return;
  }

  const body = el("div", "gallery-body");
  body.appendChild(el("p", "muted small center", "Loading…"));
  host.appendChild(body);

  api.gallery(sess.username, sess.password).then((r) => {
    clear(body);
    if (!r || !r.ok) { body.appendChild(el("p", "muted small center", "Couldn't load the gallery — try again later.")); return; }
    const grid = el("div", "gallery-grid");
    (r.gallery || []).forEach((row) => {
      // Forward-compat: if a row carries a `blips` array (a learner
      // with two Blips), show one card per Blip; otherwise fall back
      // to the single colour/equipped shape the backend returns today.
      const rowBlips = Array.isArray(row.blips) && row.blips.length
        ? row.blips
        : [{ name: row.username, colour: row.colour, equipped: row.equipped, growthStage: row.growthStage }];
      rowBlips.forEach((b, i) => {
        const card = el("div", "gallery-card" + (row.me ? " me" : ""));
        const label = rowBlips.length > 1 ? `${row.username} · ${b.name || "Blip"}` : `${row.username}${row.me ? " (you)" : ""}`;
        card.innerHTML = `<div class="gc-stage"></div>
          <div class="gc-name">${label}</div>
          <div class="gc-level">${i === 0 ? `Level ${row.level}` : "&nbsp;"}</div>`;
        mountBlip(card.querySelector(".gc-stage"), { colour: b.colour, equipped: b.equipped, growthStage: b.growthStage || 0 });
        grid.appendChild(card);
      });
    });
    body.appendChild(grid);
  }).catch(() => {
    clear(body);
    body.appendChild(el("p", "muted small center", "Can't reach the server — try again later."));
  });
}
