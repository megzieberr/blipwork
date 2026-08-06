# Blip source art (Megan's originals)

These are Megan's ORIGINAL art files — sprite sheets, design images, and the logo —
backed up here 2026-08-02 because they previously existed only in the un-gitted
`homework-hub-companion` folder on her laptop. The app itself uses the processed
frames in `assets/companion/`; these are the masters they were sliced from.

House rule: this is HER art. Never redraw, regenerate, or "improve" it — use as-is
(see the sprite-slicing recipe: measure the BODY not the alpha box, one scale across
rows, curate frames by expression).

**Baby Blip is RETIRED (Megan, 2026-08-02; done 2026-08-06.)** She was unhappy with
how he looked. The companion now starts as a SMALL version of adult Blip and grows
bigger — one body design at four scales (0.60 / 0.75 / 0.88 / 1.00), which is what
`GROWTH_SCALE` in renderer.js has always done. There is no per-stage art any more,
and no code path should ever reintroduce one.

The `Baby Blip *.png` sheets stay here as ARCHIVE ONLY — do not slice them back in.
Their six derived frames (`assets/companion/anim/baby-*.png`) were deleted, and the
two baby rows were removed from `tools/slice_sprites.py`.
