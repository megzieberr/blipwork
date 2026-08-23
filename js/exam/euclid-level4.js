/* ============================================================
   EXAM FOCUS — Euclidean geometry · THE LEVEL 4 ★ TILE
   (Exam Focus build day, 2026-08-23 — EXAM-BUILD-DAY.md ruling 5,
   session G2. Tile `level-4`, "Level 4 ★ — the brave round".)
   ------------------------------------------------------------
   SIX FRESH CARDS. The seventh on this tile is the re-homed
   `euclid.tan.t2q5` (d) — "prove that ∠ACB = 90° − x/2" — cut on by
   js/exam/cards-euclid.js with an intro carrying what (b) and (c)
   established, so nothing here re-composes it.

   WHAT MAKES A CARD BELONG HERE (her ruling 5): every card carries at
   least one level-4 part, every part on it is level 3 or 4, and the
   lead-in parts are ONLY the ones the starred part genuinely depends
   on. A level-1 warm-up has no business on this tile — it belongs on
   the tile that teaches it. Levels 1–3 live on bookwork-proofs,
   chords-and-angles, cyclic-quads and tangents.

   THE SIX SHAPES, straight off the paper bank's "hard finishers"
   (GR11-IEB-PAPER-BANK.md and survey/SURVEY-Nov-P2.md §4: "a cyclic-quad
   proof is the usual capstone; 'prove it is/is not cyclic' and
   converse-tangent items are the hard finishers"):

     q1  PROVE A LINE IS A TANGENT — the converse tan–chord theorem,
         the house favourite for the hardest geometry mark.
     q2  PROVE A QUADRILATERAL IS CYCLIC WITH NO ANGLE VALUES AT ALL,
         everything in x and y, using the converse of the exterior-angle
         theorem. NO circle is drawn — it is the thing being proved.
     q3  A CHORD EQUAL TO THE RADIUS: bisect it, then a length in terms
         of r, then the angle it subtends. Surds inside a geometry rider.
     q4  PROVE AB = AC from two equal tangent–chord angles.
     q5  A THREE-THEOREM UN-CUED PROOF that ends by re-deriving
         "tan ⊥ radius" from the inside.
     q6  PROVE A LINE IS A TANGENT THE OTHER WAY — converse Pythagoras
         gives the right angle, and `line ⊥ radius` finishes it.

   THE FIGURES follow session G1's recipe exactly (read the header of
   js/exam/euclid-siblings-chords-and-angles.js): arc arithmetic so every
   wedge measures true, `specAfter` growing a colour-matched value key as
   each part is answered, reveals lighting the PAIR a reason is about,
   and — the rule this tile leans on hardest — the QUESTION SIDE NEVER
   CARRIES WHAT THE PART IS ASKED TO FIND. q6's right angle at A is the
   clearest case: the whole of part (a) is proving that it is 90°, so no
   square is drawn there until (a)'s own reveal.

   ONE THING A DRAWN FIGURE CANNOT HIDE, and it is the same on a printed
   paper: when a question says "prove that DAE is a tangent", the line
   DAE is drawn touching the circle, because it IS the tangent. The
   picture showing it is not a leak — every IEB figure of this archetype
   does the same, and the marks are for the PROOF, not for the guess.

   TWO CARDS DRAW NO CIRCLE. q2's whole question is whether four points
   are concyclic, so `noCircle: true` leaves the (real, exact) points
   where they are and simply does not draw the one thing being proved.

   INDEX LABELS SIT INSIDE THEIR ARC — Megan's ruling on the build day's
   first contact sheet, and now the engine's own default (a bare digit
   renders smaller and at 0,55 × its arc radius). That default only
   applies when the spec sets NO `o.r`, so no numbered wedge in this file
   sets one; `o.ar` is tuned instead. The two tangent-point vertices
   (q1's and q4's A) carry THREE disjoint wedges and use outer / inner /
   outer — 40, 20, 40; q5's A carries two and gives the NARROWER one the
   BIGGER arc (40 against 22), because a narrow wedge has less room close
   in. Every highlight repeats its base wedge's `ar` and a matching
   `hlR`, so a lit wedge shows ONE arc.

   REASONS ARE VERBATIM SAG SHORT FORMS (EUCLID-ACCEPTABLE-REASONS.md),
   including the four CONVERSES this tile is built on:
     `converse tan chord theorem` · `ext ∠ = int opp ∠` ·
     `line ⊥ radius` · `converse Pythagoras`
   TICK CONVENTION: ✓s/f the reason-bearing set-up line · ✓ca a derived
   intermediate · ✓a the result itself.

   lostQuest: the documented euclid placeholder (no "I'm lost" button on
   this chapter — her ruling). See euclid-circle-theorems.js.
   ============================================================ */

const CH = "euclid";
const TOPIC = "level-4";
const PAPER = "siblings";
const LOST_PENDING = { chapter: "euclid", quest: "PENDING-euclid-is-exam-only-no-drill-round" };

/* the canvas for a figure carrying a full tangent line (the circle is
   pushed up so the line and its end labels clear the frame) */
const TANG_CANVAS = { w: 340, h: 212, cx: 165, cy: 105, R: 76 };

/* Session G1's helper, byte for byte. */
function specAfter(base, found) {
  const out = JSON.parse(JSON.stringify(base));
  const given = (base.key && base.key.lines) || [];
  const lines = [...given.map(l => ({ t: l.t })), ...(found || []).map(f => ({ t: `${f.n} = ${f.v}` }))];
  if (lines.length) out.key = { at: "tr", lines };
  else delete out.key;
  return out;
}

/* =====================================================================
   ★ CARD 1 — PROVE THAT A LINE IS A TANGENT (converse tan–chord)
   ---------------------------------------------------------------------
   A at 270°, B at 160°, C at 40°; DAE is the line through A.
     Â₁ = ∠BAD = ½·arc AB going the short way = ½(110°) = 55°  (given)
     Â₂ = ∠BAC = ½·arc BC = ½(120°) = 60°                      (given)
     ∠ABC = ½·arc AC = ½(130°) = 65°                           (given)
     ∠ACB = 180 − 60 − 65 = 55°   ← equals Â₁, which is the proof
     Â₃ = ∠CAE = 180 − 55 − 60 = 65° = ∠ABC
   Three DISJOINT wedges at A (D → B → C → E), all three numbered
   because two of them carry text.
   ===================================================================== */
const L41_BASE = {
  ...TANG_CANVAS,
  pts: { A: 270, B: 160, C: 40 },
  tang: [{ at: "A", len: 112, lab: ["D", "E"] }],
  key: { at: "tr", lines: [{ t: "Â₁ = 55°" }, { t: "Â₂ = 60°" }] },
  chords: [["A", "B"], ["A", "C"], ["B", "C"]],
  angles: [
    { at: "A", legs: ["B", "tg-"], t: "1", o: { v: 55, ar: 40 } },
    { at: "A", legs: ["B", "C"], t: "2", o: { v: 60, ar: 20 } },
    { at: "A", legs: ["C", "tg+"], t: "3", o: { v: 65, ar: 40 } },
    { at: "B", legs: ["A", "C"], t: "65°", o: { v: 65, r: 40, ar: 22 } },
    { at: "C", legs: ["A", "B"], t: "", o: { v: 55, ar: 22 } },
  ],
};
const L41_A1 = { at: "A", legs: ["B", "tg-"], v: 55, o: { ar: 40, hlR: 40 } };
const L41_A2 = { at: "A", legs: ["B", "C"], v: 60, o: { ar: 20, hlR: 20 } };
const L41_A3 = { at: "A", legs: ["C", "tg+"], v: 65, o: { ar: 40, hlR: 40 } };
const L41_ABC = { at: "B", legs: ["A", "C"], v: 65, o: { ar: 22, hlR: 22 } };
const L41_ACB = { at: "C", legs: ["A", "B"], v: 55, o: { ar: 22, hlR: 22 } };
const L41_CHAIN = [{ n: "∠ACB", v: "55°" }];

const l41 = {
  id: "euclid.l4.q1",
  chapter: CH,
  topic: TOPIC,
  archetype: "converse-tan-chord-prove-a-line-is-a-tangent-then-use-it-forwards",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 8,
  intro: {
    en: "In the diagram, A, B and C are points on the circle and AB, AC and BC are drawn. &nbsp;DAE is a straight line through A, with D and E on opposite sides of A. &nbsp;Â₁ = 55°, &nbsp;Â₂ = 60° &nbsp;and&nbsp; ∠ABC = 65°.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(L41_BASE, []),
        question: { angles: [L41_ACB] },
        reveal: { angles: [L41_ACB, L41_A2, L41_ABC] },
      },
      b: {
        spec: specAfter(L41_BASE, L41_CHAIN.slice(0, 1)),
        question: { angles: [L41_A1, L41_ACB], chords: [["A", "B"]] },
        reveal: { angles: [L41_A1, L41_ACB], chords: [["A", "B"]] },
      },
      c: {
        spec: specAfter(L41_BASE, L41_CHAIN.slice(0, 1)),
        question: { angles: [L41_A3] },
        reveal: { angles: [L41_A3, L41_ABC], chords: [["A", "C"]] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠ACB." },
      hint: { en: "Triangle ABC has two of its three angles sitting on the page already." },
      memo: [
        { type: "step", text: { en: "In △ABC: &nbsp;∠ACB + Â₂ + ∠ABC = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠ACB = 180° − 60° − 65° = 55°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Nothing clever, and that is deliberate — this is the mark the question gives you before it asks for anything hard. The three angles of a triangle add to 180°, two of them were given, so the third falls out. What matters is the number that comes out: 55°, which is exactly what Â₁ was given as, at the other end of the picture. Two equal angles like that, one squeezed between a chord and a line and the other sitting across the circle, are the fingerprint of one particular theorem — and the next part is going to make you name it.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: { en: "Prove that &nbsp;DAE&nbsp; is a tangent to the circle at A." },
      hint: { en: "Nothing here says “tangent” yet, so you have to work backwards. If DAE really were a tangent, what would the angle between it and the chord AB have to equal — and does it?" },
      memo: [
        { type: "step", text: { en: "Â₁ = 55° &nbsp;and&nbsp; ∠ACB = 55°, &nbsp;so &nbsp;Â₁ = ∠ACB" }, ticks: ["ca"] },
        { type: "step", text: { en: "Â₁ is the angle between the line DAE and the chord AB, and ∠ACB is the angle that chord AB makes in the alternate segment." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ DAE is a tangent to the circle at A &nbsp;&nbsp;<i>(converse tan chord theorem)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: say which CHORD and which SEGMENT. “The angles are equal, so it is a tangent” is not a proof — the marker needs to see that Â₁ is the angle between the line and chord AB, and that C is in the segment on the other side of AB.",
        } },
      ],
      esplain: {
        en: "This is the hardest single mark in Grade 11 Euclidean geometry, and it is hard for one reason: nothing in the question cues you. The word tangent does not appear, no right angle is mentioned, and the line is just “a straight line through A”. What you have to do is run a theorem backwards. Forwards, the tangent–chord theorem says: if a line is a tangent, then the angle it makes with a chord equals the angle in the alternate segment. Backwards it says: if that angle equality holds, the line must be a tangent. So the plan is always the same — find the angle in the alternate segment, find the angle between the line and the chord, show they are equal, and name the converse. Once you have seen the shape of it once, every version of this question looks the same.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: { en: "Hence determine, with reasons, the size of &nbsp;Â₃." },
      hint: { en: "The word “hence” means you are now allowed to use what you proved. What does the tangent–chord theorem say about the OTHER chord out of A?" },
      memo: [
        { type: "step", text: { en: "DAE is a tangent &nbsp;<i>(proved in (b))</i>, and Â₃ is the angle between it and the chord AC." }, ticks: ["s/f"] },
        { type: "step", text: { en: "∠ABC is the angle in the alternate segment on chord AC. &nbsp;&nbsp;<i>(tan chord theorem)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ Â₃ = ∠ABC = 65°" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — along the straight line instead: &nbsp;Â₁ + Â₂ + Â₃ = 180° &nbsp;<i>(∠s on a str line)</i>, so Â₃ = 180° − 55° − 60° = 65°. &nbsp;Same marks." } },
      ],
      esplain: {
        en: "Two roads, and it is worth walking both. The straight-line road needs no theorem at all: D, A and E are collinear, so the three angles at A add to 180°. The tangent road uses what part (b) bought you — now that DAE is known to be a tangent, the theorem works forwards on the second chord AC and hands you ∠ABC. The two agreeing is the figure checking itself. In an exam, when a part says “hence”, the examiner is telling you which road they want; take the other one as your check rather than as your answer.",
      },
    },
  ],
};

/* =====================================================================
   ★ CARD 2 — PROVE A QUADRILATERAL IS CYCLIC WITH NO NUMBERS AT ALL
   ---------------------------------------------------------------------
   A triangle ABC with D on AB and E on AC, and NO circle drawn — the
   circle through D, E, C and B is exactly what part (b) proves into
   existence.
   The four points are placed so that DE is ANTIPARALLEL to BC:
   AD × AB = AE × AC, which is what forces ∠ADE = ∠ACB exactly. The
   drawn values are x = 58,076406° and y = 67,297658°, and they are
   never substituted — every answer is an expression.
     ∠ADE = ∠ACB = x        (the given equality, marked x on both)
     ∠BAC = y               (given)
     ∠AED = 180 − x − y     (sum of ∠s in Δ, part (a))
     ∠DEC = x + y           (∠s on a str line, AEC straight)
     ∠DBC = ∠ABC = 180 − x − y
   ===================================================================== */
const L42_BASE = {
  w: 340, h: 240, cx: 172, cy: 145, R: 78,
  noCircle: true,
  pts: {
    A: { x: 170, y: 32 },
    B: { x: 58, y: 212 },
    C: { x: 288, y: 198 },
    D: { x: 119.6, y: 113 },
    E: { x: 227.534388, y: 112.938206 },
  },
  chords: [["A", "B"], ["A", "C"], ["B", "C"], ["D", "E"]],
  angles: [
    { at: "A", legs: ["B", "C"], t: "y", o: { v: 67.297658, r: 40, ar: 26 } },
    { at: "D", legs: ["A", "E"], t: "x", o: { v: 58.076406, r: 34, ar: 20 } },
    { at: "E", legs: ["A", "D"], t: "", o: { v: 54.625937, ar: 20 } },
    { at: "C", legs: ["A", "B"], t: "x", o: { v: 58.076406, r: 44, ar: 26 } },
    { at: "B", legs: ["A", "C"], t: "", o: { v: 54.625937, ar: 26 } },
  ],
};
const L42_Y = { at: "A", legs: ["B", "C"], v: 67.297658, o: { ar: 26, hlR: 26 } };
const L42_ADE = { at: "D", legs: ["A", "E"], v: 58.076406, o: { ar: 20, hlR: 20 } };
const L42_AED = { at: "E", legs: ["A", "D"], v: 54.625937, o: { ar: 20, hlR: 20 } };
const L42_ACB = { at: "C", legs: ["A", "B"], v: 58.076406, o: { ar: 26, hlR: 26 } };
const L42_DBC = { at: "B", legs: ["A", "C"], v: 54.625937, o: { ar: 26, hlR: 26 } };
const L42_DEC = { at: "E", legs: ["D", "C"], v: 125.374063, o: { ar: 26, hlR: 26 } };
const L42_SIDES = [["D", "E"], ["E", "C"], ["C", "B"], ["B", "D"]];
const L42_CHAIN = [{ n: "∠AED", v: "180° − x − y" }];

const l42 = {
  id: "euclid.l4.q2",
  chapter: CH,
  topic: TOPIC,
  archetype: "prove-a-quadrilateral-is-cyclic-with-no-numbers-converse-exterior-angle",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 8,
  intro: {
    en: "In the diagram, ADB and AEC are straight lines and DE is drawn. &nbsp;<b>No circle is drawn.</b> &nbsp;∠ADE = ∠ACB = x &nbsp;and&nbsp; ∠BAC = y.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(L42_BASE, []),
        question: { angles: [L42_AED] },
        reveal: { angles: [L42_AED, L42_ADE, L42_Y] },
      },
      b: {
        spec: specAfter(L42_BASE, L42_CHAIN.slice(0, 1)),
        question: { chords: L42_SIDES },
        reveal: { chords: L42_SIDES, angles: [L42_ADE, L42_ACB] },
      },
      c: {
        spec: specAfter(L42_BASE, L42_CHAIN.slice(0, 1)),
        question: { angles: [L42_DBC] },
        reveal: { angles: [L42_DBC, L42_DEC], chords: L42_SIDES },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠AED&nbsp; in terms of x and y." },
      hint: { en: "Triangle ADE has two of its angles marked already — one of them is x and the other is y." },
      memo: [
        { type: "step", text: { en: "In △ADE: &nbsp;∠AED + ∠ADE + ∠DAE = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠AED = 180° − x − y" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: ∠DAE and ∠BAC are the <b>same angle</b> — D is on AB and E is on AC, so the ray AD points where AB points and AE points where AC points. That is why the given y can be used inside the small triangle.",
        } },
      ],
      esplain: {
        en: "There is not a circle in sight yet, so every circle theorem is switched off and all you have is ordinary triangle work. The one thing to see clearly is that the small triangle ADE and the big triangle ABC share their angle at A, because D and E lie on the two arms. Once you spot that, the small triangle has x at D, y at A, and the rest of 180° left over for E. Working in letters instead of numbers changes nothing about the method — you just carry the letters through instead of adding.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: { en: "Prove that &nbsp;DECB&nbsp; is a cyclic quadrilateral." },
      hint: { en: "ADB is a straight line, so ∠ADE is sticking out of the four-sided shape DECB at the corner D. Which of that shape's own angles does the question already say it equals?" },
      memo: [
        { type: "step", text: { en: "ADB is a straight line, so ∠ADE is the EXTERIOR angle of quadrilateral DECB at D." }, ticks: ["s/f"] },
        { type: "step", text: { en: "The interior opposite angle of DECB is the one at C, which is ∠BCE = ∠ACB = x." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∠ADE = ∠ACB = x, &nbsp;so the exterior angle equals the interior opposite angle<br>∴ DECB is a cyclic quadrilateral &nbsp;&nbsp;<i>(ext ∠ = int opp ∠)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: read <b>DECB</b> in order — D, then E, then C, then B. That is the way the four sides run, and it is what makes C the corner OPPOSITE D. Matching ∠ADE with the angle at E or at B proves nothing at all.",
        } },
      ],
      esplain: {
        en: "There are two standard ways to prove four points lie on a circle, and this figure is built for the second one. The first is opposite angles adding to 180°. The second is the exterior-angle test: if the angle sticking out at one corner of a quadrilateral equals the interior angle at the corner diagonally across from it, the four corners lie on one circle. That is the converse of the theorem you use forwards on every cyclic quadrilateral, and the SAG short form for it is “ext ∠ = int opp ∠”. What makes this card level 4 is that there are no numbers anywhere — you cannot check anything by arithmetic, so the reasoning has to carry all your confidence. Name the quadrilateral in order, name the exterior angle, name the interior opposite angle, then say they are equal. Four short lines, three marks.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: { en: "Hence determine, with reasons, the size of &nbsp;∠DBC&nbsp; in terms of x and y." },
      hint: { en: "AEC is a straight line too, so ∠DEC and ∠AED are neighbours on it. Then use the circle you have just proved into existence." },
      memo: [
        { type: "step", text: { en: "AEC is a straight line, so &nbsp;∠DEC = 180° − ∠AED = 180° − (180° − x − y) = x + y &nbsp;&nbsp;<i>(∠s on a str line)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "In cyclic quad DECB: &nbsp;∠DBC + ∠DEC = 180° &nbsp;&nbsp;<i>(opp ∠s of cyclic quad)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ ∠DBC = 180° − (x + y) = 180° − x − y" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — without the circle at all: &nbsp;in △ABC, &nbsp;∠ABC = 180° − ∠BAC − ∠ACB = 180° − y − x &nbsp;<i>(sum of ∠s in Δ)</i>, and ∠DBC is that same angle. &nbsp;Same marks." } },
      ],
      esplain: {
        en: "Two roads again, and the fact that they agree is a genuinely useful sanity check on the proof in part (b) — if the circle you proved into existence gave a different answer from ordinary triangle work, something would be wrong. The circle road is the one the word “hence” is asking for: E and B are opposite corners of the cyclic quadrilateral, so their angles add to 180°, and ∠DEC came from the straight line AEC. The triangle road ignores the circle completely. Being able to see both is what makes you quick in an exam, because you can start on whichever one you spot first and use the other to check.",
      },
    },
  ],
};

/* =====================================================================
   ★ CARD 3 — A CHORD AS LONG AS THE RADIUS
   ---------------------------------------------------------------------
   X at 240°, Y at 300°, so the arc XY is 60° and chord XY equals the
   radius exactly — triangle OXY is equilateral. M is the midpoint of
   XY (`mid`), so OM ⊥ XY and the figure is symmetric about the vertical
   through 270°. Z at 90° sits on the major arc.
     XM = r/2                       (line from centre ⊥ to chord)
     OM² = r² − (r/2)² = 3r²/4  ⟹  OM = (r√3)/2
     ∠XOY = 60°                     (equilateral △OXY)
     ∠XZY = ½ × 60° = 30°           (∠ at centre = 2 × ∠ at circumference)
   The right angle at M is GIVEN (the stem says OM ⊥ XY), so it is drawn
   as a right-angle SQUARE on every state.
   ===================================================================== */
const L43_BASE = {
  w: 340, h: 212, cx: 160, cy: 105, R: 78,
  O: true,
  pts: { X: 240, Y: 300, Z: 90 },
  mid: [{ name: "M", of: ["X", "Y"] }],
  key: { at: "tr", lines: [{ t: "XY = r" }] },
  chords: [["X", "Y"], ["O", "X"], ["O", "Y"], ["O", "M"], ["X", "Z"], ["Y", "Z"]],
  angles: [
    { at: "M", legs: ["Y", "O"], t: "", o: { v: 90, mark: "square" } },
    { at: "O", legs: ["X", "Y"], t: "", o: { v: 60, ar: 24 } },
    { at: "Z", legs: ["X", "Y"], t: "", o: { v: 30, ar: 30 } },
  ],
};
const L43_OMY = { at: "M", legs: ["Y", "O"], v: 90, o: { mark: "square" } };
const L43_XOY = { at: "O", legs: ["X", "Y"], v: 60, o: { ar: 24, hlR: 24 } };
const L43_XZY = { at: "Z", legs: ["X", "Y"], v: 30, o: { ar: 30, hlR: 30 } };
const L43_CHAIN = [{ n: "XM", v: "r/2" }, { n: "OM", v: "(r√3)/2" }];

const l43 = {
  id: "euclid.l4.q3",
  chapter: CH,
  topic: TOPIC,
  archetype: "chord-equal-to-the-radius-half-chord-then-a-length-in-terms-of-r-then-the-angle",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 8,
  intro: {
    en: "In the diagram, O is the centre of the circle and the radius is r. &nbsp;XY is a chord with &nbsp;XY = r, &nbsp;and M is a point on XY such that &nbsp;OM ⊥ XY. &nbsp;Z is a point on the major arc XY, and XZ and YZ are drawn.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(L43_BASE, []),
        question: { chords: [["X", "M"]] },
        reveal: { chords: [["X", "M", "t1"], ["M", "Y", "t1"]], angles: [L43_OMY] },
      },
      b: {
        spec: specAfter(L43_BASE, L43_CHAIN.slice(0, 1)),
        question: { chords: [["O", "M"]] },
        reveal: { chords: [["O", "M"], ["X", "M"], ["O", "X"]], angles: [L43_OMY] },
      },
      c: {
        spec: specAfter(L43_BASE, L43_CHAIN.slice(0, 2)),
        question: { angles: [L43_XZY] },
        reveal: { angles: [L43_XZY, L43_XOY], chords: [["O", "X", "t1"], ["O", "Y", "t1"], ["X", "Y", "t1"]] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: { en: "Write down, with a reason, the length of &nbsp;XM&nbsp; in terms of r." },
      hint: { en: "OM comes from the centre and meets the chord at right angles. There is one theorem about what a line like that does to a chord — and remember how long XY is." },
      memo: [
        { type: "step", text: { en: "OM ⊥ XY, so &nbsp;XM = MY &nbsp;&nbsp;<i>(line from centre ⊥ to chord)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ XM = ½ · XY = r/2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A line dropped from the centre at right angles to a chord always cuts that chord exactly in half — it is the one theorem in the chapter that turns a right angle into a length. Here the chord happens to be as long as the radius, so half of it is half the radius. Working in letters is no harder than working in numbers: r/2 is a complete answer and no number is ever coming. The one thing to be careful of is that “the line from the centre” has to really come from the centre — a perpendicular dropped from anywhere else does not bisect anything.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: { en: "Show that &nbsp;OM = (r√3)/2." },
      hint: { en: "Look at triangle OXM on its own. You know the right angle, you know the hypotenuse and you have just found one of the short sides." },
      memo: [
        { type: "step", text: { en: "OX is a radius, so &nbsp;OX = r, &nbsp;and&nbsp; ∠OMX = 90° &nbsp;&nbsp;<i>(given: OM ⊥ XY)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "In △OXM: &nbsp;OM² = OX² − XM² = r² − (r/2)² = r² − r²/4 = (3r²)/4 &nbsp;&nbsp;<i>(Pythagoras)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ OM = √((3r²)/4) = (r√3)/2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: &nbsp;(r/2)² is &nbsp;r²/4, not &nbsp;r²/2. Squaring a fraction squares the bottom as well as the top — that one slip turns √3 into √2 and loses the answer mark.",
        } },
      ],
      esplain: {
        en: "This is Pythagoras doing exactly what it always does, with letters instead of numbers. The right angle sits at M, so OX is the hypotenuse and the two short sides are OM and XM. Subtract, and the r² factors out neatly. The square-rooting at the end is where the surd appears: the square root of three-quarters of r² is r times the square root of three, over two. A “show that” instruction means the answer has been given to you, so the marks are all in the working — never write down the final line on its own and hope. And notice how much a letter-only answer tells you: OM is about 0,87 of the radius, whatever the circle's actual size.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: { en: "Determine, with reasons, the size of &nbsp;∠XZY." },
      hint: { en: "Nothing here mentions an angle, so you have to make one. What kind of triangle is OXY, given that all three of its sides are the same length?" },
      memo: [
        { type: "step", text: { en: "OX = OY = r &nbsp;<i>(radii)</i> &nbsp;and&nbsp; XY = r &nbsp;<i>(given)</i>, so △OXY is equilateral." }, ticks: ["s/f"] },
        { type: "step", text: { en: "∴ ∠XOY = 60° &nbsp;&nbsp;<i>(∠s opp equal sides; sum of ∠s in Δ)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∠XZY = ½ · ∠XOY &nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i> &nbsp;— both stand on chord XY<br>∴ ∠XZY = ½ × 60° = 30°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: this is a NUMBER, even though everything else in the question was in terms of r. The angle a chord subtends does not depend on how big the circle is — only on how the chord compares with the radius.",
        } },
      ],
      esplain: {
        en: "The fetch in this part is realising that “XY = r” is secretly an angle fact. Two of the triangle's sides are radii, so they are r; the third side is the chord, and the question told you it is r as well. Three equal sides means an equilateral triangle, which means all three of its angles are 60°. From there the ordinary angle-at-centre theorem finishes it: Z is out on the circumference looking at the same chord XY, so its angle is half. It is worth remembering the result on its own — a chord as long as the radius always subtends 30° at the circumference — because it turns up in Grade 12 as well.",
      },
    },
  ],
};

/* =====================================================================
   ★ CARD 4 — TWO EQUAL TANGENT–CHORD ANGLES, SO TWO EQUAL CHORDS
   ---------------------------------------------------------------------
   Tangent SU touches the circle at A (270°); B at 160° and C at 20°.
   Arc AB = arc AC = 110°, so the two tangent–chord angles are equal and
   the two chords are equal — which is the whole question.
     Â₁ = ∠BAS = ½(110°) = 55°   Â₃ = ∠CAU = ½(110°) = 55°   (both = x)
     ∠ACB = ∠ABC = 55° = x       (each the angle in the alternate segment)
     Â₂ = ∠BAC = 180 − 55 − 55 = 70° = 180° − 2x
   Three DISJOINT wedges at A (S → B → C → U), numbered because two of
   them carry text.
   ===================================================================== */
const L44_BASE = {
  ...TANG_CANVAS,
  pts: { A: 270, B: 160, C: 20 },
  tang: [{ at: "A", len: 112, lab: ["S", "U"] }],
  key: { at: "tr", lines: [{ t: "Â₁ = x" }, { t: "Â₃ = x" }] },
  chords: [["A", "B"], ["A", "C"], ["B", "C"]],
  angles: [
    { at: "A", legs: ["B", "tg-"], t: "1", o: { v: 55, ar: 40 } },
    { at: "A", legs: ["B", "C"], t: "2", o: { v: 70, ar: 20 } },
    { at: "A", legs: ["C", "tg+"], t: "3", o: { v: 55, ar: 40 } },
    { at: "B", legs: ["A", "C"], t: "", o: { v: 55, ar: 22 } },
    { at: "C", legs: ["A", "B"], t: "", o: { v: 55, ar: 22 } },
  ],
};
const L44_A1 = { at: "A", legs: ["B", "tg-"], v: 55, o: { ar: 40, hlR: 40 } };
const L44_A2 = { at: "A", legs: ["B", "C"], v: 70, o: { ar: 20, hlR: 20 } };
const L44_A3 = { at: "A", legs: ["C", "tg+"], v: 55, o: { ar: 40, hlR: 40 } };
const L44_ABC = { at: "B", legs: ["A", "C"], v: 55, o: { ar: 22, hlR: 22 } };
const L44_ACB = { at: "C", legs: ["A", "B"], v: 55, o: { ar: 22, hlR: 22 } };
const L44_CHAIN = [{ n: "∠ACB", v: "x" }, { n: "∠ABC", v: "x" }];

const l44 = {
  id: "euclid.l4.q4",
  chapter: CH,
  topic: TOPIC,
  archetype: "two-equal-tangent-chord-angles-prove-two-chords-equal-then-the-apex-in-terms-of-x",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 10,
  intro: {
    en: "In the diagram, &nbsp;SU&nbsp; is a tangent to the circle at A. &nbsp;B and C are points on the circle, and AB, AC and BC are drawn. &nbsp;Â₁ = Â₃ = x.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(L44_BASE, []),
        question: { angles: [L44_ACB] },
        reveal: { angles: [L44_ACB, L44_A1], chords: [["A", "B"]] },
      },
      b: {
        spec: specAfter(L44_BASE, L44_CHAIN.slice(0, 1)),
        question: { angles: [L44_ABC] },
        reveal: { angles: [L44_ABC, L44_A3], chords: [["A", "C"]] },
      },
      c: {
        spec: specAfter(L44_BASE, L44_CHAIN.slice(0, 2)),
        question: { chords: [["A", "B"], ["A", "C"]] },
        reveal: { chords: [["A", "B", "t1"], ["A", "C", "t1"]], angles: [L44_ABC, L44_ACB] },
      },
      d: {
        spec: specAfter(L44_BASE, L44_CHAIN.slice(0, 2)),
        question: { angles: [L44_A2] },
        reveal: { angles: [L44_A2, L44_A1, L44_A3] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: { en: "Write down, with a reason, the size of &nbsp;∠ACB&nbsp; in terms of x." },
      hint: { en: "Â₁ is squeezed between the tangent and the chord AB. Which point in the picture sits in the segment on the far side of AB?" },
      memo: [
        { type: "answer", text: { en: "∠ACB = Â₁ = x &nbsp;&nbsp;<i>(tan chord theorem)</i> — the tangent–chord angle on chord AB, and the angle in the alternate segment" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "The tangent–chord theorem, used the ordinary way round. Name the chord first — it is AB — then find the point on the other side of it, which is C. The angle the tangent makes with AB at A, and the angle AB makes at C, are always the same size. Working in x rather than in numbers changes nothing at all: the answer is simply x, and that is a complete answer. Both marks here are on the page in one line, but only if the reason is written beside the size.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: { en: "Write down, with a reason, the size of &nbsp;∠ABC&nbsp; in terms of x." },
      hint: { en: "Same theorem, other side. The chord is AC this time — so who is in ITS alternate segment?" },
      memo: [
        { type: "answer", text: { en: "∠ABC = Â₃ = x &nbsp;&nbsp;<i>(tan chord theorem)</i> — the tangent–chord angle on chord AC, and the angle in the alternate segment" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "Two chords leave A, so the tangent–chord theorem is available twice — chord AB sending its angle across to C, and chord AC sending its angle across to B. Learners often think the theorem is about “the tangent angle”, singular, and then cannot see where a second one could come from. It is about a CHORD and the tangent, so count your chords. And here both tangent–chord angles are the same x, which is exactly the setup the next part needs.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: { en: "Prove that &nbsp;AB = AC." },
      hint: { en: "Look at triangle ABC on its own now, and forget the tangent. What have you just found out about two of its angles — and which sides face them?" },
      memo: [
        { type: "step", text: { en: "In △ABC: &nbsp;∠ABC = x &nbsp;and&nbsp; ∠ACB = x" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ ∠ABC = ∠ACB" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ AC = AB &nbsp;&nbsp;<i>(sides opp equal ∠s)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: name the sides that are <b>opposite</b> the two equal angles. ∠ABC is at B, and the side facing it across the triangle is AC; ∠ACB is at C, and the side facing it is AB. Naming the wrong pair scores nothing, even though the triangle really is isosceles.",
        } },
      ],
      esplain: {
        en: "This is the isosceles theorem run backwards, and the SAG gives each direction its own short form: “∠s opp equal sides” when you go from equal sides to equal angles, and “sides opp equal ∠s” when you go the other way. Use the one that matches what you actually have, or a marker will read your proof as circular. What makes the card level 4 is that nothing cued you to look at triangle ABC — the given was about two angles on a tangent, and you had to walk them both across the circle before the triangle became interesting. Once they arrived, the proof is two lines.",
      },
    },
    {
      id: "d",
      marks: 3,
      level: 4,
      prompt: { en: "Determine, with reasons, the size of &nbsp;Â₂&nbsp; in terms of x." },
      hint: { en: "Two honest ways in: the three angles along the tangent line, or the three angles of the triangle. Either is worth full marks." },
      memo: [
        { type: "step", text: { en: "SU is a straight line, so &nbsp;Â₁ + Â₂ + Â₃ = 180° &nbsp;&nbsp;<i>(∠s on a str line)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∴ x + Â₂ + x = 180°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ Â₂ = 180° − 2x" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — inside the triangle instead: &nbsp;in △ABC, &nbsp;Â₂ = 180° − ∠ABC − ∠ACB = 180° − x − x = 180° − 2x &nbsp;<i>(sum of ∠s in Δ)</i>. &nbsp;Same marks." } },
        { type: "trap", text: {
          en: "WATCH OUT: 180° − 2x, not 180° − x. There are TWO x's to take off, one on each side of Â₂ — and the same is true inside the triangle, where both base angles came out as x.",
        } },
      ],
      esplain: {
        en: "The two roads agreeing is the tangent–chord theorem quietly checking the whole question: the three angles along the tangent at A are x, 180° − 2x and x, and the three angles of triangle ABC are exactly the same three, standing in different places. That is what the theorem does — it shuffles the same angles across the circle. Seeing it once makes the theorem much harder to forget than any amount of chanting it. Whichever road you take, be careful with the algebra at the end: two x's come off, not one.",
      },
    },
  ],
};

/* =====================================================================
   ★ CARD 5 — THREE THEOREMS IN A ROW, ENDING WHERE IT STARTED
   ---------------------------------------------------------------------
   Tangent ST touches the circle at A (270°); B at 340° and C at 130°.
     Â₂ = ∠BAT = ½·arc AB = ½(70°) = 35° = x   (given)
     ∠ACB = 35° = x                (tan chord theorem)
     ∠AOB = 70° = 2x               (∠ at centre = 2 × ∠ at circumference)
     Â₁ = ∠OAB = ∠OBA = (180 − 70)/2 = 55° = 90° − x   (radii, isosceles)
     ∠OAT = Â₁ + Â₂ = (90 − x) + x = 90°   ← the chase re-derives
                                            "tan ⊥ radius" from inside
   The two wedges at A are DISJOINT and both numbered; ∠OAT spans them
   both, so it is drawn only by part (d)'s own highlight.
   ===================================================================== */
const L45_BASE = {
  /* 30 px wider than TANG_CANVAS: this card's key grows to
     "∠OBA = 90° − x", whose left edge (W − 6 − 14 × 7) falls INSIDE the
     circle at 340, so the leading ∠ printed on the arc. Read off the
     crop. The circle itself is unchanged. */
  ...TANG_CANVAS, w: 370,
  O: true,
  pts: { A: 270, B: 340, C: 130 },
  tang: [{ at: "A", len: 112, lab: ["S", "T"] }],
  key: { at: "tr", lines: [{ t: "Â₂ = x" }] },
  chords: [["O", "A"], ["O", "B"], ["A", "B"], ["A", "C"], ["B", "C"]],
  angles: [
    { at: "A", legs: ["O", "B"], t: "1", o: { v: 55, ar: 22 } },
    { at: "A", legs: ["B", "tg+"], t: "2", o: { v: 35, ar: 40 } },
    { at: "B", legs: ["O", "A"], t: "", o: { v: 55, ar: 20 } },
    { at: "C", legs: ["A", "B"], t: "", o: { v: 35, ar: 26 } },
    { at: "O", legs: ["A", "B"], t: "", o: { v: 70, ar: 22 } },
  ],
};
const L45_A1 = { at: "A", legs: ["O", "B"], v: 55, o: { ar: 22, hlR: 22 } };
const L45_A2 = { at: "A", legs: ["B", "tg+"], v: 35, o: { ar: 40, hlR: 40 } };
const L45_OAT = { at: "A", legs: ["O", "tg+"], v: 90, o: { mark: "square" } };
const L45_OBA = { at: "B", legs: ["O", "A"], v: 55, o: { ar: 20, hlR: 20 } };
const L45_ACB = { at: "C", legs: ["A", "B"], v: 35, o: { ar: 26, hlR: 26 } };
const L45_AOB = { at: "O", legs: ["A", "B"], v: 70, o: { ar: 22, hlR: 22 } };
const L45_CHAIN = [
  { n: "∠ACB", v: "x" }, { n: "∠AOB", v: "2x" }, { n: "∠OBA", v: "90° − x" },
];

const l45 = {
  id: "euclid.l4.q5",
  chapter: CH,
  topic: TOPIC,
  archetype: "tan-chord-then-angle-at-centre-then-isosceles-radii-rederiving-tan-perp-radius",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 11,
  intro: {
    en: "In the diagram, O is the centre of the circle and &nbsp;ST&nbsp; is a tangent to the circle at A. &nbsp;B and C are points on the circle, and OA, OB, AB, AC and BC are drawn. &nbsp;Â₂ = x.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(L45_BASE, []),
        question: { angles: [L45_ACB] },
        reveal: { angles: [L45_ACB, L45_A2], chords: [["A", "B"]] },
      },
      b: {
        spec: specAfter(L45_BASE, L45_CHAIN.slice(0, 1)),
        question: { angles: [L45_AOB] },
        reveal: { angles: [L45_AOB, L45_ACB], chords: [["A", "B"]] },
      },
      c: {
        spec: specAfter(L45_BASE, L45_CHAIN.slice(0, 2)),
        question: { angles: [L45_OBA] },
        reveal: { angles: [L45_OBA, L45_A1, L45_AOB], chords: [["O", "A", "t1"], ["O", "B", "t1"]] },
      },
      d: {
        spec: specAfter(L45_BASE, L45_CHAIN.slice(0, 3)),
        question: { angles: [L45_A1, L45_A2] },
        reveal: { angles: [L45_OAT], chords: [["O", "A"]] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: { en: "Write down, with a reason, the size of &nbsp;∠ACB&nbsp; in terms of x." },
      hint: { en: "Â₂ sits between the tangent and the chord AB. Which point is in the segment on the other side of AB?" },
      memo: [
        { type: "answer", text: { en: "∠ACB = Â₂ = x &nbsp;&nbsp;<i>(tan chord theorem)</i> — the tangent–chord angle on chord AB, and the angle in the alternate segment" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "The first link in a chain of three theorems, and it is the one that gets the given x away from the tangent and out into the circle where the other theorems can reach it. Name the chord — AB — then look across it: C is sitting in the alternate segment, so the angle chord AB makes at C equals the angle it makes with the tangent at A. Nothing about working in letters changes the method; x is a perfectly good answer.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: { en: "Prove that &nbsp;∠AOB = 2x." },
      hint: { en: "∠AOB is at the centre. You have just found an angle at the circumference. Are they standing on the same chord?" },
      memo: [
        { type: "step", text: { en: "∠ACB = x &nbsp;<i>(from (a))</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∠AOB and ∠ACB both stand on chord AB, with C on the far arc." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ ∠AOB = 2 · ∠ACB = 2x &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the theorem pairs the angle at the centre with an angle at the CIRCUMFERENCE, not with the tangent–chord angle. Doubling Â₂ directly happens to give the same answer here, but only because part (a) moved it to C first — say that step out loud or the reasoning does not hold.",
        } },
      ],
      esplain: {
        en: "The second link. The chord AB is doing all the work in this question: it carries the given angle from the tangent across to C in part (a), and now it carries it from C in to the centre. Both angles stand on AB, one from the circumference and one from the centre, so the centre one is double. Notice that nothing in the question told you to do this — no arc is mentioned, the centre is not pointed at. Spotting that ∠ACB and ∠AOB are a centre-and-circumference pair on the same chord is the fetch, and it is what makes this a starred part rather than an easy one.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: { en: "Prove that &nbsp;∠OBA = 90° − x." },
      hint: { en: "Triangle OAB has two radii for sides, and you have just found the angle between them." },
      memo: [
        { type: "step", text: { en: "OA = OB &nbsp;<i>(radii)</i>, so &nbsp;∠OBA = Â₁ &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "In △OAB: &nbsp;2 · ∠OBA + ∠AOB = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>, &nbsp;so &nbsp;2 · ∠OBA + 2x = 180°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ ∠OBA = 90° − x" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The third link, and the most familiar one: two radii make an isosceles triangle, its base angles are equal, and the angle sum shares out whatever is left of 180°. The algebra is the only place to slip — both base angles are the same thing, so the equation is TWICE that thing plus 2x equals 180. Say it out loud as you write it. And sanity-check the answer's shape: 90 − x shrinks as x grows, which is right, because a bigger tangent–chord angle means a bigger angle at the centre and a flatter triangle.",
      },
    },
    {
      id: "d",
      marks: 3,
      level: 4,
      prompt: { en: "Hence show that &nbsp;∠OAT = 90°, &nbsp;and name the theorem this confirms." },
      hint: { en: "∠OAT is made of the two pieces at A. You were given one of them and you can now write down the other." },
      memo: [
        { type: "step", text: { en: "Â₁ = ∠OBA = 90° − x &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∠OAT = Â₁ + Â₂ = (90° − x) + x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ ∠OAT = 90°, which confirms &nbsp;<i>tan ⊥ radius</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: in an exam you may quote <i>tan ⊥ radius</i> in one line and be done. This question made you build it from the inside so you can see WHY it is true — it is not a licence to prove it every time.",
        } },
      ],
      esplain: {
        en: "The chase ends exactly where it started, and the x cancels — which is the point. Whatever angle the chord makes with the tangent, the angle from the chord round to the radius is exactly what is left of 90°, so the tangent and the radius always meet at a right angle. You have proved a theorem you have been quoting all chapter, using only the tangent–chord theorem, the angle at the centre and an isosceles triangle. That is worth sitting with, because it is a good picture of how the whole chapter fits together: the theorems are not a list of separate facts, they lean on one another, and most of them can be derived from the others if you are patient.",
      },
    },
  ],
};

/* =====================================================================
   ★ CARD 6 — PROVE A LINE IS A TANGENT, THE OTHER WAY
   ---------------------------------------------------------------------
   PC is given as a tangent; PA is drawn but NOT given, and part (a) has
   to prove it. The numbers are the 5 : 12 : 13 triangle:
     OA = 5 cm (radius) · AP = 12 cm · OP = 13 cm
     5² + 12² = 25 + 144 = 169 = 13²  ⟹ ∠OAP = 90° (converse Pythagoras)
     ⟹ PA ⊥ OA at A, a point on the circle ⟹ PA is a tangent
        (line ⊥ radius)
   THE DRAWING CARRIES THE SAME RATIO: R = 55 px and `ext` puts P at
   R / cos(67,380135°) = 143 px from O, so OA : OP = 55 : 143 = 5 : 13
   exactly and PA measures 132 px = 12 units. The figure is to scale in
   lengths as well as in angles.
   THE BARE-FIGURE RULE bites hardest here: NO right-angle square is
   drawn at A on any question side, because "∠OAP = 90°" is the whole of
   part (a). The square at C is different — PC is a tangent by the
   question's own stem, so its right angle is a given.
   ===================================================================== */
const L46_BASE = {
  w: 350, h: 206, cx: 90, cy: 120, R: 55,
  O: true,
  pts: { A: 67.380135, C: 292.619865 },
  ext: [{ name: "P", t: ["A", "C"] }],
  key: { at: "tr", lines: [{ t: "OA = 5 cm" }, { t: "AP = 12 cm" }, { t: "OP = 13 cm" }] },
  chords: [["O", "A"], ["O", "C"], ["O", "P"]],
  angles: [
    { at: "C", legs: ["P", "O"], t: "", o: { v: 90, mark: "square" } },
  ],
};
const L46_OCP = { at: "C", legs: ["P", "O"], v: 90, o: { mark: "square" } };
const L46_OAP = { at: "A", legs: ["O", "P"], v: 90, o: { mark: "square" } };
const L46_APO = { at: "P", legs: ["A", "O"], v: 22.619865 };
const L46_CPO = { at: "P", legs: ["C", "O"], v: 22.619865 };
const L46_CHAIN = [{ n: "∠OAP", v: "90°" }, { n: "PC", v: "12 cm" }];

const l46 = {
  id: "euclid.l4.q6",
  chapter: CH,
  topic: TOPIC,
  archetype: "converse-pythagoras-then-line-perpendicular-to-radius-proves-a-tangent",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 9,
  intro: {
    en: "In the diagram, O is the centre of the circle and &nbsp;PC&nbsp; is a tangent to the circle at C. &nbsp;A is a point on the circle and OA, OP and AP are drawn. &nbsp;OA = 5 cm, &nbsp;AP = 12 cm &nbsp;and&nbsp; OP = 13 cm.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(L46_BASE, []),
        question: { chords: [["O", "A"], ["A", "P"], ["O", "P"]] },
        reveal: { chords: [["O", "A"], ["A", "P"]], angles: [L46_OAP] },
      },
      b: {
        spec: specAfter(L46_BASE, L46_CHAIN.slice(0, 1)),
        question: { chords: [["P", "C"]] },
        reveal: { chords: [["A", "P", "t1"], ["P", "C", "t1"]] },
      },
      c: {
        spec: specAfter(L46_BASE, L46_CHAIN.slice(0, 2)),
        question: { angles: [L46_APO, L46_CPO] },
        reveal: { angles: [L46_APO, L46_CPO, L46_OAP, L46_OCP], chords: [["O", "A", "t1"], ["O", "C", "t1"], ["O", "P"]] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 4,
      level: 4,
      prompt: { en: "Prove that &nbsp;PA&nbsp; is a tangent to the circle at A." },
      hint: { en: "Nothing here mentions an angle at all — only three lengths. What can three lengths of a triangle tell you about one of its angles? And once you have that angle, what makes a line a tangent?" },
      memo: [
        { type: "step", text: { en: "OA² + AP² = 5² + 12² = 25 + 144 = 169" }, ticks: ["s/f"] },
        { type: "step", text: { en: "OP² = 13² = 169, &nbsp;so &nbsp;OA² + AP² = OP²" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ ∠OAP = 90° &nbsp;&nbsp;<i>(converse Pythagoras)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "PA ⊥ OA at A, and A is a point on the circle<br>∴ PA is a tangent to the circle at A &nbsp;&nbsp;<i>(line ⊥ radius)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the right angle on its own is NOT the answer. A line perpendicular to a radius somewhere in the middle of the circle is just a chord — it only becomes a tangent because the perpendicular happens at A, which is <b>on the circle</b>. Say that in your last line.",
        } },
      ],
      esplain: {
        en: "This is the other way to prove a line is a tangent, and it is the one that turns up when a question gives you lengths instead of angles. Two theorems, both converses, one after the other. First, the converse of Pythagoras: if the two shorter sides squared add up to the longest side squared, the triangle must be right-angled, and the right angle sits opposite the longest side — here at A. Second, the converse of “tangent perpendicular to radius”: a line drawn at right angles to a radius at the point where that radius meets the circle is a tangent. The order matters and so do the words: get the right angle first, then say where it is, then name the tangent. Recognising 5, 12, 13 on sight saves you the arithmetic, and it is worth learning alongside 3, 4, 5 and 8, 15, 17.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: { en: "Write down, with a reason, the length of &nbsp;PC." },
      hint: { en: "You have just proved that PA is a tangent, and the question told you PC is one. Both start at the same point outside the circle." },
      memo: [
        { type: "answer", text: { en: "PC = PA = 12 cm &nbsp;&nbsp;<i>(tans from common pt)</i>" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "Two tangents drawn to a circle from the same outside point are always exactly the same length — think of a piece of string pulled taut round a ball from one hand. What makes this a level-three part rather than a one-mark gift is that you are only allowed to use the theorem because part (a) proved PA is a tangent in the first place. If a question ever asks you to “write down” something that leans on a proof you have just done, say so in your reason; a marker likes to see that you know why you are allowed.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: { en: "Prove that &nbsp;∠APO = ∠CPO." },
      hint: { en: "Compare triangle OAP with triangle OCP. What do they share, and what do you already know about each of them?" },
      memo: [
        { type: "step", text: { en: "In △OAP and △OCP: &nbsp;∠OAP = ∠OCP = 90° &nbsp;&nbsp;<i>(tan ⊥ radius)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "OP = OP &nbsp;<i>(common)</i>; &nbsp;OA = OC &nbsp;<i>(radii)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ △OAP ≡ △OCP &nbsp;&nbsp;<i>(RHS)</i><br>∴ ∠APO = ∠CPO" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: congruency needs <b>three</b> facts and the right label. Right angle, hypotenuse, side &nbsp;⟹&nbsp; <b>RHS</b>. Writing SSS or SAS here scores nothing, even though the two triangles really are congruent.",
        } },
      ],
      esplain: {
        en: "The two triangles each have a right angle, they share the whole line OP as a hypotenuse, and their remaining sides OA and OC are radii, so they are the same length. Right angle, hypotenuse, side — that is RHS, and congruent triangles have every matching part equal, including the two angles at P. What you have really proved is that OP bisects the angle between the two tangents, which is true of every pair of tangents from an outside point and is worth remembering as a fact in its own right. Bank the earlier marks before you start this one: it leans on part (a) for the right angle at A and on the question's own stem for the one at C.",
      },
    },
  ],
};

export const euclidLevel4Questions = [l41, l42, l43, l44, l45, l46];
