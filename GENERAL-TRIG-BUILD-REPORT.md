# GENERAL TRIG — build report (unattended foreman day, 2026-08-22)

_(in progress — the foreman rewrites the top paragraph when the run ends)_

## Judgement calls, as they were made

- **Dispatch mode:** the brief itself said the run happens while she teaches, so the
  foreman ran the agents (the foreman skill's once-a-day question was answered in the
  brief). Estimate she saw: 2,5–3,2M.
- **"Resume-safe" `steps`:** static play has no mid-round save at all (only dice rounds
  resume), so the rule became "a re-presented question starts cleanly at step 0" —
  there is nothing to persist. Dice for gtrig is out of scope anyway.
- **XP-once for rounds 1–3** lives in `play.js` (`xpToSubmit`): send `xp: 0` when
  `progress[quest].passed` is already true. Gold stays the server's flat 10 per round —
  changing it needs a migration, which is out of scope.
- **Two plumbing pieces the plan implied but didn't list** went into stage 1 so stage 2
  couldn't improvise them: `reveal` frames (the O-A-H table built in her order; the
  rotating-point frames) and a `bands` option on the trig-graph engine (round 2's
  quadrant colours).
- **Chapter colour:** the plan said gold was free — it isn't (2D Trig and Number
  Patterns use it). The palette cycles; violet follows `eqn`'s blue. Icon 🔄 (🧭 is the
  Euclidean exam chapter, 📐 is 2D Trig).
- **Stage-1 agent's calls (accepted):** `rotate()` turns at ≥ 360 (her p09 `tan 1080`
  needs three turns); angles in [−90°, 0) read as her C-quadrant `−θ` form; `cofunction`
  for tan returns cot (unused); `boundaryCase` is sin/cos only (her D8 names no tan
  case); empty submits on calc/tokenpad steps are ignored, not misses.
- **Stage-1 review fixes (foreman, targeted):** the quadtri θ arc was 20–38 px and swept
  through the triangle and its labels in quadrants II–IV — visible only on the rendered
  sheet, not to `verify()`; now 14–22 px. The origin "O" label moved to the quadrant
  opposite the triangle (it sat on the hypotenuse in III/IV).

## Stage 1 — plumbing (Opus, ~300k tokens) ✅ committed `d6a4b52`
- verify-gtrig.html **337/337** (foreman's own run, port 5213, no SW registered).
- Regression (foreman's own run): store 4028 · dice 134/134 · exam 176/176 · trig 36/36
  (4320 gens) · tgraph 92/92 (9200 gens) · node exam modules 353/353.
- Looked at: `design/gtrig-briefs/review-png/stage1-quadtri-after-fix.jpg` (9 quadrant
  triangles), `stage1-sheet2-graph-crosses.jpg` (banded sine graph + three crosses).
  Note: tick labels look black on that sheet — a rasteriser artefact (the real fill is
  the muted blue; checked in the DOM), not a bug.
