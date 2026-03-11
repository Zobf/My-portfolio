// Configuration
const jobTitles = [
  "Cybersecurity Analyst",
  "SOC Analyst",
  "Cybersecurity Specialist",
];
const typewriterSpeed = 100;
const eraseSpeed = 50;
const pauseBetweenTitles = 1500;

let currentTitleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeWriterEffect() {
  const typewriterElement = document.getElementById("typewriter-text");
  if (!typewriterElement) return;

  const currentTitle = jobTitles[currentTitleIndex];

  if (!isDeleting && !isPaused) {
    if (currentCharIndex < currentTitle.length) {
      typewriterElement.textContent = currentTitle.substring(
        0,
        currentCharIndex + 1
      );
      currentCharIndex++;
      setTimeout(typeWriterEffect, typewriterSpeed);
    } else {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        typeWriterEffect();
      }, pauseBetweenTitles);
    }
  } else if (isDeleting && !isPaused) {
    if (currentCharIndex > 0) {
      typewriterElement.textContent = currentTitle.substring(
        0,
        currentCharIndex - 1
      );
      currentCharIndex--;
      setTimeout(typeWriterEffect, eraseSpeed);
    } else {
      isDeleting = false;
      currentTitleIndex = (currentTitleIndex + 1) % jobTitles.length;
      setTimeout(typeWriterEffect, 500);
    }
  }
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Stop observing once visible to avoid extra work
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    mobileMenuBtn.setAttribute("aria-expanded", !isHidden);
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Start typewriter slightly delayed
  setTimeout(typeWriterEffect, 1000);

  // Observe elements with fade-in
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // Back to Top Logic with better scroll performance
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  let isTicking = false;

  window.addEventListener("scroll", () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 300) {
          backToTopBtn.classList.replace("translate-y-16", "translate-y-0");
          backToTopBtn.classList.replace("opacity-0", "opacity-100");
        } else {
          backToTopBtn.classList.replace("translate-y-0", "translate-y-16");
          backToTopBtn.classList.replace("opacity-100", "opacity-0");
        }
        isTicking = false;
      });
      isTicking = true;
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
