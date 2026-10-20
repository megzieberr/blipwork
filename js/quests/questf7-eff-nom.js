/* ============================================================
   FINANCE QUEST 7 · Effective vs nominal rates
   What each rate means, that both are compound, and the structure
   of the conversion formula.
   ============================================================ */
import { mc, C, mcStep, calcStep } from "./_shared.js";
import { pick } from "../ui.js";
import { toFrac, effFromNom, COMPOUNDING, pow } from "../finlib.js";
import { L } from "../lang.js";

const CL = "effNom";
/* T95: finlib's labels are English; the Afrikaans side reads its own word
   (AF-GLOSSARY row 217). A getter, so L() picks at render time and the
   English label stays byte-identical. */
const HOW_AF = { 2: "halfjaarliks", 4: "kwartaalliks", 12: "maandeliks" };
const twin = c => ({ ...c, get label() { return L(c.label, HOW_AF[c.k]); } });
/* the frequencies worth converting (k > 1) */
const OPTS = COMPOUNDING.filter(c => [2, 4, 12].includes(c.k)).map(twin);

const SKILLS = {
  effectiveAnnual: () => mc(CL,
    L("An <b>effective</b> interest rate is always quoted…", "'n <b>Effektiewe</b> rentekoers word altyd aangegee…"),
    L("annually (per year)", "jaarliks (per jaar)"),
    [L("monthly", "maandeliks"), L("with a compounding frequency", "met 'n samestellingsfrekwensie"), L("daily", "daagliks")],
    { hint: L("Effective = the true growth over one whole year.", "Effektief = die ware groei oor een hele jaar."), answerLabel: L("Effective rates are annual", "Effektiewe koerse is jaarliks") }),

  nominalFreq: () => mc(CL,
    L("A <b>nominal</b> interest rate is quoted…", "'n <b>Nominale</b> rentekoers word aangegee…"),
    L("with a compounding frequency (e.g. monthly)", "met 'n samestellingsfrekwensie (bv. maandeliks)"),
    [L("always with no time period", "altyd sonder 'n tydperk"), L("only ever annually", "altyd net jaarliks"), L("as a rand amount", "as 'n randbedrag")],
    { hint: L("“18% p.a. compounded monthly” is a nominal rate — it names the frequency.", "“18% p.j. maandeliks saamgestel” is 'n nominale koers: dit noem die frekwensie.") }),

  bothCompound: () => mc(CL,
    L("Effective and nominal rates are both types of…", "Effektiewe en nominale koerse is albei soorte…"),
    L("compound interest", "saamgestelde rente"),
    [L("simple interest", "enkelvoudige rente"), L("depreciation", "waardevermindering"), L("deposits", "deposito's")],
    { hint: L("Both describe compound growth, just quoted differently.", "Albei beskryf saamgestelde groei, net anders aangegee."), answerLabel: L("Both are compound interest", "Albei is saamgestelde rente") }),

  conversionFormula: () => mc(CL,
    L("Which formula converts a <b>nominal</b> rate to an <b>effective</b> rate?", "Watter formule skakel 'n <b>nominale</b> koers om na 'n <b>effektiewe</b> koers?"),
    L("1 + i_eff = (1 + i_nom/n)ⁿ", "1 + i_eff = (1 + i_nom/n)ⁿ"),
    [L("i_eff = i_nom × n", "i_eff = i_nom × n"), L("1 + i_eff = (1 + i_nom·n)ⁿ", "1 + i_eff = (1 + i_nom·n)ⁿ"), L("i_eff = (1 + i_nom)/n", "i_eff = (1 + i_nom)/n")],
    { hint: L("Divide the nominal rate by n inside the bracket, raise to the power n.", "Deel die nominale koers deur n binne die hakie, en verhef tot die mag n."), answerLabel: L("1 + i_eff = (1 + i_nom/n)ⁿ", "1 + i_eff = (1 + i_nom/n)ⁿ") }),

  nMeaning: () => mc(CL,
    L("In <b>1 + i_eff = (1 + i_nom/n)ⁿ</b>, what is <b>n</b>?", "In <b>1 + i_eff = (1 + i_nom/n)ⁿ</b>, wat is <b>n</b>?"),
    L("the number of compounding periods per year", "die aantal samestellingsperiodes per jaar"),
    [L("the number of years", "die aantal jare"), L("the principal amount", "die hoofsom"), L("the effective rate", "die effektiewe koers")],
    { hint: L("For monthly compounding n = 12; quarterly n = 4.", "Vir maandelikse samestelling is n = 12; kwartaalliks n = 4.") }),

  whyConvert: () => mc(CL,
    L("Why convert rates to their <b>effective</b> form?", "Hoekom skakel ons koerse om na hul <b>effektiewe</b> vorm?"),
    L("To fairly compare rates that compound at different frequencies", "Om koerse met verskillende samestellingsfrekwensies regverdig te vergelyk"),
    [L("To make the rate bigger", "Om die koers groter te maak"), L("To turn compound into simple interest", "Om saamgestelde rente in enkelvoudige rente te verander"), L("To avoid using a calculator", "Om nie 'n sakrekenaar te gebruik nie")],
    { hint: L("Two nominal rates with different frequencies can't be compared directly.", "Twee nominale koerse met verskillende frekwensies kan nie direk vergelyk word nie.") }),

  /* the rate rolls (2026-08-23) — the qualitative answer is
     rate-independent, so only the number in the sentence changes */
  whichGrowsMore: () => {
    const nom = pick([8, 10, 12, 18]);
    const effM = (effFromNom(toFrac(nom), 12) * 100).toFixed(2).replace(".", ",");
    return mc(CL,
      L(`${C(nom)}% p.a. compounded <b>monthly</b> vs ${C(nom)}% p.a. compounded <b>annually</b> — which has the higher <b>effective</b> rate?`, `${C(nom)}% p.j. <b>maandeliks</b> saamgestel vs ${C(nom)}% p.j. <b>jaarliks</b> saamgestel: watter een het die hoër <b>effektiewe</b> koers?`),
      L("Compounded monthly", "Maandeliks saamgestel"),
      [L("Compounded annually", "Jaarliks saamgestel"), L("They are exactly equal", "Hulle is presies gelyk"), L("It depends on the principal", "Dit hang van die hoofsom af")],
      { hint: L("More frequent compounding earns slightly more over a year.", "Meer gereelde samestelling verdien oor 'n jaar effens meer."), answerLabel: L("More frequent compounding → higher effective rate", "Meer gereelde samestelling → hoër effektiewe koers"),
        /* Kept to SHORT statements on purpose: at 375 px a long line that
           contains "i_eff" wraps INSIDE the token and reads as "i_ / eff"
           (found in this session's phone screenshots). One idea per step
           keeps every line inside the phone on one row. */
        solution: [
          { s: L(`Monthly: 1 + i_eff = ${pow(`(1 + ${C(toFrac(nom))}/12)`, 12)}`, `Maandeliks: 1 + i_eff = ${pow(`(1 + ${C(toFrac(nom))}/12)`, 12)}`), r: L("n = 12, one equation", "n = 12, een vergelyking") },
          { s: L(`That gives ${effM}% a year`, `Dit gee ${effM}% per jaar`), r: L("type the whole right side in one go", "tik die hele regterkant in een slag in") },
          { s: L(`Annually: the ${C(nom)}% is already effective`, `Jaarliks: die ${C(nom)}% is reeds effektief`), r: L("interest is added once a year", "rente word een keer per jaar bygetel") },
          { s: L(`${effM}% > ${C(nom)}% → monthly grows more`, `${effM}% > ${C(nom)}% → maandeliks groei meer`), r: L("the earlier interest earns interest itself", "die vroeëre rente verdien self rente") },
        ] });
  },

  /* steps, 2026-08-30 audit-day split (Session 2) — prompt, numbers and
     the worked `solution` are unchanged; the solution's own three lines
     became the answered chain. ⚠️ HER FINANCE METHOD RULE: no "divide
     the rate first" step is offered — step 3 types the WHOLE right side
     of 1 + i_eff = (1 + i_nom/n)ⁿ in one go, so no rounded intermediate
     ever feeds a later computation. tol 0.001 explicit on the calc step
     (the default 0.015 is a trig allowance and would accept a wrong
     neighbouring hundredth-of-a-percent here). */
  effCalc: () => {
    const o = pick(OPTS), nom = pick([8, 10, 12, 18]);
    const eff = effFromNom(toFrac(nom), o.k) * 100;
    const effC = eff.toFixed(2).replace(".", ",");   // always 2 dp, comma decimal
    return {
      type: "steps", concept: CL,
      prompt: L(`Convert <b>${C(nom)}% p.a. compounded ${o.label}</b> to an <b>effective annual rate</b>. Give your answer as a %, to 2 decimal places.`, `Skakel <b>${C(nom)}% p.j. ${o.label} saamgestel</b> om na 'n <b>effektiewe jaarlikse koers</b>. Gee jou antwoord as 'n %, tot 2 desimale plekke.`),
      steps: [
        mcStep(L(`What is n for “compounded ${o.label}”?`, `Wat is n vir “${o.label} saamgestel”?`), String(o.k),
          [1, 2, 4, 12].filter(k => k !== o.k).map(String),
          L("n = how many times a year interest is added.", "n = hoeveel keer per jaar rente bygetel word.")),
        mcStep(L("Pick the correct set-up.", "Kies die korrekte opstelling."),
          L(`1 + i_eff = ${pow(`(1 + ${C(toFrac(nom))}/${o.k})`, o.k)}`, `1 + i_eff = ${pow(`(1 + ${C(toFrac(nom))}/${o.k})`, o.k)}`),
          [
            L(`1 + i_eff = ${pow(`(1 + ${C(toFrac(nom))} × ${o.k})`, o.k)}`, `1 + i_eff = ${pow(`(1 + ${C(toFrac(nom))} × ${o.k})`, o.k)}`),
            L(`1 + i_eff = ${pow(`(1 + ${C(toFrac(nom))})`, o.k)}`, `1 + i_eff = ${pow(`(1 + ${C(toFrac(nom))})`, o.k)}`),
            L(`i_eff = ${C(toFrac(nom))}/${o.k} × ${o.k}`, `i_eff = ${C(toFrac(nom))}/${o.k} × ${o.k}`),
          ],
          L("Divide the nominal rate by n INSIDE the bracket, power n outside.", "Deel die nominale koers deur n BINNE die hakie, mag n buite.")),
        calcStep(L("Now the effective rate, as a %, 2 decimals.", "Nou die effektiewe koers, as 'n %, 2 desimale plekke."), eff,
          L("Type the WHOLE right side in one go, subtract 1, × 100 — never round along the way.", "Tik die HELE regterkant in een slag in, trek 1 af, × 100: rond nooit tussenin af nie."),
          { dp: 2, tol: 0.001 }),
      ],
      expected: eff, dp: 2,
      hint: L(`Use 1 + i_eff = (1 + i_nom/n)ⁿ with n = ${o.k}, then × 100 for a %.`, `Gebruik 1 + i_eff = (1 + i_nom/n)ⁿ met n = ${o.k}, dan × 100 vir 'n %.`),
      answerLabel: L(`i_eff ≈ ${effC}%`, `i_eff ≈ ${effC}%`),
      solution: [
        { s: L(`1 + i_eff = ${pow(`(1 + ${C(toFrac(nom))}/${o.k})`, o.k)}`, `1 + i_eff = ${pow(`(1 + ${C(toFrac(nom))}/${o.k})`, o.k)}`), r: L(`n = ${o.k} because interest is added ${o.k} times a year`, `n = ${o.k} want rente word ${o.k} keer per jaar bygetel`) },
        { s: L(`i_eff = ${pow(`(1 + ${C(toFrac(nom))}/${o.k})`, o.k)} − 1`, `i_eff = ${pow(`(1 + ${C(toFrac(nom))}/${o.k})`, o.k)} − 1`) },
        { s: L(`i_eff ≈ ${effC}%`, `i_eff ≈ ${effC}%`), r: L("× 100 to write it as a percentage", "× 100 om dit as 'n persentasie te skryf") },
      ],
    };
  },
};

export const questF7 = {
  id: "f7",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CL, gen })),
};
