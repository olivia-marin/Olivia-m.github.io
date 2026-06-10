(function () {
  var track = document.querySelector("[data-hot-picks-rail] .hot-picks__track");
  if (!track) return;

  /* Map vertical wheel to horizontal scroll so the carousel doesn't move the page vertically */
  track.addEventListener(
    "wheel",
    function (e) {
      if (track.scrollWidth <= track.clientWidth) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      e.preventDefault();
      track.scrollLeft += e.deltaY;
    },
    { passive: false }
  );

  /* Prevent touch gestures from scrolling the page vertically while swiping the rail */
  var touchStartY = 0;
  var touchStartX = 0;

  track.addEventListener(
    "touchstart",
    function (e) {
      if (e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchmove",
    function (e) {
      if (e.touches.length !== 1) return;
      var dy = Math.abs(e.touches[0].clientY - touchStartY);
      var dx = Math.abs(e.touches[0].clientX - touchStartX);
      if (dx > dy) {
        e.stopPropagation();
      }
    },
    { passive: true }
  );
})();
