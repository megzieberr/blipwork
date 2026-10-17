/* ============================================================
   ANALYTICAL GEOMETRY · Q1 — Which formula, and what it tells you
   ------------------------------------------------------------
   The formula-sheet round: match the job (length / midpoint /
   slope) to the right formula, and know what each answer LOOKS
   like (a length, a coordinate, or a slope number). No working —
   just choosing the tool. Diagram-backed where it helps.
   ============================================================ */
import { mc } from "./_shared.js";
import { winFor, layoutPointLabels, AG } from "./_analytical.js";
import { randSegment, randPoint, distance, ptStr, pick } from "../analyticslib.js";
import { L } from "../lang.js";

const ACC = AG[0];

/* the three formula strings, written as the formula sheet writes them */
const F = {
  distance: L("AB = √[(x<sub>B</sub> − x<sub>A</sub>)² + (y<sub>B</sub> − y<sub>A</sub>)²]", "AB = √[(x<sub>B</sub> − x<sub>A</sub>)² + (y<sub>B</sub> − y<sub>A</sub>)²]"),
  midpoint: L("M = ( (x<sub>A</sub> + x<sub>B</sub>)/2 ; (y<sub>A</sub> + y<sub>B</sub>)/2 )", "M = ( (x<sub>A</sub> + x<sub>B</sub>)/2 ; (y<sub>A</sub> + y<sub>B</sub>)/2 )"),
  gradient: L("m = (y<sub>B</sub> − y<sub>A</sub>) / (x<sub>B</sub> − x<sub>A</sub>)", "m = (y<sub>B</sub> − y<sub>A</sub>) / (x<sub>B</sub> − x<sub>A</sub>)"),
};

function segDiagram(A, B) {
  // pad 2: the full coordinate labels are ~2 units wide, so they need room
  // inside the frame; layoutPointLabels then picks a side clear of the segment.
  return layoutPointLabels({
    type: "analytic", accent: ACC, grid: true, win: winFor([A, B], { pad: 2 }),
    segs: [{ a: A, b: B }],
    points: [{ x: A.x, y: A.y, label: `A${ptStr(A)}`, place: "auto" }, { x: B.x, y: B.y, label: `B${ptStr(B)}`, place: "auto" }],
  });
}

const SKILLS = {
  /* job → which formula */
  whichFormula: () => {
    const { A, B } = randSegment();
    const jobs = [
      { q: L("the <b>length</b> of line AB", "die <b>lengte</b> van lyn AB"), key: "distance", ans: L("Use the distance formula.", "Gebruik die afstandsformule.") },
      { q: L("the <b>midpoint</b> of AB", "die <b>middelpunt</b> van AB"), key: "midpoint", ans: L("Use the midpoint formula.", "Gebruik die middelpuntformule.") },
      { q: L("the <b>gradient</b> (slope) of AB", "die <b>gradiënt</b> (helling) van AB"), key: "gradient", ans: L("Use the gradient formula.", "Gebruik die gradiëntformule.") },
    ];
    const j = pick(jobs);
    const wrongs = Object.keys(F).filter((k) => k !== j.key).map((k) => F[k]);
    return mc("whichFormula", L(`Which formula would you use to find ${j.q}?`, `Watter formule sal jy gebruik om ${j.q} te bepaal?`),
      F[j.key], wrongs,
      { graph: segDiagram(A, B),
        hint: L("Length → distance. Halfway point → midpoint. Steepness → gradient.", "Lengte → afstand. Halfpad-punt → middelpunt. Steilte → gradiënt."),
        answerLabel: j.ans });
  },

  /* what the answer looks like */
  answerLooks: () => {
    const cases = [
      { p: L("The <b>distance</b> between two points is…", "Die <b>afstand</b> tussen twee punte is…"), c: L("a length — one positive number (in units)", "'n lengte: een positiewe getal (in eenhede)"), w: [L("a coordinate (x ; y)", "'n koördinaat (x ; y)"), L("an angle in degrees", "'n hoek in grade")] },
      { p: L("The <b>midpoint</b> of a segment is…", "Die <b>middelpunt</b> van 'n lynstuk is…"), c: L("a coordinate (x ; y)", "'n koördinaat (x ; y)"), w: [L("a single length", "'n enkele lengte"), L("a gradient (a slope number)", "'n gradiënt ('n hellingsgetal)")] },
      { p: L("A <b>gradient</b> is…", "'n <b>Gradiënt</b> is…"), c: L("a number that tells you the slope (rise ÷ run)", "'n getal wat vir jou die helling gee (styging ÷ loop)"), w: [L("a coordinate (x ; y)", "'n koördinaat (x ; y)"), L("a length in units", "'n lengte in eenhede")] },
    ];
    const k = pick(cases);
    return mc("whichFormula", k.p, k.c, k.w,
      { hint: L("Distance → a length. Midpoint → a point. Gradient → a slope number.", "Afstand → 'n lengte. Middelpunt → 'n punt. Gradiënt → 'n hellingsgetal."), answerLabel: k.c });
  },

  /* lowercase m vs capital M */
  mVsM: () => {
    const ask = pick([
      { p: L("On the formula sheet, lower-case <b>m</b> stands for…", "Op die formuleblad staan klein <b>m</b> vir…"), c: L("the gradient", "die gradiënt"), w: [L("the midpoint", "die middelpunt"), L("a length", "'n lengte"), L("an angle", "'n hoek")] },
      { p: L("On the formula sheet, capital <b>M</b> stands for…", "Op die formuleblad staan hoofletter <b>M</b> vir…"), c: L("the midpoint", "die middelpunt"), w: [L("the gradient", "die gradiënt"), L("a length", "'n lengte"), L("the maximum", "die maksimum")] },
    ]);
    return mc("whichFormula", ask.p, ask.c, ask.w,
      { hint: L("Small m = gradient (m for ‘slope’). Big M = Midpoint.", "Klein m = gradiënt (die helling). Groot M = Middelpunt."), answerLabel: ask.c });
  },

  /* pick the formula for a real job */
  forTheJob: () => {
    const cases = [
      { p: L("To find the length of a circle’s <b>radius</b>, you use the…", "Om die lengte van 'n sirkel se <b>radius</b> te kry, gebruik jy die…"), c: L("distance formula", "afstandsformule"), w: [L("midpoint formula", "middelpuntformule"), L("gradient formula", "gradiëntformule")] },
      { p: L("The <b>centre</b> of a circle is the midpoint of a diameter, so you use the…", "Die <b>middelpunt</b> van 'n sirkel is die middelpunt van 'n middellyn, dus gebruik jy die…"), c: L("midpoint formula", "middelpuntformule"), w: [L("distance formula", "afstandsformule"), L("gradient formula", "gradiëntformule")] },
      { p: L("To check whether two lines are <b>parallel</b>, you compare their…", "Om te toets of twee lyne <b>ewewydig</b> is, vergelyk jy hulle…"), c: L("gradients", "gradiënte"), w: [L("lengths", "lengtes"), L("midpoints", "middelpunte")] },
      { p: L("To prove a triangle is <b>isosceles</b> (two equal sides), you use the…", "Om te bewys dat 'n driehoek <b>gelykbenig</b> is (twee gelyke sye), gebruik jy die…"), c: L("distance formula", "afstandsformule"), w: [L("midpoint formula", "middelpuntformule"), L("gradient formula", "gradiëntformule")] },
    ];
    const k = pick(cases);
    return mc("whichFormula", k.p, k.c, k.w,
      { hint: L("Ask: am I after a length, a point, or a slope?", "Vra: soek ek 'n lengte, 'n punt of 'n helling?"), answerLabel: k.c });
  },

  /* the order/consistency rule */
  orderRule: () => {
    return mc("whichFormula",
      L("In the gradient formula, if you write <b>y<sub>A</sub></b> first on the top, what must you write first on the bottom?", "As jy in die gradiëntformule <b>y<sub>A</sub></b> eerste bo skryf, wat moet jy eerste onder skryf?"),
      L("x<sub>A</sub> (keep the same point first top and bottom)", "x<sub>A</sub> (hou dieselfde punt eerste, bo en onder)"),
      [L("x<sub>B</sub> (swap the order)", "x<sub>B</sub> (ruil die volgorde om)"), L("either one — order never matters", "enige een: die volgorde maak nooit saak nie"), L("the bigger x-value", "die groter x-waarde")],
      { hint: L("Keep the points in the SAME order top and bottom, or the sign of the gradient flips.", "Hou die punte in DIESELFDE volgorde bo en onder, anders draai die gradiënt se teken om."),
        answerLabel: L("x<sub>A</sub> — same point first, top and bottom.", "x<sub>A</sub>: dieselfde punt eerste, bo en onder.") });
  },

  /* read a coordinate off the plane (pick the labelled point) */
  readPoint: () => {
    const pts = [];
    while (pts.length < 3) {
      const p = randPoint(-6, 6);
      if (pts.every((q) => distance(p, q) >= 3) && Math.abs(p.x) + Math.abs(p.y) > 1) pts.push(p);
    }
    const ids = [L("P", "P"), L("Q", "Q"), L("R", "R")];
    const target = pick(pts.map((p, i) => ({ p, id: ids[i] })));
    const graph = {
      type: "analytic", accent: ACC, grid: true, win: winFor(pts),
      points: pts.map((p, i) => ({ x: p.x, y: p.y, id: ids[i], label: ids[i], place: "auto" })),
    };
    return mc("whichFormula", L(`Which point is at <b>${ptStr(target.p)}</b>?`, `Watter punt is by <b>${ptStr(target.p)}</b>?`),
      target.id, ids.filter((i) => i !== target.id),
      { graph,
        hint: L("Count across for x, then up/down for y.", "Tel links of regs vir x, dan op of af vir y."),
        answerLabel: L(`${target.id} is at ${ptStr(target.p)}.`, `${target.id} is by ${ptStr(target.p)}.`) });
  },
};

export const questAg1 = {
  id: "ag1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "whichFormula", gen })),
};
