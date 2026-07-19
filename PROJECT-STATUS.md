# Project status — updated 2026-07-19 (Phase 3: push, homework, treasure box)

## Where we are
Live at https://megzieberr.github.io/blipwork/, service worker **mhq-v32**.
Phase 3 shipped as one commit, built by three parallel agents against a frozen
contract (`homework-hub-companion/PHASE-3-PLAN.md`) with the SQL and all
shared-file splices written by the lead session so nothing collided.

Three features, all client-complete:
1. **Sick-stage push warnings** — dormant until the VAPID key is set.
2. **Teacher-assigned homework** — one active assignment, pinned to the hub.
3. **Treasure box** — one per completed assignment, opened on the Blip screen.

⚠️ **`supabase/migration-phase3.sql` has NOT been run yet.** Until it is, all
three features are invisible on live — verified deliberately, not assumed: with
`assignment` and `boxes` deleted from the state (simulating the old RPC), the hub
and Blip screens render clean with zero runtime errors. So the deploy is safe
ahead of the migration; the features simply switch on when it runs.

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
- 2026-07-19 (Phase 3): Phase-3 CSS lives in **separate stylesheets** (`assignment.css`,
  `treasure.css`, `push.css`) rather than growing `styles.css` — they were built by
  parallel agents and separate files meant no merge conflicts. All three load after
  styles.css and depend on its tokens.

## Pending on Megan
- **Run `supabase/migration-phase3.sql`** in the SQL editor (project
  pjpwhalcifywjrwtjknd). Until then Phase 3 is invisible on live — safe, but off.
  The file ends with a SMOKE TEST block: run those statements right after, on live.
  This matters because the local JS backend does not exercise the SQL — a PL/pgSQL
  ambiguity got through that way in Phase 2.
- **Work through `PUSH-SETUP.md`** (~20–30 min, no rush): pg_cron + pg_net extensions,
  four secrets, deploy the `send-push` function with Verify JWT **OFF**, run `cron.sql`.
  You can reuse the Circle Quest VAPID keypair — Part 1 offers that as Option A.
- **Set a first homework assignment** in admin once Term 3 quests are open.
- At term start: **term-running toggle ON in admin** — the sickness clock is frozen
  until then, deliberately.
- Optional art, whenever: a single-wink re-roll, and baby loops with one held
  expression if the 3-frame loops feel short. Both are asset-only ships.

## Next up
- Smoke-test the Phase 3 RPCs on live once the migration is in.
- **Link Circle Quest → this hub** — deferred to after the kids finish their CQ rounds.
- Phase 3 remainder: teacher-assigned homework is done; the treasure box is done;
  sick-stage push needs only the manual setup above.
- Mockup-derived backlog (homework-hub-companion/plan.md): FACE / EFFECTS / PATTERNS
  shop tabs, randomize/undo customise flow.
- Unused baby art, if ever wanted: a baby-hungry row exists in `Blip Recovery Sprite.png`
  but is blanket-wrapped, and in this app a blanket reads as sick.

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
- **NOT verified**: the SQL itself (needs the migration run — see the smoke-test block),
  and push delivery (needs a phone plus the manual setup). Both are called out above
  rather than assumed working.
- Screenshots still time out in the Browser pane (known); DOM inspection stands in.
- One agent reported an escaped-closing-tag bug in `screens.js` — checked against the
  actual bytes and it was a **false positive**. The markup is fine; nothing was changed.

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
