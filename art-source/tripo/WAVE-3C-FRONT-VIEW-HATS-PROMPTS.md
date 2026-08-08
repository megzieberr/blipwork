# Wave 3c — three headpieces re-drawn FRONT ON (2026-08-08)

## The problem these fix

`flower-crown`, `neural-crown` and `wizard-hat` were all drawn in
three-quarter or tilted view — you can see the **far side of the ring**, or
the inside of the brim, as if you were looking down at the item on a table.

Blip is drawn perfectly front-on and flat. So a headpiece drawn at an angle
never sits on him: the visible far edge reads as a second object floating
above his head, and no amount of moving it up or down fixes that. It is a
drawing problem, not a placement problem — which is why these need a re-roll
rather than another attach tweak.

**One rule does all the work: draw it as if the camera is exactly level with
it, straight in front. No looking down on it, no far side visible.**

## Reference image

The **blue droplet Blip** — the same reference as waves 1, 2 and 3. Same
reference every time or the set stops matching.

## Shape guidance, measured off his body

A headpiece sits across the top of his teardrop. His width at those heights
(fraction of the picture):

| height | how wide he is |
|---|---|
| y 0.20 | 0.20 |
| y 0.25 | 0.35 |
| y 0.30 | 0.48 |
| y 0.35 | 0.61 |

So anything meant to sit on his head wants to be roughly **three times wider
than it is tall** — a broad shallow band, not a tall or deep shape. Same
lesson the neck necklaces taught (see WAVE-3-PROMPTS.md Part 4).

## House rules that apply to all three

Flat solid magenta **#FF00FF**, no drop shadows, no glow, no aura, no
sparkles, nothing see-through, no text, item alone with nothing else in the
picture. Cut with `--opaque`.

---

## Prompt 1 — FLOWER CROWN, front view

```
Use the attached picture as a locked style reference: same art style, same
thick dark outline, same soft lighting and smooth matte finish. Do NOT draw
the character — the item only, alone, with nothing else in the picture.

Draw a flower crown seen STRAIGHT FROM THE FRONT, with the camera exactly
level with it. Show ONLY the front band of the crown — a wide, shallow arc
of small pink and white daisies with green leaves, curving gently downward
at both ends like a shallow smile. Do NOT draw a full ring, do NOT show the
far side or the back of the crown, do NOT show the inside of the ring, and
do NOT look down on it from above. It must read as a band of flowers lying
across the front of a head, about three times wider than it is tall.

NO drop shadows, no glow, no sparkles, nothing see-through, no text, on a
completely flat, solid, bright magenta background (#FF00FF).
```

## Prompt 2 — NEURAL CROWN, front view

```
Use the attached picture as a locked style reference: same art style, same
thick dark outline, same soft lighting and smooth matte finish. Do NOT draw
the character — the item only, alone, with nothing else in the picture.

Draw a futuristic tech crown seen STRAIGHT FROM THE FRONT, with the camera
exactly level with it. Show ONLY the front of it — a wide, shallow metal
band with a few short upright prongs rising from it and one solid gem at
the centre, curving gently downward at both ends. Do NOT draw a full ring,
do NOT show the far side or the back of the band, do NOT show the inside of
the ring, and do NOT look down on it from above. About three times wider
than it is tall.

Draw the gem as a SOLID shape with a hard outline, never glowing. NO drop
shadows, no glow, no aura, no sparkles, nothing see-through, no text, on a
completely flat, solid, bright magenta background (#FF00FF).
```

## Prompt 3 — WIZARD HAT, front view

```
Use the attached picture as a locked style reference: same art style, same
thick dark outline, same soft lighting and smooth matte finish. Do NOT draw
the character — the item only, alone, with nothing else in the picture.

Draw a pointed wizard hat seen STRAIGHT FROM THE FRONT, with the camera
exactly level with it, as flat as a paper cut-out. A tall cone leaning very
slightly to one side, sitting on a wide straight brim. The brim must be a
simple straight bar across the bottom — do NOT draw it as an oval or an
ellipse, do NOT show the underside of the brim, and do NOT look down on the
hat from above so that the opening shows.

NO drop shadows, no glow, no stars, no sparkles, nothing see-through, no
text, on a completely flat, solid, bright magenta background (#FF00FF).
```

---

## After she generates

1. **Check the silhouette first**: is any far edge or inside surface
   visible? If yes it will float on him no matter where it is put — re-roll
   rather than trying to place it.
2. Cut with `--opaque`, then place it in **`dressing-room.html`** and paste
   the numbers back. Do not reuse the old item's `widthPct`/`anchor` — new
   art, new measurements.
3. The three current items stay shipped and working until the new art
   lands; swapping the PNG plus a re-measure is the whole job, no migration.
