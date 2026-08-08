/* ============================================================
   ROOM ART — PLACEHOLDER furniture for Blip's room (room build
   S1, 2026-08-08). Simple code-drawn line art in the app's own
   navy/electric palette (uses the same CSS custom properties as
   everywhere else — --panel-solid / --accent), swapped for
   Megan's Tripo art in a later session (S5). Everything exported
   from this file is a PLACEHOLDER — do not treat it as final art.

   S4b (2026-08-08 revision): the fridge is gone — groceries live
   on a same-day tray now (see js/blip.js), not a piece of room
   furniture — so FRIDGE_SVG was removed rather than left unused.
   ============================================================ */

/* PLACEHOLDER: wide bed — headboard, frame, pillow block, blanket line */
export const BED_SVG = `<svg viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="6" y="10" width="14" height="86" rx="4" fill="var(--accent)"/>
  <rect x="20" y="34" width="194" height="62" rx="10" fill="var(--panel-solid)" stroke="var(--accent)" stroke-width="3"/>
  <rect x="30" y="42" width="52" height="26" rx="8" fill="var(--accent)" opacity=".55"/>
  <line x1="20" y1="74" x2="214" y2="74" stroke="var(--accent)" stroke-width="2" opacity=".6"/>
</svg>`;

/* PLACEHOLDER: closet — two-door wardrobe, hanger dots */
export const CLOSET_SVG = `<svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="6" y="6" width="88" height="118" rx="8" fill="var(--panel-solid)" stroke="var(--accent)" stroke-width="3"/>
  <line x1="50" y1="6" x2="50" y2="124" stroke="var(--accent)" stroke-width="2"/>
  <circle cx="40" cy="66" r="3" fill="var(--accent)"/>
  <circle cx="60" cy="66" r="3" fill="var(--accent)"/>
</svg>`;

/* PLACEHOLDER: study desk — top, legs, drawer outline */
export const DESK_SVG = `<svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="6" y="20" width="108" height="12" rx="4" fill="var(--panel-solid)" stroke="var(--accent)" stroke-width="3"/>
  <rect x="14" y="32" width="10" height="60" fill="var(--accent)" opacity=".8"/>
  <rect x="96" y="32" width="10" height="60" fill="var(--accent)" opacity=".8"/>
  <rect x="30" y="36" width="60" height="30" rx="4" fill="none" stroke="var(--accent)" stroke-width="2" opacity=".6"/>
</svg>`;
