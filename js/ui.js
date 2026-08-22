/* Tiny DOM helpers shared across the app. */
import { rng } from "./rng.js";

export function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
export function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
export function mount(parent, ...kids) { kids.forEach(k => k && parent.appendChild(k)); return parent; }

/* Fisher–Yates shuffle (returns a new array). Routed through rng() (js/rng.js)
   — a dice round installs a seeded rng for the duration of one gen() call, so
   option order regenerates identically on resume. Static play is unaffected
   (rng() defaults to Math.random). */
export function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
export function randInt(lo, hi) { return lo + Math.floor(rng() * (hi - lo + 1)); }
export function pick(arr) { return arr[Math.floor(rng() * arr.length)]; }

/* The mean symbol x̄, rendered so the bar sits centred over the x (playtest
   fix, 2026-08-21 — Megan: "the line above the x is a bit skew, it is not
   directly above the x"). The app's fonts (Sora/JetBrains Mono) don't
   reliably stack the combining macron (U+0304) over the x it's meant to sit
   on, so it lands offset. js/calculator.js already solved exactly this for
   the calculator's LCD (see its MEAN_GLYPH/.lcd-ov: a CSS border-top on an
   inline-block, not the combining character) — this is the same recipe,
   reused for every OTHER place the symbol renders (question text, hints,
   solutions, concept cards): a small string transform applied at the DOM-
   insertion boundary, so it's automatic for any question — dice or static,
   present or future — without hunting through every quest file that writes
   the literal "x̄" characters. Call on any HTML string just before it's
   assigned to innerHTML/passed to el(); safe to call on strings that don't
   contain the symbol (no-op) or are null/undefined (passed through). */
export function xbarHtml(s) {
  return s == null ? s : String(s).replace(/x̄/g, '<span class="xbar">x</span>');
}

/* Show/hide toggle for a <input type=password> (playtest fix, 2026-08-21 —
   Megan: "I typed my og password in incorrectly the first time when I set
   it and I had no way to double check it"). Wraps `input` in a small
   position:relative field so a 👁 button can sit INSIDE the existing box
   (the input's own padding-right makes room, so the input's width/position
   on the page is unchanged — nothing shifts). Call this BEFORE the input is
   attached (or right after), then append the RETURNED wrapper wherever the
   input itself would have been appended. Never autofills or submits: the
   button is type="button", and toggling `input.type` is the standard
   reveal-password pattern — it doesn't touch autocomplete/autofill. */
export function pwToggle(input) {
  const wrap = el("div", "pw-field");
  const parent = input.parentNode;
  if (parent) parent.replaceChild(wrap, input);
  wrap.appendChild(input);
  const btn = el("button", "pw-eye", "👁");
  btn.type = "button";
  btn.setAttribute("aria-label", "Show password");
  btn.addEventListener("click", () => {
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    btn.classList.toggle("is-on", !showing);
    btn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  });
  wrap.appendChild(btn);
  return wrap;
}

/* Small toast for surfacing shop/equip results (and their errors) —
   never fail silently on a buy/equip/rename. Stacks; auto-dismisses. */
let toastHost = null;
export function showToast(message, kind = "info") {
  if (!toastHost) {
    toastHost = el("div", "toast-host");
    document.body.appendChild(toastHost);
  }
  const t = el("div", "toast" + (kind === "error" ? " err" : kind === "good" ? " good" : ""), message);
  toastHost.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 300);
  }, 2600);
}

/* ============================================================
   STACKED FRACTIONS (General Trig, her ruling 2026-08-22 evening:
   "proper fractions, not slashes"). stackFrac(n, d) builds one; fracHtml(s)
   rewrites every `a/b` in a learner-facing HTML string into one, innermost
   first, so authors keep writing `12/13`, `1/(1 + sin θ)`, `√(1 − t²)/t`.
   Rules: an atom is a bracketed group (one level of nesting) optionally
   led by √, or a short token (`12`, `√3`, `sin²θ`, `cos θ`, `O`, `r`); a
   leading minus on the numerator moves in front of the whole fraction
   (her habit); anything touching a ° sign is left alone (`0°/360°` is an
   axis label, not a fraction). Switched on per quest (`stackFractions`)
   so no other chapter's look changes.
   ============================================================ */
export function stackFrac(n, d, sign = "") {
  return `${sign}<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;
}
// an atom: √?( … ) with one level of nesting, or a short token that may carry
// its own √ (2√5, √3) and an optional trailing angle letter (sin θ, cos x).
// Written as ONE regex literal (no string escaping to get wrong).
const FRAC_RE = /(^|[^A-Za-z0-9°<>\/√])(√?\((?:[^()<>\/]|\([^()<>\/]*\))*\)|[−-]?[A-Za-z0-9θαβπ²³√]+(?:\s?[θxαAβ](?![A-Za-z]))?)\s*\/\s*(√?\((?:[^()<>\/]|\([^()<>\/]*\))*\)|[−-]?[A-Za-z0-9θαβπ²³√]+(?:\s?[θxαAβ](?![A-Za-z]))?)(?![°\/A-Za-z0-9])/g;
const strip = a => (a.startsWith("(") && a.endsWith(")") ? a.slice(1, -1) : a);
export function fracHtml(s) {
  if (s == null) return s;
  // built fractions are parked as tokens while the loop runs, so the "/" in
  // their closing tags can never be mistaken for another fraction bar
  const parked = [];
  let out = String(s), prev;
  for (let i = 0; i < 4 && out !== prev; i++) {
    prev = out;
    out = out.replace(FRAC_RE, (m, pre, n, d) => {
      let sign = "";
      if (/^[−-]/.test(n)) { sign = "−"; n = n.slice(1); }
      parked.push(stackFrac(strip(n), strip(d), sign));
      return pre + "" + (parked.length - 1) + "";
    });
  }
  const unpark = t => t.replace(/(\d+)/g, (m, k) => unpark(parked[Number(k)]));   // nested fractions
  return unpark(out);
}

/* ============================================================
   FORMULA LINE-BREAKING, app-wide (her /go ruling, 2026-08-22 morning —
   phone screenshots: `x²` split from `− 16` mid-expression, and a memo
   step broke INSIDE a bracket under a √). A maths expression is now ONE
   unit: it moves to the next line whole if it doesn't fit; only when it
   is wider than the whole container may it break, and then only at an
   `= ≠ < > ≤ ≥` or before a top-level `+ − ±`, with the sign leading the
   new line. Never inside brackets, under a √, inside an exponent, inside
   a stacked fraction, or between a number and its °/%.

   THE RECOGNISER (three stages, run in order):
     1) a trailing formula bracket still forces its own line — unchanged
        from the original General Trig rule (a *stronger* behaviour than
        stage 3: this one always breaks; stage 3 only ever permits one).
     2) `.formula`-block identities separated by " · " still get one
        line each — unchanged.
     3) NEW — a general expression scanner. It walks the string tag-aware
        (a hand-rolled scan, not one big regex): any `<sup>`/`<sub>`,
        `<svg>`, `<code>`, or an existing `.sfrac`/`.frac`/`.efrac`/
        `.xbar`/`.nowrap`/`.fml` span is swallowed whole as ONE opaque
        atom and never re-entered (extractTagBlock balances nested tags
        of the same name, so a nested stacked fraction inside a stacked
        fraction still comes out as one block). Everything else — real
        text — is scanned for "atoms": numbers (`,`/`.` decimals),
        single-letter variables (incl. θ α β π Δ σ Σ, both ASCII- and
        Unicode-super/subscript tails: ² ³ ⁻ ⁿ ˣ ᵃᵇᵖᵏ ₁₂ₙₖ …), `sin/cos/
        tan/log/ln` (+ optional bracket or angle argument), and bracketed
        groups `( … )`/`[ … ]` (balanced, arbitrary nesting, optional √
        prefix) — a bracket group is always ONE atom, so nothing inside
        it is ever considered a break point. Atoms glue into the SAME
        piece across `·`, `×`, `/` or plain juxtaposition (`2x`, `4√3`,
        `3ˣ · 3`); a relational or +/−/± sign starts a NEW piece, taking
        the sign with it. Each maximal run of atoms becomes one
        `<span class="fml">` (inline-block — moves whole, only wraps
        internally if it truly cannot fit), each piece inside it one
        `<span class="nowrap">`. A lone digit/letter picked up in plain
        prose ("Card 1 of 4", the "e"/"g" in "e.g.") wraps harmlessly —
        an inline-block around one character changes nothing on screen.

   KNOWN LIMITS: an expression is only ever recognised within ONE run of
   text between two ordinary tags — `<b>16 − x²</b>` is fine (the whole
   thing is inside the tag), but an expression that genuinely straddles
   a `<b>`/`<em>` boundary gets two adjoining `.fml` spans instead of
   one (harmless in practice — those tags already wrap phrase-sized
   chunks in this codebase). Units/words after a number (`5 cm`) are not
   fused — only `°` and `%` are, per the spec. A single ASCII hyphen
   only counts as a minus with a space on both sides, so word-internal
   hyphens ("co-function") are left alone.
   ============================================================ */
const NW = t => `<span class="nowrap">${t}</span>`;

function tagNameOf(openTag) {
  const m = /^<([a-zA-Z]+)/.exec(openTag);
  return m ? m[1].toLowerCase() : null;
}
// spans/tags whose CONTENT is never re-entered by the scanner — already
// built, already correct, always swallowed as one opaque atom
function isProtectedOpenTag(tagStr) {
  const name = tagNameOf(tagStr);
  if (!name) return false;
  if (name === "sup" || name === "sub" || name === "svg" || name === "code") return true;
  if (name === "span") return /class="(?:sfrac|frac|efrac|xbar|nowrap|fml)"/.test(tagStr);
  return false;
}
// consume str[i..] (str[i] is "<name…") through to ITS matching close tag,
// tracking nesting depth of the SAME tag name only (an sfrac's own inner
// sf-n/sf-d spans re-enter "span" depth correctly for a nested fraction;
// they don't affect a "sup"/"svg" depth count at all).
function extractTagBlock(str, i) {
  const gt = str.indexOf(">", i);
  if (gt === -1) return str.length;
  const name = tagNameOf(str.slice(i, gt + 1));
  if (!name) return gt + 1;
  const openTok = "<" + name, closeTok = "</" + name + ">";
  let depth = 1, j = gt + 1;
  while (j < str.length && depth > 0) {
    const nextClose = str.indexOf(closeTok, j);
    if (nextClose === -1) { j = str.length; break; }
    const nextOpen = str.indexOf(openTok, j);
    if (nextOpen !== -1 && nextOpen < nextClose) {
      const after = str[nextOpen + openTok.length];
      if (after === ">" || after === " " || after === "/") { depth++; j = nextOpen + openTok.length; continue; }
      j = nextOpen + openTok.length; continue;   // false-positive substring ("<supplement…"), skip past
    }
    depth--; j = nextClose + closeTok.length;
  }
  return j;
}
// a "<" only starts a real tag when followed by a letter (an opening tag)
// or "/" (a closing tag) — matching how a browser's own HTML parser reads
// loose innerHTML. A bare "<" used as a relational operator ("y < 1",
// funclib.js's rangeStr()) is NOT a valid tag-name start, so the browser
// itself leaves it as literal text — the scanner below must agree, or it
// mistakes everything up to the next ">" anywhere later in the string for
// tag content and quietly eats real maths.
function isTagStart(str, i) {
  if (str[i] !== "<") return false;
  const c = str[i + 1];
  return !!c && (/[A-Za-z]/.test(c) || c === "/");
}
// split the whole html string into text / protected-atom / transparent-tag
// segments, so the scanner below only ever looks at real text
function formulaSegments(str) {
  const out = [];
  let i = 0;
  while (i < str.length) {
    if (isTagStart(str, i)) {
      const gt = str.indexOf(">", i);
      if (gt === -1) { out.push({ type: "text", text: str.slice(i) }); break; }
      const tagStr = str.slice(i, gt + 1);
      if (!tagStr.startsWith("</") && isProtectedOpenTag(tagStr)) {
        const end = extractTagBlock(str, i);
        out.push({ type: "atom", text: str.slice(i, end) });
        i = end;
      } else {
        out.push({ type: "tag", text: tagStr });
        i = gt + 1;
      }
    } else {
      let end = i + 1;
      while (end < str.length && !isTagStart(str, end)) end++;
      out.push({ type: "text", text: str.slice(i, end) });
      i = end;
    }
  }
  return out;
}

// one placeholder char stands in for one whole parked atom while the text
// scanner below runs, so an atom reads as a single token
const FML_PH = "";
const FML_GREEK = "θαβπΔσΣ";
// super/subscript digits, letters and signs — ² ³ ⁴ … ⁰ ¹ ⁻ ⁺ ⁿ ˣ ᵃ ᵇ ᵖ ᵏ and
// the whole sub/superscript blocks (Latin-1 ² ³ ¹, U+2070–209C, and the
// modifier-letter blocks U+02B0–02FF / U+1D2C–1D6A) so a stray unlisted
// exponent glyph is never a surprise later.
const FML_SUP_RE = /[²³¹⁰-ₜʰ-˿ᴬ-ᵪ]/;
const FML_FUNC_RE = /^(sin|cos|tan|log|ln)/;

function fmlIsLetter(ch) { return !!ch && /[A-Za-z]/.test(ch); }
function fmlIsVarLetter(ch) { return !!ch && (/[A-Za-z]/.test(ch) || FML_GREEK.includes(ch)); }

function fmlMatchBracketGroup(str, i) {
  if (str[i] !== "(" && str[i] !== "[") return null;
  let depth = 0, j = i;
  for (; j < str.length; j++) {
    const c = str[j];
    if (c === "(" || c === "[") depth++;
    else if (c === ")" || c === "]") { depth--; if (depth === 0) { j++; break; } }
  }
  return depth === 0 ? j : null;
}
function fmlMatchNumber(str, i) {
  const m = /^[0-9]+(?:[.,][0-9]+)?/.exec(str.slice(i));
  return m ? i + m[0].length : null;
}
// trailing superscript/subscript attachments: zero or more, directly
// touching, no space — an exponent NEVER breaks off its base
function fmlMatchSupTail(str, i) {
  let j = i;
  for (;;) {
    if (str[j] && FML_SUP_RE.test(str[j])) { j++; continue; }
    if (str[j] === FML_PH) { j++; continue; }         // a parked <sup>/<sub> block right after
    if (str[j] === "^") {
      const m = /^\^[0-9A-Za-z]+/.exec(str.slice(j));
      if (m) { j += m[0].length; continue; }
    }
    break;
  }
  return j;
}
// sin/cos/tan/log/ln, with a real word boundary on both sides (never the
// "sin" in "using", the "tan" in "tangent", the "cos" in "cost") and an
// optional bracket/angle/number argument
function fmlMatchFuncAtom(str, i) {
  if (fmlIsLetter(str[i - 1])) return null;
  const m = FML_FUNC_RE.exec(str.slice(i));
  if (!m) return null;
  let j = i + m[0].length;
  if (fmlIsLetter(str[j])) return null;
  j = fmlMatchSupTail(str, j);
  if (str[j] === "(" || str[j] === "[") {
    const b = fmlMatchBracketGroup(str, j);
    if (b != null) j = b;
  } else {
    let k = j;
    if (str[k] === " ") k++;
    if (str[k] === "x" || (str[k] && FML_GREEK.includes(str[k]))) {
      if (!fmlIsLetter(str[k + 1])) j = k + 1;
    } else {
      const nm = fmlMatchNumber(str, k);
      if (nm != null) { j = nm; if (str[j] === "°") j++; }
    }
  }
  return j;
}
function fmlMatchAtomCore(str, i) {
  if (str[i] === "(" || str[i] === "[") return fmlMatchBracketGroup(str, i);
  if (str[i] === FML_PH) return i + 1;
  const fn = fmlMatchFuncAtom(str, i);
  if (fn != null) return fn;
  const num = fmlMatchNumber(str, i);
  if (num != null) return num;
  // a single letter counts as a variable atom only with a real word
  // boundary on both sides — not a letter, and not an apostrophe (a
  // contraction: don't/isn't/it's/let's, never a maths token)
  const before = str[i - 1], after = str[i + 1];
  if (fmlIsVarLetter(str[i]) && !fmlIsLetter(before) && before !== "'" && !fmlIsLetter(after) && after !== "'") return i + 1;
  return null;
}
// one atom: optional leading unary sign (only when it opens a fresh
// expression) + optional √ prefix(es) + the core + trailing sup-tail +
// optional °/%
function fmlMatchAtom(str, i, allowLeadingSign) {
  let j = i;
  if (allowLeadingSign && str[j] === "−") j++;
  while (str[j] === "√") { j++; if (str[j] === " ") j++; }
  const core = fmlMatchAtomCore(str, j);
  if (core == null) return null;
  j = fmlMatchSupTail(str, core);
  if (str[j] === "°" || str[j] === "%") j++;
  return j;
}
const FML_REL_OPS = ["≠", "≤", "≥", "≈", "=", "<", ">"];
// a relational sign, or +/−/± — the only places a piece may break, the
// sign always leading the NEW piece
function fmlMatchBreakOp(str, i) {
  let j = i;
  if (str[j] === " ") j++;
  for (const op of FML_REL_OPS) if (str.startsWith(op, j)) return { opStart: j, opEnd: j + op.length };
  if (str[j] === "−" || str[j] === "+" || str[j] === "±") return { opStart: j, opEnd: j + 1 };
  if (str[j] === "-" && str[i] === " " && str[j + 1] === " ") return { opStart: j, opEnd: j + 1 };   // a spaced ASCII " - "
  return null;
}
// never-break connectives: ·, ×, / , or plain juxtaposition (2x, 4√3)
function fmlMatchGlueThenAtom(str, i) {
  let j = i;
  if (str[j] === " ") j++;
  if (str[j] === "·" || str[j] === "×" || str[j] === "/") { j++; if (str[j] === " ") j++; }
  return fmlMatchAtom(str, j, false);
}
// one maximal expression starting exactly at i, or null
function fmlTryExpression(str, i) {
  const firstEnd = fmlMatchAtom(str, i, true);
  if (firstEnd == null) return null;
  const pieces = [{ start: i, end: firstEnd }];
  let cur = firstEnd;
  for (;;) {
    const glueEnd = fmlMatchGlueThenAtom(str, cur);
    if (glueEnd != null) { pieces[pieces.length - 1].end = glueEnd; cur = glueEnd; continue; }
    const brk = fmlMatchBreakOp(str, cur);
    if (brk) {
      let k = brk.opEnd;
      if (str[k] === " ") k++;
      const opEnd = fmlMatchAtom(str, k, false);
      if (opEnd != null) { pieces.push({ start: brk.opStart, end: opEnd }); cur = opEnd; continue; }
    }
    break;
  }
  return { end: cur, pieces };
}
// wrap every expression found in one parked (atom-placeholdered) text run
function fmlWrapExpressionsInText(text) {
  let out = "", i = 0;
  while (i < text.length) {
    const ex = fmlTryExpression(text, i);
    if (ex) {
      let inner = "";
      ex.pieces.forEach((p, idx) => {
        if (idx > 0) inner += text.slice(ex.pieces[idx - 1].end, p.start);   // exact original separator, left unwrapped (a normal breakable space)
        inner += `<span class="nowrap">${text.slice(p.start, p.end)}</span>`;
      });
      out += `<span class="fml">${inner}</span>`;
      i = ex.end;
    } else {
      out += text[i];
      i++;
    }
  }
  return out;
}
// stage 3 alone — every remaining maths expression becomes one .fml unit.
// Exported separately (besides being run inside formulaHtml below) purely
// so a harness can self-check ITS text-preservation in isolation, without
// stages 1/2's own deliberate space-for-<br> and " · "-for-<br> swaps
// getting in the way of that check.
export function formulaHtmlExpr(s) {
  if (s == null) return s;
  const str = String(s);
  let html = "";
  const segs = formulaSegments(str);
  let i = 0;
  while (i < segs.length) {
    if (segs[i].type === "tag") { html += segs[i].text; i++; continue; }
    const atoms = [];
    let parked = "";
    while (i < segs.length && segs[i].type !== "tag") {
      if (segs[i].type === "atom") { parked += FML_PH; atoms.push(segs[i].text); }
      else parked += segs[i].text;
      i++;
    }
    // a group that is ALREADY nothing but protected atom(s) — most often a
    // stage-1 .nowrap block sitting alone right after its own <br> — needs
    // no second wrap; only a group that MIXES real text with atom(s) (an
    // operator glued to a stacked fraction, say) goes through the scanner
    const isPureAtoms = atoms.length > 0 && parked === FML_PH.repeat(atoms.length);
    const wrapped = isPureAtoms ? parked : fmlWrapExpressionsInText(parked);
    let ai = 0;
    html += wrapped.replace(new RegExp(FML_PH, "g"), () => atoms[ai++]);
  }
  return html;
}

export function formulaHtml(s) {
  if (s == null) return s;
  let out = String(s);
  // 1) a trailing formula bracket moves to a new line (unchanged)
  out = out.replace(/\s\((\b(?:using|use)\b[^()]*|[^()]*[°θ±√][^()]*)\)(?=[.?!:]?(?:\s*<br>|\s*$|\s*<\/))/g, (m, inner) => `<br>${NW(`(${inner})`)}`);
  // 2) " · "-separated identities in a .formula block each get a line (unchanged)
  out = out.replace(/(<div class="formula">)([\s\S]*?)(<\/div>)/g, (m, a, body, b) => a + body.replace(/(?:\s|&nbsp;)+·(?:\s|&nbsp;)+/g, "<br>") + b);
  // 3) the general expression recogniser — every remaining maths expression
  //    becomes one .fml unit, broken only at = or before a leading sign
  return formulaHtmlExpr(out);
}
