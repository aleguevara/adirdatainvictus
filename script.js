/* ============================================
   Cross-Border Health Data Compliance
   JavaScript - Language Toggle, FAQ, Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Language Toggle
    // ============================================
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'es';
    
    function switchLanguage(lang) {
        currentLang = lang;
        
        // Update all elements with data-es and data-en attributes
        document.querySelectorAll('[data-es][data-en]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                // Preserve HTML structure for elements with child nodes
                if (el.children.length === 0 || el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'LI' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4') {
                    el.innerHTML = text;
                }
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang === 'es' ? 'es' : 'en';
        
        // Update toggle button appearance
        const langActive = langToggle.querySelector('.lang-active');
        const langInactive = langToggle.querySelector('.lang-inactive');
        
        if (lang === 'es') {
            langActive.textContent = 'ES';
            langInactive.textContent = 'EN';
        } else {
            langActive.textContent = 'EN';
            langInactive.textContent = 'ES';
        }
        
        // Store preference
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // Toggle language on click
    langToggle.addEventListener('click', function() {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        switchLanguage(newLang);
    });
    
    // Check for saved preference or browser language
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        switchLanguage(savedLang);
    } else {
        // Detect browser language
        const browserLang = navigator.language.slice(0, 2);
        if (browserLang === 'en') {
            switchLanguage('en');
        }
    }
    
    // ============================================
    // Navigation Scroll Effect
    // ============================================
    const nav = document.getElementById('nav');
    let lastScroll = 0;
    
    function handleNavScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    
    // ============================================
    // Smooth Scroll for Navigation Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = nav.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // FAQ Accordion
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            this.setAttribute('aria-expanded', !isActive);
        });
    });
    
    // ============================================
    // Scroll Animations
    // ============================================
    const animatedElements = document.querySelectorAll('.risk-card, .solution-card, .credential-card, .market-feature');
    
    // Add animation class to elements
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger animation for grid items
                const siblings = entry.target.parentElement.children;
                const index = Array.from(siblings).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
    
    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
            document.body.classList.toggle('nav-open');
        });
    }
    
    // ============================================
    // Stats Counter Animation
    // ============================================
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                element.textContent = '$' + end + 'M';
                clearInterval(timer);
            } else {
                element.textContent = '$' + Math.floor(current) + 'M';
            }
        }, 16);
    }
    
    const statNumber = document.querySelector('.stat-number');
    if (statNumber) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(entry.target, 0, 70, 1500);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statObserver.observe(statNumber);
    }
    
    // ============================================
    // Parallax Effect for Hero (subtle)
    // ============================================
    const heroBg = document.querySelector('.hero-bg');
    
    function handleParallax() {
        const scrolled = window.pageYOffset;
        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
    
    window.addEventListener('scroll', handleParallax, { passive: true });
    
    // ============================================
    // Form Enhancement (if needed later)
    // ============================================
    // Placeholder for future form handling
    
    // ============================================
    // Console branding
    // ============================================
    console.log('%c CBHDC ', 'background: #0a1628; color: #b8860b; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Cross-Border Health Data Compliance ', 'color: #666; font-size: 12px;');
    
});

// ============================================
// Add mobile menu styles dynamically
// ============================================
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(10, 22, 40, 0.98);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .nav-links.mobile-open {
            display: flex;
            opacity: 1;
            visibility: visible;
        }
        
        .nav-links a {
            font-size: 1.25rem;
        }
        
        .nav-mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        body.nav-open {
            overflow: hidden;
        }
    }
`;
document.head.appendChild(mobileStyles);
