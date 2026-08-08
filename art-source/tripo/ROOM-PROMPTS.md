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
