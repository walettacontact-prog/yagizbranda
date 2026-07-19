/* =================================================================
   YAĞIZ BRANDA — etkileşimler
   ================================================================= */
(function () {
  'use strict';

  /* --- Mobil menü --- */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');

  function closeMenu() {
    nav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Menüyü aç');
  }

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      hamburger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    });
    // menü linkine tıklayınca kapat
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    // dışarı tıklayınca kapat
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* --- Header gölge (scroll) + yukarı çık butonu --- */
  var header = document.getElementById('header');
  var toTop = document.getElementById('toTop');

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (toTop) toTop.classList.toggle('is-visible', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Scroll reveal animasyonu --- */
  var revealTargets = document.querySelectorAll(
    '.card, .step, .why__content, .why__media, .strip__item, .gallery__item, .faq__item, .about__cols, .section__head, .contact__info, .contact__map'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* --- SSS: aynı anda tek soru açık --- */
  var faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* --- Footer yıl --- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
