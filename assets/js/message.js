// Message JavaScript for Isabella's Birthday Website

document.addEventListener('DOMContentLoaded', function() {
    initializeImageProtection();
    initializeMessage();
    initializeBirthdayCake();
    animateMessageCards();
    console.log('💝 Página de mensagem pessoal carregada com sucesso!');
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

function initializeMessage() {
    // Animate letter paper entrance
    const letterPaper = document.querySelector('.letter-paper');
    if (letterPaper) {
        letterPaper.style.opacity = '0';
        letterPaper.style.transform = 'translateY(50px) scale(0.95)';
        
        setTimeout(() => {
            letterPaper.style.transition = 'all 1s ease';
            letterPaper.style.opacity = '1';
            letterPaper.style.transform = 'translateY(0) scale(1)';
        }, 300);
    }
    
    // Animate letter content with typewriter effect
    setTimeout(() => {
        animateLetterContent();
    }, 1200);
}

function animateLetterContent() {
    const paragraphs = document.querySelectorAll('.paragraph');
    const greeting = document.querySelector('.greeting');
    const closing = document.querySelector('.closing');
    const signature = document.querySelector('.signature');
    
    // Hide all text initially
    const allElements = [greeting, ...paragraphs, closing, signature].filter(el => el);
    allElements.forEach(element => {
        element.style.opacity = '1';
        element.textContent = '';
    });
    
    let currentDelay = 0;
    
    // Animate greeting first
    if (greeting) {
        const greetingText = "Amiga Isabella...";
        setTimeout(() => {
            animateTextReveal(greeting, greetingText, 0);
        }, currentDelay);
        currentDelay += greetingText.length * 30 + 500;
    }
    
    // Animar parágrafos sequencialmente
    const paragraphTexts = [
        "Eu sei que já passou seu aniversário, mas eu queria mesmo assim fazer algo especial... mesmo vindo até aqui comemorar com você, eu achei melhor fazer algo marcante para uma data tão especial...",
        "Não tenho palavras para expressar o quanto você significa para mim. Sua amizade é um presente que eu valorizo todos os dias, mesmo que não nos vejamos com tanta frequência... sei que você sente o mesmo, pois independente de quanto tempo passa, conversamos como se nos vessemos todo dia. Isso é o que realmente importa.",
        "Fico feliz em saber que sempre podemos contar um com o outro, nos momentos bons e ruins. Sou eternamente grato por tê-la na minha vida, e espero que sinta o mesmo, pois se alguém pensar em relar o dedo em você, ou machucá-la de qualquer outra forma, não precisa nem esperar que eu desapareço com essa pessoa.",
        "É isso... não sei bem o que dizer, mas acho que tudo isso foi suficiente para mostrar o quão me importo com você. Cada linha de código, cada foto, cada animaçãozinha que para alguns pareça bobagem, mas para mim foi algo planejado para melhor representar o que eu queria te transmitir... uma amizade verdadeira.",
        "Aquela que transcende as leis do tempo, e que sempre encontrará um jeito de se manter viva, não importa a distância ou o tempo que passe. Sempre estarei torcendo por você, Isabella.",
        "Você me enche de orgulho, por ser exatamente você mesma. Eu te amo, amiga Isabella! Aproveite o seu dia(mesmo que tenha sido ontem rs)."
    ];
    
    paragraphs.forEach((paragraph, index) => {
        if (paragraphTexts[index]) {
            setTimeout(() => {
                animateTextReveal(paragraph, paragraphTexts[index], 0);
            }, currentDelay);
            currentDelay += paragraphTexts[index].length * 30 + 800;
        }
    });
    
    // Animate closing
    if (closing) {
        const closingText = "";
        setTimeout(() => {
            animateTextReveal(closing, closingText, 0);
        }, currentDelay);
        currentDelay += closingText.length * 30 + 500;
    }
    
    // Animar assinatura
    if (signature) {
        const signatureText = "Com amor, e sim eu sei amar,\nTônio";
        setTimeout(() => {
            animateTextReveal(signature, signatureText, 0);
        }, currentDelay);
    }
}

function animateTextReveal(element, text, delay = 0) {
    element.textContent = '';
    element.style.opacity = '1';
    
    setTimeout(() => {
        let index = 0;
        const typeInterval = setInterval(() => {
            element.textContent = text.substring(0, index + 1);
            index++;
            
            if (index >= text.length) {
                clearInterval(typeInterval);
                // Add a subtle glow effect when finished
                element.style.textShadow = '0 0 10px rgba(218, 165, 32, 0.3)';
                setTimeout(() => {
                    element.style.textShadow = 'none';
                }, 1000);
            }
        }, 30); // Adjust speed here
    }, delay);
}

function animateMessageCards() {
    const messageCards = document.querySelectorAll('.message-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.3 });
    
    messageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        cardObserver.observe(card);
        
        // Add hover sound effect simulation
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeBirthdayCake() {
    const candles = document.querySelectorAll('.candle');
    const flames = document.querySelectorAll('.flame');
    const wishMessage = document.getElementById('wishMessage');
    let blownCandles = 0;
    
    candles.forEach((candle, index) => {
        candle.addEventListener('click', () => {
            const flame = candle.querySelector('.flame');
            
            if (!flame.classList.contains('blown-out')) {
                // Blow out candle
                flame.classList.add('blown-out');
                candle.classList.add('blown');
                blownCandles++;
                
                // Add smoke effect
                createSmokeEffect(candle);
                
                // Check if all candles are blown out
                if (blownCandles === candles.length) {
                    setTimeout(() => {
                        showWishMessage();
                        createCelebrationEffect();
                    }, 500);
                }
            }
        });
        
        // Add hover effect
        candle.addEventListener('mouseenter', () => {
            if (!candle.querySelector('.flame').classList.contains('blown-out')) {
                candle.style.transform = 'scale(1.1)';
            }
        });
        
        candle.addEventListener('mouseleave', () => {
            candle.style.transform = 'scale(1)';
        });
    });
    
    // Add cake animation on load
    const cake = document.querySelector('.cake');
    if (cake) {
        cake.style.transform = 'scale(0)';
        setTimeout(() => {
            cake.style.transition = 'transform 0.8s ease';
            cake.style.transform = 'scale(1)';
        }, 1000);
    }
}

function createSmokeEffect(candle) {
    const smoke = document.createElement('div');
    smoke.innerHTML = '💨';
    smoke.style.position = 'absolute';
    smoke.style.top = '-30px';
    smoke.style.left = '50%';
    smoke.style.transform = 'translateX(-50%)';
    smoke.style.fontSize = '1.2rem';
    smoke.style.opacity = '0.8';
    smoke.style.animation = 'smokeRise 2s ease-out forwards';
    smoke.style.pointerEvents = 'none';
    
    candle.style.position = 'relative';
    candle.appendChild(smoke);
    
    setTimeout(() => {
        smoke.remove();
    }, 2000);
}

function showWishMessage() {
    const wishMessage = document.getElementById('wishMessage');
    const instruction = document.querySelector('.cake-instruction');
    
    if (wishMessage) {
        wishMessage.style.display = 'block';
        wishMessage.style.opacity = '0';
        wishMessage.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            wishMessage.style.transition = 'all 0.5s ease';
            wishMessage.style.opacity = '1';
            wishMessage.style.transform = 'scale(1)';
        }, 100);
    }
    
    if (instruction) {
        instruction.style.opacity = '0.3';
        instruction.textContent = 'Perfect! Your wish has been made! 🌟';
    }
}

function createCelebrationEffect() {
    const celebrationEmojis = ['🎉', '🎊', '✨', '🌟', '💫', '🎈', '🥳'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = Math.random() * window.innerWidth + 'px';
            emoji.style.top = Math.random() * window.innerHeight + 'px';
            emoji.style.fontSize = (Math.random() * 20 + 25) + 'px';
            emoji.style.pointerEvents = 'none';
            emoji.style.zIndex = '1000';
            emoji.style.animation = 'celebration 3s ease-out forwards';
            
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                emoji.remove();
            }, 3000);
        }, i * 200);
    }
    
    // Add confetti burst
    createConfettiBurst();
}

function createConfettiBurst() {
    const colors = ['#FFD700', '#FF6347', '#98FB98', '#87CEEB', '#DDA0DD', '#F0E68C'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = '50%';
            confetti.style.top = '30%';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            const angle = (Math.random() * 360) * (Math.PI / 180);
            const velocity = Math.random() * 15 + 10;
            const gravity = 0.8;
            
            confetti.style.animation = `confettiFall 3s ease-out forwards`;
            confetti.style.transform = `translate(${Math.cos(angle) * velocity * 10}px, ${Math.sin(angle) * velocity * 10}px)`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes gentleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes smokeRise {
        0% {
            transform: translateX(-50%) translateY(0) scale(1);
            opacity: 0.8;
        }
        100% {
            transform: translateX(-50%) translateY(-50px) scale(1.5);
            opacity: 0;
        }
    }
    
    @keyframes celebration {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0.8) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add scroll-triggered animations for the birthday cake section
const cakeSection = document.querySelector('.birthday-cake-section');
if (cakeSection) {
    const cakeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.3 });
    
    cakeSection.style.opacity = '0';
    cakeSection.style.transform = 'translateY(50px)';
    cakeSection.style.transition = 'all 0.8s ease';
    cakeObserver.observe(cakeSection);
}
