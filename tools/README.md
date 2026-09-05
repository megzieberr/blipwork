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
  their pass lines.
- `shoot_welcome.py` — the gentle-return proof shot (fix day, 2026-09-05): stages a 14-day
  absence with `__BLIP_DEV__.lapse()`, reloads so the app's own state call is the one that heals
  Blip, and photographs the room with its welcome line to `_out/build2-hub-375.png`. Prints the
  before/after state either side of the reload, so the picture is not the only evidence.

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
