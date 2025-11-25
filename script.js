/**
 * Pink Panther Website - Accessible JavaScript
 * Handles active page detection and accessibility enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initActivePageDetection();
    initSmoothScroll();
    initAccessibilityEnhancements();
});

/**
 * Active Page Detection
 * Highlights the current page in the navigation menu
 */
function initActivePageDetection() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');

        // Remove active class from all links first
        link.classList.remove('active');
        link.removeAttribute('aria-current');

        // Add active class to current page
        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Smooth Scroll for Anchor Links
 * Provides smooth scrolling for internal page links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            // Skip if it's just "#"
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Scroll to target with smooth behavior
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Set focus to target for accessibility
                // Make element focusable if it's not already
                if (!targetElement.hasAttribute('tabindex')) {
                    targetElement.setAttribute('tabindex', '-1');
                }
                targetElement.focus();

                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Accessibility Enhancements
 * Additional features to improve accessibility
 */
function initAccessibilityEnhancements() {
    // Announce page changes to screen readers
    announcePageLoad();

    // Enhanced keyboard navigation for gallery items
    enhanceGalleryKeyboardNav();

    // Add keyboard shortcuts info
    addKeyboardShortcuts();
}

/**
 * Announce Page Load
 * Announces the current page to screen readers
 */
function announcePageLoad() {
    const pageTitle = document.querySelector('h1');
    if (pageTitle) {
        // Create a live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.textContent = `Página cargada: ${pageTitle.textContent}`;

        document.body.appendChild(liveRegion);

        // Remove after announcement
        setTimeout(() => {
            liveRegion.remove();
        }, 1000);
    }
}

/**
 * Enhance Gallery Keyboard Navigation
 * Improves keyboard navigation for gallery items
 */
function enhanceGalleryKeyboardNav() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length === 0) return;

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('.gallery-image');
        const caption = item.querySelector('.image-caption');

        if (img && caption) {
            // Make gallery items focusable
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'figure');

            // Add aria-label for better screen reader support
            item.setAttribute('aria-label', caption.textContent);

            // Add keyboard interaction
            item.addEventListener('keydown', (e) => {
                // Arrow key navigation
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextItem = galleryItems[index + 1];
                    if (nextItem) nextItem.focus();
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevItem = galleryItems[index - 1];
                    if (prevItem) prevItem.focus();
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    galleryItems[0].focus();
                } else if (e.key === 'End') {
                    e.preventDefault();
                    galleryItems[galleryItems.length - 1].focus();
                }
            });
        }
    });
}

/**
 * Add Keyboard Shortcuts
 * Implements useful keyboard shortcuts for navigation
 */
function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Alt + H = Home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            window.location.href = 'index.html';
        }

        // Alt + G = Gallery
        if (e.altKey && e.key === 'g') {
            e.preventDefault();
            window.location.href = 'gallery.html';
        }

        // Alt + E = Episodes
        if (e.altKey && e.key === 'e') {
            e.preventDefault();
            window.location.href = 'episodes.html';
        }
    });
}

/**
 * Screen Reader Only Class
 * Utility for screen reader only content
 */
const srOnlyStyle = document.createElement('style');
srOnlyStyle.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(srOnlyStyle);

/**
 * Console Message
 * Friendly message for developers
 */
console.log('%c🐾 La Pantera Rosa Website 🐾', 'color: #D81B60; font-size: 20px; font-weight: bold;');
console.log('%cAccessibility Features Enabled ✓', 'color: #4CAF50; font-size: 14px;');
console.log('%cKeyboard Shortcuts:', 'color: #2196F3; font-size: 12px;');
console.log('  Alt + H = Home');
console.log('  Alt + G = Gallery');
console.log('  Alt + E = Episodes');
