/**
 * ==========================================================================
 * GAURAV GAVALI — PORTFOLIO JAVASCRIPT
 * Full Animation Engine, Custom Cursor, Canvas Particles,
 * Scroll Observers, Typewriter, 3D Tilt, Form Interactions
 * ==========================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. PRELOADER & PAGE INITIALIZATION
     -------------------------------------------------------------------------- */
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        // Trigger initial hero reveal animations
        triggerInitialReveals();
      }, 700);
    } else {
      triggerInitialReveals();
    }
  });

  function triggerInitialReveals() {
    const heroReveals = document.querySelectorAll('.hero .reveal');
    heroReveals.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('active');
      }, index * 120);
    });
  }

  /* --------------------------------------------------------------------------
     2. DYNAMIC YEAR IN FOOTER
     -------------------------------------------------------------------------- */
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     3. CUSTOM CURSOR WITH SMOOTH LERP RING
     -------------------------------------------------------------------------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    const lerpFactor = 0.18;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateRing() {
      ringX += (mouseX - ringX) * lerpFactor;
      ringY += (mouseY - ringY) * lerpFactor;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    }
    requestAnimationFrame(animateRing);

    // Expand cursor over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .service-card, .project-card, .stat-card');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  }

  /* --------------------------------------------------------------------------
     4. SCROLL PROGRESS BAR & STICKY NAVBAR BEHAVIOR
     -------------------------------------------------------------------------- */
  const scrollProgressBar = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const currentScrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // 1. Reading Progress Bar
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = (currentScrollY / docHeight) * 100;
      scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // 2. Navbar Styling & Hide on Scroll Down, Show on Scroll Up
    if (navbar) {
      if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Hide/reveal navbar based on scroll direction
      if (currentScrollY > 200) {
        if (currentScrollY > lastScrollY && !navbar.classList.contains('nav-hidden')) {
          navbar.classList.add('nav-hidden');
        } else if (currentScrollY < lastScrollY && navbar.classList.contains('nav-hidden')) {
          navbar.classList.remove('nav-hidden');
        }
      } else {
        navbar.classList.remove('nav-hidden');
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  /* --------------------------------------------------------------------------
     5. ACTIVE NAV LINK HIGHLIGHTING
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach((section) => navObserver.observe(section));

  /* --------------------------------------------------------------------------
     6. MOBILE HAMBURGER MENU
     -------------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking nav links
    const mobileLinks = navMenu.querySelectorAll('.nav-link');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. TYPEWRITER EFFECT
     -------------------------------------------------------------------------- */
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const roles = [
      'Software Developer',
      'Web Developer',
      'App Developer',
      'SaaS Builder',
      'Full Stack Engineer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const pauseDelay = 2200;

    function typeRole() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeoutDuration = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        timeoutDuration = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeoutDuration = 400;
      }

      setTimeout(typeRole, timeoutDuration);
    }

    // Start typing after initial load
    setTimeout(typeRole, 1000);
  }

  /* --------------------------------------------------------------------------
     8. INTERACTIVE PARTICLE CANVAS BACKGROUND
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: null,
      y: null,
      radius: 140
    };

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
      }, 150);
    });

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
        this.baseColor = Math.random() > 0.5 ? '124, 58, 237' : '6, 182, 212';
        this.alpha = Math.random() * 0.4 + 0.2;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${this.baseColor}, ${this.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.baseColor}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update() {
        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse interaction: push away slightly
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance;
            const directionX = forceDirectionX * force * 1.5;
            const directionY = forceDirectionY * force * 1.5;

            this.x -= directionX;
            this.y -= directionY;
          }
        }

        this.draw();
      }
    }

    let particlesArray = [];
    function initParticles() {
      particlesArray = [];
      const numberOfParticles = Math.min(85, Math.floor((width * height) / 16000));
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    initParticles();

    function connectParticles() {
      const maxDistance = 110;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.22;
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }

        // Connect to mouse if close
        if (mouse.x !== null && mouse.y !== null) {
          const dxMouse = particlesArray[a].x - mouse.x;
          const dyMouse = particlesArray[a].y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < 130) {
            const opacityMouse = (1 - distMouse / 130) * 0.35;
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacityMouse})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    }

    let animationFrameId;
    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connectParticles();
      animationFrameId = requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* --------------------------------------------------------------------------
     9. SCROLL REVEAL (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach((el) => {
    // Avoid re-observing hero elements handled by loader
    if (!el.closest('.hero')) {
      revealObserver.observe(el);
    }
  });

  /* --------------------------------------------------------------------------
     10. ANIMATED STAT COUNTERS
     -------------------------------------------------------------------------- */
  const statCounters = document.querySelectorAll('.stat-counter');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          statCounters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            animateCount(counter, target, 2000);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  const statsRow = document.querySelector('.stats-row');
  if (statsRow) {
    counterObserver.observe(statsRow);
  }

  function animateCount(element, target, duration) {
    let startTimestamp = null;
    const startValue = 0;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easedProgress * (target - startValue) + startValue);
      element.textContent = current;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = target;
      }
    }

    window.requestAnimationFrame(step);
  }

  /* --------------------------------------------------------------------------
     12. 3D CARD TILT EFFECT (SERVICE CARDS)
     -------------------------------------------------------------------------- */
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Limit max rotation to 10 degrees
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
    });
  });

  /* --------------------------------------------------------------------------
     13. BUTTON RIPPLE EFFECT
     -------------------------------------------------------------------------- */
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  /* --------------------------------------------------------------------------
     14. COPY EMAIL TO CLIPBOARD
     -------------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');
  const copyTooltip = document.getElementById('copyTooltip');

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.classList.add('copied');
        if (copyTooltip) copyTooltip.textContent = 'Copied! ✓';

        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          if (copyTooltip) copyTooltip.textContent = 'Copy';
        }, 2200);
      }).catch(() => {
        if (copyTooltip) copyTooltip.textContent = 'Failed!';
      });
    });
  }

  /* --------------------------------------------------------------------------
     15b. DISCORD USERNAME COPY ON CLICK
     -------------------------------------------------------------------------- */
  const discordBtn = document.getElementById('discordBtn');
  if (discordBtn) {
    discordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const username = discordBtn.getAttribute('data-username');
      navigator.clipboard.writeText(username).then(() => {
        const original = discordBtn.title;
        discordBtn.title = 'Copied: ' + username + ' ✓';
        discordBtn.style.borderColor = 'var(--accent-cyan)';
        discordBtn.style.color = 'var(--accent-cyan)';
        setTimeout(() => {
          discordBtn.title = original;
          discordBtn.style.borderColor = '';
          discordBtn.style.color = '';
        }, 2500);
      }).catch(() => {
        // Fallback: show alert
        alert('Discord: ' + username);
      });
    });
  }

  /* --------------------------------------------------------------------------
     15. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous error messages
      clearFormErrors();

      // Inputs
      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const subjectInput = document.getElementById('userSubject');
      const messageInput = document.getElementById('userMessage');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showError('nameError', 'Please enter your name.');
        isValid = false;
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        showError('emailError', 'Please enter your email.');
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        showError('subjectError', 'Please enter a subject.');
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        showError('messageError', 'Please enter your message.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showError('messageError', 'Message should be at least 10 characters.');
        isValid = false;
      }

      if (!isValid) return;

      // Show sending state
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      // Build form payload for Web3Forms
      const formData = {
        access_key: 'ec0502a3-d1be-4196-a367-ba5587d09162',
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        replyto: emailInput.value.trim(),
        subject: `[Portfolio] ${subjectInput.value.trim()}`,
        message: messageInput.value.trim(),
        from_name: 'Portfolio Contact Form',
        botcheck: ''
      };

      // If running from local file (file://), fallback to mailto
      if (window.location.protocol === 'file:') {
        const mailtoLink = `mailto:codebroker2001@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subjectInput.value.trim())}&body=${encodeURIComponent('From: ' + nameInput.value.trim() + ' <' + emailInput.value.trim() + '>\n\n' + messageInput.value.trim())}`;
        window.open(mailtoLink);
        if (submitBtn) { submitBtn.classList.remove('loading'); submitBtn.disabled = false; }
        if (formFeedback) {
          formFeedback.classList.remove('error');
          formFeedback.classList.add('show');
          contactForm.reset();
          setTimeout(() => formFeedback.classList.remove('show'), 6000);
        }
        return;
      }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData)
      })
        .then((res) => res.json())
        .then((data) => {
          if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
          }

          if (data.success) {
            // Show success toast
            if (formFeedback) {
              formFeedback.classList.remove('error');
              formFeedback.classList.add('show');
              contactForm.reset();
              setTimeout(() => formFeedback.classList.remove('show'), 6000);
            }
          } else {
            // Show error toast
            if (formFeedback) {
              const strong = formFeedback.querySelector('strong');
              const span = formFeedback.querySelector('span');
              if (strong) strong.textContent = 'Failed to Send!';
              if (span) span.textContent = 'Something went wrong. Please try emailing directly.';
              formFeedback.classList.add('show', 'error');
              setTimeout(() => {
                formFeedback.classList.remove('show', 'error');
                if (strong) strong.textContent = 'Message Sent Successfully!';
                if (span) span.textContent = 'Thank you for reaching out. Gaurav will be in touch shortly.';
              }, 6000);
            }
          }
        })
        .catch(() => {
          if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
          }
          if (formFeedback) {
            const strong = formFeedback.querySelector('strong');
            const span = formFeedback.querySelector('span');
            if (strong) strong.textContent = 'Network Error!';
            if (span) span.textContent = 'Could not send message. Please email codebroker2001@gmail.com directly.';
            formFeedback.classList.add('show', 'error');
            setTimeout(() => {
              formFeedback.classList.remove('show', 'error');
              if (strong) strong.textContent = 'Message Sent Successfully!';
              if (span) span.textContent = 'Thank you for reaching out. Gaurav will be in touch shortly.';
            }, 6000);
          }
        });
    });
  }

  function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearFormErrors() {
    const errorFields = document.querySelectorAll('.field-error');
    errorFields.forEach((field) => {
      field.textContent = '';
    });
  }

  /* --------------------------------------------------------------------------
     16. BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

})();
