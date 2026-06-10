(function () {
  var productId = document.body.getAttribute("data-product-id");
  if (!productId) return;

  var catalog = window.SEPHORA_PRODUCTS || {};
  var product = catalog[productId];
  if (!product) return;

  var buybox = document.querySelector("[data-pdp-buybox]");
  var gallery = document.querySelector(".page-pdp .pdp-gallery");
  var syncMq = window.matchMedia("(min-width: 1025px)");

  function syncGalleryHeight() {
    if (!buybox || !gallery) return;
    if (!syncMq.matches) {
      gallery.style.height = "";
      return;
    }
    gallery.style.height = buybox.offsetHeight + "px";
  }

  function scheduleGallerySync() {
    syncGalleryHeight();
    window.requestAnimationFrame(syncGalleryHeight);
  }

  scheduleGallerySync();
  window.addEventListener("resize", scheduleGallerySync);
  if (window.ResizeObserver && buybox) {
    new ResizeObserver(scheduleGallerySync).observe(buybox);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleGallerySync);
  }

  function formatReviews(n) {
    return n >= 1000 ? n.toLocaleString("en-AU") + " reviews" : n + " reviews";
  }

  document.title = product.title + " | " + product.brand + " | Sephora Australia";

  if (buybox) {
    var brandEl = buybox.querySelector(".pdp-buybox__brand");
    if (brandEl) brandEl.textContent = product.brand;

    var h1 = buybox.querySelector("h1");
    if (h1) h1.textContent = product.title;

    var tag = buybox.querySelector("[data-pdp-tag]");
    if (!tag && h1) {
      tag = document.createElement("span");
      tag.setAttribute("data-pdp-tag", "");
      h1.insertAdjacentElement("afterend", tag);
    }
    if (tag) {
      var badge = product.tag === "new" ? "new" : "hot";
      tag.textContent = badge === "new" ? "New" : "Hot";
      tag.className = "pdp-tag pdp-tag--" + badge;
      tag.hidden = false;
    }

    var shadesGroup = buybox.querySelector(".pdp-shades");
    if (shadesGroup && !product.shades) {
      var shadeBlock = shadesGroup.closest("[data-pdp-shades-wrap]") || shadesGroup.parentElement;
      if (shadeBlock) shadeBlock.hidden = true;
    }
  }

  var ratingEl = document.querySelector("[data-pdp-rating]");
  if (ratingEl) {
    ratingEl.innerHTML =
      '<span class="pdp-rating__stars" aria-hidden="true">★★★★★</span>' +
      '<span class="pdp-rating__score">' +
      product.rating +
      "</span>" +
      '<a href="#reviews">' +
      formatReviews(product.reviews) +
      "</a>";
  }

  var breadcrumbEl = document.querySelector("[data-pdp-breadcrumb]");
  if (breadcrumbEl) {
    breadcrumbEl.textContent = product.breadcrumb || product.title;
  }

  var ledeEl = document.querySelector("[data-pdp-lede]");
  if (ledeEl) ledeEl.textContent = product.lede;

  var priceEl = document.querySelector("[data-pdp-price]");
  if (priceEl) priceEl.textContent = "$" + product.price.toFixed(2) + " AUD";

  var sizeEl = document.querySelector("[data-pdp-size]");
  if (sizeEl) {
    if (product.size) {
      sizeEl.textContent = product.size;
      sizeEl.hidden = false;
    } else {
      sizeEl.hidden = true;
    }
  }

  var detailsEl = document.querySelector("[data-pdp-details]");
  if (detailsEl) {
    detailsEl.innerHTML =
      '<article class="reveal is-visible"><h2>What it is</h2><p>' +
      product.whatItIs +
      '</p></article><article class="reveal is-visible reveal--delay-1"><h2>How to use</h2><p>' +
      product.howToUse +
      '</p></article><article class="reveal is-visible reveal--delay-2"><h2>Why we love it</h2><p>' +
      product.whyLove +
      "</p></article>";
  }

  scheduleGallerySync();
})();
