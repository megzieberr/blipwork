# tools — the "look at it" harnesses (Playwright, Python)

All run against the local http.server on :5191 (`.claude/.claude/launch.json` → `maths-quest`),
at 375 × 812, in `?local=1` mode with the demo learner. They clear the service worker and caches
first. Output goes to `tools/_out/` (git-ignored).

- `shoot.py <skillId> [cardIdPrefix…]` — Exam Focus cards: full-page PNG of every card plus a
  crop of every sketch state (question side, each reveal). Read the crops.
- `shoot_round.py <questId>…` — real play rounds, three questions each, hint open, then answered.
- `sweep.py [N] [questIdPrefix…]` — the whole-app formatting sweep: N generated questions per
  skill for every quest + every concept card, rendered through the real pipeline, checked for
  split expressions (A), unprotected maths runs (B), slash fractions (C), page overflow (D).
  The standing bar: A = 0, real C = 0, D = 0.
- `harness_run.py verify-foo verify-bar …` — runs the browser harness pages headless and prints
  their pass lines.
