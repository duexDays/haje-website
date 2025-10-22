// Haje Website JavaScript - Basic Scroll Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Haje website loaded');
    
    // Initialize dynamic viewport calculations
    initializeViewportCalculations();
    
    // Initialize basic scroll functionality
    initializeScrollFunctionality();
    
    // Initialize scroll snap functionality
    initializeScrollSnap();
    
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
    window.addEventListener('resize', debounce(function() {
        // Close mobile menu if screen becomes desktop size
        const nav = document.querySelector('nav');
        if (nav && nav.classList.contains('mobile-open') && window.innerWidth > 768) {
            nav.classList.remove('mobile-open');
        }
        createMobileMenu();
    }, 100));
    
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
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                console.log('Scrolling to:', targetId, targetSection); // Debug log
                
                // Close mobile menu if it's open
                const nav = document.querySelector('nav');
                if (nav && nav.classList.contains('mobile-open')) {
                    nav.classList.remove('mobile-open');
                }
                
                // Get header height for offset calculation
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 80;
                
                // Calculate target position with header offset
                const targetTop = targetSection.offsetTop - headerHeight;
                
                // Method 1: window.scrollTo with header offset
                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
                
                // Method 2: scrollIntoView as backup
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 50);
            } else {
                console.error('Target section not found:', targetId);
            }
        });
    });
    
    // Scroll indicators removed
    
    // Add scroll spy for navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;
        
        let current = '';
        const scrollPosition = window.scrollY + headerHeight + 50; // Add offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

// Scroll indicators removed

// Mobile menu functionality
function createMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Remove existing mobile menu button if it exists
    const existingButton = document.querySelector('.mobile-menu-btn');
    if (existingButton) {
        existingButton.remove();
    }
    
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
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('mobile-open');
        });
        
        // Add mobile menu styles (only if not already added)
        let mobileStyle = document.querySelector('#mobile-menu-styles');
        if (!mobileStyle) {
            mobileStyle = document.createElement('style');
            mobileStyle.id = 'mobile-menu-styles';
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
                    background: transparent;
                }
            }
        `;
            document.head.appendChild(mobileStyle);
        }
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

// Dynamic viewport calculations - Enhanced precision
function initializeViewportCalculations() {
    let lastCalculatedSize = { width: 0, height: 0 };
    
    function updateViewportVariables() {
        const currentWidth = window.innerWidth;
        const currentHeight = window.innerHeight;
        
        // Skip recalculation if size hasn't changed significantly
        if (Math.abs(currentWidth - lastCalculatedSize.width) < 10 && 
            Math.abs(currentHeight - lastCalculatedSize.height) < 10) {
            return;
        }
        
        lastCalculatedSize = { width: currentWidth, height: currentHeight };
        
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        
        if (header && footer) {
            // Get precise measurements
            const headerRect = header.getBoundingClientRect();
            const footerRect = footer.getBoundingClientRect();
            const headerHeight = Math.ceil(headerRect.height);
            const footerHeight = Math.ceil(footerRect.height);
            
            // Calculate available space (full screen with header overlay)
            const availableHeight = currentHeight;
            const availableWidth = currentWidth;
            
            // Update CSS custom properties with precise values
            document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
            document.documentElement.style.setProperty('--footer-height', footerHeight + 'px');
            document.documentElement.style.setProperty('--available-height', availableHeight + 'px');
            document.documentElement.style.setProperty('--available-width', availableWidth + 'px');
            
            // Calculate optimal content scaling with more precise algorithms
            const baseHeight = 800; // Base height for optimal display
            const baseWidth = 1200; // Base width for optimal display
            
            // Calculate scaling factors
            const heightRatio = availableHeight / baseHeight;
            const widthRatio = availableWidth / baseWidth;
            const minRatio = Math.min(heightRatio, widthRatio);
            
            // Content scale - how much to scale overall content
            const contentScale = Math.max(0.6, Math.min(1.2, minRatio));
            
            // Text scale - how much to scale text specifically
            const textScale = Math.max(0.7, Math.min(1.3, heightRatio * 0.9));
            
            // Title scale - how much to scale titles
            const titleScale = Math.max(0.8, Math.min(1.4, heightRatio * 0.95));
            
            // Spacing scale - how much to scale spacing and padding
            const spacingScale = Math.max(0.5, Math.min(1.5, heightRatio * 0.8));
            
            // Update CSS custom properties
            document.documentElement.style.setProperty('--content-scale', contentScale);
            document.documentElement.style.setProperty('--text-scale', textScale);
            document.documentElement.style.setProperty('--title-scale', titleScale);
            document.documentElement.style.setProperty('--spacing-scale', spacingScale);
            
            // Update section heights with precise calculations
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionId = section.id;
                
                if (sectionId === 'how-it-works') {
                    // How-it-works section uses full viewport height
                    section.style.height = availableHeight + 'px';
                    section.style.minHeight = availableHeight + 'px';
                } else {
                    // Other sections use full viewport height
                    section.style.height = availableHeight + 'px';
                    section.style.minHeight = availableHeight + 'px';
                }
            });
            
            // Precise hero section adjustments
            adjustHeroSection(availableHeight, availableWidth);
            
            // Precise about section adjustments
            adjustAboutSection(availableHeight, availableWidth);
            
            // Precise services section adjustments
            adjustServicesSection(availableHeight, availableWidth);
            
            // Precise how-it-works section adjustments
            adjustHowItWorksSection(availableHeight, availableWidth);
        }
    }
    
    function adjustHeroSection(availableHeight, availableWidth) {
        const heroOverlay = document.querySelector('.hero-overlay');
        const heroBottomCta = document.querySelector('.hero-bottom-cta');
        
        if (heroOverlay) {
            // Calculate optimal overlay position for full screen with header overlay
            const overlayHeight = heroOverlay.scrollHeight;
            
            // Center position with header consideration
            let optimalTop = 50; // Center position for full screen
            
            if (availableHeight < 500) {
                optimalTop = 55; // Move down for very small screens
            } else if (availableHeight < 600) {
                optimalTop = 52; // Slightly down for small screens
            } else if (availableHeight > 900) {
                optimalTop = 48; // Move up for large screens
            }
            
            // Adjust based on content overflow
            if (overlayHeight > availableHeight * 0.7) {
                optimalTop = Math.max(30, optimalTop - 5);
            }
            
            heroOverlay.style.top = optimalTop + '%';
            
            // Adjust max-width for better text wrapping
            const maxWidth = Math.min(900, availableWidth * 0.85);
            heroOverlay.style.maxWidth = maxWidth + 'px';
        }
        
        if (heroBottomCta) {
            // Position CTA buttons with better spacing for full screen
            let bottomPosition;
            
            if (availableHeight < 500) {
                bottomPosition = Math.max(30, availableHeight * 0.1);
            } else if (availableHeight < 700) {
                bottomPosition = Math.max(50, availableHeight * 0.12);
            } else {
                bottomPosition = Math.max(80, availableHeight * 0.15);
            }
            
            heroBottomCta.style.bottom = bottomPosition + 'px';
        }
    }
    
    function adjustAboutSection(availableHeight, availableWidth) {
        const aboutTextContent = document.querySelector('.about-text-content');
        const aboutImage = document.querySelector('.about-image');
        
        if (aboutTextContent) {
            // Calculate optimal padding based on available space and content
            const contentHeight = aboutTextContent.scrollHeight;
            const optimalPadding = Math.max(20, Math.min(80, availableHeight * 0.08));
            
            // Adjust padding based on content overflow
            if (contentHeight > availableHeight * 0.8) {
                aboutTextContent.style.padding = Math.max(15, optimalPadding * 0.7) + 'px';
            } else {
                aboutTextContent.style.padding = optimalPadding + 'px';
            }
            
            // Adjust max-width for better text readability
            const maxWidth = Math.min(600, availableWidth * 0.45);
            aboutTextContent.style.maxWidth = maxWidth + 'px';
        }
        
        if (aboutImage) {
            // Ensure image doesn't overflow
            const maxImageHeight = Math.min(availableHeight, availableHeight * 0.9);
            aboutImage.style.maxHeight = maxImageHeight + 'px';
        }
    }
    
    function adjustServicesSection(availableHeight, availableWidth) {
        const servicesSection = document.getElementById('services');
        const servicesContainer = document.querySelector('.services-container');
        const servicesImage = document.querySelector('.services-image');
        
        if (servicesSection) {
            // Full screen layout - no top padding needed
            servicesSection.style.paddingTop = '0px';
        }
        
        if (servicesContainer) {
            // Adjust gap based on available space and content density
            const optimalGap = Math.max(10, Math.min(30, availableHeight * 0.03));
            servicesContainer.style.gap = optimalGap + 'px';
            
            // Use full available height
            servicesContainer.style.height = '100%';
        }
        
        if (servicesImage) {
            // Adjust image size based on available space
            const maxImageHeight = Math.min(500, availableHeight * 0.5);
            servicesImage.style.maxHeight = maxImageHeight + 'px';
        }
    }
    
    function adjustHowItWorksSection(availableHeight, availableWidth) {
        const howItWorksContainer = document.querySelector('.how-it-works-container');
        const howItWorksSection = document.getElementById('how-it-works');
        
        if (howItWorksContainer) {
            // Calculate optimal grid layout based on both height and width
            let columns = 6;
            let gap = 20;
            
            // Height-based adjustments
            if (availableHeight < 400) {
                columns = 2;
                gap = 8;
            } else if (availableHeight < 500) {
                columns = 2;
                gap = 10;
            } else if (availableHeight < 600) {
                columns = 3;
                gap = 12;
            } else if (availableHeight < 700) {
                columns = 4;
                gap = 15;
            } else if (availableHeight < 800) {
                columns = 5;
                gap = 18;
            }
            
            // Width-based adjustments
            if (availableWidth < 480) {
                columns = 1;
                gap = 15;
            } else if (availableWidth < 768) {
                columns = Math.min(columns, 2);
            } else if (availableWidth < 1024) {
                columns = Math.min(columns, 3);
            } else if (availableWidth < 1200) {
                columns = Math.min(columns, 4);
            }
            
            howItWorksContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
            howItWorksContainer.style.gap = gap + 'px';
            
            // Adjust step visual sizes based on available space
            const stepVisuals = document.querySelectorAll('.step-visual');
            const stepNumbers = document.querySelectorAll('.step-number');
            
            // Calculate optimal size based on container and content
            const containerWidth = howItWorksContainer.offsetWidth;
            const availableWidthPerStep = (containerWidth - (gap * (columns - 1))) / columns;
            const optimalSize = Math.max(50, Math.min(120, availableWidthPerStep * 0.4, availableHeight * 0.12));
            
            stepVisuals.forEach(visual => {
                visual.style.width = optimalSize + 'px';
                visual.style.height = optimalSize + 'px';
            });
            
            // Adjust step numbers proportionally
            const numberSize = Math.max(20, Math.min(30, optimalSize * 0.25));
            stepNumbers.forEach(number => {
                number.style.width = numberSize + 'px';
                number.style.height = numberSize + 'px';
                number.style.fontSize = (numberSize * 0.4) + 'px';
            });
        }
        
        if (howItWorksSection) {
            // Full screen layout
            howItWorksSection.style.padding = '0 10%';
        }
    }
    
    // Initial calculation with delay to ensure DOM is ready
    setTimeout(updateViewportVariables, 100);
    
    // Recalculate on resize with debouncing
    const debouncedUpdate = debounce(updateViewportVariables, 50);
    window.addEventListener('resize', debouncedUpdate);
    
    // Recalculate on orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(updateViewportVariables, 200);
    });
    
    // Recalculate when content changes
    const observer = new MutationObserver(debounce(updateViewportVariables, 100));
    observer.observe(document.body, { 
        childList: true, 
        subtree: true, 
        attributes: true,
        attributeFilter: ['style', 'class']
    });
}

// Initialize scroll snap functionality for smooth section transitions
function initializeScrollSnap() {
    let isScrolling = false;
    let scrollTimeout;
    
    // Get all sections and footer
    const sections = document.querySelectorAll('section');
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 80;
    
    // Create an array of all scrollable elements (sections + footer)
    const scrollableElements = Array.from(sections);
    if (footer) {
        scrollableElements.push(footer);
    }
    
    // Enhanced wheel event handler for smooth section snapping
    function handleWheel(e) {
        if (isScrolling) {
            e.preventDefault();
            return;
        }
        
        const currentScroll = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const deltaY = e.deltaY;
        
        // Determine scroll direction
        const isScrollingDown = deltaY > 0;
        const isScrollingUp = deltaY < 0;
        
        // Find current section with improved visibility detection
        let currentSectionIndex = -1;
        let maxVisibleRatio = 0;
        
        scrollableElements.forEach((element, index) => {
            const elementTop = element.offsetTop - headerHeight;
            const elementBottom = elementTop + element.offsetHeight;
            const elementHeight = element.offsetHeight;
            
            // Calculate visible portion of the element
            const visibleTop = Math.max(currentScroll, elementTop);
            const visibleBottom = Math.min(currentScroll + windowHeight, elementBottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibleRatio = visibleHeight / elementHeight;
            
            // If element is at least 30% visible, consider it as current section
            if (visibleRatio > 0.3 && visibleRatio > maxVisibleRatio) {
                currentSectionIndex = index;
                maxVisibleRatio = visibleRatio;
            }
        });
        
        // Prevent default scroll behavior
        e.preventDefault();
        
        // Calculate target section
        let targetSectionIndex = currentSectionIndex;
        
        if (isScrollingDown && currentSectionIndex < scrollableElements.length - 1) {
            targetSectionIndex = currentSectionIndex + 1;
        } else if (isScrollingUp && currentSectionIndex > 0) {
            targetSectionIndex = currentSectionIndex - 1;
        }
        
        // If we're at the boundaries, allow normal scroll
        if (targetSectionIndex === currentSectionIndex) {
            return;
        }
        
        // Scroll to target section
        const targetSection = scrollableElements[targetSectionIndex];
        if (targetSection) {
            isScrolling = true;
            
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Reset scrolling flag after animation
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    }
    
    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Touch event handlers for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }
    
    function handleTouchEnd(e) {
        if (isScrolling) return;
        
        touchEndY = e.changedTouches[0].clientY;
        const touchDiff = touchStartY - touchEndY;
        const minSwipeDistance = 50;
        
        if (Math.abs(touchDiff) > minSwipeDistance) {
            const currentScroll = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Find current section with improved visibility detection
            let currentSectionIndex = -1;
            let maxVisibleRatio = 0;
            
            scrollableElements.forEach((element, index) => {
                const elementTop = element.offsetTop - headerHeight;
                const elementBottom = elementTop + element.offsetHeight;
                const elementHeight = element.offsetHeight;
                
                // Calculate visible portion of the element
                const visibleTop = Math.max(currentScroll, elementTop);
                const visibleBottom = Math.min(currentScroll + windowHeight, elementBottom);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                const visibleRatio = visibleHeight / elementHeight;
                
                // If element is at least 30% visible, consider it as current section
                if (visibleRatio > 0.3 && visibleRatio > maxVisibleRatio) {
                    currentSectionIndex = index;
                    maxVisibleRatio = visibleRatio;
                }
            });
            
            let targetSectionIndex = currentSectionIndex;
            
            if (touchDiff > 0 && currentSectionIndex < scrollableElements.length - 1) {
                // Swipe up - go to next section
                targetSectionIndex = currentSectionIndex + 1;
            } else if (touchDiff < 0 && currentSectionIndex > 0) {
                // Swipe down - go to previous section
                targetSectionIndex = currentSectionIndex - 1;
            }
            
            if (targetSectionIndex !== currentSectionIndex) {
                const targetSection = scrollableElements[targetSectionIndex];
                if (targetSection) {
                    isScrolling = true;
                    
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        isScrolling = false;
                    }, 800);
                }
            }
        }
    }
    
    // Add touch event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Keyboard navigation
    function handleKeyDown(e) {
        if (isScrolling) return;
        
        const currentScroll = window.pageYOffset;
        const windowHeight = window.innerHeight;
        let currentSectionIndex = -1;
        let maxVisibleRatio = 0;
        
        scrollableElements.forEach((element, index) => {
            const elementTop = element.offsetTop - headerHeight;
            const elementBottom = elementTop + element.offsetHeight;
            const elementHeight = element.offsetHeight;
            
            // Calculate visible portion of the element
            const visibleTop = Math.max(currentScroll, elementTop);
            const visibleBottom = Math.min(currentScroll + windowHeight, elementBottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibleRatio = visibleHeight / elementHeight;
            
            // If element is at least 30% visible, consider it as current section
            if (visibleRatio > 0.3 && visibleRatio > maxVisibleRatio) {
                currentSectionIndex = index;
                maxVisibleRatio = visibleRatio;
            }
        });
        
        let targetSectionIndex = currentSectionIndex;
        
        if (e.key === 'ArrowDown' && currentSectionIndex < scrollableElements.length - 1) {
            targetSectionIndex = currentSectionIndex + 1;
        } else if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
            targetSectionIndex = currentSectionIndex - 1;
        } else if (e.key === 'Home') {
            targetSectionIndex = 0;
        } else if (e.key === 'End') {
            targetSectionIndex = scrollableElements.length - 1;
        }
        
        if (targetSectionIndex !== currentSectionIndex) {
            e.preventDefault();
            const targetSection = scrollableElements[targetSectionIndex];
            if (targetSection) {
                isScrolling = true;
                
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    isScrolling = false;
                }, 800);
            }
        }
    }
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);
}