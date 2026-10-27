/* ========================================
   PROFESSIONAL PORTFOLIO - JAVASCRIPT
   Interactive Features & Event Handlers
   ======================================== */

// ========================================
// NAVIGATION & SCROLL MANAGEMENT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeModals();
    initializeFormHandling();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
            updateNavActiveState(sectionId);
            closeHamburgerMenu();
        });
    });

    // Update nav state on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        updateNavActiveState(current);
    });
}

function updateNavActiveState(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ========================================
// HAMBURGER MENU
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu?.classList.toggle('active');
});

function closeHamburgerMenu() {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
}

// ========================================
// MODAL FUNCTIONALITY
// ========================================

function initializeModals() {
    // Close modal when clicking on the modal background
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Trigger animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'none';
        setTimeout(() => {
            modalContent.style.animation = 'slideUp 0.3s ease';
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ========================================
// SCROLL EFFECTS & ANIMATIONS
// ========================================

function initializeScrollEffects() {
    // Add scroll animation to cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards
    document.querySelectorAll('.training-card, .project-card, .certificate-card, .achievement-item, .education-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// ========================================
// FORM HANDLING
// ========================================

function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: event.target.querySelector('input[type="text"]').value,
        email: event.target.querySelector('input[type="email"]').value,
        message: event.target.querySelector('textarea').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }

    // Simulate sending (in real application, would send to backend)
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate API call
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        event.target.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff6b6b' : '#00d4ff'};
        color: #0a0e27;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ========================================
// DOWNLOAD RESUME
// ========================================

function downloadResume() {
    // In a real scenario, this would trigger a CV download
    // For demo purposes, we'll show a message
    showNotification('CV download feature - integrate with your actual CV file', 'info');
    
    // Uncomment the below line when you have an actual CV file
    // window.location.href = '/path/to/Vishvanath_CV.pdf';
}

// ========================================
// SMOOTH SCROLL BEHAVIOR
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ========================================
// PARALLAX EFFECT
// ========================================

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.blob, .grid-bg');
    
    parallaxElements.forEach((element, index) => {
        if (element.classList.contains('grid-bg')) {
            element.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// ========================================
// ENHANCED CARD INTERACTIONS
// ========================================

// Training Cards
document.querySelectorAll('.training-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project Cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Certificate Cards
document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// DYNAMIC CONTACT LINKS
// ========================================

// Enhanced contact card handling
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// PAGE LOAD ANIMATIONS
// ========================================

window.addEventListener('load', function() {
    // Animate hero section elements
    animateHeroSection();
    
    // Add fade-in to all sections
    document.querySelectorAll('.section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.animation = `fadeIn 0.6s ease forwards`;
        section.style.animationDelay = `${index * 0.1}s`;
    });
});

function animateHeroSection() {
    const heroText = document.querySelector('.hero-text');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroText) {
        heroText.style.animation = 'slideInLeft 1s ease-out';
    }
    if (heroVisual) {
        heroVisual.style.animation = 'slideInRight 1s ease-out';
    }
}

// ========================================
// SKILL ITEM ANIMATIONS
// ========================================

document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animation = `slideUp 0.5s ease forwards`;
    item.style.animationDelay = `${index * 0.1}s`;
});

// ========================================
// INTEREST CARD ANIMATION
// ========================================

document.querySelectorAll('.interest-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animation = `slideUp 0.5s ease forwards`;
    card.style.animationDelay = `${index * 0.1}s`;
});

// ========================================
// TIMELINE ANIMATION
// ========================================

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animation = `slideUp 0.5s ease forwards`;
    item.style.animationDelay = `${index * 0.2}s`;
});

// ========================================
// PROGRESS BAR ANIMATION
// ========================================

function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
            fill.style.width = width;
        }, 100);
    });
}

// Animate progress bars when modals open
document.querySelectorAll('.modal').forEach(modal => {
    const observer = new MutationObserver(() => {
        if (modal.classList.contains('active')) {
            animateProgressBars();
        }
    });
    observer.observe(modal, { attributes: true });
});

// ========================================
// INTERSECTION OBSERVER FOR LAZY ANIMATIONS
// ========================================

const revealElements = document.querySelectorAll('.training-card, .project-card, .certificate-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    revealObserver.observe(element);
});

// ========================================
// MODAL SCROLL TO TOP
// ========================================

function openModalWithScroll(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        openModal(modalId);
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
    }
}

// ========================================
// ENHANCED KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', function(e) {
    // Tab through nav links
    if (e.key === 'Tab') {
        const navLinks = document.querySelectorAll('.nav-link');
        const focusedElement = document.activeElement;
        
        if (navLinks.length > 0) {
            let isNavLink = false;
            navLinks.forEach(link => {
                if (link === focusedElement) {
                    isNavLink = true;
                }
            });
        }
    }
});

// ========================================
// BACKGROUND ANIMATION CONTROL
// ========================================

let animationRunning = true;

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab is visible
        document.body.style.animationPlayState = 'running';
    }
});

// ========================================
// RESPONSIVE MENU BEHAVIOR
// ========================================

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeHamburgerMenu();
    }
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for scroll events
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

// Get random color from theme
function getRandomThemeColor() {
    const colors = [
        'var(--primary-color)',
        'var(--secondary-color)',
        'var(--accent-color)',
        'var(--warning-color)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c✨ Welcome to Vishvanath\'s Portfolio ✨', 'font-size: 20px; color: #00ff88; font-weight: bold;');
console.log('%cElectronics Engineer | VLSI Designer | Neuromorphic Computing', 'font-size: 14px; color: #00d4ff;');
console.log('%cFeel free to explore the code and reach out for collaborations!', 'font-size: 12px; color: #a0aac7;');

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Use requestAnimationFrame for smooth animations
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ========================================
// THEME PREFERENCE (OPTIONAL FUTURE ENHANCEMENT)
// ========================================

// Check for user's preferred color scheme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Dark mode is already set as default
    document.documentElement.style.colorScheme = 'dark';
}

// Listen for changes in color scheme preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
        document.documentElement.style.colorScheme = 'dark';
    }
});

// ========================================
// FEATURE DETECTION & POLYFILLS
// ========================================

// Check if browser supports smooth scroll
if (!CSS.supports('scroll-behavior', 'smooth')) {
    console.warn('Smooth scroll not supported');
}

// ========================================
// EVENT DELEGATION FOR DYNAMIC CONTENT
// ========================================

document.addEventListener('click', function(e) {
    // Handle dynamic card clicks
    if (e.target.closest('.training-card')) {
        const card = e.target.closest('.training-card');
        // Track analytics if needed
    }
});

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Add focus indicators
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ========================================
// TOUCH SUPPORT FOR MOBILE
// ========================================

document.addEventListener('touchstart', function() {
    // Enable touch-based interactions
    document.body.classList.add('touch-enabled');
});

// ========================================
// LAZY LOAD IMAGES (FUTURE ENHANCEMENT)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    // document.querySelectorAll('img[data-src]').forEach(img => {
    //     imageObserver.observe(img);
    // });
}

// ========================================
// EXTERNAL LINK HANDLING
// ========================================

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Add tracking or analytics here if needed
    });
});

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', function(event) {
    console.error('Error:', event.error);
    // Could send error to logging service
});

// ========================================
// MEMORY MANAGEMENT
// ========================================

window.addEventListener('beforeunload', function() {
    // Clean up event listeners if needed
    revealObserver?.disconnect();
    observer?.disconnect();
});


// Image lightbox
function openLightbox(src) {
    var lb = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = src;
    lb.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
});
