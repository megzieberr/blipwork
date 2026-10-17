/* ============================================================
   EXAM FOCUS — Functions · Hyperbola & exponential
   SOURCE: September Test 1 (practice), QUESTION 4 — one hyperbola
   carrying five short read-offs, ending on a sign question.
   (Overnight run #1, 2026-08-21.)
   ------------------------------------------------------------
   PRINT SOURCE:
     Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\
       Sept-T1-Practice-QP.tex      Q4 stem + (a)–(e), TikZ sketch
       Sept-T1-Practice-Memo.tex    4(a)–4(e), 11 ticks
       Sept-T1-blueprint.md         §1, §3 whose methods
   Same working, same ticks, same WATCH OUT / REMEMBER cards as print.

   THE SKETCH, AND WHY THE PROMPT STILL LOOKS DIFFERENT FROM THE PRINTED
   ONE. The printed question hands the learner a to-scale TikZ graph and
   says "the sketch below shows…"; when this was written the schema had
   no diagram field yet, so the stem states the same facts IN WORDS
   instead — which is exactly what the print memo's own \stam line
   already does: "From the sketch: the asymptotes are x = −2 and y = 1,
   the graph passes through A(0 ; 4), and B is the x-intercept." No mark
   scheme changes: every tick in the print memo is earned from those
   facts, not from the picture. SESSION 1 (2026-08-22) added the
   `diagram` block below without touching a word of the stem — same
   discipline the blueprint's diagram-leak check already demanded of
   the print sketch: B is not drawn at all until (c) — the part that
   asks for its coordinates — has been revealed; only A(0 ; 4), the
   asymptotes, and the curve itself (given from the start, per the
   stem) are on the base figure.

   METHOD: GR11-FUNCTIONS-NOTES-DIGEST.md, hers — hyperbola
   y = a/(x − p) + q with asymptotes x = p and y = q (p is the OPPOSITE
   sign of the number next to the x); both axes of symmetry pass through
   (p ; q), gradients +1 and −1; the sign question is done by the
   PAINT method (cut a line through every x-intercept and every
   asymptote, paint + or − on each piece, read it off) — never a sign
   table. None of the digest's four flagged slips is mined.

   LEVELS: blueprint splits (4(a) = 2·L1 + 2·L2; 4(c) = 1·L1 + 1·L2).
   One level per part → dominant chunk, ties broken DOWN unless the part
   makes the learner choose or fetch a method (4(a) and 4(c) are
   read-off-then-substitute, so they sit at 2). Nothing in this question
   is starred in the print memo, so nothing here is level 4.

   REGISTERED via js/exam/cards-func.js (imported there, folded into
   funcCards), which js/exam/index.js's REGISTRY.func picks up; func is
   in js/config.js's EXAM_CHAPTERS. (This note used to say ⚠️
   UNREGISTERED — that was true before cards-func.js wired it in;
   corrected session 3, 2026-08-23.)
   ============================================================ */

const PAPER = "sept-t1";

/* DIAGRAM (SESSION 1, 2026-08-22). h(x) = 6/(x + 2) + 1, asymptotes
   x = −2 and y = 1 — both GIVEN in the stem, so they (and the curve
   itself) sit on the base figure from (a) onward; A(0 ; 4) is likewise
   given. B(−8 ; 0) is what (c) finds, so it is absent until (c)'s own
   reveal — then carried forward (already given, via chain or the
   "inequalities" card's own intro) into (e), whose paint method needs
   it. (e)'s shaded strip is the answer to "h(x) ≤ 0" and only ever
   appears on ITS OWN reveal, never the question side. */
const H1 = { kind: "hyperbola", a: 6, p: -2, q: 1 };
const H1_A = { x: 0, y: 4, on: 0, label: "A(0 ; 4)" };
const H1_B = { x: -8, y: 0, on: 0, label: "B(−8 ; 0)" };
/* (d)'s answer is a LINE, so (d)'s reveal draws it — dashed and named, the same
   "the reveal draws what it found" rule js/exam/_schema.js now states and every
   other axis-of-symmetry card on this tile follows (SESSION 2a-FIX). */
const H1_AXIS = { kind: "line", a: 1, q: 3, dash: true, tone: "b", label: "y = x + 3", labelAt: -5.5 };
const H1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -11, xmax: 3, ymin: -3, ymax: 6 },
    curves: [{ ...H1, tone: "a", label: "h", labelAt: -9 }],
    asymptotes: [{ x: -2, of: 0, label: "x = −2" }, { y: 1, of: 0, label: "y = 1" }],
    points: [H1_A],
  },
  parts: {
    a: { question: {} },
    b: { question: {} },
    c: { question: {}, reveal: { points: [H1_B] } },            // B is the answer — reveal only
    d: { question: {}, reveal: { curves: [H1_AXIS] } },
    e: {
      question: { points: [H1_B] },                             // B already given (chain / card intro)
      reveal: { points: [H1_B], shades: [{ x0: -8, x1: -2 }] },  // the ≤0 strip — reveal only
    },
  },
};

const t1q4 = {
  id: "func.hyp.t1q4",
  chapter: "func",
  topic: "hyperbola-and-exponential",
  archetype: "hyperbola-with-a-battery-of-short-read-offs",
  paper: PAPER,
  diagram: H1_DIAGRAM,
  // fn3 "Hyperbola & exponential" — asymptotes, branches, domain &
  // range: four of the five parts. 4(e) belongs to fn5, but fn3 is the
  // round that teaches the shape this whole question stands on.
  lostQuest: { chapter: "func", quest: "fn3" },
  marks: 11,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "h is a hyperbola. Its asymptotes are the lines x = −2 and y = 1. The graph passes through the point A(0 ; 4) and cuts the x-axis at B.<br><br>Determine the equation of h.", af: "h is 'n hiperbool. Sy asimptote is die lyne x = −2 en y = 1. Die grafiek gaan deur die punt A(0 ; 4) en sny die x-as by B.<br><br>Bepaal die vergelyking van h.",
      },
      hint: {
        en: "Start from the shape y = a/(x − p) + q and read p and q straight off the asymptotes — watch the sign on p. That leaves only one unknown, and you have been handed a point to pin it down with.", af: "Begin by die vorm y = a/(x − p) + q en lees p en q reguit van die asimptote af: let op die teken by p. Dan bly net een onbekende oor, en jy het 'n punt gekry om dit mee vas te pen.",
      },
      memo: [
        { type: "step", text: { en: "A hyperbola is y = a/(x − p) + q, with the asymptotes at x = p and y = q. Read them straight off:", af: "'n Hiperbool is y = a/(x − p) + q, met die asimptote by x = p en y = q. Lees hulle reguit af:" } },
        { type: "step", text: { en: "y = 1 &nbsp;⟹&nbsp; q = 1", af: "y = 1 &nbsp;⟹&nbsp; q = 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x = −2 &nbsp;⟹&nbsp; p = −2, &nbsp;so&nbsp; h(x) = a/(x + 2) + 1", af: "x = −2 &nbsp;⟹&nbsp; p = −2, &nbsp;dus&nbsp; h(x) = a/(x + 2) + 1" }, ticks: ["ca"] },
        { type: "step", text: { en: "The one thing still unknown is a, so use the point that was given, A(0 ; 4):", af: "Die enigste ding wat nog onbekend is, is a, dus gebruik die punt wat gegee is, A(0 ; 4):" } },
        { type: "step", text: { en: "4 = a/(0 + 2) + 1", af: "4 = a/(0 + 2) + 1" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "3 = a/2 &nbsp;⟹&nbsp; a = 6 &nbsp;&nbsp;∴&nbsp; h(x) = 6/(x + 2) + 1", af: "3 = a/2 &nbsp;⟹&nbsp; a = 6 &nbsp;&nbsp;∴&nbsp; h(x) = 6/(x + 2) + 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: p is the <b>opposite</b> sign of the number sitting next to the x. The asymptote x = −2 gives (x + 2) in the denominator, not (x − 2).", af: "PASOP: p het die <b>teenoorgestelde</b> teken van die getal wat langs die x staan. Die asimptoot x = −2 gee (x + 2) in die noemer, nie (x − 2) nie.",
        } },
      ],
      esplain: {
        en: "Every hyperbola in Grade 11 is the same basic curve, y = a/x, picked up and moved: p slides it sideways, q slides it up or down, and a decides how far the branches sit from the corner. The asymptotes are the crosshairs of that move, so they hand you p and q for free — as long as you remember the sign flip on p, because the equation says (x − p) and the asymptote says x = p. With p and q in, only a is left, and one point on the curve is exactly enough to find one unknown: put the point's x and y in and solve. That is the whole three-step pattern for finding a hyperbola's equation, and it is the same pattern as finding a parabola's — read off what the picture gives you, then use a point for whatever is left over.", af: "Elke hiperbool in Graad 11 is dieselfde basiese kurwe, y = a/x, opgetel en geskuif: p skuif dit links of regs, q skuif dit op of af, en a bepaal hoe ver die vlerkies van die hoek af sit. Die asimptote is die kruisdrade van daardie skuif, dus gee hulle jou p en q verniet, solank jy die tekenomruiling by p onthou, want die vergelyking sê (x − p) en die asimptoot sê x = p. Met p en q ingevul, bly net a oor, en een punt op die kurwe is presies genoeg om een onbekende te vind: vervang die punt se x en y en los op. Dit is die hele drie-stap-patroon om 'n hiperbool se vergelyking te vind, en dit is dieselfde patroon as om 'n parabool s'n te vind: lees af wat die prentjie jou gee, en gebruik dan 'n punt vir wat ook al oorbly.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: {
        en: "Write down the domain of h.", af: "Skryf die definisieversameling van h neer.",
      },
      hint: {
        en: "Domain is the x-values that are allowed. There is exactly one x this graph cannot cope with — find it by asking what would make the denominator zero.", af: "Definisieversameling is die x-waardes wat toegelaat word. Daar is presies een x waarmee hierdie grafiek nie kan klaarkom nie: vind dit deur te vra wat die noemer nul sou maak.",
      },
      memo: [
        { type: "step", text: { en: "The graph is undefined where the denominator is zero: x + 2 = 0.", af: "Die grafiek is onbepaald waar die noemer nul is: x + 2 = 0." } },
        { type: "answer", text: { en: "x ∈ ℝ ; x ≠ −2", af: "x ∈ ℝ ; x ≠ −2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Domain means “which x-values may I feed in”. For a hyperbola the answer is always “all of them except the one that breaks the fraction”, and that one is the vertical asymptote — the same x = −2 that's h's own asymptote. Note how it is written: all the real numbers first, then the restriction riding after a semicolon. That semicolon-then-restriction layout is the one she marks.", af: "Definisieversameling beteken “watter x-waardes mag ek invoer”. Vir 'n hiperbool is die antwoord altyd “almal behalwe die een wat die breuk breek”, en daardie een is die vertikale asimptoot: dieselfde x = −2 wat h se eie asimptoot is. Let op hoe dit geskryf word: eers al die reële getalle, dan die beperking ná 'n kommapunt. Dit is die uitleg met die beperking ná die kommapunt wat sy nasien.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the coordinates of B.", af: "Bepaal die koördinate van B.",
      },
      hint: {
        en: "B is on the x-axis. What is y worth at every single point of the x-axis? Put that into the equation for h and solve.", af: "B lê op die x-as. Wat is y by elke enkele punt van die x-as? Vervang dit in die vergelyking van h en los op.",
      },
      memo: [
        { type: "step", text: { en: "B is on the x-axis, so y = 0:", af: "B lê op die x-as, dus y = 0:" } },
        { type: "step", text: { en: "0 = 6/(x + 2) + 1 &nbsp;⟹&nbsp; 6/(x + 2) = −1", af: "0 = 6/(x + 2) + 1 &nbsp;⟹&nbsp; 6/(x + 2) = −1" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "6 = −(x + 2) &nbsp;⟹&nbsp; x + 2 = −6 &nbsp;⟹&nbsp; x = −8 &nbsp;&nbsp;∴&nbsp; B(−8 ; 0)", af: "6 = −(x + 2) &nbsp;⟹&nbsp; x + 2 = −6 &nbsp;⟹&nbsp; x = −8 &nbsp;&nbsp;∴&nbsp; B(−8 ; 0)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the answer must be a <i>coordinate</i>, written with a semicolon: (−8 ; 0). The comma belongs to decimals only.", af: "PASOP: die antwoord moet 'n <i>koördinaat</i> wees, met 'n kommapunt geskryf: (−8 ; 0). Die komma is net vir desimale.",
        } },
      ],
      esplain: {
        en: "An x-intercept is not a special formula to memorise — it is just the point where the graph is sitting on the x-axis, and every point on the x-axis has y = 0. So you substitute 0 for y and solve the equation you are left with. The only fiddly bit is that the x you want is stuck in a denominator; getting the fraction alone on one side first, before you cross-multiply, keeps that tidy. And because the question asked for the COORDINATES of B, the answer has to be a point, not just a number.", af: "Die x-afsnit is nie 'n spesiale formule om te memoriseer nie: dit is net die punt waar die grafiek op die x-as sit, en elke punt op die x-as het y = 0. Jy vervang dus y met 0 en los die vergelyking op wat oorbly. Die enigste lastige deel is dat die x wat jy soek in 'n noemer vasgevang is; as jy die breuk eers alleen aan een kant kry, voordat jy kruisvermenigvuldig, bly dit netjies. En omdat die vraag na die KOÖRDINATE van B gevra het, moet die antwoord 'n punt wees, nie net 'n getal nie.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the equation of the axis of symmetry of h that has a positive gradient.", af: "Bepaal die vergelyking van die simmetrie-as van h wat 'n positiewe gradiënt het.",
      },
      hint: {
        en: "Both axes of symmetry go through the point where the two asymptotes cross. You know that point, and you have been told the gradient is positive — for a hyperbola that means exactly one value.", af: "Albei simmetrie-asse gaan deur die punt waar die twee asimptote kruis. Jy ken daardie punt, en jy is vertel dat die gradiënt positief is: by 'n hiperbool beteken dit presies een waarde.",
      },
      memo: [
        { type: "step", text: { en: "Both axes of symmetry pass through the point where the asymptotes cross, which is (−2 ; 1). The one with a positive gradient has m = 1:", af: "Albei simmetrie-asse gaan deur die punt waar die asimptote kruis, en dit is (−2 ; 1). Die een met 'n positiewe gradiënt het m = 1:" } },
        { type: "step", text: { en: "y = x + c &nbsp;&nbsp;through (−2 ; 1)", af: "y = x + c &nbsp;&nbsp;deur (−2 ; 1)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "1 = −2 + c &nbsp;⟹&nbsp; c = 3 &nbsp;&nbsp;∴&nbsp; y = x + 3", af: "1 = −2 + c &nbsp;⟹&nbsp; c = 3 &nbsp;&nbsp;∴&nbsp; y = x + 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the other one is y = −x + c through the same point, giving y = −x − 1. Both go through (p ; q) — only the gradient tells them apart.", af: "ONTHOU: die ander een is y = −x + c deur dieselfde punt, wat y = −x − 1 gee. Albei gaan deur (p ; q): net die gradiënt onderskei hulle.",
        } },
      ],
      esplain: {
        en: "A hyperbola has two mirror lines, and they are the two diagonals through the corner where the asymptotes meet — one going up at 45°, one going down at 45°. That is why their gradients are always exactly 1 and −1, no matter what a is, and why “the one with a positive gradient” is enough information to pick one out. From there it is a plain Grade 9 job: you have a gradient and a point, so put them into y = mx + c and solve for c.", af: "'n Hiperbool het twee simmetrie-asse, en hulle is die twee diagonale deur die hoek waar die asimptote ontmoet: een wat teen 45° opgaan, een wat teen 45° afgaan. Dit is hoekom hulle gradiënte altyd presies 1 en −1 is, maak nie saak wat a is nie, en hoekom “die een met 'n positiewe gradiënt” genoeg inligting is om een uit te kies. Van daar af is dit 'n gewone Graad 9-taak: jy het 'n gradiënt en 'n punt, dus vervang hulle in y = mx + c en los op vir c.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 3,
      prompt: {
        en: "For which values of x is h(x) ≤ 0?", af: "Vir watter waardes van x is h(x) ≤ 0?",
      },
      hint: {
        en: "Cut a line through every x-intercept and every asymptote, then paint the sign of h on each piece. Think carefully about which of your two cut points may be included in the answer and which may never be.", af: "Sit 'n snylyn deur elke x-afsnit en elke asimptoot, en verf dan die teken van h op elke interval. Dink mooi oor watter van jou twee snyplekke in die antwoord ingesluit mag word en watter nooit mag nie.",
      },
      memo: [
        { type: "step", text: { en: "Cut a line through <b>every x-intercept and every asymptote</b> — here x = −8 and x = −2 — then <b>paint</b> the sign of h on each piece:", af: "Sit 'n snylyn deur <b>elke x-afsnit en elke asimptoot</b>, hier x = −8 en x = −2, en <b>verf</b> dan die teken van h op elke interval:" } },
        { type: "step", text: { en: "left of −8: &nbsp;<b>+</b> &nbsp;&nbsp;·&nbsp;&nbsp; between −8 and −2: &nbsp;<b>−</b> &nbsp;&nbsp;·&nbsp;&nbsp; right of −2: &nbsp;<b>+</b>", af: "links van −8: &nbsp;<b>+</b> &nbsp;&nbsp;·&nbsp;&nbsp; tussen −8 en −2: &nbsp;<b>−</b> &nbsp;&nbsp;·&nbsp;&nbsp; regs van −2: &nbsp;<b>+</b>" } },
        { type: "step", text: { en: "h(x) ≤ 0 is the painted − piece. &nbsp;x = −8 <i>is</i> included, because h(−8) = 0. &nbsp;x = −2 is <b>never</b> included — h is undefined there.", af: "h(x) ≤ 0 is die interval wat − geverf is. &nbsp;x = −8 <i>is</i> ingesluit, want h(−8) = 0. &nbsp;x = −2 is <b>nooit</b> ingesluit nie: h is daar onbepaald." } },
        { type: "answer", text: { en: "∴ −8 ≤ x &lt; −2", af: "∴ −8 ≤ x &lt; −2" }, ticks: ["ca", "a"] },
        { type: "trap", text: {
          en: "WATCH OUT: never close the bracket on an asymptote. −8 ≤ x ≤ −2 loses the mark, because h(−2) does not exist.", af: "PASOP: moet nooit die hakie by 'n asimptoot toemaak nie. −8 ≤ x ≤ −2 verloor die punt, want h(−2) bestaan nie.",
        } },
      ],
      esplain: {
        en: "A graph can only change from positive to negative in two ways: by crossing the x-axis, or by jumping across an asymptote. So the cut lines go through exactly those places, and between two cuts the sign cannot change at all — which means one glance at each piece settles the whole piece. Paint a + or a − on each and the answer reads straight off. The last decision is about the ends. At an x-intercept the graph really is zero, and “≤ 0” includes zero, so that end is closed. At an asymptote the graph does not exist at all, so that end can never be closed, no matter which inequality sign the question used. One end closed, one end open, in the same answer — that is the shape this question is built to test.", af: "'n Grafiek kan op net twee maniere van positief na negatief verander: deur die x-as te kruis, of deur oor 'n asimptoot te spring. Die snylyne gaan dus deur presies daardie plekke, en tussen twee snylyne kan die teken glad nie verander nie, wat beteken dat een kykie na elke interval die hele interval besleg. Verf 'n + of 'n − op elkeen en jy lees die antwoord reguit af. Die laaste besluit gaan oor die kante. By 'n x-afsnit is die grafiek werklik nul, en “≤ 0” sluit nul in, dus is daardie kant geslote. By 'n asimptoot bestaan die grafiek glad nie, dus kan daardie kant nooit geslote wees nie, maak nie saak watter ongelykheidsteken die vraag gebruik het nie. Een kant geslote, een kant oop, in dieselfde antwoord: dit is die vorm wat hierdie vraag gebou is om te toets.",
      },
    },
  ],
};

export const funcHyperbolaAndExponentialQuestions = [t1q4];
