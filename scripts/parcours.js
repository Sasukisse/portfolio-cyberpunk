document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for timeline items
    const timelineCards = document.querySelectorAll('.timeline-card');
    
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

    timelineCards.forEach(card => observer.observe(card));

    // Animate skill bars when visible
    const skillBars = document.querySelectorAll('.progress-fill');
    const skillsSection = document.querySelector('.skills-section');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    }, index * 100);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Parallax effect on timeline markers
    document.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const markers = document.querySelectorAll('.timeline-marker');
        
        markers.forEach((marker, index) => {
            const speed = 0.2;
            const yPos = -(scrolled * speed);
            marker.style.transform = `translateY(${yPos * (index % 2 === 0 ? 1 : -1)}px)`;
        });
    });

    // Hover effect on timeline cards
    const cards = document.querySelectorAll('.timeline-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createTimelineParticles(card);
        });

        // 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Glitch effect on page title
    const glitchText = document.querySelector('.glitch-text');
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchText.style.animation = 'none';
            setTimeout(() => {
                glitchText.style.animation = '';
            }, 50);
        }
    }, 2000);

    // Add floating particles to timeline line
    createTimelineLineParticles();
});

// Create particles on card hover
function createTimelineParticles(card) {
    const rect = card.getBoundingClientRect();
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + Math.random() * rect.width + 'px';
        particle.style.top = rect.top + Math.random() * rect.height + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = `var(--neon-${['cyan', 'pink', 'purple'][Math.floor(Math.random() * 3)]})`;
        particle.style.boxShadow = `0 0 10px var(--neon-cyan)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 1.5 + Math.random() * 2;
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

// Create floating particles along timeline line
function createTimelineLineParticles() {
    const timelineLine = document.querySelector('.timeline-line');
    if (!timelineLine) return;

    setInterval(() => {
        const rect = timelineLine.getBoundingClientRect();
        const particle = document.createElement('div');
        
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = 'var(--neon-cyan)';
        particle.style.boxShadow = '0 0 15px var(--neon-cyan)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '5';
        document.body.appendChild(particle);

        let y = parseFloat(particle.style.top);
        let opacity = 1;

        const animate = () => {
            y += 3;
            opacity -= 0.01;

            particle.style.top = y + 'px';
            particle.style.opacity = opacity;

            if (opacity > 0 && y < window.innerHeight) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        animate();
    }, 500);
}

// Console ASCII Art
console.log(`
╔═══════════════════════════════════════╗
║   PARCOURS PAGE LOADED               ║
║   TIMELINE: ACTIVE                   ║
║   ANIMATIONS: ENABLED                ║
╚═══════════════════════════════════════╝
`);