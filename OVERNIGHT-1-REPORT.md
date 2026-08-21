# OVERNIGHT RUN #1 — morning report (2026-08-22, early hours)

**The short version:** you have two complete September practice tests — T1 (algebra +
functions) and T2 (trig + functions + Euclidean) — as print-ready question papers with
full colour memos in your house style, AND seventeen Blipwork exam-focus questions
sitting in the repo ready to be seeded: the eleven paper questions, plus six fresh
topic questions (nature of roots is now at its 5-question target). Every single number
was derived at least twice by independent routes (once by the writer, once by me or a
harness working only from the question text). Nothing is live, nothing was pushed, no
SQL ran — one local commit holds the night. Three small decisions wait for you below;
none are urgent.

## 📄 The papers (print these when you're ready)

Folder: `C:\Users\megzi\Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\`

- **Sept-T1-Practice-QP.pdf** (9 pp) + **Sept-T1-Practice-Memo.pdf** (12 pp) —
  50 marks / 1 h: expressions, exponents & surds, equations & inequalities, functions.
  Levels 18/32/34/16. Opens no-calculator, ends on a parabola-and-line ★ tail.
- **Sept-T2-Practice-QP.pdf** (12 pp) + **Sept-T2-Practice-Memo.pdf** (16 pp) —
  50 marks / 1 h: trig 21, functions 12, Euclidean 17. Levels 18/32/36/14. Bookwork
  proof = angle at centre (rotated away from your 2025 papers' tan–chord and
  cyclic-quad picks).
- Blueprints with full mark/level tables sit beside them (`Sept-T?-blueprint.md`),
  plus re-runnable verify scripts.

Your three flag answers are baked in everywhere: **no solution** (never "undefined"),
**± only when solving**, **both roads always with your road leading** — and they're
now recorded in METHODS-algebra.md's flag table too.

## 📱 The app questions (17 new modules, committed, NOT yet seeded)

All in `js/exam/`, all unregistered — invisible to the live app until a day session
wires them (each file header says exactly what registering needs):

- **5 modules = the T1 paper** (exp ×1, eqn ×2, func ×2), same working, ticks, OR
  routes and trap cards as the print memo, plus freshly written hints and Esplains
  in your voice.
- **4 modules = T2's trig + functions questions.**
- **6 fresh topic questions**: nature-of-roots #5 (the perfect-square Δ skeleton —
  the one rung your live four don't use), conjugates/rationalising, exponential
  equations (ends on the 2ˣ = −1 no-solution beat), fraction equation where a root
  genuinely dies, inequalities set, and a parabola find-the-equation set.
- **2 Euclidean modules** (T2's Q4 + Q5) wait in `js/exam/_pending-engine-port/`
  with their Circle-Quest-format diagram specs and per-part highlight notes drafted —
  they need the engine port day first.

Verification: **325/325 checks green** across all modules (schema, ticks = marks,
every number recomputed from the prompt text, glyphs, id uniqueness against the live
pilot). One real find: the T2 print memo had one wrong 4th decimal in a shown
intermediate value (83,4466 → **83,4465**; the final 139,08 was always right) — the
memo PDF is already fixed and rebuilt.

## ⏳ Pending on Megan (none block printing or the T1-side seeding)

- 💻 2 min **[blocks Euclidean seeding]**: Euclidean modules need a home — Blipwork
  has no Euclidean chapter, and the tab's gate rule ("chapter needs an open quest")
  can't pass for a chapter with no quests. Say how you want it (a small euclid
  chapter, an exception to the gate, or something else) and a day session builds it.
- 💻 1 min **[blocks the "I'm lost" links on 2 trig questions]**: nothing in Blipwork
  teaches reduction formulae or general solutions (the trig chapter is sine/cosine/
  area rule only). Those two questions ship safely with NO reteach link for now —
  say if you want new drill rounds built to link to.
- 🖨 whenever: print the two papers. Also say the word if you want trig graphs
  swapped into T2 (a clean 5-mark swap for Q6 is pre-designed) or the folder moved
  to `Graad 11 Curro`.

## Day-session work list (next sessions, in order)

1. Seed + register the 15 non-Euclidean modules (each file header lists the exact
   index/EXAM_CHAPTERS/harness touches; the harness has six pilot-era assertions to
   update, and `js/exam/index.js` still carries a stale "NO Euclidean, her ruling"
   comment that the corrected plan reverses — fix it the same day).
2. Port CQ `engine.js` → wire the two pending Euclidean modules (two known gaps are
   documented in their README: the right-angle square glyph, and one tangent-leg
   sign to check against verifyDiagram).
3. Practice-paper mode UI (both papers' modules already carry their paper tags).

## Overnight #2 menu (the unfilled shelves)

Exp: exponent-laws, rational-exponent equations, the huge-exponent k-method, surd
laws. Eqn: factorising, completing the square, formula, simultaneous. Func: four
families, reading-a-graph, transformations, average gradient, x·f(x)/f-over-g
inequalities, hyperbola symmetry-line specials. Trig: reductions + general solutions
depth, identities, the five-beat. Plus T2-side topic blocks and the T1 blueprint's
§6 untested-skills list. Same night shape: papers first, top-ups after.

— Fable, foreman. Token spend for the night ≈ 1,4M agent + review (inside the 3–4M
estimate).
