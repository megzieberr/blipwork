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
- `shoot_round.py <questId>…` — real play rounds, three questions each, hint open, then answered.
- `sweep.py [N] [questIdPrefix…]` — the whole-app formatting sweep: N generated questions per
  skill for every quest + every concept card, rendered through the real pipeline, checked for
  split expressions (A), unprotected maths runs (B), slash fractions (C), page overflow (D).
  The standing bar: A = 0, real C = 0, D = 0.
- `harness_run.py verify-foo verify-bar …` — runs the browser harness pages headless and prints
  their pass lines.
