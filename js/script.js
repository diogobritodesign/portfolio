// ===== CONFIGURATION =====
const CONFIG = {
    SCROLL_OFFSETS: {
        DESKTOP: 100,
        TABLET: 100,
        MOBILE: 50
    },
    BREAKPOINTS: {
        MOBILE: 768,
        TABLET: 1024
    },
    SCROLL_DURATION: 400,
    OBSERVER_THRESHOLD: 0.1,
    INITIAL_VISIBILITY_DELAY: 100,
    DEBOUNCE_DELAY: 16 // ~60fps
};

// ===== UTILITY FUNCTIONS =====
/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Easing function for smooth animations
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value
 */
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Calculate responsive scroll offset based on viewport width
 * @returns {number} Offset in pixels
 */
function getScrollOffset() {
    const width = window.innerWidth;
    if (width <= CONFIG.BREAKPOINTS.MOBILE) {
        return CONFIG.SCROLL_OFFSETS.MOBILE;
    } else if (width <= CONFIG.BREAKPOINTS.TABLET) {
        return CONFIG.SCROLL_OFFSETS.TABLET;
    }
    return CONFIG.SCROLL_OFFSETS.DESKTOP;
}

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    // Toggle menu on button click
    menuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
    });

    // Use event delegation for menu links (more efficient)
    navMenu.addEventListener('click', (e) => {
        // Check if clicked element is a link or inside menu-links
        const link = e.target.closest('.menu-links a');
        if (link) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ===== SMOOTH SCROLL =====
/**
 * Smooth scroll to element with easing and offset
 * @param {HTMLElement} element - Target element to scroll to
 */
function smoothScrollTo(element) {
    const offset = getScrollOffset();
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / CONFIG.SCROLL_DURATION, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < CONFIG.SCROLL_DURATION) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Event delegation for anchor links
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                smoothScrollTo(target);
            }
        }
    }
});

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');

if (cursor) {
    // Direct cursor movement for smooth tracking (no debounce to avoid stuttering)
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }, { passive: true });

    // Use event delegation for pointer effects (more efficient)
    const interactiveSelectors = 'a, button, .btn-animated, .skill-tag, .feedback-container, .nav-menu a, .highlight-pill';
    
    document.addEventListener('mouseenter', (e) => {
        const target = e.target;
        if (target && target.closest && target.closest(interactiveSelectors)) {
            cursor.classList.add('pointer');
        }
    }, true);
    
    document.addEventListener('mouseleave', (e) => {
        const target = e.target;
        if (target && target.closest && target.closest(interactiveSelectors)) {
            cursor.classList.remove('pointer');
        }
    }, true);

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
    threshold: CONFIG.OBSERVER_THRESHOLD
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

/**
 * Add animation classes and observe elements
 * @param {string} selector - CSS selector for elements
 * @param {boolean} useStagger - Whether to add stagger classes
 * @param {number} maxStagger - Maximum stagger index
 */
function observeElements(selector, useStagger = false, maxStagger = Infinity) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, i) => {
        el.classList.add('fade-in');
        if (useStagger) {
            el.classList.add(`stagger-${Math.min(i + 1, maxStagger)}`);
        }
        observer.observe(el);
    });
}

/**
 * Initialize all scroll animations
 */
function initScrollAnimations() {
    // Hero elements
    observeElements('.hero .badge, .hero-title, .hero-subtitle, .hero .btn-animated', true);
    
    // Sobre section
    observeElements('.sobre-line', true);
    
    // Section headers
    observeElements('.section-header, .section-intro');
    
    // Service rows
    observeElements('.service-row', true, 5);
    
    // Skills tags
    const skillsTags = document.querySelector('.skills-tags');
    if (skillsTags) {
        skillsTags.classList.add('fade-in');
        observer.observe(skillsTags);
    }
    
    // Experience rows
    observeElements('.experience-row', true, 5);
    
    // Feedbacks header
    const feedbacksHeader = document.querySelector('.feedbacks-header');
    if (feedbacksHeader) {
        feedbacksHeader.classList.add('fade-in');
        observer.observe(feedbacksHeader);
    }
    
    // Feedback containers
    observeElements('.feedback-container', true);
    
    // CTA section
    observeElements('.cta-final h2, .cta-final > p, .cta-final .btn-animated, .chat-info', true);
    
    // Trigger visible for elements already in viewport
    setTimeout(() => {
        const fadeInElements = document.querySelectorAll('.fade-in');
        fadeInElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, CONFIG.INITIAL_VISIBILITY_DELAY);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Development log (can be removed in production)
if (console && console.log) {
    console.log('%c Design To Impress ', 'background: #5DFF51; color: #000; font-size: 16px; padding: 8px; font-weight: bold;');
}
