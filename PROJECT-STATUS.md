# Project status — updated 2026-08-07 PM (audit fixes applied, NOT committed)

## 🔧 2026-08-07 — overnight audit fixes (local; `verify-store.html` 988 checks green)

Off `FABLE-AUDIT-2026-08-06.md`. Nothing committed, nothing run against live.

- **🔴 `?local=1` was a one-way trap — now it lets go.** `js/api.js` set
  `mhq.forceLocal` if the parameter merely EXISTED, so even `?local=0` deepened the
  trap, and nothing ever cleared it. Any phone that opened a testing link was stuck
  in the demo world for good: real progress apparently gone, nothing saving, and no
  cure short of devtools on the learner's own phone. **`?local=0` (also `false`/
  `off`/`no`) now clears the flag.** Proven in the browser: flag cleared, backend
  resolved back to `supabase`. **That URL is the fix to text a learner** if a phone
  ever lands in demo mode. Harmless today (no learner has the app) — which is exactly
  why it was worth fixing now.
- **🔴 `schema.sql` was THREE ships behind, not two**, and its header said "safe to
  re-run" four lines above `drop table students`. Fixed:
  - `effects` **and** `neck` added to `shop_items_slot_cat_check` **and** to
    `mhq_equip`'s allowed keys (the audit only caught `effects`; the neck ship landed
    after it ran). Both are needed — seeding rows alone leaves equip returning
    `bad_equipped`, which is the July cape bug.
  - **Catalogue regenerated from live** by a read-only query: exactly **57 rows
    (54 cosmetics + 3 food)**, no duplicates, `shadow-crown` correctly absent. This
    replaced the old hand-maintained block, so the file now provably matches live.
  - Header replaced with **⚠️ NEVER RUN THIS ON THE LIVE DATABASE** and a note that a
    schema change goes in TWO places — this file AND a migration. That "AND" got
    skipped three times, which is how it drifted.
- **`search_path` pinned** on `_mhq_level` / `_mhq_growth` in schema.sql, plus a new
  **`supabase/migration-search-path-pin.sql`** for live. ⏳ **NOT RUN — pending on
  Megan.** Safe, idempotent, changes no data; both functions use only pg_catalog
  built-ins so `search_path = ''` is safe (checked line by line).
- **Stale comments fixed**: `js/admin.js` no longer says "readable passwords" (they
  are bcrypt-hashed and unreadable by anyone); `js/supabase-config.js` said the key
  was `cgg.forceLocal`, it is `mhq.forceLocal`; wave 2 is "10 shipped, 5 cut", not 15
  (local-backend + renderer); `tools/tripo_sheet.py` describes connected components,
  not row/column projection; README no longer mentions seeding a class list;
  CLAUDE.md's cache-version line pointed at v25 while the repo shipped v37.
- **hud-monocle**: the comment claimed widthPct 25 was the measured shipped value
  while the code says 28. Now recorded honestly — measuring gives 25 (lens ≈0.16 of
  the stage), 28 ships (≈0.18) because 25 read as too small. Otherwise the next
  re-tune chases a bug that is not there.

### ⏳ Pending on Megan
1. **Run `supabase/migration-search-path-pin.sql`** in the SQL editor (optional, tidy-up).
2. **Confirm the empty `quests` table is expected.** Live has **0 quest rows** — so
   nothing is seeded open OR closed. The teacher toggle can only open a row that
   exists, so this needs seeding before any learner gets the app.

**Not changed (accepted risk, recorded once):** the client computes its own score and
XP; the server caps XP at 1000 per submit and pays a flat 10 gold per submitted round,
pass or fail. Inherent to the no-JWT architecture, fine for a class that does not know
it is possible — worth saying out loud before go-live.

---

# (previous) Project status — 2026-08-07 (NECK slot live; 26 new food; sw v37 pushed)

## Where we are
**ALL COMMITS PUSHED 2026-08-07 ~17:41 UTC** (`a1a9102`, on top of last night's
four). A fresh Pages build started for it; last night's two stuck builds both
ended "errored" (GitHub's side, never our code). If live still serves v36 later,
check `gh api repos/megzieberr/blipwork/pages/builds` BEFORE debugging code.
Uncommitted on purpose: `FABLE-AUDIT-2026-08-06.md` (public repo — Megan hasn't
said whether the audit notes may be published).

**NECK SLOT (8th cosmetic slot) — BUILT + 3 MIGRATIONS APPLIED TO LIVE, smoke-
tested 10/10.** Shop 43 → **49 active cosmetics**. Neck sells 6: bead-necklace
(FREE L1), flower-garland 60/L3, star-chain 80/L4, heart-chain 95/L5,
medal-choker 125/L6, chunky-chain 160/L7. Learner rows verified byte-identical
after every migration (2 students, 24 progress, 4580 XP).

**EATING + SAD moments are sliced, wired and verified in-app** (play once, both
recolour). Sad plays when a dragged food is dropped away from Blip — her ruling:
the food floats back to the pantry, no penalty, and Blip pulls the sad face.

**26 MORE FOOD PNGs cut** (hot meals, braai, veggies, drinks — the drinks sheet
gave 8, two free extras), joining the first 18 in `assets/companion/food/`.
**44 food items ready; NONE are in the shop yet** — that's the next build job.

**Wave-3 accessory art is cut but NOT wired**: fairy (fairy-wing, star-wand,
flower-crown), girly (hair-bow, tiara, butterfly-wing), tomboy (backwards-cap,
sport-shades, bucket-hat), gangster (gold-shades, snapback), and six eye pairs
(star/angry/happy/lash/dreamy/wink-eyes). All pass structure checks; placement
passes + shop rows still to do. `happy-eyes` is weak (Megan may re-roll).

Live at https://megzieberr.github.io/blipwork/, service worker **mhq-v37** pushed.

**TRIPO WAVE 2 — SHIPPED 2026-08-06, ✅ migration APPLIED to live and smoke-tested.**
Shop **34 → 43** items. The thin slots are fixed: ears and arms go 3 → 6.
No new slot, so `mhq_equip` and `shop_items_slot_cat_check` were untouched.
`verify-store.html` is **886/886 green**.

Megan drew 15 and **kept 10**. She cut five on sight — scanner band, energy
core, circuit ring, grid ring, plasma ring — and retired wave 1's
**shadow-crown** at the same time. Those are gone from the renderer, labels,
catalogue, migration and disk; shadow-crown was DELETED from live rather than
deactivated, because the app is not with any learner yet (verified: 0 blips
owned or wore it). Once kids are on it, retire with `active = false` instead.

**The slicer had a real bug and wave 1 was quietly carrying it.**
`tools/tripo_sheet.py` judged how solid a pixel was only by how much magenta
could be unmixed out of it. That is genuinely ambiguous for mid-grey — opaque
steel and half-opaque green over magenta are the same colour — so wave 2's
brushed steel came out green and half-transparent (measured: rgb(136,148,160)
read as 54% opaque, unmixed to rgb(37,247,82), a third of each item). It now
ALSO judges by distance from the background colour, and masks each crop to its
own connected component. **All twelve wave-1 items were re-cut**: the green
edging on cyber-visor (2.9% of visible pixels), shadow-crown, back-sword and
dragon-wings is gone.

**EFFECTS SLOT + TRIPO WAVE 1 — SHIPPED 2026-08-05, ✅ migration APPLIED to live
and smoke-tested 16/16.**
A seventh cosmetic slot (`effects` — auras/glows painted behind everything)
plus top-ups for hat/eyes/wings/back: 12 new items, shop 22 → 34.
All twelve are Megan's own Tripo art rather than code-drawn SVG.
`verify-store.html` is **685/685 green** with the real art in place, and every
item has been LOOKED at on Blip via headless Chromium, not just asserted.

- `tools/tripo_sheet.py` — keys the flat-magenta background out of a Tripo
  sheet and cuts it into per-item transparent PNGs. Tested by
  `tools/test_tripo_sheet.py` (synthetic sheet, exact-recovery assertions).
- PNG accessories are a new renderer path (`img:` instead of `svg:`) sharing
  the existing attach/anchor/widthPct/mirror machinery.
- `supabase/migration-effects-slot.sql` — applied 2026-08-05.

Verified end-to-end on the local backend with placeholders: all five effects
in the shop payload, the free one buys at 0 gold, it equips to the NEW slot
and sticks, a bogus id is refused with `bad_equipped`, the Effects chip
renders in the real shop UI, and layer order is effects → back → wings →
body → ears → eyes → hat → arms.

**STORE EXPANSION shipped 2026-07-28 — ✅ migration APPLIED to live and smoke-tested
(14/14).** The shop
went from 6 buyable items to **22**, across **6** slots — the new one being **back**
(cape / schoolbag / jetpack). Four of the five old slots sold exactly ONE item, so
there was nothing to choose between; the whole catalogue also cost 475 gold, about a
week of play, after which gold had no purpose.

- **16 new accessories**, all code-drawn SVG per the 2026-07-19 ruling (no imported
  art — see Decisions for why the free-asset route was rejected).
- **Free tier**: one item per slot at 0 gold / level 1, so a brand-new learner can
  dress Blip head to toe before earning anything.
- **Closet / Shop split** with a scrolling slot filter (All · Hat · Eyes · Ears ·
  Arms · Wings · Back). The old single flat grid was fine at 6 items and a scroll
  wall at 22.
- `verify-store.html` — **428 assertions, all green**, including a parse of the
  migration SQL cross-checked against the client's catalogue mirror (that is the
  drift that bites: an item added to one side only).
Phase 3 shipped as one commit, built by three parallel agents against a frozen
contract (`homework-hub-companion/PHASE-3-PLAN.md`) with the SQL and all
shared-file splices written by the lead session so nothing collided.

Three features, all client-complete:
1. **Sick-stage push warnings** — dormant until the VAPID key is set.
2. **Teacher-assigned homework** — one active assignment, pinned to the hub.
3. **Treasure box** — one per completed assignment, opened on the Blip screen.

✅ **`supabase/migration-phase3.sql` HAS been applied to live** (2026-07-19, via
MCP, migration `phase3_push_homework_treasure`) and smoke-tested end to end with
a throwaway learner that was deleted afterwards — 21/21 steps correct. Learner
data verified byte-identical before and after (1 student, 24 progress rows,
4580 XP, 0 gold, 0 boxes). Homework and the treasure box are therefore **live
and working right now**; push is live but dormant until the VAPID key is set.

The Circle Quest → Blipwork link was explicitly deferred (see Decisions).

## Decisions
- 2026-07-06: App identity = low-intimidation QUICK RECAP tool (revise the week's work /
  a fast round before past papers) — NOT a full homework session. Keep quests short and
  atomic; don't grow them into long worked-problem sets.
- 2026-07-06: Tap + keypad answering is deliberate and stays — marking is about maths,
  never spelling/handwriting.
- 2026-07-06: Calc tolerances are sized per-question from measured rounding drift of the
  printed solution's own method (e.g. t6 regularPolygon tol 0.5) — never tighten back to
  the 0.001 default without re-measuring.
- 2026-07-06: Casio-EXCLUSIVE quartiles stay in the calculator sim (matches the real
  fx-991ZA); quests/box plots keep the (n+1)/4 school method. Comment in calculator.js
  now says so.
- 2026-07-06: mc() in _shared.js keeps string-only de-dup by design; generators must
  self-filter decoys BY VALUE (all chapters now do — copy that pattern in new content).
- 2026-07-19: REBRAND to **Blipwork** (name chosen by Megan — "homework" pun). Character
  is "Blip" by default; kids may nickname their own Blip ANYTHING (free-form, max 24
  chars, no filter needed because nicknames are never displayed publicly — only usernames
  appear in the gallery).
- 2026-07-19: Base body art = Megan's GPT-generated PNG, used as-is; accessories are
  CODE-DRAWN SVG composited at attachment points (never GPT-drawn onto the body).
- 2026-07-19: XP and Gold decoupled. XP = levelling only, never spent; Gold = shop only,
  never rank. Level curve cost(L) = round(300·1.5^(L−1)/10)·10, bar resets per level,
  cap 20 — single source of truth is SQL `_mhq_level` mirrored ONLY in
  js/companion/level.js.
- 2026-07-19: **NO daily cap** (Megan overrode the planned cap): the app doubles as exam
  revision, so unlimited rounds count — replays pay 25% XP + full gold; pacing comes from
  the curve + level-gated shop items.
- 2026-07-19: First non-cream colour = reward for first completed round (server-enforced
  xp > 0, not just UI).
- 2026-07-19: Leaderboard → gallery/showcase: usernames + builds + level, alphabetical,
  no scores, no ranking.
- 2026-07-19: Accessory placement is PER-ACCESSORY by phone review: hat/wings/glasses
  FLOATY BY DESIGN (Megan: "cute"); ears/arms ATTACHED (overlap the body outline; arms
  redrawn as capsules and fills matched pixel-exact to the recoloured body). Recorded in
  renderer.js ATTACH comments — do not "fix" the floaty ones.
- 2026-07-19: Teacher "reset progress" zeroes XP (level drops, gates re-lock) but KEEPS
  gold, owned/equipped items, colour, nickname — resets never confiscate the blob.
- 2026-07-19: Shop prices are placeholders (glasses 40/L1, cat-ears 60/L2, party-hat
  80/L3, arms 100/L4, wings 150/L6) — tune after real play data.
- 2026-07-19: Backlog phase 2 (recorded in homework-hub-companion/plan.md): grocery-store
  food shop, daily cookie feeding on login, and Pou-style GROWTH (Blip starts baby-small,
  grows with feedings — renderer is size-agnostic so growth = a scale factor).
- 2026-07-19 (late): **Recovering joins the sick family for rendering** — as-authored, no
  recolour. Its blanket is drawn INTO her frames, so `animatedHealthOverlaySpec` returns
  null for it. It is also checked BEFORE health in `idleAnimState`, because the backend
  reports `recovering` while healthStage is still 2-3.
- 2026-07-19 (late): The **wink is a double-wink** — her frame 3 winks the opposite eye
  and grins. Shipped as drawn (all four frames, in order). If a single wink is ever
  wanted, that is a re-roll of the row, not a code change.
- 2026-07-19 (late): Recovering uses **`Recovering Blip 2.png`**, not the first sheet —
  cleaner blink rhythm, no stray sweat drop in frame 4.
- 2026-07-19 (late): Baby loops keep only the frames whose EXPRESSION matches the state.
  Her rows are sequences, not loops (sleeping ends wide awake; "happy" is book-ended by
  crying), so looping them whole would make him blink awake or burst into tears.
- 2026-07-19 (late): **Taps are ignored while he is sleeping / sick / recovering** — a
  bedridden Blip cheerfully hopping undercuts the care mechanic.
- 2026-07-19 (late): App icons are generated from **`New Logo.png`** (Blip + glow, no
  tile). The previous artwork nested a glowing tile inside the launcher's own container,
  which is why Blip read tiny on the home screen.
- 2026-07-19 (Phase 3): **Circle Quest → Blipwork link DEFERRED** (Megan): the kids get
  to finish their current CQ rounds first. Nothing in `circle-geometry-game` was touched
  — its push stack was copied out read-only, and its clean tree was verified after.
- 2026-07-19 (Phase 3): Push nudges fire on stage **transitions only** — day 3 (tired),
  day 5 (bedridden), day 6 (last warning) — and are **silent at critical**. She has
  already been told twice by then; nagging a learner who has disengaged is the wrong
  move. Skipped if already fed today, and gated by `_mhq_is_qual_day` so weekends and
  holidays are silent. One push per learner per day, enforced server-side.
- 2026-07-19 (Phase 3): `push_subscriptions.last_push_stage` stores the **message level**
  (1/2/3), NOT the health stage — health stage 2 spans days 5 AND 6, so day 6's final
  warning is invisible at health-stage granularity.
- 2026-07-19 (Phase 3): **One active assignment at a time, and no penalty for missing
  it.** A spotlight, not a deadline: optional due date renders as a soft "by Friday",
  never a countdown or an overdue badge. Setting homework NEVER opens a closed quest —
  admin only offers open ones.
- 2026-07-19 (Phase 3): Assignment `done` is read from **box_grants, not
  progress.passed** — passed stays true forever once earned, so it cannot say whether
  THIS assignment was completed. Re-assigning the same quest is a genuinely new
  assignment and legitimately earns a second box.
- 2026-07-19 (Phase 3): **One box per completed assignment**, deduped by the
  `box_grants` primary key so replays cannot farm boxes. Loot weights live in the
  `loot_table` table (gold 55 / food 30 / cosmetic 15) and never reach the client.
- 2026-07-19 (Phase 3): Cosmetic drops are **guaranteed-new** — the pool is filtered to
  unowned items at or below her level, granted to blip slot 1; an empty pool pays gold
  instead. A box handing back a hat she already owns is a punishment, not a prize.
- 2026-07-19 (Phase 3): Box food loot is **soup/medicine only, never cookies** — the
  cookie is the free daily `feed()`, not a pantry item, so a pantry cookie would be dead
  inventory. Boxes stocking the pharmacy also helps a learner whose Blip has fallen ill.
- 2026-07-28 (store): **Free accessory art was researched and rejected.** game-icons.net
  (CC BY 3.0, 4180 icons) is the best-fitting library, but its files are single white
  silhouettes in a 512 box with no outline or internal detail, its wings/capes are drawn
  as one two-sided object (useless for our mirrored paired slots), and using it puts a
  permanent credit line in a learner-facing app. Refitting one is about the same work as
  drawing a simple shape from scratch. OpenMoji was ruled out separately — CC BY-SA is
  viral onto derived art. Verdict: keep drawing them, use icon libraries only as visual
  reference. Megan's call, after the research.
- 2026-07-28 (store): **A back item can only be read from what peeks.** Blip is a wide
  egg — measured off the blue base's alpha: y0.20 → 0.202 wide, y0.65 → 0.94 wide, body
  ends y0.885. So anything behind him is completely hidden between roughly y0.35 and
  y0.85. All three back items are designed around that: shoulders/collar above, hem or
  thrust flames below, nothing that matters in the middle. Don't "fix" the hidden middle.
- 2026-07-28 (store): **A back item must CONTRAST with the body, not match the palette.**
  The schoolbag's first pass used the accessory blues and simply vanished; it is amber
  now. Anything new in the back slot needs a non-blue fill.
- 2026-07-28 (store): **Rarity is derived from price, not stored** — 0 = free badge,
  ≥120 = the theme's violet rare frame. No new column, no backfill. Retune the bands in
  `itemRarity()` in blip-ui.js, one place.
- 2026-07-28 (store): **Free items are bought, not granted** — they sit in the shop at
  price 0 and take one tap. That avoided backfilling owned_items for every existing
  learner. They are also excluded from treasure-box loot (`price > 0` in the pool):
  a box handing over something the shop gives away is the same let-down as a duplicate.
- 2026-07-28 (store): The glasses convention is now measured, not guessed — the painted
  eyes sit at stage x 0.308 / 0.688 spanning y 0.487–0.63, so every eyewear item uses
  viewBox width 210, lens centres x=60/x=150, widthPct 90. An eye-SHAPE item (sleepy
  eyes) additionally needs body-coloured mask ellipses or the painted eyes show through.
- 2026-07-28 (store): The beanie gets its own lower `attach`. The hat/wings/glasses
  FLOATY ruling from 2026-07-19 stands for party-hat and halo, but a floating beanie
  reads as a bug rather than as cute.
- 2026-08-05 (Tripo): **Tripo IS a proven art source** — Megan makes sprites with
  it daily (Re:Lefela's Katse cats). Accessories therefore come from her Tripo
  image tool as 2D PNGs, not from 3D models: accessories never animate, so 3D
  buys nothing for them. Do not re-litigate this.
- 2026-08-05 (Tripo): the drift-killer is her **locked-reference prompt** —
  "use the attached picture as a locked reference, same shapes, same
  proportions, same outline" with one reference image reused for the whole
  wave. Same reference every batch or the set stops matching.
- 2026-08-05 (Tripo): the image tool does **not** emit real alpha, it paints a
  fake checkerboard. So sheets are generated on flat **#FF00FF with no drop
  shadows** and keyed in `tools/tripo_sheet.py`. No more Canva by hand.
- 2026-08-05 (Tripo): **do not fill interior holes when keying.** It is the
  obvious way to stop dark items going see-through and it destroys ring
  effects (annulus) and the eye mask (cut-out eye holes). A per-pixel
  distance test keeps solids opaque without touching topology.
- 2026-08-05 (effects): an effect only reads if it is **wider than he is**
  (0.94 of the stage at his widest), hence widthPct ~110. A compact mass
  instead of a ring must carry its own LOW `attach` or the body swallows it
  — that is why `shadow-crown` pools at his base.
- 2026-08-05 (effects): effects paint behind **everything**, back item
  included — an aura over the cape reads as a sticker, not a glow.
- 2026-08-05 (keying): the background is NOT one exact colour — a "magenta"
  sheet measures rgb(253,16,248) and wanders a few units. So a channel only
  gets a vote if its divisor beats its own measured wobble; a fixed threshold
  is not enough (two sheets had green at 42 ±10, which read as 60% opaque).
- 2026-08-05 (keying): split items by **connected components**, not row/column
  projection. On the back+wings sheet the golden wing's tip and the dragon
  wing share columns with no blank gap, so no projection split exists.
- 2026-08-05 (keying): drop specks BEFORE working out reading order — the row
  grouping sizes itself off the median box height, and a few 5x5 specks made
  every item its own "row", so the sheet read top-to-bottom and silently
  renamed the wizard hat to "crystal-orbit".
- 2026-08-05 (hats): Blip is a TEARDROP with a pointed top, so a solid hat at
  the shared hat point (y0.10, above the body at y0.15) touches nothing and
  hovers. Both Tripo hats carry their own lower `attach`, per the beanie
  precedent. The floaty ruling still stands for the items it was made for.
- 2026-08-05 (Tripo): her wing art roots at the LOWER-LEFT, i.e. it is a
  RIGHT-hand piece, the opposite of every code-drawn wing. Handled by a
  `flipX` flag that inverts which side gets mirrored — her art is never
  edited to suit the code.
- 2026-08-05 (Tripo): 3D Blip is parked as a separate decision (Track 2 in
  BLIP-3D-POC.md) and blocks none of this. Community Tripo models export for
  5 tokens (GLB/FBX/OBJ/STL/USD/3MF) if that route is ever taken.
- 2026-08-06 (keying): solidity is judged by **two** tests, and a pixel is only
  left translucent when BOTH agree it could be. The minimum-alpha reading alone
  is ambiguous for mid-grey, which is most of wave 2. Do not remove the distance
  test to "simplify" — `tools/test_tripo_sheet.py` has a brushed-steel item that
  fails loudly if you do.
- 2026-08-06 (keying): do NOT exclude the outline from the distance test. It
  halves the 1-2% pink rim on real anti-aliased art and is WRONG on hard-edged
  art, where the outermost pixel is genuinely solid and gets thrown back to the
  reading that turns it green. The rim is invisible at the size Blip renders —
  you only see it at 3x zoom. Fix it by keying, not by eroding.
- 2026-08-06 (keying): the plasma-ring wisps came out green-teal and were NOT
  fixed: those pixels sit at distance-ratio 0.10-0.24, exactly where a genuine
  soft glow lives (0.23). No threshold separates them, so anything that fixes
  the wisps flattens every real glow. That item is cut now, but the finding
  stands for any future violet art on magenta.
- 2026-08-06 (slicing): reading order is the ONE thing the slicer cannot verify.
  A staggered sheet reads by rows, so an item floating higher than the others
  comes FIRST — that is how the crown and monocle got each other's names. The
  slicer now prints each item's x,y; check it against the sheet before trusting
  the names.
- 2026-08-06 (art review): five of fifteen new items were cut ON SIGHT, after
  they passed every assertion. Assertions prove structure; only looking proves
  art. Budget for a look-and-cut pass on every wave — it is not rework, it is
  the review.
- 2026-08-06 (cape): the cape sits LOWER than the shared back point (its own
  attach at y0.50, widthPct 92). Its collar is the narrow top edge of the art
  and at the shared point it cleared the silhouette either side of his crown.
- 2026-08-06 (retiring): while the app is with NO learner, a cut item is deleted
  outright. Once kids are on it, use `active = false` instead so nothing is
  confiscated from a closet. An applied migration is never edited — the removal
  goes in the NEW migration, and verify-store.html knows to stop expecting a
  retired id in the client mirror.
- 2026-08-06 (growth): **Baby Blip is retired.** Growth is SIZE ONLY — one body design
  shown at 0.60/0.75/0.88/1.00, never a second drawing. `idleAnimState` and
  `resolveRawBody` no longer branch on `growthStage` at all, so a tiny Blip uses the
  ordinary base and the ordinary loops. Do not reintroduce per-stage art. The admin
  growth label for stage 0 is now "Tiny", not "Baby".
- 2026-08-06 (shop, Megan): **nothing may be free once the kids are actually playing.**
  The 0-gold free tier exists so a brand-new learner can dress Blip before earning
  anything, and it is fine while the app is with no learner — but **before go-live every
  free item must get a real price.** That is a migration (prices) plus a re-tune of the
  "free" band in `itemRarity()`, and it also un-blocks free items from treasure-box loot
  (the pool currently filters on `price > 0`). See Next up.
- 2026-08-06 (feeding, Megan's idea): **the KID drags the food to Blip — the drag IS
  the animation.** We had been designing a floating-food layer that flies into his
  mouth on its own (a motion+scale timeline running in step with his body frames).
  Her call killed that entirely: if the child drags the food and lets go near him,
  their finger does the movement, and the app only has to notice the drop and play
  his four frames while the food disappears. No motion path, no per-food position
  tuning, and no risk of the food reading as "evaporating in mid-air". It is also
  more fun — feeding becomes something you DO, not something you watch after a tap.
- 2026-08-06 (art): the eating sheet is **GENERIC — no food drawn in it**, so ONE
  sheet covers every food in the shop forever. The food picture comes from the shop
  item art. Per-food sheets were considered and rejected: 18 foods = 18 generations,
  18 slicing runs and ~72 PNGs in a PWA, versus 4. Her later strawberry sheet proved
  per-food CAN come out clean first try, so this was a cost call, not a quality one.
- 2026-08-06 (art): the eating prompt's **gaze instruction is load-bearing.** Frames
  1-2 say "eyes looking down and slightly to one side" — that is where the dragged
  food will be. Without it he stares straight ahead while food hovers past his chin
  and the two layers read as unrelated. Frame 4 releases the look; the food is gone.
- 2026-08-06 (art): **Blip must never be drawn with arms.** Arms are an accessory
  slot (stubby-arms / mitts / power-gloves), so arms baked into the body double up
  the moment a learner equips one. Megan's own instinct, and the code agrees.
- 2026-08-06 (art): free asset libraries were sampled again FOR FOOD and rejected
  again. **Kenney's Food Kit is 3D models**, not sprites. Kenney's 2D pack (Generic
  Items, CC0) has **no outlines at all** and is tools/electronics rather than food.
  itch.io's food packs are **pixel art**. Blip's whole look is a thick navy outline
  on flat electric blue; nothing free sits next to that. Same wall as the July
  accessory search — do not re-litigate. Food comes from Tripo.
- 2026-07-19 (Phase 3): Phase-3 CSS lives in **separate stylesheets** (`assignment.css`,
  `treasure.css`, `push.css`) rather than growing `styles.css` — they were built by
  parallel agents and separate files meant no merge conflicts. All three load after
  styles.css and depend on its tokens.
- 2026-08-07 (slicer): **dust is dropped BEFORE the dilation that groups an item's
  pieces**, min area 256 px. The pastries sheet's background speckle chained four
  pastries into one 944x704 blob; filtering after grouping cannot undo a bridge.
- 2026-08-07 (slicer): **`--opaque` is a declaration, not a detection.** Opaque pink
  icing and grape purple sit at distance-ratio 0.31-0.33; genuine wave-1 glows run to
  0.366 — the distributions OVERLAP, so no threshold exists (same wall as the plasma
  ring). The sheet AUTHOR knows whether translucent art was prompted; food/accessory
  sheets say "no glow" so everything inside the rim is solid. Applied to the INTERIOR
  only (2px inset) — forcing the anti-aliased rim solid left a pink halo. Never use
  --opaque on effects sheets.
- 2026-08-07 (slicer): **`--group "1+2,3+4"`** merges components by dry-run index, for
  items whose pieces sit FURTHER apart than two different items do (the eye pairs:
  eyes ~480px apart, rows ~250px). Anything not listed is dropped — that is how the
  stray mouth Tripo drew between the happy-eyes pair was cut without a re-roll.
- 2026-08-07 (slicer): **`--whole`** keys a character sheet to one RGBA PNG without
  cropping — slice_sprites.py ground-aligns rows off a shared baseline, and per-item
  crops would destroy it. This is how Tripo sheets feed the sprite pipeline now.
- 2026-08-07 (neck): **Blip has no neck, so neck art must be ~5x wider than tall.**
  Eyes end at y 0.63, body ends at 0.885, and he is 0.954 wide at y 0.63-0.66 — a
  deep U whose arms clear his eyes is taller than his whole body (measured; the
  gangster chain proved it at every size). The wide set (2.5-2.8:1) works at the
  slot's shared attach 0.60 / widthPct 104.
- 2026-08-07 (neck): **widthPct 104 — wider than the stage — on purpose.** At 88 the
  arc's ends stopped inside his silhouette and read as "lying on him" (her exact
  complaint); the ends must pass THROUGH his widest point to read as wrapping behind.
  112 leaves the ends floating in mid-air. The chunky-chain (1.75:1, medallion drop)
  carries its own attach 0.50 or the medallion falls off the stage.
- 2026-08-07 (retiring): **a deleted item's ID never returns.** verify-store's
  retired-scan reads deletes out of every migration and asserts those ids are absent
  from the client. The regenerated gangster chain is therefore `chunky-chain` (label
  still "Gold chain"), not a re-seeded `gold-chain`. Applied migrations stay unedited.
- 2026-08-07 (drag-to-feed, Megan): **a food dropped away from Blip floats back to
  the pantry, no penalty, and Blip plays the `sad` moment.** Sad art exists and is
  wired; the drag interaction itself is still to build (pointer events, never rAF).
- 2026-08-07 (art): the eating prompt's gaze instruction ("eyes looking down") did
  NOT survive generation — frames look straight ahead. Shipped anyway: the child's
  own finger drags the food to his mouth, which does the connecting the gaze was for.
- 2026-08-07 (tooling): **tools/preview_accessory.py** composites an item onto Blip
  with the renderer's exact geometry (x/width against stage WIDTH, y against HEIGHT,
  anchor as fraction of the item's own box). Placement by eye in seconds instead of
  headless Chromium. If makeAccessoryLayer's maths ever changes, change it too.

## Pending on Megan
- 📱 2 min: close and reopen the Blipwork PWA twice (sw v34 → v37 is a big jump),
  then check the cape sits low AND a shop necklace wraps around him **[whenever]**
- 💻 1 min: say whether `FABLE-AUDIT-2026-08-06.md` may be committed — the repo is
  PUBLIC, so it stays uncommitted until you decide **[whenever]**
- 🎨 5 min: re-roll `happy-eyes` if you want it better (the weakest of the six eye
  pairs; Tripo drew an unwanted mouth that had to be masked out) **[whenever]**

(2026-08-06's stuck-Pages saga resolved 2026-08-07: both stuck builds ended
"errored" on GitHub's side, and the fresh push built green in ~40s. The lesson
stands: a live site a ship behind = check `gh api .../pages/builds` first.)

## Next up
**The sequence (Megan's ruling, 2026-07-25) — in this order, nothing skips ahead:**
1. ~~Megan's full play-through of all levels~~ — **DONE 2026-07-31.**
2. ~~Store upgrade: free-tier bundles that include accessories~~ — **BUILT 2026-07-28**,
   waiting only on the SQL above. 22 items, free tier in every slot, new back slot,
   closet/shop split.
3. **Migrate the Circle Quest class → Blipwork.** Only when she calls it.
4. **Price the free tier before any learner arrives** (her ruling, 2026-08-06):
   nothing may be free once the kids are playing. Seven items sit at price 0 today
   (one per slot). Needs a migration setting real prices, a re-tune of the "free"
   band in `itemRarity()` (blip-ui.js), and a decision on whether ex-free items
   should now be eligible for treasure-box loot (the pool filters `price > 0`).
   Also worth doing at the same time: the shop lists all seven free items FIRST,
   so the whole first phone screen reads as "everything is free".
5. Only then, the go-live trio: term toggle ON + first homework assignment + the
   PUSH-SETUP.md walkthrough (~25 min, do it together in a session — reminders are
   pointless before the kids are actually here, which is why it waits).

**THE FOOD SHOP / DRAG-TO-FEED (next build job — art side now DONE 2026-08-07):**
1. ~~Slice the eating sheet~~ — **DONE**, `eating` moment wired + verified (plays
   once, recolours). Ditto **`sad`** (top row of `art-source/tripo/sad blip.png`;
   the bottom row is an eyebrows-no-tear alternative, unused).
2. ~~Generate + slice the food art~~ — **DONE, 44 items** in `assets/companion/food/`
   (fruit, pastries, sweets, hot meals, braai, veggies, drinks).
3. **Drag-to-feed** (the actual build): the child drags a food from the pantry to
   Blip; on release near him the food disappears and `eating` plays. Dropped
   anywhere else: the food floats back to the pantry, no penalty, and `sad` plays
   (her ruling 2026-08-07). Pointer events, NOT rAF (browser pane never fires rAF).
4. **Shop rows + a migration** for the food items, mirrored in local-backend.js.
   ⚠️ Food already has a `category = 'food'` path in `mhq_get_state` (`foodShop`), so
   this may need NO new slot — check before assuming, and remember a new COLUMN would
   need its own GRANT. Also decide prices/level gates for 44 foods — probably tiered
   by sheet (fruit cheap, braai mid, drinks/sweets treats).

**WAVE-3 ACCESSORY PLACEMENT (second build job):** the fairy/girly/tomboy/gangster
items and six eye pairs are cut and committed but have NO renderer entries, labels
or shop rows yet. Notes that matter, measured this session:
- eye pairs are drawn wider than his painted eyes — widthPct ~70 (happy-eyes ~54),
  not the eyewear convention's 90; code must hide the painted eyes underneath
  (never bake a body-coloured patch into the art — recolouring would break it).
- star-wand has NO slot (Blip has no hands) — needs a decision, not art.
- both wings root lower-left like her other wing art, so `flipX: true`.
- preview EVERYTHING with tools/preview_accessory.py before trusting numbers.

**Wave 2 is DONE (2026-08-06).** Two gaps it left, both visible only once the
whole catalogue was laid out side by side:
- **Wings jumps from free straight to 140g.** Six of its seven items are rare
  L6, so between level 1 and level 6 there is nothing to buy in that slot.
- **Eyes has no aspirational item** — it tops out at 65g, so a high-level
  learner with gold saved has nothing to want there.
- Effects is down to 4 and Back to 4 after the cuts. Both still have a free
  item and a real choice, so neither is urgent.
A wave 3 aimed at cheap wings + one rare eye item would fix all three.

**Store, if she wants more later** (in rough order of payoff per hour):
- ~~EFFECTS tab~~ — **BUILT 2026-08-05**, waiting on art + SQL.
- PATTERNS tab — body patterns. Needs a masked overlay following the body shape, so it
  touches the recolour pipeline.
- FACE tab — hardest, and last for a reason: the sprite animation frames have their own
  faces drawn in, so a swappable face has to reconcile with every animated state.
- Prices are still guesses. Worth retuning once the kids have actually played — the
  bands live in one function (`itemRarity`) and one migration.
- **Link Circle Quest → this hub** — deferred to after the kids finish their CQ rounds.
- Phase 3 remainder: teacher-assigned homework is done; the treasure box is done;
  sick-stage push needs only the manual setup above.
- Mockup-derived backlog (homework-hub-companion/plan.md): FACE / EFFECTS / PATTERNS
  shop tabs, randomize/undo customise flow.
- ~~Unused baby art, if ever wanted~~ — superseded by the Baby Blip retirement below.

**Companion art rework — ✅ BABY BLIP RETIRED 2026-08-06 (built + verified, NOT yet pushed).**
- ~~Retire Baby Blip entirely~~ — **DONE.** Growth is now SIZE ONLY: one body design at
  0.60 / 0.75 / 0.88 / 1.00, which is exactly what `GROWTH_SCALE` already did, so the
  retirement was a removal rather than a rebuild. Gone: the baby art swap in
  `resolveRawBody`, both baby branches in `idleAnimState`, the baby entries in
  `ANIM_FRAME_COUNTS` / `ANIM_RECOLOURS`, the six derived frames in
  `assets/companion/anim/`, and the two baby rows in `tools/slice_sprites.py`.
  Her master sheets stay in `art-source/` as archive.
  **Verified** in companion-test.html: growth ratio still exactly 0.600, growthStage 0
  now renders the ordinary base when fed and the ordinary `sleeping` loop when asleep,
  zero network requests for any `baby-*` file, no console errors.
- Her original art (sprite sheets, logo, design images) is now backed up in `art-source/`
  in this repo — use those masters, never redraw.

## How Phase 3 was verified (and what wasn't)
- **Headless harness** (33 assertions, all green) exercising the local backend for real:
  box awarded once and only once, replays award nothing, `no_box` on a second open,
  re-assignment earns a fresh box, loot distribution sane over 300 boxes, admin
  `doneCount` correct, closed/unknown quests refused.
- **Browser DOM verification**: homework card renders with the soft due line; treasure
  badge → chest → reveal → close reconciles both the box count and gold; all three new
  stylesheets load with real rules; every new module imports cleanly.
- **Pre-migration safety** verified by deleting `assignment`/`boxes` from the state and
  re-rendering: no errors, features simply absent.
- **Live SQL smoke test (2026-07-19, 21/21)**: new state keys present; `no_box` before
  any box; admin RPCs reject a wrong password; learner sees the assignment; a FAIL grants
  nothing; a PASS grants exactly one box; a replay grants nothing; `done` flips to true;
  the box opens and pays out; a second open returns `no_box`; push subscribe/re-subscribe
  (still one row) /unsubscribe; the one-active-assignment index blocks a second active row;
  `_mhq_health` and `_mhq_is_qual_day` callable. Test learner deleted, row counts back to
  baseline.
- **NOT verified**: push *delivery* (needs a phone plus the manual setup), and
  `mhq_admin_set_assignment` on the CORRECT password — deliberately not exercised, because
  that would have meant handling the admin password. Its auth gate, its quest-open check
  and every row it writes were all tested; the happy path runs the first time you set
  homework in admin.
- **Security advisor after the migration**: no new class of warning. The 64 WARNs are the
  existing deliberate architecture (RLS-on-no-policies + SECURITY DEFINER RPCs executable
  by anon — that IS the design). The only unrelated nits are `_mhq_level` and `_mhq_growth`
  having a mutable `search_path`; both pre-date Phase 3 and are pure-maths helpers that
  touch no tables. Worth pinning one day, not urgent.
- Screenshots still time out in the Browser pane (known); DOM inspection stands in.
- One agent reported an escaped-closing-tag bug in `screens.js` — checked against the
  actual bytes and it was a **false positive**. The markup is fine; nothing was changed.

## How the store expansion was verified (2026-07-28)
- **`verify-store.html`, 428 assertions, all green.** Every sellable id has renderer art
  AND a friendly label AND a matching slot; every accessory has an ATTACH point, a
  viewBox and a widthPct; every slot sells ≥2 items and has a free level-1 one; rares are
  all level 6+; free items are outside the loot pool; buying the free cape leaves gold
  unchanged; equipping/unequipping the NEW back slot round-trips; the back slot rejects an
  unowned id; every accessory renders the right number of layers (2 for paired slots) with
  no unreplaced `{{UID}}`; four full outfits keep every item and paint back-behind-body
  and hat-in-front-of-body.
- **The migration SQL is parsed by the verify page** and each row cross-checked (price,
  minLevel, slot) against the client's own catalogue mirror in local-backend.js. That
  drift — an item added to one side only — is the failure this is built to catch.
- **Seen, not assumed.** Screenshots time out in the Browser pane (known), so the art was
  reviewed through headless Chromium via Playwright. Two items failed that review and were
  redrawn: the schoolbag was invisible (blue on blue → amber, 56%→68%) and the cape's pale
  rounded collar read as a second pair of ears (→ one continuous piece, angular shoulders).
- **Live SQL smoke test (2026-07-28, 14/14)** — migration `store_expansion_back_slot_and_
  free_tier`, run via MCP against a throwaway learner that was deleted afterwards. Steps:
  signup; state shows 22 cosmetics; back slot has cape/schoolbag/jetpack; six free items
  across six distinct slots; the free cape buys OK and leaves gold unchanged; equipping to
  the NEW back slot succeeds and sticks; back REJECTS an unowned item; a bogus slot key is
  still rejected; taking it off works; a level-10 rare is refused at level 1; 60 boxes
  opened, all 13 cosmetic drops were paid items (never a free one); throwaway deleted.
- **Learner data verified byte-identical before and after**: 2 students, 2 blips, 24
  progress rows, 4580 XP, 0 gold, 0 boxes — unchanged. shop_items 14 → 30, active
  cosmetics 6 → 22, back items 3.
- **Security advisors after the migration**: 64 WARNs, the same count and the same three
  classes as before Phase 3 — no new category. The two `function_search_path_mutable` nits
  are still the pre-existing `_mhq_level` / `_mhq_growth`; both functions this migration
  replaced pin their own `search_path`.

## Tooling notes
- `tools/slice_sprites.py` — cuts her sheets into frames. Scale is computed off the
  **body**, not the alpha box.
- `tools/make_icons.py` — builds all five icons. Keys off **alpha**, not brightness.
- Preview: another chat often holds port 5191, so there is a `maths-quest-alt` entry
  on **5202** in the global `~/.claude/.claude/launch.json`.
- `globalThis.__BLIP_DEV__.grantBox(n)` hands you treasure boxes offline so the modal
  can be exercised without setting an assignment and playing it; `.skipDays(n)` still
  drives the sickness clock.
</content>
