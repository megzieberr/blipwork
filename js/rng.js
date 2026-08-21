/* ============================================================
   RNG INDIRECTION (DICE-PLAN.md infrastructure, 2026-08-21)
   ------------------------------------------------------------
   One shared, swappable randomness source. Every randomness helper in
   this app — js/ui.js's randInt/pick/shuffled, and the handful of
   direct Math.random() call-sites inside js/quests/*.js and the maths
   libraries — calls rng() instead of Math.random() directly.

   Static play NEVER sees a difference: rng() defaults to Math.random,
   so every existing quest generates byte-for-byte the same as before
   this file existed.

   The ONLY code that ever calls setRng()/resetRng() is js/dice.js's
   withSeed() — it installs a seeded generator for the exact duration
   of one skill.gen() call (so a dice question can be regenerated
   identically from its seed, for resume), then restores Math.random
   immediately after. Nothing else in the app should call setRng().
   ============================================================ */
let _rng = Math.random;

export function rng() { return _rng(); }
export function setRng(fn) { _rng = fn; }
export function resetRng() { _rng = Math.random; }
