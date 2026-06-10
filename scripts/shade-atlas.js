/* Shade atlas + Shop by Colour */
(function () {
  var SHADES = [{"index":1,"code":"N°01","name":"Porcelain","undertone":"Cool","hex":"#f6e4d2"},{"index":2,"code":"N°02","name":"Alabaster","undertone":"Neutral","hex":"#f2dcc4"},{"index":3,"code":"N°03","name":"Vanilla Cream","undertone":"Warm","hex":"#efd3b3"},{"index":4,"code":"N°04","name":"Cashmere","undertone":"Cool","hex":"#ecccac"},{"index":5,"code":"N°05","name":"Linen","undertone":"Neutral","hex":"#e8c4a1"},{"index":6,"code":"N°06","name":"Buff","undertone":"Warm","hex":"#e6bd96"},{"index":7,"code":"N°07","name":"Soft Sand","undertone":"Cool","hex":"#e0b489"},{"index":8,"code":"N°08","name":"Honeyed Beige","undertone":"Warm","hex":"#d9aa7e"},{"index":9,"code":"N°09","name":"Praline","undertone":"Neutral","hex":"#d2a073"},{"index":10,"code":"N°10","name":"Toffee Light","undertone":"Warm","hex":"#cb966a"},{"index":11,"code":"N°11","name":"Amber Sun","undertone":"Warm","hex":"#c48d63"},{"index":12,"code":"N°12","name":"Caramel","undertone":"Neutral","hex":"#bd855c"},{"index":13,"code":"N°13","name":"Tawny","undertone":"Warm","hex":"#b67d55"},{"index":14,"code":"N°14","name":"Sienna","undertone":"Warm","hex":"#ae744d"},{"index":15,"code":"N°15","name":"Chestnut Light","undertone":"Neutral","hex":"#a66c48"},{"index":16,"code":"N°16","name":"Cinnamon","undertone":"Warm","hex":"#9e6442"},{"index":17,"code":"N°17","name":"Spiced Honey","undertone":"Warm","hex":"#965d3d"},{"index":18,"code":"N°18","name":"Maple","undertone":"Cool","hex":"#8e5638"},{"index":19,"code":"N°19","name":"Mahogany","undertone":"Neutral","hex":"#864f34"},{"index":20,"code":"N°20","name":"Russet","undertone":"Warm","hex":"#7f4930"},{"index":21,"code":"N°21","name":"Walnut","undertone":"Neutral","hex":"#78442d"},{"index":22,"code":"N°22","name":"Cocoa","undertone":"Warm","hex":"#713e29"},{"index":23,"code":"N°23","name":"Pecan","undertone":"Cool","hex":"#6a3925"},{"index":24,"code":"N°24","name":"Hazelnut","undertone":"Warm","hex":"#633421"},{"index":25,"code":"N°25","name":"Espresso Light","undertone":"Neutral","hex":"#5d301e"},{"index":26,"code":"N°26","name":"Bourbon","undertone":"Warm","hex":"#572c1b"},{"index":27,"code":"N°27","name":"Mocha","undertone":"Cool","hex":"#522919"},{"index":28,"code":"N°28","name":"Truffle","undertone":"Neutral","hex":"#4d2617"},{"index":29,"code":"N°29","name":"Velvet Brown","undertone":"Warm","hex":"#482315"},{"index":30,"code":"N°30","name":"Coffee","undertone":"Cool","hex":"#432013"},{"index":31,"code":"N°31","name":"Dark Honey","undertone":"Warm","hex":"#3f1e12"},{"index":32,"code":"N°32","name":"Espresso Deep","undertone":"Neutral","hex":"#3b1c11"},{"index":33,"code":"N°33","name":"Cacao","undertone":"Cool","hex":"#371a10"},{"index":34,"code":"N°34","name":"Ganache","undertone":"Warm","hex":"#33180f"},{"index":35,"code":"N°35","name":"Black Walnut","undertone":"Cool","hex":"#2f160e"},{"index":36,"code":"N°36","name":"Onyx Warm","undertone":"Warm","hex":"#2b140d"},{"index":37,"code":"N°37","name":"Onyx Neutral","undertone":"Neutral","hex":"#28130c"},{"index":38,"code":"N°38","name":"Onyx Cool","undertone":"Cool","hex":"#25110b"},{"index":39,"code":"N°39","name":"Ink","undertone":"Neutral","hex":"#22100a"},{"index":40,"code":"N°40","name":"Obsidian","undertone":"Cool","hex":"#1f0f09"},{"index":41,"code":"N°41","name":"Midnight Brown","undertone":"Warm","hex":"#1c0e08"},{"index":42,"code":"N°42","name":"Velvet Night","undertone":"Cool","hex":"#190d07"},{"index":43,"code":"N°43","name":"Jet","undertone":"Neutral","hex":"#170c07"},{"index":44,"code":"N°44","name":"Volcano","undertone":"Warm","hex":"#150b06"},{"index":45,"code":"N°45","name":"Eclipse","undertone":"Cool","hex":"#130a05"},{"index":46,"code":"N°46","name":"Ebony Soft","undertone":"Neutral","hex":"#110905"},{"index":47,"code":"N°47","name":"Ebony Deep","undertone":"Warm","hex":"#0f0804"},{"index":48,"code":"N°48","name":"The Last Word","undertone":"Cool","hex":"#0a0604"}];

  var PRODUCTS = [
    { id: 'foundation', title: 'Soft Focus Hydra Foundation', price: 34, href: 'products/soft-focus-foundation.html', families: ['complexion', 'ritual'], shadeFor: function (i) { return i; } },
    { id: 'concealer', title: 'Precision All-Day Concealer', price: 22, href: 'products/precision-concealer.html', families: ['complexion', 'ritual'], shadeFor: function (i) { return Math.min(48, i + 1); } },
    { id: 'primer', title: 'Blurring Grip Primer', price: 28, href: 'products/blurring-primer.html', families: ['complexion', 'ritual'], universal: true },
    { id: 'blush', title: 'Velvet Matte Blush', price: 18, href: 'products/velvet-matte-blush.html', families: ['flush', 'ritual'], shadeFor: function (i) { return Math.min(48, Math.max(8, Math.round(i * 0.52 + 10))); } },
    { id: 'tint', title: 'Dewy Lip & Cheek Tint', price: 16, href: 'products/dewy-lip-cheek-tint.html', families: ['flush', 'ritual'], shadeFor: function (i) { return Math.min(48, Math.max(6, Math.round(i * 0.42 + 8))); } }
  ];

  function hexFrom(el) {
    var c = el.style.getPropertyValue('--c').trim();
    return c || '#e8c4a1';
  }

  function buildShadesFromGrid(grid) {
    var list = [];
    var btns = grid.querySelectorAll('.x-swatch');
    btns.forEach(function (btn, i) {
      var index = i + 1;
      btn.dataset.shadeIndex = String(index);
      list.push({
        index: index,
        name: btn.dataset.name,
        undertone: btn.dataset.und,
        hex: hexFrom(btn),
        el: btn
      });
    });
    return list;
  }

  function buildShadesFallback() {
    return SHADES.map(function (s) {
      return { index: s.index, name: s.name, undertone: s.undertone, hex: s.hex, el: null };
    });
  }

  function initAtlas(grid, shades) {
    var readoutName = document.querySelector('[data-atlas-name]');
    var readoutCode = document.querySelector('[data-atlas-code]');
    var readoutUnd = document.querySelector('[data-atlas-und]');
    var swatchBtns = grid.querySelectorAll('.x-swatch');
    var selectedIndex = 24;
    var lastSwatchBtn = null;

    function previewReadout(btn) {
      if (!btn || !btn.classList.contains('x-swatch')) return;
      if (readoutName) {
        readoutName.textContent = btn.dataset.name || '';
        readoutName.style.removeProperty('color');
      }
      if (readoutCode) readoutCode.textContent = btn.dataset.code || '';
      if (readoutUnd) readoutUnd.textContent = btn.dataset.und || '';
    }

    function highlightAtlas(index) {
      swatchBtns.forEach(function (btn) {
        var on = parseInt(btn.dataset.shadeIndex, 10) === index;
        btn.classList.toggle('is-selected', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    function selectAtlas(index) {
      var s = shades[index - 1];
      if (!s) return;
      selectedIndex = index;
      lastSwatchBtn = s.el;
      highlightAtlas(index);
      if (s.el) previewReadout(s.el);
    }

    grid.addEventListener('mouseover', function (e) { previewReadout(e.target); });
    grid.addEventListener('focusin', function (e) { previewReadout(e.target); });
    grid.addEventListener('click', function (e) {
      if (e.target.classList && e.target.classList.contains('x-swatch')) {
        selectAtlas(parseInt(e.target.dataset.shadeIndex, 10));
      }
    });


    selectAtlas(24);
    return { selectAtlas: selectAtlas, getSelected: function () { return selectedIndex; } };
  }

  function initShopColour(shopRoot, shades, atlasApi) {
    var shopPanel = shopRoot.querySelector('[data-shop-panel]');
    var shopSwatch = shopRoot.querySelector('[data-shop-swatch]');
    var shopName = shopRoot.querySelector('[data-shop-shade-name]');
    var shopMeta = shopRoot.querySelector('[data-shop-shade-meta]');
    var shopGrid = shopRoot.querySelector('[data-shop-grid]');
    var shopTotal = shopRoot.querySelector('[data-shop-total]');
    var shopCta = shopRoot.querySelector('[data-shop-cta]');

    var selectedIndex = 24;
    var mode = 'complexion';

    function highlightAtlas(index) {
      shades.forEach(function (s) {
        if (!s.el) return;
        var on = s.index === index;
        s.el.classList.toggle('is-selected', on);
        s.el.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    function clearDepthActive() {
      shopRoot.querySelectorAll('[data-depth-pick]').forEach(function (b) {
        b.classList.remove('is-active');
      });
    }

    function renderProducts(index) {
      var list = PRODUCTS.filter(function (p) {
        return mode === 'ritual' || p.families.indexOf(mode) !== -1;
      });
      if (mode === 'complexion') {
        list = list.filter(function (p) { return p.id !== 'blush' && p.id !== 'tint'; });
      }
      if (mode === 'flush') {
        list = list.filter(function (p) { return p.id === 'blush' || p.id === 'tint'; });
      }

      shopGrid.innerHTML = '';
      var total = 0;
      list.forEach(function (p) {
        var shadeIdx = p.universal ? index : p.shadeFor(index);
        var sh = shades[shadeIdx - 1];
        total += p.price;
        var a = document.createElement('a');
        a.className = 'x-shop-colour__card';
        a.href = p.href;
        var swatchHtml = p.universal
          ? '<div class="x-shop-colour__card-swatch x-shop-colour__card-swatch--universal" aria-hidden="true">All</div>'
          : '<div class="x-shop-colour__card-swatch" style="background:' + (sh ? sh.hex : '#e8c4a1') + '" aria-hidden="true"></div>';
        a.innerHTML =
          swatchHtml +
          '<div><h4>' + p.title + '</h4>' +
          '<p>' + (p.universal ? 'Works with every shade' : 'Matched to your shade') + '</p>' +
          (sh && !p.universal ? '<p class="x-shop-colour__card-match">' + sh.name + ' · ' + sh.undertone + '</p>' : '') +
          '</div><span class="x-shop-colour__card-price">$' + p.price + '</span>';
        shopGrid.appendChild(a);
      });
      shopTotal.textContent = '$' + total;
      if (shopCta) {
        var collection = document.getElementById('shop-collection');
        shopCta.href = collection ? '#shop-collection' : 'products/soft-focus-foundation.html';
      }
    }

    function selectShade(index, fromDepth) {
      var s = shades[index - 1];
      if (!s) return;
      selectedIndex = index;
      highlightAtlas(index);
      shopPanel.classList.add('has-shade');
      shopSwatch.style.background = s.hex;
      shopName.textContent = s.name;
      shopMeta.textContent = s.undertone + ' undertone';
      if (!fromDepth) clearDepthActive();
      renderProducts(index);
      if (atlasApi) atlasApi.selectAtlas(index);
    }

    var grid = document.querySelector('[data-atlas-grid]');
    if (grid) {
      grid.addEventListener('click', function (e) {
        if (e.target.classList && e.target.classList.contains('x-swatch')) {
          selectShade(parseInt(e.target.dataset.shadeIndex, 10), false);
        }
      });
    }

    shopRoot.querySelectorAll('[data-depth-pick]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        shopRoot.querySelectorAll('[data-depth-pick]').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        selectShade(parseInt(btn.dataset.depthPick, 10), true);
      });
    });

    shopRoot.querySelectorAll('[data-shop-mode]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        mode = btn.dataset.shopMode;
        shopRoot.querySelectorAll('[data-shop-mode]').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        renderProducts(selectedIndex);
      });
    });

    var jump = document.querySelector('[data-shop-jump]');
    if (jump) {
      jump.addEventListener('click', function () {
        var targetId = jump.getAttribute('data-jump-target') || 'shop-matches';
        var section = document.getElementById(targetId);
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        selectShade(atlasApi ? atlasApi.getSelected() : selectedIndex, false);
      });
    }

    selectShade(24, true);
  }

  var grid = document.querySelector('[data-atlas-grid]');
  var shopRoot = document.querySelector('[data-shop-colour]');
  var shades = grid ? buildShadesFromGrid(grid) : buildShadesFallback();

  if (grid && shopRoot) {
    var atlasApi = initAtlas(grid, shades);
    initShopColour(shopRoot, shades, atlasApi);
  } else if (grid) {
    initAtlas(grid, shades);
  } else if (shopRoot) {
    initShopColour(shopRoot, shades, null);
  }
})();
