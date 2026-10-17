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

import { L } from "../lang.js";

export const SKILLS = {
  /* ALGEBRAIC EXPRESSIONS — exam-only chapter, no drill rounds
     (js/config.js EXAM_ONLY_CHAPTERS). Grade 10 revision: this is where
     the learners sitting around 30% earn their marks. */
  algx: [
    { id: "expand",                    label: L("Expand & simplify", "Brei uit & vereenvoudig") },
    { id: "factorise-basics",          label: L("Factorise: common factor, squares, trinomials", "Faktoriseer: gemene faktor, vierkante, drieterme") },
    { id: "factorise-advanced",        label: L("Factorise: grouping & cubes", "Faktoriseer: groepering & derdemagte") },
    { id: "fractions-multiply-divide", label: L("Algebraic fractions: × and ÷", "Algebraïese breuke: × en ÷") },
    { id: "fractions-add-subtract",    label: L("Algebraic fractions: + and −", "Algebraïese breuke: + en −") },
    { id: "level-4",                   label: L("Level 4 ★ — the brave round", "Vlak 4 ★: die dapper rondte") },
  ],

  /* EXPONENTS & SURDS */
  exp: [
    { id: "rational-exponents-numeric", label: L("Rational & negative exponents (no calculator)", "Rasionale & negatiewe eksponente (sonder sakrekenaar)") },
    { id: "exponent-expressions",       label: L("Simplify exponent expressions", "Vereenvoudig uitdrukkings met eksponente") },
    { id: "exponential-equations",      label: L("Exponential equations", "Eksponensiële vergelykings") },
    { id: "surds",                      label: L("Working with surds", "Werk met wortelvorme") },
    { id: "rationalise",                label: L("Rationalise the denominator", "Rasionaliseer die noemer") },
    { id: "surd-proofs",                label: L("Surd “show that” & number tricks", "Wortelvorme: “toon aan dat” & getalkunsies") },
    { id: "level-4",                    label: L("Level 4 ★ — the brave round", "Vlak 4 ★: die dapper rondte") },
  ],

  /* EQUATIONS & INEQUALITIES */
  eqn: [
    { id: "quadratic-solving",    label: L("Solve quadratic equations", "Los kwadratiese vergelykings op") },
    { id: "fraction-equations",   label: L("Fraction equations with restrictions", "Breukvergelykings met beperkings") },
    { id: "surd-equations",       label: L("Surd equations (check the false root)", "Vergelykings met wortelvorme (toets vir die vals wortel)") },
    { id: "rational-exponents-k", label: L("Rational exponents & k-method", "Rasionale eksponente & k-metode") },
    /* SESSION H (2026-08-23, her afternoon extension): the tile that goes
       with the new eq9 drill round, "Two, one or no solution?". It sits
       straight after rational-exponents-k because it is the same method
       one step deeper — that tile solves them, this one decides FIRST how
       many answers there are going to be. */
    { id: "solution-count",       label: L("Two, one or no solution?", "Twee, een of geen oplossing?") },
    { id: "simultaneous",         label: L("Simultaneous equations", "Gelyktydige vergelykings") },
    { id: "inequalities",         label: L("Inequalities", "Ongelykhede") },
    { id: "nature-chain",         label: L("Standard form → Δ → nature of roots", "Standaardvorm → Δ → aard van die wortels") },
    { id: "k-equal-roots",        label: L("Find k for equal roots", "Vind k vir gelyke wortels") },
    { id: "k-for-nature",         label: L("Values of k for a given nature", "Waardes van k vir 'n gegewe aard") },
    { id: "delta-in-p",           label: L("Δ in terms of p → prove real for all p", "Δ in terme van p → bewys reëel vir alle p") },
    { id: "level-4",              label: L("Level 4 ★ — the brave round", "Vlak 4 ★: die dapper rondte") },
  ],

  /* FUNCTIONS — the eight original tiles keep their ids and their order;
     four new tiles and the Level 4 tile follow them. */
  func: [
    { id: "find-equation",            label: L("Find the equation", "Vind die vergelyking") },
    { id: "asymptotes-domain-range",  label: L("Asymptotes, domain & range", "Asimptote, definisie- & waardeversameling") },
    { id: "intercepts-turning-point", label: L("Intercepts & turning point", "Afsnitte & draaipunt") },
    { id: "axis-of-symmetry",         label: L("Axis of symmetry", "Simmetrie-as") },
    { id: "shift",                    label: L("Shift the graph", "Skuif die grafiek") },
    { id: "inequalities",             label: L("Inequalities", "Ongelykhede") },
    { id: "nature-of-roots",          label: L("Nature of roots", "Aard van die wortels") },
    { id: "distances",                label: L("Distances", "Afstande") },
    { id: "sketch",                   label: L("Sketch the graph", "Skets die grafiek") },
    { id: "intersection",             label: L("Intersections (solve together)", "Snypunte (los saam op)") },
    { id: "average-gradient",         label: L("Average gradient", "Gemiddelde gradiënt") },
    { id: "reflections",              label: L("Reflections", "Refleksies") },
    { id: "level-4",                  label: L("Level 4 ★ — the brave round", "Vlak 4 ★: die dapper rondte") },
  ],

  /* TRIG GRAPHS — the chapter's drill rounds are tg1–tg7 (js/config.js
     CHAPTERS), so this is an ordinary quest chapter in Exam Focus: the
     teacher's open-quest gate applies on top of the build flag. */
  tgraph: [
    { id: "period-amplitude-range",     label: L("Period, amplitude & range (equations only)", "Periode, amplitude & waardeversameling (net vergelykings)") },
    { id: "read-parameters",            label: L("Read a, b, p, q off the graph", "Lees a, b, p, q van die grafiek af") },
    { id: "sketch",                     label: L("Sketch the graph", "Skets die grafiek") },
    { id: "intersections-inequalities", label: L("Intersections & inequalities", "Snypunte & ongelykhede") },
    { id: "shift-reflect",              label: L("Shift & reflect", "Skuif & reflekteer") },
    { id: "level-4",                    label: L("Level 4 ★ — the brave round", "Vlak 4 ★: die dapper rondte") },
  ],

  /* GENERAL TRIG */
  gtrig: [
    { id: "co-functions",         label: L("Co-functions", "Ko-funksies") },
    { id: "special-angles",       label: L("Special angles (no calculator)", "Spesiale hoeke (sonder sakrekenaar)") },
    { id: "reduction",            label: L("Reduction", "Reduksie") },
    { id: "special-sums",         label: L("Special Sums", "Spesiale Somme") },
    { id: "super-special-sums",   label: L("Super Special Sums", "Super Spesiale Somme") },
    { id: "identities",           label: L("Identities: prove", "Identiteite: bewys") },
    { id: "identities-undefined", label: L("Identities: undefined values", "Identiteite: onbepaalde waardes") },
    { id: "general-solution",     label: L("General solution", "Algemene oplossing") },
    { id: "level-4",              label: L("Level 4 ★ — the brave round", "Vlak 4 ★: die dapper rondte") },
  ],

  /* 2D TRIG — HIDDEN, not deleted (her ruling 9, 2026-08-23). The
     chapter is out of js/config.js EXAM_CHAPTERS, so this entry and its
     one card (js/exam/cards-trig.js) are unreachable in the app; both
     stay so that putting 2D Trig back is a one-word edit in config. */
  trig: [
    { id: "cosine-rule-area", label: L("Cosine rule & area", "Cosinusreël & oppervlakte") },
  ],

  /* EUCLIDEAN — RE-CUT 2026-08-23. The old single `circle-geometry` tile
     is gone: the chapter is being built out to all four bookwork proofs
     plus ~10 riders, which is far too much for one tile. Her ruling 4:
     pen-and-paper, one sketch per card, mixed value/reason asks. */
  euclid: [
    { id: "bookwork-proofs",   label: L("The four bookwork proofs", "Die vier stellingbewyse") },
    { id: "chords-and-angles", label: L("Chords, centre & angles", "Koorde, middelpunt & hoeke") },
    { id: "cyclic-quads",      label: L("Cyclic quadrilaterals", "Koordevierhoeke") },
    { id: "tangents",          label: L("Tangents", "Raaklyne") },
    { id: "level-4",           label: L("Level 4 ★ — the brave round", "Vlak 4 ★: die dapper rondte") },
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
