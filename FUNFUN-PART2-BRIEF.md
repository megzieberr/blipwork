# FUN FUNCTIONS MOUNT — PART 2 BRIEF (blipwork side)
*Written 2026-08-23 night by the Fable foreman. Two Opus sessions, reviewed between.
Plan of record: `graph-quest\MIGRATION-PLAN.md` — her four calls are decided, do not re-ask.*

=== MEGAN'S /go DELEGATION — 2026-08-23 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: Fun Functions mount Part 2 in blipwork — migration-funfun.sql, 📈 strip,
         play screen, payout, dashboard chips, sync script
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (blipwork)
           + C:\Users\megzi\Desktop\Claude Code Projects\graph-quest (sync script source)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===

Clarifications of that scope: you WRITE `supabase/migration-funfun.sql`; you never
apply it (the foreman runs it on live via MCP after review). No `git push`. No `git
commit` either — leave the working tree for the foreman's review (you may `git add`
nothing). No edits to any file under `graph-quest\js\`, `graph-quest\css\` or its
harness except the NEW `graph-quest\tools\sync-to-blipwork.py`.

---

## What exists already (read these, don't re-derive)

**graph-quest side (Part 1, shipped gq-v31):**
- `js/mount.js` — `mountFunFunctions(rootEl, host) → { ready, destroy() }`. The host
  object contract is in the header comment: `questId, lang, semicircles, profile(),
  saveResult(questId, score, total, xp, answered), markMet(questId, skillId)?,
  onFinished(res), onExit(), onScrollTop()?`.
- `profile()` must return `{ xp, quests: { [questId]: { best, total, plays, done } },
  met: { [questId]: { [skillId]: true } } }`.
- `res` handed to `onFinished`: `{ questId, score, total, xp, comeback, boost, passed,
  answered: [{ i, skillId, outcome: "full"|"hinted"|"half"|"wrong"|"skipped", xp }] }`.
- `js/screens.js` exports `questUnlocked(profile, i)` — the grandfathered unlock rule
  (i===0 open; else open if that quest has plays>0 or done, or the previous is done).
- `js/quests/index.js` exports `QUESTS` (15, in map order; each has `id`, `title`,
  `blurb` as bilingual objects read with `L()` from `js/i18n.js`, `accent`).
- `css/styles.css` — every rule scoped under `.ff-root`; `css/standalone.css` is the
  page-owning sheet and must NOT be synced.
- `mount-driver.js` + `mount-test.html` — headless mount harness (`spyHost`,
  `playMounted`). Read them; blipwork's verify page reuses the driver.
- Import graph under `js/mount.js`: ui.js, i18n.js, backend.js (→ supabase-config.js),
  play.js (→ check.js, funclib.js), quests/* , engine/*. `screens.js` is NOT imported
  by mount.js but blipwork needs `questUnlocked` from it — sync it too (it only
  imports ui/i18n/quests).
- ⚠ Three seam facts from the Part-1 review: (a) `.ff-root .view{min-height:100vh}`
  stretches the mounted box to full phone height; (b) mounted mode still writes
  `gq.intro.<questId>` to localStorage — DECIDED: leave it (one intro per quest per
  device is fine for a learner's own phone); (c) scroll-to-top on each item only
  happens if the host passes `onScrollTop`.

**blipwork side (the template is the dice):**
- `supabase/migration-dice.sql` — the RPC style to copy: `_mhq_auth`, `for update`
  row lock, `_mhq_level`, `_mhq_dice_xp(jsonb bool array)` (immutable, already on
  live), explicit `revoke`/`grant execute ... to anon, authenticated`, `set
  search_path = public, extensions` on security-definer functions.
- `js/dice-play.js` — `openDiceRound` / `finishDice`: how a generated round is opened
  and paid out; `js/screens.js` `renderChapter` (🎲 card block ~line 310) and
  `renderDiceResults` (~line 529); `js/app.js` `render()` switch; `js/api.js` +
  `js/supabase.js` (`rpc()` wrappers) + `js/local-backend.js` (the `?local=1` mirror —
  `diceSave`/`submitDice` ~line 990 show the pattern); `js/admin.js` `questSection`
  (🎲 chip ~line 242); `js/config.js` `DICE_CHAPTERS` (~line 358) — the switch
  pattern; `sw.js` `CACHE = "mhq-v64"`.
- Functions chapter id is `"func"`, icon 📈, `signature` colour on the chapter object.
- XP economy `js/config.js` `XP = { perCorrect 10, firstTryBonus 5, streakCap 3 }`.
- Both apps load the SAME Google Fonts (Space Grotesk / Sora / JetBrains Mono) — no
  font work needed.

---

## The decisions (foreman, tonight — build exactly this)

**D1. Isolation = Shadow DOM.** 60 class names collide between the two apps (`.view
.card .opt .btn .qn .muted .toast .fg-* .keypad …` — measured). The play screen
creates `hostEl.attachShadow({ mode: "open" })`, appends `<link rel="stylesheet"
href="js/funfun/styles.css">` + a tiny `<style>` with the host overrides below + a
`<div>` that is the `rootEl` handed to `mountFunFunctions`. All of Fun Functions'
DOM queries are root-scoped (`ui.js` `setRoot`), toasts append to the root, every
listener sits inside the root — verified by the foreman, so no graph-quest change is
needed. Host overrides inside the shadow:
```css
.ff-root .view { min-height: 0; padding-bottom: 28px; }   /* seam fact (a) */
```
Pass `onScrollTop: () => window.scrollTo(0, 0)` (seam fact (c)).

**D2. XP = the static-round economy, recomputed server-side from `answered`.**
`mhq_submit_funfun` maps each record → boolean: `outcome in ("full","hinted","half")
→ true`, else false; feeds that array to the existing `_mhq_dice_xp()`; if the quest
was ALREADY `done` before this play, pays 25% (same as `mhq_submit_quest`'s
already-passed rule); caps at 1000. Score server-side: full/hinted = 1, half = 0.5,
else 0; `passed = score/total >= 0.7` (the standalone's PASS). `done = done or
passed`. Gold: flat 10 per completed quest. The client's `res.xp` and `res.score`
are NEVER used for payment (same "never names an amount" rule as the dice).

**D3. No rewrite of `mhq_get_state` or `mhq_admin_data`** (copy-forward danger — see
migration-dice.sql's header). Fun Functions gets its own small RPCs:
- `mhq_funfun_state(u, p)` → `{ ok, xp, quests: { [questId]: {best,total,plays,done} },
  met: { [questId]: { [skillId]: true } } }` — exactly the `profile()` shape. `xp` =
  the student's lifetime xp.
- `mhq_funfun_met(u, p, quest_id, skill_id)` → same payload, after folding the skill
  into `met_kinds` (only qE calls it).
- `mhq_submit_funfun(u, p, quest_id, answered jsonb)` → `{ ok, xpAwarded, goldAwarded,
  correct, total, passed, alreadyDone, xp, gold, level, levelUp, levelInfo, best,
  plays }` — then the client calls `app.refresh()` like finishDice does.
- `mhq_admin_funfun(p_admin_password)` → `{ ok, plays: { [questId]: classTotalPlays } }`
  (minimal dashboard, her call #3).
- Validation in `mhq_submit_funfun`: `quest_id` must be in the 15 known ids (hard-code
  the list in SQL as a check — the ids are in `graph-quest/js/quests/index.js`
  QUESTS order: read them from the files, don't guess); `answered` must be a
  non-empty jsonb array of ≤ 40 objects; reject otherwise with `{ok:false,
  error:"bad_round"}`.

**D4. Table** `public.funfun_progress(student_id uuid fk students on delete cascade,
quest_id text, best numeric not null default 0 /* 0..1 fraction */, total int not null
default 0, plays int not null default 0, done boolean not null default false, met_kinds
jsonb not null default '{}' /* {skillId:true} */, created_at, updated_at, primary key
(student_id, quest_id))`. RLS on, no policies, `revoke all ... from anon,
authenticated`. Index on student_id.

**D5. Switch** `export const FUNFUN_ENABLED = true;` in `js/config.js` next to
`DICE_CHAPTERS`, with the same comment style. The strip renders only when it's true
AND the chapter is `func`. Seeded-closed equivalent: the migration is safe to run
before the client ships because nothing calls the RPCs until the client does.

**D6. Language + content flags for the mount:** `lang: "en"`, `semicircles: false`
(IEB Grade 11). Never show the AF/EN toggle.

**D7. Tiles** — a strip in `renderChapter` for `func`, placed AFTER the 🎲 card and
BEFORE the static quest cards (same `quest-grid`, or its own titled block — your
call, keep it phone-first at 375px). Header: `📈 Fun Functions`. 15 tiles in QUESTS
order; each shows number, `L(q.title)` in EN, 🔒 when `!questUnlocked(profile, i)`,
✓ when done, and best as a percent when plays>0. Locked tiles are disabled; tapping
an open tile → `app.go("funfunPlay", { chapter, questId })`. The strip, like the
dice, is NOT gated by the teacher's quest open/close switches (her "a kid practising
maths" ruling) — but note `renderChapter` returns early when NO static quest in the
chapter is open; keep that behaviour (the strip lives below that return, like the
🎲 card).

**D8. Play screen** `js/funfun-play.js` + route `funfunPlay` in `app.js` (NO chrome,
like `play`): a slim top bar with `‹ Back` (calls `destroy()` then goes to the
chapter) and the quest title, then the shadow-host element. Host object per the
mount contract; `saveResult` calls `api.funfunSubmit(...)` and returns the fresh
profile; `onFinished(res)` → `app.refresh()` → `app.go("results", { funfun: true,
… })`. Always `destroy()` the mount when leaving the screen (back, finish, logout) —
a second mount while one is alive must never happen.

**D9. Results screen** — a `renderFunfunResults` modelled on `renderDiceResults`
(same card, emoji 📈, title `L(q.title)` + "complete", `${pct}%`, `correct / total`,
Reward line, level-up notice, offline warning). Buttons: `Play again` (re-enters
funfunPlay for the same quest), `Back to quests`. No pass/fail language on screen
other than the ✓ the tile will show.

**D10. Dashboard** — in `admin.js` `questSection`, the Functions chapter row gets
`📈 N` (class total plays across all 15 quests) next to the 🎲 chip, via
`api.adminFunfun(pw)` called alongside the existing admin load. Nothing per student.

**D11. `?local=1` mirror** — `js/local-backend.js` gets `funfunState / funfunMet /
funfunSubmit / adminFunfun` mirroring the SQL exactly (same XP math via the existing
dice accumulator, same 25% rule, same 0.7 pass). Store under one new LS key
`mhq.funfun` shaped `{ [studentId]: { [questId]: row } }`.

**D12. The sync script** `graph-quest/tools/sync-to-blipwork.py`:
- Copies `js/mount.js js/play.js js/ui.js js/i18n.js js/backend.js js/check.js
  js/funclib.js js/screens.js js/supabase-config.js js/engine/*.js js/quests/*.js
  mount-driver.js` → `maths-homework-quest/js/funfun/` (same relative layout, so the
  relative imports keep working untouched), and `css/styles.css` →
  `maths-homework-quest/js/funfun/styles.css`. NOT standalone.css, NOT app.js.
- Wipes `js/funfun/` first (it is generated output — header file
  `js/funfun/GENERATED.md` says "never hand-edit; run tools/sync-to-blipwork.py").
- Writes `js/funfun/manifest.json` (list of copied files + source commit hash).
- Python 3, stdlib only, idempotent, prints what it copied. Run it as the first
  step of Session 1 so the rest builds on real files.

**D13. Service worker:** bump `CACHE` to `mhq-v65`. Add `./js/funfun/styles.css` to
SHELL (JS is network-first via the import graph, like every other module).

**D14. Wording**: English, Blipwork voice. "Tap" for taps. No "Well done!"-style
closers anywhere on the results card.

---

## SESSION 1 — plumbing (Opus)

Deliver, in this order:
1. `graph-quest/tools/sync-to-blipwork.py` (D12) — run it; confirm
   `maths-homework-quest/js/funfun/mount.js` exists and `mount-driver.js` is there.
2. `supabase/migration-funfun.sql` (D2, D3, D4) — header in the house style
   ("WRITTEN, NOT RUN"), sanity-check queries at the bottom. Include the 15 quest ids
   read from the synced `js/funfun/quests/index.js`.
3. `js/supabase.js` + `js/api.js` wrappers: `funfunState, funfunMet, funfunSubmit,
   adminFunfun` (doc-comment in api.js's header block like the dice entries).
4. `js/local-backend.js` mirror (D11).
5. `js/config.js` `FUNFUN_ENABLED` (D5).
6. A node/mjs or html harness `verify-funfun-backend.html` (match the existing
   verify-*.html style — open `verify-dice.html` for the shape) that, against the
   LOCAL backend, walks: state for a fresh learner = 15 empty quests; submit a full
   q1 `answered` (6 × "full") → xpAwarded equals `_mhq_dice_xp`-style math (check the
   number by hand in a comment), passed true, done true; submit again → 25%;
   submit a "half/wrong" mix → correct score + not passed; bad quest id → bad_round;
   met → state.met shows it; admin → plays total. Every check prints ✓/✗ with a
   final count, like the other harnesses.
7. Run `verify-store.html`-style byte-stability isn't needed yet (no live data touched
   in this session).

Verify before reporting: the harness is green (paste the count), `node --check` on
every JS file you touched, `python -m py_compile` on the sync script. End your report
with the list of files changed/created, and anything in the SQL you were unsure of.

## SESSION 2 — the screens (Opus, after the foreman's review of Session 1)

1. `js/funfun-play.js` (D1, D6, D8) + `app.js` route.
2. `renderChapter` strip (D7) + `renderFunfunResults` (D9) + CSS for the tiles in
   `css/styles.css` (tile = small `.quest`-like card; keep it inside Blipwork's
   existing look — chapter signature colour, `--qc` accent per tile from the quest's
   `accent`).
3. `admin.js` chip (D10).
4. `sw.js` bump (D13).
5. `verify-funfun.html`: imports the synced `mount-driver.js`, mounts each of the 15
   quests INSIDE a shadow root exactly the way funfun-play.js does (import the same
   helper — don't duplicate the shadow setup), plays one round each headlessly,
   asserts: `answered.length === total`, no element with a Fun Functions class exists
   in the light DOM after destroy, the shadow root's `.ff-root .view` computed
   `min-height` is `0px`, and `document.fonts` has Space Grotesk loaded. Green count at
   the end.
6. Phone-width proof: with `serve.py` running (port per `.claude/launch.json`,
   `maths-quest`), load `?local=1`, log in as the local test learner, open Functions,
   tap tile 1, play 2 items, walk out with ‹, re-enter, finish a quest, land on the
   results card, then check the tile shows ✓ and a percent. Read the whole screen at
   375px as a learner would at each step — report what you saw, not what should be.

Verify before reporting: `verify-funfun.html` green, every existing verify page you
could have disturbed still green (`verify-dice.html`, `verify-func.html`,
`verify-store.html`), `node --check` on touched files. End with the file list.

---

## House rules that bite here
- Double-submit: disable the button/flag `spent` BEFORE any `await` (memory
  [[double-submit-disable-before-await]]) — the mount calls `saveResult` once, but
  your `Play again` / `Back` buttons still need it.
- New functions: explicit `grant execute` to anon + authenticated; `search_path`
  pinned; RLS on with no policies on the table.
- JS globals named `top`/`name`/`length` are forbidden.
- Never serialise question content into the DB — only ids/outcomes.
- `git commit`/`push`/migrations/deletes: not yours.
