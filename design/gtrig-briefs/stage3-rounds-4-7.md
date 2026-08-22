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

# STAGE 3 — General Trig rounds 4–7 (co-functions, reductions ×2, TIP Chips)

You are a build session inside a foreman day. Stages 1–2 are committed: the `steps` /
`tapcross` / `tokenpad` machinery, the triglib extensions, the chapter wiring (config
block `gtrig`, `_gtrig.js`, concepts, local-backend, schema seed + the CLOSED migration
file), and rounds gt1–gt3. **Do not commit. Do not push. Do not touch sw.js, supabase/,
or any learner data.** End by listing every file you changed and the harness totals.

Repo: `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest`; serve with
`python -m http.server 5213`. Read `CLAUDE.md` first.

## Read, in this order
1. `GENERAL-TRIG-BUILD-PLAN.md` — rows 4–7 of the round table.
2. `TRIG-DRILL-ROUNDS-PLAN.md` items 4–7 — HER words, they outrank the plan.
3. `METHODS-trig.md` Part D (co-functions, THE TRAP, negative co-functions, D6 input
   shape), Part E (reductions: what a reduction is, her 3 steps, the positive and
   negative wheels, rotations), Part F (TIP Chips ①–⑤, "but why?"), Part G (variables,
   G input shape), flags F2 (spelling), F10 (−90 threshold is deliberate), F14 (Hayley's
   way: default = OMIT, it is not explained in words anywhere), and the Appendix.
4. `design/gtrig-briefs/stage1-plumbing.md` sections A–C and G — the exact `steps` /
   `tapcross` / `tokenpad` shapes and the triglib functions (`reduce`, `rotate`,
   `cofunction`, `astcSign`, `quadrantOf`, `refAngle`, `fmtDeg`). Then read the code as
   built: `js/questions.js` (steps branch), `js/steps-check.js`, `js/tokenpad.js`,
   `js/tapcross.js`, `js/triglib.js`.
5. `js/quests/questgt2-cartesian.js` and `js/quests/_gtrig.js` — the chapter's own
   house style from stage 2; extend `_gtrig.js`, don't fork it.
6. `verify-gtrig.html` section 9 — extend the per-quest generation checks to gt4–gt7.

## Wiring
- `js/quests/questgt4-cofunctions.js`, `questgt5-reductions-numbers.js`,
  `questgt6-tip-chips.js`, `questgt7-reductions-variables.js`; register in
  `js/quests/index.js`; flip `built: true` for gt4–gt7 in `js/config.js`.
- `js/concepts.js`: cards `gtrigCofunction` (the two-labelling triangle story, D1, and
  the trap), `gtrigReduce` (REDUCTIONS = rewriting angles as acute angles; her 3 steps;
  the wheel), `gtrigTipChips` (the five chips in her words), `gtrigReduceVar` (reduce
  every factor in place, keep the minus signs visible in brackets, then cancel).
- `_gtrig.js`: add `symbolicReduce(fn, form)` — a PURE function returning
  `{ sign, fn2, label }` for the wheel forms `"180−θ" "180+θ" "360−θ" "−θ" "θ−360"
  "θ−180" "−180−θ" "−360−θ" "90−θ" "90+θ" "θ−90"` (both wheels, p08/p13/p17/p23/p24).
  Derive it numerically, never from a hand table: evaluate fn(form(θ)) at θ = 20° and
  θ = 37°, compare against ±sin/cos/tan(θ) at both, and pick the unique match; throw if
  none or more than one matches. `label` = the learner-facing answer, e.g. `−cos θ`.

## The four rounds (recap-sized, 6–8 questions each; computed answers; sibling
generators; her words in hints; `answerLabel` = her takeaway line)

### gt4 — Co-functions (THE FIRST DRILL). Concept `gtrigCofunction`. pp. 17–22.
`steps` chains: **sign (mc +/−) → sin or cos (mc) → value (calc)**; variable items drop
the value step. Mix numbers and variables from question 1 (her ruling), and make the
trap `cos(90° + x) = −sin x` appear early and often (≥ 2 of the 7 questions must be
90+ forms with cos).
1. Numeric 90−: "Write sin 40° as a cosine." → + → cos → 50. Sibling: random acute
   angle (10–80, multiples of 5), sin ↔ cos.
2. Numeric 90+: "Write cos 120° as a sine (use 90° + θ)." → − → sin → 30. Sibling:
   angles 100–170 (multiples of 5); BOTH sin and cos items (sin 120° = +cos 30°;
   cos 120° = −sin 30°). Answers from `cofunction(fn, "90+")`.
3. Variable 90−: "sin(90° − θ) = ?" → + → cos (2 steps). Sibling sin/cos.
4. Variable 90+ (the trap): "cos(90° + x) = ?" → − → sin. Sibling cos/sin (sin(90+x) =
   +cos x is the contrast — include it).
5. Negative co-functions (p24 ⑤, D4): "sin(θ − 90°) = ?" → − → cos; "cos(θ − 90°) = ?"
   → + → sin. Hint = the "but why?" derivation in her `let K = 90 − θ` words (one line).
6. The two-labelling triangle (D1): a to-scale 30-60-90 via triangle-graph with θ at one
   acute vertex and `90° − θ` at the other, sides `1`, `√3`, `2` labelled; mc "sin θ =
   √3/2. So cos(90° − θ) = ?" → `√3/2` — the point is the SHARED sides. Sibling swaps
   the roles.
7. Mixed numeric with a value: "cos 160° = −sin ?°" style → the value step only (calc)
   is not enough for a steps chain — make it the full chain: sign → fn → value.
   Sibling: random.
Step hints (her three-step language adapted): step 1 "90 − θ is friendly — quadrant A,
everything positive. 90 + θ has crossed into S: only sine stays positive." step 2 "Co-
functions CONVERT between sin and cos." step 3 "The angle left over after the 90°."

### gt5 — Reductions: numbers. Concept `gtrigReduce`. pp. 7–22.
`steps` chain per her four steps: **quadrant (tapcross, single) → reduction formula
(tokenpad) → sign (mc +/−) → the ratio (mc: "stays sin" / "changes to cos" / "changes
to tan"…)**. Positive, negative AND co-function angles mixed from question 1. Angles
that need a rotation first get ONE extra first step: "Rotate first — what do you add or
subtract?" (tokenpad, expected `−360` or `+360`; keep every angle within ONE turn:
360°–720° or −450°…−91°, so one chip press is the whole turn). Her −90 threshold (F10):
an angle in (−90°, 0) is a C-angle straight off the wheel, form `−θ`, NO rotation.
- Positive pool: sin/cos/tan of angles in Q2/Q3/Q4 (multiples of 5, never quadrantal),
  expected formula `180−` / `180+` / `360−` (tokenpad `expected:"180−"`, `alsoAccept:
  ["180−θ"]`), sign from `astcSign`, ratio "stays …".
- Negative pool: (−90, 0) → `−θ`, C-quadrant; ≤ −91 → rotation step then as positive.
- Co-function pool: prompt says "using a co-function (90° ± θ)": e.g. "Reduce cos 150°
  using a co-function" → Q2 → `90+` → − → "changes to sin". (Sibling: 100–170 and
  10–80 for `90−`.) Answers from `cofunction`.
- Rotation pool: "sin 510°" → `−360` → Q2 → `180−` → + → stays sin (her p09 eg.1).
  "cos(−950°)" is three turns — out (one turn only); use e.g. cos(−200°) → `+360` →
  Q2 → `180−` → − → stays cos.
- answerLabel shows the split written above the angle in her layout (Part 0.1), e.g.
  `180+30` over `sin 210°` → `= −sin 30°` — render the note as a small `<sup>`-style
  line above.
Step hints: ① "determine the quadrant" ② "reduction formula — which wheel arm?" ③ "+ or
− sign: All Strippers Take Cash" ④ "does it stay, or is it a co-function that converts?"
7 questions: 2 positive, 2 negative (one each side of −90), 2 co-function, 1 rotation.

### gt6 — Reductions TIP Chips. Concept `gtrigTipChips`. pp. 23–25.
Theory round (mc / yesno pools, a reveal card or two). Beats:
1. reveal: the three boxes (positive → anti-clockwise; negative → clockwise; co-
   functions → convert between sin and cos), then mc "A negative angle turns…" → clockwise.
2. Chip ①: mc "sin 520° — first move?" → "−360° → sin 160°". Sibling: angles 380–700.
3. Chip ②: mc "sin(−120°) — first move?" → "+360° → sin 240°"; AND the F10 contrast:
   yesno "cos(−40°): do you add 360° first?" → No (−40 is not below −90; it's a C-angle
   straight off the wheel). Pool both.
4. Chip ③ block brackets: mc "sin²210° = ?" → "[−sin 30°]² = sin²30°, positive"
   (decoys: −sin²30°, sin²(−30°)…). Sibling: random Q3/Q4 angle × sin/cos.
5. Chip ④ the trap: mc "cos(90° + θ) = ?" → −sin θ.
6. Chip ⑤: mc "sin(θ − 90°) = ?" → −cos θ; "cos(θ − 90°) = ?" → sin θ (pool).
7. "but why?" card (reveal, her derivation for chip ⑤ with `let K = 90° − θ`, −K in the
   IV quadrant) → yesno "In quadrant IV, cos survives and sin flips" → Yes.
Keep her header "TIP Chips" as the round's words; never "tips".

### gt7 — Reductions: variables. Concept `gtrigReduceVar`. pp. 10–16, 18–20.
`steps` chain of TWO: **sign (mc +/−) → ratio (mc sin/cos/tan)**; the value is x or θ
(no pad). Items from `symbolicReduce` over ALL forms of both wheels, plus the 90-forms:
1. `cos(180° + θ)` → − cos. 2. `sin(360° − x)` → − sin. 3. `tan(180° − α)` → − tan.
4. `cos(−θ)` → + cos. 5. `tan(θ − 180°)` → + tan (p13 wheel: θ−180 is T). 6. `sin(−180° −
θ)` → + sin. 7. `cos(θ − 360°)` → + cos. Mix 90-forms in as siblings (`sin(90° + θ)` →
+ cos …). Sibling generator: random form × random fn × random letter (θ, x, α, A).
answerLabel = the reduced form, e.g. `−cos θ`, with the wheel arm named (S/T/C).
Hint step 1: "which quadrant does the form land in? Read the sign off the story." Step 2:
"only 90 ± θ and θ − 90 convert; everything else stays."

## Harness — extend `verify-gtrig.html` section 9
- gt4–gt7 join the per-skill 300× generation checks (valid shapes; steps chains: every
  step has a kind in {mc, tapcross, tokenpad, calc}, exactly one correct mc option per
  mc step, tapcross corrects sorted, tokenpad `expected` normalises to a non-empty
  string, calc `expected` finite; prompts clean of hyphens-as-minus and spelling slips).
- Independent recompute: for every generated gt4/gt5/gt7 item, evaluate the ORIGINAL
  expression numerically (e.g. Math.cos(rad(120))) and the chain's claimed answer
  (sign × fn2(value or θ = 23°)) and assert equality to 1e-9 — 1 000 items per round.
- `symbolicReduce` unit table: all 11 forms × 3 fns against hand-known results from
  her pages (p10–p16, p17, p24).
- Also re-run `verify-store.html`, `verify-dice.html`, `verify-exam.html`,
  `verify-trig.html`, `verify-tgraph.html`, `node verify-exam-modules.mjs` — all green.

## 375 px walk (before you report)
`http://localhost:5213/?local=1` → Revision → General Trig → play gt4, gt5, gt6, gt7 end
to end through the real UI at 375 px (dispatch `MouseEvent("click",{bubbles:true})`;
drive the token pad and keypad by clicking chips). Deliberately get ONE step wrong in a
gt5 chain and confirm: the step hint appears, the retry works, the chain completes, the
verdict is "Not quite" with the solution, and "Try a similar one" regenerates a fresh
chain. Assert 0 console errors and that every round reaches results. Report what you
saw.

## House rules
Never type words (the token pad is chips, not typing) · real minus `−` · decimal comma ·
her spelling slips corrected in learner copy, her words kept · decoys filtered by value ·
no answer leaks · recap-sized · don't touch the `trig` (2D) chapter, dice, Euclid,
sw.js, supabase/, learner data.

## Report (final message)
1. files created/changed; 2. harness totals (verify-gtrig + regression set); 3. the 375
px walk evidence incl. the deliberate-wrong-step run; 4. judgement calls, one line each;
5. anything unfinished and why.
