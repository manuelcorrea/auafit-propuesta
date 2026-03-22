/* ═══════════════════════════════════════════════════
   AUAFIT — Experiencia Aquaboard · script.js
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Language ── */
  const langBtn = document.getElementById('langToggle');
  let lang = localStorage.getItem('auafit-lang') || 'es';

  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l;
    document.body.classList.toggle('lang-en', l === 'en');
    localStorage.setItem('auafit-lang', l);
  }
  applyLang(lang);
  langBtn.addEventListener('click', () => applyLang(lang === 'es' ? 'en' : 'es'));

  /* ── Nav scroll ── */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Reveal on scroll ── */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = ((i % 5) * 0.07) + 's';
    io.observe(el);
  });

  /* ── Stagger grid children ── */
  document.querySelectorAll('.benefits-grid, .personas-grid, .commercial-grid, .days, .modalities-grid, .auafit-split__stats').forEach(container => {
    container.querySelectorAll('.reveal').forEach((child, i) => {
      child.style.transitionDelay = (i * 0.09) + 's';
    });
  });

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });

  /* ── Animate stat counters ── */
  const statNums = document.querySelectorAll('.stat__num[data-target]');
  const statIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countUp(e.target);
        statIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  statNums.forEach(el => statIO.observe(el));

  function countUp(el) {
    const target = parseInt(el.dataset.target);
    const dur = 1000;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ── Hero parallax (subtle) ── */
  const heroImg = document.querySelector('.hero__img img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroImg.style.transform = `scale(1.04) translateY(${y * 0.15}px)`;
      }
    }, { passive: true });
  }

})();
