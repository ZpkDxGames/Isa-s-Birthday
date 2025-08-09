// Main JavaScript file for Isabella's Birthday Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeImageProtection();
    initializeAnimations();
    initializeNavigation();
    initializeAgeCalculator();
    initializeScrollIndicator();
    initializeAgeModal();
    
    console.log('🌻 Feliz Aniversário Isabella! Website carregado com sucesso! 🎉');
});

// Add image protection to all images
function initializeImageProtection() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.draggable = false;
        img.oncontextmenu = () => false;
        img.onselectstart = () => false;
        img.ondragstart = () => false;
        img.onmousedown = (e) => {
            if (e.button === 2) { // Right click
                e.preventDefault();
                return false;
            }
        };
    });
}

// Isabella's birth date: August 8th, 2007 at 00:00 UTC-3 (Brazil time)
const BIRTH_DATE = new Date('2007-08-08T03:00:00Z'); // UTC+0 equivalent of 00:00 UTC-3

// Helper function to get current time in UTC-3
function getCurrentBrazilTime() {
    const now = new Date();
    // Convert to UTC-3 (Brazil standard time)
    const utc3Offset = -3 * 60; // UTC-3 in minutes
    const localOffset = now.getTimezoneOffset(); // Local timezone offset in minutes
    const brazilTime = new Date(now.getTime() + (localOffset + utc3Offset) * 60000);
    return brazilTime;
}

// Initialize animations with enhanced smoothness and better performance
function initializeAnimations() {
    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
        // Animate hero content on load
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0) scale(1)';
        }
        
        // Animate Isabella's photo instantly for better UX
        const isaPhoto = document.querySelector('.isa-photo');
        if (isaPhoto) {
            isaPhoto.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            isaPhoto.style.opacity = '1';
            isaPhoto.style.transform = 'scale(1) rotate(0deg)';
        }
    });
    
    // Animate navigation cards with better performance
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach((card, index) => {
        // Remove delays for instant loading
        requestAnimationFrame(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Enhanced age calculator with animated counting
function initializeAgeCalculator() {
    updateAgeDisplay(true); // Initial update with animation
    
    // Update every second for real-time calculation
    setInterval(() => updateAgeDisplay(false), 1000);
}

function updateAgeDisplay(animate = false) {
    const now = getCurrentBrazilTime(); // Use UTC-3 timezone
    const ageSummary = document.getElementById('ageSummary');
    
    if (!ageSummary) return;
    
    const totalMs = now.getTime() - BIRTH_DATE.getTime();
    const years = Math.floor(totalMs / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor((totalMs % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
    const days = Math.floor((totalMs % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    
    const newText = `${years} anos, ${months} meses, ${days} dias`;
    
    if (animate) {
        // Animated counter effect for initial load
        animateCounter(ageSummary, years, 'anos', () => {
            setTimeout(() => {
                ageSummary.textContent = newText;
            }, 500);
        });
    } else {
        ageSummary.textContent = newText;
    }
}

function animateCounter(element, targetValue, unit, callback) {
    let current = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
            if (callback) callback();
        }
        element.textContent = `${Math.floor(current)} ${unit} e contando...`;
    }, 30);
}

// Enhanced scroll indicator with dynamic messages and smooth resizing
function initializeScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (!scrollIndicator) return;
    
    const messages = [
        "Mais informações",
        "Role para baixo",
        "Continuar",
        "Veja mais"
    ];
    
    let currentMessage = 0;
    let hasScrolled = false;
    
    // Add smooth transition styles to the scroll indicator
    const messageElement = scrollIndicator.querySelector('p');
    if (messageElement) {
        messageElement.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        scrollIndicator.style.transition = 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
    }
    
    function updateMessageWithAnimation(newMessage) {
        if (!messageElement || hasScrolled) return;
        
        // Measure the new message width
        const tempElement = document.createElement('span');
        tempElement.style.cssText = `
            position: absolute;
            visibility: hidden;
            font-family: ${getComputedStyle(messageElement).fontFamily};
            font-size: ${getComputedStyle(messageElement).fontSize};
            font-weight: ${getComputedStyle(messageElement).fontWeight};
            white-space: nowrap;
            padding: 0 10px;
        `;
        tempElement.textContent = newMessage;
        document.body.appendChild(tempElement);
        
        const newWidth = tempElement.offsetWidth + 40; // Add padding
        document.body.removeChild(tempElement);
        
        // Get current dimensions
        const currentWidth = scrollIndicator.offsetWidth;
        const currentHeight = scrollIndicator.offsetHeight;
        
        // Calculate scaling factor for smooth transition
        const widthRatio = newWidth / currentWidth;
        const shouldResize = Math.abs(widthRatio - 1) > 0.1; // Only resize if significant difference
        
        // Start animation sequence
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(5px) scale(0.95)';
        
        setTimeout(() => {
            messageElement.textContent = newMessage;
            
            if (shouldResize) {
                // Smoothly adjust container size
                scrollIndicator.style.width = `${Math.max(newWidth, 140)}px`; // Minimum width
                
                // Add subtle scale effect during resize
                scrollIndicator.style.transform = 'translateX(-50%) scale(1.02)';
                
                setTimeout(() => {
                    scrollIndicator.style.transform = 'translateX(-50%) scale(1)';
                }, 200);
            }
            
            // Fade message back in
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0) scale(1)';
            
        }, 150);
    }
    
    // Rotate messages every 2 seconds with smooth animation
    setInterval(() => {
        if (!hasScrolled) {
            currentMessage = (currentMessage + 1) % messages.length;
            updateMessageWithAnimation(messages[currentMessage]);
        }
    }, 2500); // Slightly longer interval for better readability
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100 && !hasScrolled) {
            hasScrolled = true;
            scrollIndicator.classList.add('hidden');
        } else if (scrollTop <= 100 && hasScrolled) {
            hasScrolled = false;
            scrollIndicator.classList.remove('hidden');
            // Reset to first message when scroll indicator reappears
            currentMessage = 0;
            updateMessageWithAnimation(messages[currentMessage]);
        }
        
        // Hide completely when reaching the navigation section
        const navigation = document.querySelector('.navigation');
        if (navigation) {
            const navOffset = navigation.offsetTop - window.innerHeight * 0.7;
            if (scrollTop >= navOffset) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Enhanced smooth scroll with easing and improved animation
    scrollIndicator.addEventListener('click', () => {
        const navigation = document.querySelector('.navigation');
        if (navigation) {
            navigation.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add enhanced bounce effect to clicked indicator
            scrollIndicator.style.transform = 'translateX(-50%) scale(1.15)';
            messageElement.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                scrollIndicator.style.transform = 'translateX(-50%) scale(1)';
                messageElement.style.transform = 'scale(1)';
            }, 150);
        }
    });
    
    // Initialize with first message and proper sizing
    setTimeout(() => {
        updateMessageWithAnimation(messages[0]);
    }, 500);
}

// Enhanced age modal with casual vibe
function initializeAgeModal() {
    const ageSummary = document.getElementById('ageSummary');
    const ageModal = document.getElementById('ageModal');
    const closeModal = document.getElementById('closeAgeModal');
    
    if (!ageModal || !closeModal || !ageSummary) return;
    
    // Make age summary clickable
    ageSummary.addEventListener('click', openAgeModal);
    closeModal.addEventListener('click', closeAgeModal);
    
    // Close when clicking outside
    ageModal.addEventListener('click', function(e) {
        if (e.target === ageModal) {
            closeAgeModal();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && ageModal.style.display === 'block') {
            closeAgeModal();
        }
    });
}

function openAgeModal() {
    const ageModal = document.getElementById('ageModal');
    const detailedAge = document.getElementById('detailedAge');
    
    // Calculate detailed age using UTC-3 timezone
    const now = getCurrentBrazilTime();
    const totalMs = now.getTime() - BIRTH_DATE.getTime();
    
    const years = Math.floor(totalMs / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor((totalMs % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
    const days = Math.floor((totalMs % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((totalMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((totalMs % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((totalMs % (60 * 1000)) / 1000);
    
    // Total calculations
    const totalDays = Math.floor(totalMs / (24 * 60 * 60 * 1000));
    const totalHours = Math.floor(totalMs / (60 * 60 * 1000));
    const totalMinutes = Math.floor(totalMs / (60 * 1000));
    const totalSeconds = Math.floor(totalMs / 1000);
    
    detailedAge.innerHTML = `
        <div class="age-item">
            <div class="age-number" id="yearsCounter">0</div>
            <div class="age-label">Anos</div>
        </div>
        <div class="age-item">
            <div class="age-number" id="monthsCounter">0</div>
            <div class="age-label">Meses</div>
        </div>
        <div class="age-item">
            <div class="age-number" id="daysCounter">0</div>
            <div class="age-label">Dias</div>
        </div>
        <div class="age-item">
            <div class="age-number" id="hoursCounter">0</div>
            <div class="age-label">Horas</div>
        </div>
        <div class="age-item">
            <div class="age-number" id="minutesCounter">0</div>
            <div class="age-label">Minutos</div>
        </div>
        <div class="age-item">
            <div class="age-number" id="secondsCounter">0</div>
            <div class="age-label">Segundos</div>
        </div>
        <div class="age-item">
            <div class="age-number" id="totalDaysCounter">0</div>
            <div class="age-label">Total de Dias</div>
        </div>
        <div class="age-item">
            <div class="age-number" id="totalHoursCounter">0</div>
            <div class="age-label">Total de Horas</div>
        </div>
    `;
    
    ageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animate counters with stagger
    setTimeout(() => {
        animateCounterTo('yearsCounter', years, 2000);
        setTimeout(() => animateCounterTo('monthsCounter', months, 1800), 500);
        setTimeout(() => animateCounterTo('daysCounter', days, 1800), 1000);
        setTimeout(() => animateCounterTo('hoursCounter', hours, 1600), 1500);
        setTimeout(() => animateCounterTo('minutesCounter', minutes, 1400), 2000);
        setTimeout(() => animateCounterTo('secondsCounter', seconds, 1200), 2500);
        setTimeout(() => animateCounterTo('totalDaysCounter', totalDays, 2000), 3000);
        setTimeout(() => animateCounterTo('totalHoursCounter', totalHours, 2000), 3500);
    }, 400);
    
    // Start real-time updates for seconds using UTC-3
    const updateInterval = setInterval(() => {
        if (ageModal.style.display !== 'block') {
            clearInterval(updateInterval);
            return;
        }
        
        const currentSeconds = document.getElementById('secondsCounter');
        if (currentSeconds) {
            const currentBrazilTime = getCurrentBrazilTime();
            const newSeconds = Math.floor((currentBrazilTime.getTime() - BIRTH_DATE.getTime()) / 1000) % 60;
            currentSeconds.textContent = newSeconds;
        }
    }, 1000);
}

function animateCounterTo(elementId, targetValue, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = Math.floor(start + (targetValue - start) * easeProgress);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = targetValue.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}

function closeAgeModal() {
    const ageModal = document.getElementById('ageModal');
    ageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Enhanced navigation interactions with page transitions
function initializeNavigation() {
    const navCards = document.querySelectorAll('.nav-card');
    
    navCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03) rotateX(5deg)';
            this.style.boxShadow = '0 20px 50px rgba(0,0,0,0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
        
        // Add enhanced click effect with page transition
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(218, 165, 32, 0.6) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleGrow 0.8s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            // Smooth page transition
            setTimeout(() => {
                document.body.style.opacity = '0';
                document.body.style.transform = 'scale(0.95)';
                document.body.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 250);
            }, 300);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 800);
        });
    });
}

// Add enhanced CSS animations
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    @keyframes rippleGrow {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes modalFadeIn {
        from { 
            opacity: 0;
            backdrop-filter: blur(0px);
        }
        to { 
            opacity: 1;
            backdrop-filter: blur(5px);
        }
    }
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: scale(0.8) translateY(-50px) rotateX(-10deg);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0) rotateX(0deg);
        }
    }
    
    /* Page transition preparation */
    body {
        transition: all 0.3s ease;
    }
    
    /* Smooth scrolling for the entire page */
    html {
        scroll-behavior: smooth;
    }
    
    /* Enhanced button animations */
    .age-details-btn {
        transform-origin: center;
        will-change: transform;
    }
    
    .nav-card {
        will-change: transform, box-shadow;
        backface-visibility: hidden;
        perspective: 1000px;
    }
`;
document.head.appendChild(enhancedStyle);
