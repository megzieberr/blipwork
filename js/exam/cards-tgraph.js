/* ============================================================
   EXAM FOCUS — SKILL CARDS · Trig Graphs (tgraph)
   (EXAM-BUILD-DAY.md, 2026-08-23 — Trig Graphs joins Exam Focus.)
   ------------------------------------------------------------
   EMPTY ON PURPOSE, for now. Session 0 (plumbing) creates the file and
   registers it so the chapter's six tiles and the whole navigation path
   exist and are green before any content lands; WAVE 2 SESSION E is the
   session that fills this array.

   Unlike euclid/eqn/exp/func, tgraph has NO seeded source questions to
   cut from — its cards are composed DIRECTLY as card objects (full
   question shape, no `source` field), id scheme `tgraph.sib.<abbr>.qN`
   and `tgraph.l4.qN`.

     · tiles: period-amplitude-range · read-parameters · sketch ·
       intersections-inequalities · shift-reflect · level-4
     · period-amplitude-range is her ruling 8: equations only, NO sketch
       on that tile — a list of equations, and only period / amplitude /
       range asked.
     · every OTHER tile's cards carry a `diagram` whose spec is
       `{ type: "trigg", … }`, drawn by js/engine/trig-graph.js through
       js/exam/trig-diagram.js's applyTrigHighlights (built by session 0
       — see that file's header for the highlight set).
     · lostQuest: tgraph is an ordinary quest chapter, so point it at the
       real round that teaches the skill (tg1–tg7, js/config.js CHAPTERS).
     · method: trig memos follow the textbook method with her stories in
       the hint/esplain (METHODS-trig.md).

   Every entry is validated at import by js/exam/index.js, so a broken
   card fails loudly the moment it is registered.
   ============================================================ */

export const tgraphCards = [];
