# SESSION F1 — GENERAL TRIG part 1 (`gtrig`): co-functions · special angles · special sums · super special sums, Opus

Read `sessions/CONTENT-COMMON.md` first (it carries the /go block and every rule), then this.

## Where the chapter stands
Six tiles, four cards in total, cut from two seeded questions (`trig.rr.t2q1` → gtrig,
`trig.gs.t2q2` → gtrig — read both and `cards-gtrig.js`). A sibling session (F2) builds
reduction · identities · identities-undefined · general-solution · level-4 at the same time —
**do not touch those tiles or their makeCard lines**; you append yours under your four tiles.

## You own
`js/exam/gtrig-siblings-co-functions.js`, `gtrig-siblings-special-angles.js`,
`gtrig-siblings-special-sums.js`, `gtrig-siblings-super-special-sums.js`, your makeCard
lines in `js/exam/cards-gtrig.js` (your four tiles only — append; F2 appends its own; if the
file is being edited when you get there, re-read before writing and keep both), your blocks in
`verify-exam-modules.mjs`.

## Her rulings for trig
- **Memo = the textbook method. Her STORY goes in hint + esplain** (All Strippers Take Cash,
  the bow tie, Oats Are Healthy, the flamingo, "stand t on a 1") — read `METHODS-trig.md`
  Parts B, C, D, H, J; her five numbered special-sums steps (H3) ARE the textbook method
  written in her order, so the memo may number them.
- She HATES the 9-value special-angle grid: the two triangles + "Oats Are Healthy" is how the
  values are recalled (C2–C3). Never print a grid.

## Tiles (ids from EXAM-BUILD-DAY.md)
1. `co-functions` +5 (to 6) — "given sin 34° = t, write cos 56°"; cos(90° + x) = −sin x (THE
   trap, D3); sin(90° − x)/cos x; a negative co-function (D4: sin(x − 90°)); a "given
   cos 20° = p, write sin 70°, sin 110°, cos 160°" chain (all in terms of p, no triangle);
   a two-step one mixing a reduction and a co-function. lostQuest gt4. No diagram.
2. `special-angles` NEW, 6 cards — no calculator: evaluate `sin 30°·cos 60° + tan 45°`,
   `sin² 60° − cos² 30°`, `(tan 60°)/(sin 60°)`, a "disguised special angle" application (the
   bank's ⭐ 2024 Q2.2/2.3 flavour: a right triangle with sides given as trig expressions —
   show its area / an angle; fresh), a `cos 150° + sin 240°` that needs reduction THEN the
   triangle, a "which is bigger without a calculator" item. lostQuest gt3. No diagram (the
   learner draws the two triangles).
3. `special-sums` +5 (to 6) — her H3 five steps: isolate → quadrant (two conditions, the
   double-tick overlap) → sketch → unknown side by Pythagoras → substitute. Shapes: `5sin θ + 3 = 0`
   and `cos θ > 0` → evaluate `tan θ · cos θ`; `tan θ = −12/5`, θ ∈ (90°; 270°); a point on the
   terminal arm P(−2 ; −3) → three ratios; `13cos θ = −5` with θ in a given interval; an
   expression mixing a reduction (`sin(180° − θ)`); one with a reflex-angle diagram point
   (her p31). lostQuest gt8.
   **THE SKETCH IS THE LEARNER'S JOB — the question side never shows the triangle** (picking
   the quadrant IS the skill). The player draws a part's figure whenever that part has a
   `diagram.parts[id]` entry, in both states, so the rule is structural: structure every
   special-sums question as
     (a) "Draw a sketch and determine the length of the third side" — NO diagram entry at all
         (nothing is drawn), the memo describes the quadrant and the Pythagoras step;
     (b) "Hence, without a calculator, determine the value of …" — carries the entry
         `{ spec: { type:"quadtri", x:-5, y:-12, labels:{x:"−5", y:"−12", r:"13"}, theta:true } }`
         with NO highlight sets, so the fully labelled triangle sits beside (b) on both
         states — by then the side is known and the figure is the marker's sketch.
   Where a card has a third evaluation, make it (c) with the same entry. Document this
   (a)/(b) convention in each module's header.
4. `super-special-sums` NEW, 6 cards — her J1–J3: `cos 20° = t` → `sin 20°`, `tan 20°`,
   `cos 40°`? NO — no double angles at Gr11 (scope wall) — instead `sin 70°`, `cos 160°`,
   `tan 200°` in terms of t (co-function + reduction on the t-triangle); `sin 40° = p` →
   `cos 40°`, `tan 50°`, `cos 400°`; `tan 54° = 1/p` family; a 2-variable one
   (`sin 22° = d` → `sin² 112°`); a reverse item "if cos 25° = k, express √(1 − k²)/k as a
   single ratio". lostQuest gt10. Diagram: the flamingo triangle (quadtri, first quadrant,
   `letters:{x:"t", y:"√(1 − t²)", r:"1"}`) — same (a)/(b) structure as tile 3: (a) "draw the
   triangle and write the third side in terms of t" with no figure; (b) the evaluations with
   the figure on both states.

## Diagram engine
`type:"quadtri"` is wired into Exam Focus by Session 0 (`js/exam/quadtri-diagram.js`,
`js/engine/quadrant-triangle.js`, `verifyQuadTri`). Read the engine header: `x, y` are real
signed legs, `labels` numeric strings, `letters` the fallbacks, `theta:true` draws the arc.
Run `python tools/shoot.py gtrig special-sums` and READ every crop: the triangle must sit in
the right quadrant, labels must not collide with the axes.

## Archetype sources
`survey/SURVEY-Topic-Banks.md` §2 trig inventory (ratio-in-terms-of, special angles);
`SURVEY-Nov-P2.md` archetype 3 beats (i)–(ii); her Test 3 Q1–Q2 and Test 5 Q4–Q5 in
`SURVEY-Her-2025-Assessments.md`. Fresh numbers; never a verbatim item.

## Verify + report: exactly as CONTENT-COMMON.md says — shoot all four tiles, contact sheet
per tile, and SAY which cards carry a quadtri figure.
