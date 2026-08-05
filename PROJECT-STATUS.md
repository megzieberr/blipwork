# Project status — updated 2026-08-05 (effects slot + Tripo wave 1 SHIPPED, migration applied)

## Where we are
Live at https://megzieberr.github.io/blipwork/, service worker **mhq-v34**.

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
- `supabase/migration-effects-slot.sql` — **NOT yet applied.**

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
- 2026-07-19 (Phase 3): Phase-3 CSS lives in **separate stylesheets** (`assignment.css`,
  `treasure.css`, `push.css`) rather than growing `styles.css` — they were built by
  parallel agents and separate files meant no merge conflicts. All three load after
  styles.css and depend on its tokens.

## Pending on Megan
- 📱 1 min: close and reopen the Blipwork PWA twice so the new service worker
  (v34) takes, then look at the Effects tab on the real site **[whenever]**

## Next up
**The sequence (Megan's ruling, 2026-07-25) — in this order, nothing skips ahead:**
1. ~~Megan's full play-through of all levels~~ — **DONE 2026-07-31.**
2. ~~Store upgrade: free-tier bundles that include accessories~~ — **BUILT 2026-07-28**,
   waiting only on the SQL above. 22 items, free tier in every slot, new back slot,
   closet/shop split.
3. **Migrate the Circle Quest class → Blipwork.** Only when she calls it.
4. Only then, the go-live trio: term toggle ON + first homework assignment + the
   PUSH-SETUP.md walkthrough (~25 min, do it together in a session — reminders are
   pointless before the kids are actually here, which is why it waits).

**Immediately next: TRIPO WAVE 2 — techy, 15 items, prompts already written**
in `art-source/tripo/WAVE-2-PROMPTS.md` (5 sheets of 3, plus suggested prices
and the slicer commands). Megan generates and curates; the build side is then
small — rows, labels, a placement pass — because **no new slot is needed**, so
none of the July back-slot / August effects-slot machinery has to change.
Priority is ears and arms: after wave 1 they are the thin slots at 3 items
each, against Hat 7 / Eyes 7 / Wings 5 / Effects 5 / Back 4.

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

**Companion art rework (Megan's call, 2026-08-02) — for a future session:**
- **Retire Baby Blip entirely** — she's unhappy with how it looks. Replace the baby stage
  with a **small version of adult Blip that grows bigger** as the companion levels up.
  Same grow-with-progress idea, one body design instead of two.
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
