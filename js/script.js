// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Smooth scroll with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                smoothScrollTo(target);
            }
        }
    });
});

// Custom smooth scroll function with easing
function smoothScrollTo(element) {
    // Calculate offset based on viewport width
    let offset = 200; // Desktop default
    if (window.innerWidth <= 768) {
        offset = 50; // Mobile
    } else if (window.innerWidth <= 1024) {
        offset = 100; // Tablet
    }
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 400; // Reduced from 1200ms for quicker scroll
    let start = null;

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');

if (cursor) {
    // Move cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Pointer effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn-animated, .skill-tag, .feedback-container, .nav-menu a, .highlight-pill');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('pointer');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('pointer');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    // Hero elements
    const heroElements = document.querySelectorAll('.hero .badge, .hero-title, .hero-subtitle, .hero .btn-animated');
    heroElements.forEach((el, i) => {
        el.classList.add('fade-in', `stagger-${i + 1}`);
        observer.observe(el);
    });

    // Sobre section
    const sobreLines = document.querySelectorAll('.sobre-line');
    sobreLines.forEach((el, i) => {
        el.classList.add('fade-in', `stagger-${i + 1}`);
        observer.observe(el);
    });

    // Section headers
    const sectionHeaders = document.querySelectorAll('.section-header, .section-intro');
    sectionHeaders.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Service rows
    const serviceRows = document.querySelectorAll('.service-row');
    serviceRows.forEach((el, i) => {
        el.classList.add('fade-in', `stagger-${Math.min(i + 1, 5)}`);
        observer.observe(el);
    });

    // Skills tags container
    const skillsTags = document.querySelector('.skills-tags');
    if (skillsTags) {
        skillsTags.classList.add('fade-in');
        observer.observe(skillsTags);
    }

    // Experience rows
    const expRows = document.querySelectorAll('.experience-row');
    expRows.forEach((el, i) => {
        el.classList.add('fade-in', `stagger-${Math.min(i + 1, 5)}`);
        observer.observe(el);
    });

    // Feedbacks
    const feedbacksHeader = document.querySelector('.feedbacks-header');
    if (feedbacksHeader) {
        feedbacksHeader.classList.add('fade-in');
        observer.observe(feedbacksHeader);
    }

    const feedbackContainers = document.querySelectorAll('.feedback-container');
    feedbackContainers.forEach((el, i) => {
        el.classList.add('fade-in', `stagger-${i + 1}`);
        observer.observe(el);
    });

    // CTA section
    const ctaElements = document.querySelectorAll('.cta-final h2, .cta-final > p, .cta-final .btn-animated, .chat-info');
    ctaElements.forEach((el, i) => {
        el.classList.add('fade-in', `stagger-${i + 1}`);
        observer.observe(el);
    });

    // Trigger visible for elements already in viewport
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});

console.log('%c Design To Impress ', 'background: #5DFF51; color: #000; font-size: 16px; padding: 8px; font-weight: bold;');
