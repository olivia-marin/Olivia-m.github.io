#!/usr/bin/env python3
"""Regenerate hot-pick PDP HTML and products-catalog.js from scripts/hot-picks-data.json."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = Path(__file__).resolve().parent / "hot-picks-data.json"


def load_products():
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def assets_folder(product: dict) -> str:
    return product.get("assetsFolder", "hot-picks")


def shades_block(shades):
    if not shades:
        return ""
    first = shades[0]["name"]
    buttons = []
    for i, shade in enumerate(shades):
        name = shade["name"]
        color = shade["color"]
        selected = " is-selected" if i == 0 else ""
        pressed = "true" if i == 0 else "false"
        buttons.append(
            f'                <button type="button" class="pdp-shade{selected}" '
            f'style="background:{color}" data-shade="{name}" aria-pressed="{pressed}" '
            f'aria-label="{name}"></button>'
        )
    return f"""
              <div class="pdp-shades-block" data-pdp-shades-wrap>
                <p class="pdp-label">Shade: <span data-shade-name>{first}</span></p>
                <div class="pdp-shades" role="group" aria-label="Choose shade">
{chr(10).join(buttons)}
                </div>
              </div>"""


def render_product(p):
    shades_html = shades_block(p["shades"])
    return f"""<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{p["title"]} | {p["brand"]} | Sephora Australia</title>
    <meta name="description" content="{p["description"]}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,200;0,300;0,400;0,500;1,300;1,400&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../styles/main.css" />
    <link rel="stylesheet" href="../styles/components.css" />
  </head>
  <body class="page-pdp" data-product-id="{p["id"]}">
    <div class="scroll-progress" aria-hidden="true"><span class="scroll-progress__bar" data-scroll-progress></span></div>
    <div class="cursor-ring" data-cursor aria-hidden="true"></div>

    <header class="site-header site-header--shop" data-site-header>
      <div class="site-header__bar">
        <div class="site-header__start">
          <nav class="pdp-header__nav" aria-label="Shop">
            <a href="../category-makeup.html">Makeup</a>
            <a href="../category-skincare.html">Skincare</a>
            <a href="../category-hair.html">Hair</a>
            <a href="../category-tools.html">Tools</a>
            <a href="../category-fragrance.html">Fragrance</a>
          </nav>
        </div>
        <a class="site-header__logo" href="../index.html" aria-label="Sephora home">
          <img src="../Logo.svg" alt="" width="132" height="11" decoding="async" />
        </a>
        <div class="site-header__end">
          <a class="site-header__bag" href="../cart.html" data-bag-toggle aria-label="Bag, empty">
            <span class="site-header__bag-label">Bag</span>
            <span class="site-header__bag-count" data-bag-count hidden>0</span>
          </a>
        </div>
      </div>
    </header>

    <main>
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <div class="container">
          <ol>
            <li><a href="../index.html">Home</a></li>
            <li><a href="../index.html#new-and-hot">New &amp; Hot</a></li>
            <li aria-current="page" data-pdp-breadcrumb>{p["breadcrumb"]}</li>
          </ol>
        </div>
      </nav>

      <section class="pdp-hero">
        <div class="container pdp-hero__grid">
          <div class="pdp-gallery pdp-gallery--contain reveal">
            <img src="../assets/{assets_folder(p)}/{p["image"]}" alt="{p["alt"]}" width="1000" height="1000" />
          </div>
          <div class="pdp-buybox reveal reveal--delay-1" data-pdp-buybox>
            <p class="pdp-buybox__brand">{p["brand"]}</p>
            <div class="pdp-buybox__title-row">
              <h1>{p["title"]}</h1>
              <span class="pdp-tag pdp-tag--{p["tag"]}" data-pdp-tag>{p["tag"].capitalize()}</span>
            </div>
            <div class="pdp-rating" data-pdp-rating></div>
            <p class="pdp-lede" data-pdp-lede></p>
            <div class="pdp-commerce">
              <div class="pdp-price-row">
                <p class="pdp-price" data-pdp-price></p>
                <p class="pdp-size" data-pdp-size></p>
              </div>
{shades_html}
              <div class="pdp-actions">
                <button type="button" class="btn btn--accent" data-add-to-cart data-product-id="{p["id"]}">Add to Basket</button>
                <a class="btn" href="../cart.html">View Bag</a>
              </div>
            </div>
            <ul class="pdp-perks">
              <li>Free shipping on orders $100+</li>
              <li>Available at Sephora Australia</li>
              <li>Beauty Insider points with purchase</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="pdp-details" id="reviews">
        <div class="container pdp-details__grid" data-pdp-details></div>
      </section>
    </main>

    <footer class="footer surface-ivory">
      <div class="container footer__inner">
        <div class="footer__brand"><img src="../Logo.svg" alt="Sephora" class="footer__brand-img" width="132" height="11" decoding="async" /></div>
        <div class="footer__meta"><span>{p["brand"]}</span><span>Sephora Australia</span></div>
      </div>
    </footer>
    <script src="../scripts/products-catalog.js" defer></script>
    <script src="../scripts/cart.js" defer></script>
    <script src="../scripts/pdp-hot-pick.js" defer></script>
    <script src="../scripts/main.js" defer></script>
    <script src="../scripts/product.js" defer></script>
  </body>
</html>
"""


def js_string(value):
    return json.dumps(value, ensure_ascii=False)


def render_catalog(products):
    lines = ["window.SEPHORA_PRODUCTS = {"]
    for i, p in enumerate(products):
        comma = "," if i < len(products) - 1 else ""
        shade_names = None
        if p["shades"]:
            shade_names = [s["name"] for s in p["shades"]]
        lines.extend(
            [
                f'  {js_string(p["id"])}: {{',
                f'    id: {js_string(p["id"])},',
                f'    brand: {js_string(p["brand"])},',
                f'    title: {js_string(p["title"])},',
                f'    breadcrumb: {js_string(p["breadcrumb"])},',
                f"    price: {p['price']},",
                f'    image: "../assets/{assets_folder(p)}/{p["image"]}",',
                f'    category: {js_string(p["category"])},',
                f'    categoryHref: {js_string(p["categoryHref"])},',
                f"    reviews: {p['reviews']},",
                f"    rating: {p['rating']},",
                f'    size: {js_string(p["size"])},',
                f'    lede: {js_string(p["lede"])},',
                f'    whatItIs: {js_string(p["whatItIs"])},',
                f'    howToUse: {js_string(p["howToUse"])},',
                f'    whyLove: {js_string(p["whyLove"])},',
                f"    shades: {json.dumps(shade_names, ensure_ascii=False)},",
                f'    tag: {js_string(p["tag"])}',
                f"  }}{comma}",
            ]
        )
    lines.append("};")
    lines.append("")
    return "\n".join(lines)


def main():
    products = load_products()
    products_dir = ROOT / "products"
    for product in products:
        path = products_dir / f"{product['id']}.html"
        path.write_text(render_product(product), encoding="utf-8")
        print("wrote", path.name)

    catalog_path = ROOT / "scripts" / "products-catalog.js"
    catalog_path.write_text(render_catalog(products), encoding="utf-8")
    print("wrote", catalog_path.name)


if __name__ == "__main__":
    main()
