document.addEventListener('DOMContentLoaded', () => {
    // Initialize Neural Network Canvas
    initNeuralNetwork();

    // Category filter functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const articleCards = document.querySelectorAll('.article-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Filter articles with animation
            articleCards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    setTimeout(() => {
                        card.style.display = 'flex';
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

    // Hover effects on article cards
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createArticleParticles(card);
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
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
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

    articleCards.forEach(card => observer.observe(card));

    // Animate resource cards on scroll
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});

// Neural Network Canvas Animation
function initNeuralNetwork() {
    const canvas = document.getElementById('neural-network');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Nodes
    const nodes = [];
    const nodeCount = 50;
    
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }

    function animate() {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw nodes
        nodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#00f3ff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f3ff';
            ctx.fill();

            // Connect nearby nodes
            nodes.forEach((otherNode, j) => {
                if (i !== j) {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distance / 150})`;
                        ctx.lineWidth = 0.5;
                        ctx.shadowBlur = 5;
                        ctx.stroke();
                    }
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Create particles on article hover
function createArticleParticles(card) {
    const rect = card.getBoundingClientRect();
    const particleCount = 10;

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
║   VEILLE PAGE LOADED                 ║
║   NEURAL NETWORK: ACTIVE             ║
║   FILTERS: ENABLED                   ║
╚═══════════════════════════════════════╝
`);