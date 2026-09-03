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
     real key but has NO click handler (round 2 wires it up).
   Ids already routed by press()/compKey()/statKey()/menuKey() below
   are UNCHANGED (shift alpha up down left right mode on del ac
   d0-d9 dot mult div plus minus neg eq) — only their grid position
   moved. Round 2 wires: frac sqrt x2 pow sin cos tan lparen rparen
   sd ans. Dead-forever (visual only): calc intdx xinv logbox log ln
   dms hyp rcl eng mplus exp10.
   ============================================================ */
const FUNC_KEYS = [
  // top row
  { row: 1, col: 1, id: "shift", label: "SHIFT", cls: "k-shift" },
  { row: 1, col: 2, id: "alpha", label: "ALPHA", cls: "k-alpha" },
  { row: 1, col: 5, id: "mode", label: "MODE", shift: "SETUP", cls: "k-fn" },
  { row: 1, col: 6, id: "on", label: "ON", cls: "k-fn" },
  // function row 1 (flanks the d-pad)
  { row: 2, col: 1, id: "calc", label: "CALC", shift: "SOLVE=", cls: "k-fn", dead: true },
  { row: 2, col: 2, id: "intdx", label: "∫□", shift: "d/dx", cls: "k-fn", dead: true },
  { row: 2, col: 5, id: "xinv", label: "x⁻¹", shift: "x!", cls: "k-fn", dead: true },
  { row: 2, col: 6, id: "logbox", label: "log□", shift: "Σ□", cls: "k-fn", dead: true },
  // function row 2
  { row: 3, col: 1, id: "frac", label: "▫/▫", shift: "▫≡▫/▫", red: "÷R", cls: "k-fn" },
  { row: 3, col: 2, id: "sqrt", label: "√▫", shift: "³√▫", cls: "k-fn" },
  { row: 3, col: 3, id: "x2", label: "x²", shift: "x³", red: "DEC", cls: "k-fn" },
  { row: 3, col: 4, id: "pow", label: "x^▫", shift: "ˣ√▫", red: "HEX", cls: "k-fn" },
  { row: 3, col: 5, id: "log", label: "log", shift: "10^▫", red: "BIN", cls: "k-fn", dead: true },
  { row: 3, col: 6, id: "ln", label: "ln", shift: "e^▫", red: "OCT", cls: "k-fn", dead: true },
  // function row 3
  { row: 4, col: 1, id: "neg", label: "(−)", shift: "∠", red: "A", cls: "k-fn" },
  { row: 4, col: 2, id: "dms", label: "°'\"", shift: "FACT", red: "B", cls: "k-fn", dead: true },
  { row: 4, col: 3, id: "hyp", label: "hyp", shift: "Abs", red: "C", cls: "k-fn", dead: true },
  { row: 4, col: 4, id: "sin", label: "sin", shift: "sin⁻¹", red: "D", cls: "k-fn" },
  { row: 4, col: 5, id: "cos", label: "cos", shift: "cos⁻¹", red: "E", cls: "k-fn" },
  { row: 4, col: 6, id: "tan", label: "tan", shift: "tan⁻¹", red: "F", cls: "k-fn" },
  // function row 4
  { row: 5, col: 1, id: "rcl", label: "RCL", shift: "STO", cls: "k-fn", dead: true },
  { row: 5, col: 2, id: "eng", label: "ENG", shift: "←", red: "i", cls: "k-fn", dead: true },
  { row: 5, col: 3, id: "lparen", label: "(", shift: "%", cls: "k-fn" },
  { row: 5, col: 4, id: "rparen", label: ")", shift: ";", red: "X", cls: "k-fn" },
  { row: 5, col: 5, id: "sd", label: "S⇔D", shift: "a b/c⇔d/c", red: "Y", cls: "k-fn" },
  { row: 5, col: 6, id: "mplus", label: "M+", shift: "M−", red: "M", cls: "k-fn", dead: true },
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
  { row: 4, col: 3, id: "exp10", label: "×10ˣ", shift: "π", red: "e", cls: "k-num", dead: true },
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
     { kind:'float', v: number }                          — decimal fallback
     { kind:'error', msg: "Syntax ERROR" | "Math ERROR" }
   Only sqrt (degree 2) of a rational is ever exact — cube roots have
   no exact surd type here, so they always fall back to float (this
   matches the brief: "anything that leaves the (a/b)√n form falls
   back to float").
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
function toFloatV(v) {
  if (v.kind === "rat") return Number(v.n) / Number(v.d);
  if (v.kind === "surd") return (Number(v.n) / Number(v.d)) * Math.sqrt(Number(v.rad));
  return v.v;
}
const asFloatVal = v => VFLOAT(toFloatV(v));

function vAddSub(a, b, sign) {
  if (isErr(a)) return a; if (isErr(b)) return b;
  if (a.kind === "float" || b.kind === "float") return asFloatVal({ kind: "float", v: toFloatV(a) + sign * toFloatV(b) });
  if (a.kind === "rat" && b.kind === "rat") return mkRat(a.n * b.d + BigInt(sign) * b.n * a.d, a.d * b.d);
  if (isZeroV(a)) return sign === 1 ? b : vNeg(b);
  if (isZeroV(b)) return a;
  if (a.kind === "surd" && b.kind === "surd" && a.rad === b.rad) return mkSurd(a.n * b.d + BigInt(sign) * b.n * a.d, a.d * b.d, a.rad);
  return asFloatVal({ kind: "float", v: toFloatV(a) + sign * toFloatV(b) });
}
const vAdd = (a, b) => vAddSub(a, b, 1);
const vSub = (a, b) => vAddSub(a, b, -1);
function vNeg(a) {
  if (isErr(a)) return a;
  if (a.kind === "float") return VFLOAT(-a.v);
  if (a.kind === "rat") return mkRat(-a.n, a.d);
  return mkSurd(-a.n, a.d, a.rad);
}
function vMul(a, b) {
  if (isErr(a)) return a; if (isErr(b)) return b;
  if (a.kind === "float" || b.kind === "float") return asFloatVal({ kind: "float", v: toFloatV(a) * toFloatV(b) });
  if (a.kind === "rat" && b.kind === "rat") return mkRat(a.n * b.n, a.d * b.d);
  if (a.kind === "rat") return mkSurd(a.n * b.n, a.d * b.d, b.rad);
  if (b.kind === "rat") return mkSurd(a.n * b.n, a.d * b.d, a.rad);
  const rn = a.n * b.n, rd = a.d * b.d, radProd = a.rad * b.rad;
  const { sq, rest } = squarefreeSplit(radProd);
  return mkSurd(rn * sq, rd, rest);
}
function vInv(a) {
  if (isErr(a)) return a;
  if (a.kind === "float") return a.v === 0 ? VERR("Math ERROR") : VFLOAT(1 / a.v);
  if (a.kind === "rat") return a.n === 0n ? VERR("Math ERROR") : mkRat(a.d, a.n);
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
  while (e > 0) { if (e & 1) result = vMul(result, base); if (isErr(result)) return result; base = vMul(base, base); if (isErr(base)) return base; e >>= 1; }
  return neg ? vInv(result) : result;
}
function vPow(base, exp) {
  if (isErr(base)) return base; if (isErr(exp)) return exp;
  if (exp.kind === "rat" && exp.d === 1n && exp.n >= -64n && exp.n <= 64n) return vPowInt(base, Number(exp.n));
  return VFLOAT(Math.pow(toFloatV(base), toFloatV(exp)));
}
function vSqrt(a) {
  if (isErr(a)) return a;
  if (a.kind === "float") return a.v < 0 ? VERR("Math ERROR") : VFLOAT(Math.sqrt(a.v));
  if (a.kind === "surd") return a.n < 0n ? VERR("Math ERROR") : asFloatVal(a);   // sqrt of a surd: no exact type for it here
  if (a.n < 0n) return VERR("Math ERROR");
  if (a.n === 0n) return mkRat(0n, 1n);
  const num = a.n * a.d;
  const { sq, rest } = squarefreeSplit(num);
  return mkSurd(sq, a.d, rest);
}
function vCbrt(a) {   // no exact cube-surd type — always float, matches the brief's scope
  if (isErr(a)) return a;
  return VFLOAT(Math.cbrt(toFloatV(a)));
}
function valuesEqual(a, b) {
  if (isErr(a) || isErr(b)) return false;
  if (a.kind === "float" || b.kind === "float") return Math.abs(toFloatV(a) - toFloatV(b)) < 1e-9;
  if (a.kind === "rat" && b.kind === "rat") return a.n * b.d === b.n * a.d;
  if (a.kind === "surd" && b.kind === "surd") return a.rad === b.rad && a.n * b.d === b.n * a.d;
  return false;
}

/* ---- exact special-angle table (multiples of 30° and 45°), DEGREES ---- */
const RT = { half: mkRat(1n, 2n), nhalf: mkRat(-1n, 2n), one: mkRat(1n, 1n), none: mkRat(-1n, 1n), zero: mkRat(0n, 1n) };
const S2 = mkSurd(1n, 2n, 2n), nS2 = mkSurd(-1n, 2n, 2n), S3 = mkSurd(1n, 2n, 3n), nS3 = mkSurd(-1n, 2n, 3n);
const SIN_TABLE = { 0: RT.zero, 30: RT.half, 45: S2, 60: S3, 90: RT.one, 120: S3, 135: S2, 150: RT.half, 180: RT.zero, 210: RT.nhalf, 225: nS2, 240: nS3, 270: RT.none, 300: nS3, 315: nS2, 330: RT.nhalf };
const COS_TABLE = { 0: RT.one, 30: S3, 45: S2, 60: RT.half, 90: RT.zero, 120: RT.nhalf, 135: nS2, 150: nS3, 180: RT.none, 210: nS3, 225: nS2, 240: RT.nhalf, 270: RT.zero, 300: RT.half, 315: S2, 330: S3 };
function normDeg(d) { let x = d % 360; if (x < 0) x += 360; return x; }
function sinDeg(deg) { return SIN_TABLE[normDeg(deg)]; }
function cosDeg(deg) { return COS_TABLE[normDeg(deg)]; }
function tanDeg(deg) { const c = cosDeg(deg); if (c === undefined || isZeroV(c)) return null; const s = sinDeg(deg); return s === undefined ? null : vDiv(s, c); }
const ASIN_RANGE = [-90, -60, -45, -30, 0, 30, 45, 60, 90];
const ACOS_RANGE = [0, 30, 45, 60, 90, 120, 135, 150, 180];
const ATAN_RANGE = [-60, -45, -30, 0, 30, 45, 60];

function evalTrigFn(name, argVal, drg) {
  if (isErr(argVal)) return argVal;
  if (drg === "D" && argVal.kind === "rat" && argVal.d === 1n) {
    const deg = normDeg(Number(argVal.n));
    if (name === "sin" && SIN_TABLE[deg] !== undefined) return SIN_TABLE[deg];
    if (name === "cos" && COS_TABLE[deg] !== undefined) return COS_TABLE[deg];
    if (name === "tan") { const t = tanDeg(deg); if (t === null) return VERR("Math ERROR"); if (SIN_TABLE[deg] !== undefined) return t; }
  }
  const argDeg = toFloatV(argVal);
  const rad = drg === "R" ? argDeg : argDeg * Math.PI / 180;
  const fn = name === "sin" ? Math.sin : name === "cos" ? Math.cos : Math.tan;
  const v = fn(rad);
  return Number.isFinite(v) && Math.abs(v) < 1e15 ? VFLOAT(v) : VERR("Math ERROR");
}
function evalInv(name, argVal, drg) {
  if (isErr(argVal)) return argVal;
  if (drg === "D" && argVal.kind !== "float") {
    const range = name === "asin" ? ASIN_RANGE : name === "acos" ? ACOS_RANGE : ATAN_RANGE;
    for (const deg of range) {
      const tv = name === "asin" ? sinDeg(deg) : name === "acos" ? cosDeg(deg) : tanDeg(deg);
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
function formatExactHTML(v) {
  if (v.kind === "error") return escapeHtml(v.msg);
  if (v.kind === "float") return formatDecimal(v);
  if (v.kind === "rat") {
    if (v.n === 0n) return "0";
    if (v.d === 1n) return fmtIntBig(v.n);
    const neg = v.n < 0n, an = neg ? -v.n : v.n;
    return (neg ? "−" : "") + `<span class="calc-frac"><span class="calc-frac-num">${an}</span><span class="calc-frac-bar"></span><span class="calc-frac-den">${v.d}</span></span>`;
  }
  // surd
  const neg = v.n < 0n, an = neg ? -v.n : v.n;
  const radStr = `√${v.rad}`;
  if (v.d === 1n) return (neg ? "−" : "") + (an === 1n ? "" : an.toString()) + radStr;
  const numStr = (an === 1n ? "" : an.toString()) + radStr;
  return (neg ? "−" : "") + `<span class="calc-frac"><span class="calc-frac-num">${numStr}</span><span class="calc-frac-bar"></span><span class="calc-frac-den">${v.d}</span></span>`;
}
function formatDecimal(v) {
  if (v.kind === "error") return escapeHtml(v.msg);
  const f = toFloatV(v);
  if (!Number.isFinite(f)) return "Math ERROR";
  if (f === 0) return "0";
  let s = Math.abs(f) > 0 && (Math.abs(f) < 1e-9 || Math.abs(f) >= 1e15) ? f.toString() : f.toPrecision(10);
  if (/e/i.test(s)) s = f.toString();
  if (s.includes(".")) { s = s.replace(/0+$/, ""); s = s.replace(/\.$/, ""); }
  s = s.replace(".", ",").replace("-", "−");
  return s;
}

/* ---- token box compile + recursive-descent parse (no implicit ×) ---- */
function compileBox(box) {
  const out = [];
  let i = 0;
  while (i < box.length) {
    const t = box[i];
    if (t.k === "d" || t.k === "c") {
      let s = "";
      while (i < box.length && (box[i].k === "d" || box[i].k === "c")) { s += box[i].k === "c" ? "." : box[i].v; i++; }
      out.push({ k: "num", v: s });
      continue;
    }
    out.push(t); i++;
  }
  return out;
}
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
const IMPLICIT_TRIGGER = t => t && (t.k === "func" || t.k === "(" || t.k === "frac" || t.k === "rad" || t.k === "ans");
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
  if (!t) throw new SyntaxErr();
  if (t.k === "num") { next(st); return numToValue(t.v); }
  if (t.k === "(") { next(st); const v = parseExpr(st, ctx); const c = peek(st); if (!c || c.k !== ")") throw new SyntaxErr(); next(st); return v; }
  if (t.k === "func") { next(st); const inner = parseExpr(st, ctx); const c = peek(st); if (!c || c.k !== ")") throw new SyntaxErr(); next(st); return applyFunc(t.name, t.inv, inner, ctx.drg); }
  if (t.k === "ans") { next(st); return ctx.ans; }
  if (t.k === "frac") { next(st); const num = parseSubExpr(t.num, ctx); const den = parseSubExpr(t.den, ctx); return vDiv(num, den); }
  if (t.k === "rad") { next(st); const body = parseSubExpr(t.body, ctx); return t.deg === 3 ? vCbrt(body) : vSqrt(body); }
  throw new SyntaxErr();
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
  const st = { arr: compileBox(box), pos: 0 };
  const v = parseExpr(st, ctx);
  if (st.pos !== st.arr.length) throw new SyntaxErr();
  return v;
}
function evalBox(box, ctx) {
  try { return parseSubExpr(box, ctx); }
  catch { return VERR("Syntax ERROR"); }
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
      onEq() { resetEntry(); S.data = []; S.mode = "COMP"; S.freqOn = false; S.menu = null; S.screen = "comp"; emit("clear"); } });
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
  }
  function linkSub(sub, parentBox, owner, pkey) { sub.__parent = parentBox; sub.__owner = owner; sub.__pkey = pkey; }
  function insertBoxToken(tok) { S.cur.box.splice(S.cur.i, 0, tok); S.cur.i++; }
  function insertTemplate(tmpl, enterKey) {
    const parentBox = S.cur.box;
    parentBox.splice(S.cur.i, 0, tmpl);
    if (tmpl.k === "frac") { linkSub(tmpl.num, parentBox, tmpl, "num"); linkSub(tmpl.den, parentBox, tmpl, "den"); }
    else if (tmpl.k === "rad") { linkSub(tmpl.body, parentBox, tmpl, "body"); }
    else if (tmpl.k === "pow") { linkSub(tmpl.exp, parentBox, tmpl, "exp"); }
    S.cur = { box: tmpl[enterKey], i: 0 };
  }
  function exitOrAdvanceRight(box) {
    if (!box.__parent) return;   // root, at end: no-op
    const owner = box.__owner, parent = box.__parent;
    if (owner.k === "frac" && box.__pkey === "num") { S.cur = { box: owner.den, i: 0 }; return; }
    const pidx = parent.indexOf(owner);
    S.cur = { box: parent, i: pidx + 1 };   // exits: den / body / exp → right after the template token
  }
  function exitOrAdvanceLeft(box) {
    if (!box.__parent) return;
    const owner = box.__owner, parent = box.__parent;
    if (owner.k === "frac" && box.__pkey === "den") { S.cur = { box: owner.num, i: owner.num.length }; return; }
    const pidx = parent.indexOf(owner);
    S.cur = { box: parent, i: pidx };   // exits backward: before the template token
  }
  const isTmpl = t => t.k === "frac" || t.k === "rad" || t.k === "pow";
  function enterTemplateForward(tmpl) {   // ▶ landing on a template from outside: step INTO its first box
    const key = tmpl.k === "frac" ? "num" : tmpl.k === "rad" ? "body" : "exp";
    S.cur = { box: tmpl[key], i: 0 };
  }
  function enterTemplateBackward(tmpl) {   // ◀ landing on a template from outside: step INTO its last box, at its end
    const key = tmpl.k === "frac" ? "den" : tmpl.k === "rad" ? "body" : "exp";
    const b = tmpl[key];
    S.cur = { box: b, i: b.length };
  }
  function moveHoriz(dir) {
    if (S.pendingStat != null) return;   // legacy pasted-stat display has no cursor model
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
    if (!S.exactVal || isErr(S.exactVal)) return;
    S.showDecimal = !S.showDecimal;
    S.result = S.showDecimal ? formatDecimal(S.exactVal) : formatExactHTML(S.exactVal);
  }
  function doEquals() {
    if (S.pendingStat) {
      const tok = S.pendingStat;
      const v = statValue(tok);
      S.result = v == null ? "Math ERROR" : fmtNum(v);
      S.pendingStat = null;
      emit("stat", { tok, value: v });
      return;
    }
    if (isBoxEmpty(S.box)) return;
    const v = evalBox(S.box, { ans: S.ansVal, drg: S.drg });
    if (isErr(v)) { S.result = v.msg; S.exactVal = null; S.showDecimal = false; return; }
    S.exactVal = v; S.showDecimal = (v.kind === "float");
    S.result = v.kind === "float" ? formatDecimal(v) : formatExactHTML(v);
    S.ansVal = v;
  }

  // ---- key dispatch ----
  const NOOP_SHIFT = new Set(["pow", "frac", "sd", "lparen", "rparen"]);   // scope-cut SHIFT sequences: ˣ√, mixed-number entry/toggle, %, ; — stay dead
  function press(id) {
    if (id === "shift") { S.shift = !S.shift; return render(); }
    let key = id;
    if (S.shift) {
      if (id === "d9") key = "clr";
      else if (id === "d1") key = "stat";
      else if (id === "mode") key = "setup";
      else if (id === "sqrt") key = "cbrt";
      else if (id === "x2") key = "cube";
      else if (id === "sin") key = "asin";
      else if (id === "cos") key = "acos";
      else if (id === "tan") key = "atan";
      else if (NOOP_SHIFT.has(id)) key = "noop";
      S.shift = false;
    }
    if (id === "on") { resetEntry(); S.menu = null; S.screen = "comp"; S.shift = false; return render(); }

    if (S.screen === "comp") compKey(key);
    else if (S.screen === "menu") menuKey(key);
    else if (S.screen === "statInput") statKey(key);
    render();
  }

  const digit = id => (/^d[0-9]$/.test(id) ? +id[1] : null);
  const opChar = { plus: "+", minus: "−", mult: "×", div: "÷" };
  const ENTRY_KEYS = new Set(["dot", "neg", "plus", "minus", "mult", "div", "frac", "sqrt", "cbrt", "x2", "cube", "pow", "sin", "cos", "tan", "asin", "acos", "atan", "lparen", "rparen", "ans"]);

  function compKey(key) {
    if (key === "mode") return modeMenu();
    if (key === "setup") return setupMenu();
    if (key === "clr") return clrMenu();
    if (key === "stat") { if (S.mode === "STAT") statMenu(); return; }
    if (key === "ac") { resetEntry(); return; }
    if (key === "sd") return toggleSD();
    if (key === "eq") return doEquals();
    if (key === "up") return moveVert(-1);
    if (key === "down") return moveVert(1);
    if (key === "left") return moveHoriz(-1);
    if (key === "right") return moveHoriz(1);
    if (key === "noop") return;

    // device-verified: pressing any entry key after a result (or a pasted
    // stat token) replaces the line with a fresh one — EXCEPT a binary
    // operator (+ − × ÷), which chains from the answer instead: the fresh
    // line starts "Ans" followed by that operator (device-verified: after
    // 3+4=, pressing + shows "Ans+"). Digits and every other entry key keep
    // the full-reset behaviour.
    if ((S.result != null || S.pendingStat != null) && (key === "del" || digit(key) != null || ENTRY_KEYS.has(key))) {
      if (opChar[key]) { resetEntry(); insertBoxToken({ k: "ans" }); insertBoxToken({ k: "op", v: opChar[key] }); return; }
      resetEntry();
      if (key === "del") return;
    }
    if (key === "del") { doDelBox(); return; }

    const d = digit(key);
    if (d != null) return insertBoxToken({ k: "d", v: String(d) });
    if (key === "dot") return insertBoxToken({ k: "c" });
    if (key === "neg") return insertBoxToken({ k: "op", v: "−" });
    if (opChar[key]) return insertBoxToken({ k: "op", v: opChar[key] });
    if (key === "frac") return insertTemplate({ k: "frac", num: [], den: [] }, "num");
    if (key === "sqrt") return insertTemplate({ k: "rad", deg: 2, body: [] }, "body");
    if (key === "cbrt") return insertTemplate({ k: "rad", deg: 3, body: [] }, "body");
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
      case "func": return escapeHtml(node.name) + (node.inv ? "⁻¹" : "") + "(";
      case "frac": return `<span class="calc-frac"><span class="calc-frac-num">${renderBox(node.num)}</span><span class="calc-frac-bar"></span><span class="calc-frac-den">${renderBox(node.den)}</span></span>`;
      case "rad": return `<span class="calc-rad">${node.deg === 3 ? '<sup class="calc-rad-deg">3</sup>' : ""}<span class="calc-rad-sign">√</span><span class="calc-rad-body">${renderBox(node.body)}</span></span>`;
      case "pow": return `<sup class="calc-pow-exp">${renderBox(node.exp)}</sup>`;
      default: return "";
    }
  }
  function renderBox(box) {
    let html = "";
    for (let idx = 0; idx <= box.length; idx++) {
      if (box === S.cur.box && idx === S.cur.i) html += '<span class="calc-cursor"></span>';
      if (idx < box.length) html += renderNode(box[idx]);
    }
    if (box.length === 0 && box.__parent) html += '<span class="calc-slot"></span>';   // empty template box: dotted placeholder
    return html;
  }

  function render() {
    const tags = [];
    if (S.screen === "comp") tags.push(S.drg);
    if (S.shift) tags.push("S");
    if (S.mode === "STAT") tags.push("STAT");
    if (S.mode === "STAT" && S.freqOn) tags.push("FREQ");
    ind.textContent = tags.join("   ");

    if (S.screen === "comp") {
      const usingLine = S.pendingStat != null;
      const exprHTML = usingLine ? lcdShow(S.line || "") : renderBox(S.box);
      const lineEmpty = usingLine ? !S.line : isBoxEmpty(S.box);
      const resHTML = S.result != null ? S.result : (lineEmpty ? "0" : "");
      main.innerHTML = `<div class="lcd-expr">${exprHTML}</div><div class="lcd-res">${resHTML}</div>`;
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
