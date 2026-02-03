document.addEventListener('DOMContentLoaded', () => {
    // Digital Rain Effect
    createDigitalRain();

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 50);
                } else {
                    card.style.animation = 'fadeOutDown 0.3s ease forwards';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Hover effect on project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createCardParticles(card);
        });

        card.addEventListener('click', () => {
            // Simulate opening project (could be a modal or new page)
            const title = card.querySelector('.card-title').textContent;
            console.log(`Opening project: ${title}`);
            // Add your project opening logic here
        });
    });

    // Parallax effect on cards
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.project-card');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const distanceX = (e.clientX - cardCenterX) / 50;
            const distanceY = (e.clientY - cardCenterY) / 50;

            if (card.matches(':hover')) {
                card.style.transform = `
                    translateY(-10px) 
                    rotateY(${distanceX}deg) 
                    rotateX(${-distanceY}deg)
                `;
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    projectCards.forEach(card => observer.observe(card));
});

// Digital Rain Effect
function createDigitalRain() {
    const canvas = document.createElement('canvas');
    const container = document.querySelector('.digital-rain');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00f3ff';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(text, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Create particles on card hover
function createCardParticles(card) {
    const rect = card.getBoundingClientRect();
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + Math.random() * rect.width + 'px';
        particle.style.top = rect.top + Math.random() * rect.height + 'px';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.background = `var(--neon-${['cyan', 'pink', 'purple'][Math.floor(Math.random() * 3)]})`;
        particle.style.boxShadow = `0 0 8px var(--neon-cyan)`;
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

// Add fadeOutDown animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(30px);
        }
    }
`;
document.head.appendChild(style);

console.log(`
╔═══════════════════════════════════════╗
║   PROJETS PAGE LOADED                ║
║   FILTERS: ACTIVE                    ║
║   PARTICLES: ENABLED                 ║
╚═══════════════════════════════════════╝
`);