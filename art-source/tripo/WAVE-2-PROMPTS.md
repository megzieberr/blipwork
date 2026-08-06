# Tripo wave 2 — techy accessories (15 drawn, 14 shipped, 5 sheets)

Written 2026-08-05. Wave 1 shipped the same day; this is the follow-up Megan
asked for, aimed at the SL/techy look.

## Why these items

The shop is lopsided. After wave 1: Hat 7 · Eyes 7 · Wings 5 · Back 4 ·
Effects 5 · **Ears 3 · Arms 3**. So ears and arms get a sheet each, and the
rest spreads across effects, head and back.

## Rules that apply to every sheet

- **Same reference image every time.** Attach the blue droplet Blip you used
  for wave 1. Different reference = a set that stops matching.
- **Flat magenta, no shadows.** The tail of every prompt below already says so.
  A drop shadow bleeds into the background and ruins the cut-out.
- **Paired slots are drawn ONCE**, and the orientation matters, because the
  app mirrors the other side:
  - **arms** — shoulder at the TOP-RIGHT of the picture, hand at the lower
    left (matches the code-drawn arms; no flip needed).
  - **ears** — drawn upright, base at the bottom-centre.
  - **wings** — root at the LOWER-LEFT sweeping up to the right (same as your
    wave-1 wings; the renderer's `flipX` handles it).
- **Back items must CONTRAST with blue** — amber, red, gold, white. A blue
  back item vanishes behind him (the schoolbag lesson).
- **Effects must be WIDER than he is** to read at all, so ring/halo shapes
  work best. A compact blob needs a low attach or the body swallows it.
- Pick ONE variant per item, then run the slicer (commands at the bottom).

---

## Sheet A — ARMS

```
Use the attached picture as a locked style reference. Draw NEW accessory
items in exactly this art style: same soft lighting, same smooth matte
finish, same colour feel. Do NOT draw the character itself — items only,
each shown alone, front view, spaced apart, not touching, NO drop shadows,
on a completely flat, solid, bright magenta background (#FF00FF). Draw only
ONE of each (a single left-hand piece), with the shoulder end at the top
right of the shape and the hand end at the lower left. Items: 1) a chunky
robotic mech gauntlet in brushed steel with glowing blue seams, 2) a sleek
armoured forearm with a short amber energy blade projecting past the fist,
3) a mechanical grappling claw arm with three metal fingers open.
```

## Sheet B — EARS

```
Use the attached picture as a locked style reference. Draw NEW accessory
items in exactly this art style: same soft lighting, same smooth matte
finish, same colour feel. Do NOT draw the character itself — items only,
each shown alone, front view, upright with its base at the bottom, spaced
apart, not touching, NO drop shadows, on a completely flat, solid, bright
magenta background (#FF00FF). Draw only ONE of each, not a pair. Items:
1) a slim telescopic antenna with a glowing blue bulb at the tip,
2) a padded cyber headset ear cup in dark grey with a glowing blue ring,
3) an angular translucent data fin like a small tech shark fin, cyan with
darker edge lines.
```

## Sheet C — EFFECTS

```
Use the attached picture as a locked style reference. Draw NEW accessory
items in exactly this art style: same soft lighting, same smooth matte
finish, same colour feel. Do NOT draw the character itself — items only,
each shown alone, front view, spaced apart, not touching, NO drop shadows,
on a completely flat, solid, bright magenta background (#FF00FF). Each item
is a RING seen face-on, drawn with solid clean edges rather than a soft
haze. Items: 1) a circuit ring — a metal band with glowing blue circuit-board
traces running around it, 2) a holographic grid ring made of thin cyan
wireframe lines, 3) a violet plasma ring with thick swirling energy and
small sparks, premium and ominous.
```

## Sheet D — HEAD AND EYES

```
Use the attached picture as a locked style reference. Draw NEW accessory
items in exactly this art style: same soft lighting, same smooth matte
finish, same colour feel. Do NOT draw the character itself — items only,
each shown alone, front view, spaced apart, not touching, NO drop shadows,
on a completely flat, solid, bright magenta background (#FF00FF). Items:
1) a neural crown — a slim dark metal circlet with upright glowing violet
prongs, regal and high-tech, 2) a single round HUD monocle over one eye with
a thin bracket arm and an amber lens, 3) a wide horizontal LED scanner band
with a bright cyan light bar across the middle, wrapping like a visor.
```

## Sheet E — BACK AND WINGS

```
Use the attached picture as a locked style reference. Draw NEW accessory
items in exactly this art style: same soft lighting, same smooth matte
finish, same colour feel. Do NOT draw the character itself — items only,
front view, spaced apart, not touching, NO drop shadows, on a completely
flat, solid, bright magenta background (#FF00FF). Items: 1) a glowing amber
energy core reactor unit worn on the back, round housing with vents and warm
light spilling out, 2) ONLY the LEFT wing of a pair of plasma energy wings,
drawn alone, made of solid cyan-white energy blades fanning upward,
3) ONLY the LEFT wing of a pair of mechanical drone wings, drawn alone,
white and orange panels with a small rotor at the shoulder.
```

---

## Slicing (names are in reading order, left to right)

Save each sheet into this folder, then:

```
python tools/tripo_sheet.py "art-source/tripo/<sheet>.png" --names a,b,c
```

| sheet | --names |
|---|---|
| A arms | `mech-gauntlet,energy-blade,grapple-claw` |
| B ears | `tech-antenna,headset-cup,data-fin` |
| C effects | `circuit-ring,grid-ring,plasma-ring` |
| D head/eyes | `hud-monocle,neural-crown,scanner-band` |
| E back/wings | `energy-core,plasma-wings,drone-wings` |

**scanner-band was CUT** (Megan, 2026-08-06): as a visor across the eyes it
read as a mouth, and moved up as a headband it still did not work. The sheet
still contains it — keep the three names above so re-slicing sheet D works —
but it is in no catalogue, no migration and no renderer entry, and its PNG is
deleted. Wave 2 shipped 14 items, not 15.

Run it once with no `--names` first if you want to check it found 3 items
before anything is written.

⚠️ Sheet D's names are **not** in the order this file first guessed. Tripo
drew the monocle floating high and to the right, so it counts as its own row
and is read FIRST — monocle, then crown, then band. Names are handed out by
position, so always check the `at x…,y…` the slicer prints against the sheet
rather than assuming the order you asked for.

## Suggested prices (bands unchanged: 0 free, >=120 rare and always L6+)

| item | slot | price | level |
|---|---|---|---|
| mech-gauntlet | arms | 70 | 3 |
| energy-blade | arms | 135 | 6 |
| grapple-claw | arms | 85 | 4 |
| tech-antenna | ears | 40 | 2 |
| headset-cup | ears | 70 | 3 |
| data-fin | ears | 95 | 4 |
| circuit-ring | effects | 75 | 3 |
| grid-ring | effects | 100 | 5 |
| plasma-ring | effects | 150 | 7 |
| neural-crown | hat | 165 | 7 |
| hud-monocle | glasses | 55 | 2 |
| energy-core | back | 110 | 5 |
| plasma-wings | wings | 155 | 6 |
| drone-wings | wings | 140 | 6 |

That would have taken the shop to 49 items; with the band cut it is 48 and even the slots out at roughly
6-8 each. No new SLOT is needed, so wave 2 is a much smaller job than wave 1
— rows, labels, art, and the placement pass.
