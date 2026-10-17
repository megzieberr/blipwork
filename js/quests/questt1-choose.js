/* ============================================================
   TRIG QUEST 1 · Which rule fits?   ★ DIAGRAM
   Labelling "friends" (side opposite its angle), and choosing the
   sine / cosine / area rule from what you are given. Every triangle
   is drawn to scale by the triangle engine.
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri } from "./_trig.js";
import { randInt, pick } from "../triglib.js";
import { L } from "../lang.js";

const ACC = "#0ea5e9";

/* a random valid triangle in each given-case, returned solved */
function genAAS() { const A = randInt(35, 75), B = randInt(35, 75); return placeTri({ angles: { A, B }, sides: { a: randInt(8, 18) } }, [L("A", "A"), L("B", "B"), L("C", "C")], randInt(-25, 25)); }
function genSAS() { return placeTri({ sides: { b: randInt(6, 14), c: randInt(6, 14) }, angles: { A: randInt(40, 115) } }, [L("A", "A"), L("B", "B"), L("C", "C")], randInt(-25, 25)); }
function genSSS() {
  let a, b, c;
  do { a = randInt(7, 14); b = randInt(7, 14); c = randInt(7, 14); }
  while (a + b <= c + 1 || a + c <= b + 1 || b + c <= a + 1);
  return placeTri({ sides: { a, b, c } }, [L("A", "A"), L("B", "B"), L("C", "C")], randInt(-25, 25));
}

const SKILLS = {
  /* choose the rule from the given case */
  ruleForCase: () => {
    const cases = [
      { kind: "AAS", t: genAAS(), correct: L("Sine rule", "Sinusreël"), why: L("You have two angles and a side — sine rule.", "Jy het twee hoeke en 'n sy: sinusreël."),
        build: t => ({ angles: [t.angle(L("A", "A"), `${Math.round(t.angles.A)}°`), t.angle(L("B", "B"), `${Math.round(t.angles.B)}°`)], sides: [t.side(L("B", "B"), L("C", "C"), String(Math.round(t.sides.a)))] }),
        sol: t => [
          { s: L(`Given: Â = ${Math.round(t.angles.A)}°, B̂ = ${Math.round(t.angles.B)}° and the side a = ${Math.round(t.sides.a)}`, `Gegee: Â = ${Math.round(t.angles.A)}°, B̂ = ${Math.round(t.angles.B)}° en die sy a = ${Math.round(t.sides.a)}`), r: L("write down what you have first", "skryf eers neer wat jy het") },
          { s: L(`a sits opposite Â, so a and Â are a matched pair`, `a lê teenoor Â, dus is a en Â 'n sy-hoek-paar`), r: L("a side with the angle facing it", "'n sy en die hoek reg oorkant dit") },
          { s: L(`A matched pair is exactly what the sine rule needs: a/sinÂ = b/sinB̂`, `'n Sy-hoek-paar is presies wat die sinusreël nodig het: a/sinÂ = b/sinB̂`) },
        ],
        prompt: L("Two angles and a side are known and you must find another side. Which rule?", "Twee hoeke en 'n sy is bekend en jy moet nog 'n sy vind. Watter reël?") },
      { kind: "SAS", t: genSAS(), correct: L("Cosine rule", "Cosinusreël"), why: L("Two sides and the angle between them, finding the third side — cosine rule.", "Twee sye en die hoek tussen hulle, die derde sy gesoek: cosinusreël."),
        build: t => ({ angles: [t.angle(L("A", "A"), `${Math.round(t.angles.A)}°`)], sides: [t.side(L("A", "A"), L("B", "B"), String(Math.round(t.sides.c))), t.side(L("A", "A"), L("C", "C"), String(Math.round(t.sides.b)))] }),
        sol: t => [
          { s: L(`Given: b = ${Math.round(t.sides.b)}, c = ${Math.round(t.sides.c)} and Â = ${Math.round(t.angles.A)}° between them`, `Gegee: b = ${Math.round(t.sides.b)}, c = ${Math.round(t.sides.c)} en Â = ${Math.round(t.angles.A)}° tussen hulle`) },
          { s: L(`Â is BETWEEN the two known sides, so no side is paired with a known opposite angle`, `Â lê TUSSEN die twee bekende sye, dus het geen sy 'n bekende teenoorstaande hoek nie`), r: L("the sine rule cannot start", "die sinusreël kan nie begin nie") },
          { s: `a² = b² + c² − 2bc·cosÂ = ${Math.round(t.sides.b)}² + ${Math.round(t.sides.c)}² − 2(${Math.round(t.sides.b)})(${Math.round(t.sides.c)})cos${Math.round(t.angles.A)}°` },
        ],
        prompt: L("Two sides and the angle between them are known; find the third side. Which rule?", "Twee sye en die hoek tussen hulle is bekend; vind die derde sy. Watter reël?") },
      { kind: "SSS", t: genSSS(), correct: L("Cosine rule", "Cosinusreël"), why: L("All three sides known, finding an angle — cosine rule (rearranged).", "Al drie sye bekend, 'n hoek gesoek: cosinusreël (herrangskik)."),
        build: t => ({ sides: [t.side(L("B", "B"), L("C", "C"), String(Math.round(t.sides.a))), t.side(L("A", "A"), L("C", "C"), String(Math.round(t.sides.b))), t.side(L("A", "A"), L("B", "B"), String(Math.round(t.sides.c)))] }),
        sol: t => [
          { s: L(`Given: a = ${Math.round(t.sides.a)}, b = ${Math.round(t.sides.b)}, c = ${Math.round(t.sides.c)} — three sides and not one angle`, `Gegee: a = ${Math.round(t.sides.a)}, b = ${Math.round(t.sides.b)}, c = ${Math.round(t.sides.c)}: drie sye en nie een hoek nie`) },
          { s: L(`The sine rule needs an angle to start with, and there is none`, `Die sinusreël het 'n hoek nodig om mee te begin, en daar is geen`), r: L("so it is out", "dus val dit uit") },
          { s: `cosÂ = (b² + c² − a²)/(2bc)`, r: L("the cosine rule rearranged to give an angle", "die cosinusreël herrangskik om 'n hoek te gee") },
        ],
        prompt: L("All three sides are known and you must find an angle. Which rule?", "Al drie sye is bekend en jy moet 'n hoek vind. Watter reël?") },
      { kind: "AREA", t: genSAS(), correct: L("Area rule", "Oppervlakreël"), why: L("Two sides and the included angle, finding the AREA — area rule.", "Twee sye en die ingeslote hoek, die OPPERVLAKTE gesoek: oppervlakreël."),
        build: t => ({ angles: [t.angle(L("A", "A"), `${Math.round(t.angles.A)}°`)], sides: [t.side(L("A", "A"), L("B", "B"), String(Math.round(t.sides.c))), t.side(L("A", "A"), L("C", "C"), String(Math.round(t.sides.b)))] }),
        sol: t => [
          { s: L(`The question wants the AREA, not a side or an angle`, `Die vraag soek die OPPERVLAKTE, nie 'n sy of 'n hoek nie`), r: L("that already picks the rule", "dit kies reeds die reël") },
          { s: L(`Area = ½·b·c·sinÂ needs two sides and the angle between them`, `Oppervlakte = ½·b·c·sinÂ het twee sye en die hoek tussen hulle nodig`) },
          { s: L(`You have b = ${Math.round(t.sides.b)}, c = ${Math.round(t.sides.c)} and Â = ${Math.round(t.angles.A)}° between them, so it fits straight away`, `Jy het b = ${Math.round(t.sides.b)}, c = ${Math.round(t.sides.c)} en Â = ${Math.round(t.angles.A)}° tussen hulle, dus pas dit dadelik`) },
        ],
        prompt: L("Two sides and the angle between them are known; find the AREA. Which rule?", "Twee sye en die hoek tussen hulle is bekend; vind die OPPERVLAKTE. Watter reël?") },
    ];
    const c = pick(cases);
    const parts = c.build(c.t);
    return mc("trigChooseRule", c.prompt, c.correct,
      [L("Sine rule", "Sinusreël"), L("Cosine rule", "Cosinusreël"), L("Area rule", "Oppervlakreël")].filter(r => r !== c.correct),
      { graph: { type: "triangle", accent: ACC, pts: c.t.pts, poly: c.t.poly, ...parts },
        hint: L("Sine rule pairs a side with its opposite angle. Cosine rule needs an included angle (or all 3 sides). Area rule finds area from 2 sides + included angle.", "Die sinusreël koppel 'n sy aan sy teenoorstaande hoek. Die cosinusreël het 'n ingeslote hoek nodig (of al 3 sye). Die oppervlakreël vind oppervlakte uit 2 sye + ingeslote hoek."),
        answerLabel: c.why,
        solution: c.sol(c.t) });
  },

  /* the "friends" idea: a side is named after the angle opposite it */
  oppositeSide: () => {
    const t = genSSS();
    const target = pick([L("A", "A"), L("B", "B"), L("C", "C")]);
    const opp = { A: L("BC", "BC"), B: L("CA", "CA"), C: L("AB", "AB") }[target];      // side opposite the chosen vertex
    // build a sideMid key that matches the outline order A→B→C
    const key = { BC: L("BC", "BC"), CA: L("CA", "CA"), AB: L("AB", "AB") }[opp];
    const touching = [L("AB", "AB"), L("BC", "BC"), L("CA", "CA")].filter(s => s.includes(target));   // the two sides that meet AT the vertex
    return {
      type: "tap", concept: "labelling",
      prompt: L(`Tap the side that is <b>opposite ${target}̂</b> (its “friend”).`, `Klik op die sy wat <b>teenoor ${target}̂</b> lê (sy “vriend”).`),
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly, tap: { mode: "side", correctId: key } },
      tap: { mode: "side", correctId: key, targets: [L("AB", "AB"), L("BC", "BC"), L("CA", "CA")] },
      tapHint: L(`Look straight across the triangle from vertex ${target} to the side facing it.`, `Kyk reguit oor die driehoek, van hoekpunt ${target} na die sy oorkant hom.`),
      hint: L("Each side is named after the angle it faces across the triangle.", "Elke sy is vernoem na die hoek oorkant hom in die driehoek."),
      answerLabel: L(`The side opposite ${target}̂ is ${opp.split("").join("")} — they are “friends”.`, `Die sy teenoor ${target}̂ is ${opp.split("").join("")}: hulle is “vriende”.`),
      solution: [
        { s: L(`${touching[0]} and ${touching[1]} both touch corner ${target}̂`, `${touching[0]} en ${touching[1]} raak albei aan hoek ${target}̂`), r: L("those are the sides NEXT to the angle", "dit is die sye LANGS die hoek") },
        { s: L(`${opp} is the one left over, straight across the triangle from ${target}̂`, `${opp} is die een wat oorbly, reguit oorkant ${target}̂`), r: L(`so ${opp} is opposite ${target}̂ — its “friend”`, `dus is ${opp} teenoor ${target}̂: sy “vriend”`) },
      ],
    };
  },

  /* biggest angle is opposite the longest side */
  biggestAngle: () => {
    let t, sorted;                                       // one side must be STRICTLY longest,
    do {                                                 // or "the biggest angle" would be a tie
      t = genSSS();
      sorted = [t.sides.a, t.sides.b, t.sides.c].map(Math.round).sort((x, y) => y - x);
    } while (sorted[0] === sorted[1]);
    const s = t.sides;                                   // a opp A, b opp B, c opp C
    const longest = ([L("A", "A"), L("B", "B"), L("C", "C")]).reduce((m, k) => (s[k.toLowerCase()] > s[m.toLowerCase()] ? k : m), L("A", "A"));
    return mc("labelling",
      L("The biggest angle always sits opposite the <b>longest</b> side. Using the side lengths shown, which angle is the biggest?", "Die grootste hoek lê altyd teenoor die <b>langste</b> sy. Watter hoek is die grootste, volgens die sylengtes wat gewys word?"),
      `${longest}̂`,
      [L("A", "A"), L("B", "B"), L("C", "C")].filter(k => k !== longest).map(k => `${k}̂`),
      { graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        sides: [t.side(L("B", "B"), L("C", "C"), String(Math.round(s.a))), t.side(L("A", "A"), L("C", "C"), String(Math.round(s.b))), t.side(L("A", "A"), L("B", "B"), String(Math.round(s.c)))] },
        hint: L("Find the longest side, then name the angle facing it.", "Vind die langste sy, en noem dan die hoek oorkant hom."),
        answerLabel: L(`The longest side is opposite ${longest}̂, so ${longest}̂ is the biggest angle.`, `Die langste sy is teenoor ${longest}̂, dus is ${longest}̂ die grootste hoek.`),
        solution: [
          { s: L(`Sides: a = ${Math.round(s.a)}, b = ${Math.round(s.b)}, c = ${Math.round(s.c)}`, `Sye: a = ${Math.round(s.a)}, b = ${Math.round(s.b)}, c = ${Math.round(s.c)}`), r: L("a faces Â, b faces B̂, c faces Ĉ", "a is oorkant Â, b oorkant B̂, c oorkant Ĉ") },
          { s: L(`The longest of the three is ${Math.round(s[longest.toLowerCase()])}, which is side ${longest.toLowerCase()}`, `Die langste van die drie is ${Math.round(s[longest.toLowerCase()])}, en dit is sy ${longest.toLowerCase()}`) },
          { s: L(`Side ${longest.toLowerCase()} sits opposite ${longest}̂, so ${longest}̂ is the biggest angle`, `Sy ${longest.toLowerCase()} lê teenoor ${longest}̂, dus is ${longest}̂ die grootste hoek`), r: L("biggest angle faces the longest side", "grootste hoek is oorkant die langste sy") },
        ] });
  },

  /* recognise the cosine "find a side" trigger */
  cosineTrigger: () => mc("trigChooseRule",
    L("You know two sides and the angle <b>between</b> them, and want the third side. Which rule?", "Jy ken twee sye en die hoek <b>tussen</b> hulle, en wil die derde sy hê. Watter reël?"),
    L("Cosine rule", "Cosinusreël"), [L("Sine rule", "Sinusreël"), L("Area rule", "Oppervlakreël")],
    { hint: L("Sine rule always needs a side paired with its OPPOSITE angle. Here the angle is between the two sides.", "Die sinusreël het altyd 'n sy nodig wat met sy TEENOORSTAANDE hoek gepaar is. Hier lê die hoek tussen die twee sye."),
      answerLabel: L("Two sides + the included angle → cosine rule: a² = b² + c² − 2bc·cosA.", "Twee sye + die ingeslote hoek → cosinusreël: a² = b² + c² − 2bc·cosA."),
      solution: [
        { s: L("Try the sine rule first: it needs a side paired with the angle OPPOSITE it", "Probeer eers die sinusreël: dit het 'n sy nodig wat met die hoek TEENOOR hom gepaar is") },
        { s: L("Here the known angle lies BETWEEN the two known sides, so there is no such pair", "Hier lê die bekende hoek TUSSEN die twee bekende sye, dus is daar nie so 'n paar nie"), r: L("sine rule cannot start", "sinusreël kan nie begin nie") },
        { s: L("a² = b² + c² − 2bc·cosA is built for exactly this set-up", "a² = b² + c² − 2bc·cosA is presies vir hierdie opstelling gebou"), r: L("two sides and the angle between them", "twee sye en die hoek tussen hulle") },
      ] }),

  /* recognise the area-rule trigger */
  areaTrigger: () => mc("trigChooseRule",
    L("Which information lets you use the <b>area rule</b> straight away?", "Met watter inligting kan jy die <b>oppervlakreël</b> dadelik gebruik?"),
    L("Two sides and the angle between them", "Twee sye en die hoek tussen hulle"),
    [L("All three angles", "Al drie hoeke"), L("Two angles and a side", "Twee hoeke en 'n sy"), L("All three sides", "Al drie sye")],
    { hint: L("Area = ½ × (side) × (side) × sin(included angle).", "Oppervlakte = ½ × (sy) × (sy) × sin(ingeslote hoek)."),
      answerLabel: L("Area rule needs two sides and the INCLUDED angle: Area = ½·b·c·sinA.", "Die oppervlakreël het twee sye en die INGESLOTE hoek nodig: Oppervlakte = ½·b·c·sinA."),
      solution: [
        { s: L("Read the formula itself: Area = ½·b·c·sinA", "Lees die formule self: Oppervlakte = ½·b·c·sinA") },
        { s: L("It asks for two side lengths (b and c) and the sine of A, the angle sitting between them", "Dit vra twee sylengtes (b en c) en die sin van A, die hoek tussen hulle"), r: L("so that is the information it needs", "dus is dit die inligting wat dit nodig het") },
      ] }),

  /* SSA = the ambiguous trigger */
  ssaTrigger: () => mc("trigChooseRule",
    L("You are given two sides and an angle that is <b>not</b> between them. Which rule applies (and what must you watch for)?", "Jy kry twee sye en 'n hoek wat <b>nie</b> tussen hulle lê nie. Watter reël geld (en waarvoor moet jy oppas)?"),
    L("Sine rule — the ambiguous case", "Sinusreël: die dubbelsinnige geval"),
    [L("Cosine rule — always one answer", "Cosinusreël: altyd een antwoord"), L("Area rule", "Oppervlakreël"), L("Sine rule — never ambiguous", "Sinusreël: nooit dubbelsinnig nie")],
    { hint: L("An angle opposite a known side points to the sine rule; two sides + non-included angle can give two triangles.", "'n Hoek teenoor 'n bekende sy wys na die sinusreël; twee sye + 'n nie-ingeslote hoek kan twee driehoeke gee."),
      answerLabel: L("Two sides + a non-included angle → sine rule, and it may give TWO possible triangles (ambiguous case).", "Twee sye + 'n nie-ingeslote hoek → sinusreël, en dit kan TWEE moontlike driehoeke gee (dubbelsinnige geval)."),
      solution: [
        { s: L("The angle is opposite one of the two known sides, so you DO have a side–angle pair", "Die hoek is teenoor een van die twee bekende sye, dus HET jy 'n sy-hoek-paar"), r: L("that points at the sine rule", "dit wys na die sinusreël") },
        { s: L("But the second side can swing down and meet the base in two different places", "Maar die tweede sy kan afswaai en die basis op twee verskillende plekke ontmoet") },
        { s: L("So: sine rule, then check h = b·sinA against a — if h &lt; a &lt; b, two triangles fit", "Dus: sinusreël, toets dan h = b·sinA teen a: as h &lt; a &lt; b, pas twee driehoeke"), r: L("the ambiguous case", "die dubbelsinnige geval") },
      ] }),
};

export const questT1 = {
  id: "t1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: (id === "oppositeSide" || id === "biggestAngle") ? "labelling" : "trigChooseRule", gen,
  })),
};
