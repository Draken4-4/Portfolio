/* ============================================
   PORTFOLIO SCRIPTS
   Typing effect, theme toggle, mobile menu,
   scroll reveal, counters, form handling
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1. Typing Effect ---------- */
  const roles = [
    "Python Developer",
    "Machine Learning Engineer",
    "Computer Vision Engineer",
    "Mechatronics Engineer",
    "Data Scientist",
    "AI Enthusiast",
  ];

  const typingEl = document.getElementById("typing");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIndex--);
    } else {
      typingEl.textContent = currentRole.substring(0, charIndex++);
    }

    let speed = isDeleting ? 50 : 110;

    if (!isDeleting && charIndex > currentRole.length) {
      // Pause at end of word before deleting
      isDeleting = true;
      speed = 1600;
    } else if (isDeleting && charIndex < 0) {
      // Move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }
  typeEffect();

  /* ---------- 2. Theme Toggle (saved in localStorage) ---------- */
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-theme");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    const isLight = body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  /* ---------- 3. Mobile Navigation ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav__link");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navMenu.classList.toggle("open");
  });

  // Close menu when a link is clicked (mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("open");
      navMenu.classList.remove("open");
    });
  });

  /* ---------- 4. Header Shadow on Scroll ---------- */
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);

    /* ---------- 7. Back-to-top visibility (same listener) ---------- */
    backToTop.classList.toggle("visible", window.scrollY > 500);
  });

  /* ---------- 5. Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll("section[id]");

  function highlightNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active-link");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active-link");
          }
        });
      }
    });
  }
  window.addEventListener("scroll", highlightNav);
  highlightNav();

  /* ---------- 6. Scroll Reveal Animations ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    revealObserver.observe(el);
  });

  /* ---------- 7. Animated Skill Bars ---------- */
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = fill.dataset.width + "%";
          skillObserver.unobserve(fill);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll(".skill__fill").forEach((fill) => {
    skillObserver.observe(fill);
  });

  /* ---------- 8. Animated Counters (About stats) ---------- */
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.count;
        const duration = 1500;
        const startTime = performance.now();

        function update(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          counter.textContent = Math.round(eased * target) + "+";
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);

        counterObserver.unobserve(counter);
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll(".stat__number").forEach((counter) => {
    counterObserver.observe(counter);
  });

  /* ---------- 9. Contact Form (demo handler) ---------- */
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "⚠️ Please fill in all fields.";
      return;
    }

    // Demo only: replace with a real backend / email service
    // e.g. Formspree, EmailJS, or your own API endpoint.
    formStatus.textContent = `✅ Thanks, ${name}! Your message has been sent (demo).`;
    contactForm.reset();

    setTimeout(() => {
      formStatus.textContent = "";
    }, 5000);
  });

  /* ---------- 10. Back to Top Button ---------- */
  const backToTop = document.getElementById("back-to-top");

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 11. Footer Year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});