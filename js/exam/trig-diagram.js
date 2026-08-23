/* ============================================================
   EXAM FOCUS — trig-graph diagram helpers
   (EXAM-BUILD-DAY.md, session 0 plumbing, 2026-08-23 — Trig Graphs
   joins Exam Focus, so the exam diagram slot has to know a THIRD engine:
   js/engine/trig-graph.js.)
   ------------------------------------------------------------
   The exact same shape as js/exam/function-diagram.js, one engine over:
   a small glue module that turns a part's HIGHLIGHT SET into a new spec
   for `diagram.spec.type === "trigg"`, plus a structural checker the
   validator (js/exam/_schema.js) calls before it ever renders anything.

   Kept out of js/engine/trig-graph.js itself for the same reason
   function-diagram.js is kept out of function-graph.js: that engine is
   SHARED with the live Trig Graphs quests (js/quests/questtg*.js), and
   nothing exam-only belongs in it.

   A trig highlight set is deliberately as simple as the function one —
   a trig spec's points are bare {x, y} pairs, not named vertices, so
   there is nothing to resolve, only shapes to check:

     {
       curves?:    [ { fn, a, b, p, q, tone?, dash?, label?, labelAt? } ],
       points?:    [ { x, y, label?, on?, open?, dashTo?, place? } ],
       shades?:    [ { x0, x1 } ],
       vlines?:    [ { x, label? } ],
       hlines?:    [ { y, label? } ],
       midline?:   { y },
       hmeasure?:  { x0, x1, y, label? },
       vmeasure?:  { x, y0, y1, label? },
       bare?:      true,
     }

   APPEND vs REPLACE, and why the two groups differ:

     · `curves` / `points` / `shades` / `vlines` / `hlines` are APPENDED
       to the base spec's own (cloned — the base spec is never mutated,
       same rule as the circle and function engines). You can stack any
       number of them, so appending is the only sane meaning.
     · `midline` / `hmeasure` / `vmeasure` REPLACE the base spec's. The
       engine only ever draws ONE of each (one dashed y = q line, one
       horizontal span arrow, one vertical span arrow), so "add another"
       has no meaning — a part that wants a different period arrow wants
       THE period arrow to be somewhere else.

   THE INDEX RULE, exactly as function-diagram.js documents it: appended
   `curves` land AFTER the base spec's own, so a highlight point's
   `on: <curve index>` counts (base curve count + position in this
   array). A reveal that draws a second graph as curve index 2 when the
   base spec has two curves is pointing at its own first appended curve.

   `bare: true` strips the base spec's own `points` — the bare-figure
   rule again: a part whose job IS finding a marked point (a maximum, an
   intersection, an x-intercept) must not have it sitting on the figure
   already. It does NOT touch curves, the midline, tan asymptotes, the
   grid or the axes — those are the honest picture a to-scale sketch
   always draws.
   ============================================================ */

/* Return a NEW spec with this part's highlights applied. `spec` is
   never mutated. */
export function applyTrigHighlights(spec, hl) {
  hl = hl || {};
  const out = { ...spec };
  out.curves = (spec.curves || []).concat(hl.curves || []);
  out.points = (hl.bare ? [] : (spec.points || [])).concat(hl.points || []);
  out.shades = (spec.shades || []).concat(hl.shades || []);
  out.vlines = (spec.vlines || []).concat(hl.vlines || []);
  out.hlines = (spec.hlines || []).concat(hl.hlines || []);
  if (hl.midline) out.midline = hl.midline;
  if (hl.hmeasure) out.hmeasure = hl.hmeasure;
  if (hl.vmeasure) out.vmeasure = hl.vmeasure;
  return out;
}

/* Structural check for a highlight set: shapes only (numbers, strings,
   booleans), since there are no names to resolve against the spec —
   unlike the circle engine's diagramRefIssues, this never inspects
   `spec` itself. Kept as a parameter anyway so the call site mirrors the
   other two engines' (spec, hl, label) signature. Returns a list of
   human-readable issues (empty === clean).

   Everything NUMERIC about where a line or a band actually falls is left
   to js/engine/trig-graph.js's own verifyTrig, which measures the
   rendered spec — the same split function-diagram.js uses. */
export function trigRefIssues(spec, hl, label) {
  const issues = [];
  hl = hl || {};

  if (hl.bare !== undefined && typeof hl.bare !== "boolean") issues.push(`${label}.bare: must be true/false`);

  if (hl.curves !== undefined) {
    if (!Array.isArray(hl.curves)) issues.push(`${label}.curves: must be an array`);
    else hl.curves.forEach((c, i) => {
      const at = `${label}.curves[${i}]`;
      if (!c || typeof c !== "object") { issues.push(`${at}: must be an object`); return; }
      if (!["sin", "cos", "tan"].includes(c.fn)) issues.push(`${at}.fn: must be "sin", "cos" or "tan" (got "${c && c.fn}")`);
      if (c.label !== undefined && typeof c.label !== "string") issues.push(`${at}.label: must be a string`);
      if (c.label !== undefined && typeof c.labelAt !== "number") issues.push(`${at}.labelAt: a named curve needs a numeric labelAt`);
      if (c.tone !== undefined && !["a", "b"].includes(c.tone)) issues.push(`${at}.tone: must be "a" or "b"`);
    });
  }

  if (hl.points !== undefined) {
    if (!Array.isArray(hl.points)) issues.push(`${label}.points: must be an array`);
    else hl.points.forEach((p, i) => {
      const at = `${label}.points[${i}]`;
      if (!p || typeof p !== "object") { issues.push(`${at}: must be an object`); return; }
      if (typeof p.x !== "number") issues.push(`${at}.x: must be a number (degrees)`);
      if (typeof p.y !== "number") issues.push(`${at}.y: must be a number`);
      if (p.label !== undefined && typeof p.label !== "string") issues.push(`${at}.label: must be a string`);
      if (p.on !== undefined && typeof p.on !== "number" && !Array.isArray(p.on)) issues.push(`${at}.on: must be a curve index (number) or an array of them`);
    });
  }

  if (hl.shades !== undefined) {
    if (!Array.isArray(hl.shades)) issues.push(`${label}.shades: must be an array`);
    else hl.shades.forEach((s, i) => {
      const at = `${label}.shades[${i}]`;
      if (!s || typeof s.x0 !== "number" || typeof s.x1 !== "number") issues.push(`${at}: must have numeric x0, x1 (degrees)`);
      else if (!(s.x1 > s.x0)) issues.push(`${at}: x1 must be greater than x0 (a band has a left edge and a right edge)`);
    });
  }

  if (hl.vlines !== undefined) {
    if (!Array.isArray(hl.vlines)) issues.push(`${label}.vlines: must be an array`);
    else hl.vlines.forEach((v, i) => {
      const at = `${label}.vlines[${i}]`;
      if (!v || typeof v.x !== "number") issues.push(`${at}: must have a numeric x (degrees)`);
      else if (v.label !== undefined && typeof v.label !== "string") issues.push(`${at}.label: must be a string`);
    });
  }

  if (hl.hlines !== undefined) {
    if (!Array.isArray(hl.hlines)) issues.push(`${label}.hlines: must be an array`);
    else hl.hlines.forEach((h, i) => {
      const at = `${label}.hlines[${i}]`;
      if (!h || typeof h.y !== "number") issues.push(`${at}: must have a numeric y`);
      else if (h.label !== undefined && typeof h.label !== "string") issues.push(`${at}.label: must be a string`);
    });
  }

  if (hl.midline !== undefined) {
    const at = `${label}.midline`;
    if (!hl.midline || typeof hl.midline !== "object" || typeof hl.midline.y !== "number") issues.push(`${at}: must be { y: <number> }`);
  }

  if (hl.hmeasure !== undefined) {
    const m = hl.hmeasure, at = `${label}.hmeasure`;
    if (!m || typeof m !== "object") issues.push(`${at}: must be an object`);
    else {
      if (typeof m.x0 !== "number") issues.push(`${at}.x0: must be a number (degrees)`);
      if (typeof m.x1 !== "number") issues.push(`${at}.x1: must be a number (degrees)`);
      if (typeof m.y !== "number") issues.push(`${at}.y: must be a number (the height the arrow is drawn at)`);
      if (m.label !== undefined && typeof m.label !== "string") issues.push(`${at}.label: must be a string`);
    }
  }

  if (hl.vmeasure !== undefined) {
    const m = hl.vmeasure, at = `${label}.vmeasure`;
    if (!m || typeof m !== "object") issues.push(`${at}: must be an object`);
    else {
      if (typeof m.x !== "number") issues.push(`${at}.x: must be a number (degrees)`);
      if (typeof m.y0 !== "number") issues.push(`${at}.y0: must be a number`);
      if (typeof m.y1 !== "number") issues.push(`${at}.y1: must be a number`);
      if (m.label !== undefined && typeof m.label !== "string") issues.push(`${at}.label: must be a string`);
    }
  }

  return issues;
}
