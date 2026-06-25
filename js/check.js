/* ============================================================
   ANSWER CHECKING + SA number formatting
   ------------------------------------------------------------
   Decimal comma everywhere. A typed calculation answer matches
   when it equals the expected value rounded to the question's
   stated decimal places, within a small tolerance — so a legit
   rounding step never fails, and trailing zeros are equal
   (8,2 === 8,20 numerically). Graph read-offs accept a band.
   ============================================================ */
import { TOL } from "./config.js";

/* "8,2" or "8.2" -> 8.2 ; "" / "-" / "," -> NaN */
export function parseNum(str) {
  if (str == null) return NaN;
  const cleaned = String(str).trim().replace(",", ".");
  if (cleaned === "" || cleaned === "-" || cleaned === ".") return NaN;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

/* format a number with a comma decimal; dp = forced decimal places (optional) */
export function fmtComma(n, dp = null) {
  if (n == null || Number.isNaN(n)) return "";
  const s = (dp == null) ? String(Math.round(n * 1e6) / 1e6) : Number(n).toFixed(dp);
  return s.replace(".", ",");
}

/* round to dp decimal places (half away from zero, the school convention) */
export function roundTo(n, dp = 0) {
  const f = Math.pow(10, dp);
  return Math.sign(n) * Math.round(Math.abs(n) * f) / f;
}

/* Is a typed answer correct?
   q.dp  = decimal places the answer is given to (default 0)
   q.tol = absolute tolerance band (default: graphRead for graph reads, else a
           small epsilon at the stated dp). */
export function answerCorrect(given, expected, q = {}) {
  if (!Number.isFinite(given)) return false;
  const dp = q.dp ?? 0;
  const tol = (q.tol != null) ? q.tol : TOL.calcEps;
  // compare the learner's value (rounded to dp) against the expected (rounded to dp)
  const g = roundTo(given, dp), e = roundTo(expected, dp);
  return Math.abs(g - e) <= tol + 1e-9;
}
