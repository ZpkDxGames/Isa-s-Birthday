// Wishes JavaScript for Isabella's Birthday Website

document.addEventListener('DOMContentLoaded', function() {
    initializeImageProtection();
    initializeWishes();
    animateWishCategories();
    initializeBirthdaySpecial();
    updateBirthdayCountdown();
    console.log('✨ Página de desejos de aniversário carregada com sucesso!');
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

function initializeWishes() {
    const wishCards = document.querySelectorAll('.wish-card');
    
    wishCards.forEach((card, index) => {
        // Set initial state - cards start hidden with proper transitions
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.95)';
        card.style.transition = 'all 0.6s ease';
        
        // Add hover interactions
        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('animate-in')) {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                addFloatingHearts(card);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('animate-in')) {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
        
        // Add click interaction for mobile
        card.addEventListener('click', () => {
            if (window.innerWidth <= 768 && card.classList.contains('animate-in')) {
                card.classList.toggle('mobile-active');
                addFloatingHearts(card);
            }
        });
    });
}

function animateWishCategories() {
    const categories = document.querySelectorAll('.wish-category');
    
    // Create intersection observer for each category
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const category = entry.target;
                const title = category.querySelector('.category-title');
                const cards = category.querySelectorAll('.wish-card');
                
                // Only animate if not already animated
                if (title && !title.classList.contains('animated')) {
                    categoryObserver.unobserve(category); // Only animate once
                    
                    // Animate title first
                    title.classList.add('animated');
                    
                    // Animate icon with bounce effect
                    const icon = title.querySelector('i');
                    const friendshipIcons = title.querySelector('.friendship-icons');
                    
                    if (friendshipIcons) {
                        // Special animation for friendship icons
                        setTimeout(() => {
                            const icons = friendshipIcons.querySelectorAll('i');
                            icons.forEach((icon, index) => {
                                setTimeout(() => {
                                    icon.style.animation = 'iconBounce 0.6s ease-out';
                                }, index * 100);
                            });
                        }, 200);
                    } else if (icon) {
                        setTimeout(() => {
                            icon.style.animation = 'iconBounce 0.6s ease-out';
                        }, 200);
                    }
                    
                    // Then animate cards in sequence after title animation
                    setTimeout(() => {
                        cards.forEach((card, cardIndex) => {
                            setTimeout(() => {
                                // Ensure transition is set before animating
                                card.style.transition = 'all 0.6s ease';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0) scale(1)';
                                card.classList.add('animate-in');
                                
                                // Add sparkle effect to card icon
                                const cardIcon = card.querySelector('.wish-icon');
                                if (cardIcon) {
                                    setTimeout(() => {
                                        addSparkleEffect(cardIcon);
                                    }, 200);
                                }
                            }, cardIndex * 200); // 200ms delay between cards in same category
                        });
                    }, 600); // Wait for title animation to complete
                }
            }
        });
    }, { 
        threshold: 0.2, // Lower threshold for better triggering
        rootMargin: '0px 0px -30px 0px'
    });
    
    // Observe all categories
    categories.forEach(category => {
        categoryObserver.observe(category);
    });
}

function addSparkleEffect(element) {
    const sparkles = ['✨', '🌟', '💫', '⭐'];
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = '1rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '10';
            
            // Random position around the icon
            const rect = element.getBoundingClientRect();
            sparkle.style.left = (rect.width * Math.random()) + 'px';
            sparkle.style.top = (rect.height * Math.random()) + 'px';
            sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, i * 300);
    }
}

function addFloatingHearts(card) {
    const hearts = ['💖', '💝', '💕', '💗'];
    
    for (let i = 0; i < 2; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.fontSize = '1.2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.animation = 'heartFloat 3s ease-out forwards';
            
            card.style.position = 'relative';
            card.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 200);
    }
}

function initializeBirthdaySpecial() {
    const birthdaySpecial = document.querySelector('.birthday-special');
    const statItems = document.querySelectorAll('.stat-item');
    
    if (birthdaySpecial) {
        // Create intersection observer with 60% visibility threshold
        const specialObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate container
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                    
                    // Animate stats with counting effect
                    setTimeout(() => {
                        animateStats();
                    }, 300);
                }
            });
        }, { 
            threshold: 0.6, // Changed to 60% visibility
            rootMargin: '0px 0px -10px 0px'
        });
        
        birthdaySpecial.style.opacity = '0';
        birthdaySpecial.style.transform = 'translateY(50px)';
        birthdaySpecial.style.transition = 'all 0.8s ease';
        specialObserver.observe(birthdaySpecial);
    }
}

function animateStats() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
            
            // Animate the number
            const number = item.querySelector('.stat-number');
            if (number && !number.classList.contains('counted')) {
                animateStatNumber(number);
                number.classList.add('counted');
            }
        }, index * 200);
    });
}

function animateStatNumber(element) {
    const elementId = element.id;
    
    // For the birthday countdown - it will be handled by updateBirthdayCountdown()
    if (elementId === 'daysUntilBirthday') {
        // The counting animation is handled in updateBirthdayCountdown
        return;
    }
    
    // Fallback for any other numbers (though we only have countdown now)
    const text = element.textContent;
    let currentNumber = 0;
    const targetNumber = parseInt(text) || 0;
    
    if (targetNumber > 0) {
        element.textContent = '0';
        
        const countInterval = setInterval(() => {
            currentNumber += Math.ceil(targetNumber / 20);
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(countInterval);
            }
            element.textContent = currentNumber.toString();
        }, 50);
    }
}

function updateBirthdayCountdown() {
    const countdownElement = document.getElementById('daysUntilBirthday');
    if (!countdownElement) return;
    
    function calculateDaysUntilBirthday() {
        const today = new Date();
        const currentYear = today.getFullYear();
        
        // Isabella's birthday: August 8th
        let nextBirthday = new Date(currentYear, 7, 8); // Month is 0-indexed, so 7 = August
        
        // If birthday has passed this year, calculate for next year
        if (today > nextBirthday) {
            nextBirthday = new Date(currentYear + 1, 7, 8);
        }
        
        // Calculate the difference in milliseconds
        const timeDiff = nextBirthday.getTime() - today.getTime();
        
        // Convert milliseconds to days
        const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        return daysUntil;
    }
    
    // Update the countdown
    const daysUntil = calculateDaysUntilBirthday();
    
    // Animate the number counting up to the actual days
    let currentNumber = 0;
    const increment = Math.max(1, Math.floor(daysUntil / 30)); // Smooth animation
    
    const countInterval = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= daysUntil) {
            currentNumber = daysUntil;
            clearInterval(countInterval);
        }
        countdownElement.textContent = currentNumber.toString();
    }, 50);
    
    // Update daily (check every hour for accuracy)
    setInterval(() => {
        const newDaysUntil = calculateDaysUntilBirthday();
        if (newDaysUntil !== daysUntil) {
            countdownElement.textContent = newDaysUntil.toString();
        }
    }, 3600000); // Check every hour
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
    .wish-card.animate-in {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
    }
    
    .wish-card.mobile-active {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    
    @keyframes iconBounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
        }
        40%, 43% {
            transform: translate3d(0, -10px, 0) scale(1.1);
        }
        70% {
            transform: translate3d(0, -5px, 0);
        }
        90% {
            transform: translate3d(0, -2px, 0);
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        50% {
            transform: translateY(-20px) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-40px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes heartFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add some interactive background elements
function createInteractiveBackground() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    // Create floating elements periodically
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance
            const element = document.createElement('div');
            element.textContent = ['🌻', '🌾', '✨'][Math.floor(Math.random() * 3)];
            element.style.position = 'fixed';
            element.style.left = Math.random() * window.innerWidth + 'px';
            element.style.top = window.innerHeight + 'px';
            element.style.fontSize = (Math.random() * 10 + 15) + 'px';
            element.style.pointerEvents = 'none';
            element.style.zIndex = '1';
            element.style.opacity = '0.4';
            element.style.animation = 'gentleFloatUp 8s linear forwards';
            
            document.body.appendChild(element);
            
            setTimeout(() => {
                element.remove();
            }, 8000);
        }
    }, 2000);
}

// Add more background animation
const backgroundStyle = document.createElement('style');
backgroundStyle.textContent = `
    @keyframes gentleFloatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.4;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(backgroundStyle);

// Initialize interactive background
createInteractiveBackground();
