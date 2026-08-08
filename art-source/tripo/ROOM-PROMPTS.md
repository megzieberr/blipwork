# Room build — Tripo prompts (furniture + trinkets)

Written 2026-08-08 for the Blip's-room build. Same drill as wave 2: attach the
SAME blue droplet Blip reference image to every prompt, pick ONE variant per
item, save each sheet into this folder under the exact filename given, and the
build sessions slice them. If a sheet isn't done in time the app ships with
placeholders and your art swaps in later — nothing blocks on this.

Rules that carry over from wave 2, plus two new ones:

- **Same reference image every time**, or the set stops matching.
- **Flat magenta #FF00FF, no drop shadows** — baked into every prompt tail.
- **No glow, no sparkles, solid clean edges** — furniture and trinkets are
  solid objects, so the slicer runs `--opaque` on all of these sheets.
- **NEW — the room is DARK navy.** Furniture must be light or warmly coloured
  to read against it (the amber-schoolbag lesson). Nothing mostly dark navy
  or mostly blue — Blip himself is blue and sits right next to everything.
- **NEW — views are PER ITEM (Megan, 2026-08-08):** beds and desks in SIDE
  view (beds empty, nobody in them), fridge in FRONT view, closet at a
  FRONT-SIDE three-quarter angle. Everything sits flat, no floor line.

---

## Sheet 1 — `furniture-basic.png` (bed, desk, fridge, closet)

```
Use the attached picture as a locked style reference. Draw NEW furniture
items in exactly this art style: same soft lighting, same smooth matte
finish, same thick friendly outlines. Do NOT draw the character — items
only, each shown alone, spaced well apart, not touching, no floor line,
NO drop shadows, no glow, solid clean edges, on a completely flat, solid,
bright magenta background (#FF00FF). Cheerful light colours that stand
out on a dark navy wall. Items: 1) a cosy single bed in SIDE VIEW, empty
and neatly made with nobody in it, cream frame, soft teal duvet and a
round pillow, 2) a small wooden study desk in SIDE VIEW with a little
chair tucked in and a tiny lamp on top, 3) a cute mint-green fridge in
FRONT VIEW with rounded corners and a silver handle, 4) a warm honey-wood
wardrobe closet seen from a front-side three-quarter angle, as if you
were standing slightly to one side of it, two doors, one slightly open
showing a hint of a clothes rail.
```

## Sheet 2 — `furniture-techy.png` (techy bed + techy desk)

```
Use the attached picture as a locked style reference. Draw NEW furniture
items in exactly this art style: same soft lighting, same smooth matte
finish, same thick friendly outlines. Do NOT draw the character — items
only, each shown alone, spaced well apart, not touching, no floor line,
NO drop shadows, no glow haze, solid clean edges, on a completely flat,
solid, bright magenta background (#FF00FF). Light silver and white with
cyan accents so it stands out on a dark navy wall. Items: 1) a futuristic
capsule bed in SIDE VIEW, empty and neatly made with nobody in it, white
shell, padded silver mattress, a thin cyan light strip along the base
drawn as a solid stripe, 2) a sleek white gaming desk in SIDE VIEW with
an angled top, a small holographic-style screen drawn as a solid
pale-cyan panel on a stand, and a floating-look chair.
```

## Sheet 3 — `furniture-princess.png` (canopy bed + vanity desk)

```
Use the attached picture as a locked style reference. Draw NEW furniture
items in exactly this art style: same soft lighting, same smooth matte
finish, same thick friendly outlines. Do NOT draw the character — items
only, each shown alone, spaced well apart, not touching, no floor line,
NO drop shadows, no glow, no sparkles, solid clean edges, on a completely
flat, solid, bright magenta background (#FF00FF). Soft pastel pinks,
cream and gold so it stands out on a dark navy wall. Items: 1) a
fairytale four-poster canopy bed in SIDE VIEW, empty and neatly made
with nobody in it, cream frame with gold tips, blush-pink duvet and a
draped pink canopy drawn as solid fabric, 2) a princess vanity desk in
SIDE VIEW in cream and gold, with its heart-shaped mirror angled so it
still shows, and a tiny padded stool.
```

## Sheet 4 — `trinkets.png` (the junk loot)

```
Use the attached picture as a locked style reference. Draw NEW small
objects in exactly this art style: same soft lighting, same smooth matte
finish, same thick friendly outlines. Do NOT draw the character — items
only, each shown alone, front view, spaced well apart, not touching, NO
drop shadows, no glow, solid clean edges, on a completely flat, solid,
bright magenta background (#FF00FF). These are silly everyday objects,
drawn cute: 1) a plain blue ballpoint pen, 2) a single droopy grey sock
with one red stripe, 3) a smooth round grey pebble with a happy shine
spot, 4) a bent silver paperclip, 5) a yellow rubber duck, 6) a snapped
wooden ruler with both halves side by side.
```

---

# REVISION 2026-08-08 afternoon — the ISOMETRIC room

Megan redirected the room to an isometric two-wall corner view (see
ROOM-BUILD-PLAN.md's REVISION section). The three flat furniture prompts
above are SUPERSEDED — use the sheets below. Attach the ISOMETRIC ROOM
CONCEPT picture (the sci-fi corner room with the droplet) as the locked
reference for these, so the angles and style match. The empty shell
(`room-shell.png`) and window sheet (`windows.png`) prompts were issued in
chat; the shell is used WHOLE (never keyed, no magenta), windows are keyed.

Angle rule: LEFT-wall items (desk) lean like the reference's desk;
RIGHT-wall items (bed, window) lean like the reference's bed. The closet
sits on the back-left wall like the reference's tall cupboard.

## Sheet R1 — `furniture-iso-basic.png` (bed, desk, closet)

## Sheet R2 — `furniture-iso-techy.png` (capsule bed, holo desk)

## Sheet R3 — `furniture-iso-princess.png` (canopy bed, vanity desk)

(The three prompts live in the session chat of 2026-08-08 and are pasted
verbatim by Megan into Tripo; kept out of this file to avoid drift — this
table is the canonical record of filenames and slicing names.)

## Slicing (revision) — all sheets `--opaque`

⚠️ **THESE ARE THE COMMANDS THAT ACTUALLY RAN** (S5v2, 2026-08-08). Three of
the six differ from what was written here in advance, every one caught by
reading the `at x…,y…` the slicer prints — which is the whole reason that
warning exists. Corrected in place so the next session inherits the truth.

| sheet | command that worked |
|---|---|
| furniture-iso-basic | `--names basic-desk,basic-bed,unused-wardrobe` — ⚠️ **desk reads FIRST**, and the third item is the old wardrobe, which the door replaces: it is sliced and then **deleted**, not shipped |
| furniture-iso-techy | `--group "1+2,3" --names techy-desk,techy-bed` — ⚠️ the holo screen floats DETACHED above the desk, so `--group` joins components 1+2 into one item; desk is LEFT on the sheet, bed RIGHT |
| furniture-iso-princess | `--names princess-desk,princess-bed` — ⚠️ **desk reads FIRST**, not the bed |
| windows | `--names city-window,space-window,mountain-window` (as written) |
| door | `--names door` — from **`door 2.png`**, not `door.png`. Her first door faces down-RIGHT (a left-wall object); the second faces down-LEFT, which is what the RIGHT wall needs, and the right wall is where the door ended up |
| trinkets | `--min-area 9000 --names old-sock,smooth-rock,paper-clip,pen,rubber-duck,broken-ruler --out assets/companion/trinkets` — ⚠️ **two surprises**: the PEN reads FOURTH (it is drawn tall enough to span both rows, so its centre lands in the second row band), and this sheet's magenta is noisy (0.182), which at the default `--min-area 256` broke it into **39 "items"**, 33 of them speckle |

Furniture goes to `--out assets/companion/furniture`; trinkets to
`assets/companion/trinkets`.

`room-shell.png` is NEVER sliced. It is **not magenta either** — it came
back on WHITE, so it is keyed by flooding the border-connected white
(scipy, not `ImageDraw.floodfill`, which is a no-op in Pillow 12), trimmed
to its own bounds, downscaled to 768px and palette-quantised to 128
colours: **597 KB → 51 KB**, and it is the one asset on screen 100% of the
time. There is no interior white pixel in the drawing, so the flood is
provably safe. The room's CSS pins `.room` to that picture's exact
768×762 aspect ratio, because every placement fraction in
`js/companion/furniture.js` is measured against it.

---

## Slicing (run by the build sessions, listed here for reference)

```
python tools/tripo_sheet.py "art-source/tripo/<sheet>.png" --names ... --opaque
```

| sheet | --names |
|---|---|
| furniture-basic | `basic-bed,basic-desk,fridge,closet` |
| furniture-techy | `techy-bed,techy-desk` |
| furniture-princess | `princess-bed,princess-desk` |
| trinkets | `pen,old-sock,smooth-rock,paper-clip,rubber-duck,broken-ruler` |

⚠️ Names are handed out by position (rows, left to right) — always check the
`at x…,y…` the slicer prints against the sheet before trusting them; a piece
floating higher than its neighbours reads FIRST (the monocle lesson).

⚠️ All four sheets use `--opaque` (author's declaration: nothing translucent
was prompted). Never reuse that flag on an effects/glow sheet.
