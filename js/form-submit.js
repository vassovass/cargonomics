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

  // Environment-aware form source tag, derived at submit time from the
  // current hostname. Overrides any form-field value so staging and
  // production submissions land in the same Sheet with distinct labels.
  // Survives the WordPress migration unchanged.
  //
  // See PRD 16 (Dev/Live Environments on Cloudflare Pages) and
  // docs/infra/deploy-workflow.md.
  function deriveFormSource() {
    var host = (window.location && window.location.hostname) || '';
    host = host.toLowerCase();
    if (host === 'cargonomics.com.vn' || host === 'www.cargonomics.com.vn') {
      return 'production';
    }
    if (host.indexOf('.pages.dev') !== -1) {
      return 'staging';
    }
    if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '') {
      return 'local';
    }
    // Fallback: return the hostname verbatim so the Sheet still tags it.
    return host;
  }

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

  // 10MB ceiling for any single uploaded file. Apps Script web apps
  // have a hard payload limit around 50MB but base64 inflates size ~33%,
  // and we want margin for multiple files in one submission.
  var MAX_FILE_BYTES = 10 * 1024 * 1024;

  /**
   * Read a File as base64 and wrap it in the transport envelope the
   * Apps Script side expects. The payload shape is:
   *
   *   { filename: 'cv.pdf', mimeType: 'application/pdf', base64: 'JVBERi0...' }
   *
   * The `data:<mime>;base64,` prefix from FileReader.readAsDataURL is
   * stripped — Apps Script's Utilities.base64Decode expects the raw
   * base64 chunk only.
   */
  function fileToPayload(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        var dataUrl = reader.result || '';
        var commaIdx = dataUrl.indexOf(',');
        var base64 = commaIdx >= 0 ? dataUrl.slice(commaIdx + 1) : dataUrl;
        resolve({
          filename: file.name,
          mimeType: file.type || 'application/octet-stream',
          base64: base64
        });
      };
      reader.onerror = function () {
        reject(reader.error || new Error('FileReader failed'));
      };
      reader.readAsDataURL(file);
    });
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

    // Collect form data as JSON.
    // Multi-value fields (e.g. checkbox groups like "how_did_you_hear")
    // are joined into a comma-separated string so they land in one
    // sheet column rather than overwriting each other.
    //
    // File inputs (cv_upload, other_attachment) need special handling:
    // File objects are not JSON-serialisable. We read each one as
    // base64 via FileReader and replace the key's value with a
    // { filename, mimeType, base64 } envelope that the Apps Script
    // backend unpacks into a Drive upload. Empty file inputs are
    // dropped from the payload entirely rather than sent as empty
    // envelopes. See docs/google-apps-script.js saveUploadToDrive_().
    var formData = new FormData(form);
    var payload = {};
    var seenKeys = {};
    formData.forEach(function (_value, key) {
      seenKeys[key] = true;
    });

    var filePromises = [];

    try {
      Object.keys(seenKeys).forEach(function (key) {
        if (key === 'consent') return;
        var values = formData.getAll(key);

        // Inspect first value to decide file vs text handling.
        // A single form field won't mix File and string values.
        var first = values[0];
        var isFile = first && typeof first === 'object' && (typeof File !== 'undefined') && first instanceof File;

        if (isFile) {
          // Only one file input per key in practice (no multi-select on
          // cv_upload / other_attachment), but handle defensively.
          var file = first;

          // Empty file input: browser hands back a File with name="" and
          // size=0. Drop the key rather than sending a placeholder.
          if (file.name === '' && file.size === 0) {
            return;
          }

          if (file.size > MAX_FILE_BYTES) {
            throw new Error(
              'File "' + file.name + '" is ' + Math.round(file.size / 1024 / 1024) +
              'MB. Maximum allowed is 10MB. Please attach a smaller file.'
            );
          }

          filePromises.push(
            fileToPayload(file).then(function (envelope) {
              payload[key] = envelope;
            })
          );
        } else {
          payload[key] = values.length > 1 ? values.join(', ') : values[0];
        }
      });
    } catch (validationErr) {
      // Oversize or similar pre-flight failure. Surface to user and
      // abort before any network call.
      console.error('Form validation error:', validationErr);
      window.alert(validationErr.message);
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    // Wait for every file read to finish before POSTing. FileReader
    // is async, so without Promise.all the fetch would fire with
    // missing file payloads.
    Promise.all(filePromises)
      .then(function () {
        // Add timestamp
        payload.submitted_at = new Date().toISOString();

        // Environment-aware form_source, overriding any form-field value.
        // Keeps production and staging submissions distinguishable in the
        // same Google Sheet without a build-time env var.
        payload.form_source_env = deriveFormSource();

        // Submit via fetch (no-cors required for Apps Script cross-origin)
        return fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(payload)
        });
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
