=== MEGAN'S /go DELEGATION — 2026-10-11 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: Run the finance build queue in FINANCE-PLAYTEST-2026-10-11-PLAN.md §6: six
  workers, one unit each (renumber the one-equation round f12 → f13; Fix A real
  superscripts; f10 taught form only + jug-form archive; f8 the jug redesign; new f12
  Build the timeline; Fix B f13 equation colours), a phone-width checker after each
  build and a fresh fix worker where one finds something. Local commits only. Her words
  12:12: "Yebo, all looks good... run it". Shipping happens separately in the foreman
  session on her own yes.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (Blipwork)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===

# Worker 4 brief: f8 "Which one is the total?" becomes THE JUG round

You are ONE worker doing ONE unit: rebuild round f8 from this spec. Repo
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (GitHub Pages app
"Blipwork", Grade 11 maths, English, PUBLIC repo: textbook example names only, never a
real learner's name). Work on the current branch, commit locally when done, never push.

## Read first (and nothing heavier)
1. `CLAUDE.md` in the repo root: "Technical map", "How code loads", "Gotchas", "Working
   rules". Do NOT read STATUS-ARCHIVE.md, PROJECT-STATUS.md, `sessions/`, transcripts
   or anything in Tutoring Resources beyond the two files named below.
2. `FINANCE-PLAYTEST-2026-10-11-PLAN.md` §3 (the whole idea, in her words) and the
   "Standing rules" paragraph. §1 explains the `pow` helper in `js/finlib.js` (worker 2).
3. The approved mock-up: `briefs/finance-2/f8-jug-mockup.png` (phone width; concept card
   on top, the "tap the sentence" question below). Look at it once; it is the target.
4. Code: `js/quests/questf8-which-total.js` (the round you replace: keep its plumbing,
   `totalWordAt`, registration shape), `js/quests/questf13-one-equation.js` (its paragraph
   and scene makers are the model for fresh paragraphs: names, saving/loan/hire purchase
   shapes, `saveScene`), `js/quests/_shared.js` (`mc`, `mcStep`), `js/quests/_finance-check.js`
   (the f8 block), the f8 section of `verify-finance.html`, the f8 concept card in
   `js/concepts.js`, `js/engine/timeline-graph.js` header comment (spec: `role`, `label:"?"`,
   stacking, `roads`), `tools/shoot_round.py` docstring (the kinds it can drive).

## Her rulings (11 Oct 11:54–12:02; "absolutely perfect" on the mock-up)
- "Lump sum" literally means ONE PAYMENT in the textbooks, so the kids heard "a payment"
  every time. The word is retired. The app says **the total**.
- Definition the app uses: **the ONE amount that is worth the same as ALL the payments
  together, once they are all on the same day.** Payments are the many; the total is the one.
- The picture: **payments are coins, the total is the jug.** Savings: you fill the jug; the
  jug at the END is the total (A). Loan: the bank hands you a full jug at the START; that
  jug is the total (P); you pay it back coin by coin. Interest makes the jug (or the debt)
  grow. A withdrawal is a coin going out. The jug can end up smaller than a coin: it is
  still the jug.
- The test the kids keep: in the taught equation the total is the one that stands ALONE on
  its side; everything on the other side is a coin. In the paragraph, the total is the
  "has / borrows / wants to have" sentence (a state); coins are the "pays / deposits /
  withdraws" sentences (actions).
- A payment MAY land on the total's day (real exam shape). f8's job is to make total vs
  payment look like two different KINDS of thing first; so same-day paragraphs are fine in
  the words, and the only timeline in f8 shows the `?` in its ring with its role letter and
  NO coins placed.
- f8 asks in the WORDS first; the timeline only after. No tapping money labels on a
  timeline any more.

## Step 1: archive the 10 Oct round
`briefs/finance-2/ARCHIVE-f8-tap-label-2026-10-10.md`: the eight cards (`tapSavings`,
`recallPayments`, `tapLoan`, `tapSameDay`, `recallInterest`, `tapLoanBigRepay`,
`recallWhere`, `tapUnknownX`) with their learner wording and gens as in commits `66498aa`
+ `12018be` (paste the code, fenced), the old concept card, and two lines on why it was
rejected (her play 10 Oct 19:10: the total was drawn as a bare money amount among the
payments, the class's exact confusion). Add ONE pointer line near the top of
`C:\Users\megzi\Desktop\Tutoring Resources\Graad 11 Curro\Gr11 Finance Explainers\GR11-FINANCE-REDESIGN.md`
(under the f10 pointer worker 3 added; do not read or change the rest):
`> f8 tap-the-label round: built 10 Oct 2026, replaced by the jug round 11 Oct 2026, see maths-homework-quest/briefs/finance-2/ARCHIVE-f8-tap-label-2026-10-10.md`

## Step 2: the art (her jug, your masks)
Her drawing: `C:\Users\megzi\Desktop\Tutoring Resources\Graad 11 Curro\Gr11 Finance Explainers\Jug - Finance.png`
(measured by the foreman: 2000×2000 RGBA, transparent background, ONE pure-black outline
about 35 px thick, inside see-through, the body interior is one sealed region spanning
x 243–1453, y 122–1963 at 2000 px; the handle holes and the rim mouth are separate
regions). Do not redraw or "improve" it; her art is used as is.
- Copy the PNG into the repo as `art-source/finance/jug-outline.png` (source of record).
- Write `tools/jug_masks.py` that produces, at 512×512, two WebP files in
  `assets/finance/`: `jug-outline.webp` (alpha = the outline, colour irrelevant) and
  `jug-inside.webp` (alpha = the sealed interior region). Use the Python that has Pillow
  12.2 and scipy:
  `C:\Users\megzi\AppData\Local\Microsoft\WindowsApps\PythonSoftwareFoundation.Python.3.12_qbz5n2kfra8p0\python.exe`
  House trap: Pillow 12's `ImageDraw.floodfill` is a silent no-op; find the interior with
  `scipy.ndimage.label` on the non-ink pixels and take the region that contains the body
  centre (the foreman did exactly this and it works). Commit the script and both WebPs.
- Render in CSS: the outline is painted through `mask-image: url(assets/finance/jug-outline.webp)`
  in a light tint of the chapter colour (the mock-up's lavender; the chapter's `signature`
  is `PALETTE.violet`), so her black lines never show black on the dark UI. The FILL is a
  div behind it, masked by `jug-inside.webp`, whose painted height is the fill level in
  the chapter colour: savings fill partway (one visible rise per coin that goes in, a dip
  for a coin out); the loan jug is FULL, meaning up to just under the rim and never into
  the spout. Both jugs come from the one drawing. Use `-webkit-mask-image` too (iPhones).
- Coins: code-drawn circles (SVG or CSS) with a gold rim, a red rim when the coin goes
  OUT, SHORT labels ("5 000") or no number on the concept card. Arrows from coins to the
  jug as in the mock-up. The bank on the loan side is optional; a plain label "BANK" is
  enough.
- Do NOT edit `sw.js`. If the service worker precaches an asset list that should include
  the two WebPs, say so in your report (the foreman adds them at the ship).

## Step 3: the round (8 cards, all taps are mc so the harness and `shoot_round.py` can drive it)
Concept card first (the mock-up's top card), then:
- **Kind A+B+C, one paragraph as a steps chain of three mc steps** (the plan's kinds A, B,
  C in one card, so the words come before the picture every time):
  1. "Tap the sentence that is the jug." The paragraph cut into 3 to 5 sentence chips;
     exactly one is the total (a state: has / borrows / wants to have / owes); the rest are
     coins (actions: pays / deposits / withdraws) or rate-and-time sentences. Chips are mc
     options laid out as full-width sentence rows (use `layout` if `mc` supports a stacked
     layout; otherwise plain options are fine).
  2. "Savings or loan?" (mc, two options; hire purchase counts as a loan with a down payment).
  3. "Does the jug sit at T0 or at the end?" (mc: `T0` / `T<n>`). On the feedback side of this
     step the timeline appears: nodes T0..Tn, the `?` in its ring with its role letter (A at
     the end for savings, P at T0 for a loan), NO coins placed, no tap targets.
  Paragraph families (fresh gens, textbook names only, numbers fresh per roll): a saving
  with two deposits; a saving with a withdrawal; a saving with a target amount ("wants to
  have"); a loan with two repayments; hire purchase with a down payment ("down payment",
  never "deposit", for the money paid on day one); a loan where a repayment lands on the
  loan's own day (same-day: fine in words).
- **Kind D, recall: "Which of these is the jug?"** mc with FOUR short phrases, one jug
  (e.g. "she deposits R3 000", "he borrows R80 000", "she withdraws R4 000", "he pays
  R6 000 at T1"), fresh numbers, the jug phrase in a different slot each roll.
Dealing order (8 cards): paragraph (saving, two deposits), recall, paragraph (loan),
paragraph (saving with a withdrawal), recall, paragraph (hire purchase), paragraph
(target amount or same-day loan, alternate), recall.
Feedback: a wrong tap always says which KIND the tapped sentence is ("that is a coin:
money going in on its day" / "that is a rate-and-time sentence, not an amount") and never
the word "wrong". XP as the other finance rounds.
Words: "the total", "coin", "jug", "payment", "deposit", "withdrawal", "repayment", "down
payment". Never "lump sum" / "lumpsum", never "the A value", never "final answer".
Money and "p.a." carry literal U+00A0 and `nw(...)`; exponents (if any appear) through
`pow(...)`; no em-dashes anywhere in learner text.
Config: `js/config.js` f8 entry keeps `id: "f8", n: 8, title: "Which one is the total?"`;
new blurb: "Payments are coins, the total is the jug: find the jug in the words first."
Update the f8 concept card in `js/concepts.js` to the mock-up's text, with the two jugs
side by side (savings fills, loan full) and the captions as drawn.

## Step 4: checks
- `js/quests/_finance-check.js` f8 block: for every gen, exactly one chip is the jug and it
  is the state sentence; the savings/loan answer agrees with the paragraph; the jug's day
  is T0 for a loan and the last T for a saving; recall cards have exactly one jug phrase and
  four distinct phrases; names come from the textbook list; no learner text contains
  "lump", "A value", "final answer", "wrong"; the timeline spec of step 3 has one node with
  a role and `label: "?"` and no `tapLabels`.
- `verify-finance.html` f8 section rewritten for the new round (keep the f1–f13 recompute
  sweep intact); also a DOM render check at 360 px of the concept card: both jugs drawn,
  the outline mask applied (computed `mask-image` not "none"), no raw tags.
- Report the new verify-finance count and why it moved.

## Verify (all green before you report)
Start the local server as CLAUDE.md says, then:
1. `node verify-lazy-load.mjs` green.
2. `python tools/harness_run.py verify-finance verify-dice-finance verify-steps-ux verify-wrap`
   green, no page errors; `verify-exam.html` headless → read its result line (673/673).
3. Your own phone look (your context only, no screenshots pasted back): 390 and 360 px,
   `http://localhost:5191/?local=1`, demo learner from `tools/lazy_playthrough.py`, the
   concept card and all 8 cards (`tools/shoot_round.py f8` walks them). The jug outline must
   be visible in colour on the dark UI, the fill inside the body only (never in the
   handle), sentence chips not clipped at 360 px, the `?` ring readable.
4. `grep -rn -i "lump" js/quests/questf8-which-total.js js/concepts.js` → nothing.

## Do not touch
`sw.js` (never bump), other rounds, `js/ui.js`, round ids/order, PROJECT-STATUS.md,
STATUS-ARCHIVE.md, `sessions/`, her PNG (copy it, never edit it), GR11-FINANCE-REDESIGN.md
beyond the one pointer line.

## Commit
One local commit: `Finance f8: the jug round (coins = payments, jug = the total; her jug
drawing as masks; words before the timeline)` with a short body, ending
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never push.

## Report back (what the foreman reads first)
- `git show --stat HEAD`; the asset paths and sizes; whether sw.js's asset list needs them.
- The harness lines and the new verify-finance count with the reason it moved.
- One example roll of each paragraph family (the chips, the jug chip marked, steps 2–3
  answers) and one recall roll, plain text.
- Anything in this brief that did not match the code as you found it, and what you did.
