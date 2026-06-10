/* Scroll reveal for makeup page product tiles and shade swatches */
(function () {
  if (!document.body.classList.contains("page-makeup")) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var io = null;
  var watched = new WeakSet();

  function initSwatches() {
    var swatches = document.querySelectorAll(".x-atlas__grid .x-swatch");
    swatches.forEach(function (btn, i) {
      btn.classList.add("reveal");
      var col = i % 12;
      if (col === 1) btn.classList.add("reveal--delay-1");
      else if (col === 2) btn.classList.add("reveal--delay-2");
      else if (col === 3) btn.classList.add("reveal--delay-3");
    });
  }

  function targets() {
    return document.querySelectorAll(
      "[data-makeup-shop] .product-card.reveal, .x-atlas__grid .x-swatch.reveal"
    );
  }

  function show(el) {
    el.classList.add("is-visible");
    if (io) io.unobserve(el);
    watched.delete(el);
  }

  function watch(el) {
    if (!io || reduceMotion || !el || el.hidden) return;
    if (el.classList.contains("is-visible") || watched.has(el)) return;
    watched.add(el);
    io.observe(el);
  }

  function refreshReveals() {
    if (reduceMotion) {
      targets().forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    targets().forEach(function (el) {
      if (el.hidden) {
        el.classList.remove("is-visible");
        if (io) io.unobserve(el);
        watched.delete(el);
        return;
      }
      if (!el.classList.contains("is-visible")) {
        watch(el);
      }
    });
  }

  function init() {
    initSwatches();

    if (reduceMotion) {
      refreshReveals();
      return;
    }

    io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) show(entry.target);
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px 8% 0px" }
    );

    refreshReveals();
  }

  window.MakeupScrollReveal = { refresh: refreshReveals };
  init();
})();
