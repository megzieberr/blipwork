/* ============================================================
   ROOM TUTORIAL — the bubble walkthrough over Blip's room.

   PORTED from WhenWorks' app/tour.js (2026-08-09) — the same
   mechanism, proven on her other app, ported rather than
   reinvented. Same rules, same reasons:

   1. Every step is optional. A step whose control isn't on this
      screen right now (the tray is empty, a re-render happened
      mid-tour) is dropped rather than spotlighting empty space —
      a shorter tour beats a broken one.
   2. No requestAnimationFrame, anywhere. This project's preview
      pane never fires rAF (same as WhenWorks'), so a tour built
      on it would hang the harness while working fine on a phone.
      setTimeout only.
   3. The "seen" flag is a VERSION NUMBER in localStorage
      (mhq.tourSeen), not a boolean — bump TOUR_VERSION to re-show
      a materially rewritten tour without touching anyone's
      storage by hand. Namespaced under "mhq." so verify-store.html's
      per-run wipe (any key starting "mhq.") always exercises the
      first-run path.

   Unlike WhenWorks' R11 ("an invitation, not an ambush"), Megan's
   ruling here is the OLDER behaviour WhenWorks kept exported for
   exactly this reason: the tour fires itself, once, on first
   login. js/blip.js only ever calls maybeStartTour() from the
   room screen (never from the login screen), and always after a
   fresh render — closeRoomSheet() already ran by then — so "never
   on top of an open sheet, never on the login screen" holds
   structurally, without a separate flag to keep in sync.

   The "?" replay button (js/blip.js, next to the gallery button)
   is the always-available half — a kid who skips it in class can
   still find it later. See the ROOM TUTORIAL brief, 2026-08-09.
   ============================================================ */
import { el } from "../ui.js";

// Bump to re-show the tour to everyone — a device stores the version it
// saw, not a boolean, so a materially changed walkthrough can run again.
export const TOUR_VERSION = 1;
const KEY = "mhq.tourSeen";

function getSeen() {
  try { return parseInt(localStorage.getItem(KEY), 10) || 0; } catch { return 0; }
}
function setSeen(v) {
  try { localStorage.setItem(KEY, String(v)); } catch { /* ignore */ }
}
// Exposed for the verify page and for a future "reset my tutorial" admin
// action — reading state should never need reaching into localStorage by
// its raw key from outside this file.
export function tourSeen() { return getSeen(); }

/* The seven stops, in Megan's order. Each `find` is re-run every time a
   step is (re)shown, never cached — the room re-renders under the tour
   on every buy/equip, and a stale element reference would point at a
   node no longer in the document. */
function stepsFor(mount) {
  const steps = [
    {
      find: () => mount.querySelector('[data-tour="blip"]'),
      title: "Meet Blip",
      body: "This is Blip — tap him and he'll say hi.",
    },
    {
      find: () => mount.querySelector('[data-tour="desk"]'),
      title: "Your study desk",
      body: "Tap the desk to open your maths quests. A red “!” on it means homework is waiting for you.",
    },
    {
      find: () => mount.querySelector('[data-tour="cookie"]'),
      title: "His daily cookie",
      body: "One free cookie a day — feed it to Blip and he grows. It's the only thing that does.",
    },
    {
      // Only exists when today's tray has food on it — dropped otherwise,
      // per the brief ("only if it has food on it — a droppable step").
      find: () => mount.querySelector('[data-tour="tray"]'),
      title: "Today's tray",
      body: "Anything you buy him to eat lands here — drag it onto Blip before midnight, or it's gone.",
    },
    {
      find: () => mount.querySelector('[data-tour="door"]'),
      title: "His closet",
      body: "Tap the door to dress Blip up and see what he owns.",
    },
    {
      find: () => mount.querySelector('[data-tour="furniture"]'),
      title: "Redecorate",
      body: "Tap the bed or the window to shop for new furniture.",
    },
    {
      find: () => mount.querySelector('[data-tour="gallery"]'),
      title: "See everyone's Blips",
      body: "Tap here to see what your classmates' Blips look like.",
    },
  ];
  return steps.filter((s) => s.find());
}

/**
 * Runs the walkthrough over an already-rendered room screen.
 * Returns a handle with close(), or null when no step had anything to
 * point at (mount isn't the room, or every anchor is missing).
 */
export function startTour(mount) {
  const steps = stepsFor(mount);
  if (!steps.length) return null;

  let index = 0;
  let repositionTimer = null;

  const hole = el("div", "tour__hole");
  hole.setAttribute("aria-hidden", "true");
  const bubble = el("div", "tour__bubble");
  bubble.setAttribute("role", "dialog");
  bubble.setAttribute("aria-modal", "true");
  bubble.setAttribute("aria-label", "How this works");
  const overlay = el("div", "tour");
  overlay.append(hole, bubble);

  const close = () => {
    window.removeEventListener("resize", schedule);
    window.removeEventListener("scroll", schedule, true);
    document.removeEventListener("keydown", onKey);
    clearTimeout(repositionTimer);
    overlay.classList.remove("is-in");
    setTimeout(() => overlay.remove(), 200);
    // Seeing it through OR skipping both count as seen — re-ambushing a
    // kid who skipped every time they open the room is how a tutorial
    // gets ignored for good.
    setSeen(TOUR_VERSION);
  };

  const next = () => {
    index += 1;
    if (index >= steps.length) close();
    else show();
  };

  function place(target) {
    // A step whose target was torn out from under us (a buy/equip
    // re-renders the room mid-tour) has nothing left to point at.
    if (!target || !document.body.contains(target)) { close(); return; }

    const pad = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const r = target.getBoundingClientRect();
    hole.style.top = (r.top - pad) + "px";
    hole.style.left = (r.left - pad) + "px";
    hole.style.width = (r.width + pad * 2) + "px";
    hole.style.height = (r.height + pad * 2) + "px";

    // Measure the bubble where it stands: getBoundingClientRect forces
    // the layout we need, so no animation frame has to be waited for.
    const b = bubble.getBoundingClientRect();
    const below = r.bottom + 14;
    const above = r.top - b.height - 14;
    const top = below + b.height < vh - 10 ? below : Math.max(10, above);
    const left = Math.min(Math.max(10, r.left + r.width / 2 - b.width / 2), vw - b.width - 10);
    bubble.style.top = top + "px";
    bubble.style.left = left + "px";
  }

  function schedule() {
    clearTimeout(repositionTimer);
    repositionTimer = setTimeout(() => {
      const step = steps[index];
      if (step) place(step.find());
    }, 60);
  }

  function show() {
    const step = steps[index];
    const target = step.find();
    if (!target) { next(); return; }
    const last = index === steps.length - 1;

    bubble.innerHTML = `<p class="tour__count">${index + 1} of ${steps.length}</p>
      <h2 class="tour__title">${step.title}</h2>
      <p class="tour__body">${step.body}</p>
      <div class="tour__actions">
        <button type="button" class="tour__skip"${last ? " hidden" : ""}>Skip</button>
        <div class="tour__spacer"></div>
        <button type="button" class="btn small primary tour__next">${last ? "Got it" : "Next"}</button>
      </div>`;
    bubble.querySelector(".tour__skip").addEventListener("click", (e) => { e.stopPropagation(); close(); });
    bubble.querySelector(".tour__next").addEventListener("click", (e) => { e.stopPropagation(); next(); });

    // Bring the control into view before measuring anything against it.
    // 'auto', not 'smooth': a smooth scroll is still moving when the rect
    // is read, which would put the spotlight where the target used to be.
    target.scrollIntoView({ block: "center", behavior: "auto" });
    place(target);
  }

  const onKey = (e) => {
    if (e.key === "Escape") close();
    else if (e.key === "Enter" || e.key === " ") next();
  };

  // Tapping the dimmed area advances — the expected gesture on a phone,
  // and it means a mis-tap costs one step rather than trapping her.
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target === hole) next();
  });

  document.body.appendChild(overlay);
  setTimeout(() => overlay.classList.add("is-in"), 10);
  window.addEventListener("resize", schedule);
  window.addEventListener("scroll", schedule, true);
  document.addEventListener("keydown", onKey);

  show();
  return { close, get step() { return index; }, get length() { return steps.length; } };
}

/**
 * First landing only. Called unconditionally from the end of
 * js/blip.js's renderBlip() — that call site IS the guarantee this never
 * fires on the login screen or over an open sheet: renderBlip is the
 * post-login room screen, and it closes any open room sheet at the top
 * of every render, before this function could ever be reached.
 */
export function maybeStartTour(mount) {
  if (getSeen() >= TOUR_VERSION) return null;
  return startTour(mount);
}
