#!/usr/bin/env python3
"""Download product images from Sephora Australia (sephora-asia CDN)."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
HOT_PICKS = ASSETS / "hot-picks"
SC = ASSETS / "sephora-collection"

CDN = "https://image-optimizer-reg.production.sephora-asia.net/images/product_images"

# Sephora Collection stand-ins for The Gradient Edit
SC_DOWNLOADS: list[tuple[Path, str]] = [
    (SC / "soft-focus-foundation.png", f"{CDN}/zoom_1_Product_3378872253426-Sephora-Collection-Best-Skin-Ever-Pe_ea34d7770bc0ab904e3b2a73f433ec9368e0f454_1755080821.png"),
    (SC / "precision-concealer.png", f"{CDN}/zoom_1_Product_3378872252900-Sephora-Collection-Best-Skin-Ever-Hi_4b67af30a9165db70c8d245c242a69c751f81dd4_1755168318.png"),
    (SC / "blurring-primer.png", f"{CDN}/zoom_1_Product_3378872205357-Sephora-Collection-Smooth-Blur-Prime_d4f8632919ca0b0c15eedcfc5e7b05690c07dbc5_1708924437.png"),
    (SC / "velvet-matte-blush.png", f"{CDN}/zoom_1_Product_3378872180623-Sephora-Collection-Colorful-Blush-49_a1fe4155141d233eb0b9ae4f857f9b7cf3b4a5f3_1708923211.png"),
    (SC / "dewy-lip-cheek-tint.png", f"{CDN}/zoom_1_Product_3378872193555-Sephora-Collection-All-In-One-Cream-_a043853d6ff63de4a17a684f47a9ec753d2ab2b9_1708924423.png"),
    (SC / "card-eyes.png", f"{CDN}/zoom_1_Product_3378872249719-Sephora-collection-Size-up-Mascara-B_fbcbc01effda0e9989ade8d8cbb95f09e07b60a6_1739534508.png"),
]

# New & Hot carousel / PDPs
HOT_PICK_DOWNLOADS: list[tuple[Path, str]] = [
    (HOT_PICKS / "one-size-oil-sucker.png", f"{CDN}/zoom_1_Product_810041817716-ONESIZE-Oil-Sucker-Liquid-Blotting-Pa_dfd3784d88be69022dfda7bd7392ce66f16f5284_1778049283.png"),
    (HOT_PICKS / "laneige-juicepop-lip-tint.png", f"{CDN}/zoom_1_Product_8800283634525-Laneige-Juicepop-Box-Lip-Tint-Mocha-_043099cf80c1319c8a59ebfeb512c0ae5789b58b_1771832939.png"),
    (HOT_PICKS / "k18-purple-shampoo.png", f"{CDN}/zoom_1_Product_990022400288-K18-TripleBright-Oxidation-Defense-Purple-Shampoo_62b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0.png"),
    (HOT_PICKS / "rare-beauty-soft-pinch-blush.png", f"{CDN}/zoom_1_Product_840122904929-Rare-Beauty-Soft-Pinch-Liquid-Blush-Hope_03e24f0a628789e609a92a47233420d8a649163b_1640617014.png"),
    (HOT_PICKS / "paulas-choice-bha.png", f"{CDN}/zoom_1_Product_811006117011-Paulas-Choice-Skin-Perfecting-2-BHA-Liquid-Exfoliant_62b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0.png"),
    (HOT_PICKS / "fenty-gloss-bomb.png", f"{CDN}/zoom_1_Product_810073150015-Fenty-Beauty-Gloss-Bomb-Universal-Lip-Luminizer-Fu_62b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0.png"),
    (HOT_PICKS / "ouai-detox-shampoo.png", f"{CDN}/zoom_1_Product_857150007300-OUAI-Detox-Shampoo_62b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0.png"),
]


def curl_download(dest: Path, url: str) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["curl", "-sL", "-A", "Mozilla/5.0", "-o", str(dest), url],
        check=True,
    )


def main() -> int:
    for dest, url in SC_DOWNLOADS:
        print(f"Fetching {dest.relative_to(ROOT)}...")
        curl_download(dest, url)

    for dest, src in (
        (ASSETS / "card-complexion.png", SC / "soft-focus-foundation.png"),
        (ASSETS / "card-eyes.png", SC / "card-eyes.png"),
        (ASSETS / "card-finish.png", SC / "velvet-matte-blush.png"),
        (ASSETS / "card-lips.png", SC / "dewy-lip-cheek-tint.png"),
    ):
        shutil.copy2(src, dest)
        print(f"Copied -> {dest.relative_to(ROOT)}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
