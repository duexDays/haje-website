// Haje Website JavaScript - Basic Scroll Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Haje website loaded');
    
    // Initialize basic scroll functionality
    initializeScrollFunctionality();
    
    // CTA Button functionality removed - Get Started button uses onclick="showComingSoon()"
    
    // Header always visible - scroll effect removed
    
    // Intersection Observer for animations
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
    const animateElements = document.querySelectorAll('.step-box, #services ul li, .about-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .step-box, #services ul li, .about-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .step-box:nth-child(odd) {
            transition-delay: 0.1s;
        }
        
        .step-box:nth-child(even) {
            transition-delay: 0.2s;
        }
        
        #services ul li:nth-child(odd) {
            transition-delay: 0.1s;
        }
        
        #services ul li:nth-child(even) {
            transition-delay: 0.2s;
        }
    `;
    document.head.appendChild(style);
    
    // Mobile menu toggle
    createMobileMenu();
    
    // Recreate mobile menu on resize
    window.addEventListener('resize', function() {
        const existingButton = document.querySelector('.mobile-menu-btn');
        if (existingButton) {
            existingButton.remove();
        }
        createMobileMenu();
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add loading styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Initialize scroll functionality
function initializeScrollFunctionality() {
    // Add smooth scrolling to navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const mainElement = document.querySelector('main');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection && mainElement) {
                const targetTop = targetSection.offsetTop;
                mainElement.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll indicators removed
    
    // Add scroll spy for navigation highlighting
    if (mainElement) {
        mainElement.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('nav a[href^="#"]');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (mainElement.scrollTop >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Scroll indicators removed

// Mobile menu functionality
function createMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (window.innerWidth <= 768) {
        // Create mobile menu button
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            color: var(--haje-text);
            cursor: pointer;
            padding: 10px;
        `;
        
        header.appendChild(menuButton);
        
        // Toggle mobile menu
        menuButton.addEventListener('click', function() {
            nav.classList.toggle('mobile-open');
        });
        
        // Add mobile menu styles
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                
                nav ul {
                    position: fixed;
                    top: 80px;
                    left: -100%;
                    width: 100%;
                    height: calc(100vh - 80px);
                    background: var(--haje-white);
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    padding-top: 50px;
                    transition: left 0.3s ease;
                    box-shadow: 0 2px 10px var(--haje-shadow);
                }
                
                nav.mobile-open ul {
                    left: 0;
                }
                
                nav ul li {
                    margin: 20px 0;
                }
                
                nav ul li a {
                    font-size: 18px;
                    padding: 15px 30px;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
                
                nav ul li a:hover {
                    background: var(--haje-card-background);
                }
            }
        `;
        document.head.appendChild(mobileStyle);
    }
}

// Utility functions
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

// Performance optimization - header scroll effect removed

// Coming Soon 모달 기능
function showComingSoon() {
    // 모달이 이미 있으면 제거
    const existingModal = document.querySelector('.coming-soon-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // 모달 HTML 생성
    const modal = document.createElement('div');
    modal.className = 'coming-soon-modal';
    modal.innerHTML = `
        <div class="coming-soon-content">
            <h3>Coming Soon!</h3>
            <p>We're putting the finishing touches on Haje. Our AI-powered clothing repair platform will be launching soon!</p>
            <p>Stay tuned for updates and be among the first to experience the future of sustainable fashion.</p>
            <button class="close-modal" onclick="closeModal()">Got it!</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // 배경 클릭으로 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.coming-soon-modal');
    if (modal) {
        modal.style.display = 'none';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});