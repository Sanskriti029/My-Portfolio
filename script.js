 // Theme Toggle Function
        function toggleTheme() {
            const body = document.body;
            const toggle = document.querySelector('.theme-toggle');
            const slider = document.querySelector('.theme-toggle-slider');
            
            body.classList.toggle('dark-mode');
            toggle.classList.toggle('dark');
            
            if (body.classList.contains('dark-mode')) {
                slider.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                slider.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        }

        // Load saved theme on page load
        window.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme');
            const toggle = document.querySelector('.theme-toggle');
            const slider = document.querySelector('.theme-toggle-slider');
            
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                toggle.classList.add('dark');
                slider.textContent = '☀️';
            }
        });

        function handleSubmit(event) {
            event.preventDefault();
            alert('Thank you for reaching out! I\'ll get back to you soon. 🚀');
            event.target.reset();
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card, .skill-card, .stat-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Cursor particle effect
        let lastParticleTime = 0;
        document.addEventListener('mousemove', (e) => {
            const currentTime = Date.now();
            if (currentTime - lastParticleTime > 50) {
                createParticle(e.clientX, e.clientY);
                lastParticleTime = currentTime;
            }
        });

        function createParticle(x, y) {
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1000);
        }

        // Animate progress bars when in view
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.progress-fill');
                    if (progressBar) {
                        progressBar.style.animation = 'fillBar 2s ease-out forwards';
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-card').forEach(card => {
            progressObserver.observe(card);
        });

        // Add parallax effect to floating shapes
        document.addEventListener('mousemove', (e) => {
            const shapes = document.querySelectorAll('.shape');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
