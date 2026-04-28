/* ==========================================================================
   Floating buttons: hide on footer visibility
   --------------------------------------------------------------------------
   The fixed WhatsApp + Zalo stack lives at bottom-right (z-index 99). When
   the footer scrolls into view, its LinkedIn icon sits at the same screen
   position as the WhatsApp button, blocking the click. This script hides
   the floating stack while the footer is visible and restores it when the
   user scrolls back up.

   Graceful degradation: if IntersectionObserver is unavailable, the FAB
   simply stays visible — the footer anchors are now also clickable, so
   reaching LinkedIn via the footer is still possible (just not from
   scroll-end).

   WordPress/Elementor port: this drops 1:1 into Elementor's "Custom Code"
   widget, OR Elementor Pro's "Display Conditions → Element Visible" feature
   provides the same effect with no code.
   ========================================================================== */

(function () {
  'use strict';

  var fab = document.querySelector('.floating-buttons');
  var footer = document.querySelector('.footer');

  if (!fab || !footer || !('IntersectionObserver' in window)) return;

  var io = new IntersectionObserver(function (entries) {
    fab.classList.toggle('floating-buttons--hidden', entries[0].isIntersecting);
  }, { threshold: 0.35 });

  io.observe(footer);
})();
