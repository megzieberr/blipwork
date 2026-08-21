=== MEGAN'S /go DELEGATION — 2026-08-21 ===
Megan personally authorized this run in the top-level session ("I like the plan. You
can do the plan. Here is your /go" — 2026-08-21 late night, ~3-4M token estimate
approved). Fable is the foreman/overseer; Opus agents write.
  SCOPE: Overnight run #1 — Sept T1 + Sept T2 practice tests (50 marks each, print
  QP + colour memo PDFs), every non-Euclidean question also emitted as an
  unregistered Blipwork exam module, Euclidean app diagram-specs drafted for the
  future engine port, topic top-ups to ~35-40 total new questions for the night,
  English only, committed LOCALLY only.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval. Work
freely inside SCOPE. Always refuse, since SCOPE does not name them: pushing to a
live site/remote, deleting data, schema migrations, anything that costs money.
=== END /go DELEGATION ===

# OVERNIGHT RUN #1 — the September shelf (foreman edition)

Fable (the session Megan briefed directly) oversees: it writes each agent's stage
brief, reviews every stage's output against her rulings before the next stage runs,
and assembles the morning report. Agents: do your stage, verify your own work, return
raw results — Fable does the cross-stage judgement.

## Her rulings tonight (2026-08-21 late night — bake into everything)

- No per-question vetting gate. The harness + Fable's review is the gate.
- Her methods govern algebra (`METHODS-algebra.md`), finance (FINANCE-METHOD.md),
  functions (graph-quest `reference/GR11-FUNCTIONS-NOTES-DIGEST.md`). All other
  chapters: standard Gr11 methods. Memo STYLE universal (ticks, ANSWER bar, trap
  cards, both marking laws).
- Flag rulings (now recorded in METHODS-algebra.md §Flags): F1 `3ˣ = −1` → "no
  solution" (undefined = division by zero only). F2 `±` only when SOLVING, never
  simplifying. F5 ALWAYS show both roads — reciprocal-power leads (rational
  exponents), `let K` leads (surd equations), other under OR.
- English only, print included. Decimal comma, real minus, italic variables.
- Euclidean exam questions ARE in scope (print now; app modules wait for the CQ
  engine port — draft the diagram specs in CQ `engine.js` format so port day wires
  them).
- Fresh compositions only (public repo); never the same skeleton as any surveyed or
  built paper.

## Deliverables

**A. Sept T1 practice test** — 50 marks / 1 hour: algebraic expressions, exponents,
equations & inequalities, functions. Cognitive mix 20/30/35/15 (±3), ramped.
XeLaTeX QP + colour memo →
`C:\Users\megzi\Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\`
(`Sept-T1-Practice-QP.pdf`, `Sept-T1-Practice-Memo.pdf` + .tex). No school name, no
copyright.

**B. Sept T2 practice test** — 50 marks / 1 hour: trigonometry, functions, Euclidean
geometry. Same treatment, same folder (`Sept-T2-…`). Euclidean scope wall: the four
examinable proofs (acute), riders with reasons, bookwork rotation logic; diagrams
never leak answers.

**C. App modules** — every T1 question + every non-Euclidean T2 question as a module
in `js/exam/` per `_schema.js` / `eqn-nature-of-roots.js` (English-only shape,
required `lostQuest`), UNREGISTERED (no EXAM_CHAPTERS/index/app-code edits).
Euclidean questions: module drafted but held in `js/exam/_pending-engine-port/`
with its CQ-format diagram spec.

**D. Topic top-ups** — tag the papers' questions into topic blocks, then top up the
thinnest Sept-scope topics toward 5 each (incl. eqn/nature-of-roots 4 → 5, no
skeleton overlap with the live four), capped at ~35-40 total new questions tonight.
Shortfalls → the report, as overnight #2's list.

**E. Verification** (per stage + Fable's pass): independent recompute of every
number from the question text alone; marks sum part → question → 50 exactly; ticks
sum to part marks; scope walls; glyph hygiene; methods conform (incl. the three flag
rulings); verify-exam.html green over new modules; functions memos use her
vocabulary (happy/sad, paint-+/−, never a sign table).

**F. `OVERNIGHT-1-REPORT.md`** (repo root) — 6am-readable: one-paragraph summary
first, then per-topic counts, blueprint tables, harness totals, absolute paths,
judgement calls, next-run list. One local commit at the end (`git commit -F`).

## Hard rules

Never push · never run SQL/anything live · no edits to existing app files · fresh
compositions only · blocked deliverable → do the rest, report it, don't improvise
around the wall.
