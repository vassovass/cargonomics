/**
 * Image Review Carousel
 * Temporary tool for reviewing image options during development.
 *
 * Usage: Add data-images='["img/hero-1.jpg","img/hero-2.jpg","img/hero-3.jpg"]'
 * to any <img> tag. Clicking the image cycles through options.
 * A small overlay shows the current filename.
 *
 * To finalize: remove this <script> tag, remove data-images attributes,
 * and keep the chosen src on each <img>.
 */

(function() {
  'use strict';

  function init() {
    var images = document.querySelectorAll('img[data-images]');
    if (!images.length) return;

    images.forEach(function(img) {
      var options;
      try {
        options = JSON.parse(img.getAttribute('data-images'));
      } catch (e) {
        console.warn('image-review: invalid data-images JSON on', img);
        return;
      }

      if (!options || !options.length) return;

      // Set first image as src if not already matching
      if (options.indexOf(img.getAttribute('src')) === -1) {
        img.setAttribute('src', options[0]);
      }

      var currentIndex = Math.max(0, options.indexOf(img.getAttribute('src')));

      // Style the image as clickable
      img.style.cursor = 'pointer';

      // Create overlay label
      var wrapper = document.createElement('div');
      wrapper.style.cssText = 'position:relative;display:inline-block;';

      var label = document.createElement('span');
      label.style.cssText = 'position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,0.75);color:#D4B468;font-size:12px;padding:3px 8px;border-radius:4px;pointer-events:none;font-family:monospace;z-index:10;';
      label.textContent = getFilename(options[currentIndex]) + ' (' + (currentIndex + 1) + '/' + options.length + ')';

      // Wrap the image
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
      wrapper.appendChild(label);

      // Click to cycle
      img.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % options.length;
        img.setAttribute('src', options[currentIndex]);
        label.textContent = getFilename(options[currentIndex]) + ' (' + (currentIndex + 1) + '/' + options.length + ')';
      });
    });

    // Add a small notice at the top of the page
    var notice = document.createElement('div');
    notice.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#D4B468;color:#11294B;text-align:center;padding:6px;font-size:13px;font-weight:bold;z-index:9999;';
    notice.textContent = 'IMAGE REVIEW MODE: Click any image to cycle through options. Note the filename of your preferred choice.';
    document.body.insertBefore(notice, document.body.firstChild);
  }

  function getFilename(path) {
    return path.split('/').pop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
