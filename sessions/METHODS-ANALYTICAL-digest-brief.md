# Session AG — Analytical Geometry METHODS digest (wave 2, 2026-08-23 overnight)

READ `sessions/DICE-COMMON.md`'s /go block FIRST (top of that file) — it is your
authorization envelope. This session is **READ-ONLY on all app code**: you read her
PDF and the repo, and you write ONE new markdown file.

## The job
Analytical Geometry dice + exam content are blocked because no METHODS digest exists
(DICE-AUDIT §13: "Both also need their METHODS digest before recipes are written").
Megan supplied her material tonight:

  PDF: `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest\Gr11 Analytic Geometry_260603_100512.pdf`
  (228 pages, 22 MB — a scan. Read it with the Read tool's `pages` parameter,
  max 20 pages per request; you MUST work through ALL 228 pages, in order.)

Write **`METHODS-analytical.md`** in the repo root, modeled on `METHODS-trig.md`
(read its structure first — named methods, her exact language, F-flags). That file
was distilled from 68 pages of her notes and is the house standard.

## Rules (each has burned her before — do not bend them)
1. **Ground everything.** Every method, convention, formula variant and worked value
   carries its PDF page number(s). Never state a method the pages don't show. If a
   page is illegible or ambiguous, flag it (F-numbered flag, one line) — never guess.
2. **Her method IS the method.** Where the PDF's approach differs from the generic
   textbook route (order of steps, wording, what gets written down), the PDF wins.
   Capture the wording she actually uses (e.g. how she says gradient, inclination,
   parallel/perpendicular conditions, midpoint, distance, perpendicular bisector,
   collinearity, triangle/quad proofs, area).
3. **F-flags for her, sparingly.** Anything needing her one-line ruling (two
   conventions both appear, a symbol unclear, a method that seems to contradict the
   app's current ag1–ag7 content) becomes an F-flag at the bottom, one line each.
4. **Cross-check, don't edit.** Read `DICE-AUDIT.md` §9 (ag1–ag7) and skim the ag
   quest modules (`js/quests/questag*.js`). Where the app currently teaches
   something differently from the PDF, record it in a "Digest vs app" section —
   report only, change no app code.
5. The PDF is gitignored (`*.pdf`) and stays local — do not copy or move it.

## Hard limits
- Create `METHODS-analytical.md` only. No app code edits, no git commands, nothing
  live, no servers.

## Report (last thing you print)
1. The file path, its section list, and how many named methods it holds.
2. Page coverage: confirm all 228 pages were read; list any illegible ranges.
3. The F-flag count + the flags themselves (one line each).
4. The "Digest vs app" findings (one line each).
