/* ============================================================
   FINANCE QUEST 3 · Compounding periods
   Setting up i/k and n·k for half-yearly, quarterly, monthly, …
   Theory/setup only — not a full solve.
   ============================================================ */
import { mc, mcNum, C } from "./_shared.js";
import { randInt, pick } from "../ui.js";
import { toFrac, COMPOUNDING, pow } from "../finlib.js";
import { L } from "../lang.js";

const CL = "compounding";
/* T95: finlib's labels are English; the Afrikaans side reads its own word
   (AF-GLOSSARY row 217). A getter, so L() picks at render time and the
   English label stays byte-identical. */
const HOW_AF = { 1: "jaarliks", 2: "halfjaarliks", 4: "kwartaalliks", 12: "maandeliks" };
const twin = c => ({ ...c, get label() { return L(c.label, HOW_AF[c.k]); } });
const TWINNED = COMPOUNDING.filter(c => c.k <= 12).map(twin);
/* the meaningful (k>1) options for rate/exponent setup */
const OPTS = TWINNED.filter(c => [2, 4, 12].includes(c.k));

const SKILLS = {
  timesPerYear: () => {
    const o = pick(TWINNED);
    return {
      type: "mc", concept: CL,
      prompt: L(`How many times a year is interest added when it is compounded <b>${o.label}</b>?`, `Hoeveel keer per jaar word rente bygetel as dit <b>${o.label}</b> saamgestel word?`),
      options: mcNum(o.k, [o.k === 12 ? 6 : 12, o.k === 1 ? 2 : 1, o.k * 2, o.k + 3]),
      answerLabel: L(`${o.label} → ${o.k} time${o.k > 1 ? "s" : ""} a year`, `${o.label} → ${o.k} keer${o.k > 1 ? "" : ""} per jaar`),
      hint: L("Annually 1, half‑yearly 2, quarterly 4, monthly 12.", "Jaarliks 1, halfjaarliks 2, kwartaalliks 4, maandeliks 12."),
    };
  },

  ratePerPeriod: () => {
    const o = pick(OPTS), annual = pick([6, 9, 12, 18, 15]);   // all divide exactly by 2, 4 and 12 — no rounded rate labels
    const i = toFrac(annual) / o.k;
    return {
      type: "mc", concept: CL,
      prompt: L(`${C(annual)}% p.a. compounded <b>${o.label}</b>. What is the rate <b>per period</b> (i)?`, `${C(annual)}% p.j. <b>${o.label}</b> saamgestel. Wat is die koers <b>per periode</b> (i)?`),
      options: mcNum(i, [toFrac(annual), toFrac(annual) * o.k, toFrac(annual) / (o.k === 12 ? 4 : 12)]),
      answerLabel: L(`i = ${C(annual)}% ÷ ${o.k} = ${C(i)}`, `i = ${C(annual)}% ÷ ${o.k} = ${C(i)}`),
      hint: L("Divide the annual rate (as a fraction) by the number of times per year.", "Deel die jaarlikse koers (as 'n breuk) deur die aantal keer per jaar."),
      solution: [{ s: `${C(toFrac(annual))} ÷ ${o.k} = ${C(i)}` }],
    };
  },

  exponent: () => {
    const o = pick(OPTS), years = randInt(2, 6);
    const e = years * o.k;
    return {
      type: "mc", concept: CL,
      prompt: L(`Compounded <b>${o.label}</b> for <b>${years} years</b>. What is the exponent (power)?`, `<b>${o.label}</b> saamgestel vir <b>${years} jaar</b>. Wat is die eksponent (mag)?`),
      options: mcNum(e, [years, o.k, years + o.k, e + 1, e * 2]),   // backstops: when years = k, the first two collide AND years+k = years×k = e
      answerLabel: `${years} × ${o.k} = ${e}`,
      hint: L('Exponent = years × <span class="nowrap">times‑per‑year</span>.', 'Eksponent = jare × <span class="nowrap">keer‑per‑jaar</span>.'),
      solution: [{ s: L(`${years} years × ${o.k} per year = ${e}`, `${years} jaar × ${o.k} per jaar = ${e}`) }],
    };
  },

  fullSetup: () => {
    const o = pick(OPTS), annual = pick([8, 12, 18]), years = randInt(2, 5), P = pick([5000, 8000, 10000]);
    const i = C(toFrac(annual)), e = years * o.k;
    return mc(CL,
      L(`Choose the correct setup for <b>R${P.toLocaleString("en-ZA").replace(/,/g, " ")}</b> at ${C(annual)}% p.a. compounded <b>${o.label}</b> for ${years} years.`, `Kies die korrekte opstelling vir <b>R${P.toLocaleString("en-ZA").replace(/,/g, " ")}</b> teen ${C(annual)}% p.j. <b>${o.label}</b> saamgestel vir ${years} jaar.`),
      `${P}${pow(`(1 + ${i}/${o.k})`, `${years}×${o.k}`)}`,
      [`${P}${pow(`(1 + ${i})`, years)}`, `${P}${pow(`(1 + ${i}×${o.k})`, years)}`, `${P}${pow(`(1 + ${i}/${years})`, o.k)}`],
      { hint: L("Divide the rate by k inside the bracket; multiply years by k in the power.", "Deel die koers deur k binne die hakie; vermenigvuldig die jare met k in die mag."), answerLabel: `${P}${pow(`(1 + ${i}/${o.k})`, `${years}×${o.k}`)}`,
        solution: [
          { s: L(`Rate per period = ${i}/${o.k}`, `Koers per periode = ${i}/${o.k}`), r: L(`compounded ${o.label} → ${o.k} times a year`, `${o.label} saamgestel → ${o.k} keer per jaar`) },
          { s: L(`Number of periods = ${years}×${o.k} = ${e}`, `Aantal periodes = ${years}×${o.k} = ${e}`), r: L('years × <span class="nowrap">times‑per‑year</span>', 'jare × <span class="nowrap">keer‑per‑jaar</span>') },
          { s: L(`A = ${P}${pow(`(1 + ${i}/${o.k})`, `${years}×${o.k}`)}`, `A = ${P}${pow(`(1 + ${i}/${o.k})`, `${years}×${o.k}`)}`), r: L("build the WHOLE equation, then type it in one go", "bou die HELE vergelyking, en tik dit dan in een slag in") },
        ] });
  },

  monthlyRate: () => {
    const annual = pick([12, 18, 24, 9, 15]);
    const i = toFrac(annual) / 12;
    return {
      type: "mc", concept: CL,
      prompt: L(`${C(annual)}% p.a. compounded <b>monthly</b>. What is i per month?`, `${C(annual)}% p.j. <b>maandeliks</b> saamgestel. Wat is i per maand?`),
      options: mcNum(i, [toFrac(annual), toFrac(annual) / 4, toFrac(annual) * 12]),
      answerLabel: `${C(annual)}% ÷ 12 = ${C(i)}`,
      hint: L("Monthly means 12 times a year, so divide by 12.", "Maandeliks beteken 12 keer per jaar, so deel deur 12."),
      solution: [
        { s: L(`${C(annual)}% as a fraction is ${C(toFrac(annual))}`, `${C(annual)}% as 'n breuk is ${C(toFrac(annual))}`), r: "÷ 100" },
        { s: L(`Monthly → interest is added 12 times a year`, `Maandeliks → rente word 12 keer per jaar bygetel`), r: L("so share the annual rate over 12", "so verdeel die jaarlikse koers oor 12") },
        { s: L(`i = ${C(toFrac(annual))} ÷ 12 = ${C(i)}`, `i = ${C(toFrac(annual))} ÷ 12 = ${C(i)}`) },
      ],
    };
  },

  whyDivide: () => mc(CL,
    L("Why do we divide the annual rate by 12 for <b>monthly</b> compounding?", "Hoekom deel ons die jaarlikse koers deur 12 vir <b>maandelikse</b> samestelling?"),
    L("Because interest is added 12 times a year, each time a twelfth of the annual rate", "Omdat rente 12 keer per jaar bygetel word, elke keer 'n twaalfde van die jaarlikse koers"),
    [L("Because there are 12 months in the question", "Omdat daar 12 maande in die vraag is"), L("Because 12 is the number of years", "Omdat 12 die aantal jare is"), L("Because the rate must always be a whole number", "Omdat die koers altyd 'n heelgetal moet wees")],
    { hint: L("The yearly rate is shared out over the 12 times it is added.", "Die jaarlikse koers word verdeel oor die 12 keer wat dit bygetel word.") }),
};

export const questF3 = {
  id: "f3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CL, gen })),
};
