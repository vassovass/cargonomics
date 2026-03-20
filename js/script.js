/**
 * Cargonomics Homepage — Interactive Behavior
 * Vanilla JS, performance-first. CSS handles transitions; JS handles triggers and scroll detection.
 */
(function () {
  'use strict';

  // Cache DOM references once
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__mobile-toggle');
  const navLinks = document.querySelector('.nav__links');
  const credibilitySection = document.querySelector('.credibility');
  const modalOverlay = document.querySelector('.modal-overlay');
  const stickyPromo = document.querySelector('.sticky-promo');
  const heroVideoPlay = document.querySelector('.hero__play-btn');

  // ─── 1. Mobile Menu Toggle ───────────────────────────────────────────

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      navLinks.classList.toggle('is-open');
    });

    // Close when a nav link is clicked
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('is-open');
      }
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove('is-open');
      }
    });
  }

  // ─── 2. Sticky Nav Background ────────────────────────────────────────

  if (nav) {
    var scrolled = false;

    window.addEventListener('scroll', function () {
      var shouldBeScrolled = window.scrollY > 50;
      if (shouldBeScrolled !== scrolled) {
        scrolled = shouldBeScrolled;
        nav.classList.toggle('nav--scrolled', scrolled);
      }
    }, { passive: true });
  }

  // ─── 3. Scroll-Triggered Section Reveals ─────────────────────────────

  var fadeElements = document.querySelectorAll('.fade-up');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // ─── 4. Credibility Stats Counter Animation ──────────────────────────

  var statsAnimated = false;

  function animateCounter(el, target, duration) {
    var start = 0;
    var startTime = null;
    var suffix = el.getAttribute('data-suffix') || '';

    function formatNumber(n) {
      return n.toLocaleString('en-US');
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = formatNumber(current) + (progress >= 1 ? suffix : '');
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  if (credibilitySection && 'IntersectionObserver' in window) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          var counters = credibilitySection.querySelectorAll('[data-target]');
          counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-target'), 10);
            if (!isNaN(target)) {
              animateCounter(counter, target, 2000);
            }
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    statsObserver.observe(credibilitySection);
  }

  // ─── 5. Desktop Modal (WYDLS Popup) ──────────────────────────────────

  if (modalOverlay && window.innerWidth >= 768) {
    var modalShown = sessionStorage.getItem('cargonomics_modal_shown');

    if (!modalShown) {
      var modalTimer = setTimeout(function () {
        modalOverlay.classList.add('is-active');
        sessionStorage.setItem('cargonomics_modal_shown', '1');
      }, 8000);

      function closeModal() {
        modalOverlay.classList.remove('is-active');
      }

      modalOverlay.addEventListener('click', function (e) {
        if (
          e.target === modalOverlay ||
          e.target.closest('.modal__close') ||
          e.target.closest('.modal__dismiss') ||
          e.target.closest('.modal__cta')
        ) {
          closeModal();
        }
      });
    }
  }

  // ─── 6. Mobile Sticky Bar ────────────────────────────────────────────

  if (stickyPromo && window.innerWidth < 768) {
    var promoDismissed = sessionStorage.getItem('cargonomics_promo_dismissed');

    if (!promoDismissed) {
      var promoShown = false;

      window.addEventListener('scroll', function () {
        if (promoShown) return;
        var scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        if (scrollPercent > 0.5) {
          promoShown = true;
          stickyPromo.classList.add('is-visible');
        }
      }, { passive: true });

      var promoClose = stickyPromo.querySelector('.sticky-promo__close');
      if (promoClose) {
        promoClose.addEventListener('click', function () {
          stickyPromo.classList.remove('is-visible');
          sessionStorage.setItem('cargonomics_promo_dismissed', '1');
        });
      }
    }
  }

  // ─── 7. Smooth Scroll ────────────────────────────────────────────────

  var NAV_HEIGHT = 60;

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var hash = link.getAttribute('href');
    if (hash === '#' || hash.length < 2) return;

    var target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    var top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });

  // ─── 8. Program Card Hover (Mobile Tap Support) ──────────────────────

  var programCards = document.querySelectorAll('.program-card');

  programCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      card.classList.add('is-hovered');
    });
    card.addEventListener('mouseleave', function () {
      card.classList.remove('is-hovered');
    });
    // Tap toggle for touch devices
    card.addEventListener('touchstart', function () {
      card.classList.toggle('is-hovered');
    }, { passive: true });
  });

  // ─── 9. Journey Step Hover ───────────────────────────────────────────

  var journeySteps = document.querySelectorAll('.journey-v2__step');

  journeySteps.forEach(function (step) {
    step.addEventListener('mouseenter', function () {
      step.classList.add('is-hovered');
    });
    step.addEventListener('mouseleave', function () {
      step.classList.remove('is-hovered');
    });
  });

  // ─── 10. Video Play Button — YouTube Embed on Click ─────────────────

  if (heroVideoPlay) {
    heroVideoPlay.addEventListener('click', function () {
      var videoContainer = document.querySelector('.hero__video');
      var videoId = videoContainer ? videoContainer.getAttribute('data-video-id') : null;
      if (!videoId) return;

      var wrapper = videoContainer.querySelector('.hero__video-wrapper');
      if (!wrapper) return;

      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0');
      iframe.setAttribute('title', 'Cargonomics — Where Shipping Careers Begin');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border-radius:inherit;';

      wrapper.style.position = 'relative';
      wrapper.innerHTML = '';
      wrapper.appendChild(iframe);

      // Hide the label
      var label = videoContainer.querySelector('.hero__video-label');
      if (label) label.style.display = 'none';
    });
  }

})();
