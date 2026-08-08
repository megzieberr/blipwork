/* ============================================================
   FURNITURE — the isometric room's shoppable pieces.
   Room build S5v2 (2026-08-08), per the REVISION section of
   ROOM-BUILD-PLAN.md.

   Four equip slots: door · window · desk · bed. Server-side these are
   `shop_items` rows with category 'furniture' (seeded by
   supabase/migration-furniture-slots.sql, mirrored in
   js/local-backend.js); they are bought and equipped through the SAME
   mhq_buy_item / mhq_equip machinery a hat uses, so ownership and level
   gates are the server's business, not this file's.

   This file holds only what the client owns: the LABEL, the ART FILE, the
   optional code TINT, and WHERE ON THE ROOM SHELL each piece is drawn.
   Which collection a piece belongs to (and therefore which locked "?" card
   hides it in the panel) lives in js/companion/collections.js, so Megan
   can retune a gate without a migration. Same division of labour as
   js/companion/food.js.

   A furniture piece is NOT a cosmetic: it never goes on Blip, has no
   ATTACH point and no ACCESSORIES entry — putting one there would fail
   verify-store.html's "every accessory has an ATTACH point" check, and
   rightly so. Same reasoning as trinkets.js and food.js.

   ⚠️ THE DOOR COLOURS ALL SHARE ONE PICTURE (her ruling). There is exactly
   one door drawing, door.png, and every colour below is that same file
   tinted through renderer.js's `tintedImageSrc` — the offscreen-canvas
   pipeline Blip's own recolouring uses. Never add a second door PNG.

   ⚠️ THE PLACEMENT NUMBERS BELOW ARE BEST GUESSES, measured off the room
   shell's geometry rather than eyeballed, but NOT settled by Megan yet.
   She places furniture herself in dressing-room.html (Furniture mode) and
   hands back the numbers, exactly as she did for the 41 accessories on
   2026-08-08 — see PROJECT-STATUS.md. Don't hand-tune these; run the page.
   ============================================================ */
import { el } from "../ui.js";
import { tintedImageSrc } from "./renderer.js";

const DIR = "./assets/companion/furniture";

/* ---------- where the shell's surfaces are ----------
   Fractions of the room box, which is exactly the shape of
   assets/companion/room-shell.png (768x762 — the CSS pins .room to that
   aspect ratio precisely so these numbers mean something). Measured off
   the shell's own alpha channel, not guessed:

     back corner (walls meet)      (0.500, 0.000)
     wall top-left / top-right     (0.000, 0.300) / (1.000, 0.300)
     floor's back vertex           (0.500, 0.423)
     floor's left / right vertices (0.000, 0.670) / (1.000, 0.670)
     floor's front vertex          (0.500, 1.000)

   So the LEFT wall is the quad (0.5,0)-(0,0.30)-(0,0.67)-(0.5,0.423) and
   the RIGHT wall mirrors it; the floor is the diamond between (0.5,0.423),
   (1,0.67), (0.5,1) and (0,0.67). Wall items are centred on their wall;
   floor items stand on it, so they anchor by their BOTTOM edge.

   Slot geography is fixed — only the PICTURE in each spot is shoppable.
   ⚠️ MEGAN RE-CALLED IT ON 2026-08-08 (evening), replacing REVISION ruling
   4's back-left door: the DOOR and the BED share the RIGHT wall (door at
   the back, bed beside it), and the DESK keeps the left wall with its
   WINDOW directly above it. Two reasons it is better than the first
   arrangement, both visible in tools/preview_room.py's output: the desk no
   longer buries the door, and the window's art turned out to have been
   drawn for the LEFT wall all along (see the window note below). */
export const SLOT_PLACEMENT = {
  // RIGHT wall, back end, standing on the wall/floor junction (at x=0.65
  // that junction is y=0.497). Her layout call, 2026-08-08 evening — and
  // her second door drawing ("door 2.png") faces down-LEFT, which is a
  // right-wall object, so the art and the wall now agree. Tap target for
  // the Inventory sheet.
  door: { anchor: { x: 0.5, y: 1 }, attach: { x: 0.650, y: 0.520 } },
  // LEFT wall, ABOVE the desk. ⚠️ MEASURED, NOT CHOSEN: the porthole art's
  // major axis slopes UP to the right (left column mid-y 0.619, right
  // column 0.371), which is the LEFT wall's rake — it was drawn for this
  // wall. It spent the first draft of S5v2 on the right wall, where it
  // leaned against the room. At x=0.28 that wall spans y 0.132-0.532.
  window: { anchor: { x: 0.5, y: 0.5 }, attach: { x: 0.280, y: 0.255 } },
  // floor, LEFT side, under its window (the reference room's desk lean).
  desk: { anchor: { x: 0.5, y: 0.95 }, attach: { x: 0.27, y: 0.715 } },
  // floor, RIGHT side, NEXT TO THE DOOR (her layout call). The headboard
  // passes in front of the door's lower third, which is depth, not a
  // collision — the doors themselves stay clear and tappable.
  bed: { anchor: { x: 0.5, y: 0.95 }, attach: { x: 0.760, y: 0.765 } },
};

/* Paint order, BACK to FRONT. The two wall pieces go down first, then the
   floor pieces; Blip is mounted after all four, so he stands in front of
   the desk and bed (he is centre-front on the floor, they are behind him).
   Also the order the furniture panel lists its slots in. */
export const FURNITURE_SLOTS = ["door", "window", "desk", "bed"];

export const FURNITURE_SLOT_LABELS = {
  bed: "Bed", desk: "Desk", window: "Window", door: "Door",
};

/* ---------- the door tints ----------
   Deliberately NOT renderer.js's COLOURS palette, even though the names
   match. Those hexes are Blip's pastels (mint #bff7e0 is saturation 0.23);
   applied flat to a pale grey door they came out barely distinguishable
   from each other in a 28%-of-the-room-wide picture. These are the same
   hues at roughly double the saturation, which is what makes eight doors
   read as eight colours on a phone. Blip's own palette is untouched. */
const DOOR_TINTS = {
  mint: "#6fdcb0",
  sky: "#6ec3f2",
  pink: "#f79fc0",
  lemon: "#f5d861",
  peach: "#f7ab74",
  lilac: "#b79bf0",
  coral: "#f4816b",
  seafoam: "#63c9bd",
};

/* ---------- the catalogue ----------
   `widthPct` is the piece's width as a percentage of the room box — set
   per item because each drawing was trimmed to its own bounds, so two beds
   at the same widthPct do NOT look the same size. `anchor`/`attach` fall
   back to the slot's shared point above; an item may override either, the
   same way an accessory may override its slot's ATTACH point. */
export const FURNITURE = {
  // ---- basic (Lv 1, free) — art-source/tripo/furniture-iso-basic.png ----
  "basic-bed": { slot: "bed", label: "Wooden bed", img: "basic-bed.png", widthPct: 40 },
  "basic-desk": { slot: "desk", label: "Study desk", img: "basic-desk.png", widthPct: 33 },
  "city-window": { slot: "window", label: "City window", img: "city-window.png", widthPct: 20 },

  // ---- techy (Lv 8) — furniture-iso-techy.png (the holo screen floats
  //      detached above the desk, so that sheet is sliced with --group) ----
  "techy-bed": { slot: "bed", label: "Capsule bed", img: "techy-bed.png", widthPct: 37 },
  "techy-desk": { slot: "desk", label: "Holo desk", img: "techy-desk.png", widthPct: 36 },
  "space-window": { slot: "window", label: "Space window", img: "space-window.png", widthPct: 20 },

  // ---- princess (Lv 14) — furniture-iso-princess.png ----
  // Both are TALL (the canopy, the vanity mirror), so they run narrower
  // than their siblings or they overrun the wall behind them.
  "princess-bed": { slot: "bed", label: "Canopy bed", img: "princess-bed.png", widthPct: 33 },
  "princess-desk": { slot: "desk", label: "Vanity desk", img: "princess-desk.png", widthPct: 30 },
  "mountain-window": { slot: "window", label: "Mountain window", img: "mountain-window.png", widthPct: 20 },

  // ---- the door: ONE drawing, tinted in code (her ruling) ----
  "door-white": { slot: "door", label: "White door", img: "door.png", widthPct: 24, tint: null },
  "door-mint": { slot: "door", label: "Mint door", img: "door.png", widthPct: 24, tint: DOOR_TINTS.mint },
  "door-sky": { slot: "door", label: "Sky door", img: "door.png", widthPct: 24, tint: DOOR_TINTS.sky },
  "door-pink": { slot: "door", label: "Pink door", img: "door.png", widthPct: 24, tint: DOOR_TINTS.pink },
  "door-lemon": { slot: "door", label: "Lemon door", img: "door.png", widthPct: 24, tint: DOOR_TINTS.lemon },
  "door-peach": { slot: "door", label: "Peach door", img: "door.png", widthPct: 24, tint: DOOR_TINTS.peach },
  "door-lilac": { slot: "door", label: "Lilac door", img: "door.png", widthPct: 24, tint: DOOR_TINTS.lilac },
  "door-coral": { slot: "door", label: "Coral door", img: "door.png", widthPct: 24, tint: DOOR_TINTS.coral },
  "door-seafoam": { slot: "door", label: "Seafoam door", img: "door.png", widthPct: 24, tint: DOOR_TINTS.seafoam },
};

export const FURNITURE_IDS = Object.keys(FURNITURE);

/* The four free level-1 rows. A room with an EMPTY slot draws these rather
   than a hole — see roomFurniture() below for why that is not the same as
   owning them. Must stay in step with the price-0 rows in
   supabase/migration-furniture-slots.sql; verify-store.html asserts it. */
export const DEFAULT_FURNITURE = {
  bed: "basic-bed", desk: "basic-desk", window: "city-window", door: "door-white",
};

export function furnitureExists(id) { return Object.prototype.hasOwnProperty.call(FURNITURE, id); }
export function furnitureLabel(id) { return (FURNITURE[id] && FURNITURE[id].label) || id; }
export function furnitureSlot(id) { return FURNITURE[id] ? FURNITURE[id].slot : null; }
export function furnitureImgSrc(id) { return `${DIR}/${(FURNITURE[id] || {}).img || ""}`; }

/* widthPct + anchor + attach for one item, slot defaults filled in. This is
   the exact shape dressing-room.html edits and hands back. */
export function placementFor(id) {
  const def = FURNITURE[id] || {};
  const slot = SLOT_PLACEMENT[def.slot] || { anchor: { x: 0.5, y: 0.5 }, attach: { x: 0.5, y: 0.5 } };
  return {
    widthPct: def.widthPct || 30,
    anchor: def.anchor || slot.anchor,
    attach: def.attach || slot.attach,
  };
}

/* ---------- what the room actually shows ----------
   An equipped id wins; anything else (empty slot, an id this build does not
   know, a slot the learner has never touched) falls back to the free
   default. So a brand-new learner walks into a COMPLETE room and taking off
   the capsule bed puts the wooden one back rather than leaving a hole —
   while buying the free basic-bed is still a real purchase, because owning
   it is what lets you equip it deliberately. Recorded as a judgement call
   in PROJECT-STATUS.md. */
export function roomFurniture(equipped) {
  const eq = (equipped && typeof equipped === "object") ? equipped : {};
  const out = {};
  for (const slot of FURNITURE_SLOTS) {
    const id = eq[slot];
    out[slot] = furnitureExists(id) ? id : DEFAULT_FURNITURE[slot];
  }
  return out;
}

/* One picture. The untinted file is set immediately and a tinted copy swaps
   in when the canvas resolves — the same "paint now, recolour when ready"
   convention renderCompanion uses for the body, so nothing ever renders
   blank while a data-URL is built (and a failed tint just leaves the plain
   grey door, which is a real item, not a broken one). */
export function furnitureArt(id) {
  const def = FURNITURE[id];
  const wrap = el("div", "furn-art");
  const img = document.createElement("img");
  img.alt = "";
  img.draggable = false;
  if (def) {
    const src = furnitureImgSrc(id);
    img.src = src;
    if (def.tint) tintedImageSrc(src, def.tint).then((u) => { img.src = u; }).catch(() => { /* keep the plain art */ });
  }
  wrap.appendChild(img);
  return wrap;
}

/* One piece, positioned on the room shell. Percentages throughout (the room
   box is fluid), and the anchor is applied as a translate of the element's
   OWN size, so an item's height never has to be known in advance — the
   picture's natural aspect decides it. */
export function furnitureLayer(id) {
  const p = placementFor(id);
  const layer = el("div", "room-furn slot-" + (furnitureSlot(id) || "none"));
  layer.dataset.furniture = id;
  layer.dataset.slot = furnitureSlot(id) || "";
  layer.style.width = p.widthPct + "%";
  layer.style.left = (p.attach.x * 100) + "%";
  layer.style.top = (p.attach.y * 100) + "%";
  layer.style.transform = `translate(${-p.anchor.x * 100}%, ${-p.anchor.y * 100}%)`;
  layer.appendChild(furnitureArt(id));
  return layer;
}
