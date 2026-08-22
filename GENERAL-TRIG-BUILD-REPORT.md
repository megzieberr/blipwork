# GENERAL TRIG — build report (unattended foreman day, 2026-08-22)

**All 13 rounds are built, reviewed and committed locally** (four commits, `d6a4b52` →
`dbb81d5`), nothing pushed, the database untouched. Your mid-lesson ruling is in too:
the two trig exam questions (Reduction & Ratios, General Solutions) now sit under a
**General Trig** tab in Exam Focus with working "I'm lost" links to rounds 5 and 11;
Mixed Problems stays under 2D Trig. Every harness is green on my own runs
(verify-gtrig 1 058 724 checks; store, dice, exam, trig, tgraph, exp, verify.html and the
node exam harness all unchanged-green), and I played rounds 3, 4, 5, 6, 7, 8, 12 and 13
myself at phone width, including a deliberate wrong step and a discovery-round replay
(+215 XP first time, +0 on replay). Agents used ≈ 1,67M tokens — inside the 2,5–3,2M
you saw. **To ship, when you say the word:**

- 💻 5 min — say **"ship"**: I run `supabase/migration-gtrig-quests.sql` on live via MCP
  (13 quest rows, seeded CLOSED, learner-row hashes before/after), bump `sw.js`
  (v53 → v54), push `main`, check live.
- 📱 3 min after the ship — open Revision → General Trig on your phone and feel round 1
  (the circle frames) and round 8 (the triangle that appears after the quadrant tap).
- 💻 1 min whenever — open round 1 in admin when you're ready to teach it; the Exam
  Focus tab for General Trig appears the moment any round is open.

Three things that want one line from you (defaults applied, nothing blocks the ship):
1. **Round 12's "no reference angle" also covers `sin 3A = cos 60°`-shaped items** — by
   your p60 eg.1 those are type ⑥ (convert, match brackets). A kid could instead read
   cos 60° = 1/2 and use a ref angle of 30°. Say if you'd rather only *variable* angles
   on both sides count as "no ref".
2. **Round 3 leaves special-angle values unrationalised** (`1/√3`); round 8/10 answers
   from a sketch are rationalised — your F12 habit, unchanged.
3. **Hayley's way** is still not in round 4/7 (no wording exists) — send the sentence and
   it's a five-minute card.

---

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

## Stage 4 — rounds 8–13 + exam move (Opus, ~545k tokens) ✅ committed `dbb81d5`
- verify-gtrig.html **1 058 724/1 058 724** (foreman's own run): 27 900 generated
  questions; gt8 sides re-derived; gt9/gt10 equalities re-evaluated at 23°, 37°, 61°;
  gt11's 4 000 equations re-classified by an independent shape parser (self-tested on
  18 of her printed examples first); gt12 against `solutionQuadrants`/`boundaryCase`/
  `refAngle`; gt13's options swept for a zero over 0–360°; 3 900 sketch labels measured.
- Regression (own runs): exam 176/176 · node exam modules 355/355 · store 4032 · dice
  134 · trig 36 · tgraph 92 · verify.html 54 · exp 8.
- Foreman's own 375 px play: gt8 (0 triangles in the DOM during the quadrant step, 1
  right after, labelled `x | y | r` only; 7/7, +215 XP), gt12 ("no reference angle"
  ends the chain; one calc miss was my driver typing the raw float — the app was right
  to refuse), gt13, and Exam Focus → General Trig → General Solutions → "I'm lost" →
  landed in "11. General solution: the six types". 0 console errors.
- Looked at: `review-png/stage4-sketches.jpg` (before) and
  `stage4-quadtri-after-fix2.jpg` (after). Found: in thin 5-12-13 sketches the short
  x-leg's label and the "O" sat inside the θ arc — the harness measures labels against
  legs, not against the arc. Fixed in the engine: a short leg's label moves to the foot
  end; "O" takes the free corner farthest from the θ and x labels.
- Agent's calls (accepted): gt8 uses primitive triples only (a reduced `20/25` would
  mark a careful kid wrong); follow-up ratios never re-ask the given one; gt10 angles
  {35,40,50,55} so the tap targets stay a fingertip apart and sin ≠ cos; gt10's labelled
  sketch is 470 wide so `√(t² − 1)` fits; gt13 decoys are never-zero expressions; gt13
  writes `cos x/sin x` rather than `1/tan x` (whose honest answer set includes cos x);
  gt11's six options are hand-built in her fixed ① – ⑥ order, never shuffled.
- Her mid-build ruling (from her phone, recorded verbatim in config.js + exam/index.js):
  the two trig exam questions moved to chapter `gtrig`; `EXAM_CHAPTERS` gains `gtrig`;
  ids/topics/parts unchanged so exam progress carries. verify-exam's placeholder set is
  now the two Euclidean ids only.
- Migration file header updated to "all 13 built". Still NOT run.

## Stage 5 — SHIPPED 2026-08-22 evening on her "Yes, you can ship"
Migration `gtrig_quests` applied via MCP: students 21 / progress 27 / blips 3 — hashes
byte-identical before and after; the 79 pre-existing quest rows byte-identical; 13 gt
rows inserted, all `is_open = false`. sw v53 → v54. Pushed to main.

### (the plan as written before the ship)
1. `supabase/migration-gtrig-quests.sql` via MCP on the live project, with
   `students` / `progress` / `blips` row counts + hashes before and after (must be
   identical — it touches `quests` only), then `/migration-check`.
2. `sw.js` CACHE `mhq-v53` → `mhq-v54`.
3. `git push origin main`; confirm live serves v54 and the General Trig chapter shows 13
   rounds (all closed until she opens them).
4. PROJECT-STATUS.md head already written for this day (below the ship line).

## Cost
Agents: stage 1 ≈ 302k · stage 2 ≈ 402k · stage 3 ≈ 426k (+ a partial read before the
laptop died) · stage 4 ≈ 545k → ≈ 1,67M. Foreman session on top. Inside the 2,5–3,2M
estimate she saw.

## Her phone play-test, same evening → 15 fixes, shipped as sw v55 (commit a215e28)
Her findings and what changed, in her order: (1) discovery rounds pay XP every play;
(2) special-triangle labels off the lines — angle labels now placed by wedge width, long
ones beside the vertex; (3) round-3 value questions show the O-A-H table; (4)/(5)
formula chunks never wrap, trailing brackets on a new line, identities one per line;
(6) stacked fractions everywhere + the `90° − θ` label beside the vertex; (7) solution
reasons wrap (the sideways scroll); (8)=(4) chapter-wide; (9) the retried-chain verdict
is a calm amber panel, step mark "✓ after a retry"; (10) rounds 5–7 reordered (live sort
swapped, learner tables byte-identical); (11) a real bow tie; (12) round 8: make the two
ticks yourself, then tap the overlap; (13) one keypad, sides written onto the sketch, pad
gone, sketch stays for the ratios; (14) round 10's no-sketch items cut; (15) cos = 1
ticks I and IV — plain sign rule for boundary values. Harness re-pointed at the new
rulings; 1 037 352 green. The one open idea is in PROJECT-STATUS Next up (exam "walk me
through it").
