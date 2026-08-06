/**
 * DR. SANA AFREEN - LUXURY DENTAL PORTFOLIO
 * Main Interactive Script (Vanilla JavaScript)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Custom Cursor
  initCustomCursor();

  // Initialize Scroll Progress Bar
  initScrollProgress();

  // Initialize Sticky Glass Navbar & Active Nav Tracker
  initNavbar();

  // Initialize Scroll Reveal Animations (Observer)
  initScrollObserver();

  // Initialize Counter Animation
  initCounterAnimation();

  // Initialize Lightbox Modal
  initLightbox();

  // Initialize Mouse Parallax Effect
  initMouseParallax();
});

/* ==========================================
   1. CUSTOM CURSOR
   ========================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const circle = document.getElementById('cursor-circle');

  if (!dot || !circle) return;

  let mouseX = 0;
  let mouseY = 0;
  let circleX = 0;
  let circleY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function animateCursor() {
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;

    circle.style.left = `${circleX}px`;
    circle.style.top = `${circleY}px`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .glass-card, .gallery-item, .service-card, .why-card');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ==========================================
   2. SCROLL PROGRESS BAR
   ========================================== */
function initScrollProgress() {
  const progress = document.getElementById('scroll-progress');
  if (!progress) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progress.style.width = `${Math.min(scrollPercent, 100)}%`;
  });
}

/* ==========================================
   3. STICKY NAVBAR & MOBILE MENU
   ========================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    let currentSectionId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    links.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu drawer
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close mobile menu when clicking a link
    links.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ==========================================
   4. SCROLL REVEAL OBSERVER
   ========================================== */
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');

  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observerInstance.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}

/* ==========================================
   5. ACHIEVEMENTS COUNTER ANIMATION
   ========================================== */
function initCounterAnimation() {
  const counterElements = document.querySelectorAll('.counter-number');
  if (counterElements.length === 0) return;

  let animated = false;

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 2000; // 2 seconds
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target.toLocaleString() + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current).toLocaleString() + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, observerOptions);

  const achievementsSection = document.getElementById('achievements');
  if (achievementsSection) {
    observer.observe(achievementsSection);
  }
}

/* ==========================================
   6. LIGHTBOX MODAL
   ========================================== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!lightbox || !lightboxImg) return;

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title') || '';
      const category = item.getAttribute('data-category') || '';

      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || title;
        if (lightboxCaption) {
          lightboxCaption.textContent = title ? `${title} — ${category}` : '';
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ==========================================
   7. MOUSE PARALLAX TILT EFFECT
   ========================================== */
function initMouseParallax() {
  const heroSection = document.getElementById('home');
  const heroAvatar = document.querySelector('.hero-avatar-frame');

  if (!heroSection || !heroAvatar) return;

  heroSection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPos = (clientX / innerWidth - 0.5) * 20;
    const yPos = (clientY / innerHeight - 0.5) * 20;

    heroAvatar.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) rotateX(${-yPos * 0.5}deg) rotateY(${xPos * 0.5}deg)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    heroAvatar.style.transform = `translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)`;
  });
}
