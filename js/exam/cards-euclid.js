/* ============================================================
   EXAM FOCUS — SKILL CARDS · Euclidean Geometry
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22; RE-CUT 2026-08-23 for the
   Exam Focus build day — EXAM-BUILD-DAY.md.)
   ------------------------------------------------------------
   FIVE TILES (js/exam/skills.js):

     bookwork-proofs · chords-and-angles · cyclic-quads · tangents · level-4

   TWO SESSIONS SHARE THIS FILE ON BUILD DAY. Session G1 owns the
   bookwork-proofs and chords-and-angles blocks below; session G2 owns
   cyclic-quads, tangents and level-4. Neither touches the other's
   block — append inside your own section, re-read the file before every
   write, and merge rather than overwrite.

   ------------------------------------------------------------
   G1's TWO TILES (2026-08-23)

   `bookwork-proofs` — the four examinable proofs, acute case only, one
   card each, all level 1 because bookwork is recall:

     1. line from the centre ⊥ a chord bisects the chord   euclid.bw.q1
     2. ∠ at centre = 2 × ∠ at circumference               euclid.circ.t2q4 (a)
     3. opposite ∠s of a cyclic quad are supplementary     euclid.bw.q2
     4. the tangent–chord theorem                          euclid.bw.q3

   Proof 2 is NOT re-composed: it is already written as part (a) of the
   seeded question euclid.circ.t2q4 (js/exam/euclid-circle-theorems.js),
   which is that question's own stem-carrying first part, so its card
   needs no intro. The other three come from
   js/exam/euclid-bookwork-proofs.js and each carries the intro its own
   module wrote — the theorem statement is the PROMPT, so the given
   figure has to be said somewhere, and `intro` is that somewhere.
   (makeCard does not inherit a source question's `intro`; it only sets
   one that is handed to it. So each is passed through explicitly from
   the question it belongs to, which is why it can never drift.)

   `chords-and-angles` — six chained riders, five fresh
   (js/exam/euclid-siblings-chords-and-angles.js) plus the re-homed
   euclid.circ.t2q4 (b1, b2):

     euclid.sib.ca.q1  isosceles radii → ∠s round a pt → ∠ at centre
     euclid.sib.ca.q3  the REFLEX angle at the centre
     euclid.sib.ca.q4  equal chords, equal ∠s
     euclid.sib.ca.q2  diameter + same segment → prove two chords ∥
     euclid.sib.ca.q5  the whole chase in terms of x
     euclid.circ.t2q4 (b1,b2)  line from centre ⊥ chord + Pythagoras

   They are listed in that order because js/exam/index.js sorts a tile's
   cards easiest-first by the level of their hardest part (her ruling
   10), and this order already matches what that sort produces — level 2
   cards first, level 3 cards after — so the file reads the way the tile
   plays.

   NO INTRO on the re-homed (b1,b2) card, deliberately. (b1)'s own
   prompt restates every given the pair leans on — "OM = 9 mm and
   PQ = 24 mm" and all — so an intro would print the same sentence twice
   on the same screen, which is exactly what CONTENT-COMMON.md's "never
   say a thing twice" rule forbids. (b2)'s "Hence" is safe because (b1)
   is on the card with it.

   ------------------------------------------------------------
   G2's THREE TILES (2026-08-23)

   `cyclic-quads` — six chained riders, all fresh
   (js/exam/euclid-siblings-cyclic-quads.js):

     euclid.sib.cq.q2  ext ∠ of cyclic quad → two triangles → AB = AD
     euclid.sib.cq.q4  ext ∠ → alt ∠s → prove AB ∥ DC
     euclid.sib.cq.q1  two perpendiculars from the centre → prove OMBN cyclic
     euclid.sib.cq.q3  the whole thing in terms of x, through the centre
     euclid.sib.cq.q5  three equal chords → name the angles equal to x
     euclid.sib.cq.q6  NO circle drawn → prove ABCD is cyclic, then use it

   `tangents` — five fresh riders (js/exam/euclid-siblings-tangents.js)
   plus the re-homed euclid.tan.t2q5 (a, b, c):

     euclid.sib.tg.q1  tan chord both sides → ∠s on a str line → the centre
     euclid.sib.tg.q4  tangent + diameter → ∠ in semi-circle → ∠ at centre
     euclid.sib.tg.q2  two expressions for one angle → solve for x
     euclid.tan.t2q5 (a,b,c)  two tangents from a point → prove OATB cyclic
     euclid.sib.tg.q3  the kite → congruent triangles bisect the chord
     euclid.sib.tg.q5  the tangent length by Pythagoras → area two ways

   `level-4` — six fresh cards (js/exam/euclid-level4.js) plus the
   re-homed euclid.tan.t2q5 (d), the starred part of the seeded question:

     euclid.l4.q1  prove a line IS a tangent (converse tan chord)
     euclid.l4.q4  two equal tangent–chord angles ⟹ AB = AC
     euclid.tan.t2q5 (d)  prove ∠ACB = 90° − x/2
     euclid.l4.q3  a chord as long as the radius (surds in a rider)
     euclid.l4.q5  three theorems in a row, re-deriving tan ⊥ radius
     euclid.l4.q6  converse Pythagoras ⟹ line ⊥ radius ⟹ tangent
     euclid.l4.q2  prove a quad is cyclic with NO numbers at all

   Every card on a G2 tile is a WHOLE source question (all its parts on
   one sketch, each leaning on the ones before it), so each carries its
   own module's `intro` — the stem the six prompts share, said once,
   pinned above them rather than buried inside part (a). The only two
   exceptions are the re-homed pair:

     euclid.tan.t2q5 (a,b,c) → tangents   — the question's first part
       carries the whole stem, so no intro.
     euclid.tan.t2q5 (d)     → level-4    — the starred part on its own,
       WITH an intro carrying the figure's setup plus (b)'s and (c)'s
       results, which its prompt leans on and no longer states.

   ORDER inside each tile: js/exam/index.js sorts a tile's cards
   easiest-first by the level of their hardest part (her ruling 10), and
   every card on all three G2 tiles has the SAME card level as its
   neighbours (3 on cyclic-quads and tangents, 4 on the brave round), so
   the sort is a no-op and the file order below is what a learner walks.
   It is therefore chosen: numeric before algebraic, one theorem before
   three, and the two "prove it is cyclic with nothing to measure" cards
   last on their tiles.

   Diagrams ride along untouched: js/exam/_cards.js's cutDiagram narrows
   each card's diagram block to the parts it actually holds, so every
   figure is still the same spec measured by the same engine.

   AND SO DO THE WALK STATES (session G3, 2026-08-23). A memo step may
   now carry an `hl` — the picture that goes with that line while "Walk
   me through it" is running (js/exam/_walk.js). makeCard copies a part
   with `{ ...p }`, a SHALLOW copy, so the card and its source question
   share the one `memo` array and every `hl` on it: nothing had to be
   taught to carry them, and nothing can drop them. That is what lets
   bookwork proof 2 — which lives in euclid-circle-theorems.js as
   euclid.circ.t2q4 part (a) and is re-homed onto this tile below — get
   its walk states authored in its own module beside the other three.
   verify-exam-modules.mjs section 9i checks all four cards' states.
   ============================================================ */
import { makeCard } from "./_cards.js";
import { euclidCircleTheoremsQuestions } from "./euclid-circle-theorems.js";
import { euclidTangentsAndCyclicQuadsQuestions } from "./euclid-tangents-and-cyclic-quads.js";
import { euclidBookworkProofQuestions } from "./euclid-bookwork-proofs.js";
import { euclidChordsAndAnglesSiblingQuestions } from "./euclid-siblings-chords-and-angles.js";
import { euclidCyclicQuadsSiblingQuestions } from "./euclid-siblings-cyclic-quads.js";
import { euclidTangentsSiblingQuestions } from "./euclid-siblings-tangents.js";
import { euclidLevel4Questions } from "./euclid-level4.js";

const SOURCES = [
  ...euclidCircleTheoremsQuestions,
  ...euclidTangentsAndCyclicQuadsQuestions,
  ...euclidBookworkProofQuestions,
  ...euclidChordsAndAnglesSiblingQuestions,
  ...euclidCyclicQuadsSiblingQuestions,
  ...euclidTangentsSiblingQuestions,
  ...euclidLevel4Questions,
];
const src = id => {
  const q = SOURCES.find(qq => qq.id === id);
  if (!q) throw new Error(`cards-euclid.js: no seeded question "${id}"`);
  return q;
};

/* A bookwork card is its whole source question, so it carries that
   question's own intro — the given figure, said once, above the
   theorem statement the prompt asks the learner to prove. */
const whole = (skill, id) => makeCard({ skill, from: src(id), parts: ["a"], intro: src(id).intro });

/* A chained rider is its whole source question too: every part is on
   the same sketch and every part leans on the ones before it, so the
   card is the rider and nothing is ever cut off it. */
const rider = id => makeCard({
  skill: "chords-and-angles",
  from: src(id),
  parts: src(id).parts.map(p => p.id),
  intro: src(id).intro,
});

/* The same shape as `rider`, for the three tiles that are not
   chords-and-angles (session G2). Kept as a second helper rather than
   as a parameter on `rider` so G1's ten lines above never had to be
   touched on a day when two sessions share this file. */
const chained = (skill, id) => makeCard({
  skill,
  from: src(id),
  parts: src(id).parts.map(p => p.id),
  intro: src(id).intro,
});

export const euclidCards = [
  /* ---- 1. THE FOUR BOOKWORK PROOFS (session G1) ------------------ */
  whole("bookwork-proofs", "euclid.bw.q1"),
  makeCard({ skill: "bookwork-proofs", from: src("euclid.circ.t2q4"), parts: ["a"] }),
  whole("bookwork-proofs", "euclid.bw.q2"),
  whole("bookwork-proofs", "euclid.bw.q3"),

  /* ---- 2. CHORDS, CENTRE & ANGLES (session G1) ------------------- */
  rider("euclid.sib.ca.q1"),
  rider("euclid.sib.ca.q3"),
  rider("euclid.sib.ca.q4"),
  rider("euclid.sib.ca.q2"),
  rider("euclid.sib.ca.q5"),
  makeCard({ skill: "chords-and-angles", from: src("euclid.circ.t2q4"), parts: ["b1", "b2"] }),

  /* ---- 3. CYCLIC QUADRILATERALS (session G2) --------------------- */
  chained("cyclic-quads", "euclid.sib.cq.q2"),
  chained("cyclic-quads", "euclid.sib.cq.q4"),
  chained("cyclic-quads", "euclid.sib.cq.q1"),
  chained("cyclic-quads", "euclid.sib.cq.q3"),
  chained("cyclic-quads", "euclid.sib.cq.q5"),
  chained("cyclic-quads", "euclid.sib.cq.q6"),

  /* ---- 4. TANGENTS (session G2) ---------------------------------- */
  chained("tangents", "euclid.sib.tg.q1"),
  chained("tangents", "euclid.sib.tg.q4"),
  chained("tangents", "euclid.sib.tg.q2"),
  makeCard({ skill: "tangents", from: src("euclid.tan.t2q5"), parts: ["a", "b", "c"] }),
  chained("tangents", "euclid.sib.tg.q3"),
  chained("tangents", "euclid.sib.tg.q5"),

  /* ---- 5. LEVEL 4 ★ (session G2) --------------------------------- */
  chained("level-4", "euclid.l4.q1"),
  chained("level-4", "euclid.l4.q4"),
  makeCard({
    skill: "level-4", from: src("euclid.tan.t2q5"), parts: ["d"],
    /* Everything (d) leans on and no longer says for itself: the figure's
       setup, then the two results (b) and (c) handed it. Written out
       rather than referenced, so the card reads complete on its own. */
    intro: {
      en: "O is the centre of the circle. TA and TB are tangents to the circle at A and B. C is a point on the major arc AB, and CA and CB are chords. &nbsp;∠ATB = x.<br><br>Earlier parts of this question established that <b>OATB is a cyclic quadrilateral</b> (both tangents meet their radii at 90°), and that <b>∠AOB = 180° − x</b>.",
    },
  }),
  chained("level-4", "euclid.l4.q3"),
  chained("level-4", "euclid.l4.q5"),
  chained("level-4", "euclid.l4.q6"),
  chained("level-4", "euclid.l4.q2"),
];
