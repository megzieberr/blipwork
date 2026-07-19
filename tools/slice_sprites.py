"""Slice Megan's GPT sprite sheets into the renderer's per-frame PNGs.

Her sheets come out of GPT as one 1536x1024 image holding one or more
labelled ROWS of 4-5 frames, on a TRUE alpha background (the dark blue
haze you see in a viewer lives in the RGB channels but is masked out --
verified, do not "fix" it or ask for re-exports; see the memory note).

Each output frame is canvased to 480x600 and GROUND-ALIGNED so the
frames cycle without the body jittering:
  * every frame in a row is scaled by ONE shared factor (never per-frame
    fit -- that is what makes a loop wobble),
  * the row's bottom edge lands on the same baseline as the existing
    base body, so a loop reads as one character breathing in place.

Run:  python tools/slice_sprites.py
Writes into assets/companion/anim/ (and assets/companion/ for statics).
"""
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, ".."))
SRC = os.path.normpath(os.path.join(ROOT, "..", "homework-hub-companion", "images"))
OUT = os.path.join(ROOT, "assets", "companion", "anim")

# Canvas + content box copied from the existing frames so new rows drop
# straight in beside them: blip-base-blue.png is 480x600 with its content
# sitting at (8, 90)-(471, 531).
CANVAS_W, CANVAS_H = 480, 600
BOX_W, BOX_H = 463, 441
GROUND_Y = 531          # bottom of the content, in canvas space

ALPHA_ON = 40           # a pixel counts as "ink" above this alpha
COL_GAP = 6             # blank columns that separate two frames


def bands(mask_counts, min_run, gap_max):
    """Group indices whose ink-count is non-trivial into runs."""
    out, start, blank = [], None, 0
    for i, v in enumerate(mask_counts):
        if v > 2:
            if start is None:
                start = i
            blank = 0
        elif start is not None:
            blank += 1
            if blank > gap_max:
                if i - blank - start >= min_run:
                    out.append((start, i - blank))
                start, blank = None, 0
    if start is not None and len(mask_counts) - start >= min_run:
        out.append((start, len(mask_counts)))
    return out


def split_row(sheet, y0, y1, expect):
    """Cut one labelled row of the sheet into `expect` frame images."""
    row = sheet.crop((0, y0, sheet.width, y1))
    a = row.getchannel("A")
    cols = [0] * row.width
    px = a.load()
    for x in range(row.width):
        c = 0
        for y in range(row.height):
            if px[x, y] > ALPHA_ON:
                c += 1
        cols[x] = c
    runs = bands(cols, min_run=40, gap_max=COL_GAP)
    if len(runs) != expect:
        raise SystemExit(
            "row y%d-%d: found %d frames, expected %d (runs=%s)"
            % (y0, y1, len(runs), expect, runs)
        )
    return [row.crop((x0, 0, x1, row.height)) for x0, x1 in runs]


def emit(frames, name, start=1):
    """Scale a row by one shared factor, ground-align, write the PNGs."""
    boxes = [f.getchannel("A").getbbox() for f in frames]
    trimmed = [f.crop(b) for f, b in zip(frames, boxes)]
    widest = max(t.width for t in trimmed)
    tallest = max(t.height for t in trimmed)
    scale = min(BOX_W / widest, BOX_H / tallest)   # ONE factor for the row

    os.makedirs(OUT, exist_ok=True)
    for i, t in enumerate(trimmed):
        w, h = max(1, round(t.width * scale)), max(1, round(t.height * scale))
        img = t.resize((w, h), Image.LANCZOS)
        canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
        canvas.paste(img, ((CANVAS_W - w) // 2, GROUND_Y - h), img)
        path = os.path.join(OUT, "%s-%d.png" % (name, i + start))
        canvas.save(path)
        print("wrote", os.path.relpath(path, ROOT), "(%dx%d)" % (w, h))


# ---- the rows we actually want -------------------------------------------
# y-bands were measured off each sheet's alpha row-profile; the title text
# and the numbered circles are separate bands and are simply not listed.
JOBS = [
    # (sheet filename, y0, y1, frame count, output name)
    # "Recovering Blip 2.png" supersedes "Recovering Blip.png": same
    # silhouette, but a clean open/blink/open/blink rhythm and no stray
    # sweat drop in frame 4 (the first row's only real defect). The older
    # sheet is left in images/ as history.
    ("Recovering Blip 2.png", 344, 580, 4, "recovering"),
    ("Winking blip.png", 345, 568, 4, "wink"),
]

if __name__ == "__main__":
    for fname, y0, y1, n, name in JOBS:
        sheet = Image.open(os.path.join(SRC, fname)).convert("RGBA")
        print("--", fname, "row y%d-%d ->" % (y0, y1), name)
        emit(split_row(sheet, y0, y1, n), name)
