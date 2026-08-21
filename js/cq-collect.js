/* ============================================================
   CQ COLLECT PANEL (CQ-BRIDGE-PLAN.md Part 3, build session 3, 2026-08-21)
   ------------------------------------------------------------
   Mounts into circleGeoCard()'s empty [data-mount="cq-collect"] div
   (screens.js). Renders ONLY when app.state.cqLinked is true — a learner
   with no cq_name link just keeps session 2's card (open button only,
   the plan's "no broken collect UI" rule). Nothing here mutates app.state
   beyond the gold figure the server hands back.

   The "💎 Collect" button: disable-before-await (the double-submit house
   rule — the disable happens BEFORE the fetch, matching push.js's
   "Turn on" button and every buy/equip button in blip.js), then calls the
   collect-cq edge function, then a short reveal in the .system-notice
   idiom (screens.js results / treasure.js's .tb-notice) — reused wholesale
   rather than inventing new chrome. On a paid collect the HUD gold chip
   (app.js's .goldchip) is patched in place: unlike every buyItem call site
   in blip.js (which does `await app.refresh(); app.go(...)`, a full
   re-fetch + re-render), that would tear down the reveal we just showed —
   so here app.state.gold and the chip's own text node are updated directly
   instead, and the reveal stays on screen for the learner to read.
   ============================================================ */
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el } from "./ui.js";

function errCopy(code) {
  return ({
    cq_down: "Couldn't reach Circle Quest — try again later.",
    auth: "Session problem — try logging in again.",
    not_linked: "Circle Quest link isn't set up for this account yet.",
  })[code] || "Couldn't collect just now — try again.";
}

function renderNotice(host, kind, text) {
  host.innerHTML = "";
  const notice = el("div", "system-notice cq-collect-notice" + (kind === "error" ? " cq-collect-err" : ""));
  notice.innerHTML = `<div class="sys-value">${text}</div>`;
  host.appendChild(notice);
}

/* app: the app controller (for .state.gold + .state.cqLinked).
   hostEl: the .cg-collect[data-mount="cq-collect"] div circleGeoCard()
   builds and appends before calling this. */
export function mountCqCollect(app, hostEl) {
  if (!hostEl) return;
  hostEl.innerHTML = "";
  if (!app || !app.state || !app.state.cqLinked) return;   // plan: no broken collect UI when unlinked

  const sess = getSession();
  if (!sess || !sess.username) return;

  const wrap = el("div", "cq-collect-inner");
  const btn = el("button", "btn primary big cq-collect-btn", "💎 Collect");
  btn.type = "button";
  const reveal = el("div", "cq-collect-reveal");
  reveal.setAttribute("role", "status");
  reveal.setAttribute("aria-live", "polite");
  wrap.appendChild(btn);
  wrap.appendChild(reveal);
  hostEl.appendChild(wrap);

  btn.addEventListener("click", async () => {
    // disable-before-await — the double-submit rule, set BEFORE the call
    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = "…";

    let r = null;
    try {
      r = await api.collectCq(sess.username, sess.password);
    } catch {
      renderNotice(reveal, "error", "Can't reach the server — try again.");
      btn.disabled = false;
      btn.textContent = original;
      return;
    }

    if (!r || !r.ok) {
      renderNotice(reveal, "error", errCopy(r && r.error));
      btn.disabled = false;
      btn.textContent = original;
      return;
    }

    const paid = Number(r.paid) || 0;
    if (paid > 0) {
      renderNotice(reveal, "good", `+${paid} 💎 from your circle geometry work!`);
      // Patch the HUD in place (see file header for why this isn't
      // app.refresh()) — a second tap that pays 0 is harmless by design
      // (the watermark protects it), so re-enabling below is always safe.
      if (app.state && typeof r.gold === "number") {
        app.state.gold = r.gold;
        const chip = document.querySelector(".goldchip b");
        if (chip) chip.textContent = String(r.gold);
      }
    } else {
      renderNotice(reveal, "info", "Nothing new to collect — go play a round!");
    }
    btn.disabled = false;
    btn.textContent = original;
  });
}
