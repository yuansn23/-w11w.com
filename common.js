/**
 * HX DATA - Common JavaScript
 * Shared across all pages
 */

// ============================================================
// k2 Method - Contact redirect
// ============================================================
function k2(event) {
  if (event) event.preventDefault();
  window.open('https://t.me/love16988', '_blank');
}

// ============================================================
// Header scroll effect
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ============================================================
  // Mobile menu toggle
  // ============================================================
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.nav-overlay');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function () {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close mobile nav when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (hamburger) hamburger.classList.remove('active');
      if (nav) nav.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ============================================================
  // FAQ Accordion
  // ============================================================
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const faqItem = this.parentElement;
      const isOpen = faqItem.classList.contains('open');

      // Close all FAQs
      document.querySelectorAll('.faq-item.open').forEach(function (item) {
        item.classList.remove('open');
      });

      // Open clicked FAQ if it wasn't open
      if (!isOpen) {
        faqItem.classList.add('open');
      }
    });
  });

  // ============================================================
  // Scroll Reveal Animation
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 50) {
        el.classList.add('visible');
      }
    });
  }

  // Initial check
  checkReveal();

  // Check on scroll
  window.addEventListener('scroll', checkReveal);

  // ============================================================
  // Smooth scroll for anchor links
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================================
  // Set active nav link based on current page
  // ============================================================
  const currentPath = window.location.pathname;
  const allNavLinks = document.querySelectorAll('.nav-link');
  allNavLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href) {
      // Check if this link matches current page
      if (currentPath.endsWith(href) ||
          (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')))) {
        link.classList.add('active');
      }
    }
  });

  // ============================================================
  // Animated Counter - Count from 0 to target over 2-3 seconds
  // ============================================================
  const counterElements = document.querySelectorAll('[data-count]');
  const animated = new Set();

  function animateCounter(el) {
    if (animated.has(el)) return;
    animated.add(el);

    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = parseInt(el.getAttribute('data-duration') || '2500', 10); // ms
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (decimals > 0) {
        el.textContent = prefix + current.toFixed(decimals) + suffix;
      } else {
        el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + (decimals > 0 ? target.toFixed(decimals) : target.toLocaleString()) + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  // Trigger on scroll
  function checkCounters() {
    counterElements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        // Small delay for visual impact
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { animateCounter(el); }, delay);
      }
    });
  }

  checkCounters();
  window.addEventListener('scroll', checkCounters);
});

// ============================================================
// CUSTOM SCRIPT TEMPLATE — paste your script below this line
// ============================================================
// TODO: Replace the placeholder code below with your actual script

(function() {
  // Your custom script goes here
  console.log('Custom script loaded — replace this with your actual code.');
})();
