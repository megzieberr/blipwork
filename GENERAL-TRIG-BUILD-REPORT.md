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

## Stage 2 — rounds 1–3 + wiring (Sonnet, ~400k tokens) ✅ committed `bbea71b`
- verify-gtrig.html **127 798/127 798** (foreman's own run); regression all green (store
  4031, dice 134, exam 176, trig 36, tgraph 92, node 353).
- Foreman's own 375 px play of gt3, twice: **+215 XP first time, +0 XP on replay**, 0
  console errors. (The agent had proven the same on gt1 and gt2; gt3 was the one it
  couldn't isolate cleanly.) Chapter card, 13 quest cards, "Coming soon" on gt4–gt13 seen.
- Looked at: `review-png/stage2-samples.jpg` (tap-side triangle, the four circle frames,
  the bow-tie wheel, the banded graph, the two special triangles) and
  `stage2-wheel-triangles-after-fix.jpg`. The O-A-H table builds in exactly her six
  stages (read off the DOM).
- Review fixes (targeted): three learner-facing hints said "Her boxed rule, p02" /
  "her closing line" → rewritten to speak to the learner; three hints used markdown
  `**` → `<b>`; the duplicate "the OTHER 45°" item dropped; the special triangles lost
  their vertex letters (`hideNames` added to the triangle engine — her page has none);
  the wheel's `180°`/`0°/360°` labels sat on the axis line → moved below it; two chapter
  blurbs said "her" → neutral; results screen now says a discovery-round replay paid 0
  on purpose (it used to say "a smaller XP top-up").
- Agent's calls (accepted): F18 default (finished triangles + one "where they come
  from" line); F12 default (unrationalised `1/√3`); rounds 1–3 use only reveal / mc /
  yesno / tap / tapcross; gt1's θ-vertex triangle = random legs + random rotation.
- Bug the agent caught only by playing, not by generating: gt1's tap-a-side question
  lacked `mode: "side"` → zero hit regions. Fixed before handover.
- Standing ruling for later stages (recorded in the stage-3/4 dispatch): learner
  copy never says "her" or cites page numbers; hints are HTML.

## Interruption — laptop died mid-stage-3
Her laptop shut down while the first stage-3 agent was still reading. Nothing was lost:
stages 1–2 were committed, the working tree was clean, and no stage-3 file existed yet.
Stage 3 was relaunched from the same brief (cost: the first agent's reading tokens only).

## Stage 3 — rounds 4–7 (Sonnet, ~426k tokens) ✅ committed (see git log)
- verify-gtrig.html **452 880/452 880** (foreman's own run, port 5214; includes a
  3 000-item independent numeric recompute of every gt4/gt5/gt7 chain and the
  `symbolicReduce` unit table); regression all green (store 4033, dice 134, exam 176,
  trig 36, tgraph 92, node 353).
- Foreman's own 375 px play: gt4 7/7 (+215 XP), gt5 with a DELIBERATE wrong quadrant
  tap → step hint shown, retry accepted, chain finished, verdict "✗ Not quite" with the
  split-line solution, "Try a similar one" gave a fresh chain; then gt5 7/7, gt6 7/7,
  gt7 7/7. 0 console errors, no horizontal overflow.
- Review fixes (targeted): gt4 prompts gave away the steps they then asked ("Write sin
  40° as a COSINE", "cos 160° = −sin ?°") → now "as a co-function"; negative angles
  rendered `sin −15°` → `sin(−15°)` (her p13 notation; new `argDeg` helper); the −θ
  split note read "−θ30" → "−30".
- Agent's calls (accepted): the two 90+ trap items always use cos; gt7 is one shared
  generator over all forms; co-function-of-tan throws (never asked); a harness-only
  `_dbg` field carries the source angle for the recompute.
- Possible later tweak, not done: gt7's seven slots draw independently, so one form can
  repeat (a run showed `−360° − x` three times). Drawing without replacement would
  spread the wheel better.
