/* ============================================================
   PROBABILITY QUEST 5 · Independent events
   The product rule P(A ∩ B) = P(A) × P(B), the test for
   independence, and contingency tables. Tables are generated so
   the independence verdict is exact (cells built from the totals).
   ============================================================ */
import { mc } from "./_shared.js";
import { pick, randInt } from "../ui.js";
import { dec, frac } from "../problib.js";
import { L } from "../lang.js";

const IND = "independence";
const TAB = "contingency";

/* nice probability pairs whose product is a tidy 2-dp decimal */
const PAIRS = [[0.5, 0.4], [0.5, 0.6], [0.2, 0.5], [0.4, 0.5], [0.25, 0.4], [0.5, 0.2], [0.3, 0.5]];

/* a 2×2 contingency table, grand total 100, built so independence is exact.
   indep=true → cells fit P(row)×P(col); false → one cell nudged to break it. */
function table(indep) {
  const grand = 100;
  const R0 = pick([30, 40, 50, 60, 70]);          // row-0 total
  const C0 = pick([30, 40, 50, 60]);              // col-0 total
  let c00 = (R0 * C0) / grand;                     // integer (multiples of 10)
  if (!indep) {
    const d = pick([5, 10, -5, -10]);
    if (c00 + d >= 1 && R0 - (c00 + d) >= 1 && C0 - (c00 + d) >= 1 && grand - R0 - C0 + (c00 + d) >= 1) c00 += d;
    else c00 += 5;
  }
  const c01 = R0 - c00, c10 = C0 - c00, c11 = grand - R0 - C0 + c00;
  const ctx = pick([
    { rows: [L("Male", "Manlik"), L("Female", "Vroulik")], cols: [L("Older than 40", "Ouer as 40"), L("Younger than 40", "Jonger as 40")], rL: L("male", "manlik"), cL: L("older than 40", "ouer as 40"), rSym: L("M", "M"), cSym: L("O", "O") },
    { rows: [L("Walks", "Stap"), L("Drives", "Ry motor")], cols: [L("Junior", "Junior"), L("Senior", "Senior")], rL: L("walks", "stap"), cL: L("junior", "junior"), rSym: L("W", "W"), cSym: L("J", "J") },
    { rows: [L("Wears glasses", "Dra 'n bril"), L("No glasses", "Geen bril")], cols: [L("Left-handed", "Linkshandig"), L("Right-handed", "Regshandig")], rL: L("wears glasses", "dra 'n bril"), cL: L("left-handed", "linkshandig"), rSym: L("G", "G"), cSym: L("L", "L") },
  ]);
  return { grand, R0, R1: grand - R0, C0, C1: grand - C0, c00, c01, c10, c11, ctx,
    realInter: c00 / grand, prodInter: (R0 / grand) * (C0 / grand), independent: indep };
}

function tableHTML(t) {
  const x = t.ctx;
  return L(`<table class="q-table">
    <tr><th></th><th>${x.cols[0]}</th><th>${x.cols[1]}</th><th>Total</th></tr>
    <tr><td>${x.rows[0]}</td><td>${t.c00}</td><td>${t.c01}</td><td>${t.R0}</td></tr>
    <tr><td>${x.rows[1]}</td><td>${t.c10}</td><td>${t.c11}</td><td>${t.R1}</td></tr>
    <tr><td>Total</td><td>${t.C0}</td><td>${t.C1}</td><td>${t.grand}</td></tr>
  </table>`, `<table class="q-table">
    <tr><th></th><th>${x.cols[0]}</th><th>${x.cols[1]}</th><th>Totaal</th></tr>
    <tr><td>${x.rows[0]}</td><td>${t.c00}</td><td>${t.c01}</td><td>${t.R0}</td></tr>
    <tr><td>${x.rows[1]}</td><td>${t.c10}</td><td>${t.c11}</td><td>${t.R1}</td></tr>
    <tr><td>Totaal</td><td>${t.C0}</td><td>${t.C1}</td><td>${t.grand}</td></tr>
  </table>`);
}

const SKILLS = {
  defTest: () => mc(IND,
    L("What is the <b>test</b> for whether two events A and B are independent?", "Wat is die <b>toets</b> of twee gebeurtenisse A en B onafhanklik is?"),
    L("check whether P(A ∩ B) = P(A) × P(B)", "kyk of P(A ∩ B) = P(A) × P(B)"),
    [L("check whether P(A ∩ B) = 0", "kyk of P(A ∩ B) = 0"), L("check whether P(A) + P(B) = 1", "kyk of P(A) + P(B) = 1"), L("check whether P(A ∪ B) = P(A) × P(B)", "kyk of P(A ∪ B) = P(A) × P(B)")],
    { hint: L("Independent events multiply.", "Onafhanklike gebeurtenisse vermenigvuldig."),
      answerLabel: L("Independent ⇔ P(A ∩ B) = P(A) × P(B).", "Onafhanklik ⇔ P(A ∩ B) = P(A) × P(B).") }),

  productRule: () => {
    const [pA, pB] = pick(PAIRS);
    return {
      type: "calc", concept: IND, dp: 2,
      prompt: L(`A and B are <b>independent</b> with P(A) = <b>${dec(pA)}</b> and P(B) = <b>${dec(pB)}</b>. Find <b>P(A ∩ B)</b>.`, `A en B is <b>onafhanklik</b> met P(A) = <b>${dec(pA)}</b> en P(B) = <b>${dec(pB)}</b>. Vind <b>P(A ∩ B)</b>.`),
      expected: pA * pB,
      hint: L("Independent → multiply: P(A ∩ B) = P(A) × P(B).", "Onafhanklik → vermenigvuldig: P(A ∩ B) = P(A) × P(B)."),
      answerLabel: `${dec(pA)} × ${dec(pB)} = ${dec(pA * pB, 2)}`,
      solution: [{ s: L(`P(A ∩ B) = P(A) × P(B) = ${dec(pA)} × ${dec(pB)} = ${dec(pA * pB, 2)}`, `P(A ∩ B) = P(A) × P(B) = ${dec(pA)} × ${dec(pB)} = ${dec(pA * pB, 2)}`) }],
    };
  },

  isIndependent: () => {
    const [pA, pB] = pick(PAIRS);
    const prod = pA * pB;
    const indep = pick([true, false]);
    const pAB = indep ? prod : Math.max(0.1, Math.min(pA, pB, prod + pick([0.1, -0.1])));
    return {
      type: "yesno", concept: IND,
      prompt: L(`P(A) = <b>${dec(pA)}</b>, P(B) = <b>${dec(pB)}</b> and P(A ∩ B) = <b>${dec(pAB)}</b>. Are A and B independent?`, `P(A) = <b>${dec(pA)}</b>, P(B) = <b>${dec(pB)}</b> en P(A ∩ B) = <b>${dec(pAB)}</b>. Is A en B onafhanklik?`),
      yes: Math.abs(pAB - prod) < 1e-9,
      hint: L(`Work out P(A) × P(B) = ${dec(prod, 2)} and compare it with P(A ∩ B).`, `Werk P(A) × P(B) = ${dec(prod, 2)} uit en vergelyk dit met P(A ∩ B).`),
      answerLabel: L(`P(A) × P(B) = ${dec(prod, 2)}; P(A ∩ B) = ${dec(pAB)} → ${Math.abs(pAB - prod) < 1e-9 ? "equal, so independent" : "not equal, so NOT independent"}.`, `P(A) × P(B) = ${dec(prod, 2)}; P(A ∩ B) = ${dec(pAB)} → ${Math.abs(pAB - prod) < 1e-9 ? "gelyk, dus onafhanklik" : "nie gelyk nie, dus NIE onafhanklik nie"}.`),
      solution: [{ s: L(`P(A) × P(B) = ${dec(pA)} × ${dec(pB)} = ${dec(prod, 2)}`, `P(A) × P(B) = ${dec(pA)} × ${dec(pB)} = ${dec(prod, 2)}`) }, { s: L(`Compare with P(A ∩ B) = ${dec(pAB)} → ${Math.abs(pAB - prod) < 1e-9 ? "independent" : "not independent"}.`, `Vergelyk met P(A ∩ B) = ${dec(pAB)} → ${Math.abs(pAB - prod) < 1e-9 ? "onafhanklik" : "nie onafhanklik nie"}.`) }],
    };
  },

  tableReadFeature: () => {
    const t = table(pick([true, false]));
    const x = t.ctx;
    const f = frac(t.R0, t.grand);
    // decoys by VALUE-filter so none can equal the answer, topped up to three
    const cands = [
      frac(t.C0, t.grand),                                  // read a column instead of the row
      frac(t.c00, t.grand),                                 // used the overlap cell only
      { str: `${t.grand}/${t.R0}`, val: t.grand / t.R0 },   // inverted
      frac(t.R0, t.grand - t.R0),                           // part-to-part, not part-to-whole
    ];
    const seen = new Set([f.str]); const wrongs = [];
    for (const c of cands) {
      if (Math.abs(c.val - f.val) < 1e-9 || seen.has(c.str)) continue;
      seen.add(c.str); wrongs.push(c.str);
      if (wrongs.length === 3) break;
    }
    return mc(TAB,
      L(`${tableHTML(t)}One person is chosen at random. Write <b>P(${x.rL})</b> as a fraction in simplest form.`, `${tableHTML(t)}Een persoon word lukraak gekies. Skryf <b>P(${x.rL})</b> as 'n breuk in eenvoudigste vorm.`),
      f.str, wrongs,
      { hint: L(`P(${x.rL}) = that row's total ÷ the grand total.`, `P(${x.rL}) = daardie ry se totaal ÷ die groottotaal.`),
        answerLabel: `${t.R0}/${t.grand} = ${f.str}` });
  },

  tableReadOverlap: () => {
    const t = table(pick([true, false]));
    const x = t.ctx;
    const f = frac(t.c00, t.grand);
    const cands = [
      frac(t.R0, t.grand),                                  // whole row instead of the one cell
      frac(t.C0, t.grand),                                  // whole column
      frac(t.c00, t.R0),                                    // divided by the row total, not the grand total
      frac(t.R0 + t.C0 - t.c00, t.grand),                   // found "or" instead of "and"
      frac(t.c00, t.grand - t.c00),                         // part-to-part
    ];
    const seen = new Set([f.str]); const wrongs = [];
    for (const c of cands) {
      if (Math.abs(c.val - f.val) < 1e-9 || seen.has(c.str)) continue;
      seen.add(c.str); wrongs.push(c.str);
      if (wrongs.length === 3) break;
    }
    return mc(TAB,
      L(`${tableHTML(t)}Write <b>P(${x.rL} and ${x.cL})</b> as a fraction in simplest form.`, `${tableHTML(t)}Skryf <b>P(${x.rL} en ${x.cL})</b> as 'n breuk in eenvoudigste vorm.`),
      f.str, wrongs,
      { hint: L("Use the single overlap cell ÷ the grand total.", "Gebruik die een sel waar hulle oorvleuel ÷ die groottotaal."),
        answerLabel: `${t.c00}/${t.grand} = ${f.str}` });
  },

  tableIndependent: () => {
    const t = table(pick([true, false]));
    const x = t.ctx;
    return {
      type: "yesno", concept: TAB,
      prompt: L(`${tableHTML(t)}Let ${x.rSym} = "${x.rL}" and ${x.cSym} = "${x.cL}". Are ${x.rSym} and ${x.cSym} <b>independent</b>?`, `${tableHTML(t)}Stel ${x.rSym} = "${x.rL}" en ${x.cSym} = "${x.cL}". Is ${x.rSym} en ${x.cSym} <b>onafhanklik</b>?`),
      yes: t.independent,
      hint: L(`Compare P(${x.rSym}) × P(${x.cSym}) with P(${x.rSym} ∩ ${x.cSym}) = ${t.c00}/${t.grand}.`, `Vergelyk P(${x.rSym}) × P(${x.cSym}) met P(${x.rSym} ∩ ${x.cSym}) = ${t.c00}/${t.grand}.`),
      answerLabel: L(`P(${x.rSym})×P(${x.cSym}) = ${dec(t.prodInter, 4).replace(/0+$/, "")} and P(${x.rSym} ∩ ${x.cSym}) = ${dec(t.realInter, 4).replace(/0+$/, "")} → ${t.independent ? "equal, so independent" : "not equal, so NOT independent"}.`, `P(${x.rSym})×P(${x.cSym}) = ${dec(t.prodInter, 4).replace(/0+$/, "")} en P(${x.rSym} ∩ ${x.cSym}) = ${dec(t.realInter, 4).replace(/0+$/, "")} → ${t.independent ? "gelyk, dus onafhanklik" : "nie gelyk nie, dus NIE onafhanklik nie"}.`),
      solution: [
        { s: L(`P(${x.rSym}) = ${t.R0}/${t.grand}, P(${x.cSym}) = ${t.C0}/${t.grand} → product = ${dec(t.prodInter, 4).replace(/0+$/, "")}`, `P(${x.rSym}) = ${t.R0}/${t.grand}, P(${x.cSym}) = ${t.C0}/${t.grand} → produk = ${dec(t.prodInter, 4).replace(/0+$/, "")}`) },
        { s: L(`P(${x.rSym} ∩ ${x.cSym}) = ${t.c00}/${t.grand} = ${dec(t.realInter, 4).replace(/0+$/, "")}`, `P(${x.rSym} ∩ ${x.cSym}) = ${t.c00}/${t.grand} = ${dec(t.realInter, 4).replace(/0+$/, "")}`) },
        { s: `${t.independent ? L("Equal → independent.", "Gelyk → onafhanklik.") : L("Not equal → not independent.", "Nie gelyk nie → nie onafhanklik nie.")}` },
      ],
    };
  },

  notIndependentMeaning: () => mc(IND,
    L("If P(A ∩ B) is <b>not equal</b> to P(A) × P(B), what can you say?", "As P(A ∩ B) <b>nie gelyk</b> is aan P(A) × P(B) nie, wat kan jy sê?"),
    L("A and B are not independent", "A en B is nie onafhanklik nie"),
    [L("A and B are mutually exclusive", "A en B is onderling uitsluitend"), L("A and B are complementary", "A en B is komplementêr"), L("A and B are exhaustive", "A en B is uitputtend")],
    { hint: L("The product rule only holds when events are independent.", "Die produkreël geld net as die gebeurtenisse onafhanklik is."),
      answerLabel: L("Product rule fails → the events are not independent.", "Produkreël geld nie → die gebeurtenisse is nie onafhanklik nie.") }),
};

export const questP5 = {
  id: "p5",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id.startsWith("table") ? TAB : IND, gen })),
};
