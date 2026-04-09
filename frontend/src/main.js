import './style.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';
import barba from '@barba/core';
import VanillaTilt from 'vanilla-tilt';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   1. SMOOTH SCROLL (Lenis)
   ═══════════════════════════════════════════════════ */
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);


/* ═══════════════════════════════════════════════════
   2. CUSTOM CURSOR — GSAP quickTo for zero-lag tracking
   ═══════════════════════════════════════════════════ */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
const cursorFollowImg = document.getElementById('cursor-follow-img');

if (cursorDot && cursorRing) {
  const xDot  = gsap.quickTo(cursorDot,  'x', { duration: 0.15, ease: 'power3' });
  const yDot  = gsap.quickTo(cursorDot,  'y', { duration: 0.15, ease: 'power3' });
  const xRing = gsap.quickTo(cursorRing, 'x', { duration: 0.5,  ease: 'power3' });
  const yRing = gsap.quickTo(cursorRing, 'y', { duration: 0.5,  ease: 'power3' });

  // Cursor-follow image — longer lag for trailing effect
  let xImg, yImg;
  if (cursorFollowImg) {
    xImg = gsap.quickTo(cursorFollowImg, 'x', { duration: 0.55, ease: 'power2' });
    yImg = gsap.quickTo(cursorFollowImg, 'y', { duration: 0.55, ease: 'power2' });
  }

  window.addEventListener('mousemove', (e) => {
    xDot(e.clientX); yDot(e.clientY);
    xRing(e.clientX); yRing(e.clientY);
    if (xImg) xImg(e.clientX);
    if (yImg) yImg(e.clientY);
  });

  window.addEventListener('mousedown', () => cursorDot.classList.add('clicking'));
  window.addEventListener('mouseup',   () => cursorDot.classList.remove('clicking'));

  const hoverTargets = 'a, button, .btn-primary, .magnetic, .craft-card, .work-item, .footer-email, .menu-link';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hovered');
      cursorRing.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hovered');
      cursorRing.classList.remove('hovered');
    });
  });
}


/* ═══════════════════════════════════════════════════
   2b. HIW ROW — Cursor-following hover image
   ═══════════════════════════════════════════════════ */
(function initHiwHoverImages() {
  if (!cursorFollowImg) return;
  const imgEl = cursorFollowImg.querySelector('img');
  if (!imgEl) return;

  // Map each row to its image src using data-hover-img attribute
  // Fallback: first child img inside .hiw-row-bg
  const hiwRows = document.querySelectorAll('.hiw-row');

  hiwRows.forEach(row => {
    // Derive image src from the existing <img> inside .hiw-row-bg
    const bgImg = row.querySelector('.hiw-row-bg img');
    const src   = bgImg ? bgImg.getAttribute('src') : '';
    const alt   = bgImg ? bgImg.getAttribute('alt') : '';

    row.addEventListener('mouseenter', () => {
      if (!src) return;
      // Swap image source
      imgEl.setAttribute('src', src);
      imgEl.setAttribute('alt', alt);
      // Activate
      cursorFollowImg.classList.add('is-active');
      // Hide default cursor elements on hiw rows for a cleaner effect
      if (cursorDot)  cursorDot.style.opacity  = '0';
      if (cursorRing) cursorRing.style.opacity = '0';
    });

    row.addEventListener('mouseleave', () => {
      cursorFollowImg.classList.remove('is-active');
      // Restore cursor
      if (cursorDot)  cursorDot.style.opacity  = '';
      if (cursorRing) cursorRing.style.opacity = '';
    });
  });
})();


/* ═══════════════════════════════════════════════════
   3. MAGNETIC ELEMENT PHYSICS
   ═══════════════════════════════════════════════════ */
document.querySelectorAll('.magnetic').forEach(el => {
  const strength = parseFloat(el.getAttribute('data-strength')) || 20;
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width  / 2)) / strength;
    const y = (e.clientY - (rect.top  + rect.height / 2)) / strength;
    gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
  });
});


/* ═══════════════════════════════════════════════════
   4. HAMBURGER / FULLSCREEN MENU
   ═══════════════════════════════════════════════════ */
const hamburger     = document.getElementById('hamburgerBtn');
const fullscreenMenu = document.getElementById('fullscreenMenu');
const navbar        = document.getElementById('mainNav');
let isMenuOpen      = false;

// Build menu timeline
const menuTl = gsap.timeline({ paused: true });
menuTl
  .to('.menu-bg', { y: '0%', duration: 0.7, ease: 'power4.inOut' })
  .to('.menu-link-text', { y: '0%', duration: 0.7, stagger: 0.08, ease: 'power3.out' }, '-=0.4')
  .to('.menu-footer',    { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2')
  .to('.menu-social',    { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.3')
  .to('.menu-counter',   { opacity: 1, duration: 0.3 }, '-=0.2');

gsap.set('.menu-link-text', { y: '110%' });
gsap.set('.menu-footer',    { opacity: 0, y: 24 });
gsap.set('.menu-social',    { opacity: 0, x: 20 });
gsap.set('.menu-counter',   { opacity: 0 });

// Update counter as user highlights menu items
const menuItems = document.querySelectorAll('.menu-link');
const counterEl = document.getElementById('menuCounter');
menuItems.forEach((link, i) => {
  link.addEventListener('mouseenter', () => {
    if (counterEl) counterEl.textContent = `0${i+1} / 0${menuItems.length}`;
  });
});

function openMenu() {
  isMenuOpen = true;
  hamburger.classList.add('is-active');
  fullscreenMenu.classList.add('is-active');
  navbar.classList.add('menu-open');
  menuTl.timeScale(1).play();
  lenis.stop();
}

function closeMenu() {
  isMenuOpen = false;
  hamburger.classList.remove('is-active');
  navbar.classList.remove('menu-open');
  menuTl.timeScale(1.4).reverse().then(() => {
    fullscreenMenu.classList.remove('is-active');
  });
  lenis.start();
}

if (hamburger) {
  hamburger.addEventListener('click', () => isMenuOpen ? closeMenu() : openMenu());
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      isMenuOpen ? closeMenu() : openMenu();
    }
  });
}

// Close on Escape
document.addEventListener('keydown', (e) => e.key === 'Escape' && isMenuOpen && closeMenu());

// Menu link clicks — epic journey scroll
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        isMenuOpen = false;
        hamburger.classList.remove('is-active');
        navbar.classList.remove('menu-open');
        lenis.start();
        // Epic cinematic scroll journey
        lenis.scrollTo(targetEl, {
          duration: 2.6,
          easing: (t) => 1 - Math.pow(1 - t, 4)
        });
        menuTl.timeScale(1.3).reverse().then(() => {
          fullscreenMenu.classList.remove('is-active');
        });
      }
    }
  });
});


/* ═══════════════════════════════════════════════════
   5. HERO ENTRANCE — Theatrical reveal
   ═══════════════════════════════════════════════════ */
const heroTl = gsap.timeline({ delay: 0.2 });
heroTl
  .from('.section-hero', { clipPath: 'circle(0% at 50% 50%)', duration: 1.4, ease: 'power4.inOut' })
  .from('.hero-eyebrow',  { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
  .from('.split-line',    { y: 200, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' }, '-=0.8')
  .from('.hero-subtext',  { y: 20,  opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
  .from('.hero-cta',      { y: 24,  opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');

// Hero bg zoom parallax
gsap.to('.hero-bg-parallax img', {
  yPercent: 25, scale: 1.15,
  scrollTrigger: { trigger: '.section-hero', start: 'top top', end: 'bottom top', scrub: true }
});


/* ═══════════════════════════════════════════════════
   6. SPLIT-TEXT SCROLL REVEALS (variable font)
   ═══════════════════════════════════════════════════ */
document.querySelectorAll('.scroll-typewrite').forEach(tw => {
  const split = new SplitType(tw, { types: 'words, chars' });
  gsap.fromTo(split.chars,
    { opacity: 0.05, 'font-variation-settings': '"wght" 200' },
    {
      opacity: 1,
      'font-variation-settings': '"wght" 500',
      stagger: 0.04,
      ease: 'none',
      scrollTrigger: { trigger: tw, start: 'top 85%', end: 'bottom 40%', scrub: 1 }
    }
  );
});

// reveal-text: dramatic per-word stagger
document.querySelectorAll('.reveal-text').forEach(el => {
  const split = new SplitType(el, { types: 'words' });
  split.words.forEach(word => {
    const wrapper = document.createElement('span');
    wrapper.style.overflow = 'hidden';
    wrapper.style.display  = 'inline-block';
    word.parentNode.insertBefore(wrapper, word);
    wrapper.appendChild(word);
  });
  gsap.fromTo(split.words,
    { y: '105%' },
    { y: '0%', duration: 1.2, stagger: 0.08, ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    }
  );
});

// reveal-up (eyebrows, subtitles)
document.querySelectorAll('.reveal-up').forEach(el => {
  gsap.to(el, {
    y: 0, opacity: 1, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%' }
  });
});


/* ═══════════════════════════════════════════════════
   7. SVG PATH DRAW-ON + COUNTERS
   ═══════════════════════════════════════════════════ */
gsap.utils.toArray('.draw-path').forEach(path => {
  const len = path.getTotalLength();
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  gsap.to(path, {
    strokeDashoffset: 0, ease: 'none',
    scrollTrigger: { trigger: '.section-stats', start: 'top 80%', end: 'bottom 20%', scrub: 1.5 }
  });
});

gsap.utils.toArray('.stat-num').forEach(counter => {
  const target = +counter.getAttribute('data-target');
  const suffix = counter.getAttribute('data-suffix') || '';
  const proxy  = { val: 0 };
  ScrollTrigger.create({
    trigger: counter,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(proxy, {
        val: target, duration: 2.2, ease: 'power2.out',
        onUpdate: () => { counter.textContent = Math.round(proxy.val) + suffix; }
      });
    }
  });
});

// Inline craft-card counters
gsap.utils.toArray('.cc-count-num').forEach(counter => {
  const target = +counter.getAttribute('data-target');
  const suffix = counter.getAttribute('data-suffix') || '';
  const proxy  = { val: 0 };
  ScrollTrigger.create({
    trigger: counter,
    start: 'top 90%',
    once: true,
    onEnter: () => {
      gsap.to(proxy, {
        val: target, duration: 2.5, ease: 'power2.out',
        onUpdate: () => { counter.textContent = Math.round(proxy.val) + suffix; }
      });
    }
  });
});


/* ═══════════════════════════════════════════════════
   8. HORIZONTAL SCROLL (Pinned)
   ═══════════════════════════════════════════════════ */
const track = document.querySelector('.horizontal-track');
if (track) {
  const updateHoriz = () => {
    const walk = track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: -walk, ease: 'none',
      scrollTrigger: {
        trigger: '.section-horizontal', start: 'top top',
        end: 'bottom bottom', scrub: 1, id: 'horiz'
      }
    });
  };
  updateHoriz();
  window.addEventListener('resize', () => {
    ScrollTrigger.getById('horiz')?.kill();
    updateHoriz();
  });
}


/* ═══════════════════════════════════════════════════
   9. STAGGERED CARD REVEALS
   ═══════════════════════════════════════════════════ */
// Group cards by parent for stagger
document.querySelectorAll('.craft-cards-row').forEach(row => {
  const cards = row.querySelectorAll('.craft-card');
  gsap.fromTo(cards,
    { y: 60, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: 'power3.out',
      scrollTrigger: { trigger: row, start: 'top 85%' }
    }
  );
});

// General reveal-fade 
gsap.utils.toArray('.reveal-fade').forEach(el => {
  // Skip craft cards (handled above)
  if (!el.classList.contains('craft-card') && !el.classList.contains('craft-lib-pill')) {
    gsap.fromTo(el,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      }
    );
  }
});

// Library pills stagger
document.querySelectorAll('.craft-libs-row').forEach(row => {
  const pills = row.querySelectorAll('.craft-lib-pill');
  gsap.fromTo(pills,
    { y: 30, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power2.out',
      scrollTrigger: { trigger: row, start: 'top 88%' }
    }
  );
});


/* ═══════════════════════════════════════════════════
   10. IMAGE COMPARATOR (Pinned during scroll)
   ═══════════════════════════════════════════════════ */
const comp = document.querySelector('.section-comparator');
if (comp) {
  const afterWrap = comp.querySelector('.comp-after-wrapper');
  const handle    = comp.querySelector('.comp-handle');

  const compTl = gsap.timeline({
    scrollTrigger: {
      trigger: comp,
      start: 'top top',
      end: '+=100%',
      scrub: true,
      pin: true,
      anticipatePin: 1
    }
  });

  compTl
    .fromTo(afterWrap, { width: '0%' }, { width: '100%', ease: 'none' }, 0)
    .fromTo(handle,    { left: '0%' },  { left: '100%',  ease: 'none' }, 0);
}


/* ═══════════════════════════════════════════════════
   11. MARQUEES — velocity-reactive speed
   ═══════════════════════════════════════════════════ */
function animateMarquee(trackSelector, direction = 1) {
  const track = document.querySelector(trackSelector);
  if (!track) return;
  let pos = 0;
  let velocity = 0;
  function loop() {
    velocity = lenis?.velocity || 0;
    pos += (0.18 + Math.abs(velocity) * 0.005) * direction;
    if (direction > 0 && pos >= 50)  pos = 0;
    if (direction < 0 && pos <= -50) pos = 0;
    gsap.set(track, { xPercent: -pos });
    requestAnimationFrame(loop);
  }
  loop();
}
animateMarquee('#marqueeTrack1',  1);
animateMarquee('#marqueeTrack2', -1);


/* ═══════════════════════════════════════════════════
   12. SCROLL PROGRESS BAR
   ═══════════════════════════════════════════════════ */
gsap.to('.scroll-progress', {
  width: '100%', ease: 'none',
  scrollTrigger: { scrub: 0, start: 'top top', end: 'bottom bottom' }
});


/* ═══════════════════════════════════════════════════
   13. LIQUID DISTORT (Hero)
   ═══════════════════════════════════════════════════ */
const liquidEl = document.querySelector('.liquid-hover');
const disp     = document.querySelector('#liquid-displacement');
if (liquidEl && disp) {
  liquidEl.addEventListener('mouseenter', () =>
    gsap.to(disp, { attr: { scale: 60 }, duration: 0.8, ease: 'elastic.out(1, 0.3)' }));
  liquidEl.addEventListener('mouseleave', () =>
    gsap.to(disp, { attr: { scale: 0 },  duration: 0.5, ease: 'power2.out' }));
}


/* ═══════════════════════════════════════════════════
   14. TEXT SCRAMBLE (Glitch hover)
   ═══════════════════════════════════════════════════ */
class TextScramble {
  constructor(el) {
    this.el    = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length  = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from  = oldText[i] || '';
      const to    = newText[i] || '';
      const start = Math.floor(Math.random() * 16);
      const end   = start + Math.floor(Math.random() * 16);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output   = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span style="opacity:0.4;color:var(--color-accent)">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

document.querySelectorAll('.glitch-hover').forEach(el => {
  if (el.children.length > 0) return;
  const orig = el.innerText;
  const s    = new TextScramble(el);
  el.addEventListener('mouseenter', () => s.setText(orig));
});


/* ═══════════════════════════════════════════════════
   15. 3D VANILLA TILT
   ═══════════════════════════════════════════════════ */
VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
  max: 12, speed: 400, glare: true, 'max-glare': 0.35
});


/* ═══════════════════════════════════════════════════
   16. CRAFT CARD MODAL — full breakdown on click
   ═══════════════════════════════════════════════════ */
const craftModal  = document.getElementById('craftModal');
const modalOverlay = document.getElementById('craftModalOverlay');
const modalClose  = document.getElementById('craftModalClose');
const modalTag    = document.getElementById('modalTag');
const modalTitle  = document.getElementById('modalTitle');
const modalDesc   = document.getElementById('modalDesc');
const modalLibs   = document.getElementById('modalLibs');
const modalPitfalls = document.getElementById('modalPitfalls');
const modalExample  = document.getElementById('modalExample');
const modalVideo     = document.getElementById('modalVideo');

function openCraftModal(card) {
  const data = card.dataset;
  if (!craftModal) return;

  // Populate content
  modalTag.textContent   = `// ${data.tag}`;
  modalTitle.textContent = data.title;
  modalDesc.textContent  = data.desc;

  // Libraries
  modalLibs.innerHTML = '';
  (data.libs || '').split(',').forEach(lib => {
    const span = document.createElement('span');
    span.className   = 'craft-modal-lib';
    span.textContent = lib.trim();
    modalLibs.appendChild(span);
  });

  // Pitfalls
  modalPitfalls.innerHTML = '';
  try {
    const pitfalls = JSON.parse(data.pitfalls || '[]');
    pitfalls.forEach(p => {
      const li = document.createElement('li');
      li.textContent = p;
      modalPitfalls.appendChild(li);
    });
  } catch {}

  // Example
  modalExample.textContent = data.example || '';

  // Video
  modalVideo.innerHTML = '';
  if (data.video) {
    modalVideo.innerHTML = `
      <div class="video-aspect-ratio">
        <iframe 
          src="https://www.youtube.com/embed/${data.video}" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
      </div>
    `;
  }

  craftModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeCraftModal() {
  craftModal.classList.remove('is-open');
  document.body.style.overflow = '';
  // Clear video to stop playback
  if (modalVideo) modalVideo.innerHTML = '';
}

document.querySelectorAll('.craft-card').forEach(card => {
  card.addEventListener('click', () => openCraftModal(card));
});

if (modalClose)   modalClose.addEventListener('click', closeCraftModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeCraftModal);
document.addEventListener('keydown', (e) => e.key === 'Escape' && craftModal?.classList.contains('is-open') && closeCraftModal());


/* ═══════════════════════════════════════════════════
   17. PARALLAX — LAYERED DEPTH EFFECTS
   ═══════════════════════════════════════════════════ */
// Section titles subtle parallax
gsap.utils.toArray('.section-craft .craft-header').forEach(el => {
  gsap.fromTo(el, { y: 0 }, {
    y: -40,
    scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
  });
});

// Work grid parallax offset
gsap.utils.toArray('.work-item.size-s').forEach(el => {
  gsap.to(el, {
    y: -60,
    scrollTrigger: { trigger: el.closest('.work-grid'), start: 'top bottom', end: 'bottom top', scrub: 1 }
  });
});


/* ═══════════════════════════════════════════════════
   18. VARIABLE FONT — scroll axis animation
   ═══════════════════════════════════════════════════ */
gsap.utils.toArray('.hero-title .variable-font, .hero-title').forEach(el => {
  ScrollTrigger.create({
    trigger: '.section-hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onUpdate: (self) => {
      const wght = 800 - (self.progress * 400);
      el.style.fontVariationSettings = `"wght" ${wght}`;
    }
  });
});


/* ═══════════════════════════════════════════════════
   19. CRAFT CARDS — preview VanillaTilt
   ═══════════════════════════════════════════════════ */
VanillaTilt.init(document.querySelectorAll('.cc-tilt-demo'), {
  max: 18, speed: 300, glare: true, 'max-glare': 0.5
});


/* ═══════════════════════════════════════════════════
   20. NAV — hide on scroll down, show on scroll up
   ═══════════════════════════════════════════════════ */
let lastScroll = 0;
lenis.on('scroll', ({ scroll }) => {
  if (!navbar || isMenuOpen) return;
  const direction = scroll > lastScroll ? 'down' : 'up';
  if (direction === 'down' && scroll > 200) {
    gsap.to(navbar, { y: -120, duration: 0.5, ease: 'power2.inOut' });
  } else {
    gsap.to(navbar, { y: 0, duration: 0.5, ease: 'power2.out' });
  }
  lastScroll = scroll;
});


/* ═══════════════════════════════════════════════════
   21. BARBA.JS PAGE TRANSITIONS
   ═══════════════════════════════════════════════════ */
// Hall of Fame & Jobs Stagger
document.querySelectorAll('.jobs-grid, .fame-grid').forEach(grid => {
  const cards = grid.querySelectorAll('.job-card, .fame-card');
  gsap.fromTo(cards,
    { y: 50, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: grid, start: 'top 85%' }
    }
  );
});

barba.init({

  transitions: [{
    name: 'curtain',
    leave(data) {
      const tl = gsap.timeline();
      tl.to('.curtain-panel', {
        scaleY: 1, duration: 0.5, stagger: 0.07, ease: 'power2.inOut'
      });
      return tl;
    },
    enter(data) {
      const tl = gsap.timeline();
      tl.to('.curtain-panel', {
        scaleY: 0, transformOrigin: 'bottom',
        duration: 0.5, stagger: 0.07, ease: 'power2.inOut', delay: 0.2
      });
      return tl;
    }
  }]
});


/* ═══════════════════════════════════════════════════
   22. SCROLL-TRIGGERED background color shifts
   ═══════════════════════════════════════════════════ */
const sections = [
  { el: '.section-hero',        bg: '#0e0e0e', color: '#fafafa' },
  { el: '.marquee-band',        bg: '#050505', color: '#fafafa' },
  { el: '.section-stats',       bg: '#050505', color: '#fafafa' },
  { el: '.section-craft',       bg: '#0e0e0e', color: '#fafafa' },
  { el: '.section-horizontal',  bg: '#0e0e0e', color: '#fafafa' },
  { el: '.section-work',        bg: '#e8e8e8', color: '#050505' },
  { el: '.section-comparator',  bg: '#0e0e0e', color: '#fafafa' },
  { el: '.section-jobs',        bg: '#050505', color: '#fafafa' },
  { el: '.section-fame',        bg: '#0e0e0e', color: '#fafafa' },
  { el: '.section-footer',      bg: '#050505', color: '#fafafa' },
];

sections.forEach(({ el, bg, color }) => {
  const target = document.querySelector(el);
  if (!target) return;
  ScrollTrigger.create({
    trigger: target,
    start: 'top 55%',
    onEnter: () => gsap.to('body', { backgroundColor: bg, color, duration: 0.8, ease: 'power2.inOut', overwrite: 'auto' }),
    onEnterBack: () => gsap.to('body', { backgroundColor: bg, color, duration: 0.8, ease: 'power2.inOut', overwrite: 'auto' }),
  });
});

/* ═══════════════════════════════════════════════════
   LEADERBOARD BARS ANIMATION
   ═══════════════════════════════════════════════════ */
gsap.utils.toArray('.lb-fill').forEach(bar => {
  gsap.from(bar, {
    width: '0%',
    duration: 1.5,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: bar,
      start: 'top 90%',
    }
  });
});



/* ═══════════════════════════════════════════════════
   22. HORIZONTAL SCROLL FOR CARD ROWS (Desktop)
   ═══════════════════════════════════════════════════ */
document.querySelectorAll('.craft-cards-row').forEach(row => {
  row.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      row.scrollLeft += e.deltaY;
    }
  });
});

/* ═══════════════════════════════════════════════════
   REFRESH
   ═══════════════════════════════════════════════════ */
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
