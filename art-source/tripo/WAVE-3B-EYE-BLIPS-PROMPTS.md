# Wave 3b — four Blips, drawn WITH the eyes (2026-08-08)

## Why these exist

Sheets L and M drew each eye pair **on its own**, floating on magenta, to be
laid over Blip's face as an overlay. Two of the six worked (`lash-eyes`, the
pink eyeshadow pair, and `happy-eyes`, the rosy-cheek pair). The other four
read wrong on him — Megan's review: "eyes are not aligning… the rest looks
odd."

That is not a placement bug, and re-tuning `widthPct` will not fix it. A pair
drawn in isolation has no idea how far apart his eyes really sit, how big
they are relative to his face, or how the curve of his head crowds them. So
the four below are drawn **on the character**, where Tripo can see the
geometry it has to match.

Four separate prompts, one Blip each — not one sheet of four. Each is a whole
character, so it needs room; cramming four into a sheet costs the detail that
is the entire point.

## What to do with the result

Either route works and Megan picks after seeing them:

- **Overlay route (fits what is already built):** crop just the eye region
  out of the finished Blip and save it as `star-eyes.png` etc. The eyes are
  then guaranteed to sit at his real spacing, and everything already wired in
  S3 (`mask: true`, `widthPct`, the shop rows) keeps working with no code
  change beyond re-measuring the crop.
- **Whole-face route:** keep the full character. That is a bigger job — the
  FACE tab in the backlog — because every animation frame has its own face
  drawn in. Not a today thing.

Slice with **`--whole`**, not the per-item crop mode: these are character
sheets, and `--whole` keys the background to RGBA without cropping (the
convention `slice_sprites.py` needs). Add `--opaque` — nothing here is
meant to be see-through.

```
python tools/tripo_sheet.py SHEET.png --whole --opaque --out assets/...
```

## Reference image

The **blue droplet Blip** — the same one used for waves 1, 2 and 3. Same
reference every time or the set stops matching.

## The rule that matters most

**Only the eyes may change.** Same body shape, same electric blue, same navy
outline, same small smile, same proportions. If the body drifts, the crop
will not line up with the real art and the whole exercise is wasted. Every
prompt below says so twice on purpose.

**No arms, ever** (house rule, 2026-08-06) — arms are an accessory slot, so
arms drawn into the body double up the moment a learner equips a pair.

---

## Prompt 1 — STAR EYES (replaces `star-eyes`)

```
Use the attached picture as a locked reference. Draw this exact same
character again: the same rounded blue droplet body, the same shade of
bright blue, the same thick dark navy outline, the same glossy highlight,
the same small simple smile, the same proportions, front view, upright,
alone.

Do NOT give the character arms, legs, hands or any accessory. Change ONE
thing only: the eyes.

The eyes are huge and shining — big, tall, rounded eyes in the same dark
navy, each with two large solid white highlight circles and a solid white
four-pointed star shape sitting in the lower part of the eye. Draw the star
as a SOLID white shape with a clean edge, never glowing or twinkling.

Everything else must stay exactly as the reference. No drop shadows, no
glow, no aura, no sparkles, no text, nothing see-through. Place the
character on a completely flat, solid, bright magenta background (#FF00FF).
```

## Prompt 2 — ANGRY EYES (replaces `angry-eyes`)

```
Use the attached picture as a locked reference. Draw this exact same
character again: the same rounded blue droplet body, the same shade of
bright blue, the same thick dark navy outline, the same glossy highlight,
the same small simple smile, the same proportions, front view, upright,
alone.

Do NOT give the character arms, legs, hands or any accessory. Change ONE
thing only: the eyes.

The eyes are determined and narrowed — the same dark navy eyes, but shorter
and squarer, with the upper lid cutting across the top of each eye, and a
thick angled dark navy eyebrow above each one slanting down toward the
middle of the face. Keep a small white highlight in each eye. Draw the brows
as SOLID shapes with clean edges.

Everything else must stay exactly as the reference. No drop shadows, no
glow, no aura, no sparkles, no text, nothing see-through. Place the
character on a completely flat, solid, bright magenta background (#FF00FF).
```

## Prompt 3 — DREAMY EYES (replaces `dreamy-eyes`)

```
Use the attached picture as a locked reference. Draw this exact same
character again: the same rounded blue droplet body, the same shade of
bright blue, the same thick dark navy outline, the same glossy highlight,
the same small simple smile, the same proportions, front view, upright,
alone.

Do NOT give the character arms, legs, hands or any accessory. Change ONE
thing only: the eyes.

The eyes are half-closed and dreamy — each eye is covered from above by a
heavy lowered eyelid painted a soft solid lilac, so only the bottom half of
the dark navy eye shows underneath, with a few long lower lashes curving
down below each eye. Keep a small white highlight in the visible part of
each eye. Paint the lilac lids as SOLID flat colour with a clean dark
outline, never soft or faded out.

Everything else must stay exactly as the reference. No drop shadows, no
glow, no aura, no sparkles, no text, nothing see-through. Place the
character on a completely flat, solid, bright magenta background (#FF00FF).
```

## Prompt 4 — WINK EYES (replaces `wink-eyes`)

```
Use the attached picture as a locked reference. Draw this exact same
character again: the same rounded blue droplet body, the same shade of
bright blue, the same thick dark navy outline, the same glossy highlight,
the same small simple smile, the same proportions, front view, upright,
alone.

Do NOT give the character arms, legs, hands or any accessory. Change ONE
thing only: the eyes.

The character is winking. Its LEFT eye (on the viewer's left) is closed — a
single thick dark navy curved line arcing downward, with two or three short
lashes at its outer end. Its RIGHT eye is wide open, big and round, in the
same dark navy as the reference, with a large solid white highlight. Both
eyes must sit at the same height and the same distance apart as the eyes in
the reference picture.

Everything else must stay exactly as the reference. No drop shadows, no
glow, no aura, no sparkles, no text, nothing see-through. Place the
character on a completely flat, solid, bright magenta background (#FF00FF).
```

---

## After she generates

1. **Look at the body first, not the eyes.** If the blue, the outline weight
   or the silhouette has drifted from the reference, re-roll — a drifted body
   makes the eye crop useless.
2. Check the eyes sit at the same spacing as his real ones. Measured off
   `blip-base-blue.png`: his painted eyes are centred at **x 0.308 and 0.688**
   of his width and span **y 0.487–0.63**.
3. **Do not reuse S3's `widthPct`/`anchor` numbers on the new crops.** That
   assumption is exactly what went wrong with the wings this session — a
   number borrowed from a sibling item without checking the new art's own
   pixels. Re-measure each crop and preview it with
   `tools/preview_accessory.py` before wiring it up.
