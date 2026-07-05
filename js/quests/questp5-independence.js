/* ============================================================
   PROBABILITY QUEST 5 · Independent events
   The product rule P(A ∩ B) = P(A) × P(B), the test for
   independence, and contingency tables. Tables are generated so
   the independence verdict is exact (cells built from the totals).
   ============================================================ */
import { mc } from "./_shared.js";
import { pick, randInt } from "../ui.js";
import { dec, frac } from "../problib.js";

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
    { rows: ["Male", "Female"], cols: ["Older than 40", "Younger than 40"], rL: "male", cL: "older than 40", rSym: "M", cSym: "O" },
    { rows: ["Walks", "Drives"], cols: ["Junior", "Senior"], rL: "walks", cL: "junior", rSym: "W", cSym: "J" },
    { rows: ["Wears glasses", "No glasses"], cols: ["Left-handed", "Right-handed"], rL: "wears glasses", cL: "left-handed", rSym: "G", cSym: "L" },
  ]);
  return { grand, R0, R1: grand - R0, C0, C1: grand - C0, c00, c01, c10, c11, ctx,
    realInter: c00 / grand, prodInter: (R0 / grand) * (C0 / grand), independent: indep };
}

function tableHTML(t) {
  const x = t.ctx;
  return `<table class="q-table">
    <tr><th></th><th>${x.cols[0]}</th><th>${x.cols[1]}</th><th>Total</th></tr>
    <tr><td>${x.rows[0]}</td><td>${t.c00}</td><td>${t.c01}</td><td>${t.R0}</td></tr>
    <tr><td>${x.rows[1]}</td><td>${t.c10}</td><td>${t.c11}</td><td>${t.R1}</td></tr>
    <tr><td>Total</td><td>${t.C0}</td><td>${t.C1}</td><td>${t.grand}</td></tr>
  </table>`;
}

const SKILLS = {
  defTest: () => mc(IND,
    "What is the <b>test</b> for whether two events A and B are independent?",
    "check whether P(A ∩ B) = P(A) × P(B)",
    ["check whether P(A ∩ B) = 0", "check whether P(A) + P(B) = 1", "check whether P(A ∪ B) = P(A) × P(B)"],
    { hint: "Independent events multiply.",
      answerLabel: "Independent ⇔ P(A ∩ B) = P(A) × P(B)." }),

  productRule: () => {
    const [pA, pB] = pick(PAIRS);
    return {
      type: "calc", concept: IND, dp: 2,
      prompt: `A and B are <b>independent</b> with P(A) = <b>${dec(pA)}</b> and P(B) = <b>${dec(pB)}</b>. Find <b>P(A ∩ B)</b>.`,
      expected: pA * pB,
      hint: "Independent → multiply: P(A ∩ B) = P(A) × P(B).",
      answerLabel: `${dec(pA)} × ${dec(pB)} = ${dec(pA * pB, 2)}`,
      solution: [{ s: `P(A ∩ B) = P(A) × P(B) = ${dec(pA)} × ${dec(pB)} = ${dec(pA * pB, 2)}` }],
    };
  },

  isIndependent: () => {
    const [pA, pB] = pick(PAIRS);
    const prod = pA * pB;
    const indep = pick([true, false]);
    const pAB = indep ? prod : Math.max(0.1, Math.min(pA, pB, prod + pick([0.1, -0.1])));
    return {
      type: "yesno", concept: IND,
      prompt: `P(A) = <b>${dec(pA)}</b>, P(B) = <b>${dec(pB)}</b> and P(A ∩ B) = <b>${dec(pAB)}</b>. Are A and B independent?`,
      yes: Math.abs(pAB - prod) < 1e-9,
      hint: `Work out P(A) × P(B) = ${dec(prod, 2)} and compare it with P(A ∩ B).`,
      answerLabel: `P(A) × P(B) = ${dec(prod, 2)}; P(A ∩ B) = ${dec(pAB)} → ${Math.abs(pAB - prod) < 1e-9 ? "equal, so independent" : "not equal, so NOT independent"}.`,
      solution: [{ s: `P(A) × P(B) = ${dec(pA)} × ${dec(pB)} = ${dec(prod, 2)}` }, { s: `Compare with P(A ∩ B) = ${dec(pAB)} → ${Math.abs(pAB - prod) < 1e-9 ? "independent" : "not independent"}.` }],
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
      `${tableHTML(t)}One person is chosen at random. Write <b>P(${x.rL})</b> as a fraction in simplest form.`,
      f.str, wrongs,
      { hint: `P(${x.rL}) = that row's total ÷ the grand total.`,
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
      `${tableHTML(t)}Write <b>P(${x.rL} and ${x.cL})</b> as a fraction in simplest form.`,
      f.str, wrongs,
      { hint: "Use the single overlap cell ÷ the grand total.",
        answerLabel: `${t.c00}/${t.grand} = ${f.str}` });
  },

  tableIndependent: () => {
    const t = table(pick([true, false]));
    const x = t.ctx;
    return {
      type: "yesno", concept: TAB,
      prompt: `${tableHTML(t)}Let ${x.rSym} = "${x.rL}" and ${x.cSym} = "${x.cL}". Are ${x.rSym} and ${x.cSym} <b>independent</b>?`,
      yes: t.independent,
      hint: `Compare P(${x.rSym}) × P(${x.cSym}) with P(${x.rSym} ∩ ${x.cSym}) = ${t.c00}/${t.grand}.`,
      answerLabel: `P(${x.rSym})×P(${x.cSym}) = ${dec(t.prodInter, 4).replace(/0+$/, "")} and P(${x.rSym} ∩ ${x.cSym}) = ${dec(t.realInter, 4).replace(/0+$/, "")} → ${t.independent ? "equal, so independent" : "not equal, so NOT independent"}.`,
      solution: [
        { s: `P(${x.rSym}) = ${t.R0}/${t.grand}, P(${x.cSym}) = ${t.C0}/${t.grand} → product = ${dec(t.prodInter, 4).replace(/0+$/, "")}` },
        { s: `P(${x.rSym} ∩ ${x.cSym}) = ${t.c00}/${t.grand} = ${dec(t.realInter, 4).replace(/0+$/, "")}` },
        { s: `${t.independent ? "Equal → independent." : "Not equal → not independent."}` },
      ],
    };
  },

  notIndependentMeaning: () => mc(IND,
    "If P(A ∩ B) is <b>not equal</b> to P(A) × P(B), what can you say?",
    "A and B are not independent",
    ["A and B are mutually exclusive", "A and B are complementary", "A and B are exhaustive"],
    { hint: "The product rule only holds when events are independent.",
      answerLabel: "Product rule fails → the events are not independent." }),
};

export const questP5 = {
  id: "p5",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id.startsWith("table") ? TAB : IND, gen })),
};
