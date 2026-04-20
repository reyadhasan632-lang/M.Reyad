/* ═══════════════════════════════════════════════════════
   REYAD HOSSAIN PORTFOLIO — script.js
   Covers: Preloader, Cursor, Navbar, Hero Canvas, Typewriter,
           Scroll Reveal, Animated Counters, Skill Bars,
           Circular Progress, Theme Toggle, Mobile Menu,
           Form Validation, Back To Top
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════════
   1. PRELOADER
══════════════════════════════════════════════════════ */
const preloader = document.getElementById('preloader');

window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    // Trigger hero entrance animations
    document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => {
        el.style.transition = `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`;
        el.classList.add('visible');
      }, 200 + delay);
    });
  }, 2400);
});

document.body.classList.add('no-scroll');

/* ══════════════════════════════════════════════════════
   2. CUSTOM CURSOR
══════════════════════════════════════════════════════ */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left  = mouseX + 'px';
  cursorDot.style.top   = mouseY + 'px';
});

(function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
})();

// Hover glow on interactive elements
document.querySelectorAll('a, button, .project-card, .timeline-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ══════════════════════════════════════════════════════
   3. NAVBAR — scroll behavior + active link
══════════════════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Glass effect on scroll
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link detection
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // Back to top visibility
  const btt = document.getElementById('backToTop');
  if (window.scrollY > 500) {
    btt.classList.add('visible');
  } else {
    btt.classList.remove('visible');
  }
}, { passive: true });

/* ══════════════════════════════════════════════════════
   4. MOBILE MENU
══════════════════════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks   = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.classList.toggle('no-scroll');
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
});

/* ══════════════════════════════════════════════════════
   5. THEME TOGGLE
══════════════════════════════════════════════════════ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const htmlEl      = document.documentElement;

// Check stored preference
const saved = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', saved);
updateThemeIcon(saved);

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

/* ══════════════════════════════════════════════════════
   6. HERO CANVAS — Animated Particles
══════════════════════════════════════════════════════ */
const canvas = document.getElementById('heroCanvas');
const ctx    = canvas.getContext('2d');

let particles = [];
let canvasW, canvasH;

function resizeCanvas() {
  canvasW = canvas.width  = canvas.offsetWidth;
  canvasH = canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x   = Math.random() * canvasW;
    this.y   = Math.random() * canvasH;
    this.r   = Math.random() * 1.8 + 0.4;
    this.vx  = (Math.random() - 0.5) * 0.3;
    this.vy  = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
    // color: gold or teal
    this.color = Math.random() > 0.5 ? '201,169,110' : '127,184,196';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < -20 || this.x > canvasW + 20 ||
        this.y < -20 || this.y > canvasH + 20) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}

// Create particles
for (let i = 0; i < 100; i++) particles.push(new Particle());

// Mouse interaction
let mx = -1000, my = -1000;
canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  mx = e.clientX - rect.left;
  my = e.clientY - rect.top;
});

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(201,169,110,${0.06 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
    // Mouse proximity
    const dx = particles[i].x - mx;
    const dy = particles[i].y - my;
    const d  = Math.sqrt(dx * dx + dy * dy);
    if (d < 140) {
      ctx.beginPath();
      ctx.moveTo(particles[i].x, particles[i].y);
      ctx.lineTo(mx, my);
      ctx.strokeStyle = `rgba(201,169,110,${0.25 * (1 - d / 140)})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvasW, canvasH);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

/* ══════════════════════════════════════════════════════
   7. TYPEWRITER EFFECT
══════════════════════════════════════════════════════ */
const typeTarget  = document.getElementById('typewriter');
const typeStrings = [
  'BSc Nursing Student',
  'Digital Marketing Specialist',
  'Social Media Manager',
  'Healthcare Professional',
  'Lifelong Learner',
];
let tIdx = 0, cIdx = 0, deleting = false;

function typeLoop() {
  const current = typeStrings[tIdx];
  if (!deleting) {
    typeTarget.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) {
      deleting = true;
      return setTimeout(typeLoop, 2000);
    }
    return setTimeout(typeLoop, 80);
  } else {
    typeTarget.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      tIdx = (tIdx + 1) % typeStrings.length;
      return setTimeout(typeLoop, 400);
    }
    return setTimeout(typeLoop, 45);
  }
}
setTimeout(typeLoop, 3000); // delay until after preloader

/* ══════════════════════════════════════════════════════
   8. SCROLL REVEAL (IntersectionObserver)
══════════════════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Skip hero elements — they're handled by preloader callback
revealEls.forEach(el => {
  if (!el.closest('#hero')) revealObserver.observe(el);
});

/* ══════════════════════════════════════════════════════
   9. ANIMATED COUNTERS
══════════════════════════════════════════════════════ */
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target   = parseInt(el.dataset.target);
  const suffix   = el.dataset.target === '100' ? '%' : '+';
  const duration = 1800;
  const step     = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (Math.floor(current) >= target ? suffix : '');
    if (current >= target) clearInterval(timer);
  }, 16);
}

/* ══════════════════════════════════════════════════════
   10. SKILL BARS
══════════════════════════════════════════════════════ */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pct = entry.target.dataset.pct;
      entry.target.style.width = pct + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(el => skillObserver.observe(el));

/* ══════════════════════════════════════════════════════
   11. CIRCULAR PROGRESS CHARTS
══════════════════════════════════════════════════════ */
const circleProgs = document.querySelectorAll('.circle-prog');
const circumference = 2 * Math.PI * 42; // r=42 → ≈ 264

const circleObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pct    = parseInt(entry.target.dataset.pct);
      const offset = circumference - (pct / 100) * circumference;
      entry.target.style.strokeDashoffset = offset;
      circleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

circleProgs.forEach(el => {
  el.style.strokeDasharray  = circumference;
  el.style.strokeDashoffset = circumference;
  circleObserver.observe(el);
});

/* ══════════════════════════════════════════════════════
   12. CONTACT FORM VALIDATION
══════════════════════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const submitText  = document.getElementById('submitText');
const submitIcon  = document.getElementById('submitIcon');
const formSuccess = document.getElementById('formSuccess');

function showError(input, message) {
  const field = input.closest('.form-field');
  const err   = field.querySelector('.field-error');
  if (err) err.textContent = message;
  input.style.borderBottomColor = 'var(--accent3)';
}
function clearError(input) {
  const field = input.closest('.form-field');
  const err   = field.querySelector('.field-error');
  if (err) err.textContent = '';
  input.style.borderBottomColor = '';
}

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  const name    = document.getElementById('fname');
  const email   = document.getElementById('femail');
  const message = document.getElementById('fmessage');

  // Validate name
  if (!name.value.trim() || name.value.trim().length < 2) {
    showError(name, 'Please enter your name (at least 2 characters).');
    valid = false;
  } else {
    clearError(name);
  }

  // Validate email
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email.value.trim())) {
    showError(email, 'Please enter a valid email address.');
    valid = false;
  } else {
    clearError(email);
  }

  // Validate message
  if (!message.value.trim() || message.value.trim().length < 10) {
    showError(message, 'Please enter a message (at least 10 characters).');
    valid = false;
  } else {
    clearError(message);
  }

  if (!valid) return;

  // Simulate sending
  submitBtn.disabled = true;
  submitText.textContent = 'Sending…';
  submitIcon.className = 'fas fa-spinner fa-spin';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitText.textContent = 'Send Message';
    submitIcon.className = 'fas fa-paper-plane';
    formSuccess.style.display = 'flex';
    contactForm.reset();

    // Hide success after 6s
    setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
  }, 1800);
});

// Live validation on blur
['fname','femail','fmessage'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('blur', () => {
    if (el.value.trim()) clearError(el);
  });
  el.addEventListener('input', () => clearError(el));
});

/* ══════════════════════════════════════════════════════
   13. BACK TO TOP BUTTON
══════════════════════════════════════════════════════ */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ══════════════════════════════════════════════════════
   14. SMOOTH SCROLL for anchor links
══════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.offsetTop - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ══════════════════════════════════════════════════════
   15. PARALLAX EFFECT on hero
══════════════════════════════════════════════════════ */
const heroBgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (heroBgText) {
    heroBgText.style.transform = `translateY(${scrolled * 0.25}px)`;
    heroBgText.style.opacity   = Math.max(0, 1 - scrolled / 500);
  }
}, { passive: true });

/* ══════════════════════════════════════════════════════
   16. SUBTLE GLOW on project cards (mouse track)
══════════════════════════════════════════════════════ */
document.querySelectorAll('.project-card, .timeline-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
    const y = ((e.clientY - rect.top ) / rect.height * 100).toFixed(1);
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(201,169,110,0.06) 0%, var(--surface) 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

console.log(
  '%c RH Portfolio Loaded ',
  'background:#c9a96e;color:#080c14;font-weight:bold;font-size:14px;padding:6px 12px;border-radius:4px;'
);
