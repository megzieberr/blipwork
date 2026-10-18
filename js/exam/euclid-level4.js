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
    en: "In the diagram, A, B and C are points on the circle and AB, AC and BC are drawn. &nbsp;DAE is a straight line through A, with D and E on opposite sides of A. &nbsp;Â₁ = 55°, &nbsp;Â₂ = 60° &nbsp;and&nbsp; ∠ABC = 65°.", af: "In die diagram is A, B en C punte op die sirkel, en AB, AC en BC is getrek. &nbsp;DAE is 'n reguit lyn deur A, met D en E aan weerskante van A. &nbsp;Â₁ = 55°, &nbsp;Â₂ = 60° &nbsp;en&nbsp; ∠ABC = 65°.",
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
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠ACB.", af: "Bepaal, met 'n rede, die grootte van &nbsp;∠ACB." },
      hint: { en: "Triangle ABC has two of its three angles sitting on the page already.", af: "Driehoek ABC het reeds twee van sy drie hoeke op die bladsy." },
      memo: [
        { type: "step", text: { en: "In △ABC: &nbsp;∠ACB + Â₂ + ∠ABC = 180° &nbsp;&nbsp;<i>(int. ∠s of △)</i>", af: "In △ABC: &nbsp;∠ACB + Â₂ + ∠ABC = 180° &nbsp;&nbsp;<i>(binne ∠e △)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠ACB = 180° − 60° − 65° = 55°", af: "∴ ∠ACB = 180° − 60° − 65° = 55°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Nothing clever, and that is deliberate — this is the mark the question gives you before it asks for anything hard. The three angles of a triangle add to 180°, two of them were given, so the third falls out. What matters is the number that comes out: 55°, which is exactly what Â₁ was given as, at the other end of the picture. Two equal angles like that, one squeezed between a chord and a line and the other sitting across the circle, are the fingerprint of one particular theorem — and the next part is going to make you name it.", af: "Niks slim nie, en dit is doelbewus: dit is die punt wat die vraag vir jou gee voordat dit iets moeiliks vra. Die drie hoeke van 'n driehoek tel op tot 180°, twee daarvan is gegee, so die derde val net uit. Wat saak maak, is die getal wat uitkom: 55°, presies wat Â₁ gegee is, aan die ander kant van die prent. Twee gelyke hoeke soos dié, een vasgedruk tussen 'n koord en 'n lyn en die ander oorkant in die sirkel, is die vingerafdruk van een bepaalde stelling, en die volgende deel gaan jou dit laat benoem.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: { en: "Prove that &nbsp;DAE&nbsp; is a tangent to the circle at A.", af: "Bewys dat &nbsp;DAE&nbsp; 'n raaklyn aan die sirkel by A is." },
      hint: { en: "Nothing here says “tangent” yet, so you have to work backwards. If DAE really were a tangent, what would the angle between it and the chord AB have to equal — and does it?", af: "Niks hier sê nog “raaklyn” nie, so jy moet terugwerk. As DAE regtig 'n raaklyn was, waaraan sou die hoek tussen dit en die koord AB gelyk moes wees, en is dit?" },
      memo: [
        { type: "step", text: { en: "Â₁ = 55° &nbsp;and&nbsp; ∠ACB = 55°, &nbsp;so &nbsp;Â₁ = ∠ACB", af: "Â₁ = 55° &nbsp;en&nbsp; ∠ACB = 55°, &nbsp;dus &nbsp;Â₁ = ∠ACB" }, ticks: ["ca"] },
        { type: "step", text: { en: "Â₁ is the angle between the line DAE and the chord AB, and ∠ACB is the angle that chord AB makes in the alternate segment.", af: "Â₁ is die hoek tussen die lyn DAE en die koord AB, en ∠ACB is die hoek wat koord AB in die oorstaande segment onderspan." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ DAE is a tangent to the circle at A &nbsp;&nbsp;<i>(converse tan chord theorem)</i>", af: "∴ DAE is 'n raaklyn aan die sirkel by A &nbsp;&nbsp;<i>(omgekeerde raaklyn koord stelling)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: say which CHORD and which SEGMENT. “The angles are equal, so it is a tangent” is not a proof — the marker needs to see that Â₁ is the angle between the line and chord AB, and that C is in the segment on the other side of AB.", af: "PASOP: sê watter KOORD en watter SEGMENT. “Die hoeke is gelyk, dus is dit 'n raaklyn” is nie 'n bewys nie: die nasiener moet sien dat Â₁ die hoek tussen die lyn en koord AB is, en dat C in die segment aan die ander kant van AB lê.",
        } },
      ],
      esplain: {
        en: "This is the hardest single mark in Grade 11 Euclidean geometry, and it is hard for one reason: nothing in the question cues you. The word tangent does not appear, no right angle is mentioned, and the line is just “a straight line through A”. What you have to do is run a theorem backwards. Forwards, the tangent–chord theorem says: if a line is a tangent, then the angle it makes with a chord equals the angle in the alternate segment. Backwards it says: if that angle equality holds, the line must be a tangent. So the plan is always the same — find the angle in the alternate segment, find the angle between the line and the chord, show they are equal, and name the converse. Once you have seen the shape of it once, every version of this question looks the same.", af: "Dit is die moeilikste enkele punt in Graad 11 Euklidiese meetkunde, en dit is moeilik om een rede: niks in die vraag gee jou 'n wenk nie. Die woord raaklyn kom nie voor nie, geen regte hoek word genoem nie, en die lyn is net “'n reguit lyn deur A”. Wat jy moet doen, is om 'n stelling agteruit te gebruik. Vorentoe sê die raaklyn koord stelling: as 'n lyn 'n raaklyn is, dan is die hoek wat dit met 'n koord maak gelyk aan die hoek in die oorstaande segment. Agteruit sê dit: as daardie twee hoeke gelyk is, moet die lyn 'n raaklyn wees. Die plan is dus altyd dieselfde: vind die hoek in die oorstaande segment, vind die hoek tussen die lyn en die koord, toon aan dat hulle gelyk is, en noem die omgekeerde. Sodra jy die vorm een keer gesien het, lyk elke weergawe van hierdie vraag dieselfde.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: { en: "Hence determine, with reasons, the size of &nbsp;Â₃.", af: "Bepaal vervolgens, met redes, die grootte van &nbsp;Â₃." },
      hint: { en: "The word “hence” means you are now allowed to use what you proved. What does the tangent–chord theorem say about the OTHER chord out of A?", af: "Die woord “vervolgens” beteken jy mag nou gebruik wat jy bewys het. Wat sê die raaklyn koord stelling oor die ANDER koord uit A?" },
      memo: [
        { type: "step", text: { en: "DAE is a tangent &nbsp;<i>(proved in (b))</i>, and Â₃ is the angle between it and the chord AC.", af: "DAE is 'n raaklyn &nbsp;<i>(bewys in (b))</i>, en Â₃ is die hoek tussen dit en die koord AC." }, ticks: ["s/f"] },
        { type: "step", text: { en: "∠ABC is the angle in the alternate segment on chord AC. &nbsp;&nbsp;<i>(tan chord theorem)</i>", af: "∠ABC is die hoek in die oorstaande segment op koord AC. &nbsp;&nbsp;<i>(raaklyn koord stelling)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ Â₃ = ∠ABC = 65°", af: "∴ Â₃ = ∠ABC = 65°" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — along the straight line instead: &nbsp;Â₁ + Â₂ + Â₃ = 180° &nbsp;<i>(∠s on a str line)</i>, so Â₃ = 180° − 55° − 60° = 65°. &nbsp;Same marks.", af: "<b>OF</b>, eerder langs die reguit lyn: &nbsp;Â₁ + Â₂ + Â₃ = 180° &nbsp;<i>(∠e op reguit lyn)</i>, dus Â₃ = 180° − 55° − 60° = 65°. &nbsp;Dieselfde punte." } },
      ],
      esplain: {
        en: "Two roads, and it is worth walking both. The straight-line road needs no theorem at all: D, A and E are collinear, so the three angles at A add to 180°. The tangent road uses what part (b) bought you — now that DAE is known to be a tangent, the theorem works forwards on the second chord AC and hands you ∠ABC. The two agreeing is the figure checking itself. In an exam, when a part says “hence”, the examiner is telling you which road they want; take the other one as your check rather than as your answer.", af: "Twee paaie, en dit is die moeite werd om albei te loop. Die reguitlyn-pad het glad nie 'n stelling nodig nie: D, A en E is saamlynig, so die drie hoeke by A tel op tot 180°. Die raaklyn-pad gebruik wat deel (b) vir jou gekoop het: noudat ons weet DAE is 'n raaklyn, werk die stelling vorentoe op die tweede koord AC en gee dit vir jou ∠ABC. Dat die twee ooreenstem, is die figuur wat homself kontroleer. As 'n deel in 'n eksamen “vervolgens” sê, wys die eksaminator vir jou watter pad verwag word; gebruik die ander een as jou kontrole eerder as jou antwoord.",
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
     ∠AED = 180 − x − y     (int. ∠s of △, part (a))
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
    en: "In the diagram, ADB and AEC are straight lines and DE is drawn. &nbsp;<b>No circle is drawn.</b> &nbsp;∠ADE = ∠ACB = x &nbsp;and&nbsp; ∠BAC = y.", af: "In die diagram is ADB en AEC reguit lyne, en DE is getrek. &nbsp;<b>Geen sirkel is getrek nie.</b> &nbsp;∠ADE = ∠ACB = x &nbsp;en&nbsp; ∠BAC = y.",
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
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠AED&nbsp; in terms of x and y.", af: "Bepaal, met 'n rede, die grootte van &nbsp;∠AED&nbsp; in terme van x en y." },
      hint: { en: "Triangle ADE has two of its angles marked already — one of them is x and the other is y.", af: "Driehoek ADE het reeds twee van sy hoeke gemerk: een is x en die ander is y." },
      memo: [
        { type: "step", text: { en: "In △ADE: &nbsp;∠AED + ∠ADE + ∠DAE = 180° &nbsp;&nbsp;<i>(int. ∠s of △)</i>", af: "In △ADE: &nbsp;∠AED + ∠ADE + ∠DAE = 180° &nbsp;&nbsp;<i>(binne ∠e △)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠AED = 180° − x − y", af: "∴ ∠AED = 180° − x − y" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: ∠DAE and ∠BAC are the <b>same angle</b> — D is on AB and E is on AC, so the ray AD points where AB points and AE points where AC points. That is why the given y can be used inside the small triangle.", af: "ONTHOU: ∠DAE en ∠BAC is <b>dieselfde hoek</b>: D lê op AB en E lê op AC, so die straal AD wys waarheen AB wys en AE wys waarheen AC wys. Dit is hoekom die gegewe y binne die klein driehoek gebruik kan word.",
        } },
      ],
      esplain: {
        en: "There is not a circle in sight yet, so every circle theorem is switched off and all you have is ordinary triangle work. The one thing to see clearly is that the small triangle ADE and the big triangle ABC share their angle at A, because D and E lie on the two arms. Once you spot that, the small triangle has x at D, y at A, and the rest of 180° left over for E. Working in letters instead of numbers changes nothing about the method — you just carry the letters through instead of adding.", af: "Daar is nog nie 'n sirkel in sig nie, so elke sirkelstelling is afgeskakel en al wat jy het, is gewone driehoekwerk. Die een ding om duidelik te sien, is dat die klein driehoek ADE en die groot driehoek ABC hul hoek by A deel, want D en E lê op die twee bene. Sodra jy dit raaksien, het die klein driehoek x by D, y by A, en die res van 180° bly oor vir E. Om met letters in plaas van getalle te werk, verander niks aan die metode nie: jy dra net die letters deur in plaas daarvan om op te tel.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: { en: "Prove that &nbsp;DECB&nbsp; is a cyclic quadrilateral.", af: "Bewys dat &nbsp;DECB&nbsp; 'n koordevierhoek is." },
      hint: { en: "ADB is a straight line, so ∠ADE is sticking out of the four-sided shape DECB at the corner D. Which of that shape's own angles does the question already say it equals?", af: "ADB is 'n reguit lyn, so ∠ADE steek by die hoekpunt D uit die vierhoek DECB uit. Aan watter van daardie vierhoek se eie hoeke is dit volgens die vraag reeds gelyk?" },
      memo: [
        { type: "step", text: { en: "ADB is a straight line, so ∠ADE is the EXTERIOR angle of quadrilateral DECB at D.", af: "ADB is 'n reguit lyn, so ∠ADE is die BUITEHOEK van vierhoek DECB by D." }, ticks: ["s/f"] },
        { type: "step", text: { en: "The interior opposite angle of DECB is the one at C, which is ∠BCE = ∠ACB = x.", af: "Die teenoorstaande binnehoek van DECB is die een by C, en dit is ∠BCE = ∠ACB = x." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∠ADE = ∠ACB = x, &nbsp;so the exterior angle equals the interior opposite angle<br>∴ DECB is a cyclic quadrilateral &nbsp;&nbsp;<i>(ext ∠ = int opp ∠)</i>", af: "∠ADE = ∠ACB = x, &nbsp;dus is die buitehoek gelyk aan die teenoorstaande binnehoek<br>∴ DECB is 'n koordevierhoek &nbsp;&nbsp;<i>(buite ∠ van vierhoek = teenoorst. binne ∠)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: read <b>DECB</b> in order — D, then E, then C, then B. That is the way the four sides run, and it is what makes C the corner OPPOSITE D. Matching ∠ADE with the angle at E or at B proves nothing at all.", af: "PASOP: lees <b>DECB</b> in volgorde: D, dan E, dan C, dan B. Só loop die vier sye, en dit is wat C die hoekpunt TEENOOR D maak. As jy ∠ADE met die hoek by E of by B pas, bewys dit glad niks nie.",
        } },
      ],
      esplain: {
        en: "There are three standard ways to prove four points lie on a circle, and this figure is built for the exterior-angle one. One is opposite angles adding to 180°, another is a line segment making equal angles at two points on the same side of it, and the third, the one you need here, is the exterior-angle test: if the angle sticking out at one corner of a quadrilateral equals the interior angle at the corner diagonally across from it, the four corners lie on one circle. That is the converse of the theorem you use forwards on every cyclic quadrilateral, and the SAG short form for it is “ext ∠ = int opp ∠”. What makes this card level 4 is that there are no numbers anywhere — you cannot check anything by arithmetic, so the reasoning has to carry all your confidence. Name the quadrilateral in order, name the exterior angle, name the interior opposite angle, then say they are equal. Four short lines, three marks.", af: "Daar is drie standaardmaniere om te bewys dat vier punte op 'n sirkel lê, en hierdie figuur is vir die buitehoektoets gebou. Een is teenoorstaande hoeke wat optel tot 180°, nog een is 'n lynstuk wat gelyke hoeke maak by twee punte aan dieselfde kant daarvan, en die derde, die een wat jy hier nodig het, is die buitehoektoets: as die hoek wat by een hoekpunt van 'n vierhoek uitsteek gelyk is aan die binnehoek by die hoekpunt skuins oorkant, lê die vier hoekpunte op een sirkel. Dit is die omgekeerde van die stelling wat jy vorentoe op elke koordevierhoek gebruik, en die SAG se verkorte vorm daarvoor is “buite ∠ van vierhoek = teenoorst. binne ∠”. Wat hierdie kaart vlak 4 maak, is dat daar nêrens getalle is nie: jy kan niks met rekenwerk kontroleer nie, so die redenasie moet al jou vertroue dra. Benoem die vierhoek in volgorde, benoem die buitehoek, benoem die teenoorstaande binnehoek, en sê dan dat hulle gelyk is. Vier kort reëls, drie punte.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: { en: "Hence determine, with reasons, the size of &nbsp;∠DBC&nbsp; in terms of x and y.", af: "Bepaal vervolgens, met redes, die grootte van &nbsp;∠DBC&nbsp; in terme van x en y." },
      hint: { en: "AEC is a straight line too, so ∠DEC and ∠AED are neighbours on it. Then use the circle you have just proved into existence.", af: "AEC is ook 'n reguit lyn, so ∠DEC en ∠AED is bure daarop. Gebruik dan die sirkel wat jy pas bewys het." },
      memo: [
        { type: "step", text: { en: "AEC is a straight line, so &nbsp;∠DEC = 180° − ∠AED = 180° − (180° − x − y) = x + y &nbsp;&nbsp;<i>(∠s on a str line)</i>", af: "AEC is 'n reguit lyn, dus &nbsp;∠DEC = 180° − ∠AED = 180° − (180° − x − y) = x + y &nbsp;&nbsp;<i>(∠e op reguit lyn)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "In cyclic quad DECB: &nbsp;∠DBC + ∠DEC = 180° &nbsp;&nbsp;<i>(opp ∠s of cyclic quad)</i>", af: "In koordevierhoek DECB: &nbsp;∠DBC + ∠DEC = 180° &nbsp;&nbsp;<i>(teenoorst. ∠e van kvh)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ ∠DBC = 180° − (x + y) = 180° − x − y", af: "∴ ∠DBC = 180° − (x + y) = 180° − x − y" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — without the circle at all: &nbsp;in △ABC, &nbsp;∠ABC = 180° − ∠BAC − ∠ACB = 180° − y − x &nbsp;<i>(int. ∠s of △)</i>, and ∠DBC is that same angle. &nbsp;Same marks.", af: "<b>OF</b>, glad sonder die sirkel: &nbsp;in △ABC is &nbsp;∠ABC = 180° − ∠BAC − ∠ACB = 180° − y − x &nbsp;<i>(binne ∠e △)</i>, en ∠DBC is daardie selfde hoek. &nbsp;Dieselfde punte." } },
      ],
      esplain: {
        en: "Two roads again, and the fact that they agree is a genuinely useful sanity check on the proof in part (b) — if the circle you proved into existence gave a different answer from ordinary triangle work, something would be wrong. The circle road is the one the word “hence” is asking for: E and B are opposite corners of the cyclic quadrilateral, so their angles add to 180°, and ∠DEC came from the straight line AEC. The triangle road ignores the circle completely. Being able to see both is what makes you quick in an exam, because you can start on whichever one you spot first and use the other to check.", af: "Weer twee paaie, en dat hulle ooreenstem, is 'n regtig nuttige toets vir die bewys in deel (b): as die sirkel wat jy bewys het 'n ander antwoord gee as gewone driehoekwerk, sou iets fout wees. Die sirkelpad is die een waarna die woord “vervolgens” vra: E en B is teenoorstaande hoekpunte van die koordevierhoek, so hul hoeke tel op tot 180°, en ∠DEC kom van die reguit lyn AEC. Die driehoekpad ignoreer die sirkel heeltemal. As jy albei kan sien, is jy vinnig in 'n eksamen, want jy kan begin met die een wat jy eerste raaksien en die ander gebruik om te kontroleer.",
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
    en: "In the diagram, O is the centre of the circle and the radius is r. &nbsp;XY is a chord with &nbsp;XY = r, &nbsp;and M is a point on XY such that &nbsp;OM ⊥ XY. &nbsp;Z is a point on the major arc XY, and XZ and YZ are drawn.", af: "In die diagram is O die middelpunt van die sirkel en die radius is r. &nbsp;XY is 'n koord met &nbsp;XY = r, &nbsp;en M is 'n punt op XY sodat &nbsp;OM ⊥ XY. &nbsp;Z is 'n punt op die groot boog XY, en XZ en YZ is getrek.",
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
      prompt: { en: "Write down, with a reason, the length of &nbsp;XM&nbsp; in terms of r.", af: "Skryf, met 'n rede, die lengte van &nbsp;XM&nbsp; in terme van r neer." },
      hint: { en: "OM comes from the centre and meets the chord at right angles. There is one theorem about what a line like that does to a chord — and remember how long XY is.", af: "OM kom uit die middelpunt van die sirkel en tref die koord loodreg. Daar is een stelling oor wat so 'n lyn aan 'n koord doen, en onthou hoe lank XY is." },
      memo: [
        { type: "step", text: { en: "OM ⊥ XY, so &nbsp;XM = MY &nbsp;&nbsp;<i>(line from centre ⊥ to chord)</i>", af: "OM ⊥ XY, dus &nbsp;XM = MY &nbsp;&nbsp;<i>(lyn vanuit midpt ⊥ op koord)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ XM = ½ · XY = r/2", af: "∴ XM = ½ · XY = r/2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A line dropped from the centre at right angles to a chord always cuts that chord exactly in half — it is the one theorem in the chapter that turns a right angle into a length. Here the chord happens to be as long as the radius, so half of it is half the radius. Working in letters is no harder than working in numbers: r/2 is a complete answer and no number is ever coming. The one thing to be careful of is that “the line from the centre” has to really come from the centre — the theorem says nothing about a perpendicular dropped from some other point, so you cannot quote it then.", af: "'n Lyn wat uit die middelpunt van die sirkel loodreg op 'n koord neergelaat word, sny daardie koord altyd presies middeldeur: dit is die een stelling in die hoofstuk wat 'n regte hoek in 'n lengte omskakel. Hier is die koord toevallig so lank soos die radius, so die helfte daarvan is die helfte van die radius. Om met letters te werk is nie moeiliker as met getalle nie: r/2 is 'n volledige antwoord, en daar kom nooit 'n getal nie. Die een ding om voor op te pas, is dat “die lyn uit die middelpunt” regtig uit die middelpunt van die sirkel moet kom: die stelling sê niks oor 'n loodlyn van 'n ander punt af nie, so dan kan jy dit nie aanhaal nie.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: { en: "Show that &nbsp;OM = (r√3)/2.", af: "Toon aan dat &nbsp;OM = (r√3)/2." },
      hint: { en: "Look at triangle OXM on its own. You know the right angle, you know the hypotenuse and you have just found one of the short sides.", af: "Kyk na driehoek OXM op sy eie. Jy ken die regte hoek, jy ken die skuinssy en jy het pas een van die kort sye gevind." },
      memo: [
        { type: "step", text: { en: "OX is a radius, so &nbsp;OX = r, &nbsp;and&nbsp; ∠OMX = 90° &nbsp;&nbsp;<i>(given: OM ⊥ XY)</i>", af: "OX is 'n radius, dus &nbsp;OX = r, &nbsp;en&nbsp; ∠OMX = 90° &nbsp;&nbsp;<i>(gegee: OM ⊥ XY)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "In △OXM: &nbsp;OM² = OX² − XM² = r² − (r/2)² = r² − r²/4 = (3r²)/4 &nbsp;&nbsp;<i>(Pythagoras)</i>", af: "In △OXM: &nbsp;OM² = OX² − XM² = r² − (r/2)² = r² − r²/4 = (3r²)/4 &nbsp;&nbsp;<i>(Pythagoras)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ OM = √((3r²)/4) = (r√3)/2", af: "∴ OM = √((3r²)/4) = (r√3)/2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: &nbsp;(r/2)² is &nbsp;r²/4, not &nbsp;r²/2. Squaring a fraction squares the bottom as well as the top — that one slip turns √3 into √2 and loses the answer mark.", af: "PASOP: &nbsp;(r/2)² is &nbsp;r²/4, nie &nbsp;r²/2 nie. As jy 'n breuk kwadreer, kwadreer jy die onderkant sowel as die bokant: daardie een glips maak van √3 'n √2 en kos jou die antwoordpunt.",
        } },
      ],
      esplain: {
        en: "This is Pythagoras doing exactly what it always does, with letters instead of numbers. The right angle sits at M, so OX is the hypotenuse and the two short sides are OM and XM. Subtract, and the r² factors out neatly. The square-rooting at the end is where the surd appears: the square root of three-quarters of r² is r times the square root of three, over two. A “show that” instruction means the answer has been given to you, so the marks are all in the working — never write down the final line on its own and hope. And notice how much a letter-only answer tells you: OM is about 0,87 of the radius, whatever the circle's actual size.", af: "Dit is Pythagoras wat presies doen wat dit altyd doen, met letters in plaas van getalle. Die regte hoek is by M, so OX is die skuinssy en die twee kort sye is OM en XM. Trek af, en die r² kom netjies uit as faktor. Die vierkantswortel aan die einde is waar die wortelvorm verskyn: die vierkantswortel van driekwart van r² is r maal die vierkantswortel van drie, oor twee. 'n “Toon aan”-opdrag beteken die antwoord is vir jou gegee, so al die punte lê in die bewerking: moet nooit net die laaste reël neerskryf en hoop nie. En let op hoeveel 'n antwoord met net letters jou vertel: OM is ongeveer 0,87 van die radius, maak nie saak hoe groot die sirkel regtig is nie.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: { en: "Determine, with reasons, the size of &nbsp;∠XZY.", af: "Bepaal, met redes, die grootte van &nbsp;∠XZY." },
      hint: { en: "Nothing here mentions an angle, so you have to make one. What kind of triangle is OXY, given that all three of its sides are the same length?", af: "Niks hier noem 'n hoek nie, so jy moet self een maak. Watter soort driehoek is OXY, as al drie sy sye ewe lank is?" },
      memo: [
        { type: "step", text: { en: "OX = OY = r &nbsp;<i>(radii)</i> &nbsp;and&nbsp; XY = r &nbsp;<i>(given)</i>, so △OXY is equilateral.", af: "OX = OY = r &nbsp;<i>(radii)</i> &nbsp;en&nbsp; XY = r &nbsp;<i>(gegee)</i>, dus is △OXY gelyksydig." }, ticks: ["s/f"] },
        { type: "step", text: { en: "∴ ∠XOY = 60° &nbsp;&nbsp;<i>(∠s opp equal sides; int. ∠s of △)</i>", af: "∴ ∠XOY = 60° &nbsp;&nbsp;<i>(∠e teenoor gelyke sye; binne ∠e △)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∠XZY = ½ · ∠XOY &nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i> &nbsp;— both stand on chord XY<br>∴ ∠XZY = ½ × 60° = 30°", af: "∠XZY = ½ · ∠XOY &nbsp;<i>(Midpt∠ = 2 × Omtreks∠)</i>, &nbsp;albei staan op koord XY<br>∴ ∠XZY = ½ × 60° = 30°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: this is a NUMBER, even though everything else in the question was in terms of r. The angle a chord subtends does not depend on how big the circle is — only on how the chord compares with the radius.", af: "ONTHOU: dit is 'n GETAL, al was alles anders in die vraag in terme van r. Die hoek wat 'n koord onderspan, hang nie af van hoe groot die sirkel is nie, net van hoe die koord met die radius vergelyk.",
        } },
      ],
      esplain: {
        en: "The fetch in this part is realising that “XY = r” is secretly an angle fact. Two of the triangle's sides are radii, so they are r; the third side is the chord, and the question told you it is r as well. Three equal sides means an equilateral triangle, which means all three of its angles are 60°. From there the ordinary angle-at-centre theorem finishes it: Z is out on the circumference looking at the same chord XY, so its angle is half. It is worth remembering the result on its own — a chord as long as the radius always subtends 30° at any point on the major arc — because it turns up in Grade 12 as well.", af: "Wat jy in hierdie deel self moet gaan haal, is dat “XY = r” eintlik 'n hoekfeit is. Twee van die driehoek se sye is radii, so hulle is r; die derde sy is die koord, en die vraag het gesê dit is ook r. Drie gelyke sye beteken 'n gelyksydige driehoek, en dan is al drie sy hoeke 60°. Van daar af maak die gewone stelling oor die middelpuntshoek dit klaar: Z lê buite op die omtrek en kyk na dieselfde koord XY, so sy hoek is die helfte. Dit is die moeite werd om die resultaat op sy eie te onthou: 'n koord so lank soos die radius onderspan altyd 30° by enige punt op die groot boog, en dit kom ook in Graad 12 voor.",
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
    en: "In the diagram, &nbsp;SU&nbsp; is a tangent to the circle at A. &nbsp;B and C are points on the circle, and AB, AC and BC are drawn. &nbsp;Â₁ = Â₃ = x.", af: "In die diagram is &nbsp;SU&nbsp; 'n raaklyn aan die sirkel by A. &nbsp;B en C is punte op die sirkel, en AB, AC en BC is getrek. &nbsp;Â₁ = Â₃ = x.",
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
      prompt: { en: "Write down, with a reason, the size of &nbsp;∠ACB&nbsp; in terms of x.", af: "Skryf, met 'n rede, die grootte van &nbsp;∠ACB&nbsp; in terme van x neer." },
      hint: { en: "Â₁ is squeezed between the tangent and the chord AB. Which point in the picture sits in the segment on the far side of AB?", af: "Â₁ is vasgedruk tussen die raaklyn en die koord AB. Watter punt in die prent lê in die segment aan die oorkant van AB?" },
      memo: [
        { type: "answer", text: { en: "∠ACB = Â₁ = x &nbsp;&nbsp;<i>(tan chord theorem)</i> — the tangent–chord angle on chord AB, and the angle in the alternate segment", af: "∠ACB = Â₁ = x &nbsp;&nbsp;<i>(raaklyn koord stelling)</i>: die hoek tussen die raaklyn en koord AB, en die hoek in die oorstaande segment" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "The tangent–chord theorem, used the ordinary way round. Name the chord first — it is AB — then find the point on the other side of it, which is C. The angle the tangent makes with AB at A, and the angle AB makes at C, are always the same size. Working in x rather than in numbers changes nothing at all: the answer is simply x, and that is a complete answer. Both marks here are on the page in one line, but only if the reason is written beside the size.", af: "Die raaklyn koord stelling, op die gewone manier gebruik. Benoem eers die koord (dit is AB), en vind dan die punt aan die ander kant daarvan, wat C is. Die hoek wat die raaklyn by A met AB maak, en die hoek wat AB by C onderspan, is altyd ewe groot. Om met x in plaas van getalle te werk, verander niks nie: die antwoord is eenvoudig x, en dit is 'n volledige antwoord. Albei punte hier lê in een reël op die bladsy, maar net as die rede langs die grootte geskryf is.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: { en: "Write down, with a reason, the size of &nbsp;∠ABC&nbsp; in terms of x.", af: "Skryf, met 'n rede, die grootte van &nbsp;∠ABC&nbsp; in terme van x neer." },
      hint: { en: "Same theorem, other side. The chord is AC this time — so who is in ITS alternate segment?", af: "Dieselfde stelling, ander kant. Die koord is hierdie keer AC: wie lê dus in SY oorstaande segment?" },
      memo: [
        { type: "answer", text: { en: "∠ABC = Â₃ = x &nbsp;&nbsp;<i>(tan chord theorem)</i> — the tangent–chord angle on chord AC, and the angle in the alternate segment", af: "∠ABC = Â₃ = x &nbsp;&nbsp;<i>(raaklyn koord stelling)</i>: die hoek tussen die raaklyn en koord AC, en die hoek in die oorstaande segment" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "Two chords leave A, so the tangent–chord theorem is available twice — chord AB sending its angle across to C, and chord AC sending its angle across to B. Learners often think the theorem is about “the tangent angle”, singular, and then cannot see where a second one could come from. It is about a CHORD and the tangent, so count your chords. And here both tangent–chord angles are the same x, which is exactly the setup the next part needs.", af: "Twee koorde vertrek uit A, so jy kan die raaklyn koord stelling twee keer gebruik: koord AB stuur sy hoek oor na C, en koord AC stuur sy hoek oor na B. Leerders dink dikwels die stelling gaan oor “die raaklynhoek”, enkelvoud, en kan dan nie sien waar 'n tweede een vandaan kan kom nie. Dit gaan oor 'n KOORD en die raaklyn, so tel jou koorde. En hier is albei hoeke tussen raaklyn en koord dieselfde x, en dit is presies die opset wat die volgende deel nodig het.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: { en: "Prove that &nbsp;AB = AC.", af: "Bewys dat &nbsp;AB = AC." },
      hint: { en: "Look at triangle ABC on its own now, and forget the tangent. What have you just found out about two of its angles — and which sides face them?", af: "Kyk nou na driehoek ABC op sy eie, en vergeet die raaklyn. Wat het jy pas oor twee van sy hoeke uitgevind, en watter sye is teenoor hulle?" },
      memo: [
        { type: "step", text: { en: "In △ABC: &nbsp;∠ABC = x &nbsp;and&nbsp; ∠ACB = x", af: "In △ABC: &nbsp;∠ABC = x &nbsp;en&nbsp; ∠ACB = x" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ ∠ABC = ∠ACB", af: "∴ ∠ABC = ∠ACB" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ AC = AB &nbsp;&nbsp;<i>(sides opp equal ∠s)</i>", af: "∴ AC = AB &nbsp;&nbsp;<i>(sye teenoor gelyke ∠e)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: name the sides that are <b>opposite</b> the two equal angles. ∠ABC is at B, and the side facing it across the triangle is AC; ∠ACB is at C, and the side facing it is AB. Naming the wrong pair scores nothing, even though the triangle really is isosceles.", af: "PASOP: noem die sye wat <b>teenoor</b> die twee gelyke hoeke lê. ∠ABC is by B, en die sy oorkant in die driehoek is AC; ∠ACB is by C, en die sy oorkant is AB. As jy die verkeerde paar noem, kry jy niks nie, al is die driehoek regtig gelykbenig.",
        } },
      ],
      esplain: {
        en: "This is the isosceles theorem run backwards, and the SAG gives each direction its own short form: “∠s opp equal sides” when you go from equal sides to equal angles, and “sides opp equal ∠s” when you go the other way. Use the one that matches what you actually have, or a marker will read your proof as circular. What makes the card level 4 is that nothing cued you to look at triangle ABC — the given was about two angles on a tangent, and you had to walk them both across the circle before the triangle became interesting. Once they arrived, the proof is two lines.", af: "Dit is die stelling van die gelykbenige driehoek agteruit gebruik, en die SAG gee elke rigting sy eie verkorte vorm: “∠e teenoor gelyke sye” as jy van gelyke sye na gelyke hoeke gaan, en “sye teenoor gelyke ∠e” as jy andersom gaan. Gebruik die een wat pas by wat jy regtig het, anders lees 'n nasiener jou bewys as 'n kringredenasie. Wat hierdie kaart vlak 4 maak, is dat niks jou na driehoek ABC gelei het nie: die gegewe het oor twee hoeke op 'n raaklyn gegaan, en jy moes albei oor die sirkel stap voordat die driehoek interessant geword het. Sodra hulle daar is, is die bewys twee reëls.",
      },
    },
    {
      id: "d",
      marks: 3,
      level: 4,
      prompt: { en: "Determine, with reasons, the size of &nbsp;Â₂&nbsp; in terms of x.", af: "Bepaal, met redes, die grootte van &nbsp;Â₂&nbsp; in terme van x." },
      hint: { en: "Two honest ways in: the three angles along the tangent line, or the three angles of the triangle. Either is worth full marks.", af: "Twee eerlike maniere om in te kom: die drie hoeke langs die raaklyn, of die drie hoeke van die driehoek. Albei is volpunte werd." },
      memo: [
        { type: "step", text: { en: "SU is a straight line, so &nbsp;Â₁ + Â₂ + Â₃ = 180° &nbsp;&nbsp;<i>(∠s on a str line)</i>", af: "SU is 'n reguit lyn, dus &nbsp;Â₁ + Â₂ + Â₃ = 180° &nbsp;&nbsp;<i>(∠e op reguit lyn)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∴ x + Â₂ + x = 180°", af: "∴ x + Â₂ + x = 180°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ Â₂ = 180° − 2x", af: "∴ Â₂ = 180° − 2x" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — inside the triangle instead: &nbsp;in △ABC, &nbsp;Â₂ = 180° − ∠ABC − ∠ACB = 180° − x − x = 180° − 2x &nbsp;<i>(int. ∠s of △)</i>. &nbsp;Same marks.", af: "<b>OF</b>, eerder binne die driehoek: &nbsp;in △ABC is &nbsp;Â₂ = 180° − ∠ABC − ∠ACB = 180° − x − x = 180° − 2x &nbsp;<i>(binne ∠e △)</i>. &nbsp;Dieselfde punte." } },
        { type: "trap", text: {
          en: "WATCH OUT: 180° − 2x, not 180° − x. There are TWO x's to take off, one on each side of Â₂ — and the same is true inside the triangle, where both base angles came out as x.", af: "PASOP: 180° − 2x, nie 180° − x nie. Daar is TWEE x'e om af te trek, een aan elke kant van Â₂, en dieselfde geld binne die driehoek, waar albei basishoeke x was.",
        } },
      ],
      esplain: {
        en: "The two roads agreeing is the tangent–chord theorem quietly checking the whole question: the three angles along the tangent at A are x, 180° − 2x and x, and the three angles of triangle ABC are exactly the same three, standing in different places. That is what the theorem does — it shuffles the same angles across the circle. Seeing it once makes the theorem much harder to forget than any amount of chanting it. Whichever road you take, be careful with the algebra at the end: two x's come off, not one.", af: "Dat die twee paaie ooreenstem, is die raaklyn koord stelling wat stilletjies die hele vraag kontroleer: die drie hoeke langs die raaklyn by A is x, 180° − 2x en x, en die drie hoeke van driehoek ABC is presies dieselfde drie, net op ander plekke. Dit is wat die stelling doen: dit skuif dieselfde hoeke oor die sirkel heen rond. As jy dit een keer sien, vergeet jy die stelling baie moeiliker as wanneer jy dit net opdreun. Watter pad jy ook al vat, wees versigtig met die algebra aan die einde: twee x'e kom af, nie een nie.",
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
    en: "In the diagram, O is the centre of the circle and &nbsp;ST&nbsp; is a tangent to the circle at A. &nbsp;B and C are points on the circle, and OA, OB, AB, AC and BC are drawn. &nbsp;Â₂ = x.", af: "In die diagram is O die middelpunt van die sirkel en &nbsp;ST&nbsp; is 'n raaklyn aan die sirkel by A. &nbsp;B en C is punte op die sirkel, en OA, OB, AB, AC en BC is getrek. &nbsp;Â₂ = x.",
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
      prompt: { en: "Write down, with a reason, the size of &nbsp;∠ACB&nbsp; in terms of x.", af: "Skryf, met 'n rede, die grootte van &nbsp;∠ACB&nbsp; in terme van x neer." },
      hint: { en: "Â₂ sits between the tangent and the chord AB. Which point is in the segment on the other side of AB?", af: "Â₂ lê tussen die raaklyn en die koord AB. Watter punt lê in die segment aan die ander kant van AB?" },
      memo: [
        { type: "answer", text: { en: "∠ACB = Â₂ = x &nbsp;&nbsp;<i>(tan chord theorem)</i> — the tangent–chord angle on chord AB, and the angle in the alternate segment", af: "∠ACB = Â₂ = x &nbsp;&nbsp;<i>(raaklyn koord stelling)</i>: die hoek tussen die raaklyn en koord AB, en die hoek in die oorstaande segment" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "The first link in a chain of three theorems, and it is the one that gets the given x away from the tangent and out into the circle where the other theorems can reach it. Name the chord — AB — then look across it: C is sitting in the alternate segment, so the angle chord AB makes at C equals the angle it makes with the tangent at A. Nothing about working in letters changes the method; x is a perfectly good answer.", af: "Die eerste skakel in 'n ketting van drie stellings, en dit is die een wat die gegewe x weg van die raaklyn af en die sirkel in kry, waar die ander stellings dit kan bereik. Benoem die koord (AB) en kyk dan daaroor: C lê in die oorstaande segment, so die hoek wat koord AB by C onderspan, is gelyk aan die hoek wat dit by A met die raaklyn maak. Om met letters te werk, verander niks aan die metode nie; x is 'n heeltemal goeie antwoord.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: { en: "Prove that &nbsp;∠AOB = 2x.", af: "Bewys dat &nbsp;∠AOB = 2x." },
      hint: { en: "∠AOB is at the centre. You have just found an angle at the circumference. Are they standing on the same chord?", af: "∠AOB is by die middelpunt. Jy het pas 'n hoek by die omtrek gevind. Staan hulle op dieselfde koord?" },
      memo: [
        { type: "step", text: { en: "∠ACB = x &nbsp;<i>(from (a))</i>", af: "∠ACB = x &nbsp;<i>(uit (a))</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∠AOB and ∠ACB both stand on chord AB, with C on the far arc.", af: "∠AOB en ∠ACB staan albei op koord AB, met C op die boog oorkant." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ ∠AOB = 2 · ∠ACB = 2x &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i>", af: "∴ ∠AOB = 2 · ∠ACB = 2x &nbsp;&nbsp;<i>(Midpt∠ = 2 × Omtreks∠)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the theorem pairs the angle at the centre with an angle at the CIRCUMFERENCE, not with the tangent–chord angle. Doubling Â₂ directly happens to give the same answer here, but only because part (a) moved it to C first — say that step out loud or the reasoning does not hold.", af: "PASOP: die stelling koppel die middelpuntshoek aan 'n hoek by die OMTREK, nie aan die hoek tussen raaklyn en koord nie. As jy Â₂ direk verdubbel, kry jy toevallig hier dieselfde antwoord, maar net omdat deel (a) dit eers na C geskuif het: sê daardie stap hardop, anders hou die redenasie nie.",
        } },
      ],
      esplain: {
        en: "The second link. The chord AB is doing all the work in this question: it carries the given angle from the tangent across to C in part (a), and now it carries it from C in to the centre. Both angles stand on AB, one from the circumference and one from the centre, so the centre one is double. Notice that nothing in the question told you to do this — no arc is mentioned, the centre is not pointed at. Spotting that ∠ACB and ∠AOB are a centre-and-circumference pair on the same chord is the fetch, and it is what makes this a starred part rather than an easy one.", af: "Die tweede skakel. Die koord AB doen al die werk in hierdie vraag: in deel (a) dra dit die gegewe hoek van die raaklyn oor na C, en nou dra dit dit van C na die middelpunt. Albei hoeke staan op AB, een by die omtrek en een by die middelpunt, so die een by die middelpunt is dubbel so groot. Let op dat niks in die vraag vir jou gesê het om dit te doen nie: geen boog word genoem nie, en niemand wys na die middelpunt nie. Om raak te sien dat ∠ACB en ∠AOB 'n paar op dieselfde koord is, een by die middelpunt en een by die omtrek, is wat jy self moet gaan haal, en dit is wat hierdie deel een met 'n ster maak eerder as 'n maklike een.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: { en: "Prove that &nbsp;∠OBA = 90° − x.", af: "Bewys dat &nbsp;∠OBA = 90° − x." },
      hint: { en: "Triangle OAB has two radii for sides, and you have just found the angle between them.", af: "Driehoek OAB het twee radii as sye, en jy het pas die hoek tussen hulle gevind." },
      memo: [
        { type: "step", text: { en: "OA = OB &nbsp;<i>(radii)</i>, so &nbsp;∠OBA = Â₁ &nbsp;&nbsp;<i>(∠s opp equal sides)</i>", af: "OA = OB &nbsp;<i>(radii)</i>, dus &nbsp;∠OBA = Â₁ &nbsp;&nbsp;<i>(∠e teenoor gelyke sye)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "In △OAB: &nbsp;2 · ∠OBA + ∠AOB = 180° &nbsp;&nbsp;<i>(int. ∠s of △)</i>, &nbsp;so &nbsp;2 · ∠OBA + 2x = 180°", af: "In △OAB: &nbsp;2 · ∠OBA + ∠AOB = 180° &nbsp;&nbsp;<i>(binne ∠e △)</i>, &nbsp;dus &nbsp;2 · ∠OBA + 2x = 180°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ ∠OBA = 90° − x", af: "∴ ∠OBA = 90° − x" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The third link, and the most familiar one: two radii make an isosceles triangle, its base angles are equal, and the angle sum shares out whatever is left of 180°. The algebra is the only place to slip — both base angles are the same thing, so the equation is TWICE that thing plus 2x equals 180. Say it out loud as you write it. And sanity-check the answer's shape: 90 − x shrinks as x grows, which is right, because a bigger tangent–chord angle means a bigger angle at the centre and a flatter triangle.", af: "Die derde skakel, en die bekendste een: twee radii maak 'n gelykbenige driehoek, sy basishoeke is gelyk, en die hoeksom deel uit wat van 180° oorbly. Die algebra is die enigste plek waar jy kan glips: albei basishoeke is dieselfde ding, so die vergelyking is TWEE KEER daardie ding plus 2x is gelyk aan 180. Sê dit hardop terwyl jy dit skryf. En toets of die antwoord se vorm sin maak: 90 − x word kleiner soos x groter word, en dit is reg, want 'n groter hoek tussen raaklyn en koord beteken 'n groter middelpuntshoek en 'n platter driehoek.",
      },
    },
    {
      id: "d",
      marks: 3,
      level: 4,
      prompt: { en: "Hence show that &nbsp;∠OAT = 90°, &nbsp;and name the theorem this confirms.", af: "Toon vervolgens aan dat &nbsp;∠OAT = 90°, &nbsp;en noem die stelling wat dit bevestig." },
      hint: { en: "∠OAT is made of the two pieces at A. You were given one of them and you can now write down the other.", af: "∠OAT bestaan uit die twee stukke by A. Een daarvan is gegee, en jy kan nou die ander een neerskryf." },
      memo: [
        { type: "step", text: { en: "Â₁ = ∠OBA = 90° − x &nbsp;&nbsp;<i>(∠s opp equal sides)</i>", af: "Â₁ = ∠OBA = 90° − x &nbsp;&nbsp;<i>(∠e teenoor gelyke sye)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∠OAT = Â₁ + Â₂ = (90° − x) + x", af: "∠OAT = Â₁ + Â₂ = (90° − x) + x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ ∠OAT = 90°, which confirms &nbsp;<i>tan ⊥ radius</i>", af: "∴ ∠OAT = 90°, en dit bevestig &nbsp;<i>raaklyn ⊥ radius</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: in an exam you may quote <i>tan ⊥ radius</i> in one line and be done. This question made you build it from the inside so you can see WHY it is true — it is not a licence to prove it every time.", af: "ONTHOU: in 'n eksamen mag jy <i>raaklyn ⊥ radius</i> in een reël aanhaal en klaar. Hierdie vraag het jou dit van binne laat bou sodat jy kan sien HOEKOM dit waar is: dit beteken nie jy moet dit elke keer bewys nie.",
        } },
      ],
      esplain: {
        en: "The chase ends exactly where it started, and the x cancels — which is the point. Whatever angle the chord makes with the tangent, the angle from the chord round to the radius is exactly what is left of 90°, so the tangent and the radius always meet at a right angle. You have proved a theorem you have been quoting all chapter, using only the tangent–chord theorem, the angle at the centre and an isosceles triangle. That is worth sitting with, because it is a good picture of how the whole chapter fits together: the theorems are not a list of separate facts, they lean on one another, and most of them can be derived from the others if you are patient.", af: "Die jaagtog eindig presies waar dit begin het, en die x kanselleer: dit is juis die bedoeling. Watter hoek die koord ook al met die raaklyn maak, die hoek van die koord tot by die radius is presies wat van 90° oorbly, so die raaklyn en die radius ontmoet altyd teen 'n regte hoek. Jy het 'n stelling bewys wat jy die hele hoofstuk lank aanhaal, met net die raaklyn koord stelling, die middelpuntshoek en 'n gelykbenige driehoek. Dit is die moeite werd om daaroor na te dink, want dit is 'n goeie prent van hoe die hele hoofstuk inmekaar pas: die stellings is nie 'n lys aparte feite nie, hulle steun op mekaar, en die meeste kan uit die ander afgelei word as jy geduldig is.",
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
    en: "In the diagram, O is the centre of the circle and &nbsp;PC&nbsp; is a tangent to the circle at C. &nbsp;A is a point on the circle and OA, OP and AP are drawn. &nbsp;OA = 5 cm, &nbsp;AP = 12 cm &nbsp;and&nbsp; OP = 13 cm.", af: "In die diagram is O die middelpunt van die sirkel en &nbsp;PC&nbsp; is 'n raaklyn aan die sirkel by C. &nbsp;A is 'n punt op die sirkel, en OA, OP en AP is getrek. &nbsp;OA = 5 cm, &nbsp;AP = 12 cm &nbsp;en&nbsp; OP = 13 cm.",
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
      prompt: { en: "Prove that &nbsp;PA&nbsp; is a tangent to the circle at A.", af: "Bewys dat &nbsp;PA&nbsp; 'n raaklyn aan die sirkel by A is." },
      hint: { en: "Nothing here mentions an angle at all — only three lengths. What can three lengths of a triangle tell you about one of its angles? And once you have that angle, what makes a line a tangent?", af: "Niks hier noem enigsins 'n hoek nie, net drie lengtes. Wat kan drie lengtes van 'n driehoek jou oor een van sy hoeke vertel? En sodra jy daardie hoek het, wat maak 'n lyn 'n raaklyn?" },
      memo: [
        { type: "step", text: { en: "OA² + AP² = 5² + 12² = 25 + 144 = 169", af: "OA² + AP² = 5² + 12² = 25 + 144 = 169" }, ticks: ["s/f"] },
        { type: "step", text: { en: "OP² = 13² = 169, &nbsp;so &nbsp;OA² + AP² = OP²", af: "OP² = 13² = 169, &nbsp;dus &nbsp;OA² + AP² = OP²" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ ∠OAP = 90° &nbsp;&nbsp;<i>(converse Pythagoras)</i>", af: "∴ ∠OAP = 90° &nbsp;&nbsp;<i>(Omgekeerde Pythagoras)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "PA ⊥ OA at A, and A is a point on the circle<br>∴ PA is a tangent to the circle at A &nbsp;&nbsp;<i>(line ⊥ radius)</i>", af: "PA ⊥ OA by A, en A is 'n punt op die sirkel<br>∴ PA is 'n raaklyn aan die sirkel by A &nbsp;&nbsp;<i>(Lyn ⊥ Radius)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the right angle on its own is NOT the answer. A line perpendicular to a radius somewhere in the middle of the circle is just a chord — it only becomes a tangent because the perpendicular happens at A, which is <b>on the circle</b>. Say that in your last line.", af: "PASOP: die regte hoek op sy eie is NIE die antwoord nie. 'n Lyn loodreg op 'n radius êrens in die middel van die sirkel is net 'n koord: dit word eers 'n raaklyn omdat die regte hoek by A is, en A lê <b>op die sirkel</b>. Sê dit in jou laaste reël.",
        } },
      ],
      esplain: {
        en: "This is the other way to prove a line is a tangent, and it is the one that turns up when a question gives you lengths instead of angles. Two theorems, both converses, one after the other. First, the converse of Pythagoras: if the two shorter sides squared add up to the longest side squared, the triangle must be right-angled, and the right angle sits opposite the longest side — here at A. Second, the converse of “tangent perpendicular to radius”: a line drawn at right angles to a radius at the point where that radius meets the circle is a tangent. The order matters and so do the words: get the right angle first, then say where it is, then name the tangent. Recognising 5, 12, 13 on sight saves you the arithmetic, and it is worth learning alongside 3, 4, 5 and 8, 15, 17.", af: "Dit is die ander manier om te bewys dat 'n lyn 'n raaklyn is, en dit is die een wat opduik as 'n vraag vir jou lengtes in plaas van hoeke gee. Twee stellings, albei omgekeerdes, een na die ander. Eerstens die omgekeerde van Pythagoras: as die kwadrate van die twee korter sye optel tot die kwadraat van die langste sy, moet die driehoek reghoekig wees, en die regte hoek lê teenoor die langste sy, hier by A. Tweedens die omgekeerde van “raaklyn loodreg op radius”: 'n lyn wat loodreg op 'n radius getrek word by die punt waar daardie radius die sirkel ontmoet, is 'n raaklyn. Die volgorde maak saak, en die woorde ook: kry eers die regte hoek, sê dan waar dit is, en noem dan die raaklyn. As jy 5, 12, 13 dadelik herken, spaar jy die rekenwerk, en dit is die moeite werd om dit saam met 3, 4, 5 en 8, 15, 17 te leer.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: { en: "Write down, with a reason, the length of &nbsp;PC.", af: "Skryf, met 'n rede, die lengte van &nbsp;PC neer." },
      hint: { en: "You have just proved that PA is a tangent, and the question told you PC is one. Both start at the same point outside the circle.", af: "Jy het pas bewys dat PA 'n raaklyn is, en die vraag het gesê PC is een. Albei begin by dieselfde punt buite die sirkel." },
      memo: [
        { type: "answer", text: { en: "PC = PA = 12 cm &nbsp;&nbsp;<i>(tans from common pt)</i>", af: "PC = PA = 12 cm &nbsp;&nbsp;<i>(raaklyne vanaf dieselfde punt)</i>" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "Two tangents drawn to a circle from the same outside point are always exactly the same length — think of a piece of string pulled taut round a ball from one hand. What makes this a level-three part rather than a one-mark gift is that you are only allowed to use the theorem because part (a) proved PA is a tangent in the first place. If a question ever asks you to “write down” something that leans on a proof you have just done, say so in your reason; a marker likes to see that you know why you are allowed.", af: "Twee raaklyne wat vanaf dieselfde punt buite 'n sirkel na die sirkel getrek word, is altyd presies ewe lank: dink aan 'n stuk tou wat uit een hand styf om 'n bal getrek word. Wat dit 'n deel op vlak drie maak eerder as 'n geskenk van een punt, is dat jy die stelling net mag gebruik omdat deel (a) eers bewys het dat PA 'n raaklyn is. As 'n vraag jou ooit vra om iets “neer te skryf” wat op 'n bewys steun wat jy pas gedoen het, sê dit in jou rede; 'n nasiener sien graag dat jy weet hoekom jy dit mag gebruik.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: { en: "Prove that &nbsp;∠APO = ∠CPO.", af: "Bewys dat &nbsp;∠APO = ∠CPO." },
      hint: { en: "Compare triangle OAP with triangle OCP. What do they share, and what do you already know about each of them?", af: "Vergelyk driehoek OAP met driehoek OCP. Wat deel hulle, en wat weet jy reeds van elkeen?" },
      memo: [
        { type: "step", text: { en: "In △OAP and △OCP: &nbsp;∠OAP = ∠OCP = 90° &nbsp;&nbsp;<i>(tan ⊥ radius)</i>", af: "In △OAP en △OCP: &nbsp;∠OAP = ∠OCP = 90° &nbsp;&nbsp;<i>(raaklyn ⊥ radius)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "OP = OP &nbsp;<i>(common)</i>; &nbsp;OA = OC &nbsp;<i>(radii)</i>", af: "OP = OP &nbsp;<i>(gemeen)</i>; &nbsp;OA = OC &nbsp;<i>(radii)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ △OAP ≡ △OCP &nbsp;&nbsp;<i>(RHS)</i><br>∴ ∠APO = ∠CPO", af: "∴ △OAP ≡ △OCP &nbsp;&nbsp;<i>(RHS)</i><br>∴ ∠APO = ∠CPO" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: congruency needs <b>three</b> facts and the right label. Right angle, hypotenuse, side &nbsp;⟹&nbsp; <b>RHS</b>. Writing SSS or SAS here scores nothing, even though the two triangles really are congruent.", af: "ONTHOU: kongruensie het <b>drie</b> feite en die regte afkorting nodig. Regte hoek, skuinssy, sy &nbsp;⟹&nbsp; <b>RHS</b>. As jy hier SSS of SHS skryf, kry jy niks nie, al is die twee driehoeke regtig kongruent.",
        } },
      ],
      esplain: {
        en: "The two triangles each have a right angle, they share the whole line OP as a hypotenuse, and their remaining sides OA and OC are radii, so they are the same length. Right angle, hypotenuse, side — that is RHS, and congruent triangles have every matching part equal, including the two angles at P. What you have really proved is that OP bisects the angle between the two tangents, which is true of every pair of tangents from an outside point and is worth remembering as a fact in its own right. Bank the earlier marks before you start this one: it leans on part (a) for the right angle at A and on the question's own stem for the one at C.", af: "Die twee driehoeke het elk 'n regte hoek, hulle deel die hele lyn OP as skuinssy, en hul ander sye OA en OC is radii, so hulle is ewe lank. Regte hoek, skuinssy, sy: dit is RHS, en in kongruente driehoeke is elke ooreenstemmende deel gelyk, ook die twee hoeke by P. Wat jy eintlik bewys het, is dat OP die hoek tussen die twee raaklyne halveer, en dit geld vir elke paar raaklyne vanaf 'n punt buite die sirkel en is die moeite werd om as 'n feit op sy eie te onthou. Kry eers die vroeëre punte in die sak voordat jy hierdie een begin: dit steun op deel (a) vir die regte hoek by A en op die vraag se gegewe inligting vir die een by C.",
      },
    },
  ],
};

export const euclidLevel4Questions = [l41, l42, l43, l44, l45, l46];
