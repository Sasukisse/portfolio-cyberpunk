document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle field
    createParticleField();

    // Form handling
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitButton = form.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.style.opacity = '0.6';
        
        // Simulate loading
        setTimeout(() => {
            // Success
            formStatus.className = 'form-status success';
            formStatus.textContent = '✓ MESSAGE ENVOYÉ AVEC SUCCÈS!';
            
            // Reset form
            form.reset();
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            
            // Hide status after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
            
            // Trigger celebration particles
            createCelebrationParticles();
        }, 2000);
    });

    // Form input animations
    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            createInputParticles(input);
        });

        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                input.style.borderColor = 'var(--neon-cyan)';
            } else {
                input.style.borderColor = 'rgba(0, 243, 255, 0.3)';
            }
        });
    });

    // Social links hover effect
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            createSocialParticles(link);
        });
    });

    // Info cards animation
    const infoCards = document.querySelectorAll('.info-card, .social-card, .status-card');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    infoCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // Glitch effect on title
    const glitchText = document.querySelector('.glitch-text');
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchText.style.animation = 'none';
            setTimeout(() => {
                glitchText.style.animation = '';
            }, 50);
        }
    }, 2000);
});

// Create particle field background
function createParticleField() {
    const container = document.querySelector('.particle-field');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `var(--neon-${['cyan', 'pink', 'purple'][Math.floor(Math.random() * 3)]})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
        particle.style.animation = `float ${5 + Math.random() * 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);
    }

    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
            }
            33% {
                transform: translate(30px, -30px);
            }
            66% {
                transform: translate(-30px, 30px);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Create particles on input focus
function createInputParticles(input) {
    const rect = input.getBoundingClientRect();
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + Math.random() * rect.width + 'px';
        particle.style.top = rect.top + 'px';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.background = 'var(--neon-cyan)';
        particle.style.boxShadow = '0 0 10px var(--neon-cyan)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        document.body.appendChild(particle);

        let y = parseFloat(particle.style.top);
        let opacity = 1;

        const animate = () => {
            y -= 2;
            opacity -= 0.02;

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

// Create particles on social link hover
function createSocialParticles(link) {
    const rect = link.getBoundingClientRect();
    const particleCount = 10;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + Math.random() * rect.width + 'px';
        particle.style.top = rect.top + Math.random() * rect.height + 'px';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = `var(--neon-${['cyan', 'pink', 'purple'][Math.floor(Math.random() * 3)]})`;
        particle.style.boxShadow = '0 0 8px currentColor';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 1 + Math.random() * 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        let opacity = 1;

        const animate = () => {
            x += vx;
            y += vy;
            opacity -= 0.015;

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

// Create celebration particles on form submission
function createCelebrationParticles() {
    const form = document.getElementById('contactForm');
    const rect = form.getBoundingClientRect();
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.background = `var(--neon-${['cyan', 'pink', 'purple', 'green'][Math.floor(Math.random() * 4)]})`;
        particle.style.boxShadow = '0 0 15px currentColor';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 3 + Math.random() * 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        let opacity = 1;

        const animate = () => {
            x += vx;
            y += vy;
            opacity -= 0.01;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${opacity})`;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        animate();
    }
}

console.log(`
╔═══════════════════════════════════════╗
║   CONTACT PAGE LOADED                ║
║   FORM: READY                        ║
║   PARTICLES: ACTIVE                  ║
╚═══════════════════════════════════════╝
`);