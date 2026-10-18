/* ============================================================
   EXAM FOCUS — Euclidean geometry · Tangents & cyclic quadrilaterals
   ------------------------------------------------------------
   SOURCE: September Test 2 (practice), QUESTION 5 — two tangents from
   an external point, a cyclic-quadrilateral proof, and a starred
   all-in-a-variable angle-at-centre proof.
   (Composed overnight run #1, stage 3b, 2026-08-21; promoted out of
   js/exam/_pending-engine-port/ and registered 2026-08-22 once the
   Circle Quest engine port landed — js/exam/circle-engine.js.)

   PRINT SOURCE:
     Sept-T2-Practice-QP.tex        Q5 stem + (a)–(d), \FigFive
     Sept-T2-Practice-Memo.tex      5(a)–5(d), 8 ticks, ★ on 5(d)
     Sept-T2-blueprint.md           §1, §2 skeleton distance, §4 walls
     Sept-T2-euclid-specs.md        specQ5, embedded below
   Same statements, same reasons, same ticks, same OR route, same
   WATCH OUT / REMEMBER cards as print. `hint` and `esplain` fresh.

   CHAPTER + lostQuest: the sibling file euclid-circle-theorems.js
   carries the full reasoning for the exam-focus-only "euclid" chapter
   and for the lostQuest placeholder (her ruling: NO "I'm lost" button
   on Euclidean — "they don't need it anyway"). Not repeated here.

   DIAGRAM. specQ5 below is unchanged from the composed original —
   geometry checked by arc arithmetic and re-measured at six values of
   x in Sept-T2-verify.py, and now re-measured on every harness run by
   the engine's own verifyDiagram() (via validateQuestion). `ext`
   computes T as the intersection of the two tangents.
   DO NOT CHANGE: the degrees, or C's position on the MAJOR arc — that
   placement is what makes the angle-at-centre step in (d) legal.

   PORT-DAY GAP 2 IS CLOSED, AND NOT THE WAY THE PENDING NOTE EXPECTED.
   The note proposed writing 5(a)'s right angle with the pseudo-leg
   "tg-" and letting verifyDiagram catch a wrong sign ("the measured
   value must be 90, not 270"). It cannot: computeGeometry always
   clamps a non-reflex mark to the SHORT sweep, so "tg-" and "tg+" BOTH
   measure exactly 90 — only the SIDE the wedge sits on differs
   (bisector −73° towards T, versus 197° away from it). Measured on
   port day, both read 90,0. So the highlight names the real external
   point instead: legs ["O","T"] IS the angle OAT the question asks
   about, it is unambiguous, and it is identical geometry (from −118°
   to −28°, sweep 90,0 — the same numbers "tg-" produces). The
   direction is additionally pinned by the harness, which asserts the
   wedge's bisector, so a future flip fails loudly.

   5(b) is the "prove ABCD is cyclic -> the four SIDES light up" case
   from her design note, not an angle highlight: chords O–A, A–T, T–B,
   O–B. A–T and T–B are the tangent segments the `ext` block draws, and
   the engine's highlight layer takes them as ordinary chord refs.

   x IS A VARIABLE, NOT 56°. The figure is drawn with angle ATB at 56°
   purely so the picture is drawable; the question keeps x as a letter
   throughout and nothing in the memo ever substitutes a number. The
   blueprint's diagram-leak check confirms the drawing value never
   appears in the question or the answers.

   LEVELS: 1:1 with T2's blueprint — (a) 1, (b) 2, (c) 3, (d) 4. 5(d) is
   one of T2's two printed ★ parts, so the star the schema derives
   from level === 4 lands exactly where the paper puts it.
   ============================================================ */

const PAPER = "sept-t2";
const LOST_PENDING = { chapter: "euclid", quest: "PENDING-euclid-is-exam-only-no-drill-round" };

/* --- diagram spec, verbatim from Sept-T2-euclid-specs.md ------------ */

export const specQ5 = {
  w: 340, h: 230, cx: 118, cy: 115, R: 76,
  O: true,
  pts: { A: 62, B: 298, C: 180 },
  ext: [{ name: "T", t: ["A", "B"] }],    // T = intersection of the two tangents
  chords: [
    ["O", "A"],        // radius OA
    ["O", "B"],        // radius OB
    ["C", "A"],        // chord CA
    ["C", "B"],        // chord CB
  ],
  angles: [
    { at: "T", legs: ["A", "B"], t: "x", o: { v: 56, r: 58 } },
  ],
};

const t2q5 = {
  id: "euclid.tan.t2q5",
  chapter: "euclid",
  topic: "tangents-and-cyclic-quads",
  archetype: "two-tangents-from-one-point-then-cyclic-quad-then-angle-at-centre-in-x",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 8,
  /* to-scale figure + her per-part marker-pen highlights. One spec for
     the whole question; each part lights what it is ABOUT. Validated by
     js/exam/_schema.js — every highlighted variant is re-measured. */
  diagram: {
    spec: specQ5,
    parts: {
      /* (a) the right angle between the tangent and the radius, drawn
         as a SQUARE (the engine's Blipwork-only o.mark:"square"), which
         is how a Grade 11 learner reads "this is 90°". Legs named by
         the real external point T — see the header on gap 2. */
      a: { question: { angles: [{ at: "A", legs: ["O", "T"], v: 90, o: { mark: "square" } }] } },
      /* (b) her design's own example: "prove ABCD is cyclic -> the four
         sides light up". The reveal adds the SECOND right angle at B,
         which is the whole content of the proof. */
      b: {
        question: { chords: [["O", "A"], ["A", "T"], ["T", "B"], ["O", "B"]] },
        reveal: {
          chords: [["O", "A"], ["A", "T"], ["T", "B"], ["O", "B"]],
          angles: [
            { at: "A", legs: ["O", "T"], v: 90, o: { mark: "square" } },
            { at: "B", legs: ["O", "T"], v: 90, o: { mark: "square" } },
          ],
        },
      },
      /* (c) the angle being written down — the NON-reflex sweep at the
         centre, from B round to A. (o.reflex is deliberately NOT set:
         the reflex angle is the wrong one and would fail the measure.) */
      c: { question: { angles: [{ at: "O", legs: ["A", "B"], v: 124 }] } },
      /* (d) the angle at the circumference on the question side; the
         reveal shows it TOGETHER with the angle at the centre, because
         "angle at centre = 2 x angle at circumference" is a statement
         about the pair and is unreadable from either one alone. */
      d: {
        question: { angles: [{ at: "C", legs: ["A", "B"], v: 62 }] },
        reveal: { angles: [
          { at: "C", legs: ["A", "B"], v: 62 },
          { at: "O", legs: ["A", "B"], v: 124 },
        ] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: "In the diagram, O is the centre of the circle. TA and TB are tangents to the circle at A and B. C is a point on the major arc AB, and CA and CB are chords. &nbsp;∠ATB = x.<br><br>Give a reason why &nbsp;∠OAT = 90°.", af: "In die diagram is O die middelpunt van die sirkel. TA en TB is raaklyne aan die sirkel by A en B. C is 'n punt op die groot boog AB, en CA en CB is koorde. &nbsp;∠ATB = x.<br><br>Gee 'n rede waarom &nbsp;∠OAT = 90°.",
      },
      hint: {
        en: "Look at what the two lines meeting at A actually are — one is a tangent, the other runs to the centre. There is a single theorem about exactly that pair.", af: "Kyk wat die twee lyne wat by A ontmoet, eintlik is: een is 'n raaklyn, die ander loop na die middelpunt. Daar is een enkele stelling oor presies daardie paar.",
      },
      memo: [
        { type: "answer", text: { en: "A tangent to a circle is perpendicular to the radius drawn to the point of contact. &nbsp;(short form: <b>tangent ⊥ radius</b>)", af: "'n Raaklyn aan 'n sirkel is loodreg op die radius wat na die raakpunt getrek is. &nbsp;(verkorte vorm: <b>raaklyn ⊥ radius</b>)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: this one line is the hinge of the whole question. Every tangent in a Grade 11 diagram is worth marking with a little right angle onto the radius the moment you see it.", af: "ONTHOU: hierdie een reël is die spil van die hele vraag. Elke raaklyn in 'n Graad 11-diagram is die moeite werd om met 'n klein regte hoek op die radius te merk, sodra jy dit sien.",
        } },
        { type: "trap", text: {
          en: "WATCH OUT: in every Euclidean geometry part the <b>reason</b> carries a mark of its own, and it must be written <b>in words</b>. “∠OAT = 90°” with no reason beside it is half an answer.", af: "PASOP: in elke deel van Euklidiese meetkunde dra die <b>rede</b> sy eie punt, en dit moet <b>in woorde</b> geskryf word. “∠OAT = 90°” sonder 'n rede langsaan is 'n halwe antwoord.",
        } },
      ],
      esplain: {
        en: "A tangent touches the circle at exactly one point, and the radius to that point is the shortest possible line from the centre to the tangent — and the shortest line from a point to a line is always the perpendicular one. That is the whole reason the angle is a right angle. In an exam this is one mark and thirty seconds, but its real value is what it unlocks: the moment you write 90° at A you have created a right angle inside a quadrilateral, and every remaining part of this question is built on that. Get into the habit of pencilling the right-angle square onto every tangent-and-radius pair the instant you read the diagram, before you even look at what is being asked.", af: "'n Raaklyn raak die sirkel by presies een punt, en die radius na daardie punt is die kortste moontlike lyn van die middelpunt na die raaklyn: die kortste lyn van 'n punt na 'n lyn is altyd die loodregte een. Dit is die hele rede waarom die hoek 'n regte hoek is. In 'n eksamen is dit een punt en dertig sekondes, maar die werklike waarde is wat dit oopsluit: sodra jy 90° by A skryf, het jy 'n regte hoek binne 'n vierhoek geskep, en elke ander deel van hierdie vraag is daarop gebou. Maak dit 'n gewoonte om die regtehoekteken met potlood op elke raaklyn-en-radius-paar te teken die oomblik wat jy die diagram lees, nog voordat jy kyk wat gevra word.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Prove that OATB is a cyclic quadrilateral.", af: "Bewys dat OATB 'n koordevierhoek is.",
      },
      hint: {
        en: "You already have one right angle from (a). Is there a second one anywhere? Then think about which pair of angles in OATB those two are, and what their total tells you.", af: "Jy het reeds een regte hoek uit (a). Is daar iewers 'n tweede een? Dink dan na oor watter paar hoeke in OATB daardie twee is, en wat hul totaal vir jou sê.",
      },
      memo: [
        { type: "step", text: { en: "∠OBT = 90° &nbsp;&nbsp;<i>(tangent ⊥ radius)</i>", af: "∠OBT = 90° &nbsp;&nbsp;<i>(raaklyn ⊥ radius)</i>" }, ticks: ["ca"] },
        { type: "step", text: { en: "∠OAT + ∠OBT = 90° + 90° = 180°", af: "∠OAT + ∠OBT = 90° + 90° = 180°" } },
        { type: "answer", text: { en: "∴ OATB is a cyclic quadrilateral &nbsp;&nbsp;<i>(opposite ∠s of quadrilateral OATB are supplementary)</i>", af: "∴ OATB is 'n koordevierhoek &nbsp;&nbsp;<i>(teenoorst. ∠e van vierhoek OATB is supp)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: say the word <b>opposite</b>. In OATB the vertices run O → A → T → B, so the angles at A and at B sit across from each other — that is why supplementary angles prove anything here. Two angles that happen to add to 180° but are next to each other prove nothing.", af: "PASOP: sê die woord <b>teenoorstaande</b>. In OATB loop die hoekpunte O → A → T → B, dus lê die hoeke by A en by B oorkant mekaar: dit is hoekom supplementêre hoeke hier iets bewys. Twee hoeke wat toevallig optel tot 180° maar langs mekaar lê, bewys niks nie.",
        } },
      ],
      esplain: {
        en: "The test for a cyclic quadrilateral you need here is the converse of a theorem you already know: if opposite angles of a quadrilateral add to 180°, then all four of its corners lie on one circle. So the job is to find a pair of OPPOSITE angles and show they total 180°. (a) handed you one right angle at A, and the second tangent gives you the identical argument at B, so you have two right angles — and 90 + 90 is exactly 180. The one thing that makes it a proof rather than a coincidence is checking that A and B really are opposite corners. Read the name of the quadrilateral in order: O, A, T, B. A is the second corner and B is the fourth, so they face each other across the shape. Neighbouring angles adding to 180° would say nothing at all, which is why the word “opposite” has to be in your reason.", af: "Die toets vir 'n koordevierhoek wat jy hier nodig het, is die omgekeerde van 'n stelling wat jy reeds ken: as die teenoorstaande hoeke van 'n vierhoek optel tot 180°, lê al vier sy hoekpunte op een sirkel. Die werk is dus om 'n paar TEENOORSTAANDE hoeke te vind en te wys dat hulle saam 180° is. (a) het vir jou een regte hoek by A gegee, en die tweede raaklyn gee jou presies dieselfde argument by B, dus het jy twee regte hoeke, en 90 + 90 is presies 180. Die een ding wat dit 'n bewys maak eerder as toeval, is om te kontroleer dat A en B regtig teenoorstaande hoekpunte is. Lees die naam van die vierhoek in volgorde: O, A, T, B. A is die tweede hoekpunt en B is die vierde, dus kyk hulle oorkant die figuur na mekaar. Aangrensende hoeke wat optel tot 180° sou glad niks sê nie, en dit is hoekom die woord “teenoorstaande” in jou rede moet wees.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence write down the size of &nbsp;∠AOB&nbsp; in terms of x.", af: "Skryf vervolgens die grootte van &nbsp;∠AOB&nbsp; in terme van x neer.",
      },
      hint: {
        en: "“Hence” means use what you just proved. In a cyclic quadrilateral there are two pairs of opposite angles — you used one pair in (b), so what does the other pair have to do?", af: "“Vervolgens” beteken: gebruik wat jy pas bewys het. In 'n koordevierhoek is daar twee pare teenoorstaande hoeke: jy het een paar in (b) gebruik, so wat moet die ander paar doen?",
      },
      memo: [
        { type: "step", text: { en: "∠AOB and ∠ATB are the <i>other</i> pair of opposite angles in the cyclic quadrilateral OATB:", af: "∠AOB en ∠ATB is die <i>ander</i> paar teenoorstaande hoeke in die koordevierhoek OATB:" } },
        { type: "step", text: { en: "∠AOB + x = 180° &nbsp;&nbsp;<i>(opposite ∠s of a cyclic quad)</i>", af: "∠AOB + x = 180° &nbsp;&nbsp;<i>(teenoorst. ∠e van kvh)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠AOB = 180° − x", af: "∴ ∠AOB = 180° − x" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — without using (b) at all: the angles of quadrilateral OATB add up to 360°, so ∠AOB = 360° − 90° − 90° − x = 180° − x. &nbsp;Same marks.", af: "<b>OF</b>, sonder om (b) enigsins te gebruik: die hoeke van vierhoek OATB tel op tot 360°, dus ∠AOB = 360° − 90° − 90° − x = 180° − x. &nbsp;Dieselfde punte." } },
      ],
      esplain: {
        en: "Once a quadrilateral is known to be cyclic, BOTH pairs of opposite angles are supplementary, not just the pair you used to prove it. You spent the A-and-B pair in (b); the leftovers are the angles at O and at T, and those must total 180° as well. Since the angle at T is x, the angle at O is whatever is left of 180°. Notice the answer is an expression, not a number — that is fine and it is deliberate. The OR route is worth knowing too, because it needs no theorem at all: the four angles of any quadrilateral add to 360°, and you already know three of them (90°, 90° and x), so subtraction finishes it. Both roads earn the same marks.", af: "Sodra jy weet 'n vierhoek is 'n koordevierhoek, is ALBEI pare teenoorstaande hoeke supplementêr, nie net die paar wat jy gebruik het om dit te bewys nie. Jy het die paar by A en B in (b) opgebruik; wat oorbly, is die hoeke by O en by T, en hulle moet ook saam 180° wees. Omdat die hoek by T x is, is die hoek by O wat ook al van 180° oorbly. Let op dat die antwoord 'n uitdrukking is, nie 'n getal nie: dit is reg so, en dit is doelbewus. Die OF-roete is ook die moeite werd om te ken, want dit het glad nie 'n stelling nodig nie: die vier hoeke van enige vierhoek tel op tot 360°, en jy ken reeds drie van hulle (90°, 90° en x), dus maak aftrekking dit klaar. Albei paaie verdien dieselfde punte.",
      },
    },
    {
      id: "d",
      marks: 3,
      level: 4,
      prompt: {
        en: "Prove that &nbsp;∠ACB = 90° − x/2.", af: "Bewys dat &nbsp;∠ACB = 90° − x/2.",
      },
      hint: {
        en: "C is on the circle and O is the centre, and both ∠ACB and ∠AOB stand on the same arc AB. There is one theorem that links an angle at the centre to an angle at the circumference — and you already have ∠AOB in terms of x.", af: "C lê op die sirkel en O is die middelpunt, en ∠ACB en ∠AOB staan albei op dieselfde boog AB. Daar is een stelling wat 'n middelpuntshoek aan 'n omtrekshoek koppel, en jy het reeds ∠AOB in terme van x.",
      },
      memo: [
        { type: "step", text: { en: "C sits on the major arc, and ∠AOB and ∠ACB stand on the same arc AB.", af: "C lê op die groot boog, en ∠AOB en ∠ACB staan op dieselfde boog AB." } },
        { type: "step", text: { en: "∠ACB = ½ · ∠AOB &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i> &nbsp;— the statement earns one tick and the reason earns its own", af: "∠ACB = ½ · ∠AOB &nbsp;&nbsp;<i>(Midpt∠ = 2 × Omtreks∠)</i>, &nbsp;die bewering verdien een regmerkie en die rede verdien sy eie" }, ticks: ["ca", "ca"] },
        { type: "answer", text: { en: "= ½(180° − x) = 90° − x/2", af: "= ½(180° − x) = 90° − x/2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: C is on the <b>major</b> arc, the far side of AB from T, so ∠ACB stands on the minor arc AB and its partner at the centre is the <i>non-reflex</i> angle, the 180° − x you just found, not the reflex one.", af: "PASOP: C lê op die <b>groot</b> boog, aan die ander kant van AB as T, dus staan ∠ACB op die klein boog AB en sy maat by die middelpunt is die <i>nie-refleks</i> hoek, die 180° − x wat jy pas gekry het, nie die refleks-hoek nie.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: the answer is in terms of x, so no number is ever going to appear. Working with a letter is exactly the same work as working with a number — do not sit waiting for a value that is not coming.", af: "ONTHOU: die antwoord is in terme van x, dus gaan daar nooit 'n getal verskyn nie. Om met 'n letter te werk, is presies dieselfde werk as om met 'n getal te werk: moenie sit en wag vir 'n waarde wat nie gaan kom nie.",
        } },
      ],
      esplain: {
        en: "Nothing in this part is cued: the question does not mention arcs, does not mention the centre, and does not tell you to use (c). Spotting that ∠ACB and ∠AOB both stand on the arc AB — one from the circumference, one from the centre — is the fetch, and it is why the part is starred. Once you see it, the theorem does the work: the angle at the centre is always double the angle at the circumference standing on the same arc, so the angle at C is half of the angle at O. You already own the angle at O from (c), so halving 180° − x gives 90° − x/2 in one line. Two cautions. C is on the major arc, so the angle at C stands on the minor arc AB, and the angle at the centre on that arc is the non-reflex one: C sitting on the far side of AB from T is exactly what guarantees that. And do not be unsettled by having only letters — an algebraic proof is the same reasoning as a numerical one, and it is stronger, because it holds for every x at once. Bank (a), (b) and (c) first; they are three straightforward marks, and this one is the reward round at the end.", af: "Niks in hierdie deel gee jou 'n wenk nie: die vraag noem geen boë nie, noem nie die middelpunt nie, en sê nie vir jou om (c) te gebruik nie. Om raak te sien dat ∠ACB en ∠AOB albei op die boog AB staan, een by die omtrek en een by die middelpunt, is wat jy self moet gaan haal, en dit is hoekom hierdie deel 'n ster het. Sodra jy dit sien, doen die stelling die werk: die middelpuntshoek is altyd dubbel die omtrekshoek wat op dieselfde boog staan, dus is die hoek by C die helfte van die hoek by O. Jy het die hoek by O reeds uit (c), dus gee die helfte van 180° − x vir jou 90° − x/2 in een reël. Twee waarskuwings. C lê op die groot boog, dus staan die hoek by C op die klein boog AB, en die middelpuntshoek op daardie boog is die nie-refleks hoek: dat C aan die ander kant van AB as T lê, is presies wat dit waarborg. En moenie ontsteld raak omdat jy net letters het nie: 'n algebraïese bewys is dieselfde redenasie as 'n numeriese een, en dit is sterker, want dit geld vir elke x tegelyk. Kry eers (a), (b) en (c) in die sak; dit is drie eenvoudige punte, en hierdie een is die beloningsrondte aan die einde.",
      },
    },
  ],
};

export const euclidTangentsAndCyclicQuadsQuestions = [t2q5];
