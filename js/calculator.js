/* ============================================================
   IN-APP CALCULATOR — Casio fx-991ZA Plus II (stats workflow +
   COMP-mode maths engine)
   ------------------------------------------------------------
   A faithful, interactive replica of the calculator's stats flow,
   built to the exact key sequences the class is taught:
     • clear:        SHIFT 9 → 3 (All) → =
     • frequency:    SHIFT MODE (SETUP) → ▼ → 4 (STAT) → 1 ON / 2 OFF
     • enter data:   MODE → 3 (STAT) → 1 (1-VAR), type values, AC
     • read a value: SHIFT 1 (STAT) → 4 (Var) → n/x̄/σx/sx, then =
                     SHIFT 1 (STAT) → 6 (MinMax) → minX/maxX/Q1/med/Q3, =
                     SHIFT 1 (STAT) → 3 (Sum)   → 1:Σx² / 2:Σx, then =
     • edit a value: SHIFT 1 (STAT) → 2 (Data) reopens the table; ▲▼ move
                     between rows, typing REPLACES that row, = stores it

   Every menu order above was re-checked key by key on Megan's real
   fx-991ZA PLUS II emulator on 2026-08-28, not recalled:
     STAT   1:Type 2:Data 3:Sum 4:Var 5:Distr 6:MinMax
     Sum    1:Σx²  2:Σx                  ← Σx is TWO
     Var    1:n    2:x̄   3:σx  4:sx
     MinMax 1:minX 2:maxX 3:Q1 4:med 5:Q3
   Results are computed from the entered data via statlib, so they
   are real. The COMP screen also has a real 2-D maths engine (round
   2) — fractions, roots, powers, trig — evaluated exact-first with
   a decimal fallback (see the engine section below).

   NOTE: Q1/med/Q3 deliberately use quartilesExclusive — the method
   the real fx-991ZA Plus II uses — so the on-screen device always
   agrees with the learner's calculator. Do NOT "fix" this to the
   school (n+1)/4 position method.
   ============================================================ */
import { el } from "./ui.js";
import { mean, stdDev, sortAsc, quartilesExclusive } from "./statlib.js";

/* ============================================================
   KEYPAD LAYOUT — full fx-991ZA Plus II face, transcribed from the
   real device (round 1 rebuild, 2026-08-27). Two CSS grids:
     FUNC_KEYS  — 6 columns × 5 rows (top row + 4 function rows),
                  with a round 4-way d-pad spanning cols 3–4, rows 1–2.
     NUM_KEYS   — 5 wider columns × 4 rows (the number block).
   Each entry: { id, row, col, label, shift, red, cls, dead }.
     label = main (white) legend, shift = gold SHIFT legend,
     red = red ALPHA legend, dead:true = renders + depresses like a
     real key but has NO click handler (no key uses it any more).
   Ids already routed by press()/compKey()/statKey()/menuKey() below
   are UNCHANGED (shift alpha up down left right mode on del ac
   d0-d9 dot mult div plus minus neg eq) — only their grid position
   moved. Round 2 wires: frac sqrt x2 pow sin cos tan lparen rparen
   sd ans.
   Calculator rebuild Build 1 (2026-10-04, CASIO-CALCULATOR-SPEC.md
   sections 1 and 2): EVERY key now has a handler, because ALPHA and
   SHIFT are one-shot on the device: "ALPHA then a key with no red
   letter: nothing is typed, ALPHA switches off". A key with no click
   handler could never switch them off. Keys whose own function is a
   later build (calc intdx xinv logbox log ln dms hyp eng exp10) do
   nothing on a plain press; rcl (RCL / SHIFT = STO) and mplus (M+ /
   SHIFT = M−) are live. CALC's red "=" and ∫'s red ":" were missing
   from the key faces and are added (spec §2).
   ============================================================ */
const FUNC_KEYS = [
  // top row
  { row: 1, col: 1, id: "shift", label: "SHIFT", cls: "k-shift" },
  { row: 1, col: 2, id: "alpha", label: "ALPHA", cls: "k-alpha" },
  { row: 1, col: 5, id: "mode", label: "MODE", shift: "SETUP", cls: "k-fn" },
  { row: 1, col: 6, id: "on", label: "ON", cls: "k-fn" },
  // function row 1 (flanks the d-pad)
  { row: 2, col: 1, id: "calc", label: "CALC", shift: "SOLVE=", red: "=", cls: "k-fn" },
  { row: 2, col: 2, id: "intdx", label: "∫□", shift: "d/dx", red: ":", cls: "k-fn" },
  { row: 2, col: 5, id: "xinv", label: "x⁻¹", shift: "x!", cls: "k-fn" },
  { row: 2, col: 6, id: "logbox", label: "log□", shift: "Σ□", cls: "k-fn" },
  // function row 2
  { row: 3, col: 1, id: "frac", label: "▫/▫", shift: "▫≡▫/▫", red: "÷R", cls: "k-fn" },
  { row: 3, col: 2, id: "sqrt", label: "√▫", shift: "³√▫", cls: "k-fn" },
  { row: 3, col: 3, id: "x2", label: "x²", shift: "x³", red: "DEC", cls: "k-fn" },
  { row: 3, col: 4, id: "pow", label: "x^▫", shift: "ˣ√▫", red: "HEX", cls: "k-fn" },
  { row: 3, col: 5, id: "log", label: "log", shift: "10^▫", red: "BIN", cls: "k-fn" },
  { row: 3, col: 6, id: "ln", label: "ln", shift: "e^▫", red: "OCT", cls: "k-fn" },
  // function row 3
  { row: 4, col: 1, id: "neg", label: "(−)", shift: "∠", red: "A", cls: "k-fn" },
  { row: 4, col: 2, id: "dms", label: "°'\"", shift: "FACT", red: "B", cls: "k-fn" },
  { row: 4, col: 3, id: "hyp", label: "hyp", shift: "Abs", red: "C", cls: "k-fn" },
  { row: 4, col: 4, id: "sin", label: "sin", shift: "sin⁻¹", red: "D", cls: "k-fn" },
  { row: 4, col: 5, id: "cos", label: "cos", shift: "cos⁻¹", red: "E", cls: "k-fn" },
  { row: 4, col: 6, id: "tan", label: "tan", shift: "tan⁻¹", red: "F", cls: "k-fn" },
  // function row 4
  { row: 5, col: 1, id: "rcl", label: "RCL", shift: "STO", cls: "k-fn" },
  { row: 5, col: 2, id: "eng", label: "ENG", shift: "←", red: "i", cls: "k-fn" },
  { row: 5, col: 3, id: "lparen", label: "(", shift: "%", cls: "k-fn" },
  { row: 5, col: 4, id: "rparen", label: ")", shift: ";", red: "X", cls: "k-fn" },
  { row: 5, col: 5, id: "sd", label: "S⇔D", shift: "a b/c⇔d/c", red: "Y", cls: "k-fn" },
  { row: 5, col: 6, id: "mplus", label: "M+", shift: "M−", red: "M", cls: "k-fn" },
];
/* the round 4-way d-pad, sitting between ALPHA and MODE, spanning the
   top row + function row 1 (cols 3–4, rows 1–2). Rendered separately
   below (buildDpad) — ids up/down/left/right are unchanged. */
const DPAD_POS = { row: 1, col: 3, rowSpan: 2, colSpan: 2 };
const DPAD_KEYS = [
  { id: "up", label: "▲" }, { id: "down", label: "▼" },
  { id: "left", label: "◀" }, { id: "right", label: "▶" },
];

const NUM_KEYS = [
  { row: 1, col: 1, id: "d7", label: "7", shift: "CONST", cls: "k-num" },
  { row: 1, col: 2, id: "d8", label: "8", shift: "CONV", cls: "k-num" },
  { row: 1, col: 3, id: "d9", label: "9", shift: "CLR", cls: "k-num" },
  { row: 1, col: 4, id: "del", label: "DEL", shift: "INS", cls: "k-del" },
  { row: 1, col: 5, id: "ac", label: "AC", shift: "OFF", cls: "k-ac" },
  { row: 2, col: 1, id: "d4", label: "4", shift: "MATRIX", cls: "k-num" },
  { row: 2, col: 2, id: "d5", label: "5", shift: "VECTOR", cls: "k-num" },
  { row: 2, col: 3, id: "d6", label: "6", cls: "k-num" },
  { row: 2, col: 4, id: "mult", label: "×", shift: "nPr", red: "GCD", cls: "k-op" },
  { row: 2, col: 5, id: "div", label: "÷", shift: "nCr", red: "LCM", cls: "k-op" },
  { row: 3, col: 1, id: "d1", label: "1", shift: "STAT/DIST", cls: "k-num" },
  { row: 3, col: 2, id: "d2", label: "2", shift: "CMPLX", cls: "k-num" },
  { row: 3, col: 3, id: "d3", label: "3", shift: "BASE", cls: "k-num" },
  { row: 3, col: 4, id: "plus", label: "+", shift: "Pol", cls: "k-op" },
  { row: 3, col: 5, id: "minus", label: "−", shift: "Rec", cls: "k-op" },
  { row: 4, col: 1, id: "d0", label: "0", shift: "Rnd", cls: "k-num" },
  { row: 4, col: 2, id: "dot", label: ",", shift: "Ran#", red: "RanInt", cls: "k-num" },
  { row: 4, col: 3, id: "exp10", label: "×10ˣ", shift: "π", red: "e", cls: "k-num" },
  { row: 4, col: 4, id: "ans", label: "Ans", shift: "DRG▶", red: "PreAns", cls: "k-num" },
  { row: 4, col: 5, id: "eq", label: "=", cls: "k-eq" },
];

/* exported for verify-calculator.html — the full spec the on-screen
   grid is rendered from, so the verify page can check the RENDER
   against an independently-typed copy of the brief's spec table. */
export const KEY_SPEC = [...FUNC_KEYS, ...NUM_KEYS, ...DPAD_KEYS.map(k => ({ ...k, group: "dpad" }))];

const escapeHtml = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fmtNum = v => (v == null ? "" : String(Math.round(v * 1e8) / 1e8).replace(".", ","));   // comma decimal (ZA locale, verified on the device) — STAT read-offs ONLY
/* the mean symbol x̄ — drawn with the bar ABOVE the x (the LCD font won't
   stack the combining macron, so it lands beside it). Render as an overline. */
const MEAN_GLYPH = '<span class="lcd-ov">x</span>';
const lcdShow = s => escapeHtml(s).replace(/x̄/g, MEAN_GLYPH);   // x + combining macron → overlined x

/* ============================================================
   COMP-MODE MATHS ENGINE (round 2) — exact-first, decimal fallback.
   Pure, S-free helpers so they're easy to reason about / re-test.
   A "Value" is one of:
     { kind:'rat',   n: BigInt, d: BigInt }              — reduced, d>0
     { kind:'surd',  n: BigInt, d: BigInt, rad: BigInt }  — (n/d)·√rad, rad squarefree>1
     { kind:'surd2', terms: [t1, t2] }                    — t1 + t2, each { n, d, rad } = (n/d)·√rad
                                                            (Build 3; rad 1 = a plain rational term)
     { kind:'pi',    n: BigInt, d: BigInt }               — (n/d)·π, n ≠ 0 (Build 3)
     { kind:'float', v: number }                          — decimal fallback
     { kind:'error', msg: "Syntax ERROR" | "Math ERROR" }
   Square roots of rationals are exact; a cube or other root is exact
   only when it is a rational number (³√27 = 3, ⁴√16 = 2), else float.
   Calculator rebuild Build 3 (2026-10-04, CASIO-CALCULATOR-SPEC.md §5,
   §6, §7): exact sums of TWO unlike roots, (a√b + c√d)/e, one of which may
   be a plain number (√3+√2, −1+√2, (√6−√2)/4, 2−√3). The arithmetic is done
   on BigInt term lists (termsOf / fromTerms below), never by recognising a
   float afterwards; a result needing three or more unlike roots falls back
   to a decimal. Trig is exact for every multiple of 15° (the 15° family is
   COMPUTED from the 30°/45° tables with this arithmetic, sin(b+45°) =
   sin b cos 45° + cos b sin 45°, not typed in). Rational powers are exact
   when the answer is rational (8^⅔ = 4, 27^(−⅔) = 1/9), otherwise a
   decimal, never a surd (2^½ = 1,414213562); odd roots of negatives work
   ((−8)^⅓ = −2). Surds show exactly only while the simplified number under
   the root is below 1000 (√999 = 3√111, √1001 = 31,63858404). π (SHIFT
   ×10^x) is a constant; only rational multiples of π stay exact (2π, ½π).
   Calculator rebuild Build 2 (2026-10-04, CASIO-CALCULATOR-SPEC.md §1,
   §3, §4, §7, §8): a missing ")" at the end of a box is closed for you;
   ▫/▫ and ˣ√ grab the operand before the cursor; x² / x^ / x³ chain from
   Ans; three-line error screens with Goto; the fraction size limit; Norm 2
   decimals with 10 significant digits and the ×10 form; the long-line ◀.
   ============================================================ */
class SyntaxErr extends Error {}

function gcdBig(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { [a, b] = [b, a % b]; } return a || 1n; }
function VERR(msg) { return { kind: "error", msg }; }
function VFLOAT(v) { return Number.isFinite(v) ? { kind: "float", v } : VERR("Math ERROR"); }
function mkRat(n, d) {
  if (d === 0n) return VERR("Math ERROR");
  if (d < 0n) { n = -n; d = -d; }
  const g = gcdBig(n, d);
  return { kind: "rat", n: n / g, d: d / g };
}
function mkSurd(n, d, rad) {
  if (rad === 0n) return mkRat(0n, 1n);
  if (rad === 1n) return mkRat(n, d);
  const r = mkRat(n, d);
  if (r.kind === "error") return r;
  return { kind: "surd", n: r.n, d: r.d, rad };
}
function squarefreeSplit(k) {   // k: BigInt ≥ 0 → { sq, rest } with k = sq²·rest, rest squarefree
  if (k === 0n) return { sq: 0n, rest: 0n };
  let sq = 1n, rest = k, p = 2n;
  while (p * p <= rest) {
    while (rest % (p * p) === 0n) { rest /= (p * p); sq *= p; }
    p += (p === 2n ? 1n : 2n);
  }
  return { sq, rest };
}
const isErr = v => v.kind === "error";
const isZeroV = v => v.kind === "rat" && v.n === 0n;
const termFloat = t => (Number(t.n) / Number(t.d)) * (t.rad === 1n ? 1 : Math.sqrt(Number(t.rad)));
function toFloatV(v) {
  if (v.kind === "rat") return Number(v.n) / Number(v.d);
  if (v.kind === "surd") return termFloat(v);
  if (v.kind === "surd2") return termFloat(v.terms[0]) + termFloat(v.terms[1]);
  if (v.kind === "pi") return (Number(v.n) / Number(v.d)) * Math.PI;
  return v.v;
}
const asFloatVal = v => VFLOAT(toFloatV(v));

/* ---- Build 3: exact sums of roots, as BigInt term lists ----
   Every exact algebraic value (rat, surd, surd2) is a list of terms
   (n/d)·√rad with rad squarefree (rad 1 = a plain rational term). + − ×
   work on these lists and fromTerms() collects like roots back into the
   value kinds: no term → 0, one → rat or surd, two → surd2, three or more
   (e.g. √2+√3+√5) → a decimal, the spec's fallback ("anything that leaves
   the shape falls back to a decimal"). So (√6−√2)(√6+√2) really comes back
   as the whole number 4, by exact BigInt arithmetic. */
const isAlg = v => v.kind === "rat" || v.kind === "surd" || v.kind === "surd2";
function termsOf(v) {
  if (v.kind === "rat") return v.n === 0n ? [] : [{ n: v.n, d: v.d, rad: 1n }];
  if (v.kind === "surd") return [{ n: v.n, d: v.d, rad: v.rad }];
  return v.terms;   // surd2
}
/* The order the device shows two terms in (spec §7): a plain number FIRST
   (−1+√2, 2−√3), otherwise the bigger root first (√3+√2, (√6−√2)/4). Only
   these two cases were measured; "bigger root" is read as the bigger number
   under the root, whatever the coefficients and signs (Blipwork reading:
   √2−√3 shows −√3+√2, and 3√2+√3 shows √3+3√2). */
const termOrder = (a, b) => (a.rad === 1n ? -1 : b.rad === 1n ? 1 : a.rad > b.rad ? -1 : 1);
function fromTerms(list) {
  const byRad = new Map();
  for (const t of list) {
    if (t.n === 0n) continue;
    const key = t.rad.toString(), p = byRad.get(key);
    byRad.set(key, p ? { n: p.n * t.d + t.n * p.d, d: p.d * t.d, rad: t.rad } : { n: t.n, d: t.d, rad: t.rad });
  }
  const terms = [];
  for (const t of byRad.values()) { if (t.n === 0n) continue; const r = mkRat(t.n, t.d); terms.push({ n: r.n, d: r.d, rad: t.rad }); }
  if (terms.length === 0) return mkRat(0n, 1n);
  if (terms.length === 1) { const t = terms[0]; return t.rad === 1n ? mkRat(t.n, t.d) : mkSurd(t.n, t.d, t.rad); }
  if (terms.length === 2) return { kind: "surd2", terms: terms.sort(termOrder) };
  return VFLOAT(terms.reduce((s, t) => s + termFloat(t), 0));
}
const negTerm = t => ({ n: -t.n, d: t.d, rad: t.rad });
/* (n/d)·π (Build 3, spec §7/§9): only RATIONAL multiples of π stay exact.
   π + π = 2π and π÷2 = ½π stay exact; π + 1, π², √2·π are decimals. */
function mkPi(n, d) {
  const r = mkRat(n, d);
  if (isErr(r) || r.n === 0n) return r;
  return { kind: "pi", n: r.n, d: r.d };
}

function vAddSub(a, b, sign) {
  if (isErr(a)) return a; if (isErr(b)) return b;
  if (a.kind === "float" || b.kind === "float") return asFloatVal({ kind: "float", v: toFloatV(a) + sign * toFloatV(b) });
  if (a.kind === "pi" || b.kind === "pi") {
    if (isZeroV(b)) return a;
    if (isZeroV(a)) return sign === 1 ? b : vNeg(b);
    if (a.kind === "pi" && b.kind === "pi") return mkPi(a.n * b.d + BigInt(sign) * b.n * a.d, a.d * b.d);
    return asFloatVal({ kind: "float", v: toFloatV(a) + sign * toFloatV(b) });   // π + 1 = 4,141592654 (spec §7)
  }
  if (!isAlg(a) || !isAlg(b)) return asFloatVal({ kind: "float", v: toFloatV(a) + sign * toFloatV(b) });   // a kind a later build adds: decimal until it says otherwise
  return fromTerms([...termsOf(a), ...(sign === 1 ? termsOf(b) : termsOf(b).map(negTerm))]);
}
const vAdd = (a, b) => vAddSub(a, b, 1);
const vSub = (a, b) => vAddSub(a, b, -1);
function vNeg(a) {
  if (isErr(a)) return a;
  if (a.kind === "float") return VFLOAT(-a.v);
  if (a.kind === "rat") return mkRat(-a.n, a.d);
  if (a.kind === "pi") return mkPi(-a.n, a.d);
  if (a.kind === "surd2") return fromTerms(a.terms.map(negTerm));
  return mkSurd(-a.n, a.d, a.rad);
}
function vMul(a, b) {
  if (isErr(a)) return a; if (isErr(b)) return b;
  if (a.kind === "float" || b.kind === "float") return asFloatVal({ kind: "float", v: toFloatV(a) * toFloatV(b) });
  if (a.kind === "pi" || b.kind === "pi") {
    if (isZeroV(a) || isZeroV(b)) return mkRat(0n, 1n);
    if (a.kind === "pi" && b.kind === "rat") return mkPi(a.n * b.n, a.d * b.d);
    if (b.kind === "pi" && a.kind === "rat") return mkPi(a.n * b.n, a.d * b.d);
    return asFloatVal({ kind: "float", v: toFloatV(a) * toFloatV(b) });   // π², √2·π: not a rational multiple of π
  }
  if (a.kind === "rat" && b.kind === "rat") return mkRat(a.n * b.n, a.d * b.d);
  if (!isAlg(a) || !isAlg(b)) return asFloatVal({ kind: "float", v: toFloatV(a) * toFloatV(b) });   // a kind a later build adds
  const out = [];
  for (const p of termsOf(a)) for (const q of termsOf(b)) {
    const { sq, rest } = squarefreeSplit(p.rad * q.rad);   // √r·√s = sq·√rest
    out.push({ n: p.n * q.n * sq, d: p.d * q.d, rad: rest });
  }
  return fromTerms(out);
}
function vInv(a) {
  if (isErr(a)) return a;
  if (a.kind === "float") return a.v === 0 ? VERR("Math ERROR") : VFLOAT(1 / a.v);
  if (a.kind === "rat") return a.n === 0n ? VERR("Math ERROR") : mkRat(a.d, a.n);
  if (a.kind === "pi") return VFLOAT(1 / toFloatV(a));   // 1/π is not a rational multiple of π
  if (a.kind === "surd2") {
    /* 1/(p + q) = (p − q)/(p² − q²): p² and q² are rational, and they are
       never equal for two unlike squarefree roots, so this never divides by
       0. 1/(√2+1) = (√2−1)/(2−1) = −1+√2 (spec §7). */
    const [p, q] = a.terms;
    const sq = t => mkRat(t.n * t.n * t.rad, t.d * t.d);
    return vDiv(fromTerms([p, negTerm(q)]), vSub(sq(p), sq(q)));
  }
  if (a.n === 0n) return VERR("Math ERROR");
  return mkSurd(a.d, a.n * a.rad, a.rad);   // 1/((n/d)√rad) = (d/(n·rad))·√rad
}
function vDiv(a, b) { if (isErr(a)) return a; if (isErr(b)) return b; return vMul(a, vInv(b)); }
function vPowInt(a, nInt) {
  if (isErr(a)) return a;
  if (a.kind === "float") return VFLOAT(Math.pow(a.v, nInt));
  if (Math.abs(nInt) > 64) return VFLOAT(Math.pow(toFloatV(a), nInt));
  const neg = nInt < 0, n = Math.abs(nInt);
  let result = mkRat(1n, 1n), base = a, e = n;
  while (e > 0) { if (e & 1) result = vMul(result, base); if (isErr(result)) return result; e >>= 1; if (e > 0) { base = vMul(base, base); if (isErr(base)) return base; } }
  return neg ? vInv(result) : result;
}
/* x^ (Build 3, spec §6). A whole-number exponent keeps surds: (√2)³ = 2√2.
   A fraction or decimal exponent p/q on a RATIONAL base gives the exact
   answer only when it is rational, i.e. when top and bottom of the base are
   perfect q-th powers: 4^½ = 2, 4^0,5 = 2, 8^⅔ = 4, 4^(−½) = ½, 27^(−⅔) =
   1/9. Otherwise a DECIMAL, never a surd: 2^½ = 1,414213562. An odd root of
   a negative works ((−8)^⅓ = −2, and as a decimal when not exact); an even
   root of a negative is Math ERROR ((−4)^0,5). */
const MAX_EXACT_ROOT = 64n;   // q-th roots tried exactly up to q = 64 (exponent 0,015625); past that, decimal
function vPow(base, exp) {
  if (isErr(base)) return base; if (isErr(exp)) return exp;
  if (exp.kind === "rat" && exp.d === 1n && exp.n >= -64n && exp.n <= 64n) return vPowInt(base, Number(exp.n));
  if (exp.kind === "rat" && exp.d > 1n) {
    const p = exp.n, q = exp.d, oddQ = q % 2n === 1n;
    if (base.kind === "rat" && q <= MAX_EXACT_ROOT && p >= -64n && p <= 64n) {
      const neg = base.n < 0n;
      if (neg && !oddQ) return VERR("Math ERROR");
      const rn = intRoot(neg ? -base.n : base.n, Number(q)), rd = intRoot(base.d, Number(q));
      if (rn !== null && rd !== null) return vPowInt(mkRat(neg ? -rn : rn, rd), Number(p));
    }
    const f = toFloatV(base);
    if (f < 0) {
      if (!oddQ) return VERR("Math ERROR");
      const m = Math.pow(-f, Number(p) / Number(q));
      return VFLOAT(p % 2n === 0n ? m : -m);   // a real odd root: (−x)^(p/q) = ±x^(p/q)
    }
    return VFLOAT(Math.pow(f, Number(p) / Number(q)));
  }
  return VFLOAT(Math.pow(toFloatV(base), toFloatV(exp)));
}
function vSqrt(a) {
  if (isErr(a)) return a;
  if (a.kind === "float") return a.v < 0 ? VERR("Math ERROR") : VFLOAT(Math.sqrt(a.v));
  if (a.kind !== "rat") { const f = toFloatV(a); return f < 0 ? VERR("Math ERROR") : VFLOAT(Math.sqrt(f)); }   // √ of a surd, a two-term sum or a π form: decimal (no exact type for it)
  if (a.n < 0n) return VERR("Math ERROR");
  if (a.n === 0n) return mkRat(0n, 1n);
  const num = a.n * a.d;
  const { sq, rest } = squarefreeSplit(num);
  return mkSurd(sq, a.d, rest);
}
/* ³√ (SHIFT √): exact when the answer is rational (³√27 = 3, spec §6;
   ³√(8/27) = ⅔, the same rule ˣ√ with index 3 already followed), else a
   decimal. A NEGATIVE radicand keeps its old behaviour (the real cube root
   as a decimal): the spec did not measure ³√ of a negative. */
function vCbrt(a) {
  if (isErr(a)) return a;
  if (a.kind === "rat" && a.n >= 0n) {
    const rn = intRoot(a.n, 3), rd = intRoot(a.d, 3);
    if (rn !== null && rd !== null) return mkRat(rn, rd);
  }
  return VFLOAT(Math.cbrt(toFloatV(a)));
}
/* exact k-th root of a BigInt a ≥ 0, or null when a is not a perfect k-th power */
function intRoot(a, k) {
  if (a < 2n) return a;
  const approx = Math.round(Math.pow(Number(a), 1 / k));
  if (!Number.isFinite(approx)) return null;
  const r = BigInt(approx), K = BigInt(k);
  for (const c of [r - 1n, r, r + 1n]) if (c >= 0n && c ** K === a) return c;
  return null;
}
/* ˣ√ (SHIFT x^, calculator Build 2, spec §6/§8): the index-th root of the
   radicand. Index 2 is exactly the √ key (exact surds); a whole-number
   index whose radicand is a perfect power of it gives the exact rational
   root (⁴√16 = 2); everything else is a decimal, the existing value rules.
   A NEGATIVE radicand stays Math ERROR here (Build 3 left it alone): the
   spec measured odd roots of negatives only through x^, (−8)^⅓ = −2, and
   not through ³√ or ˣ√, so this is kept until a probe says otherwise. */
function vXroot(idx, x) {
  if (isErr(idx)) return idx; if (isErr(x)) return x;
  if (idx.kind === "rat" && idx.d === 1n && idx.n === 2n) return vSqrt(x);
  if (idx.kind === "rat" && idx.d === 1n && idx.n > 0n && idx.n <= 64n && x.kind === "rat" && x.n >= 0n) {
    const k = Number(idx.n), rn = intRoot(x.n, k), rd = intRoot(x.d, k);
    if (rn !== null && rd !== null) return mkRat(rn, rd);
  }
  const n = toFloatV(idx);
  if (n === 0) return VERR("Math ERROR");
  return VFLOAT(Math.pow(toFloatV(x), 1 / n));
}
/* exact equality of two exact algebraic values (Build 3: by exact
   subtraction, so a two-term sum compares exactly too) */
function valuesEqual(a, b) {
  if (isErr(a) || isErr(b) || !isAlg(a) || !isAlg(b)) return false;
  return isZeroV(vSub(a, b));
}

/* ---- exact special-angle table, DEGREES ----
   The 30°/45° family is typed in; Build 3 (spec §5: exact for EVERY
   multiple of 15°) COMPUTES the other eight angles (15, 75, 105, …, 345)
   from it with the exact arithmetic above: θ − 45° is then a multiple of
   30°, and sin θ = sin(θ−45°)cos 45° + cos(θ−45°)sin 45°, cos θ =
   cos(θ−45°)cos 45° − sin(θ−45°)sin 45°. So sin 15° = (√6−√2)/4 comes out
   of BigInt arithmetic, not off a list, and tan = sin ÷ cos the same way
   (tan 15° = 2−√3). verify-calc-casio.html sweeps every entry against
   Math.sin/cos/tan. */
const RT = { half: mkRat(1n, 2n), nhalf: mkRat(-1n, 2n), one: mkRat(1n, 1n), none: mkRat(-1n, 1n), zero: mkRat(0n, 1n) };
const S2 = mkSurd(1n, 2n, 2n), nS2 = mkSurd(-1n, 2n, 2n), S3 = mkSurd(1n, 2n, 3n), nS3 = mkSurd(-1n, 2n, 3n);
const SIN_TABLE = { 0: RT.zero, 30: RT.half, 45: S2, 60: S3, 90: RT.one, 120: S3, 135: S2, 150: RT.half, 180: RT.zero, 210: RT.nhalf, 225: nS2, 240: nS3, 270: RT.none, 300: nS3, 315: nS2, 330: RT.nhalf };
const COS_TABLE = { 0: RT.one, 30: S3, 45: S2, 60: RT.half, 90: RT.zero, 120: RT.nhalf, 135: nS2, 150: nS3, 180: RT.none, 210: nS3, 225: nS2, 240: RT.nhalf, 270: RT.zero, 300: RT.half, 315: S2, 330: S3 };
function normDeg(d) { let x = d % 360; if (x < 0) x += 360; return x; }
for (let deg = 15; deg < 360; deg += 30) {
  if (SIN_TABLE[deg] !== undefined) continue;   // 45, 135, 225, 315 are in the typed table
  const b = normDeg(deg - 45);
  SIN_TABLE[deg] = vAdd(vMul(SIN_TABLE[b], S2), vMul(COS_TABLE[b], S2));
  COS_TABLE[deg] = vSub(vMul(COS_TABLE[b], S2), vMul(SIN_TABLE[b], S2));
}
const TAN_TABLE = {};   // null where cos = 0 (90°, 270°): Math ERROR
for (const k of Object.keys(SIN_TABLE)) TAN_TABLE[k] = isZeroV(COS_TABLE[k]) ? null : vDiv(SIN_TABLE[k], COS_TABLE[k]);
const TRIG_TABLE = { sin: SIN_TABLE, cos: COS_TABLE, tan: TAN_TABLE };
const degRange = (from, to) => { const a = []; for (let d = from; d <= to; d += 15) a.push(d); return a; };
const INV_RANGE = { asin: degRange(-90, 90), acos: degRange(0, 180), atan: degRange(-75, 75) };
const INV_OF = { asin: "sin", acos: "cos", atan: "tan" };
/* The angle in WHOLE degrees when it is exact, else null: a whole number in
   Deg mode; in Rad mode a rational multiple of π that is a whole number of
   degrees (π/6 → 30). The Rad case is a Blipwork choice (the spec only
   probed Deg): without it sin(π) would show 1,224646799×10⁻¹⁶. */
function exactDeg(argVal, drg) {
  if (drg === "D" && argVal.kind === "rat" && argVal.d === 1n) return argVal.n;
  if (drg === "R" && argVal.kind === "pi") { const m = mkRat(argVal.n * 180n, argVal.d); if (m.d === 1n) return m.n; }
  return null;
}

/* Build 3 also fixes tan: the old lookup answered Math ERROR for EVERY whole
   angle outside the 30°/45° table (tan(20 gave Math ERROR, not 0,3639702343). */
function evalTrigFn(name, argVal, drg) {
  if (isErr(argVal)) return argVal;
  const deg = exactDeg(argVal, drg);
  if (deg !== null) {
    const k = Number(((deg % 360n) + 360n) % 360n), table = TRIG_TABLE[name];
    if (table[k] !== undefined) return table[k] === null ? VERR("Math ERROR") : table[k];
  }
  const argDeg = toFloatV(argVal);
  const rad = drg === "R" ? argDeg : argDeg * Math.PI / 180;
  const fn = name === "sin" ? Math.sin : name === "cos" ? Math.cos : Math.tan;
  const v = fn(rad);
  return Number.isFinite(v) && Math.abs(v) < 1e15 ? VFLOAT(v) : VERR("Math ERROR");
}
/* sin⁻¹ / cos⁻¹ / tan⁻¹ of an exact value from the table give the whole
   angle (sin⁻¹(√3÷2) = 60, sin⁻¹ of sin 15° = 15), in Deg mode. Rad mode
   keeps its decimal answers (spec silent there). */
function evalInv(name, argVal, drg) {
  if (isErr(argVal)) return argVal;
  if (drg === "D" && isAlg(argVal)) {
    const table = TRIG_TABLE[INV_OF[name]];
    for (const deg of INV_RANGE[name]) {
      const tv = table[normDeg(deg)];
      if (tv && valuesEqual(tv, argVal)) return mkRat(BigInt(deg), 1n);
    }
  }
  const x = toFloatV(argVal);
  let rad;
  if (name === "asin") { if (x < -1 || x > 1) return VERR("Math ERROR"); rad = Math.asin(x); }
  else if (name === "acos") { if (x < -1 || x > 1) return VERR("Math ERROR"); rad = Math.acos(x); }
  else rad = Math.atan(x);
  return VFLOAT(drg === "R" ? rad : rad * 180 / Math.PI);
}
function applyFunc(name, inv, argVal, drg) {
  return inv ? evalInv(name === "sin" ? "asin" : name === "cos" ? "acos" : "atan", argVal, drg) : evalTrigFn(name, argVal, drg);
}

/* ---- display formatting ---- */
function fmtIntBig(b) { return b < 0n ? "−" + (-b).toString() : b.toString(); }
const fracHTML = (top, bottom) => `<span class="calc-frac"><span class="calc-frac-num">${top}</span><span class="calc-frac-bar"></span><span class="calc-frac-den">${bottom}</span></span>`;
const absBig = b => (b < 0n ? -b : b);
/* one term's text without its sign: 2 · √3 · 2√3 */
const termText = (k, rad) => (rad === 1n ? absBig(k).toString() : (absBig(k) === 1n ? "" : absBig(k).toString()) + "√" + rad);
const lcmBig = (a, b) => a / gcdBig(a, b) * b;
function formatExactHTML(v) {
  if (v.kind === "error") return escapeHtml(v.msg);
  if (v.kind === "float") return formatDecimal(v);
  if (v.kind === "rat") {
    if (v.n === 0n) return "0";
    if (v.d === 1n) return fmtIntBig(v.n);
    const neg = v.n < 0n, an = neg ? -v.n : v.n;
    return (neg ? "−" : "") + fracHTML(an, v.d);
  }
  if (v.kind === "pi") {
    /* spec §7: 2π shows 2π, π÷2 shows ½π (the stacked fraction FIRST, then π) */
    const neg = v.n < 0n, an = neg ? -v.n : v.n;
    return (neg ? "−" : "") + (v.d === 1n ? (an === 1n ? "" : an.toString()) : fracHTML(an, v.d)) + "π";
  }
  if (v.kind === "surd2") {
    /* (a√b + c√d)/e as ONE stacked fraction over the common denominator
       (spec §5: sin 15° = (√6−√2)/4), inline when e = 1 (√3+√2, −1+√2,
       2−√3). Terms come in termOrder. When BOTH tops are negative the minus
       goes in front of the whole fraction, as it does for −√3/2 (Blipwork
       choice: the device's form for e.g. sin(−105) was not probed). */
    const [p, q] = v.terms, e = lcmBig(p.d, q.d);
    const a = p.n * (e / p.d), c = q.n * (e / q.d);
    if (e === 1n) return (a < 0n ? "−" : "") + termText(a, p.rad) + (c < 0n ? "−" : "+") + termText(c, q.rad);
    if (a < 0n && c < 0n) return "−" + fracHTML(termText(a, p.rad) + "+" + termText(c, q.rad), e);
    return fracHTML((a < 0n ? "−" : "") + termText(a, p.rad) + (c < 0n ? "−" : "+") + termText(c, q.rad), e);
  }
  // surd
  const neg = v.n < 0n, an = neg ? -v.n : v.n;
  const radStr = `√${v.rad}`;
  if (v.d === 1n) return (neg ? "−" : "") + (an === 1n ? "" : an.toString()) + radStr;
  const numStr = (an === 1n ? "" : an.toString()) + radStr;
  return (neg ? "−" : "") + fracHTML(numStr, v.d);
}
/* Decimal display, calculator Build 2 (spec §7, Norm 2 = the factory
   setting): 10 significant digits, rounded (2/3 → 0,6666666667). A number
   with more than 10 digits switches to ×10 form, a small "×10" and a raised
   power (2^40 → 1,099511628×10¹²); small numbers stay plain decimals down
   to 10⁻⁹ (1/2000 → 0,0005, not 5×10⁻⁴) and only switch below that.
   Trailing zeros are dropped. Returns HTML (the ×10 form has markup).
   STAT read-offs do NOT come through here: they keep fmtNum, unchanged. */
function formatDecimal(v) {
  if (v.kind === "error") return escapeHtml(v.msg);
  const f = toFloatV(v);
  if (!Number.isFinite(f)) return "Math ERROR";
  if (f === 0) return "0";
  const sign = f < 0 ? "−" : "";
  const [m, ex] = Math.abs(f).toExponential(9).split("e");   // ONE rounding, to 10 significant digits
  const e = Number(ex), digits = m.replace(".", "");
  if (e >= 10 || e < -9) {
    const tail = digits.slice(1).replace(/0+$/, "");
    return `${sign}${digits[0]}${tail ? "," + tail : ""}<span class="calc-x10">×10</span><sup class="calc-x10-exp">${e < 0 ? "−" : ""}${Math.abs(e)}</sup>`;
  }
  const ip = e >= 0 ? digits.slice(0, e + 1) : "0";
  const fp = (e >= 0 ? digits.slice(e + 1) : "0".repeat(-e - 1) + digits).replace(/0+$/, "");
  return sign + ip + (fp ? "," + fp : "");
}
/* Spec §7: a fraction shows only while digits(top) + digits(bottom) + 1 is
   10 or less (1234/56789 yes, 12345/67891 → 0,1818355894), and a whole
   number only while it has at most 10 digits. Past that the SAME exact
   value shows as a decimal, and S⇔D has nothing to toggle to.
   Build 3 (spec §7): a surd shows exactly only while the number under the
   root, after simplifying, is below 1000 (√999 = 3√111 yes, √1001 → 31,63858404),
   for one root or two; no other surd limit is applied (none was measured).
   A π form uses the fraction rule on its multiple (Blipwork choice). */
const digitCount = b => (b < 0n ? -b : b).toString().length;
const SURD_LIMIT = 1000n;
function exactFits(v) {
  if (v.kind === "surd") return v.rad < SURD_LIMIT;
  if (v.kind === "surd2") return v.terms.every(t => t.rad < SURD_LIMIT);
  if (v.kind !== "rat" && v.kind !== "pi") return false;
  return v.d === 1n ? digitCount(v.n) <= 10 : digitCount(v.n) + digitCount(v.d) + 1 <= 10;
}
const formatValue = (v, dec) => (dec || !exactFits(v)) ? formatDecimal(v) : formatExactHTML(v);

/* ---- token box compile + recursive-descent parse (no implicit ×) ----
   Build 2: every compiled token remembers `src`, its index in the box the
   learner typed, so a Syntax ERROR can say WHERE it happened and ◀/▶
   (Goto) can put the cursor just before that token (spec §3). The copies
   share the template sub-box arrays, so a position inside a fraction or a
   root points at the live box on screen. */
function compileBox(box) {
  const out = [];
  let i = 0;
  while (i < box.length) {
    const t = box[i];
    if (t.k === "d" || t.k === "c") {
      const src = i; let s = "";
      while (i < box.length && (box[i].k === "d" || box[i].k === "c")) { s += box[i].k === "c" ? "." : box[i].v; i++; }
      out.push({ k: "num", v: s, src });
      continue;
    }
    out.push({ ...t, src: i }); i++;
  }
  return out;
}
/* a Syntax ERROR at the parser's current token (or at `at`, a box index);
   at the end of the box the position is the box's end */
function synErr(st, at) {
  const e = new SyntaxErr(), t = st.arr[st.pos];
  e.at = { box: st.box, i: at != null ? at : t ? t.src : st.box.length };
  return e;
}
/* in a malformed number like 1,2,3 the error sits at the second comma */
const badCommaAt = s => { const a = s.indexOf("."), b = a < 0 ? -1 : s.indexOf(".", a + 1); return b > a ? b : 0; };
function numToValue(str) {
  if (!str || str === ".") throw new SyntaxErr();
  const parts = str.split(".");
  if (parts.length > 2) throw new SyntaxErr();
  if (parts.length === 1) { if (!/^\d+$/.test(parts[0])) throw new SyntaxErr(); return mkRat(BigInt(parts[0]), 1n); }
  const [ip, fp] = parts;
  if (!/^\d*$/.test(ip) || !/^\d*$/.test(fp) || (!ip && !fp)) throw new SyntaxErr();
  const denom = 10n ** BigInt(fp.length);
  const numer = BigInt((ip || "0") + fp);
  return mkRat(numer, denom);
}
const peek = st => st.arr[st.pos];
const next = st => { st.pos++; };
function parseExpr(st, ctx) {
  let left = parseTerm(st, ctx);
  for (;;) {
    const t = peek(st);
    if (t && t.k === "op" && (t.v === "+" || t.v === "−")) { next(st); const right = parseTerm(st, ctx); left = t.v === "+" ? vAdd(left, right) : vSub(left, right); }
    else break;
  }
  return left;
}
function parseTerm(st, ctx) {
  let left = parseUnary(st, ctx);
  for (;;) {
    const t = peek(st);
    if (t && t.k === "op" && (t.v === "×" || t.v === "÷")) { next(st); const right = parseUnary(st, ctx); left = t.v === "×" ? vMul(left, right) : vDiv(left, right); }
    else break;
  }
  return left;
}
function parseUnary(st, ctx) {
  const t = peek(st);
  if (t && t.k === "op" && t.v === "−") { next(st); return vNeg(parseUnary(st, ctx)); }
  return parseImplicit(st, ctx);
}
/* Implicit multiplication — device-verified: adjacency of a completed atom
   (number / closing-paren group / postfix ²³ / template / Ans — i.e. exactly
   what parsePower always returns) followed directly by another atom-opener
   (a function-open, "(", a template, or Ans — with NO explicit × ÷ between
   them) means MULTIPLY. It binds TIGHTER than explicit × ÷ (nested one level
   below parseTerm's ×÷ loop, same as the real device auto-bracketing
   "6÷2(1+2)" into "6÷(2(1+2))" = 1) but looser than postfix/power, which
   parsePower has already applied by the time we see it here.
   THIS is also the fix for the silent-wrong-answer bug: before this level
   existed, an atom directly followed by another atom (e.g. "19sin(77)" typed
   with no × key) had nothing that would ever consume the second atom — every
   caller of parseExpr/parseTerm only continues on an explicit + − × ÷, so the
   second atom was simply never parsed, its tokens quietly left unconsumed.
   Combined with FIX 2 below (every sub-parse now asserts full consumption),
   a token that isn't understood as +, ×, or (now) implicit-× can no longer
   vanish — it forces a Syntax ERROR instead of a silently wrong number. */
/* Build 1 (spec §2): a variable letter is an implicit-× trigger too, so
   `2A²` with A = 5 gives 50 (the ² binds to A inside parsePower first,
   then the 2 multiplies) and `AB` is A×B. */
/* Build 3: π multiplies implicitly the same way (2π, Aπ, sin(30)π). Like a
   letter, π followed directly by a NUMBER (π2) is not a product: Syntax
   ERROR, as (2+3)4 is on the device (π2 itself was not probed). */
const IMPLICIT_TRIGGER = t => t && (t.k === "func" || t.k === "(" || t.k === "frac" || t.k === "rad" || t.k === "xrt" || t.k === "ans" || t.k === "var" || t.k === "pi");
const PI_VAL = mkPi(1n, 1n);
function parseImplicit(st, ctx) {
  let left = parsePower(st, ctx);
  for (;;) {
    if (IMPLICIT_TRIGGER(peek(st))) { const right = parsePower(st, ctx); left = vMul(left, right); }
    else break;
  }
  return left;
}
function parsePower(st, ctx) {
  let base = parseAtom(st, ctx);
  for (;;) {
    const t = peek(st);
    if (t && t.k === "sq") { next(st); base = vPowInt(base, 2); }
    else if (t && t.k === "cb") { next(st); base = vPowInt(base, 3); }
    else if (t && t.k === "pow") { next(st); const e = parseSubExpr(t.exp, ctx); base = vPow(base, e); }
    else break;
  }
  return base;
}
function parseAtom(st, ctx) {
  const t = peek(st);
  if (!t) throw synErr(st);
  if (t.k === "num") { let v; try { v = numToValue(t.v); } catch { throw synErr(st, t.src + badCommaAt(t.v)); } next(st); return v; }
  if (t.k === "(") { next(st); const v = parseExpr(st, ctx); closeBracket(st); return v; }
  if (t.k === "func") { next(st); const inner = parseExpr(st, ctx); closeBracket(st); return applyFunc(t.name, t.inv, inner, ctx.drg); }
  if (t.k === "ans") { next(st); return ctx.ans; }
  if (t.k === "var") { next(st); return (ctx.vars && ctx.vars[t.name]) || mkRat(0n, 1n); }   // A–F, X, Y, M (spec §2: all start at 0)
  if (t.k === "pi") { next(st); return PI_VAL; }   // the constant π (SHIFT ×10^x, Build 3)
  if (t.k === "frac") { next(st); const num = parseSubExpr(t.num, ctx); const den = parseSubExpr(t.den, ctx); return vDiv(num, den); }
  if (t.k === "rad") { next(st); const body = parseSubExpr(t.body, ctx); return t.deg === 3 ? vCbrt(body) : vSqrt(body); }
  if (t.k === "xrt") { next(st); const idx = parseSubExpr(t.idx, ctx); const body = parseSubExpr(t.body, ctx); return vXroot(idx, body); }
  throw synErr(st);
}
/* Build 2 (spec §4, "very important"): a missing ")" at the END of a box
   counts as closed, because the device closes every open bracket: sin(30 = ½,
   (2+3 = 5, and sin(30+1 = sin(31), the open bracket swallowing the rest.
   "The end of a box" is the end of the line or of a template box (a
   fraction's top, a root's body, an exponent). Anything else where the ")"
   should be is still a Syntax ERROR, and so are 2+3) and (2+3)4. */
function closeBracket(st) {
  const c = peek(st);
  if (!c) return;
  if (c.k !== ")") throw synErr(st);
  next(st);
}
/* FIX 2 (audit result below) — parse a BOUNDED token box (a frac num/den, a
   rad body, a pow exp, or the whole top-level entry line) and require that
   parseExpr consumed every token assigned to it. Before this fix, the three
   template sub-parses (frac num/den, rad body, pow exp) called parseExpr
   directly and threw away its own leftover-token check — only the top-level
   evalBox had one. That gap is exactly how "19sin(77)" in a numerator lost
   its sin(77) factor: parseExpr correctly stopped once no + − × operator
   followed the "19", the frac/rad/pow callers never checked whether
   anything was left over in that sub-box, so the unconsumed sin(77) tokens
   were discarded with no error at all. Every caller below now goes through
   this one function, so a leftover/un-understood token ALWAYS surfaces as
   Syntax ERROR instead of silently vanishing. */
function parseSubExpr(box, ctx) {
  const st = { arr: compileBox(box), pos: 0, box };
  const v = parseExpr(st, ctx);
  if (st.pos !== st.arr.length) throw synErr(st);
  return v;
}
/* A Syntax ERROR value carries `at` = { box, i }: the cursor position just
   BEFORE the token that caused it (Build 2, spec §3 Goto). */
function evalBox(box, ctx) {
  try { return parseSubExpr(box, ctx); }
  catch (e) { const r = VERR("Syntax ERROR"); r.at = (e && e.at) || null; return r; }
}

/* ---- Build 1: variables and history helpers ---- */
const VAR_NAMES = ["A", "B", "C", "D", "E", "F", "X", "Y", "M"];
const freshVars = () => Object.fromEntries(VAR_NAMES.map(n => [n, mkRat(0n, 1n)]));
const isZeroAny = v => !isErr(v) && toFloatV(v) === 0;
/* The red ALPHA letter on each key face (spec §2, read off the device). The
   same keys pick the variable after STO and RCL, where no ALPHA is needed. */
const LETTER_OF = { neg: "A", dms: "B", hyp: "C", sin: "D", cos: "E", tan: "F", rparen: "X", sd: "Y", mplus: "M" };
/* ALPHA CALC types "=" and ALPHA ∫ types ":" as plain tokens. Evaluating a
   line that holds them is CALC/SOLVE work (Build 5): today = gives Syntax
   ERROR on them, which the build brief accepts. */
const ALPHA_TOKEN = { calc: "eqs", intdx: "colon" };
/* The device's history limit is by bytes and was not measured; a few dozen
   entries is plenty for a learner, and keeps the memory bounded. */
const MAX_HISTORY = 30;
/* Deep copy of an entry box, re-linking every template sub-box to its new
   parent (same __parent/__owner/__pkey linkage insertTemplate sets up), so a
   history entry can be shown and edited without the edit touching history. */
const SUB_KEYS = ["num", "den", "body", "exp", "idx"];   // every template sub-box key (idx = the ˣ√ index, Build 2)
function cloneBox(box) {
  const out = [];
  for (const t of box) {
    const c = { ...t };
    for (const key of SUB_KEYS) {
      if (Array.isArray(t[key])) { const sub = cloneBox(t[key]); sub.__parent = out; sub.__owner = c; sub.__pkey = key; c[key] = sub; }
    }
    out.push(c);
  }
  return out;
}
/* ---- Build 2: what ▫/▫ (and ˣ√) "grab" (spec §8) ----
   ▫/▫ typed after an operand takes that operand as its numerator; ˣ√ takes
   it as its index. This finds where the ONE operand just left of `end`
   starts: a number (only the last number of 2+3), a letter, Ans or π, a
   finished fraction or root, a whole bracket or function group ((2+3),
   sin(30)), and any of these carrying its ², ³ or x^ exponent (2²).
   Returns `end` when there is no operand (start of the box, or right after
   an operator or an open bracket): the template then goes in empty. */
function operandStart(box, end) {
  if (end <= 0) return end;
  const t = box[end - 1];
  if (t.k === "d" || t.k === "c") { let j = end - 1; while (j > 0 && (box[j - 1].k === "d" || box[j - 1].k === "c")) j--; return j; }
  if (t.k === "var" || t.k === "ans" || t.k === "pi" || t.k === "frac" || t.k === "rad" || t.k === "xrt") return end - 1;
  if (t.k === "sq" || t.k === "cb" || t.k === "pow") { const j = operandStart(box, end - 1); return j === end - 1 ? end : j; }
  if (t.k === ")") {
    let depth = 0;
    for (let j = end - 1; j >= 0; j--) {
      const k = box[j].k;
      if (k === ")") depth++;
      else if ((k === "(" || k === "func") && --depth === 0) return j;
    }
  }
  return end;
}

export function mountCalculator(host, opts = {}) {
  // Optional milestone signal — lets the quest engine see when a learner
  // actually performs a step (cleared, freq on, entered stat mode, captured
  // data, computed a value). Fire-and-forget; never throws into the calc.
  const emit = (t, p) => { try { opts.onEvent && opts.onEvent(t, p); } catch { /* ignore */ } };

  const S = {
    shift: false, mode: "COMP", screen: "comp", freqOn: false,
    line: "", result: null, pendingStat: null,
    data: [], cell: "", row: 0, col: 0, menu: null,
    // ---- COMP-mode maths engine state (round 2) ----
    box: [], cur: null, exactVal: null, showDecimal: false, drg: "D", ansVal: mkRat(0n, 1n),
    // ---- calculator rebuild Build 1 (spec §1, §2) ----
    alpha: false,          // ALPHA lit (one-shot, boxed A in the status line)
    memPending: null,      // "sto" | "rcl": STO/RCL shown in the status line, waiting for a letter key
    vars: freshVars(),     // A–F, X, Y, M — Value objects, all 0 at the start
    history: [],           // [{ box, val, showDecimal }], newest last, MAX_HISTORY entries at most
    histPos: 0,            // index of the history entry on screen; history.length = "below the newest"
    browsing: false,       // true while ▲/▼ show a history entry (indicator then ▲ / ▼ / ▲▼)
    afterAC: false,        // the line is empty because of AC: ◀/▶ recall the last expression
    err: false,            // the result line holds an error message
    lastWasStat: false,    // the result came from a pasted STAT token (legacy line, no box to edit)
    // ---- calculator rebuild Build 2 (spec §3) ----
    errAt: null,           // { box, i }: where ◀/▶ (Goto) put the cursor after a Syntax ERROR
  };
  S.cur = { box: S.box, i: 0 };

  // Optional pre-load: start a read-off task with the data already captured
  // in 1-VAR STAT mode (so the learner focuses on the read-off sequence).
  if (opts.setup) {
    const su = opts.setup;
    /* setup.data takes either plain numbers (frequency 1 each, the original
       form — every existing quest still passes this) or {x, f} pairs, so a
       question can start with a FREQUENCY TABLE already captured instead of a
       flat list. Added 2026-08-28 for the grouped-data round, where retyping
       the same table before every read-off would be all tedium and no skill. */
    if (su.data && su.data.length) {
      S.mode = "STAT"; S.freqOn = !!su.freq;
      S.data = su.data.map(d => (d && typeof d === "object")
        ? { x: Number(d.x), f: Number(d.f ?? 1) }
        : { x: d, f: 1 });
      S.screen = "comp";
    }
    else if (su.statMode) { S.mode = "STAT"; S.screen = "comp"; }
  }

  // ---- scaffold ----
  const wrap = el("div", "calc");
  const lcd = el("div", "calc-lcd");
  const ind = el("div", "calc-ind");
  const main = el("div", "calc-main");
  lcd.appendChild(ind); lcd.appendChild(main);
  wrap.appendChild(lcd);
  const buildKey = k => {
    const html = `${k.shift ? `<span class="ksh">${escapeHtml(k.shift)}</span>` : ""}`
      + `${k.red ? `<span class="kred">${escapeHtml(k.red)}</span>` : ""}`
      + `<span class="kmain">${escapeHtml(k.label)}</span>`;
    const b = el("button", "calc-key " + (k.cls || ""), html);
    b.dataset.keyid = k.id;
    b.style.gridColumn = String(k.col);
    b.style.gridRow = String(k.row);
    if (k.dead) b.dataset.dead = "1";      // visual-only: no click handler (round 2 wires it up)
    else b.addEventListener("click", () => press(k.id));
    return b;
  };
  const buildDpad = () => {
    const holder = el("div", "calc-dpad");
    holder.style.gridColumn = `${DPAD_POS.col} / span ${DPAD_POS.colSpan}`;
    holder.style.gridRow = `${DPAD_POS.row} / span ${DPAD_POS.rowSpan}`;
    const ring = el("div", "calc-dpad-ring");
    DPAD_KEYS.forEach(k => {
      const b = el("button", `calc-dpad-btn k-${k.id}`, k.label);
      b.dataset.keyid = k.id;
      b.addEventListener("click", () => press(k.id));
      ring.appendChild(b);
    });
    holder.appendChild(ring);
    return holder;
  };

  const pad = el("div", "calc-pad");
  const fngrid = el("div", "calc-fngrid");
  FUNC_KEYS.forEach(k => fngrid.appendChild(buildKey(k)));
  fngrid.appendChild(buildDpad());
  pad.appendChild(fngrid);
  const numgrid = el("div", "calc-numgrid");
  NUM_KEYS.forEach(k => numgrid.appendChild(buildKey(k)));
  pad.appendChild(numgrid);
  wrap.appendChild(pad);
  host.appendChild(wrap);

  // ---- stats ----
  function expanded() {
    const a = [];
    S.data.forEach(d => { const f = S.freqOn ? (d.f ?? 1) : 1; for (let i = 0; i < (f || 0); i++) a.push(d.x); });
    return a;
  }
  function statValue(tok) {
    const a = expanded(); if (!a.length) return null;
    const s = sortAsc(a), n = a.length, m = mean(a);
    switch (tok) {
      case "n": return n;
      case "x̄": return m;
      case "σx": return stdDev(a);
      case "sx": return n > 1 ? Math.sqrt(a.reduce((q, x) => q + (x - m) ** 2, 0) / (n - 1)) : 0;
      case "minX": return s[0];
      case "maxX": return s[n - 1];
      case "Q1": return quartilesExclusive(s).q1;
      case "med": return quartilesExclusive(s).med;
      case "Q3": return quartilesExclusive(s).q3;
      case "Σx": return a.reduce((q, x) => q + x, 0);
      case "Σx²": return a.reduce((q, x) => q + x * x, 0);
    }
    return null;
  }

  // ---- menus ----
  const openMenu = m => { S.menu = m; S.screen = "menu"; };
  const closeMenu = () => { if (S.menu && S.menu.parent) S.menu = S.menu.parent; else { S.screen = S.menu && S.menu.ret || "comp"; S.menu = null; } };

  function modeMenu() {
    openMenu({ items: [["1", "COMP"], ["2", "CMPLX"], ["3", "STAT"], ["4", "BASE-N"], ["5", "EQN"], ["6", "MATRIX"], ["7", "TABLE"]], ret: "comp",
      onNum(n) { if (n === 1) { S.mode = "COMP"; resetEntry(); S.menu = null; S.screen = "comp"; } else if (n === 3) statTypeMenu(); } });
  }
  function statTypeMenu() {
    openMenu({ items: [["1", "1-VAR"], ["2", "A+BX"], ["3", "_+CX²"], ["4", "ln X"], ["5", "e^X"], ["6", "A·B^X"], ["7", "A·X^B"], ["8", "1/X"]], ret: "comp",
      onNum(n) { if (n === 1) startStat(); } });
  }
  function startStat() { S.mode = "STAT"; S.data = []; S.cell = ""; S.row = 0; S.col = 0; S.menu = null; S.screen = "statInput"; emit("statMode"); }

  function setupMenu() {
    const p1 = [["1", "MthIO"], ["2", "LineIO"], ["3", "Deg"], ["4", "Rad"], ["5", "Gra"], ["6", "Fix"], ["7", "Sci"]];
    const p2 = [["1", "ab/c"], ["2", "d/c"], ["3", "CMPLX"], ["4", "STAT"], ["5", "TABLE"], ["6", "APO"], ["7", "CONT"]];
    openMenu({ items: p1, page: 0, pages: 2, ret: "comp",
      onDown() { if (this.page === 0) { this.page = 1; this.items = p2; } },
      onUp() { if (this.page === 1) { this.page = 0; this.items = p1; } },
      onNum(n) {
        if (this.page === 0 && n === 3) { S.drg = "D"; S.menu = null; S.screen = "comp"; }
        else if (this.page === 0 && n === 4) { S.drg = "R"; S.menu = null; S.screen = "comp"; }
        else if (this.page === 1 && n === 4) freqMenu();
      } });
  }
  function freqMenu() {
    openMenu({ title: "Frequency?", items: [["1", "ON"], ["2", "OFF"]], ret: "comp",
      onNum(n) { if (n !== 1 && n !== 2) return; S.freqOn = (n === 1); S.menu = null; S.screen = "comp"; emit("freq", n === 1); } });
  }
  function clrMenu() {
    openMenu({ items: [["1", "Setup"], ["2", "Memory"], ["3", "All"]], ret: "comp",
      onNum(n) { if (n === 3) clrConfirm(); } });
  }
  function clrConfirm() {
    openMenu({ title: "Reset All?", items: [], note: "[=]:Yes   [AC]:Cancel", ret: "comp",
      onEq() { S.vars = freshVars(); S.history = []; resetEntry(); S.data = []; S.mode = "COMP"; S.freqOn = false; S.menu = null; S.screen = "comp"; emit("clear"); } });   // Build 1: "All" also zeroes the variables + M and empties the history (both are memory)
  }
  function statMenu() {
    openMenu({ items: [["1", "Type"], ["2", "Data"], ["3", "Sum"], ["4", "Var"], ["5", "Distr"], ["6", "MinMax"]], ret: "comp",
      onNum(n) { if (n === 3) sumMenu(); else if (n === 4) varMenu(); else if (n === 6) minMaxMenu(); else if (n === 2) { S.menu = null; S.screen = "statInput"; } } });
  }
  // STAT menu labels match the device (1:Type 2:Data 3:Sum 4:Var 5:Distr 6:MinMax)
  /* Sum: 1:Sigma-x-squared  2:Sigma-x  — the ORDER is the device's, verified on
     Megan's fx-991ZA PLUS II emulator 2026-08-28 (entering 2;4;6 then
     SHIFT 1 -> 3 -> 2 -> = showed 12). Sigma-x is option TWO, not one. */
  function sumMenu() {
    const parent = S.menu;
    openMenu({ title: "Sum", parent, items: [["1", "Σx²"], ["2", "Σx"]], onNum(n) { pasteStat(["Σx²", "Σx"][n - 1]); } });
  }
  function varMenu() {
    const parent = S.menu;
    openMenu({ title: "Var", parent, items: [["1", "n"], ["2", MEAN_GLYPH], ["3", "σx"], ["4", "sx"]], onNum(n) { pasteStat(["n", "x̄", "σx", "sx"][n - 1]); } });
  }
  function minMaxMenu() {
    const parent = S.menu;
    openMenu({ title: "MinMax", parent, items: [["1", "minX"], ["2", "maxX"], ["3", "Q1"], ["4", "med"], ["5", "Q3"]], onNum(n) { pasteStat(["minX", "maxX", "Q1", "med", "Q3"][n - 1]); } });
  }
  function pasteStat(tok) { S.menu = null; S.screen = "comp"; S.line = tok; S.pendingStat = tok; S.result = null; }

  // ---- data table ----
  /* Write whatever has been typed into the CURRENT cell. Does not move.
     Returns true if something was written.

     Verified on Megan's fx-991ZA PLUS II emulator, 2026-08-28: typing over a
     row that already holds a value REPLACES it (2;4;6 -> row 1 set to 9 gives
     Sigma-x = 19, not 21), and the row count does not grow. That is exactly
     what the assignment below already did; it is now separated from the
     cursor movement so the arrow keys can reuse it. */
  function writeCell() {
    if (S.cell === "" || S.cell === "-") return false;
    const v = Number(S.cell.replace(",", "."));
    if (!Number.isFinite(v)) { S.cell = ""; return false; }
    const oorskryf = S.data[S.row] != null;          // was there already a value here?
    if (!S.freqOn) S.data[S.row] = { x: v, f: 1 };
    else if (S.col === 0) S.data[S.row] = { x: v, f: (S.data[S.row] && S.data[S.row].f) ?? 1 };
    else if (S.data[S.row]) S.data[S.row].f = v;
    S.cell = "";
    /* An EDIT milestone, distinct from "data". A quest that asks the learner to
       CHANGE a captured value cannot check the end state alone — wiping the
       table and retyping it reaches the same end state without ever using the
       skill. This fires only when an existing cell was overwritten. */
    if (oorskryf) emit("edit", { row: S.row, col: S.col, value: v });
    emit("data", S.data.map(d => d.x));
    return true;
  }

  /* = and the down arrow: write, then step DOWN — staying in the column you
     are in, whether FREQ is on or off.

     Corrected 2026-08-28 from four photos of Megan's fx-991ZA PLUS II with
     FREQ on: pressing = walks the cursor down the X column (row 1 → 2 → 3),
     it does NOT hop across to the FREQ column. The machine fills the whole X
     column first; FREQ is a separate trip with the ▶ key. We had it doing the
     hop, and round 2's hint taught that wrong sequence along with it. */
  function commitCell() {
    if (!writeCell()) return;
    S.row++;
    if (S.row > S.data.length) S.row = S.data.length;   // never past the one open row
  }

  /* Arrow keys INSIDE the data table. Without these a learner can only ever
     append — there is no way back up to row 3 to correct it, which is the
     whole "change a value" skill. Movement is clamped to the rows that exist
     plus the one open row at the bottom. */
  function statNav(dir) {
    writeCell();                                  // typed digits are stored first
    const oop = S.data.length;                    // the open row at the very bottom
    if (dir === "up")   S.row = Math.max(0, S.row - 1);
    if (dir === "down") S.row = Math.min(oop, S.row + 1);
    if (S.freqOn) {
      if (dir === "left") {
        if (S.col > 0) S.col = 0;
        else if (S.row > 0) { S.row--; S.col = 1; }
      }
      /* ▶ vanuit die FREQ-kolom spring terug na die VOLGENDE ry se X-kolom.
         Dit lyk vreemd, maar Megan het dit op 2026-08-28 teen haar regte
         fx-991ZA bevestig: "that's how the real calculator works as well."
         Moenie dit "regmaak" nie. */
      if (dir === "right") {
        if (S.col < 1) S.col = 1;
        else if (S.row < oop) { S.row++; S.col = 0; }
      }
    }
    if (S.row > S.data.length) S.row = S.data.length;
  }

  // ---- COMP-mode entry model: box tree + cursor ----
  // A "box" is a plain JS array of token nodes. Template nodes (frac/rad/pow)
  // hold their own sub-boxes as num/den/body/exp. A sub-box carries live
  // parent linkage as extra properties on the array (__parent = the owning
  // box, __owner = the template token object, __pkey = 'num'|'den'|'body'|
  // 'exp') so navigation always finds the template's CURRENT index via
  // parent.indexOf(owner) rather than a cached index that could go stale
  // after edits earlier in the box.
  function isBoxEmpty(box) { return box.length === 0; }
  function resetEntry() {
    S.box = []; S.cur = { box: S.box, i: 0 };
    S.result = null; S.exactVal = null; S.showDecimal = false;
    S.line = ""; S.pendingStat = null;
    S.err = false; S.lastWasStat = false; S.browsing = false; S.afterAC = false;
    S.histPos = S.history.length; S.errAt = null;
  }
  function linkSub(sub, parentBox, owner, pkey) { sub.__parent = parentBox; sub.__owner = owner; sub.__pkey = pkey; }
  function insertBoxToken(tok) { S.afterAC = false; S.cur.box.splice(S.cur.i, 0, tok); S.cur.i++; }
  /* `grab` (Build 2, spec §8): { into, enter }. When an operand sits just
     left of the cursor it MOVES into the `into` box (▫/▫: the numerator;
     ˣ√: the index) and the cursor lands in the `enter` box (the denominator
     / the radicand). With no operand the template goes in empty and the
     cursor lands in `enterKey`, as before. */
  function insertTemplate(tmpl, enterKey, grab = null) {
    S.afterAC = false;
    const parentBox = S.cur.box;
    let at = S.cur.i;
    if (grab) {
      const j = operandStart(parentBox, at);
      if (j < at) {
        const taken = parentBox.splice(j, at - j);
        for (const t of taken) for (const key of SUB_KEYS) if (Array.isArray(t[key])) t[key].__parent = tmpl[grab.into];   // a grabbed template's boxes now live one level down
        tmpl[grab.into].push(...taken);
        at = j; enterKey = grab.enter;
      }
    }
    parentBox.splice(at, 0, tmpl);
    for (const key of SUB_KEYS) if (Array.isArray(tmpl[key])) linkSub(tmpl[key], parentBox, tmpl, key);
    S.cur = { box: tmpl[enterKey], i: 0 };
  }
  /* a template's boxes in the order ▶ walks them (the ˣ√ index comes FIRST,
     spec §6: "the INDEX box first (small, upper left), then the radicand") */
  const TMPL_BOXES = { frac: ["num", "den"], rad: ["body"], pow: ["exp"], xrt: ["idx", "body"] };
  function exitOrAdvanceRight(box) {
    if (!box.__parent) return;   // root, at end: no-op
    const owner = box.__owner, parent = box.__parent;
    const order = TMPL_BOXES[owner.k], k = order.indexOf(box.__pkey);
    if (k < order.length - 1) { S.cur = { box: owner[order[k + 1]], i: 0 }; return; }   // frac top → bottom, ˣ√ index → radicand
    const pidx = parent.indexOf(owner);
    S.cur = { box: parent, i: pidx + 1 };   // exits: den / body / exp → right after the template token
  }
  function exitOrAdvanceLeft(box) {
    if (!box.__parent) return;
    const owner = box.__owner, parent = box.__parent;
    const order = TMPL_BOXES[owner.k], k = order.indexOf(box.__pkey);
    if (k > 0) { const b = owner[order[k - 1]]; S.cur = { box: b, i: b.length }; return; }   // frac bottom → top, ˣ√ radicand → index
    const pidx = parent.indexOf(owner);
    S.cur = { box: parent, i: pidx };   // exits backward: before the template token
  }
  const isTmpl = t => !!TMPL_BOXES[t.k];
  function enterTemplateForward(tmpl) {   // ▶ landing on a template from outside: step INTO its first box
    S.cur = { box: tmpl[TMPL_BOXES[tmpl.k][0]], i: 0 };
  }
  function enterTemplateBackward(tmpl) {   // ◀ landing on a template from outside: step INTO its last box, at its end
    const order = TMPL_BOXES[tmpl.k], b = tmpl[order[order.length - 1]];
    S.cur = { box: b, i: b.length };
  }
  /* ---- Build 1: editing after a result, history, AC recall (spec §1) ----
     The device FORGETS the answer the moment ◀ or ▶ is pressed and lets you
     fix the sum: ◀ puts the cursor at the END of the expression, ▶ at the
     START, the result disappears and typing inserts at the cursor. Before
     this, the result stayed "on screen" in our state, so the next digit
     wiped the line: Megan's "arrowing back to fix a typo wipes the screen". */
  function editFromResult(dir) {
    if (S.lastWasStat) return;   // a pasted STAT read-off has no box to edit (legacy line) — unchanged
    /* Build 2 (spec §3, Goto): on an error screen ◀ and ▶ BOTH return to the
       expression with the cursor just before the token that caused a Syntax
       ERROR (2+×3+4 → between + and ×). For a Math ERROR the spec does not
       say where the cursor lands: Blipwork puts it at the end of the line. */
    const goto = S.err ? (S.errAt || { box: S.box, i: S.box.length }) : null;
    S.result = null; S.exactVal = null; S.showDecimal = false; S.err = false; S.errAt = null;
    S.browsing = false; S.histPos = S.history.length;
    if (goto) S.cur = { box: goto.box, i: Math.min(goto.i, goto.box.length) };
    else S.cur = dir < 0 ? { box: S.box, i: S.box.length } : { box: S.box, i: 0 };
  }
  /* After AC, ◀ or ▶ recalls the LAST expression in edit mode (no result). */
  function recallLast(dir) {
    const e = S.history[S.history.length - 1];
    S.box = cloneBox(e.box);
    S.cur = dir < 0 ? { box: S.box, i: S.box.length } : { box: S.box, i: 0 };
    S.result = null; S.exactVal = null; S.showDecimal = false; S.err = false;
    S.afterAC = false; S.browsing = false; S.histPos = S.history.length;
  }
  /* Show history entry idx WITH its result, as the device's ▲/▼ replay does.
     The box is a copy, so editing it (◀/▶) never changes the history. */
  function showEntry(idx) {
    const e = S.history[idx];
    S.box = cloneBox(e.box); S.cur = { box: S.box, i: S.box.length };
    S.exactVal = e.val; S.showDecimal = e.showDecimal;
    S.result = formatValue(e.val, e.showDecimal);
    S.err = false; S.lastWasStat = false; S.line = ""; S.pendingStat = null;
    S.browsing = true; S.afterAC = false; S.histPos = idx;
  }
  /* ▲ (dir −1) = older, ▼ (dir +1) = newer. After = the result on screen IS
     the newest entry (histPos = newest), so ▲ shows the one before it ("the
     previous calculation"); after AC histPos sits below the newest, so ▲
     shows the last calculation itself. Past either end: nothing happens. */
  function histNav(dir) {
    const target = S.histPos + dir;
    if (target < 0 || target > S.history.length - 1) return;
    showEntry(target);
  }
  /* The status-line history arrow (spec §1/§16): ▲ after any =; inside the
     history ▲ when something older exists, ▼ when something newer does
     (▲▼ for both). Hidden on an error screen (spec §3) and while typing. */
  function histIndicator() {
    if (S.screen !== "comp" || S.err || S.result == null || !S.history.length) return "";
    if (!S.browsing) return "▲";
    return (S.histPos > 0 ? "▲" : "") + (S.histPos < S.history.length - 1 ? "▼" : "");
  }
  function moveHoriz(dir) {
    if (S.pendingStat != null) return;   // legacy pasted-stat display has no cursor model
    if (S.result != null) return editFromResult(dir);
    if (S.afterAC && isBoxEmpty(S.box) && S.history.length) return recallLast(dir);
    const box = S.cur.box, i = S.cur.i;
    if (dir > 0) {
      if (i < box.length) { const t = box[i]; if (isTmpl(t)) enterTemplateForward(t); else S.cur.i = i + 1; }
      else exitOrAdvanceRight(box);
    } else {
      if (i > 0) { const t = box[i - 1]; if (isTmpl(t)) enterTemplateBackward(t); else S.cur.i = i - 1; }
      else exitOrAdvanceLeft(box);
    }
  }
  function moveVert(dir) {
    if (S.pendingStat != null) return;
    // a result (or a history entry) on screen, or the empty AC screen: ▲▼ walk the history
    if (S.result != null || (S.afterAC && isBoxEmpty(S.box))) { if (!S.err) histNav(dir); return; }
    const box = S.cur.box;
    if (!box.__parent || box.__owner.k !== "frac") return;   // ▲▼ only meaningful inside a fraction
    const owner = box.__owner;
    if (dir > 0 && box.__pkey === "num") S.cur = { box: owner.den, i: Math.min(S.cur.i, owner.den.length) };
    else if (dir < 0 && box.__pkey === "den") S.cur = { box: owner.num, i: Math.min(S.cur.i, owner.num.length) };
  }
  function doDelBox() {
    const box = S.cur.box;
    if (S.cur.i > 0) { box.splice(S.cur.i - 1, 1); S.cur.i--; return; }
    if (!box.__parent) return;   // at the very start of the root: no-op
    // at the start of a template's sub-box: delete the whole (possibly empty) template — keep it simple
    const parent = box.__parent, owner = box.__owner, pidx = parent.indexOf(owner);
    if (pidx < 0) return;
    parent.splice(pidx, 1);
    S.cur = { box: parent, i: pidx };
  }
  function toggleSD() {
    // nothing to toggle to: a decimal answer, or a fraction / whole number too long to show exactly (spec §7)
    if (!S.exactVal || isErr(S.exactVal) || !exactFits(S.exactVal)) return;
    S.showDecimal = !S.showDecimal;
    S.result = formatValue(S.exactVal, S.showDecimal);
  }
  function doEquals() {
    if (S.pendingStat) {
      const tok = S.pendingStat;
      const v = statValue(tok);
      S.result = v == null ? "Math ERROR" : fmtNum(v);
      S.pendingStat = null;
      S.err = v == null; S.lastWasStat = true; S.browsing = false; S.afterAC = false; S.histPos = S.history.length;
      emit("stat", { tok, value: v });
      return;
    }
    if (isBoxEmpty(S.box)) return;
    /* A trailing →A (STO), M+ or M− token: evaluate the rest, then store /
       add to M. These lines are shown with their result but are NOT added to
       the history: spec §1 lists what the history holds (= results, CALC
       results, RCL lines) and STO / M± are not among them. */
    const last = S.box[S.box.length - 1];
    const effect = last && (last.k === "sto" || last.k === "mplus" || last.k === "mminus") ? last : null;
    const target = effect ? S.box.slice(0, -1) : S.box;
    let v = evalBox(target, { ans: S.ansVal, drg: S.drg, vars: S.vars });
    if (!isErr(v) && !Number.isFinite(toFloatV(v))) v = VERR("Math ERROR");   // an exact value too big for any display, same as a float overflow
    S.browsing = false; S.afterAC = false; S.lastWasStat = false;
    if (isErr(v)) {
      S.result = v.msg; S.err = true; S.exactVal = null; S.showDecimal = false; S.histPos = S.history.length;
      // where Goto (◀/▶) will put the cursor; `target` may be a copy of the line without its →A / M+ token
      S.errAt = v.at ? { box: v.at.box === target ? S.box : v.at.box, i: v.at.i } : null;
      return;
    }
    if (effect) {
      if (effect.k === "sto") S.vars[effect.name] = v;
      else S.vars.M = effect.k === "mplus" ? vAdd(S.vars.M, v) : vSub(S.vars.M, v);
    }
    S.err = false; S.errAt = null;
    S.exactVal = v; S.showDecimal = !exactFits(v);   // floats, and fractions past the size limit, show as decimals (spec §7)
    S.result = formatValue(v, S.showDecimal);
    S.ansVal = v;
    if (effect) { S.histPos = S.history.length; return; }
    S.history.push({ box: cloneBox(S.box), val: v, showDecimal: S.showDecimal });
    if (S.history.length > MAX_HISTORY) S.history.shift();
    S.histPos = S.history.length - 1;
  }
  /* STO → letter, M+ and M− act at once, no = needed (spec §2): `5 M+` shows
     `5M+` with the result 5; `5 SHIFT RCL (−)` shows `5→A` and 5. With a
     result already on screen the value stored is Ans (the line reads
     `Ans→A` / `AnsM+`): the spec does not cover this case, it is the same
     chaining from Ans that + − × ÷ already do. Nothing typed: nothing happens. */
  function memKey(tok) {
    if (S.pendingStat != null || S.lastWasStat) return;   // legacy pasted STAT line: no box to evaluate
    if (S.result != null) { if (S.err) return; S.box = [{ k: "ans" }]; }
    else if (isBoxEmpty(S.box)) return;
    S.box.push(tok); S.cur = { box: S.box, i: S.box.length };
    doEquals();
  }
  /* RCL then a letter: the line shows the letter, the result its value, and
     it goes into the history (spec §2) — exactly "type A, press =". */
  function rclKey(letter) {
    resetEntry();
    S.box.push({ k: "var", name: letter }); S.cur = { box: S.box, i: S.box.length };
    doEquals();
  }

  // ---- key dispatch ----
  // scope-cut SHIFT sequences: mixed-number entry/toggle, %, ; — and the
  // SHIFT functions of keys whose own build is later (SOLVE, d/dx, x!, Σ, 10^,
  // e^, FACT, Abs, ←). SHIFT is still consumed, as on the device.
  // (SHIFT x^ = ˣ√ is live since Build 2; SHIFT ×10^x = π since Build 3.)
  const NOOP_SHIFT = new Set(["frac", "sd", "lparen", "rparen", "calc", "intdx", "xinv", "logbox", "log", "ln", "dms", "hyp", "eng"]);
  /* The three-line error screen (Build 2, spec §3) is up: a COMP-engine
     error on the COMP screen. The legacy pasted-STAT "Math ERROR" (no data
     captured) keeps its old one-line look and keys: STAT must behave exactly
     as before until Build 8 moves STAT read-offs onto an editable line. */
  const onErrScreen = () => S.screen === "comp" && S.err && S.result != null && !S.lastWasStat;
  function press(id) {
    /* On an error screen ONLY AC, ◀ and ▶ do anything; every other key is
       ignored (spec §3), including SHIFT, ALPHA, ON, DEL and the digits. */
    if (onErrScreen() && id !== "ac" && id !== "left" && id !== "right") return;
    /* SHIFT and ALPHA share one spot at the far left of the status line
       (boxed S / boxed A, spec §2). SHIFT then ALPHA = ALPHA on, SHIFT off;
       ALPHA ALPHA = off. SHIFT after ALPHA switching ALPHA off is the mirror
       of that (the spec does not cover it). */
    if (id === "shift") { S.shift = !S.shift; if (S.shift) S.alpha = false; return render(); }
    if (id === "alpha") { if (S.shift) { S.shift = false; S.alpha = true; } else S.alpha = !S.alpha; return render(); }
    if (id === "on") { resetEntry(); S.menu = null; S.screen = "comp"; S.shift = false; S.alpha = false; S.memPending = null; return render(); }

    /* STO / RCL waiting for a letter: the letter KEY picks the variable, no
       ALPHA needed (spec §2). Any other key cancels the STO/RCL and is then
       handled as an ordinary key (the spec does not cover that case). */
    if (S.memPending) {
      const p = S.memPending; S.memPending = null;
      if (S.screen === "comp" && LETTER_OF[id]) {
        S.shift = false; S.alpha = false;
        if (p === "sto") memKey({ k: "sto", name: LETTER_OF[id] }); else rclKey(LETTER_OF[id]);
        return render();
      }
    }

    let key = id;
    if (S.alpha) {
      /* ALPHA is ONE-SHOT: the next key types its red letter, then ALPHA is
         off. A key with no red letter types nothing (spec §2). ALPHA ×10^x
         (the constant e) is Build 4, so it only switches ALPHA off for now.
         Off the COMP screen (menus, the STAT data grid) the key passes
         through untouched, exactly as before ALPHA was wired. */
      S.alpha = false; S.shift = false;
      if (S.screen === "comp") key = LETTER_OF[id] ? "var_" + LETTER_OF[id] : (ALPHA_TOKEN[id] || "noop");
    } else if (S.shift) {
      if (id === "d9") key = "clr";
      else if (id === "d1") key = "stat";
      else if (id === "mode") key = "setup";
      else if (id === "sqrt") key = "cbrt";
      else if (id === "x2") key = "cube";
      else if (id === "pow") key = "xroot";     // SHIFT x^ = ˣ√ (Build 2)
      else if (id === "sin") key = "asin";
      else if (id === "cos") key = "acos";
      else if (id === "tan") key = "atan";
      else if (id === "rcl") key = "sto";       // SHIFT RCL = STO
      else if (id === "mplus") key = "mminus";  // SHIFT M+ = M−
      else if (id === "exp10") key = "pi";      // SHIFT ×10^x = π (Build 3, spec §9)
      else if (NOOP_SHIFT.has(id)) key = "noop";
      S.shift = false;
    }

    if (S.screen === "comp") compKey(key);
    else if (S.screen === "menu") menuKey(key);
    else if (S.screen === "statInput") statKey(key);
    render();
  }

  const digit = id => (/^d[0-9]$/.test(id) ? +id[1] : null);
  const opChar = { plus: "+", minus: "−", mult: "×", div: "÷" };
  const ENTRY_KEYS = new Set(["dot", "neg", "plus", "minus", "mult", "div", "frac", "sqrt", "cbrt", "xroot", "x2", "cube", "pow", "sin", "cos", "tan", "asin", "acos", "atan", "lparen", "rparen", "ans", "eqs", "colon", "pi"]);
  const isEntryKey = k => digit(k) != null || ENTRY_KEYS.has(k) || k.startsWith("var_");
  /* POSTFIX keys act on what is before them, so after a result they chain
     from Ans exactly like + − × ÷ do (Build 2, spec §1): x² → Ans², x^ →
     Ans^□ (cursor in the exponent), x³ → Ans³. A postfix key added later
     (Build 4: x⁻¹, x!, %) gets this by being listed here (and in
     ENTRY_KEYS); nothing else needs to change. */
  const POSTFIX_KEYS = new Set(["x2", "cube", "pow"]);

  function compKey(key) {
    if (key === "mode") return modeMenu();
    if (key === "setup") return setupMenu();
    if (key === "clr") return clrMenu();
    if (key === "stat") { if (S.mode === "STAT") statMenu(); return; }
    if (key === "ac") { resetEntry(); S.afterAC = true; return; }   // AC clears the screen but KEEPS the history (spec §1)
    if (key === "sd") return toggleSD();
    if (key === "eq") return doEquals();
    if (key === "up") return moveVert(-1);
    if (key === "down") return moveVert(1);
    if (key === "left") return moveHoriz(-1);
    if (key === "right") return moveHoriz(1);
    if (key === "sto" || key === "rcl") { S.memPending = key; return; }   // the word STO / RCL shows; the next letter key finishes it
    if (key === "mplus") return memKey({ k: "mplus" });
    if (key === "mminus") return memKey({ k: "mminus" });
    if (key === "noop") return;

    /* DEL after a result does NOTHING at all, the screen is unchanged (spec
       §1; it used to clear the line). DEL on a pasted STAT token (no result
       yet) still clears that legacy line, as before. */
    if (key === "del") {
      if (S.result != null) return;
      if (S.pendingStat != null) { resetEntry(); return; }
      doDelBox(); return;
    }

    // device-verified: pressing any entry key after a result (or a pasted
    // stat token) replaces the line with a fresh one — EXCEPT a binary
    // operator (+ − × ÷), which chains from the answer instead: the fresh
    // line starts "Ans" followed by that operator (device-verified: after
    // 3+4=, pressing + shows "Ans+"). Build 2: a POSTFIX key chains the same
    // way after a COMP result (spec §1). Digits, ALPHA letters, prefix keys
    // (√, sin, (, (−) ...) and the ▫/▫ and ˣ√ templates keep the full reset.
    // After a STAT read-off a postfix key still resets, exactly as before:
    // Blipwork does not put STAT read-offs into Ans yet (Build 8), so Ans²
    // there would square an OLD answer, a silently wrong number.
    if ((S.result != null || S.pendingStat != null) && isEntryKey(key)) {
      const chain = !!opChar[key] || (POSTFIX_KEYS.has(key) && S.result != null && !S.lastWasStat);
      resetEntry();
      if (chain) insertBoxToken({ k: "ans" });   // the key itself goes in below, right after "Ans"
    }
    if (key.startsWith("var_")) return insertBoxToken({ k: "var", name: key.slice(4) });
    if (key === "eqs") return insertBoxToken({ k: "eqs" });
    if (key === "colon") return insertBoxToken({ k: "colon" });

    const d = digit(key);
    if (d != null) return insertBoxToken({ k: "d", v: String(d) });
    if (key === "dot") return insertBoxToken({ k: "c" });
    if (key === "neg") return insertBoxToken({ k: "op", v: "−" });
    if (opChar[key]) return insertBoxToken({ k: "op", v: opChar[key] });
    // ▫/▫ grabs the operand before the cursor as its numerator (spec §8); √ and ³√ do NOT grab (9 √ → 9√□)
    if (key === "frac") return insertTemplate({ k: "frac", num: [], den: [] }, "num", { into: "num", enter: "den" });
    if (key === "sqrt") return insertTemplate({ k: "rad", deg: 2, body: [] }, "body");
    if (key === "cbrt") return insertTemplate({ k: "rad", deg: 3, body: [] }, "body");
    // ˣ√ (SHIFT x^): index box first; an operand before the cursor becomes the INDEX (5 SHIFT x^ → ⁵√□)
    if (key === "xroot") return insertTemplate({ k: "xrt", idx: [], body: [] }, "idx", { into: "idx", enter: "body" });
    if (key === "x2") return insertBoxToken({ k: "sq" });
    if (key === "cube") return insertBoxToken({ k: "cb" });
    if (key === "pow") return insertTemplate({ k: "pow", exp: [] }, "exp");
    if (key === "sin" || key === "cos" || key === "tan") return insertBoxToken({ k: "func", name: key, inv: false });
    if (key === "asin") return insertBoxToken({ k: "func", name: "sin", inv: true });
    if (key === "acos") return insertBoxToken({ k: "func", name: "cos", inv: true });
    if (key === "atan") return insertBoxToken({ k: "func", name: "tan", inv: true });
    if (key === "lparen") return insertBoxToken({ k: "(" });
    if (key === "rparen") return insertBoxToken({ k: ")" });
    if (key === "ans") return insertBoxToken({ k: "ans" });
    if (key === "pi") return insertBoxToken({ k: "pi" });
  }

  function menuKey(key) {
    const m = S.menu;
    if (key === "ac") return closeMenu();
    if (key === "down" && m.onDown) return m.onDown();
    if (key === "up" && m.onUp) return m.onUp();
    if (key === "eq" && m.onEq) return m.onEq();
    const d = digit(key);
    if (d != null && m.onNum) m.onNum(d);
  }

  function statKey(key) {
    if (key === "stat") return statMenu();
    if (key === "ac") { commitCell(); S.screen = "comp"; S.line = ""; S.result = null; return; }
    if (key === "eq" || key === "down") {
      // with something typed: store it and step on. With nothing typed: just move.
      if (S.cell !== "" && S.cell !== "-") commitCell(); else statNav("down");
      return;
    }
    if (key === "up" || key === "left" || key === "right") return statNav(key);
    if (key === "del") { S.cell = S.cell.slice(0, -1); return; }
    if (key === "neg") { S.cell = S.cell.startsWith("-") ? S.cell.slice(1) : "-" + S.cell; return; }
    if (key === "dot") { S.cell += ","; return; }
    const d = digit(key);
    if (d != null) S.cell += d;
  }

  // ---- render ----
  function renderNode(node) {
    switch (node.k) {
      case "d": return escapeHtml(node.v);
      case "c": return ",";
      case "op": return escapeHtml(node.v);
      case "(": return "(";
      case ")": return ")";
      case "sq": return "²";
      case "cb": return "³";
      case "ans": return "Ans";
      case "pi": return "π";
      case "var": return escapeHtml(node.name);
      case "eqs": return "=";
      case "colon": return ":";
      case "sto": return "→" + escapeHtml(node.name);
      case "mplus": return "M+";
      case "mminus": return "M−";
      case "func": return escapeHtml(node.name) + (node.inv ? "⁻¹" : "") + "(";
      case "frac": return `<span class="calc-frac"><span class="calc-frac-num">${renderBox(node.num)}</span><span class="calc-frac-bar"></span><span class="calc-frac-den">${renderBox(node.den)}</span></span>`;
      case "rad": return `<span class="calc-rad">${node.deg === 3 ? '<sup class="calc-rad-deg">3</sup>' : ""}<span class="calc-rad-sign">√</span><span class="calc-rad-body">${renderBox(node.body)}</span></span>`;
      case "xrt": return `<span class="calc-rad calc-xrt"><sup class="calc-rad-deg calc-rad-idx">${renderBox(node.idx)}</sup><span class="calc-rad-sign">√</span><span class="calc-rad-body">${renderBox(node.body)}</span></span>`;
      case "pow": return `<sup class="calc-pow-exp">${renderBox(node.exp)}</sup>`;
      default: return "";
    }
  }
  let cursorOn = true;   // the cursor hides while a result is on screen; ◀/▶ bring it back (Build 1)
  function renderBox(box) {
    let html = "";
    for (let idx = 0; idx <= box.length; idx++) {
      if (cursorOn && box === S.cur.box && idx === S.cur.i) html += '<span class="calc-cursor"></span>';
      if (idx < box.length) html += renderNode(box[idx]);
    }
    if (box.length === 0 && box.__parent) html += '<span class="calc-slot"></span>';   // empty template box: dotted placeholder
    return html;
  }

  /* Status line (spec §16, last bullet): boxed S / A at the far left, then
     M, STO, RCL, STAT (FREQ is Blipwork's own STAT tag), and on the right D
     next to Math, with the ▲ / ▼ / ▲▼ history arrow at the far right. Every
     mark has its OWN fixed-width slot, like the segments of the real LCD, so
     a mark switching on or off never shifts any other mark sideways. */
  function renderInd() {
    const comp = S.screen === "comp";
    const sa = S.shift ? "S" : S.alpha ? "A" : "";
    const slot = (name, txt) => `<span class="ind-${name}">${txt}</span>`;
    ind.innerHTML =
      slot("sa", sa ? `<b>${sa}</b>` : "") +
      slot("m", isZeroAny(S.vars.M) ? "" : "M") +
      slot("sto", S.memPending === "sto" ? "STO" : "") +
      slot("rcl", S.memPending === "rcl" ? "RCL" : "") +
      slot("stat", S.mode === "STAT" ? "STAT" : "") +
      slot("freq", S.mode === "STAT" && S.freqOn ? "FREQ" : "") +
      `<span class="ind-gap"></span>` +
      slot("drg", comp ? S.drg : "") +
      slot("math", comp ? "Math" : "") +
      slot("hist", histIndicator());
  }

  function render() {
    renderInd();

    if (S.screen === "comp" && onErrScreen()) {
      /* Build 2 (spec §3): exactly three lines, and nothing else on screen.
         The message keeps the .lcd-res class it always had, so anything
         that reads the result line still reads "Syntax ERROR". */
      main.innerHTML = `<div class="lcd-err"><div class="lcd-res lcd-err-msg">${escapeHtml(S.result)}</div>`
        + `<div class="lcd-err-line">[AC] :Cancel</div><div class="lcd-err-line">[◀][▶]:Goto</div></div>`;
      exprScroll = 0;
    } else if (S.screen === "comp") {
      const usingLine = S.pendingStat != null;
      cursorOn = S.result == null;
      const exprHTML = usingLine ? lcdShow(S.line || "") : renderBox(S.box);
      // AC / empty screen = an empty line plus the cursor, NO "0" anywhere (spec §1)
      const resHTML = S.result != null ? S.result : "";
      main.innerHTML = `<div class="lcd-line"><span class="lcd-lmark" hidden>◀</span><div class="lcd-expr">${exprHTML}</div></div><div class="lcd-res">${resHTML}</div>`;
      keepCursorInView();
    } else if (S.screen === "menu") {
      const m = S.menu;
      let html = m.title ? `<div class="lcd-title">${m.title}</div>` : "";
      if (m.items && m.items.length) html += `<div class="lcd-menu">` + m.items.map(([n, l]) => `<span class="lcd-mi">${n}:${l}</span>`).join("") + `</div>`;
      if (m.note) html += `<div class="lcd-note">${m.note}</div>`;
      if (m.pages && m.page < m.pages - 1) html += `<div class="lcd-more">▼</div>`;
      main.innerHTML = html;
    } else if (S.screen === "statInput") {
      main.innerHTML = renderTable();
    }
  }
  /* Long input (Build 2, spec §1): the entry line scrolls left so the
     cursor stays in view, and a ◀ marker at the left edge shows that
     content is hidden. The line is redrawn on every key, so the scroll
     offset is kept here between draws. With a result on screen (no
     cursor) the line shows from its start, as it always did. */
  let exprScroll = 0;
  function keepCursorInView() {
    const ex = main.querySelector(".lcd-expr"), mark = main.querySelector(".lcd-lmark");
    const cur = ex.querySelector(".calc-cursor");
    if (!cur || ex.scrollWidth <= ex.clientWidth) exprScroll = 0;
    else {
      ex.scrollLeft = exprScroll;
      mark.hidden = false;
      const room = mark.offsetWidth + 1;   // keep the cursor clear of the ◀ marker
      const er = ex.getBoundingClientRect(), cr = cur.getBoundingClientRect();
      if (cr.right > er.right - 1) ex.scrollLeft += cr.right - er.right + 1;
      else if (ex.scrollLeft > 0 && cr.left < er.left + room) ex.scrollLeft -= er.left + room - cr.left;
      exprScroll = ex.scrollLeft;
    }
    ex.scrollLeft = exprScroll;
    mark.hidden = !(exprScroll > 0.5);
  }
  function renderTable() {
    const freq = S.freqOn;
    const rows = Math.max(S.data.length + 1, S.row + 1);
    let html = `<table class="lcd-tab"><tr><th></th><th>X</th>${freq ? "<th>FREQ</th>" : ""}</tr>`;
    for (let r = 0; r < rows; r++) {
      const d = S.data[r];
      /* The selected cell shows what has been typed; with nothing typed yet it
         shows the value ALREADY in that cell, so after arrowing back up to a row
         the learner can see which value they are about to replace. */
      const sel = (c, waarde) => `<u>${S.cell !== "" ? escapeHtml(S.cell) : (waarde != null ? fmtNum(waarde) : "")}</u>`;
      const xc = (r === S.row && S.col === 0) ? sel(0, d ? d.x : null) : (d ? fmtNum(d.x) : "");
      const fc = freq ? ((r === S.row && S.col === 1) ? sel(1, d ? d.f : null) : (d ? fmtNum(d.f) : "")) : "";
      html += `<tr><td>${r + 1}</td><td>${xc}</td>${freq ? `<td>${fc}</td>` : ""}</tr>`;
    }
    html += `</table>`;
    return html;
  }

  render();
  const api = { press, state: () => S };
  host.__CALC__ = api;
  return api;
}

/* full-screen overlay wrapper.
   The calculator is a module-level singleton: closing it detaches the
   scrim from the DOM instead of destroying it, so the whole closure state
   (S, the COMP engine, the stats table, listeners) survives a close —
   reopening re-attaches the SAME element and the screen is exactly as the
   learner left it. State only resets on a page reload (that's deliberate:
   a real fx-991ZA remembers its screen when you put it down). */
let calcScrim = null;
export function openCalculator() {
  if (calcScrim) {
    if (!calcScrim.isConnected) document.body.appendChild(calcScrim);   // foreman review fix: the floating calc button (z 75) sits above this scrim (z 50), so without this re-attach guard a second tap would stack a second calculator
    return;
  }
  const scrim = el("div", "modal-scrim calc-scrim");
  const box = el("div", "calc-wrap");
  const head = el("div", "calc-head");
  head.innerHTML = `<span class="calc-name">CASIO fx-991ZA Plus II</span>`;
  const close = el("button", "calc-close", "✕");
  head.appendChild(close);
  box.appendChild(head);
  const host = el("div", "");
  box.appendChild(host);
  mountCalculator(host);
  scrim.appendChild(box);
  const dismiss = () => scrim.remove();   // detach only — the singleton keeps its state, remove() here means "hide"
  close.addEventListener("click", dismiss);
  scrim.addEventListener("click", e => { if (e.target === scrim) dismiss(); });
  document.body.appendChild(scrim);
  calcScrim = scrim;
}
