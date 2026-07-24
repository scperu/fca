// ============================================================
// MAIN.JS - Funcionalidades principales
// ============================================================

// ============================================================
// 1. SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        });

        animateElements.forEach(el => observer.observe(el));
    } else {
        // Fallback para navegadores antiguos
        animateElements.forEach(el => el.classList.add('visible'));
    }
}

// ============================================================
// 2. COUNTERS
// ============================================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 50;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            entry.target.textContent = target;
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = Math.floor(current);
                        }
                    }, 25);
                    
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(counter => counterObserver.observe(counter));
    } else {
        // Fallback: mostrar todos los números sin animación
        counters.forEach(counter => {
            counter.textContent = counter.getAttribute('data-target');
        });
    }
}

// ============================================================
// 3. FORMULARIO
// ============================================================
function initForm() {
    const form = document.getElementById('formSumate');
    const message = document.getElementById('formMessage');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validación básica
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const telefono = document.getElementById('telefono');

        if (!nombre.value.trim() || !email.value.trim() || !telefono.value.trim()) {
            showMessage('⚠️ Por favor, completa todos los campos requeridos.', '#FF6B35');
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showMessage('⚠️ Por favor, ingresa un correo electrónico válido.', '#FF6B35');
            return;
        }

        // Simular envío exitoso
        showMessage('✅ ¡Gracias por sumarte! Pronto recibirás más información.', '#C8102E');
        
        form.reset();

        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
            message.textContent = '';
        }, 5000);
    });
}

function showMessage(text, color) {
    const message = document.getElementById('formMessage');
    if (message) {
        message.style.color = color;
        message.textContent = text;
    }
}

// ============================================================
// 4. SMOOTH SCROLL
// ============================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar enlaces vacíos o externos
            if (href === '#' || href === '' || href.startsWith('http')) return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================================
// 5. INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initScrollAnimations();
    initCounters();
    initForm();
    initSmoothScroll();
    
    console.log('✅ FCA Campaign - Inicializado correctamente');
});