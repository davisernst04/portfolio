"""Bake soft theme-colored aurora textures; requires Pillow, not a runtime filter."""

import math
from pathlib import Path

from PIL import Image


OUTPUT = Path(__file__).resolve().parents[1] / "public/photos/optimized"
SIZE = (480, 320)
# Match the existing navy/cream foreground tokens in globals.css.
COLORS = {"light": (10, 25, 47), "dark": (250, 243, 224)}


def smoothstep(value: float) -> float:
    value = min(1, max(0, value))
    return value * value * (3 - 2 * value)


def alpha_channel(masked: bool) -> Image.Image:
    width, height = SIZE
    pixels = bytearray(width * height)
    for y in range(height):
        for x in range(width):
            # Smooth diagonal bands and the edge fade are rasterized once here,
            # rather than recomputed through blur/blending/masks on every frame.
            wave = (0.5 + 0.5 * math.cos((x + y * 0.36) / (width * 0.3125) * math.tau)) ** 2
            fade = 1.0
            if masked:
                distance = math.hypot((x - width) / width, y / (height * 1.3))
                fade = max(0, 1 - distance / 1.4) ** 1.2
                # Leave transparent margins through the full drift range so
                # the viewport layer never reveals a hard rectangular edge.
                fade *= smoothstep((x / width - 0.18) / 0.2)
                fade *= smoothstep((0.86 - y / height) / 0.26)
            pixels[y * width + x] = round(255 * 0.17 * wave * fade)
    return Image.frombytes("L", SIZE, bytes(pixels))


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for masked in (True, False):
        alpha = alpha_channel(masked)
        suffix = "" if masked else "-flat"
        for theme, color in COLORS.items():
            texture = Image.new("RGBA", SIZE, (*color, 0))
            texture.putalpha(alpha)
            target = OUTPUT / f"aurora-{theme}{suffix}.webp"
            texture.save(target, "WEBP", lossless=True, method=6)
            print(f"{target.name}: {target.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
