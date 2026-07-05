# Project status — updated 2026-07-06

## Where we are
All 11 chapters built and LIVE (Term 3: Stats, Finance, Probability, 2D Trig, Measurement;
Revision: Functions, Trig Graphs, Analytical Geometry, Number Patterns, Exponents & Surds,
Equations & Inequalities). A full systematic QA review of every chapter shipped today
(commit 626db4a, 80 files, sw cache v25): every generator fuzz-tested 500–1500× with
independently recomputed answers, ~40 real bugs fixed (right-answer-marked-wrong tolerances,
decoys equal to the answer, answer leaks, 2–3-button MCs, broken prompts, graph-label
overlaps), ~18 new generators filling coverage gaps, 12 concept-card corrections.
All 10 verify-*.html pages PASS. Fuzz harnesses preserved in the session scratchpad pattern
(import quest module headlessly in node — works for every chapter).

## Decisions
- 2026-07-06: App identity = low-intimidation QUICK RECAP tool (revise the week's work /
  a fast round before past papers) — NOT a full homework session. Keep quests short and
  atomic; don't grow them into long worked-problem sets.
- 2026-07-06: Tap + keypad answering is deliberate and stays — marking is about maths,
  never spelling/handwriting.
- 2026-07-06: Calc tolerances are sized per-question from measured rounding drift of the
  printed solution's own method (e.g. t6 regularPolygon tol 0.5) — never tighten back to
  the 0.001 default without re-measuring.
- 2026-07-06: Casio-EXCLUSIVE quartiles stay in the calculator sim (matches the real
  fx-991ZA); quests/box plots keep the (n+1)/4 school method. Comment in calculator.js
  now says so.
- 2026-07-06: mc() in _shared.js keeps string-only de-dup by design; generators must
  self-filter decoys BY VALUE (all chapters now do — copy that pattern in new content).

## Pending on Megan
- Play through all rounds on the live site to eyeball wording/difficulty (her stated next
  step). Hard-refresh / close-and-reopen the PWA twice first so sw v25 loads.
- No SQL migrations this time — nothing to run in Supabase.

## Next up
- Fix anything her play-through surfaces.
- Optional future content (flagged by the review, keep recap-sized): Measurement numeric
  SA/volume quest; Analytical Geometry distance calculation; Functions "find the equation
  of the graph" quest; trig "prove/show" reason-type.
- Optional polish: ui.js pick() anti-repeat (same theory item can repeat within one
  playthrough); solid-graph engine label offsets (tall k·[3,4,5] cones + 16-base pyramids
  currently avoided by generators).
