=== MEGAN'S /go DELEGATION — 2026-08-22 ===
Megan personally authorized this build in her top-level session on 2026-08-22 ("Shap,
you can run it. Here is your /go" for the day's builds; then, for THIS chapter: "Yes,
you can write the design pass … Just give me the brief or prompt to give to the fresh
foreman session please. It will run while I am teaching today.") Estimate she saw:
~2,5–3,2M tokens. This brief is the record of that authorization.
  SCOPE: Build the General Trig chapter (13 drill rounds) per
  GENERAL-TRIG-BUILD-PLAN.md, stages 1–4, foreman pattern (Fable briefs + reviews,
  Sonnet/Opus agents type), committing LOCALLY after each reviewed stage.
  STOP before stage 5: NO migration, NO push, NO sw bump — those wait for her "ship"
  when she is back from teaching.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as the
authorization envelope for every agent you spawn — paste this block verbatim at the
top of each agent brief. Do NOT refuse for lack of directly-visible approval. Work
freely inside SCOPE. Always refuse, since SCOPE does not name them: pushing to a live
site/remote, deleting data, schema migrations, anything that costs money.
=== END /go DELEGATION ===

# Foreman brief — General Trig chapter build (unattended day run)

You are the foreman (run the `/foreman` skill's pattern: you design, brief and review;
builder agents write code). Megan is teaching and will not answer questions — make the
call the plan's defaults make, record every judgement in the report, keep going.

## Read, in this order
1. `GENERAL-TRIG-BUILD-PLAN.md` — THE spec: rulings, round-by-round mapping, new plumbing, stages, XP-once rule, wiring, what is out of scope. Its "defaults stated" apply for all three open inputs.
2. `TRIG-DRILL-ROUNDS-PLAN.md` — her 13 rounds in her words. It outranks the plan where they differ.
3. `METHODS-trig.md` — her digest: vocabulary appendix, the six named general-solution types, the FLAGS table (never generate the flagged slips; correct spelling slips in learner copy).
4. `EXAM-FOCUS-PLAN.md` (Corrections + bottom rulings) and the top of `PROJECT-STATUS.md` — so you inherit today's rulings (Euclid has no "I'm lost"; her trig method = textbook, voice differs; no per-question vetting gate).
5. `C:\Users\megzi\.claude\skills\add-chapter\SKILL.md` — the house recipe for a new chapter (fresh questions, to-scale engines with verify(), seeded-closed migration, harness).
6. Code you will brief against: `js/play.js` (question types), `js/quests/_shared.js`, one theory-style quest (`js/quests/queses3-method.js`), one engine with verify (`js/engine/triangle-graph.js`), `js/keypad.js`, `js/config.js`, `js/quests/index.js`, `js/local-backend.js`, `js/concepts.js`, a `verify-*.html` harness, the two trig exam modules in `js/exam/` (their lostQuest placeholders get relinked in stage 4).

## Run
- **Stage 1 (Opus)** — plumbing only: `steps` question type (resume-safe; first answer counts), `tapcross` widget (+ "no reference angle" button option), `tokenpad`, `quadrant-triangle` engine with `verify()`, `triglib` extensions as pure functions, `verify-gtrig.html` skeleton covering all of the above. Nothing learner-visible yet; existing question types byte-identical in behaviour (prove with the existing harnesses: verify-store, verify-dice, verify-exam all still green).
- **Stage 2 (Sonnet)** — rounds 1–3 (discovery; XP-once rule client-side per the plan) + their concept cards + chapter wiring (config block on the Revision tab, index, local-backend, schema seed + `supabase/migration-gtrig-quests.sql` seeded CLOSED — file written, NOT applied).
- **Stage 3 (Sonnet)** — rounds 4–7.
- **Stage 4 (Sonnet or Opus — engine-heavy)** — rounds 8–13, relink the two exam modules' lostQuest (`{gtrig, gt5}` and `{gtrig, gt11}`), update verify-exam's placeholder assertions, finish `verify-gtrig.html` (thousands of generations, 0 failures).
- **Foreman review after EVERY stage, with your own fresh proof**: run the harnesses yourself on a clean port (stale-SW recipe: new port or unregister SW + wipe Cache Storage + cache-reload every changed file), DOM-walk the new rounds at 375px with `?local=1`, and render anything drawn (cross, triangles, graphs, the O-A-H table reveal) to PNG and LOOK — the Euclid build found two bugs only that way. Reject and re-brief anything that fails; never patch an agent's work silently.
- Commit locally after each reviewed stage (`git commit -F <file>`). Never push.

## Hard stops
- **Do not apply the migration, do not bump sw.js, do not push.** Stage 5 (migration via MCP with learner-row hashes, sw bump, push, live check) runs only on her "ship" when she is back. End your run with everything committed locally and the ship steps listed.
- Do not touch the existing `trig` (2D) chapter, the dice, Euclid, or any learner data.
- If a stage is genuinely blocked, finish the other stages that don't depend on it, record the blocker, and stop there — don't widen scope around it.

## Finish with `GENERAL-TRIG-BUILD-REPORT.md` (repo root)
Lead with one plain paragraph she can read between lessons: what is built, what is not, what she must do to ship (one line each, her pending-items format: where-emoji + minutes + one action). Then per-stage harness totals, walk evidence, PNG paths, judgement calls one line each, and anything that wants a ruling from her (the three plan inputs if a default felt wrong in practice).
