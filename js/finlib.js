/* ============================================================
   FINANCE LIBRARY — the maths, computed (so answer keys are never
   hand-typed and can't disagree with the question). SA conventions:
   comma decimal, spaces as thousands separators, Rand prefix.
   Rates `i` are fractions (percentage ÷ 100).
   ============================================================ */

export const toFrac = pct => pct / 100;

/* core formulas */
export const simpleAmount    = (P, i, n) => P * (1 + i * n);     // hire purchase
export const compoundAmount  = (P, i, n) => P * Math.pow(1 + i, n); // inflation / savings / growth
export const deprLinear      = (P, i, n) => P * (1 - i * n);     // straight-line depreciation
export const deprReducing    = (P, i, n) => P * Math.pow(1 - i, n); // reducing-balance depreciation

/* deposits (loan / hire-purchase). pctFrac is the deposit % as a fraction. */
export const depositAmount     = (pctFrac, price) => pctFrac * price;
export const balanceAfterDeposit = (pctFrac, price) => (1 - pctFrac) * price;

/* different compounding periods */
export const ratePerPeriod = (annualFrac, k) => annualFrac / k;  // i ÷ times-per-year
export const periodCount   = (years, k) => years * k;            // n × times-per-year

/* time value of money: move an amount `steps` periods (signed: + forward, − back) */
export const moveMoney = (amount, i, steps) => amount * Math.pow(1 + i, steps);

/* effective rate from a nominal rate compounded k times a year */
export const effFromNom = (inomFrac, k) => Math.pow(1 + inomFrac / k, k) - 1;

/* the compounding options the chapter uses */
export const COMPOUNDING = [
  { key: "annually",  label: "annually",                    adj: "annual",       k: 1 },
  { key: "semi",      label: "semi-annually (half-yearly)", adj: "half-yearly",  k: 2 },
  { key: "quarterly", label: "quarterly",                   adj: "quarterly",    k: 4 },
  { key: "monthly",   label: "monthly",                     adj: "monthly",      k: 12 },
  { key: "weekly",    label: "weekly",                      adj: "weekly",       k: 52 },
  { key: "daily",     label: "daily",                       adj: "daily",        k: 365 },
];

/* ---------- formatting ---------- */

/* Rand amount: R1 000,50  (spaces thousands, comma decimal). dp default 2. */
export function rand(v, dp = 2) {
  if (v == null || Number.isNaN(v)) return "";
  const neg = v < 0, x = Math.abs(v);
  const s = (dp == null) ? String(Math.round(x * 100) / 100) : x.toFixed(dp);
  let [int, dec] = s.split(".");
  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, " ");          // space thousands
  return (neg ? "-R" : "R") + int + (dec != null ? "," + dec : "");
}

/* a percentage with a comma decimal: 12,5% */
export function pct(v, dp = null) {
  const s = (dp == null) ? String(Math.round(v * 1000) / 1000) : v.toFixed(dp);
  return s.replace(".", ",") + "%";
}
