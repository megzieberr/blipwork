# Tripo sheets (Megan's originals)

Drop the raw sheets from studio.tripo3d.ai in here, exactly as downloaded —
flat magenta background, no drop shadows, no Canva, no editing.

These are the masters. The per-item transparent PNGs the app actually loads
are CUT FROM these by `tools/tripo_sheet.py` into
`assets/companion/items/`, and are regenerable at any time.

## Wave 1 (2026-08-05)

| sheet | items, in reading order |
|---|---|
| effects | `spark-halo`, `shadow-crown`, `light-ring` |
| hats + eyes | `royal-crown`, `cyber-visor`, `eye-mask` |
| back + wings | `back-sword`, `gold-wings`, `dragon-wings` |
| (sheet 1, needs redoing on magenta) | `wizard-hat`, `flame-ring`, `crystal-orbit` |

Sheet 1 was generated on the painted checkerboard background before the
magenta trick; the keyer only handles a SOLID background, so that one wants
regenerating rather than rescuing.

Run, one line per sheet — names must be in left-to-right, top-to-bottom order:

```
python tools/tripo_sheet.py "art-source/tripo/effects.png" --names spark-halo,shadow-crown,light-ring
```

Run it with no `--names` first if you want to check it found the right number
of items before writing anything.
