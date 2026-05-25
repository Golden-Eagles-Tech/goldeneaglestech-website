/* ============================================
   Golden Eagles Tech LLC — Main Script
   ============================================ */

'use strict';

/* ── Navbar: scroll class + mobile toggle ── */
(function initNav() {
  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('navToggle');
  const links     = document.getElementById('navLinks');
  const navAnchors = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  navAnchors.forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── Hero Canvas: particle network ─────── */
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles;
  const COUNT     = 60;
  const MAX_DIST  = 130;
  const GOLD      = 'rgba(245,166,35,';
  const WHITE     = 'rgba(255,255,255,';

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - .5) * .5,
      vy: (Math.random() - .5) * .5,
      r:  Math.random() * 2.5 + 1,
      gold: Math.random() > .6,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold ? GOLD + '.7)' : WHITE + '.4)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q  = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const alpha = (1 - d / MAX_DIST) * .25;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = (p.gold || q.gold) ? GOLD + alpha + ')' : WHITE + alpha + ')';
          ctx.lineWidth = .7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  const ro = new ResizeObserver(() => { resize(); createParticles(); });
  ro.observe(canvas.parentElement);
})();

/* ── Scroll Reveal (IntersectionObserver) ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ── Active nav link on scroll ─────────── */
(function initActiveLink() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const navH      = 80;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - navH - 60) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();

/* ── Toast notification ─────────────────── */
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className   = 'toast show toast-' + type;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.className = 'toast'; }, 4000);
}

/* ── Contact Form (Formspree) ───────────── */
(function initForm() {
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const btn    = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const action = form.getAttribute('action');
    if (action.includes('YOUR_FORM_ID')) {
      showToast('Please configure Formspree in index.html first.', 'error');
      return;
    }

    btn.classList.add('btn-loading');
    btn.disabled = true;
    status.textContent = '';
    status.className   = 'form-status';

    try {
      const res = await fetch(action, {
        method: 'POST',
        body:   new FormData(form),
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        form.reset();
        status.textContent = 'Message sent! We\'ll be in touch within 24 hours.';
        status.className   = 'form-status success';
        showToast('Message sent successfully!', 'success');
      } else {
        const data = await res.json().catch(() => ({}));
        const msg  = data.errors ? data.errors.map(err => err.message).join(', ') : 'Submission failed.';
        status.textContent = msg;
        status.className   = 'form-status error';
        showToast('Something went wrong. Please try again.', 'error');
      }
    } catch {
      status.textContent = 'Network error. Please email us directly.';
      status.className   = 'form-status error';
      showToast('Network error. Please email us directly.', 'error');
    } finally {
      btn.classList.remove('btn-loading');
      btn.disabled = false;
    }
  });
})();

/* ── Smooth scroll polyfill for older Safari ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Add active style for nav link ─────── */
const style = document.createElement('style');
style.textContent = '.nav-link.active { color: var(--gold) !important; }';
document.head.appendChild(style);
