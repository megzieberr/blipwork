# DICE session F — Finance pool + verify-finance harness (2026-08-23)

READ `sessions/DICE-COMMON.md` FIRST — it carries Megan's /go block, the recipe, the
method rule, the harness spec, the PNG review and the hard limits. This file only adds
what is specific to Finance.

## Chapter facts
- config.js chapter id **`finance`**, quests f1–f7, modules `js/quests/questf1-words.js`
  … `questf7-eff-nom.js`, exports `questF1` … `questF7`; maths in `js/finlib.js`;
  timelines drawn by `js/engine/timeline-graph.js` (`verifyTimeline(spec)` exists).
- DICE-AUDIT §3: 51 skills — 50 CLEAN, 1 CARE, 0 STATIC. A **pen-and-paper** chapter
  (DICE-PLAN), whose METHODS law already exists:
  `C:\Users\megzi\Desktop\Graad 12 Curro\FINANCE-METHOD.md` — ONE equation, never
  "start and stop", never round mid-question. Read it before touching any solution text.
- Skills per quest: f1 8, f2 8, f3 6, f4 7, f5 7, f6 7, f7 8 → median **7** = roundLength.
- Replace the stub `js/quests/dice-finance.js` (chapterId "finance") with the real pool.

## The one skill that needs real work: `f5.anyPoint`
It is entirely hardcoded ("R1 000 at T0 is worth R2 100,34 at T5 … same value at T4",
always `yes: true`). Generalise it IN PLACE in `questf5-timeline-build.js`:
- roll P (a round rand amount), an annual rate from the chapter's usual bands, T (4–6),
  a middle point k (1 … T−1); compute the T-value with `compoundAmount` and show it to
  2 dp in the prompt, exactly as the static wording does;
- keep the SAME shape (yesno + the timeline graph with the `?` at Tk) and the same
  teaching point (one value per date, both routes agree). Add an occasional FALSE case
  (about one roll in three) whose wrong claim is a real misconception — e.g. "forward k
  from T0 gives a DIFFERENT value from back (T−k) from T" phrased as a claim, or the
  back-move written with a plus exponent — so `yes` is honestly computed, never fixed;
- `answerLabel` / `hint` wording follows the existing sentences, numbers substituted;
  if you add a solution array, it follows FINANCE-METHOD.md (one equation).
- The timeline's dp-0 note in the code (the wide "R2 100,34" clipped at the edge) is a
  real constraint: keep amounts the engine can label; verify with `verifyTimeline` and
  the PNG review.
Optional, only if trivial: `f7.whichGrowsMore` hardcodes "10% p.a." on both sides —
roll the rate from the chapter's bands (the qualitative answer is rate-independent).

## `verify-finance.html` — NEW static harness (part of Megan's scope)
Finance has no harness at all today. Model it on `verify-patterns.html` /
`verify-trig.html`: for every quest f1–f7 and every skill, N=200 generations with the
generic shape / self-consistency / decoy checks from DICE-COMMON, PLUS an independent
recompute with `js/finlib.js` for the numeric skills where the rolled values are
recoverable from the question's own fields or text (ratePerPeriod, exponent, deposit
amounts, balance after deposit, hire-purchase totals, effective rate, moveMoney
expressions…). Timelines: `verifyTimeline` on every `graph` the chapter emits. Final
line `N/N checks passed`. Runs via `python tools/harness_run.py verify-finance`.

## `verify-dice-finance.html`
Per DICE-COMMON. Graph honesty = `verifyTimeline`. Recompute Part 2 can reuse the
helpers you write for verify-finance.html (import from a small shared module you
create, e.g. `js/quests/_finance-check.js`, or duplicate — your call, keep it honest).

## PNG review
`PYTHONIOENCODING=utf-8 python tools/shoot_dice.py finance 4`. Read every crop.
Watch specifically: timeline labels at 375 px (amounts clipped at the edges?), the
`tap` skill `f4.tapTarget` (does the sketch-click question make sense as dealt?),
`calc` skills' number pad with Rand amounts (comma decimal, dp), and that the method
link appears ONLY where real working exists.

## Report
Per DICE-COMMON §"Your report", plus: the exact `anyPoint` design you built (bands, the
false-case wording), and whether `whichGrowsMore` was parametrised.
