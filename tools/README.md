# tools — the "look at it" harnesses (Playwright, Python)

All run against the local http.server on :5191 (`.claude/.claude/launch.json` → `maths-quest`;
start it with `python -m http.server 5191` from the repo root), at 375 × 812, in `?local=1` mode
with the demo learner. They clear the service worker and caches first. Most write to `tools/_out/`
(git-ignored); `shoot.py` writes to `tools/shots/` and `tools/diags/`.

- `shoot.py <chapterId> <skillId> [cardIdSubstring]` — Exam Focus cards: full-page PNG of every
  card in one skill tile plus a crop of every sketch state (question side, each reveal). Read the
  crops. The CHAPTER is an argument (2026-08-23; it used to be hard-coded to `func`) and is
  resolved through `examChapterById`, so the exam-only chapters work too:

      python shoot.py func find-equation
      python shoot.py tgraph sketch
      python shoot.py euclid level-4
- `shoot_walk.py <chapterId> <skillId> [cardIdSubstring]` — the same cards' **walk**: taps
  "Walk me through it" and photographs the sketch after every "Next step →", including the last
  click (which flips the part to fully revealed, so that crop is the proof the walk ends on the
  Done path's picture). Added session G3, 2026-08-23, when a memo step gained an optional `hl`
  and the figure gained a third state — `shoot.py` never taps the walk button and so cannot see
  any of them. Writes crops to `tools/diags-walk/`, full pages to `tools/shots-walk/`, and a
  `_manifest-<chapter>-<skill>.json` naming the memo line each crop belongs to. Read the crops.

      python shoot_walk.py euclid bookwork-proofs
      python shoot_walk.py euclid bookwork-proofs bw.q1
- `shoot_round.py <questId>…` — real play rounds, three questions each, hint open, then answered.
- `sweep.py [N] [questIdPrefix…]` — the whole-app formatting sweep: N generated questions per
  skill for every quest + every concept card, rendered through the real pipeline, checked for
  split expressions (A), unprotected maths runs (B), slash fractions (C), page overflow (D).
  The standing bar: A = 0, real C = 0, D = 0.
- `harness_run.py verify-foo verify-bar …` — runs the browser harness pages headless and prints
  their pass lines. ⚠️ On this laptop run it as `PYTHONIOENCODING=utf-8 python tools/harness_run.py
  …`: the Windows console codepage cannot print the ✓ in a pass line, and without that variable
  every page reports a bogus `ERR 'charmap' codec can't encode character '✓'` instead of its
  real result. Nothing is wrong with the page when that happens.
- `shoot_welcome.py` — the gentle-return proof shot (fix day, 2026-09-05): stages a 14-day
  absence with `__BLIP_DEV__.lapse()`, reloads so the app's own state call is the one that heals
  Blip, and photographs the room with its welcome line to `_out/build2-hub-375.png`. Prints the
  before/after state either side of the reload, so the picture is not the only evidence.
- `count_requests.py`: how much does each screen cost to open? Counts requests and transferred
  bytes per screen (login, hub, a chapter, the Exam Focus tab, an exam chapter) in one session at
  375 px against `?local=1`, with the service worker switched off so every number is a real
  network fetch. Prints a delta + cumulative table and writes `_out/requests.json`. Added with the
  lazy-loading build (2026-09-06) as its before/after measure; re-run it after anything that moves
  an import.
- `lazy_playthrough.py`: the lazy-loading regression test (2026-09-06): a quest round, a dice
  round, a Fun Functions round and an exam card all open and are not blank, and a module blocked
  with `route()` shows the app's own "Can't reach the server" line while the chapter and the hub
  keep working. Any page error at all fails the run.
- `sw_check.py`: **the ship-time gate.** Since the service worker serves app code cache-first
  (2026-09-06), the `const CACHE` line in `sw.js` is what makes a deploy land. This prints OK
  only when nothing under `js/` or `css/` has changed since the commit that last touched that
  line, and otherwise lists the files and exits 1, meaning bump `CACHE` before pushing.
  Uncommitted edits count. No browser, no server: it is pure git, so it runs in a second.
- `sw_offline_test.py`: the service-worker regression test (2026-09-06), the only tool here that
  runs with the worker really installed and controlling the page. Part 1 plays a chapter online,
  then `set_offline(True)`: the played chapter still opens a round, an unplayed one shows the
  app's own "Can't reach the server" line with its map still on screen, the hub still works, and
  when the signal returns the retried module lands in the cache under its PLAIN url (never a
  `?retry=` variant). Part 2 temporarily bumps `CACHE` on disk, reloads, and proves the old cache
  is evicted and the code refetched into the new one, then restores `sw.js` in a `finally` block.
- `sw_warm_requests.py`: `count_requests.py`'s other half. The same five screens with the worker
  ON, over three visits (cold, warm, steady state), showing how many requests the worker answers
  itself and how few actually reach the wire. This is the measure of what cache-first bought.

⚠️ **Everything in this folder runs in a clean browser, but YOUR browser is not clean.** If
`http://localhost:5191/` has ever been open in Chrome, the service worker is registered there and
serves `js/` and `css/` from its cache for up to 7 days (CLAUDE.md gotcha 10), so an edit can fail
to show and a `verify-*.html` page opened by hand can grade the old file. Press F12, Application
tab, Service Workers, Unregister, then reload. The tools here are unaffected either way.

## The verify run, in order

    python -m http.server 5191                     # from the repo root, in its own terminal
    PYTHONIOENCODING=utf-8 python tools/harness_run.py <every verify-*.html name>
    PYTHONIOENCODING=utf-8 python tools/sweep.py 2  # bar: A = 0, real C = 0, D = 0
    node verify-exam-modules.mjs
    node verify-exam-fractions.mjs
    node verify-lazy-load.mjs                       # the loader/registry drift check
    PYTHONIOENCODING=utf-8 python tools/lazy_playthrough.py
    PYTHONIOENCODING=utf-8 python tools/sw_offline_test.py
    python tools/sw_check.py                        # LAST, and only at ship: must print OK

`verify-lazy-load.mjs` is the one to remember when CONTENT is added: a new quest, dice pool or
exam chapter has to be registered in its registry AND listed in its loader (`js/quests/load.js`,
`js/exam/load.js`), and this check is what says so out loud when only one of the two was done.

## After any new companion sprite, run `tools/to_webp.py`

The app ships its companion art as **WebP**, not PNG (fix day, 2026-09-05). The sprite
generators (`slice_sprites.py`, `tripo_sheet.py`) still write PNG, so a new sprite arrives in
the wrong format and the app will not find it. One command fixes that:

    python tools/to_webp.py --delete-png

It converts every PNG under `assets/companion/`, prints a bytes-before/bytes-after table, and
then removes the PNGs it converted. Safe to run again: a sprite whose WebP is already up to
date is skipped. Art anywhere else (app icons, the apple-touch icon, the favicon, everything in
`art-source/`) is untouched.

Which sprites are compressed **losslessly** is the one decision in that file, and its header
explains it: any picture the app re-paints in code (the body, the recoloured animation sheets,
the door it tints, the nine accessories whose outline follows the body colour) must be lossless,
because lossy noise would push pixels across the recolour's brightness thresholds and speckle
every stroke. Everything decorative is quality 90. The script re-reads `renderer.js` and
`furniture.js` on each run and warns if a newly recoloured or tinted picture is missing from
that lossless list.
