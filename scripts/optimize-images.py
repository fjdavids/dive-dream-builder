#!/usr/bin/env python3
"""
Generates responsive, compressed image variants that the site serves via
<picture>/srcset. Outputs are committed to the repo (no build-time image
processing, so the Hostinger CI build stays dependency-free).

Run manually after replacing a source photo:
    python3 scripts/optimize-images.py

Outputs:
  src/assets/hero/<name>-d<width>.{avif,webp}   desktop/tablet (original ratio)
  src/assets/hero/<name>-m<width>.{avif,webp}   mobile (centre 3:4 crop, same
                                                framing object-cover shows)
  src/assets/responsive/<name>-<width>.webp     section + card photos
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src" / "assets"
HERO_OUT = ASSETS / "hero"
RESP_OUT = ASSETS / "responsive"

HERO = [
    "snorkeling-turtle",
    "reef-dive-divelife",
    "family-scuba-divelife",
    "luxury-catamaran-new",
    "seabob-action-divelife",
]
HERO_DESKTOP_WIDTHS = [960, 1440, 1920]
HERO_MOBILE_WIDTHS = [480, 720, 1000]

# Photos referenced by src/data/imageMap.ts + the Home facilities photo.
RESPONSIVE = [
    "snorkeling-turtle", "tres-rios-snorkel-divelife", "night-snorkeling",
    "dsd-discover-scuba-diver", "local-dive-divelife", "padi-scuba-diver-divelife",
    "padi-open-water-divelife", "scuba-kids-divelife", "pool-lesson",
    "hobie-sailing", "hobie-sailing-snorkel-combo", "sailing-lessons-divelife",
    "luxury-catamaran", "jetski", "seabob-action-divelife", "surface-supply-snuba",
    "cenote-diving-new", "reef-snorkel-divelife", "cenote-family-snorkel",
    "manatee-snorkeling-divelife", "stand-up-paddle-board", "fishing-mahi-divelife",
    "cozumel-dive-divelife", "cenote-dive-divelife", "our-facilities",
]
RESPONSIVE_WIDTHS = [640, 1080, 1600]


def load(name: str) -> Image.Image:
    for ext in ("jpg", "jpeg", "png", "webp"):
        p = ASSETS / f"{name}.{ext}"
        if p.exists():
            im = ImageOps.exif_transpose(Image.open(p))
            return im.convert("RGB")
    raise FileNotFoundError(name)


def resize_w(im: Image.Image, w: int) -> Image.Image:
    if im.width <= w:
        return im
    h = round(im.height * w / im.width)
    return im.resize((w, h), Image.LANCZOS)


def save(im: Image.Image, base: Path, avif: bool = True):
    im.save(base.with_suffix(".webp"), "WEBP", quality=76, method=6)
    if avif:
        im.save(base.with_suffix(".avif"), "AVIF", quality=58, speed=4)


def widths_for(max_w: int, wanted: list[int]) -> list[int]:
    out = sorted({min(w, max_w) for w in wanted})
    return out


def main():
    HERO_OUT.mkdir(parents=True, exist_ok=True)
    RESP_OUT.mkdir(parents=True, exist_ok=True)

    for name in HERO:
        im = load(name)
        for w in widths_for(im.width, HERO_DESKTOP_WIDTHS):
            save(resize_w(im, w), HERO_OUT / f"{name}-d{w}")
        # Centre 3:4 crop (what object-cover shows on a portrait phone).
        crop_w = min(im.width, round(im.height * 3 / 4))
        left = (im.width - crop_w) // 2
        crop = im.crop((left, 0, left + crop_w, im.height))
        for w in widths_for(crop.width, HERO_MOBILE_WIDTHS):
            save(resize_w(crop, w), HERO_OUT / f"{name}-m{w}")

    for name in RESPONSIVE:
        im = load(name)
        for w in widths_for(im.width, RESPONSIVE_WIDTHS):
            save(resize_w(im, w), RESP_OUT / f"{name}-{w}", avif=False)

    print("done")


if __name__ == "__main__":
    main()
