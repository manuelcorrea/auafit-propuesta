/* ═══════════════════════════════════════════════════
   AUAFIT — Experiencia Aquaboard
   script.js
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Language Toggle ── */
  const langToggle = document.getElementById('langToggle');
  let currentLang = localStorage.getItem('auafit-lang') || 'es';

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    if (lang === 'en') {
      document.body.classList.add('lang-en');
    } else {
      document.body.classList.remove('lang-en');
    }
    localStorage.setItem('auafit-lang', lang);
  }

  applyLang(currentLang);

  langToggle.addEventListener('click', function () {
    applyLang(currentLang === 'es' ? 'en' : 'es');
  });

  /* ── Nav Scroll Effect ── */
  const nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Reveal on Scroll (Intersection Observer) ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── Staggered children inside grid/flex containers ── */
  const staggerContainers = document.querySelectorAll(
    '.why-hotel__grid, .benefits__grid, .audience__grid, .commercial__grid, .vision__modalities, .days__timeline, .festival-hero__features'
  );
  staggerContainers.forEach(function (container) {
    const children = container.querySelectorAll('.reveal');
    children.forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.08) + 's';
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── Parallax on Hero (subtle) ── */
  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero__bg');
  if (hero && heroBg) {
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      const heroHeight = hero.offsetHeight;
      if (scrolled < heroHeight) {
        const progress = scrolled / heroHeight;
        heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
        hero.querySelector('.hero__content').style.transform =
          'translateY(' + (scrolled * 0.12) + 'px)';
      }
    }, { passive: true });
  }

  /* ── Gallery drag-scroll on mobile ── */
  const galleryTrack = document.querySelector('.gallery__track');
  if (galleryTrack) {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    galleryTrack.addEventListener('mousedown', function (e) {
      isDragging = true;
      startX = e.pageX - galleryTrack.offsetLeft;
      scrollLeft = galleryTrack.scrollLeft;
      galleryTrack.style.cursor = 'grabbing';
    });
    galleryTrack.addEventListener('mouseleave', function () { isDragging = false; galleryTrack.style.cursor = ''; });
    galleryTrack.addEventListener('mouseup', function () { isDragging = false; galleryTrack.style.cursor = ''; });
    galleryTrack.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - galleryTrack.offsetLeft;
      const walk = (x - startX) * 1.5;
      galleryTrack.scrollLeft = scrollLeft - walk;
    });
  }

  /* ── Animate number counters on stat blocks ── */
  const statNums = document.querySelectorAll('.stat-block__num');
  const statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(function (el) {
    statObserver.observe(el);
  });

  function animateCounter(el) {
    const original = el.textContent.trim();
    const num = parseFloat(original.replace(/[^0-9.]/g, ''));
    if (isNaN(num) || num === 0) return;
    const prefix = original.match(/^[^0-9]*/)?.[0] || '';
    const suffix = original.match(/[^0-9.]*$/)?.[0] || '';
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * num);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = original;
    }
    requestAnimationFrame(step);
  }

  /* ── Add water ripple effect on modality card click ── */
  document.querySelectorAll('.modality-card, .why-card, .persona-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.5;
      ripple.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'pointer-events:none',
        'width:' + size + 'px',
        'height:' + size + 'px',
        'left:' + (e.clientX - rect.left - size / 2) + 'px',
        'top:' + (e.clientY - rect.top - size / 2) + 'px',
        'background:rgba(0,180,216,0.15)',
        'transform:scale(0)',
        'animation:ripple 0.6s ease-out forwards'
      ].join(';');
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 700);
    });
  });

  /* Inject ripple keyframe once */
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = '@keyframes ripple{to{transform:scale(1);opacity:0}}';
    document.head.appendChild(style);
  }

})();
