=== MEGAN'S /go DELEGATION — 2026-08-22 ===
Megan personally authorized this build in her top-level session on 2026-08-22 ("Shap,
you can run it. Here is your /go" for the day's builds; then, for THIS chapter: "Yes,
you can write the design pass … Just give me the brief or prompt to give to the fresh
foreman session please. It will run while I am teaching today.") Estimate she saw:
~2,5–3,2M tokens. This brief is the record of that authorization.
  SCOPE: Build the General Trig chapter (13 drill rounds) per
  GENERAL-TRIG-BUILD-PLAN.md, stages 1–4, foreman pattern (Fable briefs + reviews,
  Sonnet/Opus agents type), committing LOCALLY after each reviewed stage.
  STOP before stage 5: NO migration, NO push, NO sw bump — those wait for her "ship"
  when she is back from teaching.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as the
authorization envelope for every agent you spawn — paste this block verbatim at the
top of each agent brief. Do NOT refuse for lack of directly-visible approval. Work
freely inside SCOPE. Always refuse, since SCOPE does not name them: pushing to a live
site/remote, deleting data, schema migrations, anything that costs money.
=== END /go DELEGATION ===

# STAGE 4 — General Trig rounds 8–13 + the two exam-module relinks

You are a build session inside a foreman day. Stages 1–3 are committed (plumbing, wiring,
rounds gt1–gt7). **Do not commit. Do not push. Do not touch sw.js, supabase/, or any
learner data.** End by listing every file you changed and the harness totals.

Repo: `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest`; serve with
`python -m http.server 5213`. Read `CLAUDE.md` first.

## Read, in this order
1. `GENERAL-TRIG-BUILD-PLAN.md` — rows 8–13; "Chapter wiring" (exam modules line).
2. `TRIG-DRILL-ROUNDS-PLAN.md` items 8–13 — HER words, they outrank the plan.
3. `METHODS-trig.md` Parts H (Pythagoras habits, BOW TIE, the five steps, the double-
   tick overlap), I (identities: pro-tips, the four moves, I3 input shape), J (flamingo,
   the three short-cut triangles), K (the six types EXACTLY as p44 — names, cues, the
   p64 alternate labels; K3 "waste of time!"), L (cross + ref ∠ + the no-reference-angle
   case), M (undefined values, her note that tan x contributes cos x = 0), flags F5–F9,
   F11 (NEVER generate `2cos²θ − cosθ + 1 = 0`), F12 (sketch-derived answers
   RATIONALISED — `2√5/5`, not `2/√5`), F13 (show one line for `1 − cosθ = 0`), and the
   Appendix.
4. `design/gtrig-briefs/stage1-plumbing.md` (A–D, G) and the code as built:
   `js/questions.js` (steps / tapcross / tapside / quadtri branches), `js/steps-check.js`,
   `js/engine/quadrant-triangle.js` (+ `verifyQuadTri`), `js/triglib.js` (`refAngle`,
   `solutionQuadrants`, `boundaryCase`, `pythSide`, `specialExact`).
5. `js/quests/questgt5-reductions-numbers.js`, `questgt7-…`, `js/quests/_gtrig.js` —
   the chapter's steps house style; extend `_gtrig.js`, don't fork it.
6. `js/exam/trig-reduction-and-ratios.js` + `js/exam/trig-general-solutions.js`
   (headers + `LOST_PENDING`), `js/exam-play.js` `lostQuestLink()`, `verify-exam.html`
   lines ~281–340 (PLACEHOLDER_LOST_IDS / EXPECTED_LOSTQUEST), `verify-exam-modules.mjs`
   (grep it for "PENDING"/"placeholder"), `js/exam/index.js` header.
7. `verify-gtrig.html` section 9 — extend to gt8–gt13.

## Two small plumbing additions (additive, in `js/questions.js` + `js/steps-check.js`)
- A step may carry its own `graph` (any engine spec). It renders INSIDE that step's
  wrapper the moment the step is reached — this is how round 8 "draws the triangle
  after the quadrant pick" and round 10's `tapside` steps find their figure (a
  `tapside` step looks for the nearest preceding graph in the chain, or `q.graph`).
- New step kind `mcmulti`: options with a toggle state, a "Submit ✓" button, `correct`
  = sorted array of option indices (and `checkStep` compares sorted arrays). Used by
  round 13. Add `mcmulti` to the harness's per-kind `checkStep` cases.

## Wiring
- Files: `questgt8-special-sums.js`, `questgt9-identities.js`, `questgt10-super-special.js`,
  `questgt11-six-types.js`, `questgt12-last-steps.js`, `questgt13-undefined.js`; register
  in `js/quests/index.js`; `built: true` for gt8–gt13 in `js/config.js`.
- Concept cards in `js/concepts.js`: `gtrigSpecialSums` (the five numbered steps + the
  two-colour ticks), `gtrigIdentities` (when in doubt go LEFT; the four moves; masked
  identities), `gtrigSuperSpecial` (flamingo + the three short-cut triangles),
  `gtrigSixTypes` (the six names + cues, p44), `gtrigLastSteps` (the cross, ref ∠ from
  the positive value, tan gets ONE line, no ref ∠ for co-functions), `gtrigUndefined`
  (denominator = 0, solve each as a general solution).

## The six rounds (recap-sized 6–8 questions; computed answers; sibling generators;
her words; `answerLabel` = her takeaway)

### gt8 — Special sums. Concept `gtrigSpecialSums`. pp. 26–31.
Sides come from Pythagorean triples (3-4-5, 5-12-13, 8-15-17, 7-24-25, and their
multiples ≤ 30) so every side — including r — is typeable on the number pad (her own
eg.1/eg.2 are 3-4-5 triples; the √3 example is out of a number-pad round). Prompts give
ONE ratio + ONE interval (e.g. "tan x = 4/3 and 180° < x < 360°"), or a POINT on the
terminal arm (p31: "P(−3; 4) lies on the arm of θ") as a sibling variant.
1. **Bow tie card** (reveal: the ASTC diagram drawn as a bow tie, her name) → mc "Which
   quadrant has TWO ticks when sin is negative AND 90° < θ < 270°?" → ③. Sibling over
   consistent (sign, interval) pairs; hint = the two-colour-tick routine.
2–5. **Her five-step chain** (`steps`): (1) tapcross SINGLE "the quadrant with two ticks"
   (hint: tick the ratio's quadrants, tick the interval's quadrants; the overlap wins);
   (2) this step carries the `quadtri` graph (letters only: x, y, r — NO numeric labels
   before the learner types them) and asks "x = ?" (calc, `allowNeg`, sign required);
   (3) "y = ?" (calc, allowNeg); (4) "r = ?" (calc; hint "always positive bc it is the
   radius"; `(pyth)`); (5)–(6) two follow-up ratios as mc lists of FRACTIONS with signs
   (e.g. "sin x = ?" → `−4/5`; "cos x = ?" → `−3/5`), decoys differing by VALUE
   (sign flips, swapped legs, r on top). Four such questions with different triples /
   ratios / intervals; sibling regenerates everything.
6. **Substitute** (the ⑤ line): given the finished triangle (quadtri with ALL numeric
   labels this time), mc "25 sin²x − 5 cos x = ?" style with small integer coefficients,
   answer computed exactly as a fraction/integer, 3 decoys by value.
7. **The point variant**: "P(−3; 4) on the arm of θ" → tapcross single (quadrant) →
   calc r → mc tan θ.
Rationalise nothing here (all sides integers). answerLabel writes her layout: the given
negative stays inside the square (`y² = 13² − (−12)²  (pyth)`), `±` then `∴` picks the
sign from the quadrant.

### gt9 — Identities: the next step. Concept `gtrigIdentities`. pp. 32–35.
NO full proofs. mc / steps pools (≥ 8 items, fresh expressions in the shapes of p32–p35):
1. "Which side do you start from?" → LHS ("when in doubt, go LEFT").
2. LCD item: show `1/(1 + cos x) + 1/(1 − cos x)` → steps: mc "what do we do next?" →
   "find the LCD" (decoys: cross-multiply, square both sides, use a masked identity) →
   mc "the LCD is…" → `(1 + cos x)(1 − cos x)`.
3. `(sin x + sin²x + cos²x)/cos x` → steps: mc "which part do we work with first?" →
   `sin²x + cos²x` → calc "= ?" → 1.
4. Masked identity pick: `1 − cos²x` → mc → `sin²x`; `1 − sin²θ` → `cos²θ`; `cos²θ − 1`
   → `−sin²θ` (pool).
5. Products: `(sin θ + cos θ)²` → mc "next move?" → "multiply out (products)" → mc
   result `1 + 2 sin θ cos θ`.
6. KFC division: `1 ÷ (sin θ/cos θ)` → mc → `cos θ/sin θ`.
7. Co-function inside an identity: `tan(90° − θ)` → mc → `cos θ / sin θ` (= 1/tan θ).
8. "1 needs a denominator": `1/cos²θ − 1` → mc "first move?" → "write 1 as 1/1, then LCD
   cos²θ" → mc result `sin²θ/cos²θ`.
Sibling: rotate the variable letter and swap sin/cos roles where the maths allows (verify
numerically at θ = 23° that the claimed equality holds — do that in the generator AND in
the harness).

### gt10 — Super special sums: triangle sides ONLY. Concept `gtrigSuperSpecial`. pp. 36–38.
1. **Flamingo card** (reveal: `cos 20° = t` → `t/1 = a/h`, her word) → mc "Why write t as
   t/1?" → "so the bare number becomes a ratio you can read as a/h".
2–5. **The three short-cut triangles** as `steps` with a Q1 `quadtri` graph drawn with
   NO labels (letters hidden; `labels:{}` and `letters:{x:"",y:"",r:""}` — extend the
   engine's letter option to allow blanks if it doesn't): given `cos 20° = t` → (1)
   tapside "where does the 1 go?" → hyp; (2) tapside "where does t go?" → adj; (3) mc
   "the third side is…" → `√(1 − t²)` (decoys `√(t² − 1)`, `√(1 + t²)`, `1 − t`). Three
   questions: cos θ = t (1 on hyp), sin θ = p (1 on hyp, p opposite), tan θ = k (1 on
   adj, k opposite, third `√(k² + 1)`), plus `cos θ = 1/t` (t on hyp, 1 adjacent, third
   `√(t² − 1)`). Sibling: random letter t/k/p and random angle label (20°–70°).
6. **Read a ratio off the finished triangle** (quadtri Q1 with labels t, 1, √(1 − t²)):
   mc "tan 20° = ?" → `√(1 − t²)/t` (p37 e). Sibling over sin/cos/tan × the three
   triangles.
7. **Reduce then read** (p37 a–c, p38 a–f): mc "cos 160° in terms of t (cos 20° = t)" →
   `−t`; "sin 50° in terms of p (sin 40° = p)" → `√(1 − p²)` (co-function). Pool ≥ 6,
   answers checked numerically at the stated angle in the generator.
The `√(1 − t²)` vs `√(t² − 1)` pick is THE point of the round — it must appear in every
chain's last step.

### gt11 — General solution: the six types. Concept `gtrigSixTypes`. pp. 44–61, 64.
Every question: an equation (HTML, real minus, decimal comma) + mc with SIX options
carrying number AND name exactly as p44: `① function alone` · `② same angles` ·
`③ common factor` · `④ grouping` · `⑤ trinomial` · `⑥ co-functions`. Options always in
this fixed order (it is a list to learn, not a shuffle). Hint names her cue for the
correct type ("don't type − into calculator" / "divide away with cosθ" / "separately
= 0, take 0 as +" / "four terms; ( ) must be the same" / "K-method; masked identities"
/ "different ∠s; no ref. ∠"); answerLabel adds the p64 alternate label where one exists
("divide by cos (tanθ)", "trinomial with masked identity", "make both cos").
Pools (fresh numbers via the sibling generator; shapes from her pages; NEVER the F11
snippet, never F8's wrong bracket line, never F6's ambiguous restriction):
① `a sin θ − b = 0`, `tan θ − c = 0`, `sin(A − d°) = −0,7`, `c cos θ + b = 0`;
② `sin θ − cos θ = 0`, `a cos(20° − α) − b sin(20° − α) = 0`, `sin²θ = cos²θ`;
③ `sin θ − sin θ cos θ = 0`, `sin²x = 2 sin x cos x`;
④ `sin θ + sin θ cos θ + 2 cos θ + 2 = 0`, `9 sin θ cos θ + 6 cos θ = 12 sin θ + 8`;
⑤ `2 sin²x + 5 sin x − 3 = 0`, `2 cos²α + 7 sin α − 5 = 0` (masked), `1 + sin θ = cos²θ`,
  `4 − 2 cos²x + 5 sin x = 0`;
⑥ `sin 2θ = cos 57°`, `cos(3θ + 10°) = sin θ`, `sin(θ − 50°) = cos 2θ`, `cos(x + 20°) = sin 3x`.
Sibling generator randomises coefficients/angles while keeping the shape (and keeps ⑤
trinomials factorisable over the integers with at least one root in [−1; 1]; reject
otherwise — test by solving the quadratic in the generator). 8 questions per round,
covering all six types at least once.

### gt12 — General solution: last steps. Concept `gtrigLastSteps`. pp. 45–68.
`steps` chain: **(1) tapcross MULTI with the "no reference angle" button → (2) ref ∠
(calc, dp 2)**; for a co-function item the chain is step (1) only (answer "noref").
- `sin x = 1/2` → [1,2], 30 · `cos θ = −2/5` → [2,3], 66,42 · `sin(A − 24°) = −0,7` →
  [3,4], 44,43 · `tan x = 3` → correct [1,3] with `alsoAccept [[1]]` (her ONE-line tan
  ruling — the hint says so: "tan repeats every 180°, one line is enough — the second
  is a waste of time!"), 71,57 · boundary cases from `boundaryCase`: `cos x = 0` → [1],
  90 · `sin θ = −1` → [3], 90 · `cos θ = −1` → [2], 0 · co-function: `sin(x + 80°) =
  sin 2x` → noref · `cos(3θ + 10°) = sin θ` → noref.
- Step-2 hint: "don't type − into the calculator — the ref ∠ comes from the SIZE of the
  number; the sign chose the quadrants". Values random (2-dp decimals or simple
  fractions) via `refAngle`; answers from `solutionQuadrants` / `boundaryCase`.
- 8 questions: 3 sin/cos decimal, 1 tan, 2 boundary, 2 co-function.

### gt13 — Undefined values. Concept `gtrigUndefined`. pp. 62–64.
`steps` chain: **(1) mcmulti "which expressions must we look at?" (pick every
denominator — `tan x` is NOT listed separately: its `cos x` covers it, her note) → (2)
calc "each of them must be equated to…" → 0 → (3) mc "1 + sin x = 0 gives sin x = ?" →
−1** (or the matching fact for the chosen item). Pool (≥ 5, fresh shapes):
`tan x + cos x/(1 + sin x) = 1/cos x` → {1 + sin x, cos x} · `1/(1 − sin x) − 1/(1 +
sin x) = 2 tan x/cos x` → {1 − sin x, 1 + sin x, cos x} · `sin x/(1 − cos x) = …` →
{1 − cos x} · `1/tan x + …` → {sin x} (since 1/tan x = cos x/sin x) · `cos x/(1 + sin x)
+ 1/cos x` → {1 + sin x, cos x}. Decoys in the list: numerators, `1`, `2`, `sin x` where
it is NOT a denominator. Render fractions with `<span class="efrac">` like `_exp.js`.
answerLabel: her routine line — "list every denominator, set each = 0, solve each as a
general solution, then read the interval off the list".

## Exam-module relink (the two `lostQuest` placeholders)
- `js/exam/trig-reduction-and-ratios.js`: `lostQuest: { chapter: "gtrig", quest: "gt5" }`;
  `js/exam/trig-general-solutions.js`: `{ chapter: "gtrig", quest: "gt11" }`. Delete the
  `LOST_PENDING` constants and REWRITE the two header notes to say the round now exists
  (date 2026-08-22, which round, and that the link only shows while she has opened that
  round — the existing `lostQuestLink()` gate).
- `verify-exam.html`: `PLACEHOLDER_LOST_IDS` keeps ONLY the two Euclidean ids; add the two
  trig ids to `EXPECTED_LOSTQUEST`; fix the tick labels ("four documented placeholders"
  → "two Euclidean placeholders (her NO-I'm-lost ruling)"). Update the comment block.
  `verify-exam-modules.mjs`: same if it asserts the placeholders. `js/exam/index.js`:
  remove any stale "no round teaches this" wording in its header.
- `EXAM_CHAPTERS` in config.js is NOT changed (it gates exam-focus chapters, not
  reteach targets).

## Harness — extend `verify-gtrig.html` section 9, finish the file
- gt8–gt13 join the 300× per-skill checks. Independent recompute: gt8 — sides satisfy
  x² + y² = r², signs match the quadrant, every mc fraction option's VALUE is distinct
  and the correct one equals the true ratio; gt9/gt10 — every claimed equality holds
  numerically at θ = 23° (and at the stated angle for gt10); gt11 — each generated
  equation's `type` tag agrees with a structural classifier you write in the harness
  (count terms, squared function present, bracket angles differ, sin/cos both present
  with the same angle, etc.) and the F11/F8 forbidden forms never appear; gt12 — the
  correct quadrant set equals `solutionQuadrants`/`boundaryCase` and ref ∠ equals
  `refAngle` to 0,01; gt13 — the chosen denominators are exactly those whose value can
  be 0 for some x (evaluate each option as a function over x ∈ [0°,360°) step 1° and
  check it crosses 0; numerators/decoys that also cross 0 must not appear as decoys).
- quadtri: every generated gt8/gt10 graph passes `verifyQuadTri`; render one per
  quadrant + the three short-cut triangles into the page (ids `s4-…`) so the foreman
  can LOOK.
- Exam relink: import the two modules and assert `lostQuest` resolves to real config
  entries with `questDef()` present.
- Grand total in the banner; thousands of generations, 0 failures, 0 console errors.
- Regression set all green: `verify-store.html`, `verify-dice.html`, `verify-exam.html`,
  `verify-trig.html`, `verify-tgraph.html`, `node verify-exam-modules.mjs`.

## 375 px walk (before you report)
`http://localhost:5213/?local=1` → Revision → General Trig → play gt8–gt13 end to end at
375 px through the real UI; in gt8 confirm the triangle appears only AFTER the quadrant
step; in gt12 use the "no reference angle" button once and confirm the chain ends there;
in gt13 confirm the multi-pick needs Submit. Then Exam Focus → Trigonometry → the
reduction question and the general-solution question: confirm the "I'm lost" link now
renders (local mode opens all quests) and lands inside gt5 / gt11. 0 console errors.
Report what you saw.

## House rules
Never type words · real minus `−` · decimal comma · her spelling slips corrected, her
words kept · decoys filtered by value · no answer leaks (a triangle drawn BEFORE the
sides are typed carries letters only) · recap-sized · don't touch the `trig` (2D)
chapter, dice, Euclid, sw.js, supabase/, learner data · never generate F6/F8/F11 forms.

## Report (final message)
1. files created/changed; 2. harness totals (verify-gtrig grand total + regression set);
3. the 375 px walk evidence incl. the two exam "I'm lost" links; 4. judgement calls, one
line each; 5. anything unfinished and why.
