/* ============================================================
   EXAM FOCUS — function-graph diagram helpers
   (EXAM-FOCUS-PLAN.md build order step 3, Functions leg, 2026-08-22
   — SESSION 1 of the four-session plan that wires the function-graph
   engine (js/engine/function-graph.js) into the exam diagram slot,
   which until today only knew the circle-geometry engine.)
   ------------------------------------------------------------
   Mirrors js/exam/circle-engine.js's OWN additive extensions
   (highlightedSpec / diagramRefIssues) for the OTHER diagram kind a
   question can now carry (`diagram.spec.type === "function"`). Kept in
   its own file rather than added to function-graph.js itself because
   that engine is shared with the live Functions chapter quests
   (js/quests/questfn*.js) — nothing exam-only belongs in it.

   A function HIGHLIGHT SET is deliberately simpler than the circle
   engine's: there are no names to resolve (a function spec's points
   are bare {x,y} pairs, not named vertices), so there is nothing to
   cross-reference — only shapes to check.

     {
       curves?:     [ { kind, …params, tone?, dash?, label?, labelAt? } ],
       points?:     [ { x, y, label?, on?, place?, dashTo? } ],
       asymptotes?: [ { x?, y?, of?, label? } ],
       shades?:     [ { x0, x1 } ],
       vlines?:     [ { x, label? } ],
       segment?:    { x, fromCurve, toCurve, label? },
       bare?:       true,
     }

   `asymptotes` (added SESSION 1b, 2026-08-22) exists for the case a base
   spec deliberately withholds the dashed guide lines because ONE part
   has to derive them — js/exam/func-hyperbola-and-exponential-2.js's
   3(a) — while every LATER part is entitled to them, and every card cut
   from those later parts states the equation in its own intro anyway.
   Like `points` it APPENDS to the base spec's own asymptotes.

   `curves` (added SESSION 2a-FIX, 2026-08-22) is what lets a REVEAL
   DRAW ITS OWN ANSWER: a shifted or reflected graph appears as a second
   curve in tone "b" carrying its own name, an axis of symmetry or a
   tangent or a family boundary appears as a `{kind:"line", dash:true,
   label}` entry. Appended curves land AFTER the base spec's own, so a
   highlight's `asymptotes[].of` / `points[].on` index into
   (base curve count + position in this array).

   `curves`/`points`/`asymptotes`/`shades`/`vlines` are APPENDED to the base
   spec's own arrays (cloned — the base spec is never mutated, same rule as the
   circle engine's highlightedSpec). `segment` REPLACES the base
   spec's segment when given (a spec only ever draws one PQ-style
   segment at a time, unlike points/shades/vlines which can stack).
   `bare: true` strips the base spec's own `points` — same meaning as
   the circle engine's bare-figure rule: a part whose job IS finding a
   marked point (a turning point, an intercept) must not have that
   point sitting on the figure already. It does NOT touch curves,
   asymptotes, or the grid — those are the honest "picture" a to-scale
   sketch always draws, exactly as the circle engine's bare flag never
   touches chords, only angle labels.
   ============================================================ */

/* Return a NEW spec with this part's highlights applied. `spec` is
   never mutated. */
export function applyFunctionHighlights(spec, hl) {
  hl = hl || {};
  const out = { ...spec };
  out.curves = (spec.curves || []).concat(hl.curves || []);
  out.points = (hl.bare ? [] : (spec.points || [])).concat(hl.points || []);
  out.asymptotes = (spec.asymptotes || []).concat(hl.asymptotes || []);
  out.shades = (spec.shades || []).concat(hl.shades || []);
  out.vlines = (spec.vlines || []).concat(hl.vlines || []);
  if (hl.segment) out.segment = hl.segment;
  return out;
}

/* Structural check for a highlight set: shapes only (arrays of numbers),
   since there are no names to resolve against the spec — unlike the
   circle engine's diagramRefIssues, this never inspects `spec` itself.
   Kept as a parameter anyway so the call site mirrors the circle
   engine's (spec, hl, label) signature. Returns a list of human-readable
   issues (empty === clean). */
export function functionRefIssues(spec, hl, label) {
  const issues = [];
  hl = hl || {};

  if (hl.bare !== undefined && typeof hl.bare !== "boolean") issues.push(`${label}.bare: must be true/false`);

  if (hl.curves !== undefined) {
    if (!Array.isArray(hl.curves)) issues.push(`${label}.curves: must be an array`);
    else hl.curves.forEach((c, i) => {
      const at = `${label}.curves[${i}]`;
      if (!c || typeof c !== "object") { issues.push(`${at}: must be an object`); return; }
      if (typeof c.kind !== "string" || !c.kind) issues.push(`${at}.kind: must be a curve kind string`);
      if (c.label !== undefined && typeof c.label !== "string") issues.push(`${at}.label: must be a string`);
      if (c.label !== undefined && typeof c.labelAt !== "number") issues.push(`${at}.labelAt: a named curve needs a numeric labelAt`);
      if (c.tone !== undefined && !["a", "b", "c"].includes(c.tone)) issues.push(`${at}.tone: must be "a", "b" or "c"`);
    });
  }

  if (hl.points !== undefined) {
    if (!Array.isArray(hl.points)) issues.push(`${label}.points: must be an array`);
    else hl.points.forEach((p, i) => {
      const at = `${label}.points[${i}]`;
      if (!p || typeof p !== "object") { issues.push(`${at}: must be an object`); return; }
      if (typeof p.x !== "number") issues.push(`${at}.x: must be a number`);
      if (typeof p.y !== "number") issues.push(`${at}.y: must be a number`);
      if (p.label !== undefined && typeof p.label !== "string") issues.push(`${at}.label: must be a string`);
    });
  }

  if (hl.asymptotes !== undefined) {
    if (!Array.isArray(hl.asymptotes)) issues.push(`${label}.asymptotes: must be an array`);
    else hl.asymptotes.forEach((a, i) => {
      const at = `${label}.asymptotes[${i}]`;
      if (!a || typeof a !== "object") { issues.push(`${at}: must be an object`); return; }
      const hasX = typeof a.x === "number", hasY = typeof a.y === "number";
      if (!hasX && !hasY) issues.push(`${at}: must have a numeric x (vertical) or y (horizontal)`);
      if (hasX && hasY) issues.push(`${at}: set x OR y, not both — one line per entry`);
      if (a.of !== undefined && typeof a.of !== "number") issues.push(`${at}.of: must be a curve index (number)`);
      if (a.label !== undefined && typeof a.label !== "string") issues.push(`${at}.label: must be a string`);
    });
  }

  if (hl.shades !== undefined) {
    if (!Array.isArray(hl.shades)) issues.push(`${label}.shades: must be an array`);
    else hl.shades.forEach((s, i) => {
      const at = `${label}.shades[${i}]`;
      if (!s || typeof s.x0 !== "number" || typeof s.x1 !== "number") issues.push(`${at}: must have numeric x0, x1`);
    });
  }

  if (hl.vlines !== undefined) {
    if (!Array.isArray(hl.vlines)) issues.push(`${label}.vlines: must be an array`);
    else hl.vlines.forEach((v, i) => {
      const at = `${label}.vlines[${i}]`;
      if (!v || typeof v.x !== "number") issues.push(`${at}: must have a numeric x`);
      else if (v.label !== undefined && typeof v.label !== "string") issues.push(`${at}.label: must be a string`);
    });
  }

  if (hl.segment !== undefined) {
    const s = hl.segment;
    const at = `${label}.segment`;
    if (!s || typeof s !== "object") issues.push(`${at}: must be an object`);
    else {
      if (typeof s.x !== "number") issues.push(`${at}.x: must be a number`);
      if (typeof s.fromCurve !== "number") issues.push(`${at}.fromCurve: must be a curve index (number)`);
      if (typeof s.toCurve !== "number") issues.push(`${at}.toCurve: must be a curve index (number)`);
      if (s.label !== undefined && typeof s.label !== "string") issues.push(`${at}.label: must be a string`);
    }
  }

  return issues;
}
