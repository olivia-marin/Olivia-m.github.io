(function () {
  var body = document.body;
  var header = document.querySelector("[data-site-header]");
  var menuToggles = document.querySelectorAll("[data-menu-toggle]");
  var overlay = document.querySelector("[data-overlay-menu]");
  var progressBar = document.querySelector("[data-scroll-progress]");
  var cursor = document.querySelector("[data-cursor]");

  /* ---------- Header: hide on scroll-down, show on scroll-up ---------- */
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;

    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
      if (y > 140) {
        header.classList.toggle("is-hidden", y > lastY);
      } else {
        header.classList.remove("is-hidden");
      }
    }

    if (progressBar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (y / max) * 100 : 0;
      progressBar.style.width = pct + "%";
    }

    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Overlay menu ---------- */
  function setMenu(open) {
    if (!menuToggles.length || !overlay) return;
    menuToggles.forEach(function (btn) {
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      btn.classList.toggle("is-active", open);
      var bars = btn.querySelector(".bars");
      if (bars) bars.classList.toggle("is-active", open);
    });
    overlay.classList.toggle("is-open", open);
    overlay.setAttribute("aria-hidden", String(!open));
    body.classList.toggle("menu-open", open);
  }

  if (menuToggles.length && overlay) {
    setMenu(false);
    menuToggles.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = overlay.classList.contains("is-open");
        setMenu(!open);
      });
    });
    overlay.addEventListener("click", function (e) {
      var t = e.target;
      if (t instanceof HTMLElement && (t.matches("[data-close-menu]") || t.closest("a"))) {
        setMenu(false);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) setMenu(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal, .mask");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Custom cursor ring (desktop / fine pointer) ---------- */
  var isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (cursor && isFinePointer && !reduceMotion) {
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    var tx = cx;
    var ty = cy;

    document.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      cursor.classList.add("is-visible");
    });

    document.addEventListener("mouseleave", function () {
      cursor.classList.remove("is-visible");
    });

    function render() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%, -50%)";
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    var hoverable = document.querySelectorAll("a, button, .product, .category-strip");
    hoverable.forEach(function (el) {
      el.addEventListener("mouseenter", function () { cursor.classList.add("is-hover"); });
      el.addEventListener("mouseleave", function () { cursor.classList.remove("is-hover"); });
    });
  }

  /* ---------- Hero parallax on big screens ---------- */
  var heroMedia = document.querySelector("[data-hero-media]");
  if (heroMedia && !reduceMotion) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      heroMedia.style.transform = "translateY(" + y * 0.18 + "px) scale(1.05)";
    }, { passive: true });
  }
})();
