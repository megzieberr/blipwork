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

   ART: Megan's own Tripo drawings, sliced in for room build S5v2
   (2026-08-08). The six code-drawn placeholders S2 shipped are gone —
   her sheet landed, and swapping it in is a pure art change: same ids,
   no migration, no shop change. Cut with

       python tools/tripo_sheet.py "art-source/tripo/trinkets.png" \
         --names old-sock,smooth-rock,paper-clip,pen,rubber-duck,broken-ruler \
         --opaque --min-area 9000 --out assets/companion/trinkets

   ⚠️ TWO THINGS ABOUT THAT COMMAND, both found by running it rather than
   by trusting ROOM-PROMPTS.md's name list. The names are NOT in the
   sheet's visual order: the pen is drawn tall enough to span both rows,
   so its centre lands in the SECOND row band and it reads FOURTH, not
   first (the monocle lesson — always check the `at x…,y…` the slicer
   prints). And --min-area had to go up from the default 256: this
   sheet's magenta is noisy (0.182), which broke it into 39 "items", 33
   of them background speckle. 9000 leaves exactly the six.

   `svg` is still supported below and by trinketTile, so a future
   placeholder can use it — but nothing does today.
   ============================================================ */
import { el } from "../ui.js";

/* `img` is a bare filename under assets/companion/trinkets/. `label` is
   the shelf caption; `line` is the reveal line the treasure modal reads
   out when a box pays one of these. */
export const TRINKETS = {
  pen: {
    label: "Ballpoint pen",
    line: "A pen. It works, probably.",
    img: "pen.png",
  },
  "old-sock": {
    label: "Odd sock",
    line: "One sock. Its partner is gone forever.",
    img: "old-sock.png",
  },
  "smooth-rock": {
    label: "Smooth rock",
    line: "A very good rock. Nice and smooth.",
    img: "smooth-rock.png",
  },
  "paper-clip": {
    label: "Paper clip",
    line: "Slightly bent. Still clips.",
    img: "paper-clip.png",
  },
  "rubber-duck": {
    label: "Rubber duck",
    line: "Squeaks. Excellent at listening.",
    img: "rubber-duck.png",
  },
  "broken-ruler": {
    label: "Broken ruler",
    line: "Two rulers now, if you think about it.",
    img: "broken-ruler.png",
  },
};

/* The order the shelf lays them out in — matches the `sort` column on
   the SQL rows, so shelf order and catalogue order agree. */
export const TRINKET_IDS = Object.keys(TRINKETS);

export function trinketExists(id) { return !!TRINKETS[id]; }
export function trinketLabel(id) { return (TRINKETS[id] && TRINKETS[id].label) || id; }
export function trinketLine(id) { return (TRINKETS[id] && TRINKETS[id].line) || "A little something for the shelf."; }

/* One shelf tile. Both shapes are rendered, so a placeholder SVG and a
   real drawing can sit on the same shelf during an art swap. */
export function trinketTile(id) {
  const def = TRINKETS[id];
  const tile = el("div", "trinket-item");
  tile.title = trinketLabel(id);
  const art = el("div", "tk-art");
  if (def && def.img) art.innerHTML = `<img src="./assets/companion/trinkets/${def.img}" alt="">`;
  else if (def && def.svg) art.innerHTML = def.svg;
  else art.textContent = "❔";
  tile.appendChild(art);
  tile.appendChild(el("span", "tk-name", trinketLabel(id)));
  return tile;
}
