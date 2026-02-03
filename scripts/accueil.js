// Effet de typing pour le texte terminal
document.addEventListener('DOMContentLoaded', () => {
    // Animation de typing sur les textes terminal
    const terminalTexts = document.querySelectorAll('.terminal-text');
    terminalTexts.forEach((text, index) => {
        text.style.opacity = '0';
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.animation = `typing 1s steps(30) ${index * 0.3}s forwards`;
        }, index * 500);
    });

    // Effet de glitch aléatoire sur le titre
    const glitchTitle = document.querySelector('.glitch-title');
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchTitle.style.animation = 'glitch-shake 0.3s';
            setTimeout(() => {
                glitchTitle.style.animation = '';
            }, 300);
        }
    }, 2000);

    // Effet de curseur clignotant sur les prompts
    const prompts = document.querySelectorAll('.prompt');
    prompts.forEach(prompt => {
        setInterval(() => {
            prompt.style.opacity = prompt.style.opacity === '0' ? '1' : '0';
        }, 530);
    });

    // Parallax effect sur la grille
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const gridBg = document.querySelector('.grid-background');
        if (gridBg) {
            gridBg.style.transform = `
                perspective(500px) 
                rotateX(${60 + mouseY * 5}deg) 
                rotateY(${mouseX * 5}deg)
                translateY(${mouseY * 20}px)
            `;
        }
    });

    // Effet de particules sur les boutons
    const buttons = document.querySelectorAll('.cyber-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            createParticles(button);
        });
    });

    function createParticles(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = rect.left + Math.random() * rect.width + 'px';
            particle.style.top = rect.top + Math.random() * rect.height + 'px';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = 'var(--neon-cyan)';
            particle.style.boxShadow = '0 0 5px var(--neon-cyan)';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            document.body.appendChild(particle);

            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 3;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            let x = parseFloat(particle.style.left);
            let y = parseFloat(particle.style.top);
            let opacity = 1;

            const animate = () => {
                x += vx;
                y += vy;
                opacity -= 0.02;

                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.opacity = opacity;

                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };

            animate();
        }
    }

    // Effet de scan sur les feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // Ajout de l'animation CSS pour slideInUp
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes glitch-shake {
            0%, 100% { transform: translate(0); }
            25% { transform: translate(-5px, 5px); }
            50% { transform: translate(5px, -5px); }
            75% { transform: translate(-5px, -5px); }
        }
    `;
    document.head.appendChild(style);

    // Console ASCII Art
    console.log(`
    ╔═══════════════════════════════════════╗
    ║   CYBERPUNK PORTFOLIO INITIALIZED    ║
    ║   STATUS: ONLINE                     ║
    ║   SYSTEM: OPERATIONAL                ║
    ╚═══════════════════════════════════════╝
    `);
});