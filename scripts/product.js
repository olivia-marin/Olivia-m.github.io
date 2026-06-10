(function () {
  var shadeButtons = document.querySelectorAll("[data-shade]");
  var shadeName = document.querySelector("[data-shade-name]");

  shadeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      shadeButtons.forEach(function (b) {
        b.classList.remove("is-selected");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-selected");
      btn.setAttribute("aria-pressed", "true");
      if (shadeName) {
        shadeName.textContent = btn.getAttribute("data-shade") || "";
      }
    });
  });
})();
