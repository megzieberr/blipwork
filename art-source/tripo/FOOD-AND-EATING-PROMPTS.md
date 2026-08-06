# Food items + the eating sprite sheet — Tripo prompts

Written 2026-08-06, after free asset libraries were sampled and rejected
(see PROJECT-STATUS "Decisions"). Two different jobs in here:

1. **Food ITEMS** — shop icons, no character in the picture. Same shape of
   prompt as the accessory waves.
2. **Blip EATING** — a character sprite sheet, four frames in a row.

## Rules that apply to everything below

- **Same reference image every time** — the blue droplet Blip used for waves
  1 and 2. A different reference gives you a set that stops matching.
- **Flat magenta #FF00FF, no drop shadows.** Every prompt says so already.
  A shadow bleeds into the background and wrecks the cut-out.
- **No glow, no aura, no sparkles, no shine haloes.** A soft glow on magenta
  sits in exactly the brightness range the keyer cannot separate from
  background bleed — this is what killed the plasma ring in wave 2. Shiny
  icing and a wet-looking cherry are fine; a light *emitting* from the food
  is not.
- **No text, no speech bubbles, no sound effects** ("Aah!", "Mmm!"). It bakes
  English into the art and flashes on every loop.
- Pick ONE variant per item, then run the slicer.

---

# PART 1 — FOOD ITEMS (shop icons)

Six per sheet. Simple, bold, single objects — these show at thumbnail size in
the shop, so anything fiddly disappears.

## Sheet A — FRUIT

```
Use the attached picture as a locked style reference. Draw NEW food items in
exactly this art style: same soft lighting, same smooth matte finish, same
thick dark outline, same colour feel. Do NOT draw the character itself —
food only, each item shown alone, front view, upright, spaced well apart,
not touching each other, NO drop shadows, no glow, no sparkles, on a
completely flat, solid, bright magenta background (#FF00FF). Items:
1) a ripe red strawberry with a small green leafy top,
2) a shiny red apple with one green leaf on the stem,
3) a peeled-open yellow banana,
4) a naartjie (mandarin orange) with a couple of segments beside it,
5) a triangular watermelon slice with green rind and black pips,
6) a small bunch of purple grapes.
```

## Sheet B — PASTRIES

```
Use the attached picture as a locked style reference. Draw NEW food items in
exactly this art style: same soft lighting, same smooth matte finish, same
thick dark outline, same colour feel. Do NOT draw the character itself —
food only, each item shown alone, front view, upright, spaced well apart,
not touching each other, NO drop shadows, no glow, no sparkles, on a
completely flat, solid, bright magenta background (#FF00FF). Items:
1) a golden flaky croissant,
2) a cupcake in a paper case with a tall swirl of pink icing on top,
3) a pink-glazed doughnut with coloured sprinkles,
4) a wedge of custard tart with a dusting of cinnamon on the pale filling,
5) a koeksister — a plaited golden syrup-soaked pastry twist, glossy,
6) a round chocolate chip cookie.
```

## Sheet C — SWEETS

```
Use the attached picture as a locked style reference. Draw NEW food items in
exactly this art style: same soft lighting, same smooth matte finish, same
thick dark outline, same colour feel. Do NOT draw the character itself —
food only, each item shown alone, front view, upright, spaced well apart,
not touching each other, NO drop shadows, no glow, no sparkles, on a
completely flat, solid, bright magenta background (#FF00FF). Items:
1) a round swirled lollipop on a white stick,
2) a wrapped toffee sweet with twisted ends,
3) a red gummy bear,
4) a chocolate bar with the wrapper peeled halfway down,
5) a fat white marshmallow,
6) a small pile of coloured jelly beans.
```

---

# PART 2 — BLIP EATING (sprite sheet)

## Blip has NO ARMS — this is a hard rule, not a preference

The base art has no arms. **Arms are an accessory slot** (stubby-arms, mitts,
power-gloves), so a Blip with arms drawn into his body would double up the
moment a learner equips an arm item. He noms the food out of the air.

## What went wrong with the ChatGPT sheets

Worth knowing so the prompt below makes sense:

- **Food placed dead-centre between his eyes reads as a NOSE**, and the little
  lines drawn radiating from it read as WHISKERS. That is why two of the five
  sheets look like a cat. Fix: the food sits LOW, below the eye line, slightly
  to one side, and nothing radiates from his mouth.
- Glowing food could not have been cut out at all (see the rule above).
- The 2×2 grids are riskier to slice than a single row — reading order has
  already misnamed items twice on this project.

## The prompt — 769 characters

Megan's image tool caps the prompt at 1000 characters, so this is the one to
paste. Swap `[FOOD]` for the actual item both times it appears.

```
Use the attached image as a locked reference: same body shape, proportions, outline, colours and face style. Draw a 4-frame sprite sheet in ONE horizontal row, every frame the same size, the character at the same scale and position in each.

He has NO ARMS and NO HANDS. The food floats in the air and he eats it from the air. Keep the food LOW, below his eyes and slightly to one side, never centred between his eyes. No lines or whiskers radiating from his mouth.

Frames: 1) whole [FOOD] floating at his mouth, happy; 2) mouth open mid-bite, [FOOD] half eaten; 3) food gone, eyes closed, cheeks full, chewing; 4) finished, happy smile, nothing in front of him.

Flat solid magenta #FF00FF background. No shadows, glow, sparkles or text. Keep him friendly throughout.
```

Every clause in there is load-bearing — the earlier long version said the same
things at more length, and there is ~230 characters of headroom if a
particular food needs describing (e.g. "a plaited koeksister").

## Worth considering: one sheet for ALL foods

If the food is a SEPARATE floating layer rather than drawn into his frames,
one eating sheet covers every food in the shop — the food PNG shrinks and
fades while the same four Blip frames play. That is one Tripo sheet instead
of one per food, and the food art you already generated in Part 1 gets
reused.

To do it that way, run the prompt above but replace the food lines with:
"nothing in front of him in any frame — frame 1 mouth closed and looking
down happily, frame 2 mouth open mid-bite, frame 3 eyes closed and cheeks
full, chewing, frame 4 finished with a happy relaxed smile."

Then the app floats the shop's food PNG in front of him and shrinks it.
Ask before building this — it changes the renderer, not just the art.
