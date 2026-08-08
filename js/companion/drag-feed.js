/* ============================================================
   DRAG-TO-FEED — room build S4 (2026-08-08), per ROOM-BUILD-PLAN.md
   and Megan's ruling of 2026-08-06: "the KID drags the food to Blip —
   the drag IS the animation." There is no motion path and no flying-food
   timeline; the child's own finger does the movement, and the app only
   has to notice where they let go.

   ⚠️ POINTER EVENTS ONLY. requestAnimationFrame NEVER FIRES in this
   project's browser preview pane (recorded in PROJECT-STATUS), so an
   rAF-driven drag would be untestable and would look frozen in every
   check we can actually run. Everything here is pointerdown/move/up plus
   one CSS transition for the fly-home, and the fly-home is torn down by
   setTimeout rather than `transitionend` for the same reason (an event
   that depends on the compositor is not a promise you can keep).

   THE RULE (Megan, 2026-08-07): dropped ON him, the food is eaten.
   Dropped ANYWHERE else it floats back to where it came from with NO
   penalty at all, and Blip pulls the sad face. Nothing is ever lost by
   missing.

   This module knows nothing about food, Blip or the backend — it is the
   gesture only, so verify-store.html can exercise the whole drag path
   against two plain divs. js/blip.js supplies the meaning.
   ============================================================ */

const DRAG_THRESHOLD_PX = 6;   // below this it was a tap, not a drag
const FLY_HOME_MS = 320;
export const DEFAULT_DROP_PAD_PX = 44;   // "near him" is generous on a phone

function pointFrom(e) {
  return { x: e.clientX == null ? 0 : e.clientX, y: e.clientY == null ? 0 : e.clientY };
}

/* Is (x, y) inside el's box, grown by `pad` on every side? Measured at
   DROP time, never cached: the room re-lays-out while a sheet slides. */
export function isOverTarget(el, x, y, pad = DEFAULT_DROP_PAD_PX) {
  if (!el || !el.getBoundingClientRect) return false;
  const r = el.getBoundingClientRect();
  if (!r.width && !r.height) return false;   // not laid out = not a target
  return x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad;
}

function placeGhost(ghost, x, y) {
  ghost.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) translate(-50%, -50%)`;
}

/* Make `handle` draggable.

   opts.ghost()      -> the element that follows the finger (required)
   opts.target()     -> the drop-zone element, re-read on every move
   opts.pad          -> px of slack around the target (default 44)
   opts.disabled()   -> true to ignore the gesture entirely
   opts.onTap()      -> pointer went down and up without moving
   opts.onStart()    -> a real drag began (used to get the sheet out of the way)
   opts.onDropOn()   -> released over the target; the ghost is already gone
   opts.onDropAway() -> released anywhere else; the ghost is flying home
   opts.onEnd()      -> always last, drag or cancel (put the sheet back)

   Returns a destroy() that unbinds everything and cleans up a live drag.
*/
export function makeDraggable(handle, opts = {}) {
  const pad = opts.pad == null ? DEFAULT_DROP_PAD_PX : opts.pad;
  let ghost = null, dragging = false, startX = 0, startY = 0, pid = null;
  let homeX = null, homeY = null;   // where the tile sat when the drag began
  let overEl = null;
  const timers = new Set();
  const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };

  const clearOver = () => { if (overEl) { overEl.classList.remove("feed-target-over"); overEl = null; } };

  const markOver = (x, y) => {
    const t = opts.target && opts.target();
    const on = isOverTarget(t, x, y, pad);
    if (on && overEl !== t) { clearOver(); overEl = t; t.classList.add("feed-target-over"); }
    else if (!on) clearOver();
    if (ghost) ghost.classList.toggle("over", on);
    return on;
  };

  const dropGhost = () => { if (ghost) { ghost.remove(); ghost = null; } };

  /* Fly home: one transition back to where the tile WAS when the drag
     began, then remove. Deliberately the start-of-drag position, not a
     fresh measurement: onStart slides the whole sheet down out of the way,
     and onEnd slides it back — measuring now would aim the food at wherever
     the tile happens to be mid-slide. */
  const flyHome = () => {
    if (!ghost) return;
    const g = ghost;
    ghost = null;
    const hx = homeX == null ? startX : homeX;
    const hy = homeY == null ? startY : homeY;
    g.classList.add("flying-home");
    void g.offsetWidth;                  // flush, so the transition really runs
    placeGhost(g, hx, hy);
    g.style.opacity = "0";
    later(() => g.remove(), FLY_HOME_MS + 60);
  };

  const finish = () => {
    dragging = false;
    clearOver();
    if (pid != null && handle.releasePointerCapture) {
      try { handle.releasePointerCapture(pid); } catch { /* already released */ }
    }
    pid = null;
    if (opts.onEnd) opts.onEnd();
  };

  const onDown = (e) => {
    if (opts.disabled && opts.disabled()) return;
    if (e.button != null && e.button !== 0) return;    // right/middle click is not a drag
    const p = pointFrom(e);
    startX = p.x; startY = p.y;
    homeX = null; homeY = null;
    dragging = false;
    pid = e.pointerId == null ? null : e.pointerId;
    if (pid != null && handle.setPointerCapture) {
      try { handle.setPointerCapture(pid); } catch { /* capture is a nicety */ }
    }
    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", onUp);
    handle.addEventListener("pointercancel", onCancel);
  };

  const beginDrag = (x, y) => {
    dragging = true;
    // measure BEFORE onStart — that callback moves the sheet the tile is in
    const r = handle.getBoundingClientRect();
    homeX = r.width ? r.left + r.width / 2 : x;
    homeY = r.height ? r.top + r.height / 2 : y;
    ghost = opts.ghost ? opts.ghost() : null;
    if (ghost) {
      ghost.classList.add("feed-ghost");
      placeGhost(ghost, x, y);
      document.body.appendChild(ghost);
    }
    if (opts.onStart) opts.onStart();
  };

  const onMove = (e) => {
    const p = pointFrom(e);
    if (!dragging) {
      if (Math.abs(p.x - startX) < DRAG_THRESHOLD_PX && Math.abs(p.y - startY) < DRAG_THRESHOLD_PX) return;
      beginDrag(p.x, p.y);
    }
    if (e.preventDefault) e.preventDefault();      // stop the page scrolling under the finger
    if (ghost) placeGhost(ghost, p.x, p.y);
    markOver(p.x, p.y);
  };

  const unbindMove = () => {
    handle.removeEventListener("pointermove", onMove);
    handle.removeEventListener("pointerup", onUp);
    handle.removeEventListener("pointercancel", onCancel);
  };

  const onUp = (e) => {
    unbindMove();
    const p = pointFrom(e);
    if (!dragging) { finish(); if (opts.onTap) opts.onTap(); return; }
    const hit = markOver(p.x, p.y);
    clearOver();
    if (hit) {
      dropGhost();                                  // eaten: it does not fly anywhere
      finish();
      if (opts.onDropOn) opts.onDropOn();
    } else {
      flyHome();                                    // the sad face plays while it flies
      finish();
      if (opts.onDropAway) opts.onDropAway();
    }
  };

  /* A cancel is the browser taking the gesture away (a system gesture, the
     element unmounting), NOT the child choosing to drop it somewhere odd —
     so it flies home silently, with no sad face. */
  const onCancel = () => { unbindMove(); flyHome(); finish(); };

  const onKey = (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (opts.disabled && opts.disabled()) return;
    e.preventDefault();
    if (opts.onTap) opts.onTap();
  };

  /* The native HTML5 drag would hijack the gesture on desktop and show its
     own (wrong, semi-transparent) drag image. */
  const noNativeDrag = (e) => e.preventDefault();

  handle.addEventListener("pointerdown", onDown);
  handle.addEventListener("keydown", onKey);
  handle.addEventListener("dragstart", noNativeDrag);

  return function destroy() {
    handle.removeEventListener("pointerdown", onDown);
    handle.removeEventListener("keydown", onKey);
    handle.removeEventListener("dragstart", noNativeDrag);
    unbindMove();
    dropGhost();
    clearOver();
    timers.forEach(clearTimeout);
    timers.clear();
  };
}
