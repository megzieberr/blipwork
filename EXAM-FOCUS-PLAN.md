# EXAM-FOCUS-PLAN — the exam focus tab for Blipwork

## ⚠️ ADDENDUM — 2026-08-21 late night (session E rulings; these SUPERSEDE matching lines below)

Megan's live review of the shipped pilot produced four rulings. Where this
addendum conflicts with the original text below, THE ADDENDUM WINS:

1. **English-only for now.** The EN/AF toggle was built and then CUT the same
   night (her call: too much AF work without proper material). Seed all content
   EN-only; the schema keeps `af` optional and the pilot's dormant Afrikaans
   stays in place. AF returns when she supplies real Afrikaans material (next
   year, her word). The "EN+AF pairs from day one" ruling below is superseded.
2. **"I'm lost" reteaches, it doesn't hint.** Every seeded question carries a
   REQUIRED `lostQuest: {chapter, quest}` — the Blipwork round that teaches and
   drills its topic (schema-enforced; the harness checks the ids exist). The
   player shows a quiet link into that round, ONLY while the round is open —
   exam focus never opens a closed round (her gating ruling).
3. **Exam focus follows the teacher's gates.** A chapter's exam focus is
   reachable only when EXAM_CHAPTERS includes it AND at least one of that
   chapter's quests is open ("if Probability is closed, then the Probability
   Exam Focus rounds should also be closed"). `examChapterEligible()` in
   js/screens.js is the one shared rule.
4. **Content = practice-paper questions; her memo corpus is the method
   authority.** Her words: the tab is LITERALLY the questions from a practice
   paper, shown one by one, with the colour memo structure — composed with the
   SAME bank + recipe as her built papers (GR11-IEB-PAPER-BANK.md + survey,
   fresh numbers always). This supersedes the "future chapters get their digest
   before their questions are seeded" line below FOR EXAM FOCUS ONLY (the dice
   keeps its digest-first rule): the methods shown in her built paper memos are
   the source, so EVERY chapter is eligible, and where METHODS-algebra's two
   open flags touch a topic, the built memos win (both roads under OR).

Written 2026-08-21 from Megan's design conversation (the dice foreman day, while the
dice infrastructure built in the background). Status: **DESIGN APPROVED, build
scheduled for the day after the dice work finishes** — her words: "I will run that
tomorrow after we have finished the current work." Read this whole file before any
exam-focus build session.

## The idea in one paragraph

Megan's Grade 11 learners fail papers not because they can't do the maths but because
they are too afraid to *attempt* a paper — not trying feels safer than failing. The
exam focus tab is real pen-and-paper exam revision wearing a friendly face: instead of
a four-page paper, Blip sits next to ONE exam sub-part at a time. The maths happens in
the learner's exercise book; the app's whole job is pacing, hints, and taking the fear
away. The tab never marks anything — the learner works on paper, reveals the colour
memo, and marks themselves.

## Her rulings (2026-08-21 — all DECIDED, do not re-ask)

- **The app NEVER marks their method or answers.** No answer entry at all. Two buttons
  per part: **"Done! Show me the answer"** and **"I'm stuck, give me a hint"**. The
  learner checks their own work against the memo. They are 17; the responsibility is
  deliberately theirs.
- ⚖️ **NO POLICING.** A learner who taps "show me the answer" ten seconds in — "that is
  on them. I can't play police men." No timers, no lockouts, no minimum-effort gates,
  no dark patterns. The counter-move is making the reveal *worth reading*, not making
  the peek hard.
- **The reveal IS the colour memo** — the Gr12 house style her learners already love
  ("they say they can actually see where they went wrong"), ported to in-app HTML:
  question banner → the part restated → worked method with a ✓ on every mark-earning
  line → ANSWER bar → amber trap card. Reference PDFs:
  `Desktop\Graad 12 Curro\September Vraestel I\Sept-P1A-Memo-Colour-ENG.pdf` and
  siblings.
- **Common traps ride with every reveal** where a trap exists — the amber REMEMBER
  card pattern ("check both given facts — ten seconds, and you know the rest of the
  question is safe"). An early peek still hands the kid the trap.
- ⚖️ **"Esplain" is the in-app term — NOT a typo, do not "fix" it.** The **Esplain 🤔**
  button is the second layer for when the method alone is not enough: the full
  plain-words teaching voice (the connective prose between memo steps, expanded).
  Hint = before/while working. Memo = the reveal. Esplain = the deeper why.
- **Navigation: tab → chapter → topic.** e.g. Analytical Geo → Angle of inclination.
  Topic lists come from the paper bank's archetypes, sized by the bank's topic weights
  (the analytical chain gets more questions than angle of inclination).
- **Content is SEEDED, not generative.** Build sessions author complete exam-style
  questions the way the Gr12/Gr11 papers are built (blueprint → build → review), and
  those get seeded into the app. The dice stays the generative engine; exam focus is a
  curated shelf. The two tabs never touch each other.
- ⚖️ **Freshly composed only — the repo is PUBLIC.** Same archetypes, new numbers and
  contexts, exactly like the paper builds. Never verbatim IEB/vendor/Antwoord-Reeks
  text. Her Gr11 ruling "a very nice question may be reused with changed values"
  applies (2026-08-19).
- **Exam focus questions EARN XP** (her ruling, same day). Amount is server-decided
  like everything else and sized at kickoff — a full exam question outranks a quick
  round. It pays for the honest *attempt* (work → reveal → self-mark); there is no
  correctness signal and none is wanted.
- **NO Euclidean chapter — Circle Quest already is one.** Circle geometry has its own
  app with hundreds of rounds, reached from Blipwork's ⭕ tab, and its XP already
  flows back as diamonds through the Collect bridge. Exam focus covers the ten quest
  chapters only; do not build circle-geo content here.
- **The tab REMEMBERS progress** — quiet completeness per topic ("worked 4 of 9"),
  ticked forever, no scores and no percentages. Completeness, never performance.
- **EN+AF pairs from day one**, like the Gr12 memo pairs — every seeded question
  carries both languages (prompt, hint, memo, Esplain). AF wording follows her app
  rules: no "frase"; "Trek"/"Skuif" for drag, "Klik op" for taps; reasons in words.

## Design facts that fell out of the conversation (defaults, flag if changing)

- **One sub-part per screen, chains intact.** Exam questions are secretly small parts
  with the hard bit at the tail — showing (a) alone isn't dumbing down, it's how
  examiners think. Sub-answers that later parts reuse stay visible once revealed.
- **Level 4 parts carry the amber ★** (the Sept-memo convention) and the app says the
  quiet part out loud: "this one's a ★ part — bank the earlier marks first." Walking
  away from a (d)-part is exam skill, not failure.
- **The two marking laws print with every memo**, because they're the difference
  between honest self-marking and kids docking themselves marks a real marker would
  give: *accept any correct method* (her memos show routes under OR) and
  *follow-through* (a wrong value carried correctly still earns the next part's
  method marks). Speak her tick language: `✓a` answer · `✓ca` consequential accuracy ·
  `✓s/f` substitution/formula.
- **Blip frames the reveal as marking, not peeking**: "Grab your pen — mark your work
  like a marker would."
- **Pen and paper is the point.** The tab opens with "get your book and something to
  write with." Nothing in this tab is answerable inside the app, on purpose.
- **Worked solutions follow HER methods** — same law as the dice: for algebra parts,
  `METHODS-algebra.md`; finance, `Desktop\Graad 12 Curro\FINANCE-METHOD.md`; future
  chapters get their digest before their questions are seeded. TIP Chips, guns and
  helmets, divorce — never a textbook substitute.

## What a seeded question looks like (data, not prose in the UI code)

One module/JSON entry per question: `id`, `chapter`, `topic`, `marks`, source archetype
tag (which bank pattern it's composed from — for coverage tracking, never shown to
learners), then `parts[]`: prompt (HTML, real minus, decimal comma), marks, level
(1–4, ★ on 4), `hint`, memo blocks (typed: step-with-tick / answer-bar / trap-card),
`esplain` (plain-words walkthrough). Diagrams via the existing engines where a spec
can drive them (to-scale law holds) or as reviewed static SVGs where hand-drawn is
honest — never eyeballed either way.

## The paper bank is the framework

`Desktop\Eksamen Vraestelle\Gr11 IEB Nov\GR11-IEB-PAPER-BANK.md` + `survey\` files:
- **Archetypes = the coverage checklist** per chapter (the surd equation with the
  extraneous root, nature-of-roots ladders, the trig five-beat, "% within 1 SD"…).
- **Scope walls = hard bounds** (no annuities, no counting principle, no regression,
  trig graphs max two parameters). Nothing outside Gr11 scope may be seeded.
- **Topic weights /125 = how many questions each topic earns.**
- Euclidean geometry exists in the bank but has NO Blipwork chapter — see open
  questions.

## Engineering notes

- **Additive only.** New tab, feature-flagged per chapter like the dice; no existing
  round, save, or dashboard chip changes. Quests and dice untouched.
- **Supabase:** one additive table — per learner × question: parts opened, question
  completed, so a phone swap never loses their place and the topic page can show
  "worked 4 of 9". XP pays through a server-side RPC (amount server-decided, never
  client-named; double-submit rule: disable before await). Grants per the
  column-revoke house rules.
- **Harness, verify-style:** every seeded question checks — part marks sum to the
  question total, every part has hint + memo + esplain, every memo line's ticks sum to
  the part's marks, ★ exactly on Level 4 parts, glyph hygiene (real minus, decimal
  comma), diagram spec renders in-frame, no topic outside its chapter's scope wall.
- **Teacher dashboard:** nothing in v1 unless she asks — the tab is fear-reduction,
  not surveillance (same instinct as the stat-free dice ruling).

## What Megan supplies

- A vetting pass on every seeded question set before it ships — she is the examiner.
- The topic list per chapter (or a yes/no on a proposed one from the bank).
- Her Sept-scope steer if the pilot should chase the real test dates (see below).

## Build order (each its own session, her nod between)

0. **Infrastructure** — tab + chapter/topic navigation, the part player (Done/Stuck
   buttons, hint, memo reveal renderer in the colour-card style, Esplain), seeded-data
   shape, harness, feature flag all-off.
1. **Pilot topic seeded** — one chapter, one topic, a handful of questions, her
   phone-test before anything else moves. Suggestion (her call): pick from the
   September test scopes (T1: algebra + functions, 11 Sep) so the pilot lands where
   her real class is aiming this term.
2. Onwards topic by topic, paper-build sessions feeding the shelf.

## Open details (for the build kickoff — small, none blocking)

The four big open questions were answered by Megan the same day and moved up into
the rulings (XP yes · no Euclidean, CQ covers it · progress remembered · EN+AF
pairs). What genuinely remains:

- **XP amount** per exam question, and whether diamonds ride along at all.
- **Language switch mechanics** — where the EN/AF toggle lives (per learner setting
  vs per question), and whether it remembers the choice.
