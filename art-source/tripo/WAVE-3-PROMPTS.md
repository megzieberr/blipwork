# Wave 3 — more food, themed accessories, and face/eye items

Written 2026-08-07, during the inventory-expansion push. Same house rules as
waves 1 and 2 (see WAVE-2-PROMPTS.md and FOOD-AND-EATING-PROMPTS.md).

## Which reference image to attach

This matters more than anything else in the file — a different reference gives
a set that stops matching the one before it.

- **Food (sheets D-G)** → attach one of the **batch-1 food sheets**
  (`image (11).png`, the fruit one, is the cleanest). Batch 2 then matches
  batch 1. Do NOT use Blip as the reference for food.
- **Accessories (sheets H-K)** → the **blue droplet Blip** reference used for
  waves 1 and 2.
- **Eyes / faces (sheets L-M)** → the **blue droplet Blip** reference, so the
  eye colour and line weight match his painted face.

## Rules that apply to everything

- Flat solid magenta **#FF00FF**, **no drop shadows**. The image tool paints a
  fake checkerboard instead of real alpha, so the background is keyed out here.
- **No glow, no aura, no sparkles, no shine haloes.** A soft glow on magenta
  sits exactly where the keyer cannot separate it from background bleed. This
  killed the plasma ring in wave 2 and it is why the fairy prompts below ask
  for *solid* stars and gems rather than twinkles.
- **No see-through anything.** Glass, water, cellophane — draw them as solid
  colour. A translucent pixel over magenta is genuinely ambiguous.
- **No text**, no speech bubbles, no sound effects.
- Items **spaced well apart and not touching**. Crops are rectangles.
- Pick ONE variant per item, then run the slicer with `--opaque`:
  `python tools/tripo_sheet.py SHEET.png --opaque --names a,b,c --out ...`
- Reading order is left-to-right, top-to-bottom. On a **staggered** sheet an
  item floating higher comes FIRST — the slicer prints each item's x,y, so
  check that against the sheet before trusting the names.

---

# PART 1 — FOOD, batch 2 (sheets D-G)

Six per sheet, 24 items. Reference = a batch-1 food sheet.

The shared opening for all four (swap only the numbered list):

> Use the attached picture as a locked style reference. Draw NEW food items in
> exactly this art style: same soft lighting, same smooth matte finish, same
> thick dark outline, same colour feel. Do NOT draw any character — food only,
> each item shown alone, front view, upright, spaced well apart, not touching
> each other, NO drop shadows, no glow, no sparkles, on a completely flat,
> solid, bright magenta background (#FF00FF). Items:

## Sheet D — HOT MEALS

```
Use the attached picture as a locked style reference. Draw NEW food items in
exactly this art style: same soft lighting, same smooth matte finish, same
thick dark outline, same colour feel. Do NOT draw any character — food only,
each item shown alone, front view, upright, spaced well apart, not touching
each other, NO drop shadows, no glow, no sparkles, on a completely flat,
solid, bright magenta background (#FF00FF). Items:
1) a bowl of spaghetti with red tomato sauce and a fork resting in it,
2) a toasted cheese sandwich cut in half diagonally, melted cheese showing,
3) a small pile of golden chicken nuggets,
4) a hamburger with a sesame bun, lettuce and tomato,
5) a triangular slice of pizza with pepperoni and stringy cheese,
6) a hot dog in a bun with a zigzag of mustard.
```

## Sheet E — BRAAI AND MEAT

```
Use the attached picture as a locked style reference. Draw NEW food items in
exactly this art style: same soft lighting, same smooth matte finish, same
thick dark outline, same colour feel. Do NOT draw any character — food only,
each item shown alone, front view, upright, spaced well apart, not touching
each other, NO drop shadows, no glow, no sparkles, on a completely flat,
solid, bright magenta background (#FF00FF). Items:
1) a coiled boerewors sausage seen from above,
2) a grilled chicken drumstick with a browned crispy skin,
3) a thick steak with dark grill marks across it,
4) a lamb chop with a white bone at one end,
5) a sosatie kebab on a wooden skewer with cubes of meat and onion,
6) three sticks of dark dried biltong.
```

## Sheet F — VEGETABLES

```
Use the attached picture as a locked style reference. Draw NEW food items in
exactly this art style: same soft lighting, same smooth matte finish, same
thick dark outline, same colour feel. Do NOT draw any character — food only,
each item shown alone, front view, upright, spaced well apart, not touching
each other, NO drop shadows, no glow, no sparkles, on a completely flat,
solid, bright magenta background (#FF00FF). Items:
1) an orange carrot with a leafy green top,
2) a green broccoli floret,
3) a round red tomato with a small green stalk,
4) a yellow mielie cob with the green husk peeled halfway back,
5) a shiny green pepper,
6) an open pea pod with round green peas inside.
```

## Sheet G — DRINKS

⚠️ Glass and liquid are the trap here. Every drink says **solid colour, not
see-through** — a translucent pixel over magenta cannot be keyed.

```
Use the attached picture as a locked style reference. Draw NEW drink items in
exactly this art style: same soft lighting, same smooth matte finish, same
thick dark outline, same colour feel. Do NOT draw any character — drinks only,
each item shown alone, front view, upright, spaced well apart, not touching
each other. Draw all glass and liquid as SOLID FLAT COLOUR, never see-through
or transparent. NO drop shadows, no glow, no sparkles, no condensation drops,
on a completely flat, solid, bright magenta background (#FF00FF). Items:
1) a tall glass of white milk,
2) a juice box with a straw poking out of the top,
3) a cold drink can with a plain coloured label,
4) a mug of hot chocolate with three marshmallows floating on top,
5) a tall milkshake glass with a swirl of cream and a striped straw,
6) a closed water bottle with a blue cap.
```

---

# PART 2 — THEMED ACCESSORIES (sheets H-K)

Three per sheet, 12 items. Reference = the blue droplet Blip.

**Paired slots get ONE piece.** Ears, arms and wings are drawn as a single
piece and the renderer mirrors it for the other side. Draw one wing, not two.

**Slot notes before you generate:**
- Wings, hats, eyewear and back items all drop into slots that already exist.
- ⚠️ **The gold chain needs a NEW "neck" slot**, which is a code and SQL job on
  top of the art (`mhq_equip` and `shop_items_slot_cat_check` both hard-code
  the allowed slots). Generate it anyway — art is free — just know it can't
  ship the same afternoon as the others.
- A **back** item must CONTRAST with the blue body and is only read from what
  peeks above the shoulders and below the hem; the middle is hidden.

## Sheet H — FAIRY

```
Use the attached picture as a locked style reference: same art style, same
thick dark outline, same soft lighting and smooth matte finish. Do NOT draw
the character — the items only, each shown alone, front view, spaced well
apart, not touching each other, NO drop shadows, no glow, no aura, no
sparkles, on a completely flat, solid, bright magenta background (#FF00FF).
Draw any gems and stars as SOLID shapes with a hard outline, never glowing or
twinkling. Items:
1) ONE single fairy wing only, side view, a delicate pointed insect wing in
pale pink and lilac with darker veins, the narrow root at the bottom left,
2) a magic wand — a slim white stick with a fat five-pointed gold star fixed
on the top and two ribbons tied below it,
3) a flower crown: a soft ring of pink and white daisies with green leaves.
```

## Sheet I — GIRLY

```
Use the attached picture as a locked style reference: same art style, same
thick dark outline, same soft lighting and smooth matte finish. Do NOT draw
the character — the items only, each shown alone, front view, spaced well
apart, not touching each other, NO drop shadows, no glow, no aura, no
sparkles, on a completely flat, solid, bright magenta background (#FF00FF).
Draw gems as SOLID shapes with a hard outline, never glowing. Items:
1) a big satin hair bow in deep pink with a knot in the middle and two loops,
2) a silver tiara with three tall points, each set with a solid pink gem,
3) ONE single butterfly wing only, side view, rounded, in orange and cream
with dark markings and a thick dark outline, the narrow root at the bottom
left.
```

## Sheet J — TOMBOY

```
Use the attached picture as a locked style reference: same art style, same
thick dark outline, same soft lighting and smooth matte finish. Do NOT draw
the character — the items only, each shown alone, front view, spaced well
apart, not touching each other, NO drop shadows, no glow, no aura, no
sparkles, on a completely flat, solid, bright magenta background (#FF00FF).
Items:
1) a baseball cap worn backwards, so the peak points away and the strap and
gap are at the front, in navy and white,
2) a pair of sporty wraparound sunglasses, one continuous dark lens across
both eyes with a bright orange frame, seen straight on from the front,
3) a khaki green bucket hat with a soft floppy brim, seen from the front.
```

## Sheet K — GANGSTER

```
Use the attached picture as a locked style reference: same art style, same
thick dark outline, same soft lighting and smooth matte finish. Do NOT draw
the character — the items only, each shown alone, front view, spaced well
apart, not touching each other, NO drop shadows, no glow, no aura, no
sparkles, on a completely flat, solid, bright magenta background (#FF00FF).
Items:
1) a thick chunky gold chain necklace lying in a wide U shape, with a round
gold medallion hanging at the bottom,
2) a pair of small rectangular sunglasses with flat black lenses and a thin
gold frame, seen straight on from the front,
3) a flat-peak snapback cap in black with a gold pattern on the front panel,
worn facing forward.
```

---

# PART 3 — EYES AND FACES (sheets L-M)

Three per sheet, 6 items. Reference = the blue droplet Blip.

## How these have to be drawn, and why

The eyes slot already holds items like the star shades and the sleepy eyes,
and they are **overlays painted on top of Blip's own face** — not new versions
of Blip. So each item is a **PAIR of eyes drawn side by side on the magenta,
with a clear gap between them and nothing else in the picture**. No head, no
body, no outline of a face.

Measured off the base art, his painted eyes sit at 0.308 and 0.688 across his
width and span y 0.487 to 0.63, so a drawn pair needs to be at least that big
to cover them. Covering the painted eyes underneath is handled in code, not by
baking a blue patch into the art — a baked blue patch would clash the moment a
learner recolours Blip pink.

⚠️ **Pink eyeshadow on a magenta background**: keep it strong and saturated.
A soft blush fading out to nothing sits in the range the keyer cannot separate
from the background.

## Sheet L — PRETTY EYES

```
Use the attached picture as a locked reference for art style, line weight and
eye colour. Draw ONLY pairs of eyes — no head, no body, no face outline, no
character. Each item is one pair of eyes side by side with a clear gap
between them, drawn in the same dark navy as the reference eyes, same thick
clean outline, same glossy white highlights. Spaced well apart, not touching,
NO drop shadows, no glow, no sparkles, on a completely flat, solid, bright
magenta background (#FF00FF). Items:
1) big round eyes with long curled upper lashes and a strong saturated pink
eyeshadow above each eye,
2) half-closed sleepy eyes with long lower lashes and a soft lilac lid,
3) a wink — the left eye a closed downward curve with long lashes, the right
eye wide open and round.
```

## Sheet M — CHARACTER EYES

```
Use the attached picture as a locked reference for art style, line weight and
eye colour. Draw ONLY pairs of eyes — no head, no body, no face outline, no
character. Each item is one pair of eyes side by side with a clear gap
between them, drawn in the same dark navy as the reference eyes, same thick
clean outline, same glossy white highlights. Spaced well apart, not touching,
NO drop shadows, no glow, no sparkles, on a completely flat, solid, bright
magenta background (#FF00FF). Items:
1) huge shining eyes with two big white highlights in each and a solid white
four-pointed star shape inside the lower part,
2) determined narrow eyes with thick angled eyebrows above them,
3) happy closed eyes — two upward curved arcs, like a smile, with a small
round rosy cheek blob under each.
```

---

---

# PART 4 — NECK SLOT (added 2026-08-07, after the gold chain would not fit)

## The measurement that decides this shape

Blip has NO NECK, so a necklace has to lie across his BODY, and his body is a
wide egg. Measured off `assets/companion/blip-base-blue.png`:

| y (of stage) | he spans | width |
|---|---|---|
| 0.55 | 0.035 – 0.958 | 0.923 |
| 0.63 | 0.021 – 0.975 | 0.954 |
| 0.70 | 0.029 – 0.967 | 0.938 |
| 0.78 | 0.073 – 0.925 | 0.852 |
| 0.86 | 0.235 – 0.760 | 0.525 |

His painted eyes occupy y 0.487–0.63 and his body ends at 0.885. So the only
clear band is roughly **y 0.66 → 0.85**, about a fifth of the stage tall,
across a body that is still ~0.94 wide there.

**Therefore neck art must be about FIVE TIMES WIDER THAN IT IS TALL.**

## Why the first gold chain failed

It was drawn as a deep U (aspect 1.34, taller than wide). For its two arms to
pass OUTSIDE his eyes at x 0.308 and 0.688 they must be ~0.55 of the stage
apart, and at that aspect the piece becomes taller than his whole body — the
pendant falls past his hem. Six placements were previewed and every one either
crossed his eyes or overshot his base. This is arithmetic, not tuning: no
attach point or widthPct rescues a deep U here.

Preview any new neck art with `tools/preview_accessory.py` BEFORE wiring it up.

## The prompt

```
Use the attached picture as a locked style reference: same art style, same
thick dark outline, same soft lighting and smooth matte finish. Do NOT draw
the character and do NOT draw a neck or a body — the necklaces only, each
shown alone, front view, symmetrical.

SHAPE IS THE MOST IMPORTANT THING: each necklace is a VERY WIDE, VERY SHALLOW
arc, like a long wide smile, at least FIVE TIMES WIDER THAN IT IS TALL. It
must NOT be a deep U or a deep V. Think of a wide collar lying across a very
round body: the ends turn slightly upward at the far left and far right, and
any pendant is SMALL and hangs on a very short drop from the centre.

Spaced well apart, not touching each other, NO drop shadows, no glow, no
sparkles, on a completely flat, solid, bright magenta background (#FF00FF).
Draw gems and beads as SOLID shapes with a hard outline. Items:
1) a wide string of round white pearls with a small gold clasp,
2) a wide flat gold chain with a small solid red heart pendant,
3) a wide silver chain with a small five-pointed star pendant,
4) a wide chunky beaded friendship necklace in bright red, blue, yellow and
green beads,
5) a wide garland of small pink and white flowers with green leaves,
6) a wide dark ribbon choker with a small round gold medal at the centre.
```

A bow tie was in the first draft and was dropped: it is compact by nature and
cannot be a wide arc, so it needs its own generation and its own placement.

## After she generates

Slot rules bite here — `verify-store.html` asserts every slot sells at least
TWO items and has one FREE level-1 item. So one of these ships at price 0.


Cut every one of these with `--opaque` (none of them are meant to be
see-through). Then LOOK at them on the navy before wiring anything up — five
of fifteen wave-2 items were cut on sight after passing every assertion.
