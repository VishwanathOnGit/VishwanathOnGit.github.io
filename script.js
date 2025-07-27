// DOM Elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const contactForm = document.getElementById('contact-form');
const navbar = document.getElementById('navbar');

// Mobile Menu Toggle
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuButton.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.className = 'fas fa-bars text-xl';
    } else {
        icon.className = 'fas fa-times text-xl';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.querySelector('i').className = 'fas fa-bars text-xl';
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
function updateNavbar() {
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        navbar.classList.remove('navbar-transparent');
        navbar.classList.add('navbar-solid');
    } else {
        navbar.classList.remove('navbar-solid');
        navbar.classList.add('navbar-transparent');
    }
}

// Initialize navbar
navbar.classList.add('navbar-transparent');

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-indicator').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateNavbar();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animation elements
document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.getElementById('about');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counterObserver.observe(aboutSection);

// TypewriterJS Effect Implementation
function initializeTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    
    if (typewriterElement && typeof Typewriter !== 'undefined') {
        const typewriter = new Typewriter(typewriterElement, {
            loop: true,
            delay: 100,
            deleteSpeed: 50,
            cursor: '|' // Back to traditional pipe cursor
        });
        
        typewriter
            .typeString('Developer')
            .pauseFor(2000)
            .deleteAll()
            .typeString('Designer')
            .pauseFor(2000)
            .deleteAll()
            .typeString('Innovator')
            .pauseFor(2000)
            .deleteAll()
            .typeString('Creator')
            .pauseFor(2000)
            .deleteAll()
            .typeString('Problem Solver')
            .pauseFor(2000)
            .deleteAll()
            .start();
    } else {
        // Fallback if TypewriterJS doesn't load
        if (typewriterElement) {
            typewriterElement.textContent = 'Developer';
        }
    }
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-purple-300');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('text-purple-300');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Parallax Effect
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

window.addEventListener('scroll', parallaxEffect);

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validate form
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.querySelector('i').className = 'fas fa-bars text-xl';
    }
});

// Performance Optimizations
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateScrollProgress();
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Reduce motion for users who prefer it
function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Focus management for accessibility
function manageFocus() {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusable = Array.from(document.querySelectorAll(focusableElements));
            const index = focusable.indexOf(document.activeElement);
            
            if (e.shiftKey) {
                const prevIndex = index > 0 ? index - 1 : focusable.length - 1;
                focusable[prevIndex].focus();
            } else {
                const nextIndex = index >= 0 ? (index + 1) % focusable.length : 0;
                focusable[nextIndex].focus();
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    respectReducedMotion();
    manageFocus();
    
    // Initialize TypewriterJS with a small delay to ensure the library is loaded
    setTimeout(() => {
        initializeTypewriter();
    }, 1000);
    
    // Add scroll to next section functionality for the scroll indicator
    const scrollIndicator = document.querySelector('.absolute.bottom-8 i.fa-chevron-down');
    if (scrollIndicator) {
        scrollIndicator.parentElement.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        scrollIndicator.parentElement.style.cursor = 'pointer';
    }
    
    // Add loading animation
    document.body.classList.add('opacity-0');
    setTimeout(() => {
        document.body.classList.remove('opacity-0');
        document.body.classList.add('transition-opacity', 'duration-500');
    }, 100);
    
    // Initialize skill items animation
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.className += ' inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm mb-2 transition-all duration-300 hover:bg-purple-100 hover:text-purple-700 cursor-default';
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    console.log('🚀 Portfolio website loaded successfully!');
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
