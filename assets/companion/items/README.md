# Tripo accessory PNGs

Transparent per-item art for the PNG accessories in
`js/companion/renderer.js` (the entries that carry `img:` instead of `svg:`).

**Generated, never hand-edited.** Each file is cut out of one of Megan's
Tripo sheets in `art-source/tripo/` by:

```
python tools/tripo_sheet.py "art-source/tripo/<sheet>.png" --names a,b,c
```

Filenames must match the `img` values in renderer.js exactly; `verify-store.html`
fails if any are missing (the renderer itself drops a layer whose image 404s,
so a missing file is otherwise silent).

Sheets are generated on a flat magenta (#FF00FF) background with no drop
shadows — Tripo's image tool paints a fake checkerboard rather than emitting
real alpha, so the background is keyed out here instead. See the tool's
docstring for the details, and `tools/test_tripo_sheet.py` for its tests.
