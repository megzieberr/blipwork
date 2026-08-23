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
// The letter class À-ÖØ-öø-ž skips × (U+00D7) and ÷ (U+00F7), which sit
// inside À-ž — `70/150 × 80/150` used to swallow the × into the denominator
// (concept-card sweep, 2026-08-23).
// Written as ONE regex literal (no string escaping to get wrong).
// Tokens may carry a decimal comma/point (0,08/12 — finance), an underscore
// (i_nom/n), super/subscript glyphs (1/x⁻ᵃ, xᵃ/yᵃ), ℓ, a combining hat
// (a/sin Â, x/sinB̂); a bracket group may be led by a short function/name
// (f(x)/g(x), sin(x)/2) and may contain HTML tags ((x<sub>1</sub> + x<sub>2</sub>)/2)
// — so the WHOLE numerator/denominator goes over the bar, never just its
// tail (WHOLE-APP SWEEP, 2026-08-23, her ruling: every fraction in every
// round is a stacked fraction).
const FRAC_RE = /(^|[^A-Za-z0-9°<\/√_,.])((?:sin|cos|tan)[²³]?\s?(?:[0-9]+(?:[.,][0-9]+)?°?|[θxαβA-ZÀ-ÖØ-öø-ž][̀-ͯ]?(?![A-Za-z])|\((?:[^()<>\/]|<[^>]*>)*\))|(?:[0-9]*[A-Za-z]{0,3})?√?\((?:[^()<>\/]|<[^>]*>|\((?:[^()<>\/]|<[^>]*>)*\))*\)|[−-]?[A-Za-z0-9θαβπℓ°²³√_¹⁰-ₜʰ-˿ᴬ-ᵪ̀-ͯ]+(?:[.,][0-9]+)?(?:\s?[θxαβA-ZÀ-ÖØ-öø-ž][̀-ͯ]?(?![A-Za-z]))?)\s*\/\s*((?:sin|cos|tan)[²³]?\s?(?:[0-9]+(?:[.,][0-9]+)?°?|[θxαβA-ZÀ-ÖØ-öø-ž][̀-ͯ]?(?![A-Za-z])|\((?:[^()<>\/]|<[^>]*>)*\))|(?:[0-9]*[A-Za-z]{0,3})?√?\((?:[^()<>\/]|<[^>]*>|\((?:[^()<>\/]|<[^>]*>)*\))*\)|[−-]?[A-Za-z0-9θαβπℓ°²³√_¹⁰-ₜʰ-˿ᴬ-ᵪ̀-ͯ]+(?:[.,][0-9]+)?(?:\s?[θxαβA-ZÀ-ÖØ-öø-ž][̀-ͯ]?(?![A-Za-z]))?)(?![\/A-Za-z0-9_²³¹⁰-ₜʰ-˿ᴬ-ᵪ])/g;
const strip = a => (a.startsWith("(") && a.endsWith(")") ? a.slice(1, -1) : a);
// PROSE slashes stay slashes: "Left/right", "add/subtract", "prism/pyramid",
// "power/root" are word pairs, not fractions. A slash between two ordinary
// words (3+ letters each) is prose — except the ratio words she really does
// write over a bar (rise/run, opposite/adjacent, sin/cos …).
const FRAC_WORD_OK = new Set(["rise/run", "opposite/adjacent", "opposite/hypotenuse", "adjacent/hypotenuse", "sin/cos", "cos/sin", "sinθ/cosθ", "change/time", "distance/time"]);
function fracIsProse(n, d) {
  const a = strip(n).replace(/^[−-]/, ""), b = strip(d);
  if (!/^[A-Za-z]+$/.test(a) || !/^[A-Za-z]+$/.test(b)) return false;
  if (a.length < 3 && b.length < 3 && !(a.length === 2 && /^[A-Z]/.test(a))) return false;   // a/b, p/q, O/H — real fractions; "Up/down" is not
  return !FRAC_WORD_OK.has((a + "/" + b).toLowerCase());
}
export function fracHtml(s) {
  if (s == null) return s;
  // built fractions are parked as tokens while the loop runs, so the "/" in
  // their closing tags can never be mistaken for another fraction bar
  const parked = [];
  let out = String(s), prev;
  for (let i = 0; i < 4 && out !== prev; i++) {
    prev = out;
    out = out.replace(FRAC_RE, (m, pre, n, d) => {
      if (fracIsProse(n, d)) return m;
      if (/^[0-9]+°$/.test(n) && /^[0-9]+°$/.test(d)) return m;            // 0°/360° — an axis label, not a fraction (tgraph)
      let sign = "", coef = "";
      if (/^[−-]/.test(n)) { sign = "−"; n = n.slice(1); }
      const cm = /^([0-9]+)(\(.*\))$/.exec(n);                              // 3(n + 1)/4 → 3 · [(n + 1) over 4]
      if (cm) { coef = cm[1]; n = cm[2]; }
      parked.push(sign + coef + stackFrac(strip(n), strip(d), ""));
      return pre + "" + (parked.length - 1) + "";
    });
  }
  // a fraction that is the WHOLE of a caret exponent — x^(2/5), 27^(−2/3),
  // (−2)^(5/3) — is a superscript fraction, not "^(" + fraction + ")"
  // (her phone screenshot, 2026-08-23: es7 read as x^(²⁄₅)). The caret and
  // its brackets go; the stacked fraction is raised and shrunk by .sf-exp.
  out = out.replace(/\^\((\d+)\)/g, (m, tok) => `<sup class="sf-exp">${tok}</sup>`);
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
        prefix) — a bracket group is ONE atom UNLESS it reads as prose
        (3+ ordinary words of 3+ letters inside it — "(There is a quick
        check available: …)"), in which case it is not an atom at all
        and is left as ordinary breakable text (session 3 fix, her /go
        ruling 2026-08-22: swallowing a prose aside whole is what pushed
        a phone page wider than its screen). A genuine maths bracket
        group, once recognised, still has nothing inside it treated as
        a break point. Atoms glue into the SAME
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
function fmlIsVarLetter(ch) { return !!ch && (/[A-Za-zÀ-ÖØ-öø-ž]/.test(ch) || FML_GREEK.includes(ch)); }   // precomposed Â/Ô/Ĉ are letters too (Â₂ = 60°)

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
// a bracket group reads as PROSE (not maths) when its inner text carries a
// run of 3+ ordinary words (3+ letters each) — "(There is a quick check
// available: …)", "(see the sketch below)". Real maths brackets never do:
// "(a − b)(a + b)", "(x + 1)(x − 4)", "(using the sine rule)" (the last is
// already caught earlier, by stage 1's own using/use rule, before stage 3
// ever sees it). A prose bracket must NOT become one opaque nowrap atom —
// swallowing it whole is exactly what pushed the phone page wider than the
// screen (bda60e1's sweep, session 3 fix, her /go ruling 2026-08-22).
// WHOLE-APP SWEEP (2026-08-23) loosened the test: "(upper boundary of the
// class ; cumulative frequency)" slipped through the old three-in-a-row
// rule because "of" is two letters. Now: two or more ordinary words of 3+
// letters ANYWHERE in the bracket, or four or more words of 2+ letters —
// with sin/cos/tan/log/ln (and their powers) not counting as words, so
// "(sin θ + cos θ)" and "(cos² x − sin² x)" stay maths.
const FML_MATHWORDS = new Set(["sin", "cos", "tan", "log", "ln", "sec", "cosec", "cot", "sqrt"]);
function fmlBracketIsProse(str, i, j) {
  const inner = str.slice(i + 1, j - 1);
  const words = (inner.match(/[A-Za-z]{2,}/g) || []).filter(w => !FML_MATHWORDS.has(w.toLowerCase()));
  const long = words.filter(w => w.length >= 3).length;
  return long >= 2 || words.length >= 4;
}
function fmlMatchNumber(str, i) {
  const m = /^(?:[0-9]+(?:[.,][0-9]+)?|[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])/.exec(str.slice(i));   // a vulgar ½ is a number too (Area = ½·MN·MP·sinM̂)
  if (!m) return null;
  // an ORDINAL suffix rides with its number: "7th", "3rd", "21st". A number
  // becomes an inline-block, and a browser may break a line right after an
  // atomic inline even with no space — so "the 7th term" printed as "7 / th"
  // on the phone (the dice build's patterns session, 2026-08-23). Fused only
  // when the suffix ends the word, so "7the…" is untouched.
  const ord = /^(?:st|nd|rd|th)(?![A-Za-z])/.exec(str.slice(i + m[0].length));
  return i + m[0].length + (ord ? ord[0].length : 0);
}
// combining diacritics (the hat on M̂, the bar on x̄) ride with their letter
const FML_COMBINING_RE = /[̀-ͯ]/;
// a SHORT letter run as a variable/name atom (WHOLE-APP SWEEP, 2026-08-23 —
// `ax² + bx + c`, `Tn = an² + bn + c`, `MN·MP` were unprotected and broke
// mid-expression on her phone). Accepted only in clear maths context, so
// English words stay prose:
//   · 1–3 letters carrying an exponent/subscript (ax², an², Tn₁)
//   · 2–3 CAPITALS — a segment/point name (MN, AB, PQR)
//   · 1–2 letters with an operator on at least one side (+ bx, = ab, MN·MP)
const FML_WORDS2 = new Set(["to", "of", "in", "on", "at", "by", "is", "it", "as", "or", "an", "if", "so", "do", "no", "be", "we", "he", "me", "my", "up", "us", "go", "am", "ok", "vs", "re"]);
function fmlMatchLetterRun(str, i) {
  if (!fmlIsVarLetter(str[i]) || fmlIsLetter(str[i - 1]) || str[i - 1] === "'") return null;
  let j = i;
  while (j < str.length && (fmlIsVarLetter(str[j]) || FML_COMBINING_RE.test(str[j]))) j++;
  if (str[j] === "'") return null;
  const run = str.slice(i, j).replace(FML_COMBINING_RE, "");
  if (run.length > 3) return null;
  if (run.length === 1) return j;                                       // the single-letter rule, as before
  if (str[j] && (FML_SUP_RE.test(str[j]) || str[j] === "^" || str[j] === FML_PH)) return j;
  if (/^[A-Z]{2,3}$/.test(run)) return j;
  if (run.length === 2 && !FML_WORDS2.has(run.toLowerCase())) {
    let p = i - 1; while (p >= 0 && str[p] === " ") p--;
    let n = j;     while (n < str.length && str[n] === " ") n++;
    const OPS = "+−±=≠<>≤≥·×/√(";
    if ((p >= 0 && OPS.includes(str[p])) || (n < str.length && "+−±=≠<>≤≥·×/)".includes(str[n]))) return j;
  }
  return null;
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
      if (str[j + 1] === "(") {                          // 2^(x+4), (1 + i/k)^(n·k) — the bracket is the exponent
        const b = fmlMatchBracketGroup(str, j + 1);
        if (b != null) { j = b; continue; }
      }
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
  if (fmlIsLetter(str[j]) && !(/[A-Z]/.test(str[j]) && !fmlIsLetter(str[j + 1]))) return null;   // "cost"/"tangent" are words; "sinM̂"/"cosA" are not
  j = fmlMatchSupTail(str, j);
  if (str[j] === "(" || str[j] === "[") {
    const b = fmlMatchBracketGroup(str, j);
    if (b != null) j = b;
  } else {
    let k = j;
    if (str[k] === " ") k++;
    if (str[k] === "x" || (str[k] && FML_GREEK.includes(str[k]))) {
      if (!fmlIsLetter(str[k + 1])) j = k + 1;
    } else if (/[A-Z]/.test(str[k] || "") && !fmlIsLetter(str[k + 1])) {
      // a capital angle name, hatted or not: sinM̂, cos A, tanB̂ (never "cost")
      j = k + 1;
      while (str[j] && FML_COMBINING_RE.test(str[j])) j++;
    } else {
      const nm = fmlMatchNumber(str, k);
      if (nm != null) { j = nm; if (str[j] === "°") j++; }
    }
  }
  return j;
}
function fmlMatchAtomCore(str, i) {
  if (str[i] === "(" || str[i] === "[") {
    const end = fmlMatchBracketGroup(str, i);
    // a prose bracket is not an atom at all — fall through to null so the
    // scanner leaves it as ordinary breakable text (a lone "(" matches
    // none of the branches below either, so this really does mean "not
    // maths here", not "try something else at the same position")
    if (end == null || fmlBracketIsProse(str, i, end)) return null;
    return end;
  }
  if (str[i] === FML_PH) return i + 1;
  const fn = fmlMatchFuncAtom(str, i);
  if (fn != null) return fn;
  const num = fmlMatchNumber(str, i);
  if (num != null) return num;
  // a short letter run as a variable/name atom — a single letter with a real
  // word boundary on both sides (not a letter, not an apostrophe: don't /
  // it's are never maths), or a 2–3 letter run in clear maths context
  // (see fmlMatchLetterRun)
  const run = fmlMatchLetterRun(str, i);
  if (run != null) return run;
  return null;
}
// one atom: optional leading unary sign (only when it opens a fresh
// expression) + optional √ prefix(es) + the core + trailing sup-tail +
// optional °/%
function fmlMatchAtom(str, i, allowLeadingSign) {
  let j = i;
  if (allowLeadingSign && str[j] === "−") j++;
  while (str[j] === "√") { j++; if (str[j] === " ") j++; }
  // ∠ABC, ∠s, △OMA, ∠ Â: the angle/triangle glyph belongs to the name after it
  // (her phone, 2026-08-23: "∠" sat at a line end with "ABC = 65°" on the next)
  if (str[j] === "∠" || str[j] === "△") { j++; if (str[j] === " ") j++; }
  const core = fmlMatchAtomCore(str, j);
  if (core == null) return null;
  j = fmlMatchSupTail(str, core);
  if (str[j] === "°" || str[j] === "%") j++;
  return j;
}
// `→ ⟹ ∴` join a worked chain (2x + 3 = 11 → x = 4) the same way `=` does:
// one unit, breakable only at the arrow when too wide for the screen
const FML_REL_OPS = ["≠", "≤", "≥", "≈", "=", "<", ">", "⟹", "→", "∴", "&gt;", "&lt;", "&ge;", "&le;", "&ne;"];   // authored HTML writes > as &gt; (her phone: "f(x) &gt; g(x)" broke at the sign)
// a relational sign, or +/−/± — the only places a piece may break, the
// sign always leading the NEW piece
function fmlMatchBreakOp(str, i) {
  let j = i;
  if (str[j] === " ") j++;
  for (const op of FML_REL_OPS) if (str.startsWith(op, j)) return { opStart: j, opEnd: j + op.length };
  if (str[j] === "−" || str[j] === "+" || str[j] === "±") return { opStart: j, opEnd: j + 1 };
  if (str[j] === ";") return { opStart: j, opEnd: j + 1, seq: true };   // a number pattern "−5 ; −10 ; −15" is one unit; may break only at a ";"
  if (str[j] === "-" && str[i] === " " && str[j + 1] === " ") return { opStart: j, opEnd: j + 1 };   // a spaced ASCII " - "
  return null;
}
// never-break connectives: ·, ×, / , or plain juxtaposition (2x, 4√3)
function fmlMatchGlueThenAtom(str, i) {
  let j = i;
  if (str[j] === " ") j++;
  if (str[j] === "·" || str[j] === "×" || str[j] === "÷" || str[j] === "/") { j++; if (str[j] === " ") j++; return fmlMatchAtom(str, j, false); }
  for (const ent of ["&times;", "&middot;", "&divide;"]) if (str.startsWith(ent, j)) { j += ent.length; if (str[j] === " ") j++; return fmlMatchAtom(str, j, false); }
  if (j === i) return fmlMatchAtom(str, j, false);                       // touching: 2x, 4√3
  // ONE space = juxtaposition, but only for things that are unmistakably
  // maths on the right: a sin/cos/tan atom, or — after a number — a short
  // letter run (½ ab, 2 ab sin C, 5 cm); never "2 of", "4 or" (stoplist)
  if (fmlMatchFuncAtom(str, j) != null) return fmlMatchAtom(str, j, false);
  const prevIsNumber = /[0-9½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞²³]/.test(str[i - 1] || "");
  if (prevIsNumber && fmlIsVarLetter(str[j])) {
    let k = j; while (k < str.length && fmlIsVarLetter(str[k])) k++;
    const run = str.slice(j, k);
    if (run.length <= 2 && !FML_WORDS2.has(run.toLowerCase()) && !fmlIsLetter(str[k]) && str[k] !== "'") return fmlMatchSupTail(str, k);
  }
  return null;
}
// a plain word (2–12 letters, combining marks allowed: x̄) with a real word
// boundary on both sides — used ONLY next to a relational sign, so "Lower =
// 20 − 18 = 2", "gradient = 0" and "x̄ > median" stay whole (concept-card
// sweep, 2026-08-23: the word and its value kept landing on different lines)
function fmlMatchWord(str, i) {
  if (!fmlIsVarLetter(str[i]) || fmlIsLetter(str[i - 1]) || str[i - 1] === "'") return null;
  let j = i;
  while (j < str.length && (fmlIsVarLetter(str[j]) || FML_COMBINING_RE.test(str[j]))) j++;
  if (str[j] === "'" || fmlIsLetter(str[j])) return null;
  const n = str.slice(i, j).replace(FML_COMBINING_RE, "").length;
  return n >= 2 && n <= 12 ? j : null;
}
// one maximal expression starting exactly at i, or null
function fmlTryExpression(str, i) {
  let firstEnd = fmlMatchAtom(str, i, true);
  if (firstEnd == null) {
    // word-led: "Lower = 20 − 18", "denominator = 0" — only when a relational
    // sign AND a real atom follow, otherwise the word is ordinary prose
    const w = fmlMatchWord(str, i);
    if (w == null) return null;
    const brk = fmlMatchBreakOp(str, w);
    if (!brk || "+−±-;".includes(str[brk.opStart])) return null;
    let k = brk.opEnd; if (str[k] === " ") k++;
    if (fmlMatchAtom(str, k, true) == null) return null;
    firstEnd = w;
  }
  const pieces = [{ start: i, end: firstEnd }];
  let cur = firstEnd;
  for (;;) {
    const glueEnd = fmlMatchGlueThenAtom(str, cur);
    if (glueEnd != null) { pieces[pieces.length - 1].end = glueEnd; cur = glueEnd; continue; }
    const brk = fmlMatchBreakOp(str, cur);
    if (brk) {
      let k = brk.opEnd;
      if (str[k] === " ") k++;
      // after a RELATIONAL sign the right-hand side may open with its own
      // unary minus — `cos(90° + x) = −sin x` is ONE expression, not two
      // (her phone: it broke straight after the bracket)
      const relational = !"+−±-".includes(str[brk.opStart]);   // (a ";" counts as relational: the next term may carry its own sign)
      const opEnd = fmlMatchAtom(str, k, relational);
      if (opEnd != null) { pieces.push({ start: brk.opStart, end: opEnd }); cur = opEnd; continue; }
      // "x̄ > median", "= undefined": a plain word closes the expression
      if (relational && str[brk.opStart] !== ";") {
        const w = fmlMatchWord(str, k);
        if (w != null) { pieces.push({ start: brk.opStart, end: w }); cur = w; break; }
      }
    }
    break;
  }
  return { end: cur, pieces };
}
// wrap every expression found in one parked (atom-placeholdered) text run
// `slice(a, b)` renders a range of `text` — by default the text itself; the
// inline-tag path below passes a slicer that puts the <b>/<i> tags back in
// and keeps every emitted chunk balanced.
function fmlWrapExpressionsInText(text, slice = (a, b) => text.slice(a, b)) {
  let out = "", i = 0, plain = i;
  const flush = (to) => { if (to > plain) out += slice(plain, to); plain = to; };
  const OPEN = "{“\"‘", CLOSE = ".,;:?!}”\"’";   // (round/square brackets stay out: a .nowrap must keep its brackets balanced — verify-wrap rule 3)
  while (i < text.length) {
    const ex = fmlTryExpression(text, i);
    if (ex) {
      // punctuation touching the expression travels with it: "x ∈ {−90°; 90°}",
      // "frequency n.", "2 ≥ x > −3, written" — an inline-block would
      // otherwise leave the full stop or comma alone on the next line, or
      // dangle the "{" at a line end (concept-card sweep, 2026-08-23)
      let first = i;
      while (first > plain && OPEN.includes(text[first - 1])) first--;
      let last = ex.end;
      while (last < text.length && CLOSE.includes(text[last])) last++;
      flush(first);
      let inner = "";
      ex.pieces.forEach((p, idx) => {
        const a = idx === 0 ? first : p.start, b = idx === ex.pieces.length - 1 ? last : p.end;
        if (idx > 0) inner += slice(ex.pieces[idx - 1].end, p.start);   // exact original separator, left unwrapped (a normal breakable space)
        inner += `<span class="nowrap">${slice(a, b)}</span>`;
      });
      out += `<span class="fml">${inner}</span>`;
      i = last; plain = i;
    } else {
      i++;
    }
  }
  flush(text.length);
  return out;
}
// INLINE formatting tags (<b>, <i>, <em>, <strong>, <u>, <mark>, plain
// <span>) are TRANSPARENT to the expression scanner (her phone, 2026-08-23:
// "f(x) > g(x)" broke after the ">" because f(x) and g(x) were each inside
// their own <b>…</b> — three text runs, three separate units). The tags are
// parked as zero-width markers, the scanner reads straight through them, and
// the slicer rebuilds every emitted chunk with the tags put back — opening
// again any tag that was already open at the chunk's start and closing any
// still open at its end, so each .nowrap piece is self-contained, valid HTML.
const FML_TAGPH = "";
const FML_INLINE_TAG_RE = /^<\/?(?:b|i|em|strong|u|mark|small|span)(?=[\s>\/])/i;
function fmlIsInlineTag(tagStr) { return FML_INLINE_TAG_RE.test(tagStr) && !isProtectedOpenTag(tagStr); }
function fmlWrapWithInlineTags(parked, tags) {
  // parked: text with FML_PH (atoms) and FML_TAGPH (inline tags) markers
  const stripped = []; const map = [];          // stripped char index → parked index
  for (let k = 0; k < parked.length; k++) { if (parked[k] !== FML_TAGPH) { map.push(k); stripped.push(parked[k]); } }
  map.push(parked.length);
  const text = stripped.join("");
  // which tags are open at each parked index (by tag NAME, in order)
  const tagName = t => (/^<\/?([a-zA-Z]+)/.exec(t) || [])[1].toLowerCase();
  const openAt = new Map();                     // parked index of a tag marker → stack snapshot BEFORE it
  const stack = []; let ti = 0;
  for (let k = 0; k < parked.length; k++) {
    if (parked[k] !== FML_TAGPH) continue;
    openAt.set(k, stack.slice());
    const t = tags[ti++];
    if (t.startsWith("</")) { const n = tagName(t); const j = stack.map(x => tagName(x)).lastIndexOf(n); if (j >= 0) stack.splice(j, 1); }
    else stack.push(t);
  }
  const stackAtParked = (k) => {                // tags open just before parked index k
    let st = [];
    for (const [pos, snap] of openAt) if (pos < k) st = snap; else break;
    // apply the tag at the last marker before k
    let last = -1; for (const pos of openAt.keys()) if (pos < k) last = pos;
    if (last >= 0) { const t = tags[[...openAt.keys()].indexOf(last)]; st = st.slice(); if (t.startsWith("</")) { const n = tagName(t); const j = st.map(x => tagName(x)).lastIndexOf(n); if (j >= 0) st.splice(j, 1); } else st.push(t); }
    return st;
  };
  const slice = (a, b) => {
    const pa = map[a], pb = map[b];
    let ti2 = 0; for (let k = 0; k < pa; k++) if (parked[k] === FML_TAGPH) ti2++;
    let body = "";
    for (let k = pa; k < pb; k++) body += parked[k] === FML_TAGPH ? tags[ti2++] : parked[k];
    const openBefore = stackAtParked(pa), openAfter = stackAtParked(pb);
    return openBefore.join("") + body + openAfter.slice().reverse().map(t => `</${tagName(t)}>`).join("");
  };
  // empty stubs left where a tag opened just before a piece ("<b></b>") or
  // a separator space sat inside a tag ("<b> </b>") — drop the tags, keep
  // the whitespace
  return fmlWrapExpressionsInText(text, slice)
    .replace(/<(b|i|em|strong|u|mark|small)>(\s*)<\/\1>/g, "$2")
    .replace(/<span(?: [^>]*)?>(\s*)<\/span>/g, "$1");
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
    if (segs[i].type === "tag" && !fmlIsInlineTag(segs[i].text)) { html += segs[i].text; i++; continue; }
    const atoms = [], tags = [];
    let parked = "";
    while (i < segs.length && (segs[i].type !== "tag" || fmlIsInlineTag(segs[i].text))) {
      if (segs[i].type === "atom") { parked += FML_PH; atoms.push(segs[i].text); }
      else if (segs[i].type === "tag") { parked += FML_TAGPH; tags.push(segs[i].text); }   // inline <b>/<i>: transparent
      else parked += segs[i].text;
      i++;
    }
    // a group that is ALREADY nothing but protected atom(s) — most often a
    // stage-1 .nowrap block sitting alone right after its own <br> — needs
    // no second wrap; only a group that MIXES real text with atom(s) (an
    // operator glued to a stacked fraction, say) goes through the scanner
    const isPureAtoms = atoms.length > 0 && parked === FML_PH.repeat(atoms.length);
    const wrapped = isPureAtoms ? parked : (tags.length ? fmlWrapWithInlineTags(parked, tags) : fmlWrapExpressionsInText(parked));
    let ai = 0;
    html += wrapped.replace(new RegExp(FML_PH, "g"), () => atoms[ai++]);
  }
  return html;
}

export function formulaHtml(s) {
  if (s == null) return s;
  let out = String(s);
  // 1) a trailing formula bracket moves to a new line (unchanged)
  //    … unless the bracket is a PROSE aside — "(use the marked cycle to
  //    find the period first)" is a sentence, not a formula; forcing it onto
  //    one unbreakable line pushed the page wider than the phone (whole-app
  //    sweep, 2026-08-23). "(using 90° − θ)" / "(using the sine rule)" still
  //    move whole.
  out = out.replace(/\s\((\b(?:using|use)\b[^()]*|[^()]*[°θ±√][^()]*)\)(?=[.?!:]?(?:\s*<br>|\s*$|\s*<\/))/g, (m, inner) =>
    (inner.length > 26 && fmlBracketIsProse(`(${inner})`, 0, inner.length + 2)) ? m : `<br>${NW(`(${inner})`)}`);   // a short "(using the sine rule)" still moves whole
  // 2) " · "-separated identities in a .formula block each get a line (unchanged)
  out = out.replace(/(<div class="formula">)([\s\S]*?)(<\/div>)/g, (m, a, body, b) => a + body.replace(/(?:\s|&nbsp;)+·(?:\s|&nbsp;)+/g, "<br>") + b);
  // 3) the general expression recogniser — every remaining maths expression
  //    becomes one .fml unit, broken only at = or before a leading sign
  return formulaHtmlExpr(out);
}
