# Exam Focus → SKILL ROUNDS — stage 1 foreman brief (2026-08-22)

Fable foreman. Two build sessions (A = content, B = UI) run in parallel and must not
touch each other's files. Local commits only. NO push, NO SQL, NO migration, NO sw ship.

## Why (her words, 2026-08-22 evening)

She played Exam Focus and it felt "too sudden": a whole 5-part practice-paper question
dropped on a learner with no title saying what skill is being practised and no sketch.
The app is built for short repeated rounds (the Nature of Roots drills). So Exam Focus
becomes **skill rounds**: chapter → skill tiles → one short card at a time, then
"Another one!" / "That's enough for now". The 21 seeded questions are NOT wasted — their
parts become the first cards of each skill. Her drawing (verbatim shape):

```
Exam Focus screen          Functions screen (skill tiles, 2-col grid)
 [General Trig]              [Find the equation] [Domain and range]
 [Functions]                 [Asymptotes]        [Turning point]
 [Exponents and Surds]       [Axis of symmetry]  [Intersection]
 [Equations and Inequalities]

Tap a tile → straight into the first card (no list screen).
Card: "Find equation of hyperbola" · [Done!] [Hint…] [Walk]
After it's marked: [Another…] [Enough]   → Another = next card of the same skill
```

Her rulings (law for this build):
- Dependent parts stay together on ONE card as (a)/(b) — "if one question depends on
  another, keep them together". Independent parts split into their own cards.
- Learner decides when to stop — no finish line, no forced count.
- "Walk me through it" is a THIRD button: same memo, revealed one step at a time with a
  Next button. No new content.
- Euclidean stays ONE long continuous round (both questions whole, in order).
- 2D Trig is PAUSED (keep its one card, build nothing new for it).
- Proper stacked fractions everywhere in Exam Focus — no slashes (her side-quest ask).

## The agreed grouping (26 skills) — Session A implements EXACTLY this

Card id = `<source question id>.<part ids joined>` e.g. `func.hyp.t1q4.a`,
`eqn.nor.q1.abcd`. Order within a skill = the order listed here.

### eqn — Equations & Inequalities
| skill id | label | cards (source → parts) |
|---|---|---|
| nature-chain | Standard form → Δ → nature of roots | nor.q1 [a,b,c,d] · nor.q2 [a,b,c] |
| k-equal-roots | Find k for equal roots | nor.q2 [d] · nor.q3 [a] · fr.q1 [d] |
| k-for-nature | Values of k for a given nature | nor.q3 [b,c,d] |
| delta-in-p | Δ in terms of p → prove real for all p | nor.q4 [a,b,c,d] · nor.q5 [a,b,c,d] · ineq.t1q3 [b] |
| inequalities | Inequalities | ineq.t1q3 [a] · ineq.q2 [a] · ineq.q2 [b] · ineq.q2 [c] · ineq.q2 [d] |
| fraction-equations | Fraction equations with restrictions | fr.q1 [a,b,c] · km.t1q2 [b] |
| rational-exponents-k | Rational exponents & k-method | km.t1q2 [a] · km.t1q2 [c] |

### exp — Exponents & Surds
| skill id | label | cards |
|---|---|---|
| surds | Working with surds | fsm.t1q1 [a] · cr.q1 [a] · cr.q1 [b] · cr.q1 [c] |
| rationalise | Rationalise the denominator | fsm.t1q1 [b] · cr.q1 [d] |
| exponent-expressions | Simplify exponent expressions | fsm.t1q1 [c] · fsm.t1q1 [d] |
| exponential-equations | Exponential equations | nss.q1 [a] · [b] · [c] · [d] |

### func — Functions
| skill id | label | cards |
|---|---|---|
| find-equation | Find the equation | lp.q1 [a] · hyp.t1q4 [a] |
| asymptotes-domain-range | Asymptotes, domain & range | hyp.t2q3 [a] · hyp.t1q4 [b] · lp.q1 [c] |
| intercepts-turning-point | Intercepts & turning point | lp.q1 [b] · hyp.t1q4 [c] |
| axis-of-symmetry | Axis of symmetry | hyp.t2q3 [b] · hyp.t1q4 [d] |
| shift | Shift the graph | lp.q1 [d] · hyp.t2q3 [c] |
| inequalities | Inequalities | hyp.t1q4 [e] · hyp.t2q3 [c,d] |
| nature-of-roots | Nature of roots | lp.q1 [e] · hyp.t2q3 [e] · gt.t1q5 [c] |
| distances | Distances | gt.t1q5 [a,b] |

(hyp.t2q3 part c appears on TWO cards — the shift card on its own, and the inequalities
card where (d) needs h. That is deliberate: the two cards get different ids, so progress
is separate.)

### gtrig — General Trig
| skill id | label | cards |
|---|---|---|
| co-functions | Co-functions | rr.t2q1 [a] |
| special-sums | Special Sums | rr.t2q1 [b] |
| reduction | Reduction | rr.t2q1 [c] |
| general-solution | General solution | gs.t2q2 [a,b] |
| identities | Identities | (no card yet — tile still shows, reads "coming soon", not tappable) |
| super-special-sums | Super Special Sums | (no card yet — same) |

### trig — 2D Trig (PAUSED)
| cosine-rule-area | Cosine rule & area | mix.t2q6 [a,b] |

### euclid — Euclidean Geometry (one continuous round)
| circle-geometry | Circle geometry | circ.t2q4 [a,b1,b2] · tan.t2q5 [a,b,c,d] |

## Data shape (both sessions build to this — Session A owns the files, B consumes)

`js/exam/skills.js` (NEW, Session A):
```js
export const SKILLS = {
  eqn: [ { id: "nature-chain", label: "Standard form → Δ → nature of roots" }, … ],
  exp: [...], func: [...], gtrig: [...], trig: [...], euclid: [...],
};
export function skillsForChapter(chapterId)            // ordered array above, [] if none
export function skillLabel(chapterId, skillId)          // label or title-cased slug
```

A CARD is a question object that passes `validateQuestion()` unchanged (same schema —
id, chapter, topic, archetype, paper, marks, lostQuest, parts[], optional diagram) with:
- `topic` = the skill id (so `examTopicsForChapter` / `examQuestionsForTopic` keep
  working; `examTopicsForChapter` now returns the SKILLS order + labels, including empty
  skills, instead of deriving from registered questions),
- `source` = { questionId, partIds } (new optional field — add to `_schema.js` as
  optional, validated as shape only),
- `intro` (optional `{ en }`) — the GIVEN information a part leans on when its own
  prompt no longer carries it. E.g. hyp.t1q4 [b] "Write down the domain of h." needs
  "h is a hyperbola with asymptotes x = −2 and y = 1, through A(0 ; 4)…" as intro.
  Session A writes every intro by hand from the source stem. Rule: a card must read
  as a complete question on its own. A card whose first part already states the setup
  gets NO intro (don't say things twice).
- parts keep their original ids ("a", "b"…) and ALL original fields (prompt, hint, memo,
  esplain, marks, level). Part prompts are NOT reworded except: a prompt that starts
  with the paper's "<em>No calculator.</em>" / "Answer the WHOLE of this question…"
  line keeps it (it's real exam instruction), and a prompt that starts with "Hence"
  on a card where the previous part is NOT present gets "Hence" removed and the needed
  fact moved into `intro`. Check every single one.
- `marks` = sum of the included parts' marks.
- `diagram`: if the source has one, copy spec + ONLY the included parts' entries.
- `lostQuest`: copied from the source.

Registry (`js/exam/index.js`): REGISTRY now composes from `js/exam/cards-<chapter>.js`
(eqn, exp, func, gtrig, trig, euclid). The 18 source question files stay untouched and
are imported ONLY by the cards files (they are the content source of truth). The old
`examQuestionsForChapter` / `examQuestionById` / `examQuestionsForTopic` keep their
names and return CARDS. Add `examFirstCardForSkill(chapterId, skillId, progressMap)` →
first card whose progress row is not `completed`, else the first card, else null.

Progress: the server RPC `mhq_exam_open_part(u, p, question_id, part_id, total_parts)`
accepts ANY question id text (checked — `supabase/migration-exam-focus.sql` line 141),
so cards just use their card id. No SQL. Known consequence to REPORT, not fix: the
server pays a flat 75 XP + 10 gold per completed question id, so ~60 small cards pay
more than 21 big questions did. Her call later (a migration); note it in the report.

## Session A — CONTENT (Opus)

Files you own: `js/exam/skills.js` (new), `js/exam/_cards.js` (new helper:
`makeCard({ id?, skill, from, parts, intro })`), `js/exam/cards-{eqn,exp,func,gtrig,trig,euclid}.js`
(new), `js/exam/index.js`, `js/exam/_schema.js` (additive only), `verify-exam.html`
Parts 1/2/6/7/8/10/11 as needed PLUS a new **Part 12 · skill cards** , and
`verify-exam-modules.mjs` if it exists and breaks. Do NOT touch exam-play.js,
screens.js, app.js, css, lang.js, sw.js.

Done looks like:
1. Every card in the grouping table exists with the exact ids/order above; every card
   passes validateQuestion at import.
2. **Coverage check in Part 12**: every part of every one of the 21 source questions
   appears on ≥1 card; only hyp.t2q3 [c] appears on 2; card ids unique; each skill's
   cards in table order; SKILLS lists the 26 skills (+ trig + euclid) in table order.
3. **Intro check**: list in your report every card that got an intro, with the intro
   text, and every card you judged needs none. I will read each one.
4. **Stacked fractions**: `fracHtml` (js/ui.js) is applied at RENDER time by Session B,
   but it only catches the `a/b` shapes its regex knows. Your job: write a node script
   (`verify-exam-fractions.mjs`, repo root) that runs `fracHtml` + a stacked-check over
   every card's intro, prompts, hints, memo block text and esplain, and prints every
   remaining `/` that is NOT inside an HTML tag and NOT a date/URL. Fix the SOURCE text
   of any that fracHtml can't stack (rewrite the expression into a shape it handles, or
   use `stackFrac` directly in the string — a pre-built `<span class="sfrac">` is left
   alone by fracHtml). Goal: ZERO bare slashes reported. The 18 source files MAY be
   edited for this purpose only (fractions), nothing else.
5. `node verify-exam-modules.mjs` (if present) and verify-exam.html all green in a
   headless run (use the project's existing pattern — look at how GENERAL-TRIG-BUILD-REPORT.md
   ran verify pages). Report the count.
6. Commit locally: "Exam Focus skill cards: 26 skills, cards from the 21 seeded questions, stacked fractions".
7. End with: files changed, the intro list (item 3), the fraction report (item 4),
   anything in the grouping table that didn't fit and what you did about it.

## Session B — UI (Sonnet)

Files you own: `js/exam-play.js`, `js/screens.js` (exam parts only), `js/app.js`
(routes), `js/exam/lang.js`, `css/exam.css`, `sw.js` (bump CACHE to mhq-v56 — local
only, the ship is Fable's), and a NEW harness `verify-exam-skills.html` (copy the
structure of verify-exam.html Part 4/8; do not edit verify-exam.html). Do NOT touch
anything under `js/exam/` except lang.js. Build against the data shape above; until
Session A lands, stub `js/exam/skills.js` LOCALLY IN YOUR HARNESS ONLY (the harness
stub pattern from `js/exam/_harness-stub.js`), never by creating skills.js yourself.
Import `skillsForChapter`, `skillLabel` from "./exam/skills.js" and
`examFirstCardForSkill`, `examQuestionsForTopic` from "./exam/index.js".

1. **Chapter screen** (`renderExamChapter`): replace the topic cards with a 2-column
   grid of SKILL TILES in `skillsForChapter` order: label, then a small line "n cards"
   → after the progress round-trip "worked k of n". A skill with 0 cards renders
   muted, "coming soon", not tappable. Tapping a tile goes STRAIGHT to examPlay with
   `examFirstCardForSkill(...)` (no examTopic screen). Remove the examTopic route and
   `renderExamTopic` (and its chromeScreens entry) — dead code is not kept.
2. **Player head**: h1 = the skill label (not "Exam question"); under it
   "Card k of n · m marks". Back → the chapter screen.
3. **Intro**: if `card.intro` exists render it above the first part as a `.exam-intro`
   panel (same paper-white as diagrams, clearly "given" information).
4. **Stacked fractions**: run `fracHtml` then `formulaHtml` (js/ui.js) over intro,
   prompt, hint, every memo block text and esplain at render time, after `xbarHtml`.
   Add the `.sfrac` CSS to exam.css if it isn't global (check styles.css first).
5. **Walk me through it**: third button next to Done / I'm stuck:
   `t("walkBtn")` = "Walk me through it". Tapping it puts the part in walk mode: the
   memo's framing line (first card only) + memo blocks revealed one at a time, a
   "Next step →" button after each; hint + Done hidden while walking. When the LAST
   block is shown, call `api.examOpenPart` exactly as Done does (disable before await,
   same error path) — walking to the end counts as Done. After that the part renders
   as revealed (Esplain button etc). Walk state is local (never sent). If the learner
   leaves mid-walk nothing is recorded — fine.
6. **Another one! / That's enough for now**: when every part of the card is revealed,
   replace the "Question complete / Back" block with the reward (unchanged) plus two
   buttons: primary `anotherBtn` "Another one!" → the NEXT card in this skill
   (`examQuestionsForTopic` order, wrapping to the first with a toast "That's all of
   them — going round again"); ghost `enoughBtn` "That's enough for now" → chapter
   screen. If the skill has only one card, "Another one!" still shows and just replays
   it (toast as above).
7. Strings: add walkBtn, nextStep, anotherBtn, enoughBtn, cardOf (k, n), comingSoon,
   allSeen to lang.js (EN; AF entries mirror with her wording rules: "Klik op", no
   "frase" — "Nog een!", "Genoeg vir nou", "Lei my stap vir stap", "Volgende stap →").
8. No rAF loops, no observers, plain redraw (house rule). Double-submit rule on every
   backend-call button. Phone width: check nothing pushes the page sideways at 375px
   (the solution panel reason column was the offender last time).
9. `verify-exam-skills.html`: drives renderExamChapter and renderExamPlay against a
   harness skills/cards stub with the LocalBackend (`?local=1` pattern) and checks: tile
   grid order + coming-soon tile not tappable; tile tap lands on the first unworked
   card; head shows skill label + "Card 1 of n"; intro renders; a `12/13` in a stub
   prompt renders as `.sfrac`; Walk reveals blocks one per Next and the last Next
   records the part (progress row has it); Another goes to card 2, wraps at the end
   with the toast; Enough returns to the chapter screen; no console errors. Report
   the check count.
10. Commit locally: "Exam Focus skill rounds UI: tiles, Walk me through it, Another/Enough, stacked fractions (sw v56)".
11. End with: files changed, the harness count, and one screenshot-equivalent DOM dump
    of the player at 375px (outerHTML of `.exam-play` for one card) so the foreman can
    read it.

## House rules that bite here
- Never name a global `top`/`name`/`length`.
- "Klik op" for taps in AF; no "frase".
- Disable before await on every backend button.
- Don't cache-bust or push anything; Fable ships.
- No policing: nothing is ever marked; Walk/Hint never lock anything.
