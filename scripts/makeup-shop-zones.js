(function () {
  var shop = document.querySelector("[data-makeup-shop]");
  if (!shop) return;

  var tabs = shop.querySelectorAll("[data-zone-filter]");
  var cards = shop.querySelectorAll(".product-card[data-face-zone]");
  var grid = shop.querySelector(".makeup-shop__grid");
  var empty = shop.querySelector("[data-shop-empty]");
  var filterEmpty = shop.querySelector("[data-filter-empty]");
  var layout = shop.querySelector(".makeup-shop__layout");
  var faceFilterNodes = shop.querySelectorAll("[data-face-filters]");
  var categoryButtons = shop.querySelectorAll("[data-category-filter]");

  var currentZone = "face";
  var currentCategory = "all";

  function categorySlug(card) {
    var sub = card.getAttribute("data-subcategory");
    if (!sub) return "";
    return sub.toLowerCase().replace(/\s+/g, "-");
  }

  function cardMatchesCategory(card) {
    if (currentCategory === "all") return true;
    return categorySlug(card) === currentCategory;
  }

  function applyFilters() {
    var zoneVisible = 0;
    var categoryVisible = 0;
    var showFaceFilters = currentZone === "face";

    if (faceFilterNodes.length) {
      faceFilterNodes.forEach(function (node) {
        node.hidden = !showFaceFilters;
      });
    }

    if (layout) {
      layout.classList.toggle("makeup-shop__layout--with-filters", showFaceFilters);
    }

    cards.forEach(function (card) {
      var inZone = card.getAttribute("data-face-zone") === currentZone;
      var inCategory = !showFaceFilters || cardMatchesCategory(card);
      var show = inZone && inCategory;
      card.hidden = !show;
      if (inZone) zoneVisible += 1;
      if (show) categoryVisible += 1;
    });

    tabs.forEach(function (tab) {
      var on = tab.getAttribute("data-zone-filter") === currentZone;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
    });

    categoryButtons.forEach(function (btn) {
      var on = btn.getAttribute("data-category-filter") === currentCategory;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    if (empty) {
      empty.hidden = zoneVisible > 0;
    }

    if (filterEmpty) {
      filterEmpty.hidden = !(showFaceFilters && zoneVisible > 0 && categoryVisible === 0);
    }

    if (grid) {
      grid.hidden = zoneVisible === 0 || (showFaceFilters && categoryVisible === 0);
    }

    if (window.MakeupScrollReveal) {
      window.MakeupScrollReveal.refresh();
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      currentZone = tab.getAttribute("data-zone-filter");
      if (currentZone !== "face") {
        currentCategory = "all";
      }
      applyFilters();
    });
  });

  categoryButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentCategory = btn.getAttribute("data-category-filter");
      applyFilters();
    });
  });

  var viewAll = shop.querySelector("[data-filter-empty] [data-category-filter]");
  if (viewAll) {
    viewAll.addEventListener("click", function () {
      currentCategory = "all";
      applyFilters();
    });
  }

  applyFilters();
})();
