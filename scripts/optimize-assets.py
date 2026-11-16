"""Regenerate web assets: python -m pip install Pillow 'fonttools[woff]' first."""
from pathlib import Path

from fontTools import subset
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

options = subset.Options()
options.flavor = "woff2"
font = subset.load_font(str(PUBLIC / "fonts/times.ttf"), options)
subsetter = subset.Subsetter(options=options)
# Latin text, punctuation, and arrows used by the portfolio.
subsetter.populate(unicodes=[*range(0x100), *range(0x2000, 0x2070), 0x2192, 0x2197, 0x2212])
subsetter.subset(font)
subset.save_font(font, str(PUBLIC / "fonts/times-latin.woff2"), options)

output = PUBLIC / "photos/optimized"
output.mkdir(exist_ok=True)
for filename in [
    "ascendume.png",
    "profile.JPG",
    "typescript_gameboy_emulator.png",
    "RTGA.jpg",
    "shadow_basketball.jpg",
    "managy.png",
]:
    source = PUBLIC / "photos" / filename
    image = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
    if filename == "profile.JPG":
        # Match the existing centered, square object-cover crop before resizing.
        image = ImageOps.fit(image, (1536, 1536), method=Image.Resampling.LANCZOS)
    else:
        image.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
    target = output / f"{source.stem.lower()}.webp"
    image.save(target, "WEBP", quality=90, method=6)
    print(f"{source.name}: {source.stat().st_size:,} -> {target.stat().st_size:,} bytes")
