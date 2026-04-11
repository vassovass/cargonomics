/**
 * Cargonomics Form Submission Handler
 * Sends form data to Google Apps Script backend.
 * Replace APPS_SCRIPT_URL after deploying the Google Apps Script.
 *
 * See docs/google-apps-script.js for backend setup instructions.
 */

(function () {
  'use strict';

  // REPLACE THIS after deploying Google Apps Script
  var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw6AOARukN0nbULTzQ3u95Ams78SmqALhCZdxpEAWxvYCQ6UbI80t6dw1vniWBA2QBZIg/exec';

  function init() {
    // Application form
    var appForm = document.getElementById('application-form');
    if (appForm) {
      appForm.addEventListener('submit', function (e) {
        e.preventDefault();
        handleSubmit(appForm, 'application-form');
      });
    }

    // Inquiry form
    var inqForm = document.getElementById('inquiry-form');
    if (inqForm) {
      inqForm.addEventListener('submit', function (e) {
        e.preventDefault();
        handleSubmit(inqForm, 'inquiry-form');
      });
    }
  }

  function handleSubmit(form, formId) {
    var submitBtn = form.querySelector('[type="submit"]');
    if (!submitBtn || submitBtn.disabled) return;

    // Add submitted class for CSS validation styling
    form.classList.add('form--submitted');

    // Native validation check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Show loading state
    var originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting\u2026';

    // Collect form data as JSON
    var formData = new FormData(form);
    var payload = {};
    formData.forEach(function (value, key) {
      if (key !== 'consent') {
        payload[key] = value;
      }
    });

    // Add timestamp
    payload.submitted_at = new Date().toISOString();

    // Submit via fetch (no-cors required for Apps Script cross-origin)
    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload)
    })
      .then(function () {
        // With no-cors we cannot read the response body,
        // but if fetch resolved without throwing, the request was sent.
        showSuccess(form, formId);

        // Track in analytics if available (integrates with PRD 10 analytics.js)
        if (window.CargoAnalytics && window.CargoAnalytics.trackFormSubmit) {
          window.CargoAnalytics.trackFormSubmit(
            payload.form_source || formId,
            formId
          );
        }
      })
      .catch(function (err) {
        console.error('Form submission error:', err);
        showError(form, formId);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
  }

  function showSuccess(form, formId) {
    // Hide form content
    form.style.display = 'none';

    // Show success message (sibling or nearby element)
    var successId = formId === 'application-form' ? 'app-form-success' : 'inq-form-success';
    var successEl = document.getElementById(successId)
      || form.parentElement.querySelector('.form__success');
    if (successEl) {
      successEl.hidden = false;
      successEl.removeAttribute('hidden');
    }
  }

  function showError(form, formId) {
    var errorId = formId === 'application-form' ? 'app-form-error' : 'inq-form-error';
    var errorEl = document.getElementById(errorId)
      || form.parentElement.querySelector('.form__error');
    if (errorEl) {
      errorEl.hidden = false;
      errorEl.removeAttribute('hidden');
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
