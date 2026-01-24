// Configuration
const jobTitles = ["Cybersecurity Analyst", "SOC Analyst", "Cybersecurity Specialist"];
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
            typewriterElement.textContent = currentTitle.substring(0, currentCharIndex + 1);
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
            typewriterElement.textContent = currentTitle.substring(0, currentCharIndex - 1);
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
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeWriterEffect, 1000);
    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
    
    // Back to Top Logic
    const backToTopBtn = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.replace("translate-y-16", "translate-y-0");
            backToTopBtn.classList.replace("opacity-0", "opacity-100");
        } else {
            backToTopBtn.classList.replace("translate-y-0", "translate-y-16");
            backToTopBtn.classList.replace("opacity-100", "opacity-0");
        }
    });
});