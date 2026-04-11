/**
 * Cargonomics Analytics & Event Tracking
 * Requires GTM container GTM-NCG2LPNQ loaded before this script.
 *
 * CTA Tracking Framework:
 * - data-track="cta" : marks element for auto-tracking
 * - data-cta-type    : action category (apply, inquire, learn-more, contact, social)
 * - data-cta-location: page section (hero, nav, pillar-coach, footer, etc.)
 * - data-cta-destination: target (contact-form, course-page, external, etc.)
 */

(function() {
  'use strict';

  // Utility: push event to dataLayer
  function trackEvent(eventName, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, params));
  }

  // Auto-bind CTA click tracking
  function initCTATracking() {
    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-track="cta"]');
      if (!el) return;

      trackEvent('cta_click', {
        cta_type: el.getAttribute('data-cta-type') || 'unknown',
        cta_location: el.getAttribute('data-cta-location') || 'unknown',
        cta_destination: el.getAttribute('data-cta-destination') || 'unknown',
        cta_text: (el.textContent || '').trim().substring(0, 100),
        cta_url: el.getAttribute('href') || ''
      });
    });
  }

  // Form submission tracking (called by form-submit.js on success)
  function trackFormSubmit(formName, formLocation) {
    trackEvent('form_submit', {
      form_name: formName,
      form_location: formLocation
    });
  }

  // Expose for other scripts
  window.CargoAnalytics = {
    trackEvent: trackEvent,
    trackFormSubmit: trackFormSubmit
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCTATracking);
  } else {
    initCTATracking();
  }
})();
