/* ============================================================
   FINANCE QUEST 1 · Words & formulas
   Theory recall: what the symbols mean, % → i, and which formula
   fits which situation. All multiple-choice; options shuffle.
   ============================================================ */
import { mc, mcNum, C } from "./_shared.js";
import { randInt, pick } from "../ui.js";
import { toFrac } from "../finlib.js";
import { L } from "../lang.js";

const CL = "finFormulas";

const SKILLS = {
  symP: () => mc(CL,
    L("In <b>A = P(1 + i)ⁿ</b>, what does <b>P</b> stand for?", "In <b>A = P(1 + i)ⁿ</b>, waarvoor staan <b>P</b>?"),
    L("The starting (principal) amount", "Die beginbedrag (hoofsom)"),
    [L("The end amount", "Die eindbedrag"), L("The interest rate", "Die rentekoers"), L("The number of years", "Die aantal jare")],
    { hint: L("P is where the money starts; A is where it ends up.", "P is waar die geld begin; A is waar dit eindig."), answerLabel: L("P = the principal (starting) amount", "P = die hoofsom (beginbedrag)") }),

  symA: () => mc(CL,
    L("In <b>A = P(1 + i)ⁿ</b>, what does <b>A</b> stand for?", "In <b>A = P(1 + i)ⁿ</b>, waarvoor staan <b>A</b>?"),
    L("The accumulated (end) amount", "Die opgehoopte bedrag (eindbedrag)"),
    [L("The starting amount", "Die beginbedrag"), L("The annual rate", "Die jaarlikse koers"), L("The number of payments", "Die aantal paaiemente")],
    { hint: L("A is the amount you end with after the interest has been added.", "A is die bedrag waarmee jy eindig nadat die rente bygetel is.") }),

  pctToFrac: () => {
    const p = pick([6, 7.5, 8, 9.5, 12, 15]);
    const i = toFrac(p);
    return {
      type: "mc", concept: CL,
      prompt: L(`Written as the value of <b>i</b> used in the formula, ${C(p)}% is…`, `As die waarde van <b>i</b> in die formule geskryf, is ${C(p)}%…`),
      options: mcNum(i, [p, i * 10, i / 10]),
      answerLabel: `${C(p)}% = ${C(i)}`,
      hint: L("Turn a percentage into i by dividing by 100.", "Deel 'n persentasie deur 100 om i te kry."),
      solution: [{ s: `${C(p)} ÷ 100 = ${C(i)}` }],
    };
  },

  whichSimple: () => mc(CL,
    L("Which situation uses <b>simple</b> interest?", "Watter situasie gebruik <b>enkelvoudige</b> rente?"),
    L("A hire-purchase agreement", "'n Huurkoopooreenkoms"),
    [L("Money growing in a savings account", "Geld wat in 'n spaarrekening groei"), L("Inflation on food prices", "Inflasie op voedselpryse"), L("A population growing each year", "'n Bevolking wat elke jaar groei")],
    { hint: L("Simple interest is the hire-purchase one.", "Enkelvoudige rente hoort by huurkoop."), answerLabel: L("Hire purchase → simple interest", "Huurkoop → enkelvoudige rente") }),

  whichCompoundScenario: () => mc(CL,
    L("Which of these is worked out with <b>compound</b> interest?", "Watter een hiervan word met <b>saamgestelde</b> rente bereken?"),
    L("Money growing in a savings account", "Geld wat in 'n spaarrekening groei"),
    [L("A hire-purchase agreement", "'n Huurkoopooreenkoms"), L("A once-off deposit paid upfront", "'n Eenmalige deposito wat vooraf betaal word"), L("An asset losing the same rand amount each year", "'n Bate wat elke jaar dieselfde randbedrag verloor")],
    { hint: L("Savings, inflation and population growth all use compound interest.", "Spaargeld, inflasie en bevolkingsgroei gebruik almal saamgestelde rente.") }),

  pickCompoundFormula: () => mc(CL,
    L("Which formula gives the value of a <b>savings</b> account after n years?", "Watter formule gee die waarde van 'n <b>spaarrekening</b> ná n jaar?"),
    L("A = P(1 + i)ⁿ", "A = P(1 + i)ⁿ"),
    [L("A = P(1 + i·n)", "A = P(1 + i·n)"), L("A = P(1 − i)ⁿ", "A = P(1 − i)ⁿ"), L("A = P(1 − i·n)", "A = P(1 − i·n)")],
    { hint: L("Savings grow by compound interest.", "Spaargeld groei met saamgestelde rente."), answerLabel: L("A = P(1 + i)ⁿ (compound interest)", "A = P(1 + i)ⁿ (saamgestelde rente)") }),

  whatN: () => mc(CL,
    L("In this chapter, what does <b>n</b> count?", "Wat tel <b>n</b> in hierdie hoofstuk?"),
    L("The number of compounding periods", "Die aantal samestellingsperiodes"),
    [L("The number of payments", "Die aantal paaiemente"), L("The interest rate", "Die rentekoers"), L("The number of rand", "Die aantal rand")],
    { hint: L("n is how many times interest is added over the whole term.", "n is hoeveel keer rente oor die hele termyn bygetel word.") }),

  inflationType: () => mc(CL,
    L("Inflation is treated as which kind of interest?", "As watter soort rente word inflasie hanteer?"),
    L("Compound interest, compounded yearly", "Saamgestelde rente, jaarliks saamgestel"),
    [L("Simple interest", "Enkelvoudige rente"), L("Reducing-balance depreciation", "Verminderde-saldo-waardevermindering"), L("It earns no interest", "Dit verdien geen rente nie")],
    { hint: L("Prices grow on the new price each year — that is compound growth.", "Pryse groei elke jaar op die nuwe prys: dit is saamgestelde groei.") }),
};

export const questF1 = {
  id: "f1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CL, gen })),
};
