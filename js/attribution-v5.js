/**
 * Cargonomics Attribution & UTM Tracking
 * Captures UTM parameters, persists in cookies, auto-fills form fields,
 * classifies traffic sources, and pushes attribution data to GTM dataLayer.
 *
 * Supports first-touch and last-touch attribution models.
 * Fails silently if cookies are blocked.
 *
 * Reference: HandL UTM Grabber v3 pattern (simplified for static site, no jQuery)
 */

(function() {
  'use strict';

  // -----------------------------------------------------------------------
  // Configuration
  // -----------------------------------------------------------------------
  var CONFIG = {
    cookieExpiry: 30,             // days
    cookiePath: '/cargonomics/',   // GitHub Pages path. Change to '/' on custom domain.
    cookieSecure: true,
    cookieSameSite: 'Lax',
    gaRetryDelay: 2000            // ms to wait before retrying GA cookie read
  };

  // UTM parameters to capture from URL
  var UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  // Click ID parameters to capture from URL
  var CLICK_IDS = ['gclid', 'fbclid', 'msclkid'];

  // All trackable URL params (UTM + click IDs)
  var ALL_URL_PARAMS = UTM_PARAMS.concat(CLICK_IDS);

  // First-touch cookie prefix
  var FIRST_TOUCH_PREFIX = 'first_';

  // Hidden form fields to auto-fill from cookies
  var FORM_FIELDS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
    'gclid', 'fbclid', 'referrer', 'landing_page'
  ];

  // Search engine domains for organic classification
  var SEARCH_ENGINES = [
    'google', 'bing', 'yahoo', 'duckduckgo', 'baidu',
    'coccoc', 'ecosia', 'yandex'
  ];

  // Social network domains
  var SOCIAL_NETWORKS = [
    'facebook', 'instagram', 'linkedin', 'twitter', 'x.com',
    'youtube', 'zalo', 'tiktok', 't.co'
  ];

  // -----------------------------------------------------------------------
  // Cookie Helpers
  // -----------------------------------------------------------------------

  /**
   * Read a cookie value by name. Returns empty string if not found.
   */
  function getCookie(name) {
    try {
      var match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : '';
    } catch (e) {
      return '';
    }
  }

  /**
   * Set a cookie with the configured expiry, path, secure, and SameSite flags.
   */
  function setCookie(name, value, days) {
    try {
      if (days === undefined) {
        days = CONFIG.cookieExpiry;
      }
      var expires = '';
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
      }
      var parts = [
        encodeURIComponent(name) + '=' + encodeURIComponent(value),
        expires,
        '; path=' + CONFIG.cookiePath,
        '; SameSite=' + CONFIG.cookieSameSite
      ];
      if (CONFIG.cookieSecure) {
        parts.push('; Secure');
      }
      document.cookie = parts.join('');
    } catch (e) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[CargoAttribution] Could not set cookie:', name, e);
      }
    }
  }

  /**
   * Delete a cookie by setting it to expire in the past.
   */
  function deleteCookie(name) {
    try {
      document.cookie = encodeURIComponent(name) + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + CONFIG.cookiePath;
    } catch (e) {
      // fail silently
    }
  }

  // -----------------------------------------------------------------------
  // URL Parameter Parsing
  // -----------------------------------------------------------------------

  /**
   * Parse the current URL query string and return an object of param values.
   * Only returns params that are in the ALL_URL_PARAMS list.
   */
  function getURLParams() {
    var params = {};
    try {
      var search = new URLSearchParams(window.location.search);
      for (var i = 0; i < ALL_URL_PARAMS.length; i++) {
        var key = ALL_URL_PARAMS[i];
        var val = search.get(key);
        if (val !== null && val !== '') {
          params[key] = val;
        }
      }
    } catch (e) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[CargoAttribution] Could not parse URL params:', e);
      }
    }
    return params;
  }

  /**
   * Returns true if any trackable URL parameters are present.
   */
  function hasURLParams(params) {
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        return true;
      }
    }
    return false;
  }

  // -----------------------------------------------------------------------
  // Capture URL Parameters (first-touch + last-touch)
  // -----------------------------------------------------------------------

  function captureURLParams() {
    var params = getURLParams();
    if (!hasURLParams(params)) {
      return; // No UTM/click params in URL, do not modify existing cookies
    }

    // Set last-touch cookies (overwrite on every visit with params)
    for (var i = 0; i < ALL_URL_PARAMS.length; i++) {
      var key = ALL_URL_PARAMS[i];
      if (params[key]) {
        setCookie(key, params[key]);
      }
    }

    // Set first-touch cookies only if they do not already exist
    for (var j = 0; j < ALL_URL_PARAMS.length; j++) {
      var fKey = ALL_URL_PARAMS[j];
      var firstKey = FIRST_TOUCH_PREFIX + fKey;
      if (params[fKey] && !getCookie(firstKey)) {
        setCookie(firstKey, params[fKey]);
      }
    }
  }

  // -----------------------------------------------------------------------
  // Referrer and Landing Page Tracking
  // -----------------------------------------------------------------------

  /**
   * Extract hostname from a URL string. Returns empty string on failure.
   */
  function extractHostname(url) {
    try {
      if (!url) return '';
      // Use an anchor element to parse the URL
      var a = document.createElement('a');
      a.href = url;
      return a.hostname || '';
    } catch (e) {
      return '';
    }
  }

  /**
   * On first visit (no landing_page cookie), record the landing page URL,
   * referrer URL, and referrer domain.
   */
  function captureReferrer() {
    // Only capture on first visit
    if (getCookie('landing_page')) {
      return;
    }

    // Landing page: current page URL
    setCookie('landing_page', window.location.href);

    // Referrer
    var ref = document.referrer || '';
    if (ref) {
      setCookie('referrer', ref);
      var domain = extractHostname(ref);
      setCookie('referrer_domain', domain || '(direct)');
    } else {
      setCookie('referrer', '(direct)');
      setCookie('referrer_domain', '(direct)');
    }
  }

  // -----------------------------------------------------------------------
  // Traffic Source Classification
  // -----------------------------------------------------------------------

  /**
   * Check if a string contains any of the substrings in the list.
   * Case-insensitive comparison.
   */
  function containsAny(str, list) {
    if (!str) return false;
    var lower = str.toLowerCase();
    for (var i = 0; i < list.length; i++) {
      if (lower.indexOf(list[i].toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if any click ID (gclid, fbclid, msclkid) is set.
   */
  function hasClickId() {
    for (var i = 0; i < CLICK_IDS.length; i++) {
      if (getCookie(CLICK_IDS[i])) {
        return true;
      }
    }
    return false;
  }

  /**
   * Classify the traffic source type and store in a cookie.
   * Only classify on first visit or when UTM parameters change (i.e., URL has params).
   */
  function classifyTrafficSource() {
    var params = getURLParams();
    var hasParams = hasURLParams(params);

    // If we already have a classification and there are no new URL params, keep it
    if (getCookie('traffic_source_type') && !hasParams) {
      return;
    }

    var sourceType = 'direct';
    var utmMedium = getCookie('utm_medium').toLowerCase();
    var referrerDomain = getCookie('referrer_domain');

    // 1. Paid: click IDs present OR utm_medium contains paid keywords
    if (hasClickId() || containsAny(utmMedium, ['cpc', 'ppc', 'paid'])) {
      sourceType = 'paid';
    }
    // 2. Organic: referrer matches search engines
    else if (containsAny(referrerDomain, SEARCH_ENGINES)) {
      sourceType = 'organic';
    }
    // 3. Social: referrer matches social networks
    else if (containsAny(referrerDomain, SOCIAL_NETWORKS)) {
      sourceType = 'social';
    }
    // 4. Email: utm_medium contains email keywords
    else if (containsAny(utmMedium, ['email', 'newsletter'])) {
      sourceType = 'email';
    }
    // 5. Referral: referrer exists but no match above
    else if (referrerDomain && referrerDomain !== '(direct)') {
      sourceType = 'referral';
    }
    // 6. Direct: no referrer and no UTM parameters
    else {
      sourceType = 'direct';
    }

    setCookie('traffic_source_type', sourceType);
  }

  // -----------------------------------------------------------------------
  // Hidden Form Field Auto-Fill
  // -----------------------------------------------------------------------

  /**
   * Find all hidden input fields whose name matches a cookie and populate them.
   */
  function fillFormFields() {
    try {
      for (var i = 0; i < FORM_FIELDS.length; i++) {
        var fieldName = FORM_FIELDS[i];
        var cookieValue = getCookie(fieldName);
        if (!cookieValue) continue;

        // Find all hidden inputs with this name (may exist in multiple forms)
        var inputs = document.querySelectorAll('input[type="hidden"][name="' + fieldName + '"]');
        for (var j = 0; j < inputs.length; j++) {
          inputs[j].value = cookieValue;
        }
      }
    } catch (e) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[CargoAttribution] Could not fill form fields:', e);
      }
    }
  }

  // -----------------------------------------------------------------------
  // dataLayer Push
  // -----------------------------------------------------------------------

  /**
   * Push attribution data as an event to the GTM dataLayer.
   */
  function pushToDataLayer() {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'attribution_loaded',
        utm_source: getCookie('utm_source') || '',
        utm_medium: getCookie('utm_medium') || '',
        utm_campaign: getCookie('utm_campaign') || '',
        utm_content: getCookie('utm_content') || '',
        utm_term: getCookie('utm_term') || '',
        traffic_source_type: getCookie('traffic_source_type') || 'direct',
        landing_page: getCookie('landing_page') || '',
        referrer_domain: getCookie('referrer_domain') || ''
      });
    } catch (e) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[CargoAttribution] Could not push to dataLayer:', e);
      }
    }
  }

  // -----------------------------------------------------------------------
  // GA Client ID Capture
  // -----------------------------------------------------------------------

  /**
   * Try to extract the GA4 client ID from the _ga cookie.
   * Format: GA1.X.XXXXXXXXXX.XXXXXXXXXX -- client ID is the last two parts.
   * If the cookie does not exist yet, retry once after a delay.
   */
  function captureGAClientId() {
    function readAndStore() {
      var gaCookie = getCookie('_ga');
      if (gaCookie) {
        var parts = gaCookie.split('.');
        if (parts.length >= 4) {
          var clientId = parts[parts.length - 2] + '.' + parts[parts.length - 1];
          setCookie('ga_client_id', clientId);
          return true;
        }
      }
      return false;
    }

    // Try immediately
    if (readAndStore()) return;

    // Retry once after delay (GA4 may not have loaded yet)
    setTimeout(function() {
      if (!readAndStore()) {
        setCookie('ga_client_id', 'unavailable');
      }
    }, CONFIG.gaRetryDelay);
  }

  // -----------------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------------

  /**
   * Returns all attribution cookie values as a plain object.
   */
  function getAttribution() {
    var data = {};

    // Last-touch UTM params
    for (var i = 0; i < ALL_URL_PARAMS.length; i++) {
      data[ALL_URL_PARAMS[i]] = getCookie(ALL_URL_PARAMS[i]);
    }

    // First-touch UTM params
    for (var j = 0; j < ALL_URL_PARAMS.length; j++) {
      data[FIRST_TOUCH_PREFIX + ALL_URL_PARAMS[j]] = getCookie(FIRST_TOUCH_PREFIX + ALL_URL_PARAMS[j]);
    }

    // Referrer and landing page
    data.referrer = getCookie('referrer');
    data.referrer_domain = getCookie('referrer_domain');
    data.landing_page = getCookie('landing_page');
    data.traffic_source_type = getCookie('traffic_source_type');
    data.ga_client_id = getCookie('ga_client_id');

    return data;
  }

  // -----------------------------------------------------------------------
  // Initialize
  // -----------------------------------------------------------------------

  function init() {
    captureURLParams();
    captureReferrer();
    classifyTrafficSource();
    fillFormFields();
    pushToDataLayer();
    captureGAClientId();
  }

  // Expose public API
  window.CargoAttribution = {
    getAttribution: getAttribution,
    getCookie: getCookie
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
