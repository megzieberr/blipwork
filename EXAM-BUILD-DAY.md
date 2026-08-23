# EXAM-BUILD-DAY — 2026-08-23, "the Exam Focus gets full and complete"

Fable foreman day. Opus writes everything (her ruling: "Only use Opus today"). Local work
only; the foreman commits after reviewing each session; ONE ship at the end of the day
after her phone round. Read this whole file before any session — it is the tile map every
content session builds against and the rules every card follows.

## Her rulings today (2026-08-23 morning — DECIDED, do not re-ask)

1. **Exam scope is uncertain, so over-prepare.** Sept T1 (11 Sep): algebraic expressions,
   exponents & surds, equations & inequalities, functions. Sept T2 (14 Sep): trigonometry,
   functions, Euclidean geometry. "Functions" in T2 may mean trig graphs or ordinary
   functions — **both are built**. The kids really struggle with Functions.
2. **Algebraic expressions (Gr10 revision) gets its own exam-only chapter** — that is where
   the 30%-learners will earn their marks.
3. **New tiles AND siblings — everything missing gets built.** She agreed the gap list in
   full (tile map below).
4. **Euclidean: pen-and-paper, NOT interactive.** One sketch per card, 4–6 parts on THAT
   sketch; each revealed value is WRITTEN ONTO the sketch for the next part. Mixed asks
   like Circle Quest's adventure rounds: some parts give the value and ask only the
   reason; some give the reason and ask only the value; some ask both. All 4 bookwork
   proofs + ~10 riders. Reasons use the SAG short forms verbatim
   (`EUCLID-ACCEPTABLE-REASONS.md`). No "I'm lost" button (standing ruling).
5. **Levels 1–3 on the normal tiles; every chapter gets a last tile "Level 4 ★"** holding
   mixed Level-4 questions for that chapter. The low achievers must never meet a ★ while
   drilling basics. Existing ★ parts inside cards MOVE to the Level 4 tile.
6. **Trig memos = textbook method, with her stories** in hints/esplains (`METHODS-trig.md`).
   Algebra memos follow `METHODS-algebra.md`; Functions follow her notes digest.
7. **XP: 50 XP + 5 💎 per card** (was 75/10) — config mirror + a new migration, applied at
   ship time only.
8. **Trig Graphs: one tile asks ONLY period / amplitude / range for a list of equations,
   no sketch** (her worksheet: f(x) = cos 3x, g(x) = cos(x + 60°), h = cos x + 2,
   j = −½ cos x, p = sin 2x, q = sin(x − 45°), k = tan x − 1, t = −2tan 2x, m = −3cos ½x,
   n = 4sin x + 2, r = 2tan 3x + 3 — that shape, fresh equations).
9. **2D Trig is HIDDEN** from Exam Focus for now (`"trig"` out of `EXAM_CHAPTERS`; its card
   and skills entry stay in the code for later).
10. Cards inside a tile run **easiest first** (Level 1 → 3).
11. She reviews diagrams **in chat as contact-sheet PNGs** per batch; one ship at the end.

## The tile map (canonical — `js/exam/skills.js` is written FROM this, content sessions
## build TO it; ids are final, do not invent others)

Every chapter's LAST tile is `level-4`, label **"Level 4 ★ — the brave round"**.
Target: **6 cards per normal tile, 6–8 per Level 4 tile.**

### algx — Algebraic Expressions (NEW exam-only chapter, no drill rounds)
| id | label |
|---|---|
| expand | Expand & simplify |
| factorise-basics | Factorise: common factor, squares, trinomials |
| factorise-advanced | Factorise: grouping & cubes |
| fractions-multiply-divide | Algebraic fractions: × and ÷ |
| fractions-add-subtract | Algebraic fractions: + and − |
| level-4 | Level 4 ★ — the brave round |

### exp — Exponents & Surds
| id | label | today |
|---|---|---|
| rational-exponents-numeric | Rational & negative exponents (no calculator) | NEW |
| exponent-expressions | Simplify exponent expressions | fill to 6 |
| exponential-equations | Exponential equations | fill to 6 |
| surds | Working with surds | fill to 6 |
| rationalise | Rationalise the denominator | fill to 6 |
| surd-proofs | Surd "show that" & number tricks | NEW |
| level-4 | Level 4 ★ — the brave round | NEW |

### eqn — Equations & Inequalities
| id | label | today |
|---|---|---|
| quadratic-solving | Solve quadratic equations | NEW (factorise · formula · complete the square · "product = 0" incl. the x ∈ ℕ/ℤ/ℚ/ℝ question) |
| fraction-equations | Fraction equations with restrictions | fill to 6 |
| surd-equations | Surd equations (check the false root) | NEW |
| rational-exponents-k | Rational exponents & k-method | fill to 6 |
| simultaneous | Simultaneous equations | NEW |
| inequalities | Inequalities | fill to 6 (add a rational inequality) |
| nature-chain | Standard form → Δ → nature of roots | fill to 6 |
| k-equal-roots | Find k for equal roots | fill to 6 |
| k-for-nature | Values of k for a given nature | fill to 6 |
| delta-in-p | Δ in terms of p → prove real for all p | fill to 6 (L4 parts move out) |
| level-4 | Level 4 ★ — the brave round | NEW |

### func — Functions
| id | label | today |
|---|---|---|
| find-equation · asymptotes-domain-range · intercepts-turning-point · axis-of-symmetry · shift · inequalities · nature-of-roots · distances | (unchanged) | L4 parts move out; top up any tile that drops below 6 |
| sketch | Sketch the graph | NEW (from the equation; AND the rough sketch from sign conditions only) |
| intersection | Intersections (solve together) | NEW |
| average-gradient | Average gradient | NEW |
| reflections | Reflections | NEW (x-axis, y-axis, own asymptote) |
| level-4 | Level 4 ★ — the brave round | NEW (real-world parabola wrappers live here, plus the moved ★ parts) |

### tgraph — Trig Graphs (chapter exists with rounds tg1–tg7; NEW in Exam Focus)
| id | label |
|---|---|
| period-amplitude-range | Period, amplitude & range (equations only) |
| read-parameters | Read a, b, p, q off the graph |
| sketch | Sketch the graph |
| intersections-inequalities | Intersections & inequalities |
| shift-reflect | Shift & reflect |
| level-4 | Level 4 ★ — the brave round |

### gtrig — General Trig
| id | label | today |
|---|---|---|
| co-functions | Co-functions | fill to 6 |
| special-angles | Special angles (no calculator) | NEW |
| reduction | Reduction | fill to 6 |
| special-sums | Special Sums | fill to 6 |
| super-special-sums | Super Special Sums | NEW (0 → 6) |
| identities | Identities: prove | 0 → 6 |
| identities-undefined | Identities: undefined values | NEW |
| general-solution | General solution | fill to 6 (the six types of gt11) |
| level-4 | Level 4 ★ — the brave round | NEW |

### euclid — Euclidean Geometry (re-cut; the old single `circle-geometry` tile goes)
| id | label |
|---|---|
| bookwork-proofs | The four bookwork proofs |
| chords-and-angles | Chords, centre & angles |
| cyclic-quads | Cyclic quadrilaterals |
| tangents | Tangents |
| level-4 | Level 4 ★ — the brave round |

### trig — 2D Trig: HIDDEN (skills entry + its one card stay; chapter not in EXAM_CHAPTERS)

## Rules every card follows (content sessions)

- **Schema:** `js/exam/_schema.js` `validateQuestion()` — id, chapter, topic (= tile id),
  archetype, marks = Σ parts, lostQuest, parts[] with prompt/hint/memo/esplain, memo ticks
  sum to part marks (`a`, `ca`, `s/f`), trap cards carry no ticks. Real minus (−), decimal
  comma, HTML prompts. Fresh content = one module per tile (`<chapter>-siblings-<tile>.js`)
  exporting question objects, cut into cards by `makeCard` lines in `cards-<chapter>.js` —
  id scheme `<chapter>.sib.<abbr>.qN`, Level 4 `<chapter>.l4.qN` (`sessions/CONTENT-COMMON.md`).
- **Levels:** normal tiles hold parts of level 1–3 only. A Level 4 tile card holds the ★
  part(s) plus ONLY the lead-in parts it genuinely depends on. `intro` carries anything a
  card leans on that its own prompts no longer state. A card reads complete on its own.
- **Fresh compositions only — the repo is PUBLIC.** Bank archetypes, new numbers and
  contexts; never verbatim IEB / vendor / Antwoord-Reeks / textbook text.
- **Whose method:** algebra (algx, exp, eqn) → `METHODS-algebra.md` (algx's Gr10 factorising
  is not in her notes → textbook method, her voice: "tickets", "divorce", `∴` habit, the
  four no-answer words). Functions → `C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\GR11-FUNCTIONS-NOTES-DIGEST.md`
  (happy/sad, taking off/landing, cut lines + paint; never mine its 4 flagged slips).
  Trig (gtrig, tgraph) → textbook method in the memo, her story in hint/esplain
  (`METHODS-trig.md`). Euclidean → `EUCLID-ACCEPTABLE-REASONS.md` verbatim reasons.
- **Memo style:** question-restating framing is done by the player; memo = steps with a ✓ on
  every mark-earning line → ANSWER bar → amber trap card where a real trap exists. Both
  roads under OR where two methods are equally marked.
- **Sketches:** every card whose question would carry a figure on a real paper carries a
  `diagram` (function / trigg / quadtri / circle spec). THE REVEAL DRAWS WHAT IT FOUND;
  the question side never leaks the answer; every GIVEN line is captioned. Bare-figure rule
  for "find the turning point / find the label" parts.
- **Fractions:** write `a/b` shapes `fracHtml` (js/ui.js) knows, or pre-build with
  `stackFrac`; `node verify-exam-fractions.mjs` must report ZERO bare slashes for your files.
- **lostQuest:** the Blipwork round that teaches the skill (js/config.js CHAPTERS → quests).
  Exam-only chapters (euclid, algx) use the documented placeholder — no button renders.
- **Archetype tags** from the paper bank (`Desktop\Eksamen Vraestelle\Gr11 IEB Nov\GR11-IEB-PAPER-BANK.md`
  + survey files); scope walls are hard bounds (no annuities, trig graphs ≤ 2 parameters,
  Gr11 Euclidean = the four proofs, no concurrency).
- **Verify before reporting:** every module passes `validateQuestion` at import; add your
  modules to `verify-exam-modules.mjs` with an INDEPENDENT recompute of every number;
  `python tools/harness_run.py verify-exam` green; `python tools/shoot.py <chapter> <tile>`
  for every tile you touched and READ the crops yourself (labels through lines, reveal
  drawing nothing, axis letter under a curve = faults to fix before reporting);
  `python tools/sweep.py` A = 0, real C = 0, D = 0 is the standing bar.
- **Never:** commit, push, bump `sw.js`, run SQL, touch files another session owns.

## Session queue (foreman runs them as agents; reviewed one by one)

0. **Plumbing** (engineering, Opus) — `sessions/S0-plumbing.md`. Reviewed alone first.
1. Wave 1 (parallel, after S0 review; independent chapters/files): A algx · B exp ·
   F1 gtrig-part-1 · G1 euclid-part-1 · D1 func-new-tiles · E tgraph.
2. Wave 2 (after each chapter's part-1 review): C1 eqn-siblings · C2 eqn-new-tiles ·
   D2 func-reflections+level-4 · F2 gtrig-part-2 · G2 euclid-part-2.
3. Foreman: contact sheets to her per batch, review fixes, commits per reviewed session,
   whole-app sweep, status file, ship plan, ship on her yes.
Briefs: `sessions/CONTENT-COMMON.md` + one file per session in `sessions/`.
