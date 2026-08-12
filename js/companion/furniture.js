/* ============================================================
   FURNITURE — the isometric room's shoppable pieces.
   Room build S5v2 (2026-08-08), per the REVISION section of
   ROOM-BUILD-PLAN.md.

   Eight equip slots: door · window · desk · bed (room build S5v2) and
   shelf-left · shelf-right · beanbag · wall (room decor, 2026-08-12).
   Server-side these are `shop_items` rows with category 'furniture' (seeded
   by supabase/migration-furniture-slots.sql then
   supabase/migration-room-decor.sql, mirrored in js/local-backend.js); they
   are bought and equipped through the SAME mhq_buy_item / mhq_equip
   machinery a hat uses, so ownership and level gates are the server's
   business, not this file's.

   Two of those eight behave unlike the rest, and both differences live in
   this file alone — the server treats all eight identically:
     • shelf-left / shelf-right / beanbag have NO free default, so they can
       be genuinely EMPTY (roomFurniture returns null for them).
     • wall draws no layer at all: it swaps the room's background picture
       (roomShellSrc), which is why it is absent from FURNITURE_SLOTS.

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
   one door drawing, door.png, and every COLOUR is that same file tinted
   through renderer.js's `tintedImageSrc` — the offscreen-canvas pipeline
   Blip's own recolouring uses. Never add a second door PNG for a colour.
   ⚠️ REWORDED 2026-08-12, because the original said "never add a second
   door PNG" flat and that is now too broad: the six CLOSET DESIGNS below
   are six separate files, and rightly so. The rule is about colours — mint
   and coral are one drawing tinted twice and must stay that way. A
   patterned closet is a different piece of furniture that happens to share
   the slot, like a canopy bed against a wooden one. Colour → tint. Design
   → its own file.

   ⚠️ THE PLACEMENT NUMBERS BELOW ARE MEGAN'S. She placed the door, window,
   desk and bed herself in dressing-room.html (Furniture mode) on 2026-08-08
   and handed the numbers back, the same way she settled the 41 accessories
   the same day. Don't hand-tune them — run the page and ask her.
   ============================================================ */
import { el } from "../ui.js";
import { tintedImageSrc } from "./renderer.js";

const DIR = "./assets/companion/furniture";
/* Wallpapers are the ROOM SHELL itself, so they live one level up beside
   room-shell.png rather than in furniture/. An entry marked `shell: true`
   reads from here — see furnitureImgSrc. */
const SHELL_DIR = "./assets/companion";

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
  // ⚠️ SETTLED BY MEGAN in dressing-room.html (Furniture mode), 2026-08-08 —
  // these are her numbers, pasted back and applied verbatim, exactly like the
  // 41 hand-placed accessories. Don't hand-tune them; run the page.
  //
  // RIGHT wall, back end, STANDING ON THE FLOOR. Her layout call: the door
  // and the bed share this wall, the door at the back. Tap target for the
  // Inventory sheet.
  //
  // ⚠️ y=0.542 IS A SEATED NUMBER, NOT A TASTEFUL ONE — she caught it hanging
  // twice. Measured along the door's own bottom edge against the right wall's
  // floor line (y = 0.423 + 0.247*(x-0.5)/0.5): at 0.520 the whole base was
  // above that line, by 0.027 at the left end and more toward the right, so a
  // strip of dark wall showed underneath and it read as a cupboard bolted to
  // the wall. Two things make this NOT a number you can reason to in one go:
  // the drawing's lowest pixel is at 72% across (the depth face's corner),
  // NOT at either front corner, so anchoring by the picture's bottom edge
  // seats a corner nobody looks at; and the art's base slopes slightly
  // shallower than the floor line, so no single y sits flush along the whole
  // edge. 0.542 seats the FRONT face — the doors, which is what the eye
  // reads as the bottom — and lets the far corner sit a touch forward.
  door: { anchor: { x: 0.5, y: 1 }, attach: { x: 0.650, y: 0.542 } },
  // LEFT wall, ABOVE the desk. ⚠️ MEASURED, NOT CHOSEN: the porthole art's
  // major axis slopes UP to the right (left column mid-y 0.619, right column
  // 0.371), which is the LEFT wall's rake — it was drawn for this wall. It
  // spent the first draft of S5v2 on the right wall, where it leaned against
  // the room. At x=0.311 that wall spans y 0.113-0.516.
  window: { anchor: { x: 0.5, y: 0.5 }, attach: { x: 0.311, y: 0.287 } },
  // floor, LEFT side, under its window (the reference room's desk lean).
  // At x=0.221 the floor spans y 0.561-0.816.
  desk: { anchor: { x: 0.5, y: 0.95 }, attach: { x: 0.221, y: 0.736 } },
  // floor, RIGHT side, NEXT TO THE DOOR (her layout call). At x=0.75 the
  // floor spans y 0.547-0.835, and she has put the bed's feet right on that
  // front lip — deliberate, it is what puts him and the bed side by side
  // rather than the bed behind him.
  bed: { anchor: { x: 0.5, y: 0.95 }, attach: { x: 0.750, y: 0.816 } },

  /* ---- room decor (2026-08-12) ----
     ⚠️ SETTLED BY MEGAN in dressing-room.html (Furniture mode), 2026-08-12 —
     her numbers, pasted back and applied verbatim, exactly like the four
     slots above and the 41 accessories before them. Don't hand-tune them;
     run the page.

     Her arrangement is tighter than the first guess in every direction: both
     shelves came DOWN in size (widthPct 26 -> 16, so they read as shelves
     rather than as planks), the left one dropped and the right one rose so
     the two sit at different heights instead of mirroring each other, and
     the bean bag moved right across the room — from the front-left floor
     into the BACK CORNER at (0.457, 0.537), tucked behind where Blip stands
     rather than beside him. */
  "shelf-left": { anchor: { x: 0.5, y: 0.5 }, attach: { x: 0.137, y: 0.383 } },
  "shelf-right": { anchor: { x: 0.5, y: 0.5 }, attach: { x: 0.862, y: 0.403 } },
  beanbag: { anchor: { x: 0.5, y: 0.95 }, attach: { x: 0.457, y: 0.537 } },
};

/* Paint order, BACK to FRONT. Wall pieces go down first, then the floor
   pieces; Blip is mounted after all of them, so he stands in front of the
   desk and bed (he is centre-front on the floor, they are behind him).

   ⚠️ THE SHELVES PAINT BEFORE THE DOOR, and that ordering is load-bearing.
   A shelf hangs ON the right wall; the door STANDS on the floor against it,
   nearer the viewer. If the two ever overlap, the door has to win — paint
   the shelf later and a wall-mounted plank appears to float in front of a
   piece of furniture standing in front of it. The door moved from first to
   fourth in this list for exactly that reason (2026-08-12); nothing else
   depends on its old position, and the two wall pieces above it cannot
   overlap each other because they are on opposite walls.

   ⚠️ `wall` IS DELIBERATELY NOT IN THIS LIST. A wallpaper is a real equip
   slot server-side, but it draws no layer — it replaces the room shell
   itself. See roomShellSrc() below. Adding it here would append an <img> of
   a whole room on top of the room. */
export const FURNITURE_SLOTS = ["window", "shelf-left", "shelf-right", "door",
  "desk", "bed", "beanbag"];

/* The `wall` slot exists in FURNITURE and in the shop, just not in the paint
   order above — kept as its own named export so nothing has to hard-code the
   string in three files. */
export const WALL_SLOT = "wall";

export const FURNITURE_SLOT_LABELS = {
  bed: "Bed", desk: "Desk", window: "Window", door: "Door",
  "shelf-left": "Left shelf", "shelf-right": "Right shelf",
  beanbag: "Bean bag", wall: "Wallpaper",
};

/* ⚠️ SLOTS THAT MAY LEGITIMATELY BE EMPTY. Every slot the room build shipped
   has a free default that fills it, so those slots are never bare. These
   three are decor a learner ADDS: "Take it out" has to really take it out,
   or a shelf becomes a thing you can never take off your wall. shelf-wood-*
   is free, but free is not the same as default — see DEFAULT_FURNITURE. */
export const OPTIONAL_FURNITURE_SLOTS = ["shelf-left", "shelf-right", "beanbag"];

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
  "basic-bed": { slot: "bed", label: "Wooden bed", img: "basic-bed.png", widthPct: 41 },
  "basic-desk": { slot: "desk", label: "Study desk", img: "basic-desk.png", widthPct: 33 },
  "city-window": { slot: "window", label: "City window", img: "city-window.png", widthPct: 20 },

  // ---- techy (Lv 8) — furniture-iso-techy.png (the holo screen floats
  //      detached above the desk, so that sheet is sliced with --group) ----
  "techy-bed": { slot: "bed", label: "Capsule bed", img: "techy-bed.png", widthPct: 37 },
  "techy-desk": { slot: "desk", label: "Holo desk", img: "techy-desk.png", widthPct: 36 },
  "space-window": { slot: "window", label: "Space window", img: "space-window.png", widthPct: 20 },

  // ---- princess (Lv 14) — furniture-iso-princess.png ----
  // The canopy bed sits at 41, matching the wooden one — HER CALL
  // (2026-08-08): a four-poster that reads smaller than the plain bed it is
  // meant to be an upgrade from looks wrong, and at Megan's placement it has
  // the room for it. The vanity stays narrower: it is the tallest thing in
  // the catalogue (mirror included) and does not need the width.
  "princess-bed": { slot: "bed", label: "Canopy bed", img: "princess-bed.png", widthPct: 41 },
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

  /* ---- closet designs (2026-08-12) — her six Tripo closets ----
     ⚠️ THESE DO NOT BREAK THE "ONE DOOR PICTURE" RULE ABOVE — read it again
     before touching either. That ruling is about the nine COLOURS: mint and
     coral are the same drawing tinted, and must never become nine PNGs.
     A patterned closet is not a colour, it is a different piece of
     furniture that happens to live in the same slot, exactly like a canopy
     bed against a wooden one. So: nine colours, one file, tinted; six
     designs, six files, untinted. Adding a seventh COLOUR still means a
     tint, not a PNG.

     ⚠️ EACH ONE'S SEAT WAS SOLVED, NOT COPIED. `attach.y` 0.542 is the
     number that seats DOOR.PNG's front face on the right wall's floor line
     (y = 0.423 + 0.247(x-0.5)/0.5) — it is specific to that drawing's own
     bottom edge, and she caught the closet hanging TWICE before it was
     right. Four of these six have a different bottom edge and sink into the
     floor at 0.542, so each one's attach.y was solved until its front face
     sits flush and then verified. `lines` and `emo` came out at 0.543 and
     0.542, i.e. the slot default, so they carry no override. The three
     with legs or a plinth (`lines`, `emo`, `flower`) also float between
     their feet, which is correct and is why the seat is measured on the
     FRONT FACE only, not on the lowest pixel.

     widthPct is per piece for the same reason: all seven drawings are 512
     tall, so their widths are pure aspect, and matching rendered HEIGHT to
     the shipped door means scaling widthPct by each one's own width. */
  "closet-nerdy": { slot: "door", label: "Bookshelf closet", img: "closet-nerdy.png", widthPct: 22, attach: { x: 0.650, y: 0.529 } },
  "closet-sport": { slot: "door", label: "Locker closet", img: "closet-sport.png", widthPct: 23, attach: { x: 0.650, y: 0.537 } },
  "closet-lines": { slot: "door", label: "Striped closet", img: "closet-lines.png", widthPct: 22 },
  "closet-starry": { slot: "door", label: "Starry closet", img: "closet-starry.png", widthPct: 21, attach: { x: 0.650, y: 0.533 } },
  "closet-flower": { slot: "door", label: "Daisy closet", img: "closet-flower.png", widthPct: 24, attach: { x: 0.650, y: 0.506 } },
  "closet-emo": { slot: "door", label: "Midnight closet", img: "closet-emo.png", widthPct: 24 },

  /* ---- room decor (2026-08-12) — her 2026-08-09 Tripo drop, wired ----
     ⚠️ EVERY widthPct BELOW IS PROVISIONAL. The three themed sets reuse the
     shipped sets' numbers because their drawings measure the same (all six
     windows are ~320x375; the desks are within 12% of basic-desk and share
     its aspect to three decimal places), but "measures the same" is not
     "looks right in the room", and only looking proves art. Checked with
     tools/preview_room.py, not on a phone. */

  // ---- nerdy (Lv 4) — space-duvet bed, books-and-cactus desk, telescope
  //      porthole. Sized to the basic set: nerdy-desk is 380x369 against
  //      basic-desk's 338x327, the same shape 12% bigger, so 33 holds.
  "nerdy-bed": { slot: "bed", label: "Space bed", img: "nerdy-bed.png", widthPct: 41 },
  "nerdy-desk": { slot: "desk", label: "Study bench", img: "nerdy-desk.png", widthPct: 33 },
  "nerdy-window": { slot: "window", label: "Telescope window", img: "nerdy-window.png", widthPct: 20 },

  // ---- sport (Lv 11) — ball-print bed, trophy desk, stadium porthole ----
  "sport-bed": { slot: "bed", label: "Team bed", img: "sport-bed.png", widthPct: 41 },
  "sport-desk": { slot: "desk", label: "Trophy desk", img: "sport-desk.png", widthPct: 33 },
  "sport-window": { slot: "window", label: "Stadium window", img: "sport-window.png", widthPct: 20 },

  // ---- emo (Lv 18) — black four-poster with bat pillows, candle desk,
  //      curtained moon window ----
  "emo-bed": { slot: "bed", label: "Midnight bed", img: "emo-bed.png", widthPct: 41 },
  "emo-desk": { slot: "desk", label: "Candle desk", img: "emo-desk.png", widthPct: 33 },
  "emo-window": { slot: "window", label: "Moon window", img: "emo-window.png", widthPct: 20 },

  /* ---- shelves ----
     ⚠️ THE SUFFIX IS THE WALL, NOT A MIRROR FLAG. Each side is its own
     drawing and they are NOT interchangeable. Measured off the alpha
     (mid-y of the leftmost tenth vs the rightmost tenth): every `-left`
     piece slopes UP to the right — the left wall's rake, the same one all
     six windows carry — and every `-right` piece slopes DOWN to the right.
     Hang one on the other wall and it leans against the room, which is the
     exact fault that moved the window walls during S5v2. There is no flipX
     shortcut here and none is wanted: `flipX` mirrors an accessory about
     its own centre, which would also mirror the wood grain and the
     brackets.

     ⚠️ ALL EIGHT SHELVES ARE 16, AND SHE SIZED ONLY THE WOODEN PAIR
     (2026-08-12). widthPct is per PIECE, so the other three designs kept the
     provisional 26 and would have rendered 60% wider than the shelf she had
     just sized — the same object, the same spot, two different sizes. All
     four drawings are 400px wide at the same scale, so one widthPct gives
     them one rendered width, which is what she was choosing when she picked
     16. This is an inference from her measurement, not a number she gave;
     if any single design wants its own size, that is a one-line override.
     The PANEL shelf is the one to look at first — its art is 348px tall
     against the others' ~305, so at the same width it hangs lower. */
  "shelf-wood-left": { slot: "shelf-left", label: "Wooden shelf", img: "shelf-wood-left.png", widthPct: 16 },
  "shelf-wood-right": { slot: "shelf-right", label: "Wooden shelf", img: "shelf-wood-right.png", widthPct: 16 },
  "shelf-glossy-left": { slot: "shelf-left", label: "Glossy shelf", img: "shelf-glossy-left.png", widthPct: 16 },
  "shelf-glossy-right": { slot: "shelf-right", label: "Glossy shelf", img: "shelf-glossy-right.png", widthPct: 16 },
  "shelf-bracket-left": { slot: "shelf-left", label: "Bracket shelf", img: "shelf-bracket-left.png", widthPct: 16 },
  "shelf-bracket-right": { slot: "shelf-right", label: "Bracket shelf", img: "shelf-bracket-right.png", widthPct: 16 },
  "shelf-panel-left": { slot: "shelf-left", label: "Panel shelf", img: "shelf-panel-left.png", widthPct: 16 },
  "shelf-panel-right": { slot: "shelf-right", label: "Panel shelf", img: "shelf-panel-right.png", widthPct: 16 },

  // ---- bean bag (Lv 6) — one floor piece, no free version. Size hers. ----
  "beanbag": { slot: "beanbag", label: "Bean bag", img: "beanbag.png", widthPct: 17 },

  /* ---- wallpaper ----
     ⚠️ THESE DRAW NO LAYER. `shell: true` means the art IS the room shell:
     roomShellSrc() hands it to the .room background and no furnitureLayer is
     ever built for this slot. The swap is geometry-safe because Tripo held
     the room's shape across the whole drop — 99.7% silhouette overlap with
     the floor lines aligned, checked by edge-overlay on 2026-08-09 — so
     every placement number in this file still means the same thing whichever
     wallpaper is up. The patterned shells are 139-234 KB against the plain
     one's 51 KB (patterned walls do not quantise small); one is loaded at a
     time and it is the only art on screen 100% of the time, so that is
     accepted rather than ideal.

     ⚠️ THE FILE NAMES DO NOT DESCRIBE THE DRAWINGS — the ids below do. Tripo
     named the exports before anyone looked at them: room-shell-sky.png is
     the TEAL one with moons and clouds, and room-shell-cloudy.png is the
     dark navy one with line-drawn mountains. So `wall-moons` reads
     room-shell-sky.png and `wall-mountains` reads room-shell-cloudy.png, on
     purpose. Do not "correct" either mapping to match the file name; open
     the two PNGs first. (`room-shell-cloud.png` really is the cloud-and-star
     one and `room-shell-stripes.png` really is the striped one.) */
  "wall-plain": { slot: "wall", label: "Plain walls", img: "room-shell.png", shell: true },
  "wall-cloud": { slot: "wall", label: "Clouds & stars", img: "room-shell-cloud.png", shell: true },
  "wall-moons": { slot: "wall", label: "Moons & clouds", img: "room-shell-sky.png", shell: true },
  "wall-mountains": { slot: "wall", label: "Misty mountains", img: "room-shell-cloudy.png", shell: true },
  "wall-stripes": { slot: "wall", label: "Sky stripes", img: "room-shell-stripes.png", shell: true },
};

export const FURNITURE_IDS = Object.keys(FURNITURE);

/* The free level-1 rows that FILL AN EMPTY SLOT. A room with an empty bed
   slot draws the wooden bed rather than a hole — see roomFurniture() below
   for why that is not the same as owning it. Must stay in step with the
   price-0 rows in the migrations; verify-store.html asserts it.

   ⚠️ SHELF-LEFT, SHELF-RIGHT AND BEANBAG ARE ABSENT ON PURPOSE (2026-08-12),
   and their absence is the feature. shelf-wood-left/right ARE price-0 rows,
   so it looks like an oversight — it is not. A bed, desk, window and door
   are what a room IS; a shelf and a bean bag are things you put in one, and
   "Take it out" has to be able to leave the wall bare. Adding either id here
   would silently make shelves permanent the moment a learner bought one.
   OPTIONAL_FURNITURE_SLOTS above is the same fact, stated positively.

   `wall` IS here: the plain shell is the room the app has always had, so an
   empty wall slot is the original room rather than no room at all. */
export const DEFAULT_FURNITURE = {
  bed: "basic-bed", desk: "basic-desk", window: "city-window", door: "door-white",
  wall: "wall-plain",
};

export function furnitureExists(id) { return Object.prototype.hasOwnProperty.call(FURNITURE, id); }
export function furnitureLabel(id) { return (FURNITURE[id] && FURNITURE[id].label) || id; }
export function furnitureSlot(id) { return FURNITURE[id] ? FURNITURE[id].slot : null; }
/* Wallpapers read from assets/companion (they ARE room shells); everything
   else reads from assets/companion/furniture. */
export function furnitureImgSrc(id) {
  const def = FURNITURE[id] || {};
  return `${def.shell ? SHELL_DIR : DIR}/${def.img || ""}`;
}
export function furnitureIsShell(id) { return !!(FURNITURE[id] && FURNITURE[id].shell); }

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
    /* ⚠️ `?? null`, NOT the old bare lookup. Three slots have no default
       (see DEFAULT_FURNITURE), so this now returns null for an empty shelf
       or bean-bag slot and the caller must skip it — that null IS "the wall
       is bare", which is a legitimate room, not a missing picture. An
       unknown id still falls back the same way it always did, so a build
       that has never heard of an item a learner owns degrades to the plain
       piece rather than to a hole (for slots that HAVE a plain piece). */
    out[slot] = furnitureExists(id) ? id : (DEFAULT_FURNITURE[slot] ?? null);
  }
  return out;
}

/* ---------- the wallpaper ----------
   The `wall` slot's whole job: which room shell the .room element paints as
   its background. Deliberately NOT part of roomFurniture() — that function
   answers "what layers go on the room", and a wallpaper is not a layer, it
   is the room. Falls back to the plain shell, which is the background CSS
   has always set, so a learner who owns no wallpaper sees exactly the room
   that shipped and nothing here has to run for that to be true. */
export function roomShellSrc(equipped) {
  const eq = (equipped && typeof equipped === "object") ? equipped : {};
  const id = eq[WALL_SLOT];
  const useId = (furnitureExists(id) && furnitureIsShell(id)) ? id : DEFAULT_FURNITURE[WALL_SLOT];
  return furnitureImgSrc(useId);
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

/* ---------- the homework badge (room build §1, 2026-08-09) ----------
   A small "you have homework" cue that sits on the desk when an
   assignment is active — Megan's own red book-with-an-"!" drawing, never
   drawn by us. It is NOT a furniture piece: never bought, never in a
   shop row, never falls back to a placeholder. If the art is missing or
   fails to load it simply removes itself — no drawn substitute, no
   broken-image icon (her art rule).

   Positioned as a child of the desk's OWN .room-furn box (see
   furnitureLayer below), not as separate room-fraction maths — the desk
   element already carries every placement number from SLOT_PLACEMENT.desk
   and the equipped desk item's own widthPct, so nesting inside it is what
   makes the badge ride along automatically if Megan ever moves the desk
   or swaps its size; there is nothing here to keep in sync by hand. The
   offset (top-right corner, slightly overlapping) is the only number that
   belongs to the badge itself. */
const HOMEWORK_BADGE_SRC = "./assets/companion/homework-badge.png";
const HOMEWORK_BADGE_OFFSET = { widthPct: 28, right: -6, top: -8 }; // % of the desk's own box

export function homeworkBadgeLayer() {
  const badge = el("div", "room-furn-badge");
  badge.style.width = HOMEWORK_BADGE_OFFSET.widthPct + "%";
  badge.style.right = HOMEWORK_BADGE_OFFSET.right + "%";
  badge.style.top = HOMEWORK_BADGE_OFFSET.top + "%";
  const img = document.createElement("img");
  img.alt = "";
  img.draggable = false;
  img.addEventListener("error", () => badge.remove());
  img.src = HOMEWORK_BADGE_SRC;
  badge.appendChild(img);
  return badge;
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
