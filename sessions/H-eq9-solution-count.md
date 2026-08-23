=== MEGAN'S /go DELEGATION — 2026-08-23 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: Blipwork Exam Focus full build — all chapters (Algebraic Expressions,
  Exponents & Surds, Equations & Inequalities, Functions, Trig Graphs, General Trig,
  Euclidean): new tiles + sibling cards + Level 4 ★ tiles, Opus only, local commits
  only, one ship at the end of the day by the foreman. EXTENDED by Megan in chat
  (2026-08-23 afternoon): a new Equations drill round "eq9" teaching two / one / no
  solution for rational-exponent equations, from her attached notes, plus its Exam
  Focus tile.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (Blipwork)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===

# SESSION H — eq9 "Two, one or no solution?" drill round + Exam Focus tile (Opus)

## Her ask (verbatim, 2026-08-23 afternoon)
"Can we add this as a drill round in the equations tab please? My one grade 11 learner just
messaged me AGAIN regarding this, she keeps confusing herself. Have the drill round first
teach it and then about 10 questions where they just have to pick between two solutions
(= + or − answer), one solution, and no solution. And then we can maybe add a skill round
for that in the exam focus."

## Her notes (the method — LAW for this round). Source PDF:
`C:\Users\megzi\Desktop\Gr11 Exponents_260823_122526.pdf` (2 handwritten pages; render them
with PyMuPDF at ~110 dpi and READ the images — there is no text layer). Transcribed:

Page 1 — "Equations with rational exponents":
- Multiply with the reciprocal of the exponent ("switch numerator and denominator",
  3/4 × 4/3 = 1 cancels out).
- Box: x^(odd/even) or x^(even/odd) ≠ negative number. ∴ x^(½) ≠ −4 because 16^(½) ≠ −4,
  √16 ≠ −4 (cannot be negative only).
- Box: x^(even/1) = ± answer. ∴ x^(2/3) = 4 → (³√x²)³ = 4³ → √x² = √64 → x = ±8.
- "Important Notes" box (her three rules):
  • even numerator → ± answer   (x^(2/3) = 2 / x^(4/7) = 5)
  • only odd numbers in numerator AND denominator → ✓ negative answer allowed
    (x^(1/3) = −2 / x^(5/7) = −9)  🙂
  • even number in numerator OR denominator → ✗ negative answer (NO SOLUTION)
    (x^(½) = −3 / x^(4/3) = −4)  🙁
Page 2 — four worked examples, her layout exactly:
  1) x^(2/3) = 2 — "even in numerator = ± answer": (³√x²)³ = 2³ → √x² = √8 → x = ±2√2
  2) x^(5/7) = −9 — "odd numbers can be ⊖": (⁷√x⁵)⁷ = (−9)⁷ → ⁵√x⁵ = ⁵√(−4 782 969) →
     x = −21,67
  3) x^(4/3) = −4 — "even numerator cannot be ⊖": (³√x⁴)³ = (−4)³ → ⁴√x⁴ = ⁴√(−64) →
     "cannot happen"
  4) x^(½) = −3 — "even denominator cannot ONLY be ⊖": ²√x¹ = −3 ✗

The classification the round drills, for x^(p/q) = c (p, q positive, fraction in lowest
terms, c ≠ 0):
  c > 0 : p even → TWO solutions (±) · p odd → ONE solution
  c < 0 : p even → NO solution · p odd and q even → NO solution · p odd and q odd → ONE
          (negative) solution
Every generated question must be checked against that table by a pure function, and the
harness must sweep every (p, q, sign) combination.

## What to build

### 1. The drill round `eq9` in the Equations & Inequalities chapter
Read first: `CLAUDE.md`, `C:\Users\megzi\.claude\skills\add-chapter\SKILL.md` (her house rules
for new rounds), `js/config.js` (CHAPTERS → eqn quests list), `js/quests/index.js`,
`js/quests/_eq.js` (the shared builders: `mc`, `ynQ`, `pick`, `randInt`, `C`), TWO existing
eqn rounds end to end (`js/quests/queseq7-inequalities.js`, `queseq8-nature.js`) including
how their CONCEPT cards are wired (the `concept:` id on each skill → find where concept
cards live and how "teach first" theory cards render in a round), `js/local-backend.js`
(QUEST_IDS + DEFAULT_OPEN lists), `supabase/migration-equations-quests.sql` and
`migration-gtrig-reorder.sql` (the quests table shape + sort), `verify-eq.html`, and
`METHODS-algebra.md` A7/A14 (her rational-exponent method; note A14's even-numerator box).
- New file `js/quests/queseq9-solution-count.js` exporting `questEq9`. Teach FIRST: concept
  card(s) carrying her Important-Notes box (the three rules with her smiley/sad faces as
  text, her four worked examples in her layout, the reciprocal rule) — in her words.
  Then the drill: ~10 questions per round, each an `mc` with exactly THREE options in a
  fixed order: "Two solutions (a ± answer)" · "One solution" · "No solution". Fresh
  equations every round (pick p ∈ {1,2,3,4,5}, q ∈ {1,2,3,5,7}, lowest terms, c a small
  integer or a simple fraction, sign mixed so all three outcomes appear at least twice in
  any 10). The answer label explains WHY using her rule words ("even numerator → ± answer";
  "only odd numbers, so a negative answer is fine"; "an even number in the fraction with a
  negative answer — cannot happen"). Hints nudge with the rule, never the answer.
  One of the ten may ask the follow-up "and the solution is …?" as an `mc` of four values
  (e.g. x = ±8 / x = 8 / x = −8 / no solution) — optional, at most 2 of 10.
- `js/config.js`: add `{ id:"eq9", n:9, title:"Two, one or no solution?", blurb:"Rational-exponent equations: even numerator → ±, odd-only → a negative is fine, even anywhere with a negative → no solution.", built:true }`
  to the eqn quests list. `js/quests/index.js`: register. `js/local-backend.js`: add "eq9"
  to QUEST_IDS and DEFAULT_OPEN (local mode opens everything).
- `supabase/migration-eq9-solution-count.sql` — inserts the quest row **CLOSED**
  (`is_open = false`) with a `sort` that lands it right after eq8 (read the existing
  migrations to pick a free integer; if eq8 = 79 and 80 is taken, say so and choose the
  nearest consistent value — document the choice). Idempotent (`on conflict do update` with
  is_open left as is on re-run). NOT RUN by you — the foreman applies it at ship.
- `verify-eq.html`: add eq9 — every generated item has exactly 3 options, the correct one
  matches the pure classification table, 500 generations clean, all three outcomes appear,
  concept cards resolve. Run headless via `python -X utf8 tools/harness_run.py verify-eq`.
- Check `admin.html` lists the new round automatically (it should read CHAPTERS) — report.

### 2. The Exam Focus tile (eqn chapter)
- `js/exam/skills.js`: add `{ id:"solution-count", label:"Two, one or no solution?" }` to
  `eqn` immediately AFTER `rational-exponents-k` (before `simultaneous`). The level-4 tile
  stays last.
- `js/exam/eqn-siblings-solution-count.js` — 6 questions, levels 1–3, `lostQuest: {chapter:"eqn", quest:"eq9"}`,
  ids `eqn.sib.sc.qN`. Shapes: (a) "How many solutions does x^(2/3) = −4 have? Give a
  reason" [2]; a card with three equations as (a)(b)(c) "state whether each has two, one or
  no solutions, with a reason" [1 each]; "Solve x^(2/3) = 9" (two answers) [3]; "Solve
  x^(3/5) = −8" (one negative answer) [3]; "Solve x^(3/2) = −27" (no solution — say why)
  [2]; a "which of these equations has no solution, and solve the other" pair [5]. Memos
  follow her layout exactly (raise to the reciprocal, the ± line, her rule as the reason).
  Cut with makeCard in `js/exam/cards-eqn.js` (new section after rational-exponents-k; re-read
  the file before writing — nobody else is editing it now, but check). Add your module to
  `verify-exam-modules.mjs` (MODULES, EXPECTED_STARS, WALLS.eqn, a recompute block) and
  `verify-exam.html` (imports, SOURCES, EXPECTED_COUNTS.eqn 72 → 78, lostQuest map,
  TABLE.eqn) — these two files are shared with sessions still running: re-read before
  every write, additive rows only.
- Read `sessions/CONTENT-COMMON.md` for the card rules (schema, glyphs: real minus, decimal
  comma; fractions via fracHtml; no Afrikaans).

## Verify before reporting
`node verify-exam-modules.mjs` · `node verify-exam-fractions.mjs` · `python -X utf8
tools/harness_run.py verify-eq verify-exam verify-exam-skills` (a server is on :5191 — check
with curl; if not, `python -m http.server 5191` from the repo root and leave it running) ·
`python tools/shoot_round.py eq9` (read the round shots: the concept cards, three-option
items, answer labels at 375 px) · `python tools/shoot.py eqn solution-count` (read every
card). Make ONE contact sheet for the round (concept card + 3 items + 1 answered) and one
for the tile, in tools/_out/.

## Never
Commit, push, bump sw.js, run SQL, edit files outside the list above, write "Goed gedaan"
or any generic praise closer in learner text, mention AI/integrity anywhere.

## Report
Files changed · the classification table as implemented · harness counts · sheet paths ·
the sort value chosen and why · anything that didn't fit.
