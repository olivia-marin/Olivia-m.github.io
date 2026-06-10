(function () {
  var STORAGE_KEY = "sephora-cart-v1";

  function formatPrice(amount) {
    return "$" + amount.toFixed(2);
  }

  function getCatalog() {
    return window.SEPHORA_PRODUCTS || {};
  }

  function getCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateBagCount();
    window.dispatchEvent(new CustomEvent("sephora-cart-updated", { detail: { items: items } }));
  }

  function cartCount(items) {
    return (items || getCart()).reduce(function (sum, line) {
      return sum + (line.qty || 1);
    }, 0);
  }

  function updateBagCount() {
    var count = cartCount();
    document.querySelectorAll("[data-bag-count]").forEach(function (el) {
      el.textContent = String(count);
      el.hidden = count === 0;
    });
    document.querySelectorAll("[data-bag-toggle]").forEach(function (el) {
      var label = count === 1 ? "Bag, 1 item" : "Bag, " + count + " items";
      el.setAttribute("aria-label", count ? label : "Bag, empty");
    });
  }

  function addToCart(productId, options) {
    var catalog = getCatalog();
    var product = catalog[productId];
    if (!product) return false;

    options = options || {};
    var shade = options.shade || null;
    var qty = options.qty || 1;
    var items = getCart();
    var key = productId + (shade ? "::" + shade : "");
    var existing = items.find(function (line) {
      return line.key === key;
    });

    if (existing) {
      existing.qty += qty;
    } else {
      items.push({
        key: key,
        productId: productId,
        brand: product.brand,
        title: product.title,
        price: product.price,
        image: product.image,
        shade: shade,
        qty: qty,
      });
    }

    saveCart(items);
    return true;
  }

  function removeLine(key) {
    saveCart(getCart().filter(function (line) {
      return line.key !== key;
    }));
  }

  function setLineQty(key, qty) {
    var items = getCart();
    var line = items.find(function (l) {
      return l.key === key;
    });
    if (!line) return;
    if (qty < 1) {
      removeLine(key);
      return;
    }
    line.qty = qty;
    saveCart(items);
  }

  function subtotal(items) {
    return (items || getCart()).reduce(function (sum, line) {
      return sum + line.price * line.qty;
    }, 0);
  }

  function showAddedFeedback(btn) {
    if (!btn) return;
    var original = btn.textContent;
    btn.textContent = "Added";
    btn.disabled = true;
    window.setTimeout(function () {
      btn.textContent = original;
      btn.disabled = false;
    }, 1400);
  }

  function initAddToCart() {
    document.querySelectorAll("[data-add-to-cart]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var productId = btn.getAttribute("data-product-id");
        var shadeEl = document.querySelector("[data-shade-name]");
        var shade = shadeEl ? shadeEl.textContent.trim() : null;
        if (addToCart(productId, { shade: shade })) {
          showAddedFeedback(btn);
        }
      });
    });
  }

  function renderCartPage() {
    var root = document.querySelector("[data-cart-root]");
    if (!root) return;

    var items = getCart();
    var emptyEl = root.querySelector("[data-cart-empty]");
    var listEl = root.querySelector("[data-cart-list]");
    var summaryEl = root.querySelector("[data-cart-summary]");

    if (!items.length) {
      if (emptyEl) emptyEl.hidden = false;
      if (listEl) listEl.innerHTML = "";
      if (summaryEl) summaryEl.hidden = true;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;
    if (summaryEl) summaryEl.hidden = false;

    if (listEl) {
      listEl.innerHTML = items
        .map(function (line) {
          var title = line.title + (line.shade ? ", " + line.shade : "");
          var img = line.image.replace("../", "");
          return (
            '<article class="cart-line" data-cart-line="' +
            line.key +
            '">' +
            '<a class="cart-line__media" href="products/' +
            line.productId +
            '.html">' +
            '<img src="' +
            img +
            '" alt="" width="120" height="120" loading="lazy" />' +
            "</a>" +
            '<div class="cart-line__body">' +
            '<p class="cart-line__brand">' +
            line.brand +
            "</p>" +
            '<h2 class="cart-line__title"><a href="products/' +
            line.productId +
            '.html">' +
            title +
            "</a></h2>" +
            '<p class="cart-line__price">' +
            formatPrice(line.price) +
            "</p>" +
            '<div class="cart-line__qty">' +
            '<label class="sr-only" for="qty-' +
            line.key +
            '">Quantity</label>' +
            '<button type="button" class="cart-line__qty-btn" data-qty-delta="-1" data-line-key="' +
            line.key +
            '" aria-label="Decrease quantity">−</button>' +
            '<span id="qty-' +
            line.key +
            '">' +
            line.qty +
            "</span>" +
            '<button type="button" class="cart-line__qty-btn" data-qty-delta="1" data-line-key="' +
            line.key +
            '" aria-label="Increase quantity">+</button>' +
            "</div>" +
            '<button type="button" class="cart-line__remove" data-remove-line="' +
            line.key +
            '">Remove</button>' +
            "</div>" +
            '<p class="cart-line__total">' +
            formatPrice(line.price * line.qty) +
            "</p>" +
            "</article>"
          );
        })
        .join("");
    }

    var subtotalEl = root.querySelector("[data-cart-subtotal]");
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal(items));

    root.querySelectorAll("[data-remove-line]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        removeLine(btn.getAttribute("data-remove-line"));
        renderCartPage();
      });
    });

    root.querySelectorAll("[data-qty-delta]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-line-key");
        var delta = parseInt(btn.getAttribute("data-qty-delta"), 10);
        var line = getCart().find(function (l) {
          return l.key === key;
        });
        if (line) setLineQty(key, line.qty + delta);
        renderCartPage();
      });
    });
  }

  window.SephoraCart = {
    getCart: getCart,
    addToCart: addToCart,
    removeLine: removeLine,
    setLineQty: setLineQty,
    subtotal: subtotal,
    formatPrice: formatPrice,
  };

  updateBagCount();
  initAddToCart();
  renderCartPage();

  window.addEventListener("sephora-cart-updated", function () {
    renderCartPage();
  });
})();
