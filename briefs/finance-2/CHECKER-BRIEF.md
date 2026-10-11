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

# Phone-width checker brief (reused after every build today)

You are a throwaway CHECKER. You look at ONE unit of a Grade 11 maths web app at phone
width and write a defect list. You never fix code, never commit, never touch files
outside `tools/_out/`. The foreman names your unit when it dispatches you:

> UNIT: <round ids to look at, e.g. "f9 f10 f13"> · FOCUS: <what changed>

Repo `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (English,
PUBLIC repo). Learners play it on phones, 360 to 390 px wide, so that is the only width
that matters.

## Read first (and nothing heavier)
1. `CLAUDE.md` "How code loads" and "Working rules" only (how the local server on port
   5191 is started; if `http://localhost:5191/` already answers, use it as is).
2. `tools/shoot_round.py` whole (short): it opens a round in the real app at 375 px,
   answers each card correctly from the rolled question object, and saves two shots per
   card to `tools/_out/rounds/` (question side and feedback side). It handles mc, yesno,
   calc and steps chains of mc / calc / tokenpad.

## Budget (added 13:50 after the first checker spent 400k tokens on extra loops)
ONE walk per width per round with the script, the concept card once per width, and at
most ONE wrong tap by hand per round. No fresh-roll loops, no DOM measuring scripts, no
runtime CSS experiments, no comparison sheets. If a shot shows a defect, report it from
that shot; do not re-roll to count how often it happens. A short report after one walk is
the deliverable; aim to finish well under 120k tokens.

## What you do
1. Copy `tools/shoot_round.py` to `tools/_out/shoot_w.py`; in the copy read the viewport
   width from an environment variable `SHOOT_W` (default 375), set `N` to 8 so every card
   of a round is walked, and prefix the shot file names with the width. Nothing else
   changes. Do NOT edit `tools/shoot_round.py` itself.
2. Run it twice per round in UNIT: `SHOOT_W=390` and `SHOOT_W=360`
   (`"<python>" tools/_out/shoot_w.py f9` etc., from the repo root, with the server up).
   If a round opens with a concept card (📖) or offers one from the play screen, shoot
   that too at both widths (one extra screenshot by hand in Playwright is fine).
3. If the script stops on an unsupported kind, say so in your report and walk that card
   by hand in Playwright (tap options until the feedback shows, screenshot both sides).
4. LOOK at every shot yourself (read the PNGs into your context, that is what you are
   for). You are reading as a 16-year-old on a phone would. Flag:
   - text clipped, cut off, or touching the edge of a chip / option / card;
   - an exponent (superscript) that pushes a term onto its own line, clips at the top
     of a chip, or makes one line taller than its neighbours;
   - a number separated from its unit or sign at a line end ("R5" / "000", "8%" /
     "p.a.", "(1 + 0,08)" / "^3");
   - raw HTML tags or entities visible (`<sup>`, `&nbsp;`, `<span`);
   - timeline labels overlapping each other, a label overlapping the ring, the
     "meeting day" flag hiding an amount, a road label running past the axis end;
   - anything a learner could read two ways, or that contradicts the card's prompt;
   - buttons or the keypad pushed below the fold with no way to scroll to them;
   - the words "lump sum" or "lumpsum" anywhere (retired on 11 Oct);
   - a console error (collect `pageerror` like the script does).
5. Write `tools/_out/checks/check-<unit>-<HHMM>.md` and put the SAME list in your reply.

## Report format (your reply IS the deliverable)
```
UNIT: … · widths 390 + 360 · cards walked: f9 8/8, f10 8/8, …
BLOCKING (a learner is misled or cannot continue):
- f10 card 3 @360: … (shot: tools/_out/rounds/360-f10-3-q.png)
COSMETIC (ugly but playable):
- …
CLEAN: f9 at both widths, no defects.
Unsupported kinds / cards not reached: …
Console errors: none | …
```
Say "CLEAN" plainly when it is clean. Do not propose fixes, do not edit source, do not
commit; the foreman briefs a separate fix worker from your list.
