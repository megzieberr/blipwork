"""Generate the PWA app icons — a near-black rounded square with a white pi.
Run: python tools/make_icons.py  (writes the PNGs into the project root)."""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
BG = (11, 13, 20, 255)       # near-black "chalkboard"
WHITE = (244, 248, 255, 255)
GLYPH = "π"  # π

def font_for(size):
    for path in ("C:/Windows/Fonts/seguisb.ttf", "C:/Windows/Fonts/segoeui.ttf",
                 "C:/Windows/Fonts/arialbd.ttf", "C:/Windows/Fonts/arial.ttf"):
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            pass
    return ImageFont.load_default()

def make(size, name, *, maskable=False, glyph_frac=0.6):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if maskable:
        d.rectangle([0, 0, size, size], fill=BG)               # full bleed for masking
    else:
        d.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * 0.22), fill=BG)
    f = font_for(int(size * glyph_frac))
    bbox = d.textbbox((0, 0), GLYPH, font=f)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((size - w) / 2 - bbox[0], (size - h) / 2 - bbox[1]), GLYPH, font=f, fill=WHITE)
    img.save(os.path.join(ROOT, name))
    print("wrote", name)

make(192, "icon-192.png", glyph_frac=0.64)
make(512, "icon-512.png", glyph_frac=0.64)
make(512, "icon-512-maskable.png", maskable=True, glyph_frac=0.5)    # smaller glyph inside the safe zone
make(180, "apple-touch-icon.png", maskable=True, glyph_frac=0.62)    # Apple applies its own rounded mask
