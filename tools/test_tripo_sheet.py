"""Tests for tripo_sheet.py — run: python tools/test_tripo_sheet.py

Builds synthetic sheets that mimic Megan's real Tripo output and asserts the
keyer recovers them. Two backgrounds are exercised, and the second one is the
important one:

  A. exact #FF00FF, noise-free — the ideal case.
  B. rgb(253,16,248) with per-pixel noise and a faint gradient — what the
     generator ACTUALLY produces. Case A passed while case B keyed the whole
     sheet as one solid rectangle, because a background channel sitting two
     units from a rail makes that channel's bound divide by 2. Keep case B.

Each item is compared against the known truth at its own detected box, so
nothing depends on guessing where the tool cropped.
"""
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import tripo_sheet as T  # noqa: E402

W, H = 900, 400
NAMES = ["gold-disc", "dark-mask", "glow-ring"]
# a solid mid-tone (under-reads its own alpha), a near-black (must not go
# see-through), and a soft glow ring (must keep its falloff, and its HOLE
# must stay transparent).
ITEMS = [
    (lambda xx, yy: (((xx - 150) ** 2 + (yy - 200) ** 2) < 90 ** 2).astype(float), (240, 200, 120)),
    (lambda xx, yy: ((np.abs(xx - 450) < 80) & (np.abs(yy - 200) < 55)).astype(float), (28, 30, 46)),
    (lambda xx, yy: np.maximum(
        np.clip(1.0 - np.abs(np.hypot(xx - 750.0, yy - 200.0) - 60) / 14.0, 0, 1),
        np.clip(1.0 - np.abs(np.hypot(xx - 750.0, yy - 200.0) - 60) / 55.0, 0, 1) * 0.45),
     (222, 244, 255)),
]


def build_sheet(bg_field):
    yy, xx = np.mgrid[0:H, 0:W]
    canvas = bg_field.copy()
    truth_a = np.zeros((H, W))
    truth_f = np.zeros((H, W, 3))
    for mask_fn, colour in ITEMS:
        m = mask_fn(xx, yy)
        col = np.array(colour, dtype=np.float64)[None, None, :]
        canvas = canvas * (1 - m[..., None]) + col * m[..., None]
        hit = m > truth_a
        truth_a[hit] = m[hit]
        truth_f[hit] = np.array(colour, dtype=np.float64)
    return canvas, truth_a, truth_f


def clean_bg():
    f = np.zeros((H, W, 3))
    f[:, :] = (255, 0, 255)
    return f


def realistic_bg(seed=7):
    """Near-rail base + per-pixel noise + a faint vertical gradient."""
    rng = np.random.default_rng(seed)
    f = np.zeros((H, W, 3))
    f[:, :] = (253, 16, 248)
    f += np.linspace(-3, 3, H)[:, None, None]
    f += rng.normal(0, 2.0, (H, W, 3))
    return np.clip(f, 0, 255)


def run_case(label, bg_field, tmp, fails):
    canvas, truth_a, truth_f = build_sheet(bg_field)
    sheet = os.path.join(tmp, f"{label}.png")
    Image.fromarray(canvas.round().astype(np.uint8), "RGB").save(sheet)
    out = os.path.join(tmp, label + "-out")

    res = subprocess.run([sys.executable, os.path.join(HERE, "tripo_sheet.py"), sheet,
                          "--names", ",".join(NAMES), "--out", out, "--max", "0", "--pad", "0"],
                         capture_output=True, text=True)
    print(res.stdout.strip())
    if res.returncode != 0:
        fails.append(f"[{label}] tool exited {res.returncode}: {res.stderr.strip()}")
        return

    rgb = np.asarray(Image.open(sheet).convert("RGB"))
    bg, border, spread = T.detect_background(rgb)
    dead = T.noise_floor(border, bg, spread)
    raw = T.alpha_from_background(rgb, bg, spread)
    a_tool, _ = T.resolve(rgb, bg, np.where(raw <= dead, 0.0, raw))
    boxes, _ = T.find_items(a_tool, 12, 24)
    if len(boxes) != 3:
        fails.append(f"[{label}] split into {len(boxes)} items, expected 3")
        return

    for name, (x0, y0, x1, y1) in zip(NAMES, boxes):
        im = np.asarray(Image.open(os.path.join(out, name + ".png")).convert("RGBA")).astype(float)
        ta, tf = truth_a[y0:y1 + 1, x0:x1 + 1], truth_f[y0:y1 + 1, x0:x1 + 1]
        if im.shape[:2] != ta.shape:
            fails.append(f"[{label}] {name}: crop {im.shape[:2]} != truth {ta.shape}")
            continue
        got_a = im[..., 3] / 255.0
        a_err = np.abs(got_a - ta).max()
        vis = ta > 0.35
        c_err = np.abs(im[..., :3][vis] - tf[vis]).max() if vis.any() else 0.0
        comp = bg_field[y0:y1 + 1, x0:x1 + 1] * (1 - got_a[..., None]) + im[..., :3] * got_a[..., None]
        r_err = np.abs(comp - canvas[y0:y1 + 1, x0:x1 + 1]).max()
        print(f"  {name:<11} alpha {a_err:.3f}  colour {c_err:5.1f}  recomposite {r_err:5.1f}")

        # Recompositing over the original background must be near-exact for
        # every item; that holds however the opaque/translucent ambiguity is
        # resolved. The limits are the 8-BIT FORMAT's own floor rather than
        # slack in the method: at ~10% opacity the unmixed colour is scaled
        # by 1/alpha ≈ 10, so half a unit of rounding in a stored channel
        # reappears as ~5. Solid items (asserted separately below) are exact.
        if r_err > (8 if label == "clean" else 16):
            fails.append(f"[{label}] {name}: recomposite off by {r_err:.1f}")
        # Solid items must come back essentially exactly. The glow legitimately
        # cannot (see OPAQUE_LO/HI in the tool) — it only has to stay soft.
        if name != "glow-ring":
            if a_err > (0.02 if label == "clean" else 0.10):
                fails.append(f"[{label}] {name}: alpha off by {a_err:.3f}")
            if c_err > (4 if label == "clean" else 18):
                fails.append(f"[{label}] {name}: colour off by {c_err:.1f}")

    g = np.asarray(Image.open(os.path.join(out, "gold-disc.png")).convert("RGBA"))
    if g[g.shape[0] // 2, g.shape[1] // 2][3] != 255:
        fails.append(f"[{label}] opaque gold did not reach alpha 255")
    d = np.asarray(Image.open(os.path.join(out, "dark-mask.png")).convert("RGBA"))
    if d[d.shape[0] // 2, d.shape[1] // 2][3] != 255:
        fails.append(f"[{label}] dark item is see-through in the middle")

    gl = np.asarray(Image.open(os.path.join(out, "glow-ring.png")).convert("RGBA")).astype(int)
    hole = gl[gl.shape[0] // 2, gl.shape[1] // 2][3]
    partial = ((gl[..., 3] > 12) & (gl[..., 3] < 200)).sum()
    lit = gl[..., 3] > 40
    pink = (lit & ((gl[..., 0] - gl[..., 1]) > 60) & ((gl[..., 2] - gl[..., 1]) > 60)).sum()
    print(f"  glow: {partial} partial px, {pink} strongly pink, hole alpha {hole}")
    # The HOLE of the ring is background and must stay transparent. Filling
    # interior holes — the obvious way to stop dark items going see-through —
    # turns every ring effect into a solid disc and closes the eye mask's eyes.
    if hole > 20:
        fails.append(f"[{label}] the ring's hole was filled in (alpha {hole})")
    if partial < 500:
        fails.append(f"[{label}] soft glow flattened ({partial} partial px)")
    if pink > 0:
        fails.append(f"[{label}] {pink} fringe px came out strongly pink")


def main():
    fails = []
    with tempfile.TemporaryDirectory() as tmp:
        run_case("clean", clean_bg(), tmp, fails)
        run_case("realistic", realistic_bg(), tmp, fails)
    print()
    for f in fails:
        print("FAIL:", f)
    if fails:
        return 1
    print("ALL CHECKS PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
