/* ============================================================
   EXAM FOCUS — the SKILL LIST. One ordered array per chapter: the tiles
   the chapter screen draws, in the order she agreed them.
   ------------------------------------------------------------
   This file is the ORDER and the LABELS, nothing else. The cards
   themselves live in js/exam/cards-<chapter>.js and are joined up by
   js/exam/index.js; a skill with no cards yet still appears here (it
   renders muted, "coming soon", and is not tappable — her ruling: the
   learner should see what is coming, not a hole).

   WHAT CHANGED ON 2026-08-23 (the Exam Focus build day —
   EXAM-BUILD-DAY.md, which is where this table comes from; that file is
   canonical and this one is typed FROM it, so a disagreement between the
   two is a bug here, not there):

     · Every chapter now ENDS with a `level-4` tile, "Level 4 ★ — the
       brave round" (her ruling 5). Levels 1–3 live on the normal tiles;
       the ★ questions are gathered onto the last one, so a learner
       drilling basics never meets a Level 4 by accident. `isLevel4Skill`
       below is the one place that name is spelled out in code.
     · algx is NEW — Algebraic Expressions, the Grade-10 revision chapter
       (her ruling 2), six tiles.
     · tgraph is NEW to Exam Focus — Trig Graphs, six tiles. Its first
       tile is the equations-only period/amplitude/range drill from her
       own worksheet (her ruling 8: no sketch on that one).
     · exp gains rational-exponents-numeric and surd-proofs.
     · eqn gains quadratic-solving, surd-equations and simultaneous.
     · func gains sketch, intersection, average-gradient and reflections.
     · gtrig gains special-angles and identities-undefined.
     · euclid is RE-CUT: the single `circle-geometry` tile is gone,
       replaced by bookwork-proofs / chords-and-angles / cyclic-quads /
       tangents (+ level-4), because the chapter is about to hold all
       four bookwork proofs and ~10 riders instead of two questions.
     · trig (2D Trig) is UNCHANGED and stays listed — but its chapter is
       out of js/config.js EXAM_CHAPTERS, so nothing here is reachable
       (her ruling 9: hidden for now, deleted never).

   Two names repeat across chapters on purpose — `inequalities`,
   `nature-of-roots`, `sketch`, `reduction`, `level-4` — because they
   really are different skills in different chapters (solving an
   inequality vs reading one off a graph). Skill ids only ever have to be
   unique WITHIN a chapter, exactly like quest ids.
   ============================================================ */

export const SKILLS = {
  /* ALGEBRAIC EXPRESSIONS — exam-only chapter, no drill rounds
     (js/config.js EXAM_ONLY_CHAPTERS). Grade 10 revision: this is where
     the learners sitting around 30% earn their marks. */
  algx: [
    { id: "expand",                    label: "Expand & simplify" },
    { id: "factorise-basics",          label: "Factorise: common factor, squares, trinomials" },
    { id: "factorise-advanced",        label: "Factorise: grouping & cubes" },
    { id: "fractions-multiply-divide", label: "Algebraic fractions: × and ÷" },
    { id: "fractions-add-subtract",    label: "Algebraic fractions: + and −" },
    { id: "level-4",                   label: "Level 4 ★ — the brave round" },
  ],

  /* EXPONENTS & SURDS */
  exp: [
    { id: "rational-exponents-numeric", label: "Rational & negative exponents (no calculator)" },
    { id: "exponent-expressions",       label: "Simplify exponent expressions" },
    { id: "exponential-equations",      label: "Exponential equations" },
    { id: "surds",                      label: "Working with surds" },
    { id: "rationalise",                label: "Rationalise the denominator" },
    { id: "surd-proofs",                label: "Surd “show that” & number tricks" },
    { id: "level-4",                    label: "Level 4 ★ — the brave round" },
  ],

  /* EQUATIONS & INEQUALITIES */
  eqn: [
    { id: "quadratic-solving",    label: "Solve quadratic equations" },
    { id: "fraction-equations",   label: "Fraction equations with restrictions" },
    { id: "surd-equations",       label: "Surd equations (check the false root)" },
    { id: "rational-exponents-k", label: "Rational exponents & k-method" },
    /* SESSION H (2026-08-23, her afternoon extension): the tile that goes
       with the new eq9 drill round, "Two, one or no solution?". It sits
       straight after rational-exponents-k because it is the same method
       one step deeper — that tile solves them, this one decides FIRST how
       many answers there are going to be. */
    { id: "solution-count",       label: "Two, one or no solution?" },
    { id: "simultaneous",         label: "Simultaneous equations" },
    { id: "inequalities",         label: "Inequalities" },
    { id: "nature-chain",         label: "Standard form → Δ → nature of roots" },
    { id: "k-equal-roots",        label: "Find k for equal roots" },
    { id: "k-for-nature",         label: "Values of k for a given nature" },
    { id: "delta-in-p",           label: "Δ in terms of p → prove real for all p" },
    { id: "level-4",              label: "Level 4 ★ — the brave round" },
  ],

  /* FUNCTIONS — the eight original tiles keep their ids and their order;
     four new tiles and the Level 4 tile follow them. */
  func: [
    { id: "find-equation",            label: "Find the equation" },
    { id: "asymptotes-domain-range",  label: "Asymptotes, domain & range" },
    { id: "intercepts-turning-point", label: "Intercepts & turning point" },
    { id: "axis-of-symmetry",         label: "Axis of symmetry" },
    { id: "shift",                    label: "Shift the graph" },
    { id: "inequalities",             label: "Inequalities" },
    { id: "nature-of-roots",          label: "Nature of roots" },
    { id: "distances",                label: "Distances" },
    { id: "sketch",                   label: "Sketch the graph" },
    { id: "intersection",             label: "Intersections (solve together)" },
    { id: "average-gradient",         label: "Average gradient" },
    { id: "reflections",              label: "Reflections" },
    { id: "level-4",                  label: "Level 4 ★ — the brave round" },
  ],

  /* TRIG GRAPHS — the chapter's drill rounds are tg1–tg7 (js/config.js
     CHAPTERS), so this is an ordinary quest chapter in Exam Focus: the
     teacher's open-quest gate applies on top of the build flag. */
  tgraph: [
    { id: "period-amplitude-range",     label: "Period, amplitude & range (equations only)" },
    { id: "read-parameters",            label: "Read a, b, p, q off the graph" },
    { id: "sketch",                     label: "Sketch the graph" },
    { id: "intersections-inequalities", label: "Intersections & inequalities" },
    { id: "shift-reflect",              label: "Shift & reflect" },
    { id: "level-4",                    label: "Level 4 ★ — the brave round" },
  ],

  /* GENERAL TRIG */
  gtrig: [
    { id: "co-functions",         label: "Co-functions" },
    { id: "special-angles",       label: "Special angles (no calculator)" },
    { id: "reduction",            label: "Reduction" },
    { id: "special-sums",         label: "Special Sums" },
    { id: "super-special-sums",   label: "Super Special Sums" },
    { id: "identities",           label: "Identities: prove" },
    { id: "identities-undefined", label: "Identities: undefined values" },
    { id: "general-solution",     label: "General solution" },
    { id: "level-4",              label: "Level 4 ★ — the brave round" },
  ],

  /* 2D TRIG — HIDDEN, not deleted (her ruling 9, 2026-08-23). The
     chapter is out of js/config.js EXAM_CHAPTERS, so this entry and its
     one card (js/exam/cards-trig.js) are unreachable in the app; both
     stay so that putting 2D Trig back is a one-word edit in config. */
  trig: [
    { id: "cosine-rule-area", label: "Cosine rule & area" },
  ],

  /* EUCLIDEAN — RE-CUT 2026-08-23. The old single `circle-geometry` tile
     is gone: the chapter is being built out to all four bookwork proofs
     plus ~10 riders, which is far too much for one tile. Her ruling 4:
     pen-and-paper, one sketch per card, mixed value/reason asks. */
  euclid: [
    { id: "bookwork-proofs",   label: "The four bookwork proofs" },
    { id: "chords-and-angles", label: "Chords, centre & angles" },
    { id: "cyclic-quads",      label: "Cyclic quadrilaterals" },
    { id: "tangents",          label: "Tangents" },
    { id: "level-4",           label: "Level 4 ★ — the brave round" },
  ],
};

/* The ordered tile list for a chapter — [] for a chapter with no skills
   yet, the same "empty until seeded" relationship the registry itself
   has with an unseeded chapter. */
export function skillsForChapter(chapterId) {
  return SKILLS[chapterId] || [];
}

/* THE ONE PLACE the Level 4 tile's id is spelled out (2026-08-23).
   js/screens.js uses it to render that tile last and full-width, and
   verify-exam.html Part 13 uses it to decide which side of the level
   wall a card is on. Every chapter's LAST tile is a level-4 one; the id
   repeats across chapters exactly like `inequalities` does. */
export function isLevel4Skill(skillId) {
  return skillId === "level-4";
}

function titleCaseSlug(slug) {
  return String(slug || "").replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

/* The label for one skill. Falls back to a title-cased slug so a card
   can never render a blank heading if a skill id ever gets ahead of
   this list. */
export function skillLabel(chapterId, skillId) {
  const found = skillsForChapter(chapterId).find(s => s.id === skillId);
  return found ? found.label : titleCaseSlug(skillId);
}
