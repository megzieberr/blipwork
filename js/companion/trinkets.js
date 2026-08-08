/* ============================================================
   TRINKETS — the junk loot from milestone mystery boxes.
   Room build S2 (2026-08-08), per ROOM-BUILD-PLAN.md.

   A trinket is NOT a cosmetic: it is never worn, never sold, and has
   no attachment point on Blip. So it lives here rather than in
   renderer.js's ACCESSORIES — putting one there would fail
   verify-store.html's "every accessory has an ATTACH point" check,
   and rightly so.

   Server side they are `shop_items` rows with category 'trinket',
   price 0, seeded by supabase/migration-level-curve-40.sql. They are
   HOUSEHOLD property (students.trinkets), not per-blip: a shelf
   belongs to the room.

   ⚠️ ART IS PLACEHOLDER. Megan's Tripo sheet
   `art-source/tripo/trinkets.png` (prompt 4 in ROOM-PROMPTS.md) did
   not exist when this shipped, so every drawing below is a
   code-drawn stand-in in the app's navy/electric idiom. When the
   sheet lands:
       python tools/tripo_sheet.py "art-source/tripo/trinkets.png" \
         --names pen,old-sock,smooth-rock,paper-clip,rubber-duck,broken-ruler \
         --opaque
   then swap each `svg` below for `img: "<name>.png"` — the shelf
   renderer already handles both, and no migration is needed.
   ============================================================ */
import { OUTLINE } from "./renderer.js";
import { el } from "../ui.js";

const S = OUTLINE;

/* Every drawing is a 100x100 viewBox so the shelf can size them all
   identically. Flat matte fills + a navy outline at the accessory
   catalogue's weight; no filters (the preview pane is flaky with
   those). */
export const TRINKETS = {
  pen: {
    label: "Ballpoint pen",
    line: "A pen. It works, probably.",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="rotate(-35 50 50)">
        <rect x="44" y="20" width="14" height="52" rx="3" fill="#2f8fe0" stroke="${S}" stroke-width="5"/>
        <rect x="44" y="20" width="14" height="10" rx="3" fill="#1c5fa0" stroke="${S}" stroke-width="5"/>
        <path d="M44 72 H58 L51 86 Z" fill="#f2f6fb" stroke="${S}" stroke-width="5" stroke-linejoin="round"/>
        <line x1="51" y1="82" x2="51" y2="88" stroke="${S}" stroke-width="5" stroke-linecap="round"/>
        <rect x="58" y="30" width="6" height="18" rx="3" fill="#1c5fa0" stroke="${S}" stroke-width="4"/>
      </g>
    </svg>`,
  },
  "old-sock": {
    label: "Odd sock",
    line: "One sock. Its partner is gone forever.",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M34 18 H62 V54 Q62 62 70 66 L80 71 Q88 76 84 83 Q80 90 71 87 L44 78 Q34 74 34 62 Z"
            fill="#d8dee7" stroke="${S}" stroke-width="5" stroke-linejoin="round"/>
      <rect x="34" y="18" width="28" height="11" fill="#e8564a" stroke="${S}" stroke-width="5"/>
      <path d="M36 64 Q50 70 62 74" fill="none" stroke="#b3bcc9" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  },
  "smooth-rock": {
    label: "Smooth rock",
    line: "A very good rock. Nice and smooth.",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 66 Q18 44 38 34 Q58 24 74 38 Q88 50 82 66 Q76 80 50 80 Q24 80 20 66 Z"
            fill="#9aa6b4" stroke="${S}" stroke-width="5" stroke-linejoin="round"/>
      <ellipse cx="42" cy="46" rx="11" ry="6" fill="#e7edf4" opacity="0.85" transform="rotate(-22 42 46)"/>
      <path d="M60 68 Q70 66 76 60" fill="none" stroke="#7a8695" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  },
  "paper-clip": {
    label: "Paper clip",
    line: "Slightly bent. Still clips.",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M38 78 V34 Q38 20 51 20 Q64 20 64 34 V74 Q64 84 55 84 Q46 84 46 74 V36"
            fill="none" stroke="${S}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M38 78 V34 Q38 20 51 20 Q64 20 64 34 V74 Q64 84 55 84 Q46 84 46 74 V36"
            fill="none" stroke="#cfd7e2" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  "rubber-duck": {
    label: "Rubber duck",
    line: "Squeaks. Excellent at listening.",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M24 74 Q16 62 26 56 L40 52 Q34 34 50 30 Q66 26 70 40 L84 44 Q78 50 70 48
               Q74 62 62 72 Q48 82 34 80 Z"
            fill="#ffd23f" stroke="${S}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M70 40 L86 43 L70 48 Z" fill="#f08a2c" stroke="${S}" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="60" cy="40" r="3.6" fill="${S}"/>
    </svg>`,
  },
  "broken-ruler": {
    label: "Broken ruler",
    line: "Two rulers now, if you think about it.",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="rotate(-12 50 50)">
        <path d="M10 40 H44 L40 60 H10 Z" fill="#e6c07a" stroke="${S}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M52 40 H90 V60 H48 Z" fill="#e6c07a" stroke="${S}" stroke-width="5" stroke-linejoin="round"/>
        <line x1="18" y1="40" x2="18" y2="48" stroke="${S}" stroke-width="4"/>
        <line x1="28" y1="40" x2="28" y2="51" stroke="${S}" stroke-width="4"/>
        <line x1="62" y1="40" x2="62" y2="48" stroke="${S}" stroke-width="4"/>
        <line x1="74" y1="40" x2="74" y2="51" stroke="${S}" stroke-width="4"/>
      </g>
    </svg>`,
  },
};

/* The order the shelf lays them out in — matches the `sort` column on
   the SQL rows, so shelf order and catalogue order agree. */
export const TRINKET_IDS = Object.keys(TRINKETS);

export function trinketExists(id) { return !!TRINKETS[id]; }
export function trinketLabel(id) { return (TRINKETS[id] && TRINKETS[id].label) || id; }
export function trinketLine(id) { return (TRINKETS[id] && TRINKETS[id].line) || "A little something for the shelf."; }

/* One shelf tile. `img` is supported so Megan's Tripo art can replace a
   placeholder SVG with a one-line change and no new renderer. */
export function trinketTile(id) {
  const def = TRINKETS[id];
  const tile = el("div", "trinket-item");
  tile.title = trinketLabel(id);
  const art = el("div", "tk-art");
  if (def && def.img) art.innerHTML = `<img src="./assets/companion/trinkets/${def.img}" alt="">`;
  else if (def) art.innerHTML = def.svg;
  else art.textContent = "❔";
  tile.appendChild(art);
  tile.appendChild(el("span", "tk-name", trinketLabel(id)));
  return tile;
}
