/* ============================================================
   FIRST-ROUND COLOUR UNLOCK — the designed onboarding payoff.
   Shown once, right after the learner's very first completed round
   (server enforces xp > 0 for any non-cream pick; play.js only opens
   this when it detects xp went from 0 to >0 on this submission).
   ============================================================ */
import { api } from "../api.js";
import { getSession } from "../session.js";
import { el, showToast } from "../ui.js";
import { renderCompanion } from "./renderer.js";
import { renderSwatchGrid, equippedToAccessories } from "./blip-ui.js";

export function openColourUnlock(app, onDone) {
  const sess = getSession();
  const blip = (app.state && app.state.blip) || { colour: "cream", equipped: {} };
  let picked = blip.colour || "cream";

  const scrim = el("div", "modal-scrim");
  const modal = el("div", "modal unlock-modal");
  modal.innerHTML = `
    <div class="mhead"><span class="meyebrow">New unlock</span><button class="link-btn close" aria-label="Close">✕</button></div>
    <h2>Pick Blip's colour</h2>
    <p class="muted small" style="margin-bottom:14px">First round done — Blip can wear any colour now. Change it any time from the Blip screen.</p>
    <div class="unlock-stage"></div>`;
  const stage = modal.querySelector(".unlock-stage");
  renderCompanion(stage, { colour: picked, accessories: equippedToAccessories(blip.equipped) });

  const swatches = renderSwatchGrid({
    current: picked, locked: false,
    onPick: (id) => {
      picked = id;
      [...swatches.children].forEach(b => b.classList.toggle("active", b.dataset.colour === id));
      renderCompanion(stage, { colour: picked, accessories: equippedToAccessories(blip.equipped) });
    },
  });
  modal.appendChild(swatches);

  const btn = el("button", "btn primary big", "Set colour");
  modal.appendChild(btn);
  scrim.appendChild(modal);

  const close = () => { scrim.remove(); onDone && onDone(); };
  modal.querySelector(".close").addEventListener("click", close);
  scrim.addEventListener("click", e => { if (e.target === scrim) close(); });

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    try {
      const r = await api.equip(sess.username, sess.password, { colour: picked });
      if (!r || !r.ok) { showToast("Couldn't save that colour — try again.", "error"); btn.disabled = false; return; }
      showToast("Blip's colour is set!", "good");
      close();
    } catch { showToast("Can't reach the server — try again.", "error"); btn.disabled = false; }
  });

  document.body.appendChild(scrim);
}
