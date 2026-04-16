#!/usr/bin/env python3
"""Optimize client-supplied large JPEGs into web-ready JPEG + WebP derivatives.

Usage (per image):

    python optimize-images.py \
        --source "path/to/source.jpg" \
        --name slug-name \
        --out-dir "path/to/img" \
        --aspect 16:9 \
        --quality 80

Produces (per source file) at widths 800w / 1200w / 1600w:
  - <name>.jpg              (1200w JPEG fallback, quality <quality>+2, metadata stripped)
  - <name>-800.webp         (800w WebP)
  - <name>-1200.webp        (1200w WebP)
  - <name>-1600.webp        (1600w WebP)

Source is center-cropped to the requested aspect before resize.
Metadata (EXIF / GPS / software tags) is stripped on output.

Targets (general):
  - JPEG fallback under 200 KB
  - WebP 1600w under 250 KB, 1200w under 150 KB, 800w under 80 KB

Targets are advisory. Use --quality to tune per image.
"""

import argparse
from pathlib import Path

from PIL import Image, ImageOps


def center_crop_to_aspect(img: Image.Image, target_aspect: float) -> Image.Image:
    w, h = img.size
    current_aspect = w / h
    if abs(current_aspect - target_aspect) < 0.01:
        return img
    if current_aspect > target_aspect:
        new_w = int(h * target_aspect)
        left = (w - new_w) // 2
        return img.crop((left, 0, left + new_w, h))
    new_h = int(w / target_aspect)
    top = (h - new_h) // 2
    return img.crop((0, top, w, top + new_h))


def strip_metadata(img: Image.Image) -> Image.Image:
    clean = Image.new(img.mode, img.size)
    clean.putdata(list(img.getdata()))
    return clean


def parse_aspect(spec: str) -> float:
    aw, ah = spec.split(":")
    return int(aw) / int(ah)


def height_for(width: int, aspect: float) -> int:
    return int(round(width / aspect))


def optimize(
    source: Path,
    name: str,
    out_dir: Path,
    aspect: float,
    quality: int,
) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)

    img = Image.open(source)
    img = ImageOps.exif_transpose(img)
    img = img.convert("RGB")
    img = center_crop_to_aspect(img, aspect)
    img = strip_metadata(img)

    widths = [800, 1200, 1600]

    jpeg_w = 1200
    jpeg_h = height_for(jpeg_w, aspect)
    jpeg_path = out_dir / f"{name}.jpg"
    jpeg_copy = img.resize((jpeg_w, jpeg_h), Image.Resampling.LANCZOS)
    jpeg_copy.save(
        jpeg_path,
        format="JPEG",
        quality=min(quality + 2, 90),
        optimize=True,
        progressive=True,
    )

    for w in widths:
        h = height_for(w, aspect)
        webp_path = out_dir / f"{name}-{w}.webp"
        webp_copy = img.resize((w, h), Image.Resampling.LANCZOS)
        webp_copy.save(
            webp_path,
            format="WEBP",
            quality=quality,
            method=6,
        )

    print(f"\n{name}  (aspect {aspect:.3f}, quality {quality}):")
    print(f"  {jpeg_path.name:40s} {jpeg_path.stat().st_size // 1024:6d} KB  {jpeg_w}x{jpeg_h}")
    for w in widths:
        p = out_dir / f"{name}-{w}.webp"
        h = height_for(w, aspect)
        print(f"  {p.name:40s} {p.stat().st_size // 1024:6d} KB  {w}x{h}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", required=True, help="Path to source JPEG")
    parser.add_argument("--name", required=True, help="Output slug, e.g. hero-home")
    parser.add_argument("--out-dir", required=True, help="Output directory")
    parser.add_argument("--aspect", default="3:2", help="Aspect WxH, e.g. 16:9 or 3:2 or 8:3")
    parser.add_argument("--quality", type=int, default=80, help="WebP quality (JPEG uses quality+2)")
    args = parser.parse_args()
    optimize(
        Path(args.source),
        args.name,
        Path(args.out_dir),
        parse_aspect(args.aspect),
        args.quality,
    )


if __name__ == "__main__":
    main()
