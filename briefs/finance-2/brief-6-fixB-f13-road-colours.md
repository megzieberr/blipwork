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

# Worker 6 brief: Fix B, f13's equation lines wear their roads' colours

You are ONE worker doing ONE unit: in round f13 "Build the one equation", every rate
factor in every equation line takes the colour of the ROAD it comes from, so the kids
read the equation off the picture. Repo
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (GitHub Pages app
"Blipwork", Grade 11 maths, English, PUBLIC repo). Work on the current branch, commit
locally when done, never push. No wording changes, no new cards.

## Read first (and nothing heavier)
1. `CLAUDE.md` in the repo root: "Technical map", "How code loads", "Gotchas", "Working
   rules". Do NOT read STATUS-ARCHIVE.md, PROJECT-STATUS.md, `sessions/`, transcripts or
   the Tutoring Resources folder.
2. `FINANCE-PLAYTEST-2026-10-11-PLAN.md` §5 (this fix) and §1 (the `pow` helper worker 2
   added: a sup now sits inside every car).
3. Code: `js/quests/questf13-one-equation.js` whole (its term builder, the `.f13-eq`
   wrapper `EQ`, the `nw(...)` unbreakable units, how a scene's `roads` are ordered),
   `css/styles.css` lines ~445–465 (`.tl-road-0/1/2`, `.tl-roadlab-0/1/2`: the three road
   colours are hard-coded hex there), `js/engine/timeline-graph.js` where it assigns
   `rd.cls` (the road index that picks the colour), `js/quests/_finance-check.js` (the f13
   block: `f13ParseEq`, the `unsup` normaliser from worker 2), the f13 section of
   `verify-finance.html`.

## Her ruling (11 Oct 11:47)
In "Which line is the one equation?" each rate factor `(1 + 0,2/2)^10` takes its ROAD's
colour and `(1 + 0,16)^3` the other road's colour. The kids read the equation off the
picture. After the timeline fades (card 4 onward) the colours STAY in the equation lines:
that is the point.

## The fix
- **One source of colour.** Move the three hexes to CSS variables (`--road-0`, `--road-1`,
  `--road-2`) declared once where the engine's `.tl-*` rules live, and make
  `.tl-road-j{stroke:var(--road-j)}`, `.tl-roadlab-j{fill:var(--road-j)}` and the new
  `.eq-road-j{color:var(--road-j)}` all read them, so the drawing and the equation can
  never drift. Keep the exact current hex values.
- **Wrap each car.** In f13's term builder, every car (the bracket with its sup) is wrapped
  in `<span class="eq-road-j">…</span>` where `j` is the index of that car's road in the
  scene's `roads` array, the same index the engine uses for `rd.cls` (verify this in the
  engine; if the engine sorts or renumbers roads, use ITS numbering). The coloured span
  sits INSIDE the `nw(...)` unit and OUTSIDE the `<sup>`, so the unbreakable-term wrapping
  and the superscript both survive. Amounts keep their colour (no stop colours: her
  default).
- **Wrong options are coloured the same way.** Colour is never a hint: every option of a
  card wraps its cars by the same rule, so a decoy that uses the wrong road for a car
  shows that road's colour (the kids can SEE it is wrong against the picture, which is the
  teaching). Check that no option is the only one with a given number of colours, and
  that the correct option is never distinguishable by colour pattern alone across the
  four options (assert it in the checks for 200 rolls per family; if a family's decoy
  design makes that impossible, say so in the report rather than bending the decoys).
- **The checks keep parsing.** `unsup` (or `f13ParseEq`'s strip step) also removes
  `<span class="eq-road-\d">` / `</span>` before the regexes; nothing else in the parsers
  changes. `verify-finance`'s f13 assertions on label HTML (the `.f13-eq` regex at ~819,
  the `(A|P|\d[\d ]*)\(1` regex at ~846, the "a number never leaves its unit" DOM check)
  are updated to the new HTML where they break, never the rules they protect.
- The worked lines on the feedback side and the 📖 solution steps of f13 are coloured
  too (same builder). The f13 concept card in `js/concepts.js` has no timeline next to it:
  leave its examples uncoloured (her point is reading colour off a picture).
- f12 "Build the timeline" (worker 5) draws its roads with the same engine classes, so
  nothing to do there; f9's road labels in prose stay as they are.

## Verify (all green before you report)
Server as CLAUDE.md says (or reuse one on port 5191), `python -X utf8 tools/harness_run.py
verify-finance verify-dice-finance verify-steps-ux verify-wrap` green with the counts,
`verify-exam.html` headless → result line (673/673), `node verify-lazy-load.mjs` green.
Your own phone look (your context only): 390 and 360 px, `?local=1`, demo learner from
`tools/lazy_playthrough.py`, all 8 cards of f13 (`tools/shoot_round.py f13`): the colours
match the roads on cards 1–3 (sky / orange / lime as the CSS has them), stay on cards 4–8,
read clearly on the dark UI at 12 px, the `.f13-eq` size unchanged, no term split, the
sup still inside the coloured car. Open one f9 card and one f12 card to confirm their
roads still draw in the same colours after the variable move.

## Do not touch
`sw.js`, other rounds' text, `js/ui.js`, the decoy designs of f13, round ids/order,
PROJECT-STATUS.md, STATUS-ARCHIVE.md, `sessions/`.

## Commit
One local commit: `Finance Fix B: f13 equation cars wear their road colours (one CSS source
for roads and equations)` with a short body, ending
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never push.

## Report back (what the foreman reads first)
- `git show --stat HEAD`.
- The harness lines with counts.
- One example card: the four options as HTML (so the foreman can see the spans), and the
  colour-pattern assertion's result per family.
- Anything in this brief that did not match the code as you found it, and what you did.
