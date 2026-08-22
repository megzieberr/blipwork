/* ============================================================
   EXAM FOCUS — the SKILL LIST (EXAM-SKILLS-BRIEF.md, stage 1,
   2026-08-22). One ordered array per chapter: the tiles the chapter
   screen draws, in the order she agreed them.
   ------------------------------------------------------------
   This file is the ORDER and the LABELS, nothing else. The cards
   themselves live in js/exam/cards-<chapter>.js and are joined up by
   js/exam/index.js; a skill with no cards yet still appears here (it
   renders muted, "coming soon", and is not tappable — her ruling: the
   learner should see what is coming, not a hole).

   Two names repeat across chapters on purpose — `inequalities` and
   `nature-of-roots` exist under both eqn and func, because they really
   are different skills there (solving an inequality vs reading one off
   a graph). Skill ids only ever have to be unique WITHIN a chapter,
   exactly like quest ids.
   ============================================================ */

export const SKILLS = {
  /* EQUATIONS & INEQUALITIES */
  eqn: [
    { id: "nature-chain",         label: "Standard form → Δ → nature of roots" },
    { id: "k-equal-roots",        label: "Find k for equal roots" },
    { id: "k-for-nature",         label: "Values of k for a given nature" },
    { id: "delta-in-p",           label: "Δ in terms of p → prove real for all p" },
    { id: "inequalities",         label: "Inequalities" },
    { id: "fraction-equations",   label: "Fraction equations with restrictions" },
    { id: "rational-exponents-k", label: "Rational exponents & k-method" },
  ],

  /* EXPONENTS & SURDS */
  exp: [
    { id: "surds",                 label: "Working with surds" },
    { id: "rationalise",           label: "Rationalise the denominator" },
    { id: "exponent-expressions",  label: "Simplify exponent expressions" },
    { id: "exponential-equations", label: "Exponential equations" },
  ],

  /* FUNCTIONS */
  func: [
    { id: "find-equation",             label: "Find the equation" },
    { id: "asymptotes-domain-range",   label: "Asymptotes, domain & range" },
    { id: "intercepts-turning-point",  label: "Intercepts & turning point" },
    { id: "axis-of-symmetry",          label: "Axis of symmetry" },
    { id: "shift",                     label: "Shift the graph" },
    { id: "inequalities",              label: "Inequalities" },
    { id: "nature-of-roots",           label: "Nature of roots" },
    { id: "distances",                 label: "Distances" },
  ],

  /* GENERAL TRIG — the last two have no cards yet (her grouping table
     says so in as many words). They still show. */
  gtrig: [
    { id: "co-functions",        label: "Co-functions" },
    { id: "special-sums",        label: "Special Sums" },
    { id: "reduction",           label: "Reduction" },
    { id: "general-solution",    label: "General solution" },
    { id: "identities",          label: "Identities" },
    { id: "super-special-sums",  label: "Super Special Sums" },
  ],

  /* 2D TRIG — PAUSED (her ruling, 2026-08-22): it keeps its one card
     and nothing new gets built for it. */
  trig: [
    { id: "cosine-rule-area", label: "Cosine rule & area" },
  ],

  /* EUCLIDEAN — deliberately ONE skill holding one long continuous
     round: both questions whole, in order, exactly as she asked. */
  euclid: [
    { id: "circle-geometry", label: "Circle geometry" },
  ],
};

/* The ordered tile list for a chapter — [] for a chapter with no skills
   yet, the same "empty until seeded" relationship the registry itself
   has with an unseeded chapter. */
export function skillsForChapter(chapterId) {
  return SKILLS[chapterId] || [];
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
