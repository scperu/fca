// ============================================================
// MAIN.JS - FUNCIONALIDADES PRINCIPALES
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // 1. ANIMACIÓN DE CONTADORES (STATS)
    // ============================================================
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const increment = target / speed;
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            entry.target.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.textContent = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounters();

    // ============================================================
    // 2. ANIMACIÓN DE ELEMENTOS AL HACER SCROLL
    // ============================================================
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => observer.observe(element));
    }

    animateOnScroll();

    // ============================================================
    // 3. FORMULARIO DE SÚMATE (VALIDACIÓN)
    // ============================================================
    const form = document.getElementById('formSumate');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();

            // Validación básica
            if (!nombre || !email || !telefono) {
                formMessage.innerHTML = `
                    <div style="color: #C8102E; padding: 12px; background: #FFE5E5; border-radius: 8px;">
                        <i class="fas fa-exclamation-circle"></i> 
                        Por favor, completa todos los campos obligatorios.
                    </div>
                `;
                return;
            }

            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.innerHTML = `
                    <div style="color: #C8102E; padding: 12px; background: #FFE5E5; border-radius: 8px;">
                        <i class="fas fa-exclamation-circle"></i> 
                        Por favor, ingresa un correo electrónico válido.
                    </div>
                `;
                return;
            }

            // Validación de teléfono (solo números)
            const phoneRegex = /^\d{9}$/;
            if (!phoneRegex.test(telefono)) {
                formMessage.innerHTML = `
                    <div style="color: #C8102E; padding: 12px; background: #FFE5E5; border-radius: 8px;">
                        <i class="fas fa-exclamation-circle"></i> 
                        Por favor, ingresa un número telefónico válido (9 dígitos).
                    </div>
                `;
                return;
            }

            // Simulación de envío exitoso
            formMessage.innerHTML = `
                <div style="color: #28A745; padding: 12px; background: #E6F9E6; border-radius: 8px;">
                    <i class="fas fa-check-circle"></i> 
                    ¡Gracias por sumarte al cambio! Pronto recibirás más información.
                </div>
            `;

            // Resetear el formulario después de 3 segundos
            setTimeout(() => {
                form.reset();
            }, 3000);
        });
    }

    // ============================================================
    // 4. SMOOTH SCROLL PARA ENLACES INTERNOS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar si es un enlace vacío o solo "#"
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});