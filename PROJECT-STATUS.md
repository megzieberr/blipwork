# Project status — updated 2026-07-19 (late: sprite loops + tap + icon rebuild)

## Where we are — THREE more ships, all live
Live at https://megzieberr.github.io/blipwork/, service worker **mhq-v31**.
Today's later session shipped, in order:

1. `c5be5dd` — bigger app icon, recovering + wink sprite loops, tap-to-react Blip
2. `530b7e7` — baby Blip sprite loops (asleep / happy) at growthStage 0
3. `b64d001` — app icons rebuilt from her new logo artwork

**No SQL in any of them** — this was all client + assets. Nothing outstanding.

### Sprite loops now on disk
`assets/companion/anim/<state>-<n>.png`, cut by the new **`tools/slice_sprites.py`**
(the earlier rows were cut by a scratchpad script that was never kept — re-cutting
is now reproducible; edit `JOBS`/`GROUPS` and re-run).

| state | frames | source | recolours? |
|---|---|---|---|
| sleeping, hungry, excited, jumping | 4 | earlier sheets | yes |
| sick, veryill | 4 | earlier sheets | no (sickness overrides colour) |
| **recovering** | 4 | `Recovering Blip 2.png` | no |
| **wink** | 4 | `Winking blip.png` | yes |
| **baby-sleeping** | 3 | `Baby Blip Sprite.png` row 1, frames 1-3 | yes |
| **baby-happy** | 3 | `Baby Blip Sprite.png` row 2, frames 2-4 | yes |

### Tap-to-react
Tapping the hero on the Blip screen alternates a **wink** and a **hop** (the hop is
the jumping loop played twice). Opt-in via `renderBlip`'s `tappable: true`; the
listener binds once to the host `el` and reads the current handle from a WeakMap,
because every re-render wipes everything inside. Ignored while sleeping / sick /
recovering. **Not** enabled on the hub tile — that tile's own click navigates here.

### Baby
growthStage 0 uses her drawn baby body for **asleep** and **happy-and-fed** only.
Hungry / sick / very-ill / recovering still fall through to the grown loops scaled
down, which is what growthStage 0 already showed before any baby art existed.
There is deliberately **no `blip-baby.png` static** — `resolveRawBody` would then
serve a beaming baby face for a sick baby.

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

## Pending on Megan
- **Reinstall the PWA one more time** to pick up the new icon. Home-screen icons are
  baked in at install time and never refresh — this is the only reason a reinstall is
  needed, and it will not be needed again for ordinary updates. Remove the app (not just
  the shortcut), then install fresh from https://megzieberr.github.io/blipwork/.
- Phone play-through: tap Blip on his screen (wink/hop), and eyeball the recovering and
  baby loops. Easiest at `companion-test.html`, or `?local=1` + `__BLIP_DEV__.skipDays(n)`.
- At term start: **term-running toggle ON in admin** — the sickness clock is frozen until
  then, deliberately.
- Optional art, whenever: a single-wink re-roll, and baby loops with one held expression
  if the 3-frame loops feel short. Both are asset-only ships.

## Next up
- Sick-stage push warnings (reuse Circle Quest VAPID) — designed, not built.
- Phase 3: teacher-assigned homework + treasure box + notifications.
- Link Circle Quest → this hub (pencilled for the week of 20 Jul; the pinger entry is
  already done).
- Mockup-derived backlog (homework-hub-companion/plan.md): FACE / EFFECTS / PATTERNS
  shop tabs, randomize/undo customise flow.
- Unused baby art, if ever wanted: a baby-hungry row exists in `Blip Recovery Sprite.png`
  but is blanket-wrapped, and in this app a blanket reads as sick.

## Tooling notes (new today)
- `tools/slice_sprites.py` — cuts her sheets into frames. Scale is computed off the
  **body**, not the alpha box: the box includes zZ marks and motion lines, which differ
  per row and once gave a baby 441px tall asleep and 317px happy. Rows that must read as
  the same character share one scale via `GROUPS`.
- `tools/make_icons.py` — builds all five icons. Keys off **alpha**, not brightness: his
  sunglasses are near-black and span his full width, so a brightness test cuts him in
  half. Header records the approaches that failed on the older artwork.
- Preview: another chat often holds port 5191, so there is now a `maths-quest-alt` entry
  on **5202** in the global `~/.claude/.claude/launch.json`.
