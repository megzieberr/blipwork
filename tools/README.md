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
