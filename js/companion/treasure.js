/* ============================================================
   TREASURE BOX — Phase 3 (PHASE-3-PLAN.md §3 / §4.2)

   One box is granted server-side per completed teacher assignment.
   This module owns the *client* moment: a chest the learner taps, a
   sparkle burst, and the reveal. It owns no state of its own — the
   SERVER owns box state, so nothing here ever decrements a local
   count, guesses at loot, or knows the drop rates.

   Two exports:
     openTreasureBox(app, onDone)  — the modal (the star moment)
     treasureBadge(app, hostEl)    — the small persistent "🎁 N" badge

   ANIMATION: CSS transitions/keyframes and setTimeout ONLY. This
   app's preview pane never fires requestAnimationFrame or
   IntersectionObserver (recorded browser-pane gotcha — it's why every
   sprite loop in renderer.js is a setInterval), so nothing here may
   depend on either, and nothing may be lazily initialised off a
   visibility callback. Everything is built eagerly on mount.

   ART: the chest is code-drawn inline SVG in renderer.js's idiom —
   flat matte fills, navy ${OUTLINE} strokes at the same weight as the
   accessory catalogue, no SVG filters (the preview pane is flaky with
   those; glow is done with soft wide strokes and CSS box-shadow).
   No new PNG is needed.

   VOCABULARY: gold is *displayed* as blue crystals (💎) app-wide — a
   presentation-only reskin. In code it stays `gold`, exactly as the
   backend contract names it.
   ============================================================ */
import { api } from "../api.js";
import { getSession } from "../session.js";
import { el, showToast } from "../ui.js";
import { renderCompanion, OUTLINE } from "./renderer.js";
import { itemLabel, accessoryExists } from "./blip-ui.js";

/* ---------- chest art ----------
   One SVG holding both states: the lid is its own <g> that CSS lifts
   and tilts about the LEFT hinge on `.open`, and the glow/beam group
   fades in behind it. Drawing both states in one tree (rather than
   swapping two SVGs) keeps the base perfectly still through the
   transition — a cross-fade of two separate SVGs jitters by a pixel or
   two at these stroke weights.

   transform-box:view-box is set in CSS so the transform-origin below
   can be given in plain user units (see css/treasure.css). */
const CHEST_SVG = `
<svg class="tb-chest-svg" viewBox="0 0 200 176" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- glow spilling out of the box mouth — painted BEHIND the lid and
       base so it reads as light escaping, not a sticker on top -->
  <g class="tb-glow">
    <ellipse cx="100" cy="86" rx="82" ry="20" fill="#57c9ff" opacity="0.30"/>
    <ellipse cx="100" cy="86" rx="56" ry="13" fill="#dff4ff" opacity="0.55"/>
    <path d="M46 86 L14 6 L186 6 L154 86 Z" fill="#9fe0ff" opacity="0.16"/>
  </g>

  <!-- open interior: only visible once the lid has lifted clear -->
  <path class="tb-inside" d="M28 84 H172 V96 Q100 110 28 96 Z" fill="#061428" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round"/>

  <!-- base -->
  <g class="tb-base">
    <rect x="26" y="84" width="148" height="62" rx="7" fill="#2f8fe0" stroke="${OUTLINE}" stroke-width="6"/>
    <rect x="26" y="128" width="148" height="18" rx="7" fill="#1c5fa0" stroke="${OUTLINE}" stroke-width="6"/>
    <rect x="56" y="84" width="15" height="62" fill="#1c5fa0" stroke="${OUTLINE}" stroke-width="5"/>
    <rect x="129" y="84" width="15" height="62" fill="#1c5fa0" stroke="${OUTLINE}" stroke-width="5"/>
    <line x1="34" y1="119" x2="48" y2="119" stroke="#57c9ff" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
    <line x1="152" y1="119" x2="166" y2="119" stroke="#57c9ff" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
  </g>

  <!-- lid (lifts on .open) -->
  <g class="tb-lid">
    <path d="M26 88 V76 Q26 40 100 40 Q174 40 174 76 V88 Z" fill="#2f8fe0" stroke="${OUTLINE}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M56 88 V76 Q56 55 71 46 V88 Z" fill="#1c5fa0" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M144 88 V76 Q144 55 129 46 V88 Z" fill="#1c5fa0" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M42 70 Q60 52 84 47" fill="none" stroke="#8ddcff" stroke-width="4" stroke-linecap="round" opacity="0.55"/>
    <!-- lock plate: the one gold note, so the eye lands on what to tap -->
    <rect class="tb-lock" x="86" y="76" width="28" height="26" rx="5" fill="#ffd23f" stroke="${OUTLINE}" stroke-width="5"/>
    <circle cx="100" cy="86" r="4.5" fill="${OUTLINE}"/>
    <path d="M100 88 L97 97 H103 Z" fill="${OUTLINE}"/>
  </g>
</svg>`;

/* Reveal copy per food id. Warm, short, and about Blip — never about
   inventory management. `treat` is here because the local pantry
   catalogue carries it; `cookie` is the contract's own example. */
const FOOD_COPY = {
  cookie: { icon: "🍪", name: "A cookie", line: "A cookie for Blip." },
  soup: { icon: "🍲", name: "Soup", line: "Warm soup for the pantry — Blip will need it one day." },
  medicine: { icon: "💊", name: "Medicine", line: "Medicine for the pantry, just in case." },
  treat: { icon: "🍬", name: "A treat", line: "Something sweet for Blip." },
};
function foodCopy(id) {
  return FOOD_COPY[id] || { icon: "🍽️", name: String(id || "A snack"), line: "Something tasty for Blip." };
}

/* The household's primary Blip colour, so a cosmetic is previewed on
   the learner's OWN Blip rather than a stranger's. Defensive in the
   same spirit as blip.js's normalizeBlips — a missing key must never
   break the reveal. */
function primaryColour(app) {
  const st = (app && app.state) || {};
  if (Array.isArray(st.blips) && st.blips.length) return st.blips[0].colour || "blue";
  return (st.blip && st.blip.colour) || "blue";
}

/* Sparkle burst. Each ✦ (the repo's existing flourish glyph) gets its
   own angle/distance/delay as CSS custom properties and rides a single
   keyframe — so the whole burst is one CSS animation per node with no
   per-frame JS at all. Nodes remove themselves on a setTimeout, not on
   animationend, because a suspended/hidden tab can swallow that event
   and leave litter in the modal. */
const SPARKLE_MS = 1100;
function burstSparkles(host, count) {
  for (let i = 0; i < count; i++) {
    const s = el("span", "tb-spark", "✦");
    // spread evenly around the circle with a little jitter, so the burst
    // reads as a ring rather than a clump
    const angle = (i / count) * 360 + (Math.random() * 26 - 13);
    const dist = 58 + Math.random() * 62;
    const rad = (angle * Math.PI) / 180;
    s.style.setProperty("--dx", `${Math.cos(rad) * dist}px`);
    s.style.setProperty("--dy", `${Math.sin(rad) * dist - 14}px`); // biased upward — loot spills up out of the chest
    s.style.setProperty("--rot", `${Math.round(Math.random() * 220 - 110)}deg`);
    s.style.animationDelay = `${Math.round(Math.random() * 160)}ms`;
    host.appendChild(s);
    setTimeout(() => s.remove(), SPARKLE_MS + 400);
  }
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================
   openTreasureBox(app, onDone)
   ------------------------------------------------------------
   Modal in the idiom of unlock-modal.js: a .modal-scrim holding a
   .modal.unlock-modal, closed by ✕ / scrim tap, onDone fired AFTER
   close so the caller can app.refresh() against settled state.

   The learner taps the chest; that single tap is what calls
   api.openBox. It is guarded synchronously (`busy` flips before the
   await) so a double-tap can never open two boxes.

   The server owns box state, so on ANY failure this closes gracefully
   with a toast and leaves every count exactly as the server last
   reported it. `no_box` means the box was already opened elsewhere
   (another tab, another device) — that's not an error the learner did
   anything wrong with, so it closes quietly and lets onDone refresh.
   ============================================================ */
export function openTreasureBox(app, onDone) {
  const sess = getSession();

  const scrim = el("div", "modal-scrim");
  const modal = el("div", "modal unlock-modal treasure-modal");
  modal.innerHTML = `
    <div class="mhead"><span class="meyebrow">Treasure</span><button class="link-btn close" aria-label="Close">✕</button></div>
    <h2><span class="sparkle">✦</span> Treasure box <span class="sparkle">✦</span></h2>
    <p class="muted small tb-hint">Homework done — tap the chest to open it.</p>
    <div class="tb-stage">
      <button class="tb-chest" type="button" aria-label="Open the treasure box">${CHEST_SVG}</button>
      <div class="tb-sparkles" aria-hidden="true"></div>
    </div>
    <div class="tb-reveal" role="status" aria-live="polite"></div>`;

  const stage = modal.querySelector(".tb-stage");
  const chestBtn = modal.querySelector(".tb-chest");
  const sparkHost = modal.querySelector(".tb-sparkles");
  const hint = modal.querySelector(".tb-hint");
  const reveal = modal.querySelector(".tb-reveal");
  const closeBtn = modal.querySelector(".close");
  scrim.appendChild(modal);

  let busy = false;      // a tap is in flight — chest is inert
  let settled = false;   // the server has answered; closing is safe again
  let closed = false;

  const close = () => {
    if (closed) return;
    closed = true;
    scrim.remove();
    if (onDone) onDone();
  };
  /* While the request is in flight the modal refuses to close: dropping
     it mid-call would hide the one and only reveal of loot the server
     has already committed. Once settled (or failed) closing is free. */
  const requestClose = () => { if (!busy || settled) close(); };
  closeBtn.addEventListener("click", requestClose);
  scrim.addEventListener("click", (e) => { if (e.target === scrim) requestClose(); });

  chestBtn.addEventListener("click", async () => {
    if (busy) return;         // synchronous guard — set BEFORE any await,
    busy = true;              // so a double-tap can't open two boxes
    chestBtn.disabled = true;
    stage.classList.add("tb-shaking");
    hint.textContent = "Opening…";

    let r = null;
    try {
      r = await api.openBox(sess.username, sess.password);
    } catch {
      settled = true;
      showToast("Can't reach the server — your box is safe, try again.", "error");
      close();
      return;
    }

    settled = true;
    if (!r || !r.ok) {
      // Never touch a local count here — box state lives on the server.
      if (r && r.error === "no_box") {
        // Already opened somewhere else. Nothing went wrong; close and
        // let onDone refresh so the badge disappears on its own.
        showToast("That box was already opened.", "info");
      } else {
        showToast(openErrMsg(r && r.error), "error");
      }
      close();
      return;
    }

    playOpen(r.loot);
  });

  /* The reveal timeline. Pure setTimeout + CSS classes — no rAF. */
  function playOpen(loot) {
    const rare = !!(loot && loot.kind === "cosmetic" && loot.isNew);
    stage.classList.remove("tb-shaking");
    stage.classList.add("open");
    if (rare) modal.classList.add("tb-rare");
    hint.remove();

    const reduced = prefersReducedMotion();
    if (!reduced) burstSparkles(sparkHost, rare ? 16 : 10); // a rare find gets the bigger burst

    // lid lift is .45s; the reveal lands just after it settles
    setTimeout(() => {
      renderReveal(loot, rare);
      reveal.classList.add("shown");
    }, reduced ? 0 : 520);
  }

  function renderReveal(loot, rare) {
    const kind = (loot && loot.kind) || "gold";
    const amount = Number(loot && loot.amount) || 0;
    const id = loot && loot.id;

    const notice = el("div", "system-notice tb-notice" + (rare ? " rare" : ""));
    let label = "Loot";
    let value = "";
    let sub = "";
    let preview = null;

    if (kind === "gold") {
      // "gold" in code, crystals on screen — the app-wide display reskin.
      label = "Crystals";
      value = `+${amount} <span class="crystal">💎</span>`;
      sub = "Straight into your stash.";
    } else if (kind === "food") {
      const f = foodCopy(id);
      label = "For the pantry";
      value = `${f.icon} ${f.name}${amount > 1 ? ` ×${amount}` : ""}`;
      sub = f.line;
    } else {
      // cosmetic — the biggest moment of the three
      label = rare ? "Rare find" : "Cosmetic";
      value = `${itemLabel(id)}`;
      sub = rare
        ? "Brand new — nobody's Blip has worn this one yet. Equip it from the Blip screen."
        : "Already in your collection — it's yours twice over now.";
      if (accessoryExists(id)) {
        // Preview the item on the learner's own Blip, exactly the way
        // the shop grid previews a purchasable item (blip.js .si-stage).
        preview = el("div", "tb-preview");
        renderCompanion(preview, { colour: primaryColour(app), accessories: [id] });
      }
    }

    notice.innerHTML = `<div class="sys-label">${label}</div><div class="sys-value">${value}</div><div class="sys-sub">${sub}</div>`;
    if (preview) reveal.appendChild(preview);
    reveal.appendChild(notice);

    const done = el("button", "btn primary big tb-done", rare ? "Wear it later ✦" : "Nice!");
    done.addEventListener("click", close);
    reveal.appendChild(done);
  }

  document.body.appendChild(scrim);
  return { close };
}

function openErrMsg(code) {
  return ({
    auth: "Session problem — try logging in again.",
    no_box: "That box was already opened.",
  })[code] || "Couldn't open the box just now — try again.";
}

/* ============================================================
   treasureBadge(app, hostEl)
   ------------------------------------------------------------
   The small persistent "🎁 N" badge, in the idiom of the hub's
   cookie-badge (screens.js): a round pill pinned to the corner of its
   host card, pulsing gently, stopping the click from reaching the
   card underneath (a host card's own click usually navigates).

   Renders only when app.state.boxes.pending > 0 and returns null
   otherwise, so a caller can append unconditionally. `boxes` is read
   defensively — the key only exists once the Phase 3 migration is in.

   The badge adds .tb-badge-host to its host so the absolute placement
   has something to anchor to, rather than this file reaching into
   another component's CSS to add position:relative.
   ============================================================ */
export function treasureBadge(app, hostEl) {
  const pending = Number((((app && app.state) || {}).boxes || {}).pending) || 0;
  if (!hostEl || pending <= 0) return null;

  const badge = el("button", "treasure-badge", `🎁 ${pending}`);
  badge.type = "button";
  badge.title = pending === 1 ? "A treasure box is waiting" : `${pending} treasure boxes are waiting`;
  badge.setAttribute("aria-label", badge.title);

  badge.addEventListener("click", (e) => {
    e.stopPropagation(); // the host card's own click navigates — same as cookie-badge
    if (badge.disabled) return;
    badge.disabled = true; // no second modal while one is open
    openTreasureBox(app, async () => {
      try {
        await app.refresh();
        app.render();
      } catch {
        // refresh failing is not the learner's problem — the loot is
        // already banked server-side and will show on the next load.
        badge.disabled = false;
      }
    });
  });

  hostEl.classList.add("tb-badge-host");
  hostEl.appendChild(badge);
  return badge;
}
