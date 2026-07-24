// ============================================================
// HEADER SCROLL
// ============================================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', function () {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ============================================================
// HAMBURGUESA
// ============================================================
const hamburger = document.getElementById('hamburger');
const mainMenu = document.getElementById('mainMenu');

if (hamburger && mainMenu) {
    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        mainMenu.classList.toggle('open');
    });

    document.querySelectorAll('.header__menu a').forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mainMenu.classList.remove('open');
        });
    });
}

// ============================================================
// SCROLL ANIMATION
// ============================================================
const animateElements = document.querySelectorAll('.animate-on-scroll');

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

// ============================================================
// COUNTER ANIMATION
// ============================================================
const counters = document.querySelectorAll('.counter');

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

// ============================================================
// FORMULARIO
// ============================================================
const form = document.getElementById('formSumate');
const message = document.getElementById('formMessage');

if (form && message) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        message.style.color = '#C8102E';
        message.textContent = '✅ ¡Gracias por sumarte! Pronto recibirás más información.';

        form.reset();

        setTimeout(() => {
            message.textContent = '';
        }, 5000);
    });
}

// ============================================================
// SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});