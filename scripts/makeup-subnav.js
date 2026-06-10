(function () {
  var subnav = document.querySelector("[data-makeup-subnav]");
  if (!subnav) return;

  var links = Array.prototype.slice.call(
    subnav.querySelectorAll("[data-makeup-subnav-link]")
  );
  if (!links.length) return;

  var sections = links
    .map(function (link) {
      var id = (link.getAttribute("href") || "").replace(/^#/, "");
      var el = id ? document.getElementById(id) : null;
      return el ? { link: link, el: el } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  function setActive(target) {
    links.forEach(function (link) {
      link.classList.toggle("is-active", link === target);
    });
  }

  if ("IntersectionObserver" in window) {
    var visible = new Map();
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            visible.set(entry.target, entry.intersectionRatio);
          } else {
            visible.delete(entry.target);
          }
        });

        var best = null;
        var bestRatio = 0;
        visible.forEach(function (ratio, el) {
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            best = el;
          }
        });

        if (!best) return;
        var match = sections.find(function (s) {
          return s.el === best;
        });
        if (match) setActive(match.link);
      },
      {
        root: null,
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    sections.forEach(function (s) {
      io.observe(s.el);
    });
  }

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setActive(link);
    });
  });
})();
