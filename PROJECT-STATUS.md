# Project status — updated 2026-08-30 (🔍 FABLE AUDIT DAY: 2D Trig t3–t7 are step chains, 3 latent bugs fixed, dead code removed, this file split — ✅ SHIPPED sw v84, commit 8eafe83, LIVE-VERIFIED)

## How this file works (since 2026-08-30)
Head only. The full session-by-session history — every old entry, every old
Decisions list — moved VERBATIM to **STATUS-ARCHIVE.md** on her ask (this
file had hit 280 KB and every session paid to read it). Nothing was deleted;
that archive stays append-only. Keep THIS file short: when an entry here
stops being current, move it to the top of the archive instead of letting
it pile up. Durable laws also live in CLAUDE.md and the auto-memory.

## Where we are
- **Live** at https://megzieberr.github.io/blipwork/ on **sw v84** (shipped
  2026-08-30 on her "ship it", commit 8eafe83; Pages built in ~20 s and both
  trig harnesses ran GREEN against the live URL — 36/36 and 83/83). No SQL.
- 12 hub chapters (5 Term-3 + 7 Revision) + 2 exam-only; 🎲 dice on 8
  chapters; 📝 Exam Focus 7 chapters / 360 cards; 📈 Fun Functions strip;
  💬 feedback + 📄 papers live; 🔔 notifications LIVE (2 cron jobs, secrets
  set) — kids not opted in yet. Roster 20 (19 learners + megzieberr, still
  visible in the picker — her ruling keeps it until go-live). Class opt-in
  WhatsApp message went out 2026-08-27.
- 🧮 Calculator rounds 1–4 done (full fx-991ZA face, exact engine, Sum menu,
  editable table, `=` steps down the column). Blipwork is the MASTER copy;
  Stats Quest (graad9-statistiek) copies js/calculator.js verbatim.

## 🔍 2026-08-30 — THE AUDIT DAY (all local, sw v84 in tree)
Her brief: sweep for dead/stale code (my judgment), split the too-intense
2D Trig questions into build-the-answer steps, audit every round against
"phones only, guided discovery, must not feel like homework", split this
status file, and list the promised-but-not-done work.

**2D Trig t3–t7 are STEP CHAINS now** — the same treatment she gave round 2
on 08-27 ("they build the equation step by step each time"), same laws:
question/diagram/numbers unchanged, the worked solution became the answered
steps, MCs untouched. New shared builders in `js/quests/_trig.js`
(sines-on-top ratio, substituted cosine rule, rearranged cosine rule as a
REAL stacked fraction, area rule); t7's chains open on "which rule fits?".
Proof: **verify-trig-steps.mjs NEW 50/50** (4 200 chains, every step marked
through the app's own checkStep), verify-t2-steps 25/25, verify-trig.html
36/36, verify-dice-trig.html 83/83, all five rounds shot at 375 px and READ
— zero horizontal overflow, frames render as her stacked fractions.

**Three latent bugs found and fixed** (all pre-dated today):
1. 🎲 dice 2D-Trig showed "📖 Show me the method" on t2's step chains —
   play.js renders that link BEFORE step 1, so it handed the chain's answers
   over. dice-trig.js now has dice-gtrig's `methodEligible()` steps clause.
2. verify-dice-trig.html had been RED since 08-27 — its INPUT_LAW never
   learned "steps" (nobody re-ran it after t2's rebuild). It now validates
   chains and asserts no chain ever carries a method link.
3. `_trig.js` shuffled chips/options with raw `Math.random` — the only file
   in js/quests off the seeded `rng()`, so a dice round's seeded resume
   could re-order options. Both shuffles now ride js/rng.js.

**Tokenpad layout grew up** (js/tokenpad.js + css): a frame side holding one
"/" renders as a real stacked fraction (generalised from her 08-27 ☐/☐
ruling); long sides wrap ONLY before a + or − sign (the app-wide wrap law).
Before this, the cosine frames clipped off both edges of a phone.

**Dead-code sweep verdict: the repo is clean.** Full reference-graph scan +
unused-export scan. Deleted: `design/design-lab.html` (initial-commit design
experiment, superseded by the SL restyle) and `design/gtrig-briefs/review-png/
decode.py` (one-off build-day helper). Everything else flagged turned out
deliberate and documented (banked art, applied-migration history, her
art-source masters, harnesses). Library helpers with no callers were left
alone — deleting working maths helpers is churn, not cleanup.

**Phone-feel audit of the rest of the game:** every other chapter already
plays phone-only (mc/tap/calc/steps — no free text anywhere). Six rounds
elsewhere still carry the "whole working in one box" disease, milder:
stats q3 (outlier boundary), finance f6 (hire-purchase total) + f7
(eff↔nom), functions fn7 (max length), measurement m6 (find H — 3 skills),
probability p6 (tree combos). Same treatment is a per-chapter call for HER
— she has played and approved those chapters as they are.

## Decisions (append-only; entries before 2026-08-30 are in STATUS-ARCHIVE.md)
- 2026-08-30 (hers): **the game outside Exam Focus must be playable on the
  phone alone — guided discovery, puzzles, "not feel like they are actually
  doing math". Exam Focus stays the pen-and-paper place.** This is the bar
  every future round is audited against.
- 2026-08-30 (hers): intense multi-step questions get SPLIT into build-steps
  ("so the kids actually build the questions, not try to do everything in
  their head") — t3–t7 done today under it.
- 2026-08-30 (hers): dead-code deletions were delegated to the auditor's
  judgment; PROJECT-STATUS.md is head + archive from now on.
- 2026-08-30 (mine, flagged): tokenpad frames may stack any single-"/" side
  as a fraction and wrap sides only before a sign; `_trig.js` shuffles are
  seeded. Both follow existing laws rather than making new ones.

## 🏗️ 2026-08-30 (later) — SPLIT DAY: the six flagged rounds are chains too
Foreman day on her "run it" (~0,9M agent tokens, inside the 0,8–1,2M
estimate). Three Sonnet sessions, each foreman-reviewed before the next:
- **S1** stats q3 outBound (IQR → build-the-boundary pad → number) +
  prob p6 exactlyOneHead / biasedFindOther; mcStep/calcStep promoted to
  `_shared.js` (trig re-exports); dice-stats steps guard; verify.html
  grew its FIRST per-quest dispatch (62/62, 6 960 gens) + verify-prob
  52/52. Foreman catches: probability steps pin **tol 0,001** (the
  0,015 calcStep default is a trig allowance — it would have accepted
  0,25 for a true 0,24); one hint rewritten to state the arithmetic.
- **S2** finance f6 hpTotal (balance → which-formula → total) + f7
  effCalc (n → set-up → whole conversion in ONE go; her one-equation
  law kept, no rounded intermediate anywhere); dice-finance guard;
  verify-finance 146/146 + verify-dice-finance 89/89; the session
  itself fixed two latent harness bugs (corrupt() crash on steps, a
  method check that would false-flag every chain).
- **S3** functions fn7 maxLength (AB → which-parabola, dedupe-guarded →
  turning x → max) + measurement m6 ×3 (Pythagoras built on the pad;
  pyramid offers the FULL base as the tempting chip; mirror accepted
  only where addition commutes); dice-func guard; verify-func 75/75,
  verify-meas 69/69, verify-dice-func 89/89. Foreman trim: one hint
  spoke design-language ("decoy chip") — now learner words.
All committed locally (16fd938, c320579, + S3); every harness re-run by
the foreman first-hand; every new chain screenshotted at 375 px and READ.
⚠️ Flagged for a fix session: `tools/shoot_round.py`'s Next-button
locator is stale ("Continue →" now), so it only ever reaches a round's
first question — sessions verified via skills-filtered defs instead.

## ⏳ Pending on Megan
- 📱 5 min [whenever]: close + reopen Blipwork twice (sw v85), then one
  question each in stats q3, tree diagrams, hire purchase, eff↔nom,
  functions round 7 and measurement round 5 — they should all feel like
  the trig rounds do now.
- 🌐 1 line [your call]: megzieberr is still visible in the class name-picker
  (checked live 08-30) and the class invite went out 08-27 — say the word
  and I hide it (one SQL line, reversible).

## Next up
- ⚠️ (carried) THE VERY BIG BUILD she has in mind — still unnamed; ask what
  it is before picking anything else.
- Her call: give the six flagged rounds elsewhere the build-steps treatment
  (stats q3, finance f6/f7, functions fn7, measurement m6, probability p6).
- (carried) Wave-4 dice — each blocked on her: Analytical Geometry (14
  F-flags in the digest), Probability (her material for a digest),
  Measurement (engine ruling), Trig Graphs (Soek-die-fout in graph-quest).
- (carried) Fix batch: 💬 FAB overlap on Exam Focus, sheet Escape key, gtrig
  cosmetics (gt2.wheelWord etc. — listed in the gtrig build report).
- (carried) Worked-method content batch: 99 dice skills have answer-only
  solutions (Patterns' ~20 have the working sitting in answerLabel).
- (carried) CRON_SECRET tidy-up offer.
- Banked: the play.js method-link gate (render 📖 only once a chain is
  finished) — when it lands, delete the `q.type !== "steps"` clauses in
  dice-gtrig.js AND dice-trig.js.
