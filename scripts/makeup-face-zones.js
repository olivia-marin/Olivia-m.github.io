(function () {
  var root = document.querySelector("[data-face-zones]");
  if (!root) return;

  var PRICE_BUCKETS = {
    "under-25": { label: "Under $25", test: function (p) { return p.priceValue < 25; } },
    "25-50": { label: "$25 – $50", test: function (p) { return p.priceValue >= 25 && p.priceValue <= 50; } },
    "over-50": { label: "Over $50", test: function (p) { return p.priceValue > 50; } },
  };

  var ZONE_META = {
    base: {
      title: "Base products",
      copy: "Primer, foundation, concealer, and setting for your complexion.",
    },
    eyes: {
      title: "Eye products",
      copy: "Colour and essentials for eyes, brows, and lashes.",
    },
    cheeks: {
      title: "Cheek products",
      copy: "Blush and cheek colour in powder and liquid formulas.",
    },
    lips: {
      title: "Lip products",
      copy: "Tints, gloss, and colour for every lip look.",
    },
  };

  var ZONE_PRODUCTS = {
    base: [
      {
        href: "products/blurring-primer.html",
        brand: "Sephora Collection",
        subcategory: "Primer",
        title: "Blurring Grip Primer",
        desc: "Smooths texture and grips makeup for all-day wear.",
        price: "$28.00",
        priceValue: 28,
        image: "assets/sephora-collection/blurring-primer.png",
      },
      {
        href: "products/soft-focus-foundation.html",
        brand: "Sephora Collection",
        subcategory: "Foundation",
        title: "Soft Focus Hydra Foundation",
        desc: "Medium, buildable coverage in 48 shades.",
        price: "$34.00",
        priceValue: 34,
        image: "assets/sephora-collection/soft-focus-foundation.png",
      },
      {
        href: "products/precision-concealer.html",
        brand: "Sephora Collection",
        subcategory: "Concealer",
        title: "Precision All-Day Concealer",
        desc: "High-pigment coverage that stays comfortable.",
        price: "$22.00",
        priceValue: 22,
        image: "assets/sephora-collection/precision-concealer.png",
      },
      {
        href: "products/one-size-oil-sucker.html",
        brand: "ONE/SIZE",
        subcategory: "Setting",
        title: "Oil Sucker Liquid Blotting Paper Spray",
        desc: "Mattifying spray that blots oil and resets makeup on the go.",
        price: "$57.00",
        priceValue: 57,
        image: "assets/hot-picks/one-size-oil-sucker.png",
      },
      {
        href: "products/paulas-choice-bha.html",
        brand: "Paula's Choice",
        subcategory: "Prep",
        title: "Skin Perfecting 2% BHA Liquid Exfoliant",
        desc: "Leave-on exfoliant for smoother skin before makeup.",
        price: "$54.00",
        priceValue: 54,
        image: "assets/hot-picks/paulas-choice-bha.png",
      },
    ],
    eyes: [
      {
        href: "index.html#new-and-hot",
        brand: "Sephora Australia",
        subcategory: "Discover",
        title: "Browse New & Hot",
        desc: "Discover the latest beauty drops on the homepage.",
        price: "Shop now",
        priceValue: null,
        image: "assets/sephora-collection/card-eyes.png",
        cta: true,
      },
      {
        href: "products/rare-beauty-soft-pinch-blush.html",
        brand: "Rare Beauty",
        subcategory: "Colour",
        title: "Soft Pinch Liquid Blush",
        desc: "Soft-focus colour for a lifted, eye-opening look.",
        price: "$45.00",
        priceValue: 45,
        image: "assets/hot-picks/rare-beauty-soft-pinch-blush.png",
      },
      {
        href: "products/fenty-gloss-bomb.html",
        brand: "Fenty Beauty",
        subcategory: "Colour",
        title: "Gloss Bomb Universal Lip Luminizer",
        desc: "High-shine gloss to brighten and frame the eyes.",
        price: "$39.00",
        priceValue: 39,
        image: "assets/hot-picks/fenty-gloss-bomb.png",
      },
    ],
    cheeks: [
      {
        href: "products/velvet-matte-blush.html",
        brand: "Sephora Collection",
        subcategory: "Powder blush",
        title: "Velvet Matte Blush",
        desc: "Soft-matte powder that melts in without patchiness.",
        price: "$18.00",
        priceValue: 18,
        image: "assets/sephora-collection/velvet-matte-blush.png",
      },
      {
        href: "products/dewy-lip-cheek-tint.html",
        brand: "Sephora Collection",
        subcategory: "Liquid blush",
        title: "Dewy Lip & Cheek Tint",
        desc: "Sheer, buildable flush for cheeks with a dewy finish.",
        price: "$16.00",
        priceValue: 16,
        image: "assets/sephora-collection/dewy-lip-cheek-tint.png",
      },
      {
        href: "products/rare-beauty-soft-pinch-blush.html",
        brand: "Rare Beauty",
        subcategory: "Liquid blush",
        title: "Soft Pinch Liquid Blush",
        desc: "Viral weightless blush with up to 12-hour wear.",
        price: "$45.00",
        priceValue: 45,
        image: "assets/hot-picks/rare-beauty-soft-pinch-blush.png",
      },
    ],
    lips: [
      {
        href: "products/dewy-lip-cheek-tint.html",
        brand: "Sephora Collection",
        subcategory: "Lip & cheek tint",
        title: "Dewy Lip & Cheek Tint",
        desc: "Your-lips-but-better stain with a soft-focus pop of colour.",
        price: "$16.00",
        priceValue: 16,
        image: "assets/sephora-collection/dewy-lip-cheek-tint.png",
      },
      {
        href: "products/laneige-juicepop-lip-tint.html",
        brand: "LANEIGE",
        subcategory: "Lip tint",
        title: "Juicepop Box Lip Tint",
        desc: "Glossy, buildable lip colour in a collectible package.",
        price: "$30.00",
        priceValue: 30,
        image: "assets/hot-picks/laneige-juicepop-lip-tint.png",
      },
      {
        href: "products/fenty-gloss-bomb.html",
        brand: "Fenty Beauty",
        subcategory: "Lip gloss",
        title: "Gloss Bomb Universal Lip Luminizer",
        desc: "Non-sticky shine in shades that flatter every skin tone.",
        price: "$39.00",
        priceValue: 39,
        image: "assets/hot-picks/fenty-gloss-bomb.png",
      },
    ],
  };

  var picker = root.querySelector(".face-zones__picker");
  var grid = root.querySelector("[data-face-grid]");
  var titleEl = root.querySelector("[data-face-results-title]");
  var copyEl = root.querySelector("[data-face-results-copy]");
  var emptyEl = root.querySelector("[data-face-empty]");
  var countEl = root.querySelector("[data-face-result-count]");
  var listingCards = document.querySelectorAll("#shop-collection .product-card[data-face-zone]");
  var filterRoot = root.querySelector("[data-face-filter]");
  var filterToggle = root.querySelector("[data-face-filter-toggle]");
  var filterPanel = root.querySelector("[data-face-filter-panel]");
  var filterBadge = root.querySelector("[data-face-filter-badge]");
  var brandsWrap = root.querySelector("[data-face-filter-brands]");
  var subcatsWrap = root.querySelector("[data-face-filter-subcategories]");
  var filterClear = root.querySelector("[data-face-filter-clear]");
  var filterClose = root.querySelector("[data-face-filter-close]");

  var activeZone = "base";
  var filters = { brands: [], prices: [], subcategories: [] };

  function uniqueSorted(list) {
    return list.filter(function (item, index) {
      return list.indexOf(item) === index;
    }).sort(function (a, b) {
      return a.localeCompare(b);
    });
  }

  function getZoneProducts(zone) {
    return ZONE_PRODUCTS[zone] || [];
  }

  function matchesZone(card, zone) {
    var zones = (card.getAttribute("data-face-zone") || "").split(/\s+/);
    return zones.indexOf(zone) >= 0;
  }

  function productMatchesFilters(product) {
    if (filters.brands.length && filters.brands.indexOf(product.brand) < 0) return false;

    if (filters.subcategories.length && filters.subcategories.indexOf(product.subcategory) < 0) {
      return false;
    }

    if (filters.prices.length) {
      if (product.priceValue == null) return false;
      var inBucket = filters.prices.some(function (key) {
        var bucket = PRICE_BUCKETS[key];
        return bucket && bucket.test(product);
      });
      if (!inBucket) return false;
    }

    return true;
  }

  function getActiveFilterCount() {
    return filters.brands.length + filters.prices.length + filters.subcategories.length;
  }

  function readFiltersFromPanel() {
    filters.brands = [];
    filters.prices = [];
    filters.subcategories = [];

    if (!filterPanel) return;

    filterPanel.querySelectorAll("[data-face-filter-input]:checked").forEach(function (input) {
      var group = input.closest("[data-filter-group]");
      if (!group) return;
      var type = group.getAttribute("data-filter-group");
      if (type === "brand") filters.brands.push(input.value);
      if (type === "price") filters.prices.push(input.value);
      if (type === "subcategory") filters.subcategories.push(input.value);
    });
  }

  function updateFilterBadge() {
    var count = getActiveFilterCount();
    if (!filterBadge) return;
    filterBadge.hidden = count === 0;
    filterBadge.textContent = String(count);
  }

  function buildCheckboxOptions(container, groupName, values, prefix) {
    if (!container) return;
    container.innerHTML = "";
    values.forEach(function (value) {
      var id = prefix + "-" + value.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
      var label = document.createElement("label");
      label.className = "face-zones__filter-check";
      label.innerHTML =
        '<input type="checkbox" id="' +
        id +
        '" name="' +
        groupName +
        '" value="' +
        value.replace(/"/g, "&quot;") +
        '" data-face-filter-input />' +
        "<span>" +
        value +
        "</span>";
      container.appendChild(label);
    });
  }

  function buildFilterPanel(zone) {
    var products = getZoneProducts(zone);
    var brands = uniqueSorted(products.map(function (p) { return p.brand; }));
    var subcats = uniqueSorted(products.map(function (p) { return p.subcategory; }));

    buildCheckboxOptions(brandsWrap, "brand", brands, "brand-" + zone);
    buildCheckboxOptions(subcatsWrap, "subcategory", subcats, "sub-" + zone);

    filters.brands = filters.brands.filter(function (b) { return brands.indexOf(b) >= 0; });
    filters.subcategories = filters.subcategories.filter(function (s) {
      return subcats.indexOf(s) >= 0;
    });

    if (filterPanel) {
      filterPanel.querySelectorAll("[data-face-filter-input]").forEach(function (input) {
        var group = input.closest("[data-filter-group]");
        if (!group) return;
        var type = group.getAttribute("data-filter-group");
        if (type === "brand") input.checked = filters.brands.indexOf(input.value) >= 0;
        if (type === "price") input.checked = filters.prices.indexOf(input.value) >= 0;
        if (type === "subcategory") input.checked = filters.subcategories.indexOf(input.value) >= 0;
      });
    }

    updateFilterBadge();
  }

  function filterListing(zone) {
    listingCards.forEach(function (card) {
      var zoneMatch = matchesZone(card, zone);
      if (!zoneMatch) {
        card.classList.add("is-zone-hidden");
        return;
      }

      var brand = card.getAttribute("data-brand");
      var subcat = card.getAttribute("data-subcategory");
      var priceValue = parseFloat(card.getAttribute("data-price-value") || "", 10);
      var pseudo = {
        brand: brand,
        subcategory: subcat,
        priceValue: isNaN(priceValue) ? null : priceValue,
      };

      card.classList.toggle("is-zone-hidden", !productMatchesFilters(pseudo));
    });
  }

  function renderCard(product) {
    var link = document.createElement("a");
    link.className = "face-zones__card" + (product.cta ? " face-zones__card--cta" : "");
    link.href = product.href;

    var media = document.createElement("div");
    media.className = "face-zones__card-media";
    var img = document.createElement("img");
    img.src = product.image;
    img.alt = "";
    img.loading = "lazy";
    img.width = 600;
    img.height = 600;
    if (product.imageStyle) img.style.cssText = product.imageStyle;
    media.appendChild(img);

    var body = document.createElement("div");
    body.className = "face-zones__card-body";
    body.innerHTML =
      '<span class="face-zones__card-brand">' +
      product.brand +
      " · " +
      product.subcategory +
      "</span><h4>" +
      product.title +
      "</h4><p>" +
      product.desc +
      '</p><span class="face-zones__card-meta">' +
      product.price +
      "</span>";

    link.appendChild(media);
    link.appendChild(body);
    return link;
  }

  function renderProducts() {
    var products = getZoneProducts(activeZone).filter(productMatchesFilters);
    var total = getZoneProducts(activeZone).length;

    if (grid) {
      grid.innerHTML = "";
      grid.classList.toggle("is-empty", products.length === 0);
      products.forEach(function (product) {
        grid.appendChild(renderCard(product));
      });
    }

    if (emptyEl) emptyEl.hidden = products.length > 0;
    if (countEl) {
      countEl.textContent =
        products.length === total
          ? products.length + " product" + (products.length === 1 ? "" : "s")
          : products.length + " of " + total + " products";
    }

    filterListing(activeZone);
    updateFilterBadge();
  }

  function closeFilterPanel() {
    if (!filterToggle || !filterPanel) return;
    filterToggle.setAttribute("aria-expanded", "false");
    filterPanel.hidden = true;
  }

  function openFilterPanel() {
    if (!filterToggle || !filterPanel) return;
    filterToggle.setAttribute("aria-expanded", "true");
    filterPanel.hidden = false;
  }

  function setZone(zone, shouldScroll) {
    activeZone = zone;
    var meta = ZONE_META[zone] || ZONE_META.base;

    if (titleEl) titleEl.textContent = meta.title;
    if (copyEl) copyEl.textContent = meta.copy;

    if (picker) {
      picker.querySelectorAll(".face-zone-card").forEach(function (btn) {
        var isActive = btn.getAttribute("data-face-zone") === zone;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
      });
    }

    buildFilterPanel(zone);
    renderProducts();
    closeFilterPanel();

    if (shouldScroll) {
      var results = root.querySelector("[data-face-results]");
      if (results && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
        results.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }

  function clearFilters() {
    filters = { brands: [], prices: [], subcategories: [] };
    if (filterPanel) {
      filterPanel.querySelectorAll("[data-face-filter-input]").forEach(function (input) {
        input.checked = false;
      });
    }
    renderProducts();
  }

  if (picker) {
    picker.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-face-zone]");
      if (!btn || !picker.contains(btn)) return;
      filters = { brands: [], prices: [], subcategories: [] };
      setZone(btn.getAttribute("data-face-zone"), true);
    });

    picker.addEventListener("keydown", function (event) {
      var tabs = Array.prototype.slice.call(picker.querySelectorAll(".face-zone-card"));
      var index = tabs.indexOf(document.activeElement);
      if (index < 0) return;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        tabs[(index + 1) % tabs.length].focus();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        tabs[(index - 1 + tabs.length) % tabs.length].focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
      } else if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
      } else if (event.key === "Enter" || event.key === " ") {
        var active = document.activeElement;
        if (active && active.classList.contains("face-zone-card")) {
          event.preventDefault();
          filters = { brands: [], prices: [], subcategories: [] };
          setZone(active.getAttribute("data-face-zone"), true);
        }
      }
    });
  }

  if (filterToggle && filterPanel) {
    filterToggle.addEventListener("click", function () {
      var isOpen = filterToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeFilterPanel();
      else openFilterPanel();
    });

    document.addEventListener("click", function (event) {
      if (!filterRoot || filterPanel.hidden) return;
      if (filterRoot.contains(event.target)) return;
      closeFilterPanel();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeFilterPanel();
    });
  }

  if (filterPanel) {
    filterPanel.addEventListener("change", function (event) {
      if (!event.target.matches("[data-face-filter-input]")) return;
      readFiltersFromPanel();
      renderProducts();
    });
  }

  if (filterClear) {
    filterClear.addEventListener("click", clearFilters);
  }

  if (filterClose) {
    filterClose.addEventListener("click", closeFilterPanel);
  }

  var viewAll = root.querySelector("[data-face-view-all]");
  if (viewAll) {
    viewAll.addEventListener("click", function () {
      filterListing(activeZone);
    });
  }

  setZone("base");
})();
