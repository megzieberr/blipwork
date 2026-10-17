/* ============================================================
   FUNCTIONS QUEST 1 · The four families   ★ DIAGRAM
   Recognise linear / parabola / hyperbola / exponential from the
   equation and from the graph; the vocabulary that tells them apart.
   ============================================================ */
import { mc } from "./_shared.js";
import {
  randCurveOf, lineGraph, parabolaGraph, hyperbolaGraph, expGraph,
} from "./_func.js";
import { eqStr, pick } from "../funclib.js";
import { L } from "../lang.js";

const ACC = "#14b8a6";
/* The family NAMES the learner reads, with their Afrikaans twins (row T93).
   The English is _func.js's FAMILY word for word; the ids stay in KINDS. */
const FAMILY = {
  line: L("Straight line", "Reguit lyn"), parabola: L("Parabola", "Parabool"),
  hyperbola: L("Hyperbola", "Hiperbool"), exp: L("Exponential graph", "Eksponensiële grafiek"),
};
const KINDS = [L("line", "line"), L("parabola", "parabola"), L("hyperbola", "hyperbola"), L("exp", "exp")];

/* ---- worked-method text (2026-09-02 methods batch, session S3) ----
   Her notes' own sorting question — "where is the x?" (GR11-FUNCTIONS-NOTES
   -DIGEST pp1–2) — and her standard forms from the p18 summary table. */
const WHERE_X = {
  line: L("there is just an x: no square, nothing in a denominator, nothing in an exponent", "is daar net 'n x: geen kwadraat, niks in 'n noemer of in 'n eksponent nie"),
  parabola: L("there is an x² (or a squared bracket)", "is daar 'n x² (of 'n gekwadreerde hakie)"),
  hyperbola: L("the x sits in the DENOMINATOR", "sit die x in die NOEMER"),
  exp: L("the x sits in the EXPONENT", "sit die x in die EKSPONENT"),
};
const STD_FORM = {
  line: L("y = ax + q", "y = ax + q"),
  parabola: L("y = ax² + bx + c, or y = a(x − p)² + q", "y = ax² + bx + c, of y = a(x − p)² + q"),
  hyperbola: L("y = a/(x − p) + q", "y = a/(x − p) + q"),
  exp: L("y = a·b^(x − p) + q", "y = a·b^(x − p) + q"),
};
const SHAPE_TELL = {
  line: L("it is dead straight — the same slope the whole way", "is dit doodreguit: dieselfde helling die hele pad"),
  parabola: L("it turns once and is symmetric about a vertical line", "draai dit een keer en is dit simmetries om 'n vertikale lyn"),
  hyperbola: L("it comes in two separate branches, hugging a vertical and a horizontal dashed asymptote", "kom dit in twee aparte vlerkies wat aan 'n vertikale en 'n horisontale asimptoot (stippellyne) klou"),
  exp: L("it never turns — it keeps rising (or keeps falling) and flattens onto one horizontal asymptote", "draai dit nooit nie: dit bly styg (of bly daal) en plat af na een horisontale asimptoot"),
};
const graphOf = (cv, opts) =>
  cv.kind === L("line", "line") ? lineGraph(cv, opts) :
  cv.kind === L("parabola", "parabola") ? parabolaGraph(cv, opts) :
  cv.kind === L("hyperbola", "hyperbola") ? hyperbolaGraph(cv, opts) : expGraph(cv, opts);

const SKILLS = {
  /* name the family from its equation */
  identifyFromEq: () => {
    const kind = pick(KINDS);
    const cv = randCurveOf[kind]();
    return mc("funcTypes", L(`What type of function is <b>${eqStr(cv)}</b>?`, `Watter soort funksie is <b>${eqStr(cv)}</b>?`),
      FAMILY[kind], KINDS.filter((k) => k !== kind).map((k) => FAMILY[k]),
      { hint: L("x in the exponent → exponential; x in the denominator → hyperbola; an x² → parabola; just x → straight line.", "x in die eksponent → eksponensieel; x in die noemer → hiperbool; 'n x² → parabool; net x → reguit lyn."),
        answerLabel: `${FAMILY[kind]}.`,
        solution: [
          { s: L(`Ask the one sorting question: where is the x?`, `Vra die een sorteervraag: waar is die x?`), r: L("that alone splits the four families", "dit alleen skei die vier families") },
          { s: L(`In ${eqStr(cv)}, ${WHERE_X[kind]}`, `In ${eqStr(cv)}, ${WHERE_X[kind]}`) },
          { s: L(`That is the ${FAMILY[kind]} shape: ${STD_FORM[kind]}`, `Dit is die familie ${FAMILY[kind]}: ${STD_FORM[kind]}`) },
        ] });
  },

  /* name the family from the drawn graph */
  nameFromGraph: () => {
    const kind = pick(KINDS);
    const cv = randCurveOf[kind]();
    const g = graphOf(cv, { accent: ACC });
    return mc("funcTypes", L("Which type of function is graphed here?", "Watter soort funksie is hier geteken?"),
      FAMILY[kind], KINDS.filter((k) => k !== kind).map((k) => FAMILY[k]),
      { graph: g.spec,
        hint: L("Two straight branches around dashed asymptotes → hyperbola; a U/∩ shape → parabola; a J that flattens to an asymptote → exponential.", "Twee aparte vlerkies om stippel-asimptote → hiperbool; 'n U/∩-vorm → parabool; 'n J wat afplat na 'n asimptoot → eksponensieel."),
        answerLabel: `${FAMILY[kind]}.`,
        solution: [
          { s: L("Go by the shape: count the turning points, then look for dashed asymptotes", "Gaan volgens die vorm: tel die draaipunte en soek dan asimptote (stippellyne)") },
          { s: L(`Here ${SHAPE_TELL[kind]}`, `Hier ${SHAPE_TELL[kind]}`) },
          { s: L(`Only the ${FAMILY[kind]} does that`, `Net die familie ${FAMILY[kind]} doen dit`), r: L(`equation form ${STD_FORM[kind]}`, `vergelykingsvorm ${STD_FORM[kind]}`) },
        ] });
  },

  /* the feature that tells two families apart */
  featureMatch: () => {
    const cases = [
      { p: L("Which graph has a <b>turning point</b>?", "Watter grafiek het 'n <b>draaipunt</b>?"), c: L("Parabola", "Parabool"), w: [L("Straight line", "Reguit lyn"), L("Hyperbola", "Hiperbool"), L("Exponential graph", "Eksponensiële grafiek")],
        sol: [{ s: L("A turning point means the graph stops going one way and comes back the other way", "'n Draaipunt beteken die grafiek hou op om een kant toe te gaan en kom terug die ander kant toe") },
              { s: L("A line never turns, an exponential never turns, and a hyperbola's branches just run away to their asymptotes", "'n Lyn draai nooit nie, 'n eksponensiële grafiek draai nooit nie, en 'n hiperbool se vlerkies hardloop net weg na hul asimptote") },
              { s: L("Only the parabola turns — at its vertex (p ; q)", "Net die parabool draai, by sy draaipunt (p ; q)"), r: L("happy → minimum, sad → maximum", "happy → minimum, sad → maksimum") }] },
      { p: L("Which graph has <b>two asymptotes</b> (one vertical, one horizontal)?", "Watter grafiek het <b>twee asimptote</b> (een vertikaal, een horisontaal)?"), c: L("Hyperbola", "Hiperbool"), w: [L("Parabola", "Parabool"), L("Straight line", "Reguit lyn"), L("Exponential graph", "Eksponensiële grafiek")],
        sol: [{ s: L("y = a/(x − p) + q breaks down when the denominator is 0, i.e. at x = p", "y = a/(x − p) + q breek af wanneer die noemer 0 is, d.w.s. by x = p"), r: L("the vertical asymptote", "die vertikale asimptoot") },
              { s: L("And a/(x − p) can shrink towards 0 but never reach it, so y never reaches q", "En a/(x − p) kan na 0 toe krimp, maar bereik dit nooit nie, dus bereik y nooit q nie"), r: L("the horizontal asymptote", "die horisontale asimptoot") },
              { s: L("Two asymptotes → hyperbola", "Twee asimptote → hiperbool"), r: L("the exponential has only the horizontal one", "die eksponensiële grafiek het net die horisontale een") }] },
      { p: L("Which graph has <b>one horizontal asymptote</b> and no turning point?", "Watter grafiek het <b>een horisontale asimptoot</b> en geen draaipunt nie?"), c: L("Exponential graph", "Eksponensiële grafiek"), w: [L("Parabola", "Parabool"), L("Straight line", "Reguit lyn"), L("Hyperbola", "Hiperbool")],
        sol: [{ s: L("In y = a·b^(x − p) + q the power term shrinks towards 0 on one side, so y flattens onto y = q", "In y = a·b^(x − p) + q krimp die magsterm aan een kant na 0 toe, dus plat y af na y = q"), r: L("one horizontal asymptote", "een horisontale asimptoot") },
              { s: L("It is defined for every x, so nothing breaks and there is no vertical asymptote", "Dit is vir elke x gedefinieer, dus breek niks nie en is daar geen vertikale asimptoot nie") },
              { s: L("It also never turns — it is taking off or landing the whole way", "Dit draai ook nooit nie: dit styg op of land die hele pad"), r: L("∴ the exponential graph", "∴ die eksponensiële grafiek") }] },
      { p: L("Which graph has a <b>constant gradient</b> (the same slope everywhere)?", "Watter grafiek het 'n <b>konstante gradiënt</b> (dieselfde helling oral)?"), c: L("Straight line", "Reguit lyn"), w: [L("Parabola", "Parabool"), L("Hyperbola", "Hiperbool"), L("Exponential graph", "Eksponensiële grafiek")],
        sol: [{ s: L("Gradient = rise/run between two points on the graph", "Gradiënt = styging/loop tussen twee punte op die grafiek") },
              { s: L("On a curve that answer changes depending on which two points you pick", "Op 'n kurwe verander daardie antwoord na gelang van watter twee punte jy kies"), r: L("curves get steeper or flatter", "kurwes word steiler of platter") },
              { s: L("Only a straight line gives the same rise/run everywhere — that is a of y = ax + q", "Net 'n reguit lyn gee oral dieselfde styging/loop: dit is die a in y = ax + q") }] },
      { p: L("Which graph is made of <b>two separate branches</b>?", "Watter grafiek bestaan uit <b>twee aparte vlerkies</b>?"), c: L("Hyperbola", "Hiperbool"), w: [L("Parabola", "Parabool"), L("Straight line", "Reguit lyn"), L("Exponential graph", "Eksponensiële grafiek")],
        sol: [{ s: L("y = a/(x − p) + q is undefined at x = p", "y = a/(x − p) + q is onbepaald by x = p"), r: L("you cannot divide by 0", "jy kan nie deur 0 deel nie") },
              { s: L("So the graph has a hole right through it at that x-value and cannot cross over", "Die grafiek het dus 'n gat reg deur by daardie x-waarde en kan nie oorkruis nie") },
              { s: L("It is forced into two separate branches, one each side of x = p", "Dit word in twee aparte vlerkies gedwing, een aan elke kant van x = p") }] },
    ];
    const k = pick(cases);
    return mc("funcTypes", k.p, k.c, k.w,
      { hint: L("Turning point → parabola; two asymptotes & two branches → hyperbola; one asymptote, always rising or falling → exponential; constant slope → line.", "Draaipunt → parabool; twee asimptote & twee vlerkies → hiperbool; een asimptoot, altyd stygend of dalend → eksponensieel; konstante helling → lyn."),
        answerLabel: `${k.c}.`,
        solution: k.sol });
  },

  /* function notation basics */
  notation: () => {
    const cases = [
      { p: L("In f(x) = 2x − 1, what does <b>f(3)</b> mean?", "In f(x) = 2x − 1, wat beteken <b>f(3)</b>?"), c: L("The y-value when x = 3", "Die y-waarde wanneer x = 3"), w: [L("Multiply f by 3", "Vermenigvuldig f met 3"), L("The x-value when y = 3", "Die x-waarde wanneer y = 3"), L("The gradient at x = 3", "Die gradiënt by x = 3")],
        sol: [{ s: L("f(x) = 2x − 1 is a machine: an x goes in, a y comes out", "f(x) = 2x − 1 is 'n masjien: 'n x gaan in, 'n y kom uit") },
              { s: L("The bracket holds whatever you feed it, so f(3) = 2(3) − 1 = 5", "Die hakie hou wat jy ook al invoer, dus f(3) = 2(3) − 1 = 5") },
              { s: L("That 5 is a y-value, so f(3) is the y-value when x = 3", "Daardie 5 is 'n y-waarde, dus is f(3) die y-waarde wanneer x = 3"), r: L("the point (3 ; 5) is on the graph", "die punt (3 ; 5) lê op die grafiek") }] },
      { p: L("f(x), g(x) and h(x) are different names for which variable?", "f(x), g(x) en h(x) is verskillende name vir watter veranderlike?"), c: L("y", "y"), w: [L("x", "x"), L("the gradient", "die gradiënt"), L("the x-intercept", "die x-afsnit")],
        sol: [{ s: L("y = 2x − 1 and f(x) = 2x − 1 say exactly the same thing", "y = 2x − 1 en f(x) = 2x − 1 sê presies dieselfde") },
              { s: L("The letter in front is just the graph's NAME, so f, g and h can share one set of axes", "Die letter voor is net die grafiek se NAAM, dus kan f, g en h een stel asse deel"), r: L("that is how f(x) > g(x) questions are written", "dit is hoe f(x) > g(x)-vrae geskryf word") },
              { s: L("Whatever the name, the bracket gives back a y-value", "Wat die naam ook al is, die hakie gee 'n y-waarde terug") }] },
      { p: L("“The y-intercept” is the point where…", "“Die y-afsnit” is die punt waar…"), c: L("x = 0", "x = 0"), w: [L("y = 0", "y = 0"), L("the graph turns", "die grafiek draai"), L("the asymptote is", "die asimptoot is")],
        sol: [{ s: L("The y-axis IS the line x = 0", "Die y-as IS die lyn x = 0"), r: L("every point on it has x-coordinate 0", "elke punt daarop het x-koördinaat 0") },
              { s: L("So the graph meets the y-axis where x = 0 — substitute x = 0 into the equation", "Die grafiek ontmoet dus die y-as waar x = 0: vervang x = 0 in die vergelyking") },
              { s: L("The answer is a point: (0 ; the value you got)", "Die antwoord is 'n punt: (0 ; die waarde wat jy kry)") }] },
      { p: L("“The x-intercept(s)” (the roots) are where…", "“Die x-afsnit(te)” (die wortels) is waar…"), c: L("y = 0", "y = 0"), w: [L("x = 0", "x = 0"), L("the graph turns", "die grafiek draai"), L("y is biggest", "y die grootste is")],
        sol: [{ s: L("The x-axis IS the line y = 0", "Die x-as IS die lyn y = 0"), r: L("every point on it has y-coordinate 0", "elke punt daarop het y-koördinaat 0") },
              { s: L("So put y = 0 and solve the equation for x", "Stel dus y = 0 en los die vergelyking op vir x"), r: L("that is why roots and x-intercepts are the same thing", "daarom is wortels en x-afsnitte dieselfde ding") },
              { s: L("Each answer is a point: (the x you got ; 0)", "Elke antwoord is 'n punt: (die x wat jy kry ; 0)") }] },
    ];
    const k = pick(cases);
    return mc("funcTypes", k.p, k.c, k.w,
      { hint: L("f(3) substitutes x = 3 and gives back the y-value. y-intercept: let x = 0. x-intercepts: let y = 0.", "f(3) vervang x = 3 en gee die y-waarde terug. y-afsnit: stel x = 0. x-afsnitte: stel y = 0."),
        answerLabel: k.c,
        solution: k.sol });
  },
};

export const questFn1 = {
  id: "fn1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "funcTypes", gen })),
};
