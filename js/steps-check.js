/* ============================================================
   STEPS — the pure marking logic for the `steps` question type
   ------------------------------------------------------------
   Why this lives in its own file: the `steps` type in
   js/questions.js drives a lot of DOM (one input per sub-step,
   locking, retries), and the DECISION "was that sub-step right?"
   must be testable WITHOUT a DOM. So the DOM code calls
   checkStep(); verify-gtrig.html calls the very same function on
   plain values. One brain, two callers — a marking bug can never
   hide behind a widget.

   `given` per kind:
     mc        → the index of the option the learner tapped
     mcmulti   → a SORTED array of the option indices toggled on
                 (gt13: "pick every denominator" — one answer made of
                 several picks, so it is marked once, on Submit)
     tapcross  → a SORTED array of quadrant numbers, or the string
                 "noref" (her "no reference angle" button)
     calc      → a number off the number pad
     tokenpad  → the RAW token string off the token pad ("180°−θ")
     tapside   → the id of the side tapped ("opp" | "adj" | "hyp")
   ============================================================ */
import { answerCorrect } from "./check.js";

/* Token answers are compared as NORMALISED strings, so the learner
   can never be marked wrong for a glyph:
     • the degree sign is decoration          →  "180°−" == "180−"
     • spacing is decoration (the pad joins with a thin space)
     • an ASCII hyphen becomes the real minus  →  "180-" == "180−"
     • x and θ are the same unknown            →  "180−x" == "180−θ"
   Exported because both the pad and the harness need it. */
export function normalizeTokens(str) {
  if (str == null) return "";
  return String(str)
    .replace(/°/g, "")
    .replace(/\s+/g, "")
    .replace(/[-–—]/g, "−")
    .replace(/[xX]/g, "θ");
}

/* two index LISTS equal, order-blind? (mcmulti) — an empty pick is
   never right: it is an unfinished answer, not a wrong one, and the
   widget's Submit button stays disabled until something is chosen. */
function sameSet(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || !a.length) return false;
  const key = xs => xs.slice().sort((p, q) => p - q).join(",");
  return key(a) === key(b);
}

/* two quadrant-tick answers equal? (both sorted arrays, or "noref") */
function sameTicks(a, b) {
  if (a === "noref" || b === "noref") return a === "noref" && b === "noref";
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  const sa = a.slice().sort((p, q) => p - q).join(",");
  const sb = b.slice().sort((p, q) => p - q).join(",");
  return sa === sb;
}

/* Is this sub-step's answer right?  → true / false, nothing else.
   `step.alsoAccept` is the escape hatch her rulings need: for
   `tan x = 2` the full answer is ticks in ① and ③, but she calls the
   second quadrant line a "waste of time!" (METHODS-trig K3), so
   `[1]` is listed in alsoAccept and marked right too. */
export function checkStep(step, given) {
  if (!step) return false;
  const kind = step.kind;

  if (kind === "mc") {
    const opt = (step.options || [])[given];
    return !!(opt && opt.correct);
  }

  if (kind === "mcmulti") {
    if (sameSet(given, step.correct)) return true;
    return (step.alsoAccept || []).some(alt => sameSet(given, alt));
  }

  // doubletick: the final tap — the quadrant carrying BOTH ticks
  if (kind === "doubletick") return Number(given) === Number(step.correct);

  // sketchfill: every side typed within its tolerance — {x, y, r} → expected
  if (kind === "sketchfill") {
    if (!given || typeof given !== "object") return false;
    return (step.fields || []).every(f => Number.isFinite(given[f.key]) && answerCorrect(given[f.key], f.expected, { dp: f.dp, tol: f.tol }));
  }

  if (kind === "tapcross") {
    if (sameTicks(given, step.correct)) return true;
    return (step.alsoAccept || []).some(alt => sameTicks(given, alt));
  }

  if (kind === "calc") {
    if (!Number.isFinite(given)) return false;
    if (answerCorrect(given, step.expected, { dp: step.dp, tol: step.tol })) return true;
    return (step.alsoAccept || []).some(v => answerCorrect(given, v, { dp: step.dp, tol: step.tol }));
  }

  if (kind === "tokenpad") {
    const g = normalizeTokens(given);
    if (g === "") return false;
    if (g === normalizeTokens(step.expected)) return true;
    return (step.alsoAccept || []).some(alt => g === normalizeTokens(alt));
  }

  if (kind === "tapside") {
    if (given == null) return false;
    if (String(given) === String(step.correct)) return true;
    return (step.alsoAccept || []).some(alt => String(given) === String(alt));
  }

  return false;
}
