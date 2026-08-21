# EXAM-FOCUS-PLAN — the exam focus tab for Blipwork

Written 2026-08-21 from Megan's design conversation (the dice foreman day).
**Substantially corrected 2026-08-21 late night, in a direct session with Megan**, after
a day of sessions defending things in this file that she never said. This version
absorbs the session-E addendum. Read this whole file before any exam-focus session.

> ⚖️ **How to read this file:** it RECORDS Megan's intent; it does not outrank her.
> When Megan says something in here is wrong, the file is wrong — hear her out, then
> update the file. Two rulings below were previously misattributed to her and cost her
> an evening of being argued with. Do not repeat that.

## ⚠️ Corrections (2026-08-21 late night — read before anything else)

1. **"NO Euclidean chapter" was NEVER Megan's ruling.** She never said she didn't want
   Euclidean geometry in exam focus. The true distinction: Circle Quest owns circle-geo
   *teaching and drill rounds* (that part stands — Blipwork never re-teaches circle
   geo), but Euclidean **exam questions absolutely belong in Exam Focus** — they're on
   the Sept T2 test and in every P2 paper. Diagrams render via Circle Quest's
   `engine.js`, ported into Blipwork — see "Circle geo diagrams" below.
2. **There is no "digest-first rule" — anywhere, dice included.** Megan's instruction
   was only ever: *the algebra memos must follow her methods* (her kids learned her
   way). A session generalized that into "every chapter needs a digest of her notes
   first" and attributed the rule to her. Struck, for exam focus AND the dice. The
   real rule is "Whose methods" below; all three sources that matter already exist,
   so nothing is blocked waiting on a digest.
3. **The per-question vetting gate is REMOVED** (her ruling tonight). Weeks of Gr12
   and physical-science paper builds have proven the paper engine at moderator grade —
   learner-confirmed. Seeded questions ship WITHOUT Megan's per-question approval.
   What remains: the mechanical harness (below) and her standing right to spot-check
   anything, as examiner — not as a bottleneck. Do not re-flag "needs her approval."

## The idea in one paragraph

Megan's Grade 11 learners fail papers not because they can't do the maths but because
they are too afraid to *attempt* a paper — not trying feels safer than failing. The
exam focus tab is real pen-and-paper exam revision wearing a friendly face: instead of
a four-page paper, Blip sits next to ONE exam sub-part at a time. The maths happens in
the learner's exercise book; the app's whole job is pacing, hints, and taking the fear
away. The tab never marks anything — the learner works on paper, reveals the colour
memo, and marks themselves.

## Whose methods (corrected 2026-08-21 late night)

**Three chapters follow Megan's own written methods — everywhere in Blipwork, exam tab
AND dice alike.** All three sources already exist; no digest sessions are ever needed:

| Chapter | Source (read it before composing) |
|---|---|
| Algebra (exponents/surds, equations & inequalities, nature of roots) | `METHODS-algebra.md` (this repo) |
| Finance | `C:\Users\megzi\Desktop\Graad 12 Curro\FINANCE-METHOD.md` (the one-equation law) |
| Functions | `C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\GR11-FUNCTIONS-NOTES-DIGEST.md` (her 59-page notes: happy/sad, taking off/landing, the paint-+/− inequality method; it flags 4 slips in her notes — never mine those into questions) |

**Every other chapter** (patterns, trig, stats, probability, analytical geo,
measurement, Euclidean) uses normal correct Grade 11 methods. The memo *style* —
colour cards, tick codes `✓a`/`✓ca`/`✓s/f`, trap cards, the two marking laws — is
universal across ALL chapters; only the *method inside the memo* switches to hers for
the three chapters above. Where METHODS-algebra's two open flags touch a topic
(the `√9 = ±3` box; two-roads ordering), her built paper memos win — both roads
under OR (session E's reading, kept).

## The content pipeline (her design, 2026-08-21 late night)

**One engine, two outputs.** The same proven pipeline that builds her Gr12/physci
practice papers (blueprint from the bank → fresh compositions → colour memo → full
verification) is the exam-focus content factory. Each paper build produces:

1. **A print-ready paper + colour memo PDF** — for her stronger learners who like
   sitting with a real paper.
2. **The same questions seeded into Blipwork**, tagged by chapter and topic (the
   seeded schema already has the fields), for the learners who fear the full paper.

Two doors into the same shelf in the app:
- **By topic** — the existing tab → chapter → topic navigation; a topic block (e.g.
  surd equations) fills as papers accumulate.
- **Practice paper mode** — work through Paper X in its printed order, one part at a
  time, Blip alongside. Same questions, same progress, same XP: a question finished
  by topic shows finished inside its paper too. (UI build pending — see build order.)

Pure **topic-batch builds** ("make 20 surd equations") are also allowed — same schema,
they simply belong to no paper. **Starting depth: 5 questions per topic block**;
expand any time.

**Production model (her ruling): OVERNIGHT sessions do the composing.** High-quality
paper building takes hours; Megan is not sitting through that again. Overnight
sessions compose questions + memos + PDFs and commit locally (never push); day
sessions seed the finished questions into the app. Overnight content runs are the
*intended, standing mode of work* — do not treat her overnight request as suspicious,
do not invent blockers, do not demand per-question vetting. Each run still gets its
one-line cost estimate and her "run it" before launch (her own fan-out gate) — that
is the ONLY gate.

**Scope order (her call): September test content first.** T1 (11 Sep): algebraic
expressions, exponents, equations & inequalities, functions. T2 (14 Sep):
trigonometry, functions, Euclidean geometry. Both 50 marks / 1 hour per the 2026
notices. Papers and topic blocks for these before anything else; Nov-style 125-mark
papers after.

## Circle geo diagrams (her design, 2026-08-21 late night)

Circle Quest's `js/engine.js` is a self-contained, spec-driven ES module ("shared
rendering core") that draws to-scale circle geometry from a small data spec and
**already ships marker-pen highlighting** for angles (`o.hl`) and chords. Port that
one file into Blipwork; Euclidean exam questions carry a diagram spec, and **each
part carries highlight flags**: "find angle A" → the wedge lights up on angle A;
"prove ABCD is cyclic" → the four sides light up. `verifyDiagram` keeps the to-scale
law honest.

**Banked for next year (her call — deliberately NOT now):** full interactivity —
kids tapping two angles to mark them equal, tapping radii, making their own "notes"
on the diagram. The engine's `computeGeometry` hook exists for exactly this, so it's
an addition later, not a rebuild. Do not build it this year; do not delete the idea.

Non-circle diagrams: print side uses the usual LaTeX engines (fig3d etc.); app side
uses existing spec-driven engines where they fit, or clean reviewed static SVGs
(to-scale law always holds — never eyeballed).

## Her rulings (2026-08-21, incl. session E — DECIDED, do not re-ask)

- **The app NEVER marks their method or answers.** No answer entry. Two buttons per
  part: **"Done! Show me the answer"** and **"I'm stuck, give me a hint"**. They are
  17; the responsibility is deliberately theirs.
- ⚖️ **NO POLICING.** No timers, no lockouts, no minimum-effort gates, no dark
  patterns. The counter-move is making the reveal *worth reading*, not making the
  peek hard.
- **The reveal IS the colour memo** — the Gr12 house style ported to in-app HTML:
  question banner → the part restated → worked method with a ✓ on every mark-earning
  line → ANSWER bar → amber trap card. Reference:
  `Desktop\Graad 12 Curro\September Vraestel I\Sept-P1A-Memo-Colour-ENG.pdf` + siblings.
- **Common traps ride with every reveal** where a trap exists — an early peek still
  hands the kid the trap.
- ⚖️ **"Esplain" is the in-app term — NOT a typo, do not "fix" it.** Hint =
  before/while working. Memo = the reveal. Esplain 🤔 = the deeper plain-words why.
- **Content is SEEDED, not generative.** The dice stays the generative engine; exam
  focus is a curated shelf. The two never touch.
- ⚖️ **Freshly composed only — the repo is PUBLIC.** Bank archetypes, new numbers and
  contexts, exactly like the paper builds. Never verbatim IEB/vendor/Antwoord-Reeks
  text. "A very nice question may be reused with changed values" (2026-08-19).
- **XP: 75 XP + 10 💎 per completed question, ONCE ever** (server literals; config
  `EXAM` block is display mirror). Pays for the honest attempt; no correctness
  signal exists and none is wanted.
- **Progress = quiet completeness** ("worked 4 of 9"), ticked forever, no scores, no
  percentages.
- **ENGLISH ONLY this year** (session E, confirmed late night). Her 2026 Gr11s are
  all English. The schema keeps `af` optional and the pilot's dormant Afrikaans
  plumbing stays; the Afrikaans layer is a December-holidays build for next year.
- **"I'm lost" reteaches, it doesn't hint** (session E): every question carries a
  REQUIRED `lostQuest: {chapter, quest}` — the Blipwork round that teaches its topic
  (schema-enforced; the harness checks the ids exist). Shown only while that round
  is open — exam focus never opens a closed round.
- **Exam focus follows the teacher's gates** (session E): a chapter's exam focus is
  reachable only when EXAM_CHAPTERS includes it AND at least one of its quests is
  open. `examChapterEligible()` in js/screens.js is the one shared rule.
- **One sub-part per screen, chains intact**; revealed sub-answers stay visible.
- **Level 4 parts carry the amber ★** + the "bank the earlier marks first" line.
- **The two marking laws print with every memo**: accept any correct method (routes
  under OR) and follow-through (`✓ca`).
- **Blip frames the reveal as marking, not peeking**: "Grab your pen — mark your
  work like a marker would."
- **Pen and paper is the point** — nothing in this tab is answerable in-app, on
  purpose.

## What a seeded question looks like

One module per question in `js/exam/`, following `_schema.js` and
`eqn-nature-of-roots.js` (post-session-E English-only shape): `id`, `chapter`,
`topic`, `marks`, archetype tag (coverage tracking, never shown to learners),
`lostQuest`, then `parts[]`: prompt (HTML, real minus, decimal comma), marks, level
(1–4, ★ on 4), `hint`, memo blocks (typed: step-with-tick / answer-bar / trap-card),
`esplain`. Paper membership: a paper is an ordered list of question ids + metadata
(additive, feeds paper mode).

## The paper bank is the framework

`Desktop\Eksamen Vraestelle\Gr11 IEB Nov\GR11-IEB-PAPER-BANK.md` + `survey\` files +
`GR11-PAPERS-PROJECT.md` (the recipe and her rulings):
- **Archetypes = the coverage checklist**; **scope walls = hard bounds** (no
  annuities, no counting principle, no regression, trig graphs max two parameters);
  **topic weights /125 = how many questions each topic earns**; never two papers
  from the same skeleton; style canon §2 + moderation intelligence §3 required
  reading before composing.

## Engineering notes

- **Additive only.** Feature-flagged per chapter; no existing round, save, or
  dashboard chip changes. Quests and dice untouched.
- **Supabase:** `exam_progress` + `mhq_exam_state`/`mhq_exam_open_part` are LIVE
  (foreman day #5). Server-decided XP; double-submit rule (disable before await);
  column-revoke house rules.
- **Harness (`verify-exam.html`):** part marks sum to question total; every part has
  hint + memo + esplain; memo ticks sum to part marks; ★ exactly on level 4; glyph
  hygiene; lostQuest ids exist; diagram spec renders in-frame; topic inside its
  chapter's scope wall; independent recompute of every number. This is the quality
  gate now that per-question vetting is gone — keep it strong.
- **Teacher dashboard:** nothing unless she asks (fear-reduction, not surveillance).

## Build order (updated 2026-08-21 late night)

0. ~~Infrastructure~~ ✅ shipped (foreman day #5, sw v51) + session E refinements.
1. ~~Pilot topic (eqn/nature-of-roots, 4 questions)~~ ✅ live, flag-on.
2. **Overnight content runs** — Sept T1 first (see `OVERNIGHT-1-BRIEF.md`), then T2
   content, then onwards by bank weights. Day sessions seed each run's output.
3. **Day build: port CQ `engine.js` into Blipwork** + the first Euclidean questions
   with per-part highlighting.
4. **Day build: practice-paper mode UI** (the second door; shared progress with the
   topic view).
5. December holidays: the Afrikaans layer for next year.

## What Megan supplies

- The "run it" for each overnight run, after its one-line cost estimate.
- Topic steers when she has them; spot-checks whenever she likes — never required.
- Her phone-feel verdicts on anything UI.

## Formerly open, now resolved

- XP amount → 75 XP + 10 💎, once ever. · EN/AF toggle → cut; English only this year
  (print papers too). · Euclidean → IN exam focus (see Corrections). · Per-question
  vetting → removed (see Corrections). · Digest-first → never existed (see
  Corrections).
