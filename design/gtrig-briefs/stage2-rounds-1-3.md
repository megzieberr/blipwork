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

# STAGE 2 — General Trig rounds 1–3 (discovery) + chapter wiring

You are a build session inside a foreman day. Stage 1 (plumbing) is already committed:
the `steps` / `tapcross` / `tokenpad` question machinery, the `quadtri` engine, trig-graph
`bands`, `reveal` frames, the triglib extensions, the `xpOnce` hook in play.js, and the
`verify-gtrig.html` skeleton. **Do not commit. Do not push. Do not touch sw.js or any
learner data. Write the migration FILE but never run it.** End by listing every file
you changed and what the harnesses said.

Repo: `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (plain ES
modules, no build step). Serve with `python -m http.server 5213` from the repo root.
Read `CLAUDE.md` first (decision log + gotchas — especially "diagrams can leak the
answer", "decoys equal by value", real minus, decimal comma).

## Read, in this order
1. `GENERAL-TRIG-BUILD-PLAN.md` — chapter design; rounds 1–3 rows of the table; the
   "XP rule for discovery rounds" and "Chapter wiring" sections.
2. `TRIG-DRILL-ROUNDS-PLAN.md` items 1–3 — HER words; they outrank the plan.
3. `METHODS-trig.md` — Part 0 (habits), Part A (round 1), Part B (round 2), Part C
   (round 3), the FLAGS table (F2 spelling: correct it in learner copy; F12: default =
   special-angle values UNRATIONALISED; F16: the ①yellow ②blue ③green ④pink colours are
   round 2's story; F18: default = open on the two finished triangles with one
   "where they come from" line), and the Appendix vocabulary. Her VOICE is binding:
   the story words (All Strippers Take Cash, Oats Are Healthy, "radius stays the same",
   masked identities, "look at the 3rd letter", three · angled · measurement) must
   appear as she uses them.
4. `js/questions.js` (the `reveal` frames, `tapcross`, `steps` branches), `js/tapcross.js`,
   `js/steps-check.js`, `js/engine/trig-graph.js` (`bands`), `js/engine/triangle-graph.js`
   (you reuse it for the two special triangles), `js/triglib.js` (`specialExact`,
   `astcSign`, `quadrantOf`).
5. `js/quests/queses3-method.js` + `js/quests/_exp.js` — the theory-round shape (pools
   of curated items, `mc`/`ynQ`/`poolMC`), and `js/quests/_shared.js` (`mc()` de-dupes by
   STRING only — filter decoys by VALUE yourself).
6. `js/config.js`, `js/quests/index.js`, `js/local-backend.js` (QUEST_IDS / DEFAULT_OPEN
   at lines ~101–123), `js/concepts.js` (card shape), `supabase/schema.sql` (the quests
   seed near line 1539), `supabase/migration-equations-quests.sql` (pattern — but
   yours seeds CLOSED).
7. `verify-gtrig.html` — section 9 is yours to fill.

## Chapter wiring (do this first so the rounds are reachable)
- `js/config.js`: append to `CHAPTERS` (after `eqn`) the block
  `{ id: "gtrig", name: "General Trig", paper: "Paper 2", icon: "🔄" (a point turning
  round a circle — her round-1 story; 🧭 and 📐 are already taken), term: "revision", signature: PALETTE.violet, open: true, blurb: one
  sentence in her frame (reductions, co-functions, special angles, general solutions —
  "the angle is the whole story"), quests: gt1…gt13 }` with HER titles, n 1–13:
  1 "Introduction" · 2 "The Cartesian plane" · 3 "Special angles & identities" ·
  4 "Co-functions" · 5 "Reductions: numbers" · 6 "Reductions TIP Chips" ·
  7 "Reductions: variables" · 8 "Special sums" · 9 "Identities: the next step" ·
  10 "Super special sums" · 11 "General solution: the six types" ·
  12 "General solution: last steps" · 13 "Undefined values".
  Blurbs ≤ 12 words each, her vocabulary. `built: true` for gt1–gt3 ONLY; gt4–gt13
  `built: false` (they show as "Coming soon" until their stage lands).
  Note on colour: the plan said "gold is free" — it is not (2D Trig and Number Patterns
  use it); the palette cycles, so violet follows `eqn`'s blue. Leave a one-line comment.
- `js/quests/index.js`: import + register `gt1`, `gt2`, `gt3` (files
  `questgt1-intro.js`, `questgt2-cartesian.js`, `questgt3-special.js`).
- `js/quests/_gtrig.js`: shared helpers for the chapter — re-export `mc`, `ynQ`,
  `poolMC`, `poolYN`, `pick`, `shuffled`, `randInt` (import from `_shared.js` / `_exp.js`
  or copy `ynQ` — do not import EXP colours); plus: `crossSvg()` (the tick cross as a
  static card illustration, optional ticks), `astcWheelSvg()` (the bow-tie wheel with
  ① ② ③ ④ in her colours and A S T C words), `oahTable(stage)` (the O-A-H table at
  build stage 0–5: empty → O A H → 30 45 60 → row O → row A → row H), `circleFrame(deg,
  r)` (a point on a circle at a true angle — computed from cos/sin, to scale by
  construction — with the x/y drop lines and r labelled), `special45Spec()` /
  `special30Spec()` (triangle-graph specs with REAL coords: (0,0),(1,0),(1,1) and
  (0,0),(1,0),(1,√3); bottom-left angle 45°/60°, right angle bottom-right, top angle
  45°/30°, side labels 1, 1, √2 / 1, √3, 2 — exactly her layout in C2).
- `js/local-backend.js`: add gt1…gt13 to `QUEST_IDS`, and gt1–gt13 to `DEFAULT_OPEN`
  (local mode opens everything for testing — house rule).
- `supabase/schema.sql`: add the 13 rows to the quests seed, `('gt1','gtrig',false,80)` …
  `('gt13','gtrig',false,92)`, same `on conflict do nothing` block.
- `supabase/migration-gtrig-quests.sql`: NEW file, same shape as the equations one but
  **seeded CLOSED** (`is_open = false`, and the on-conflict update keeps `is_open` as it
  is: `set chapter = 'gtrig', sort = excluded.sort` — never re-open a quest she has
  closed). Header comment: what it adds, that it touches no learner rows, that she opens
  each round from admin as she teaches it. Do NOT run it anywhere.
- `js/concepts.js`: add `gtrigIntro`, `gtrigAstc`, `gtrigSpecial` cards (her voice; one
  idea each; an `.eg` line; the same HTML shape as the cards around line 1306).

## The three rounds

Every round is recap-sized (6–8 questions, `skills` array like `queses3-method.js`),
every skill has a fresh-sibling generator (pools of ≥ 3 items, or random values), every
answer is COMPUTED (`specialExact`, `astcSign`, `quadrantOf` — never hand-typed), decoys
filtered by value, hints in her words, `answerLabel` closes with her takeaway line.
`xpOnce: true` on all three quest defs (they earn XP the first time through only — the
play.js hook is already built; you just set the flag).

### gt1 — Introduction (discovery). Concept `gtrigIntro`. pp. 1–4.
Beats, each ONE question (reveal frames carry the teaching; the input is the check):
1. **The word.** reveal 3 frames: `tri → three`, `gono → angled`, `metry → measurement`
   (her colour breakdown, Part A1), then mc "So trigonometry is the study of…" →
   "angles and the angle relationships of triangles".
2. **Ratios only live in right triangles.** yesno — the statement in her boxed words.
3. **O, A, H follow θ.** `tap` on a to-scale triangle (triangle-graph engine, mode
   "side", random right triangle with θ at a random acute vertex, NO numeric labels):
   "Tap the side that is OPPOSITE θ" / "…ADJACENT to θ" / "…the HYPOTENUSE". Sibling =
   fresh triangle + fresh target. Her definitions as the hint ("across from" / "next
   to" / "across from the right angle").
4. **SOHCAHTOA cards.** reveal 3 frames (SOH blue · CAH purple · TOA green, her order),
   then mc "cos θ = ?" → `A/H` (decoys O/H, O/A, H/A). Sibling cycles sin/cos/tan.
5. **Where the ratios come from** — THE discovery beat. reveal mode "replace", 4 frames
   from `circleFrame()` at θ = 20°, 50°, 75°, 110° (same r), each frame captioned in her
   words ("as the point moves along the circle, the radius stays the same BUT the size
   of θ, the x-coordinate and the y-coordinate change"). Check: mc "What stays the same
   as the point moves?" → "the radius r" (decoys: x, y, θ).
6. **What each ratio means** (Part A5 — use her glosses, with spelling corrected:
   "complement of sin θ", "originates from the word tangent", "simultaneously"). mc
   "sin θ = ?" → `y/r` etc. (sibling cycles the three), and one yesno from her closing
   tan line ("as the x-value gets bigger, the y-value gets smaller and vice versa" —
   true).
7. **The check that matters:** mc — "Blip says: 'the sine is 0,6'. What does that
   number tell you on its own?" → "Nothing until you know the angle — a ratio only
   means something for its θ" (decoys: "the triangle's height is 0,6"; "θ = 0,6°";
   "r = 0,6"). answerLabel = her takeaway: fix the radius, move the point, watch x and
   y — the ratio IS the angle.

### gt2 — The Cartesian plane (discovery). Concept `gtrigAstc`. p. 5.
1. **The wheel card.** reveal 2 frames: `astcWheelSvg()` with ①②③④ in her colours;
   then the four words appearing anticlockwise from ① (All → Strippers → Take → Cash).
   Check: mc "Which word is quadrant ③?" → Take. Sibling cycles the four.
2. **The three graphs, colour-blocked** — ONE trig-graph spec (`type:"trigg"`, window
   0°–360°, `bands` = four 90° bands in ①yellow ②blue ③green ④pink at ~18% alpha), one
   curve at a time. Check: mc "Between 90° and 180° the cos curve is…" → "below the
   x-axis, so cos is negative there". Sibling: random fn × random band; answer computed
   from `astcSign`. The graph must not carry the answer as text (no sign labels).
3. **Tap the quadrants** (`tapcross`, multi): "Tap every quadrant where sin θ is
   positive" → [1,2]; sibling over fn × sign (6 combos), correct = `solutionQuadrants`
   / astcSign. hint: the story word order.
4. **Sign of one ratio in one quadrant:** mc "θ is in quadrant ④. tan θ is…" →
   "negative" (compute). Sibling random.
5. **Why** (her framing, Part B + A5): in ② x is negative and y positive, r always
   positive → mc "In quadrant ② cos θ = x/r is negative because…" → "x is negative and
   r is always positive". Sibling: the three ratios × ② / ③ / ④ with computed reasons.
6. **All positive where?** tapcross single: "Tap the quadrant where ALL three are
   positive" → [1]. (Pair it with "where only tan is positive" → [3], "only sin" → [2],
   "only cos" → [4] as the sibling pool.)
7. **Read the story backwards:** mc "sin is positive and cos is negative. Which
   quadrant?" → ② (compute the unique quadrant from two sign facts; sibling over all
   consistent pairs).

### gt3 — Special angles & identities (discovery). Concept `gtrigSpecial`. p. 6, p. 25.
1. **The two triangles first** (reveal, "stack"): frame 1 = the 45-45 triangle
   (triangle-graph, to scale, labels 1, 1, √2, angles 45°/45°); frame 2 = the 30-60
   triangle (1, √3, 2; 60° bottom-left, 30° top); frame 3 = ONE line in her voice on
   where they come from (default for flag F18 — e.g. "cut a square corner to corner and
   you get 45-45-90; cut an equilateral triangle straight down the middle and you get
   30-60-90"). Check: mc "In the 30-60-90 triangle, the side opposite 60° is…" → √3.
   Sibling over the six sides.
2. **Oats Are Healthy — the table, in HER order** (reveal "replace", 6 frames from
   `oahTable(0..5)`: empty table → O A H down the left → 30° 45° 60° across the top →
   row O `1 1 √3` → row A `√3 1 1` → row H `2 √2 2`). Check: mc "Read the table: the O
   value for 60° is…" → √3. NEVER a bare 9-value sin/cos/tan grid anywhere in this
   round.
3. **Pick the value** (×2 skills, the "one or two slides of questions"): mc
   "tan 30° = ?" → `1/√3` (UNRATIONALISED, flag F12 default), decoys from the other table
   ratios (by value — `1/√3` ≠ `√3/3` must NOT appear as a decoy, they are equal).
   Sibling over the 9 combinations; answers from `specialExact`. Hint: "pick the two
   letters SOHCAHTOA gives you, read them off the table".
4. **Quadrantal angles, read off the graph** (C4): show the sin OR cos curve 0°–360°
   (trig-graph, no bands), mc "cos 90° = ?" → 0; sibling over {0, 90, 180, 270, 360} ×
   {sin, cos}. The graph must not label the answer value at that point.
5. **tan identity + reciprocals** (C5, C6): mc "tan θ = ?" → `sin θ / cos θ`; mc
   "sec θ = 1 / ?" → cos θ with the "look at the 3rd letter" hint; sibling pool of 4.
6. **Masked identities** (her word, C6): mc "sin²θ + cos²θ = ?" → 1; mc "Which of these
   is a masked identity?" → `cos²θ = 1 − sin²θ` (decoys: `tan²θ = 1 − sin²θ`,
   `sin²θ = 1 + cos²θ`, `sin²θ − cos²θ = 1`); pool of ≥ 4 variants.

## Harness — fill `verify-gtrig.html` section 9
- Import `questDef` and the chapter from config; assert the gtrig block has 13 quests,
  gt1–gt3 `built`, gt4–gt13 not; `QUEST_DEFS` has gt1–gt3 and NOT gt4+ yet.
- For each of gt1–gt3, each skill: generate 300×; assert the question has a valid
  `type`, a prompt, a concept that `getConcept()` resolves, exactly one correct mc option,
  no decoy equal by value to the correct label (compare `specialExact` values for the
  table skills), `tapcross` corrects are sorted arrays, every `tap` question's graph
  passes `verifyTriangle`, every trigg spec passes `verifyTrig`, every prompt/option is
  free of ASCII hyphens-as-minus and of the words "seperately"/"compliment"/"covert".
- Render one sample of every skill that draws (triangles, the circle frames, the
  wheel, the banded graph, the O-A-H table stages 0–5) into the page so the foreman can
  LOOK (ids `s2-<skill>`).
- Check `schema.sql` and the migration file BOTH list gt1–gt13 (fetch the files as text
  and regex; the eqn pattern in verify-exam.html's SQL cross-check shows how).
- Also re-run: `verify-store.html`, `verify-dice.html`, `verify-exam.html`,
  `verify-trig.html`, `verify-tgraph.html`, `node verify-exam-modules.mjs` — all green.

## 375 px walk (you do it before reporting)
Open `http://localhost:5213/?local=1`, sign in with the local demo learner, Revision
tab → General Trig → play gt1, gt2, gt3 END TO END through the real UI (dispatch
`MouseEvent("click",{bubbles:true})` on options / hits; keypad where needed), at a 375 px
viewport. Assert: 0 console errors, every round reaches the results screen, the XP
awarded the FIRST time is > 0 and a REPLAY of the same round awards 0 XP (the xpOnce
rule — read the results screen's XP line), "Coming soon" on gt4–gt13. Report what you
saw, not what the code says.

## House rules
Never type words · real minus `−` · decimal comma · her spelling slips corrected in
learner copy, her words kept · no answer leaks in diagrams/tables · decoys filtered by
value · recap-sized rounds · do not touch the existing `trig` chapter, dice, Euclid,
sw.js, or any learner data · migration file written, never run.

## Report (your final message)
1. files created/changed, one line each; 2. harness totals (verify-gtrig + the
regression set); 3. the 375 px walk evidence (XP first time vs replay, console); 4.
judgement calls you made, one line each; 5. anything unfinished and why.
