/* ============================================================
   FINANCE QUEST 2 · Simple, compound & depreciation
   The conceptual differences (interest on the original vs the
   growing balance) and the two depreciation methods + graph shapes.
   ============================================================ */
import { mc } from "./_shared.js";
import { L } from "../lang.js";

const SIM = "simpleCompound";
const DEP = "depreciation";

const SKILLS = {
  simpleBase: () => mc(SIM,
    L("<b>Simple</b> interest is calculated on…", "<b>Enkelvoudige</b> rente word bereken op…"),
    L("the original amount P only", "net die oorspronklike bedrag P"),
    [L("the growing balance each period", "die groeiende saldo elke periode"), L("the interest earned so far", "die rente wat tot dusver verdien is"), L("the final amount A", "die eindbedrag A")],
    { hint: L("Simple interest uses the same P every period, so the interest never changes.", "Enkelvoudige rente gebruik elke periode dieselfde P, so die rente verander nooit."), answerLabel: L("Simple interest is on the original P only", "Enkelvoudige rente is net op die oorspronklike P") }),

  compoundBase: () => mc(SIM,
    L("<b>Compound</b> interest is calculated on…", "<b>Saamgestelde</b> rente word bereken op…"),
    L("the growing balance each period", "die groeiende saldo elke periode"),
    [L("the original P only", "net die oorspronklike P"), L("the deposit only", "net die deposito"), L("the number of years", "die aantal jare")],
    { hint: L("Compound interest earns “interest on interest”.", "Saamgestelde rente verdien “rente op rente”.") }),

  growsFaster: () => mc(SIM,
    L("On the same P and rate over many years, which earns <b>more</b>?", "Met dieselfde P en koers oor baie jare, watter een verdien <b>meer</b>?"),
    L("Compound interest", "Saamgestelde rente"),
    [L("Simple interest", "Enkelvoudige rente"), L("They are always exactly equal", "Hulle is altyd presies gelyk"), L("Whichever has the larger n only", "Net die een met die groter n")],
    { hint: L("Earning interest on interest pulls ahead over time.", "Rente op rente trek mettertyd weg."), answerLabel: L("Compound interest grows faster", "Saamgestelde rente groei vinniger") }),

  reducingWhich: () => mc(DEP,
    L("A car loses <b>15% of its current value</b> each year. Which method is this?", "'n Motor verloor elke jaar <b>15% van sy huidige waarde</b>. Watter metode is dit?"),
    L("Reducing-balance:  A = P(1 − i)ⁿ", "Verminderde saldo:  A = P(1 − i)ⁿ"),
    [L("Linear:  A = P(1 − i·n)", "Lineêr:  A = P(1 − i·n)"), L("Compound growth:  A = P(1 + i)ⁿ", "Saamgestelde groei:  A = P(1 + i)ⁿ"), L("Simple interest:  A = P(1 + i·n)", "Enkelvoudige rente:  A = P(1 + i·n)")],
    { hint: L("“Percentage of its current value” → reducing-balance.", "“Persentasie van sy huidige waarde” → verminderde saldo.") }),

  linearWhich: () => mc(DEP,
    L("An asset loses the <b>same rand amount</b> every year. Which method is this?", "'n Bate verloor elke jaar <b>dieselfde randbedrag</b>. Watter metode is dit?"),
    L("Linear (straight-line):  A = P(1 − i·n)", "Lineêr (reguitlyn):  A = P(1 − i·n)"),
    [L("Reducing-balance:  A = P(1 − i)ⁿ", "Verminderde saldo:  A = P(1 − i)ⁿ"), L("Compound growth", "Saamgestelde groei"), L("Effective interest", "Effektiewe rente")],
    { hint: L("Equal rand amounts each year → a straight line → linear method.", "Gelyke randbedrae elke jaar → 'n reguit lyn → lineêre metode.") }),

  reducingGraph: () => mc(DEP,
    L("On a value-vs-time graph, <b>reducing-balance</b> depreciation looks like…", "Op 'n waarde-teenoor-tyd-grafiek lyk <b>verminderde-saldo</b>-waardevermindering soos…"),
    L("a curve that drops steeply, then flattens", "'n kurwe wat steil daal en dan platter word"),
    [L("a straight line sloping down", "'n reguit lyn wat afwaarts loop"), L("a straight line sloping up", "'n reguit lyn wat opwaarts loop"), L("an S-shaped curve that rises", "'n S-vormige kurwe wat styg")],
    { hint: L("Losing a % of a shrinking value means smaller drops each year — a flattening curve.", "As jy 'n % van 'n krimpende waarde verloor, is die dalings elke jaar kleiner: 'n kurwe wat platter word.") }),

  linearGraph: () => mc(DEP,
    L("On a value-vs-time graph, <b>linear</b> depreciation looks like…", "Op 'n waarde-teenoor-tyd-grafiek lyk <b>lineêre</b> waardevermindering soos…"),
    L("a straight line sloping down", "'n reguit lyn wat afwaarts loop"),
    [L("a curve that flattens out", "'n kurwe wat afplat"), L("a horizontal line", "'n horisontale lyn"), L("a rising curve", "'n stygende kurwe")],
    { hint: L("The same drop every year plots as a straight line.", "Dieselfde daling elke jaar gee 'n reguit lyn.") }),

  depMeaning: () => mc(DEP,
    L("Depreciation means…", "Waardevermindering beteken…"),
    L("something loses value over time", "iets verloor mettertyd waarde"),
    [L("something gains value over time", "iets win mettertyd waarde"), L("interest is added twice a year", "rente word twee keer per jaar bygetel"), L("a deposit is paid upfront", "'n deposito word vooraf betaal")],
    { hint: L("Cars, phones and machines depreciate — they are worth less as time passes.", "Motors, fone en masjiene verminder in waarde: hulle is minder werd soos die tyd verbygaan.") }),
};

export const questF2 = {
  id: "f2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id.startsWith("reducing") || id.startsWith("linear") || id.startsWith("dep") ? DEP : SIM, gen })),
};
