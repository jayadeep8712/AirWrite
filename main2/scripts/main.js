// Import components
import { initNavbar } from './components/navbar.js';
import { initHero } from './components/hero.js';
import { initCarousel } from './components/carousel.js';
import { initGallery } from './components/gallery.js';
import { initCursor } from './components/cursor.js';
import { loadProfile } from './components/profile.js';

// Import utilities
import { initAnimations } from './utils/animations.js';

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load components
    loadComponents();
    
    // Initialize features
    initFeatures();
    
    // Setup animations
    initAnimations();
});

async function loadComponents() {
    try {
        // Load HTML components
        const components = [
            { id: 'nav-container', file: 'navbar.html' },
            { id: 'hero-container', file: 'hero.html' },
            { id: 'about-container', file: 'about.html' },
            { id: 'carousel-container', file: 'carousel.html' },
            { id: 'issues-container', file: 'issues.html' },
            { id: 'solutions-container', file: 'solutions.html' },
            { id: 'gallery-container', file: 'gallery.html' },
            { id: 'action-container', file: 'take-action.html' },
            { id: 'footer-container', file: 'footer.html' },
            { id: 'profile-container', file: 'profile.html' }
        ];

        await Promise.all(components.map(async ({ id, file }) => {
            const container = document.getElementById(id);
            if (container) {
                const response = await fetch(`components/${file}`);
                const html = await response.text();
                container.innerHTML = html;
            }
        }));
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

function initFeatures() {
    // Initialize all components
    initNavbar();
    initHero();
    initCarousel();
    initGallery();
    initCursor();
    loadProfile();
    
    // Setup scroll behavior
    setupSmoothScroll();
    
    // Setup intersection observers
    setupIntersectionObservers();
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupIntersectionObservers() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}