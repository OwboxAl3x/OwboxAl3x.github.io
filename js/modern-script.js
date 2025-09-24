// ===== MODERN JAVASCRIPT FOR PORTFOLIO =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initializeThemeToggle();
    initializeNavigation();
    initializeAnimations();
    initializeSkillBars();
    initializeBackToTop();
    calculateAge();
    setCurrentYear();
    initializeSmoothScrolling();
    initializeTypingEffect();
});

// ===== THEME TOGGLE FUNCTIONALITY =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme, themeIcon);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon with animation
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            updateThemeIcon(newTheme, themeIcon);
            themeIcon.style.transform = 'rotate(0deg)';
        }, 150);
        
        // Add a subtle animation to the page
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
}

function updateThemeIcon(theme, iconElement) {
    iconElement.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// ===== ANIMATIONS INITIALIZATION =====
function initializeAnimations() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Add custom entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .skill-category, .education-item');
    animateElements.forEach(el => observer.observe(el));
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                // Animate the skill bar
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
                
                // Unobserve after animation
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== AGE CALCULATION =====
function calculateAge() {
    const birthDate = new Date('1990-12-10');
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    const ageElement = document.getElementById('age');
    if (ageElement) {
        // Add a counting animation
        animateNumber(ageElement, 0, age, 1000);
    }
}

// ===== SET CURRENT YEAR =====
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== TYPING EFFECT =====
function initializeTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const titles = [
            'Senior Software Developer',
            '.NET Specialist',
            'Problem Solver'
        ];
        
        let currentTitleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentTitle = titles[currentTitleIndex];
            
            if (isDeleting) {
                heroSubtitle.textContent = currentTitle.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                heroSubtitle.textContent = currentTitle.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && currentCharIndex === currentTitle.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                typeSpeed = 500; // Pause before next title
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start typing effect after a delay
        setTimeout(typeEffect, 1000);
    }
}

// ===== UTILITY FUNCTIONS =====

// Animate number counting
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (end - start) * easeOutQuart);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Debounce function for performance optimization
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

// ===== PERFORMANCE OPTIMIZATIONS =====

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== EASTER EGGS AND FUN FEATURES =====

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Add some fun animation or effect
    document.body.style.animation = 'rainbow 2s ease-in-out';
    showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
    
    // Add rainbow animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Remove animation after 2 seconds
    setTimeout(() => {
        document.body.style.animation = '';
        document.head.removeChild(style);
    }, 2000);
}

// ===== CONSOLE MESSAGE =====
console.log(`
🚀 Welcome to Alejandro García Vallecillo's Portfolio!

Built with modern web technologies:
- HTML5 & CSS3
- Bootstrap 5
- Vanilla JavaScript
- AOS Animation Library
- Font Awesome 6

Feel free to explore the code and reach out if you have any questions!

GitHub: https://github.com/OwboxAl3x
LinkedIn: https://www.linkedin.com/in/alejandro-garcía-vallecillo-57172846/
Email: agarciavallecillo@gmail.com

Try the Konami Code for a surprise! ↑↑↓↓←→←→BA
`);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});
