# Fix day plan — follow-up to the 2026-09-05 read-only audit

Written by the Fable audit session on 2026-09-05 from `AUDIT-2026-09-05.md` and Megan's
rulings that day. **Nothing here is built yet.** Her scope-yes covers every build below;
the dispatch (who runs the workers), the live migration and the ship each still need her
word on the day (`/foreman` step 2 and step 6). Fable designs and reviews; Opus workers
type. One worker at a time, never a fan-out.

## Ground rules for every worker (paste into every brief)

- Project: `C:/Users/megzi/Desktop/Claude Code Projects/maths-homework-quest`. Static ES
  modules, no build step. Read `CLAUDE.md`, then the top of `PROJECT-STATUS.md`, then the
  ONE build section of this file you were given.
- Before redefining ANY live SQL function, diff against `pg_get_functiondef` of LIVE
  (standing ruling 2026-08-26). `schema.sql` is re-synced from live in the same commit.
- `js/funfun/` is GENERATED from graph-quest: never hand-edit; change graph-quest and run
  its `tools/sync-to-blipwork.py`.
- Learner-visible text: "SHIFT tan", never written inverse notation; no generic well-done
  closers; real minus via the existing helpers; decoys filtered by value; Afrikaans strings
  follow the wording rules in `js/exam/_schema.js`'s header.
- Verify for real: the chapter's `verify-*.html`, the node harnesses, `tools/sweep.py 2`,
  and a play-through. `/verify-done` standard: fresh proof, phone width, never say-so.
- Commit LOCALLY after each reviewed build with a message that says WHY. No push, no
  migration, no service-worker bump inside a worker session: the ship is Fable's, on her
  "ship it". One `sw.js` bump for the day (v91) at ship time.
- Her three open cleanup calls default to LEAVE: `art-source/` stays tracked, the
  "Hayley's way" wording stays, the root planning documents stay where they are.

## Build 0 — no code: the exam-season lever (hers, 💻 1 min, whenever)

The admin page's **Term** toggle. OFF stops the sickness clock for every Blip at once
(`_mhq_health` counts zero unfed days while the term is off, so every Blip reads as well);
ON restarts the clock from that day. On 2026-09-05, 11 of 20 Blips were sick and 8 had the
shop locked. Her call; nothing to build.

## Build 1 — back end seal + cleanup (one Opus worker, ≈250k tokens, no learner-facing code)

**A. Migration file `supabase/migration-audit-2026-09-05.sql`** (additive; applied at ship
by Fable through the MCP with her word, or pasted by her).

1. `revoke all on table public.shop_items from anon, authenticated;` — `schema.sql:319`
   already says this; a later migration re-created the table and the default grants came
   back. Add a CLAUDE.md gotcha: a migration that drops or recreates a table must re-run
   that table's revoke.
2. Seal the ten helpers. Exact signatures:
   `_mhq_admin_ok(text)`, `_mhq_auth(text,text)`, `_mhq_ensure_blip(uuid)`,
   `_mhq_health(date,integer)`, `_mhq_is_qual_day()`, `_mhq_tray(jsonb,date)`,
   `_mhq_dice_xp(jsonb)`, `_mhq_growth(integer)`, `_mhq_level(integer)`, `exam_name_key(text)`.
   Circle Quest shape (2026-08-15): `revoke execute ... from public, anon, authenticated;`
   then `grant execute ... to service_role;` explicitly on all ten. ⚠️ `send-push` calls
   `_mhq_is_qual_day` and `_mhq_health` with the service role; the explicit grant is what
   keeps the 07:00 and 17:00 pushes alive. Target ACL = `postgres + service_role`, same as
   `mhq_auth_ok` and `mhq_admin_ok_rpc` today. The sept 2024 check-in site calls only the
   `exam_*` RPCs, never `exam_name_key`, so sealing it is safe.
3. `mhq_submit_quest` clamp: `p_score` to `[0, 1]`; `p_xp` cap from 1000 down to 500 (the
   largest honest round on record is 465). **Gold only on a pass = her call, default
   unchanged** (today every submit pays 10 gold).
4. `schema.sql` mirror-back FROM LIVE: replace the three drifted bodies
   (`mhq_admin_data`, `mhq_equip`, `mhq_exam_open_part`) and add the seven that only exist
   in migration files (`_mhq_roll_loot`, `mhq_admin_clear_assignment`,
   `mhq_admin_set_announce`, `mhq_admin_set_assignment`, `mhq_open_box`,
   `mhq_push_subscribe`, `mhq_push_unsubscribe`). Add a comment block listing the thirteen
   server-only functions that belong elsewhere (twelve `exam_*` for sept2024-check, and
   `keepalive` for the pinger) so the next audit does not hunt for them.
5. Proof, in a rolled-back transaction and in the report:
   `has_function_privilege('anon', 'public._mhq_admin_ok(text)', 'execute')` = false;
   the same for `service_role` on `_mhq_health` and `_mhq_is_qual_day` = true; the anon
   REST probe on `shop_items` returns 42501 instead of `[]`. Then run `/migration-check`.

**B. Data tidy** (SQL lines in the same file, each one listed plainly for her):
delete the feedback row dated 2026-08-24 whose body is `Test`; set `read_at` on the
anonymous 2026-09-04 10:12 UTC note (context `funfun:qK`, shipped in v90); deactivate the
t1 assignment assigned 2026-09-02 (past due). She may prefer to do the last two herself
in admin (🌐 1 min each); the file then skips them.

**C. Edge function:** delete `paper-seed` (neutralised 2026-08-24, answers 410). The MCP
cannot delete a function: dashboard, or `supabase functions delete paper-seed`.

**D. Repo cleanup:** delete `tools/shots`, `tools/shots-walk`, `tools/diags`,
`tools/diags-walk`, `tools/_out` (all git-ignored, regenerable, ≈1.2 GB); then `git gc`
(3 155 loose objects, never packed).

**E. Docs pass, no behaviour change:** `README.md` (learners no longer sign up: roster
name-picker since 2026-08-21; chapters: twelve in the hub plus two exam-only), `CLAUDE.md`
(the self-signup sentences near lines 47, 51, 75, 116, the decision-log entry near 136 and
gotcha 6 near 190; "All 11 chapters"; add the recreate-table gotcha), `js/admin.js` learners
blurb near line 738, `index.html` meta description ("Statistics, and more to come").

**F. Verification:** all harnesses unchanged and green; `git status` shows only the
intended files.

## Build 2 — gentle return for lapsed learners (one Opus worker, ≈150k)

Her ruling 2026-09-05: "a good idea". Rule: a learner who has been away **7 or more
calendar days** comes back to a WELL Blip and one warm line.

- In `mhq_get_state`: if `last_active_at` is null or older than 7 days AND the health
  stage is 2 or more, set `last_fed_day = current_date`, `care_streak = 0`, and return
  `welcomeBack: true`. Do NOT touch `last_cookie_day`, so the daily cookie is still there
  to feed. Stage-3 shop and gallery locks stay as they are (**her tick to remove them**).
- The hub shows one line when `welcomeBack` is true. Fable draft, her wording wins:
  "Blip missed you. He's feeling better today, and a cookie would make his day."
- Mirror the rule in `js/local-backend.js` so `?local=1` behaves the same.
- Migration + `schema.sql` re-sync in the same commit (diff against live first).
- Proof in a rolled-back transaction: a student with `last_active_at` ten days ago and
  stage 3 → after one `mhq_get_state` the stage is 0 and `welcomeBack` is true; a second
  call the same day returns `welcomeBack` false and changes nothing.

## Build 3 — exponential card gets its p + the steepness reminder (one Opus worker, ≈150k, EN + AF, never Sonnet)

**Exponential card.** `js/concepts.js:597` (functions overview line) and `:651` (the
`exponentialGraph` card title and body) still teach `y = a·bˣ + q`. The app already uses
the Grade 11 form everywhere else. Convention DEFAULT `y = a·b^(x − p) + q`, the form
the sketch cards call "her p14" and Fun Functions uses (**her tick before build**); bring
`js/exam/func-siblings-find-equation.js:264`, which writes `(x + p)`, in line. Card body:
asymptote `y = q`; p slides the graph sideways the opposite way, phrased like the
hyperbola card at `:639` and the trig-graph line at `:821`; keep the fraction-base
example; add one sentence: "In Grade 10 the exponential was y = a·bˣ + q. Grade 11 adds
the p." A learner's 2026-09-04 note showed exactly that gap. `fn3`'s hint at
`questfn3-hyperbola-exp.js:107` may stay: it is true for the p = 0 case it describes.

**Steepness reminder** (lives in graph-quest, then sync): one sentence beside the
steeper-or-flatter question in `q1b-discover2.js` (near line 169) and in `qG-gradient.js`
`gradSteeper`'s hint. Fable draft, EN: "Steepness is how sharply the line climbs or falls,
not which way it goes." AF: "Steilheid is hoe skerp die lyn klim of daal, nie in watter
rigting nie." Edit in graph-quest, run its harness, commit there, then
`graph-quest/tools/sync-to-blipwork.py`, then `verify-funfun.html` (216/216) and
`verify-wrap.mjs` here.

**Verification:** `tools/sweep.py 2` (A = 0, D = 0), `verify-func.html`, the card read at
375 px by eye.

## Build 4 — the Blip's outline follows its body colour (one Opus worker, ≈200k)

Her rulings 2026-09-05: **automatic outline, eyes follow.** Learner request: after a
colour change the outline stays navy.

- `js/companion/renderer.js` colour system: `getBodySrc` / `buildTintedDataUrl` recolour
  the bright pixels (target hue and saturation, each pixel's own brightness) and leave the
  dark band below `darkLo` untouched, with a smoothstep blend between. New: the dark band
  takes the hue and saturation of an OUTLINE target derived from the body target. Derive
  the ratio from the reference art itself: outline `#0062ac` over body `#62ceff`; apply the
  same hue, the same saturation boost and the same brightness ratio to every preset. Tune
  by eye, Fable looks. `blue` stays `null`, so the original art is untouched byte for byte.
  Sick sheets stay unrecoloured (`ANIM_RECOLOURS` false) by design.
- Accessories: the `OUTLINE` constant is used 73 times for SVG strokes. Replace stroke
  uses with `var(--blip-outline, #0062ac)` and set `--blip-outline` at `renderer.js:1690`
  beside `--blip-fill`, from the same derivation. Tripo PNG items go through
  `tintedImageSrc` with the same dark-band rule so their strokes follow too.
  `health-fx.js`'s `OUTLINE_HEX` stays navy: sick overlays draw on unrecoloured sheets.
- Cache keys already include the colour id. Nothing in SQL or the local backend changes.
- Verification: `companion-test.html`, `tools/preview_accessory.py`, `tools/preview_room.py`:
  render all eleven colours × base, `jumping-1`, one hat, one pair of glasses, ears. LOOK at
  every one. Blue's data URL must be identical before and after.

## Build 5 — sprites to WebP (one Opus worker, ≈200k)

- Inventory: `assets/companion/` ≈ 137 tracked files, 19.6 MB (anim 40 frames 11 MB,
  food 47, items, furniture, trinkets, base, room shells). Pillow on her laptop writes
  WebP.
- Rule: any image that passes through a canvas recolour or tint (the base, the recoloured
  anim sheets, Tripo items) → **lossless** WebP, because lossy noise would speckle the
  `darkLo`/`darkHi` thresholds. Decorative-only images (food, furniture, trinkets, room
  shells, the sick sheets) → lossy at quality 90, checked by eye. Report per-file bytes
  before and after; the honest expectation is 40 to 65 % smaller, not a promise.
- Code: every companion `.png` reference becomes `.webp` (`renderer.js` 59,
  `furniture.js` 59, `trinkets.js` 7, `health-fx.js` 5, `food.js` 1, `blip.js` 2,
  `admin.js` 3, `css/styles.css` 1). App icons, apple-touch icon and favicon stay PNG.
  `sw.js` caches images by URL: new URLs fetch fresh, the old cached PNGs go with the
  CACHE bump.
- Delete the converted PNGs from the working tree (history keeps them; `art-source/` is
  untouched).
- Verification: the recolour output per colour before vs after (max channel delta ≤ 2 on
  the flat body, 0 on the outline), `preview_room.py`, and the phone.

## Build 6 — lazy-load + service worker (one Opus worker, the big one, ≈500–700k)

**Facts.** 307 files / 5.0 MB are reachable from `js/app.js` before login: `js/exam`
2.18 MB, `js/quests` 1.02 MB, root files 0.78 MB, `js/funfun` 0.65 MB. `screens.js:3`,
`:6` and `:24` import the three registries statically; `api.js:136` imports the local
demo backend unconditionally; `dice-pools.js` imports all eight dice pools. Sync
`questDef` call sites: `screens.js:404` (chapter map: use config's `built` flag), `:598`
(reads the `xpOnce` flag), `:628` (replay passes the def to play), `assignment.js:132`
(homework card on the hub), `exam-play.js:89` (lost-question fallback). Exam registry:
`screens.js:529/548/569` and `exam-play.js:56`. Fun Functions list: `screens.js:445/656`.

**Loaders.**
- `js/quests/load.js`: quest id → `() => import("./questXX.js")`, plus a tiny sync map
  of ids to `built` for anything that must stay synchronous. Chapter open loads that
  chapter's seven.
- `js/exam/load.js`: chapter id → `import("./cards-<chapter>.js")` plus skills. Loaded
  when the 📝 tab or an exam chapter opens.
- Fun Functions boundary in `funfun-play.js` and `screens.js` only: `import
  ("./funfun/quests/index.js")` when the Functions chapter opens. Nothing under
  `js/funfun/` is edited.
- Dice pools lazy per chapter, same pattern as the quests.
- `api.js`: choose the backend at boot; import `local-backend.js` only for `?local=1` /
  `mhq.forceLocal`.
- Keep `js/quests/index.js` and `js/exam/index.js` exactly as they are: 19 verify pages,
  `tools/sweep.py`, the shoot tools and `verify-exam*.mjs` import them synchronously.
- Every lazy load is wrapped: failure shows the existing "can't reach the server" message,
  never a blank screen.

**Service worker.** App code becomes cache-first inside the versioned cache with a stored
timestamp and a 7-day maximum age; navigations, `index.html` and `js/app.js` stay
network-first; activate still evicts old caches. The CACHE bump on every ship becomes
load-bearing for code as it already is for images. Bump to v91 at ship, not in the worker.

**Verification.** A small Playwright script in `tools/` that counts requests and bytes on
four screens (login, hub, one chapter, the exam tab), kept in the repo; all `verify-*.html`,
`tools/sweep.py 2` and the node harnesses unchanged and green; a phone play-through of a
quest round, a dice round, a Fun Functions round and an exam card; an offline test (a
played chapter works, an unplayed one shows the message); a deploy test with the bump.
Expected: login ≈ 15 files, hub ≈ 40, a chapter ≈ 55, the exam tab +80 only when opened.

## Order, cost, ship

Order: 1 → 2 → 3 → 4 → 5 → 6. Fable reviews each build with its own eyes before the next
starts. Roughly 1.5 M agent tokens across three or four worker sessions. One ship at the
end (sw v91) or a ship per day, each on her "ship it"; migrations from Builds 1 and 2 go
live at that ship with her word.

**Her ticks before dispatch:** (a) gold only on a pass, default no; (b) exponential
convention `(x − p)`, default yes; (c) remove the stage-3 shop and gallery lock, default
keep; (d) the three cleanup calls, default leave; (e) who dispatches, per `/foreman`
step 2.

## Her answers, 2026-09-05 ("defaults for a-e, kay")
(a) gold: unchanged, every submit pays · (b) exponential written (x − p) · (c) stage-3
shop + gallery lock STAYS on gentle return · (d) all three cleanup calls LEAVE ·
(e) Fable dispatches, one Opus worker at a time, reviews each before the next.
Build 0 done by her (Term toggle OFF, live-verified 2026-09-05). Look-back sheet
phone-verified by her the same day.
Steepness reminder AF wording, hers (2026-09-05): "Steilheid is hoe drasties 'n lyn styg
of daal, maak nie saak in watter rigting nie". EN stays as drafted. Welcome-back line
stays as drafted (no veto).
Ship ruling (hers, 2026-09-05): "ship after 5, keep both": Builds 1 to 5 ship as v91;
Build 6 in a fresh session as v92; lemon outline + backwards cap stay as Build 4 made them.

## Build 6 dispatch, 2026-09-06: two Opus workers in sequence (her word: "you run them, two workers, /go")

Same ground rules as above. Worker 1 = lazy-loading + the request counter. Worker 2 =
the service-worker change + the offline test, dispatched only after Fable has reviewed
worker 1. The sw CACHE bump (v91 to v92) stays with Fable at ship time; neither worker
touches it. The plan's line "bump to v91 at ship" reads v92 for this build.

### Worker 1 brief: lazy-loading + tools/count_requests.py (about 350k tokens)

Facts re-verified 2026-09-06 (line numbers may drift a few lines, re-check them):
`js/screens.js:3` imports `questDef` from `./quests/index.js`, `:4` `dicePool` from
`./quests/dice-pools.js`, `:6` `examQuestionsForTopic` + `examFirstCardForSkill` from
`./exam/index.js`, `:24-26` `FF_QUESTS` / `ffUnlocked` / `ffL` from `./funfun/...`.
`js/api.js:136` imports `LocalBackend` unconditionally; `useLocal` is decided at `:157`.
`js/quests/dice-pools.js` imports all eight pools statically. `js/funfun-play.js:34-36`
imports `./funfun/mount.js`, `./funfun/quests/index.js`, `./funfun/i18n.js`.
Sync call sites of `questDef`: `screens.js:404` (chapter map), `:598` (reads `xpOnce` on
the result screen), `:628` (replay passes the def to play), `assignment.js:132` (homework
card on the hub), `exam-play.js:89` (lost-question fallback). Exam registry call sites:
`screens.js:529/548/569`, `exam-play.js:203`. Fun Functions list: `screens.js:445/656`.

Deliverables:
1. `js/quests/load.js`: `loadQuest(id)` returns a cached promise of that quest's def via
   a dynamic `import()` of its module (the map is generated from `index.js`'s import
   list, id to module path to export name); `loadChapterQuests(chapterId)` loads that
   chapter's set. A small sync `QUEST_META` map (id to the flags the five sync call sites
   actually read, e.g. `built`, `xpOnce`) so the chapter map and the result screen render
   without importing any quest module. If a sync site reads more than flags, make that
   site async rather than copying content into the map.
2. A drift check: a node script or verify page that imports `js/quests/index.js` and
   `js/quests/load.js` and asserts every registered id resolves through the loader to
   the same def object (and vice versa). Wire it into the existing verify run.
3. `js/exam/load.js`: `loadExamChapter(chapterId)` dynamically imports that chapter's
   `cards-<chapter>.js` (plus skills if needed) and returns async equivalents of the two
   registry helpers. `js/exam/index.js` keeps its exported names, signatures and
   synchronous behaviour exactly (19 verify pages, `tools/sweep.py`, the shoot tools and
   `verify-exam*.mjs` import it); factoring a pure helper out so both files share it is
   fine if every verify page still passes. Same rule for `js/quests/index.js` and
   `js/quests/dice-pools.js`.
4. Fun Functions boundary: `screens.js` and `funfun-play.js` import the `./funfun/...`
   modules dynamically when the Functions chapter opens or a Fun Functions round starts.
   Nothing under `js/funfun/` is edited (generated from graph-quest).
5. Dice pools lazy per chapter: a `loadDicePool(chapterId)` that imports one pool; the
   app uses it, the sync export stays for the verify tooling.
6. `api.js`: import `./local-backend.js` only when `useLocal` is true (top-level await
   is fine, this is a static ES-module site); `import { api }` consumers stay unchanged;
   `?local=1` and `mhq.forceLocal` keep working (the whole verify toolchain relies on
   them).
7. Every lazy load is wrapped: on failure the existing "can't reach the server" message
   shows (find it, reuse it, do not write a new one) and the app stays usable (back to
   the hub). Never a blank screen.
8. `tools/count_requests.py` (Python Playwright, same shape as `tools/harness_run.py`):
   against `http://localhost:5191/?local=1` at 375 px, four screens in one session:
   login, hub after a local login, one chapter (Statistics), the Exam Focus tab. Prints a
   table of request count and bytes per screen (delta per screen and cumulative) and
   writes `tools/_out/requests.json` (git-ignored). Run it BEFORE any change for the
   baseline and AFTER; both tables go in the report. The plan expects roughly login 15,
   hub 40, a chapter 55, the exam tab +80 only when opened; report the real numbers.
9. Failure-path test in Playwright: block one lazy module URL with `route()`, open that
   chapter, assert the message appears and the hub still works.
10. Verify for real, all green before the commit: every `verify-*.html` through
    `tools/harness_run.py` (see `tools/README.md` for how they are run), `python
    tools/sweep.py 2`, `node verify-exam-modules.mjs`, `node verify-exam-fractions.mjs`,
    the new drift check, and a Playwright play-through at 375 px with `?local=1` of one
    quest round, one dice round, one Fun Functions round and one exam card, asserting no
    page errors and no blank screens. Start `python -m http.server 5191` from the project
    root yourself (check the port is free first). Headless Playwright only; never the
    desktop app's Browser pane.
11. Docs: a short "How code loads" block in `CLAUDE.md` (the lazy boundaries, the drift
    check, "a new quest goes in index.js AND load.js, then run the drift check"). No
    status-file edits (Fable's).
12. One LOCAL commit with a message that says WHY, adding the named files (never
    `git add -A`). No push. No migration. No `sw.js` change. No CACHE bump.
13. Report back with: files changed with line refs, the before/after request tables, the
    verify results with their counts, the failure-path result, anything uncertain, and
    every place where this brief's facts did not match the code.

### Worker 2 brief: service worker cache-first for code + offline test (about 250k tokens)

Dispatched only after Fable has reviewed worker 1's commit. Read `sw.js` (115 lines) in
full first; its header comment explains why app code is network-first today (the "old
version still shows" problem). This build changes that deliberately, and the CACHE bump
on every ship becomes load-bearing for code as it already is for images.

Deliverables:
1. `sw.js`: app code (`.js`, `.css`) becomes cache-first inside the versioned CACHE with a
   stored timestamp (an `x-sw-cached-at` header on the stored clone, or a companion
   metadata cache) and a 7-day maximum age; an entry older than 7 days is fetched
   network-first with the stale copy as the offline fallback. Navigations, `index.html`,
   `admin.html` and `js/app.js` stay network-first. Activate still evicts every cache
   whose name is not CACHE. Cross-origin and images unchanged. The header comment is
   rewritten to describe the new strategy and the load-bearing bump. CACHE stays
   `mhq-v91` in the commit; the bump to v92 is Fable's at ship.
2. `tools/sw_check.py`: prints OK when no tracked file under `js/` or `css/` has changed
   since the commit that last changed the CACHE line in `sw.js`, otherwise lists the
   changed files and exits 1. This is the ship-time reminder to bump.
3. Offline test in Playwright (Chromium, service workers allowed): load the hub and play
   one chapter online with the worker active and registered; then set the context
   offline: the played chapter still works, an unplayed chapter shows the existing
   "can't reach the server" message, never a blank screen.
4. Eviction test locally: temporarily set CACHE to a test value, reload, assert via
   `page.evaluate(caches.keys())` that the old cache is gone and code is refetched, then
   `git checkout sw.js` before committing (no bump in the commit).
5. Re-run `tools/count_requests.py` on a WARM second load with the worker active and
   report the numbers next to worker 1's tables.
6. Same verify run as worker 1 (all `verify-*.html`, `sweep.py 2`, the two node
   harnesses, the drift check), all green.
7. Docs: `CLAUDE.md` gotcha, one paragraph: every ship bumps CACHE or learners keep old
   code for up to 7 days; `tools/sw_check.py` must print OK before the push.
8. One LOCAL commit, message says WHY. No push. No migration. No CACHE bump.
9. Report back with files changed, the offline and eviction results, the warm-load
   numbers, and anything uncertain.
