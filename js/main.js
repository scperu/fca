// ============================================================
// INYECTOR DE COMPONENTES GLOBALES - VERSIÓN GITHUB PAGES
// ============================================================

// Función para cargar header y footer
function loadComponents() {
    // Cargar HEADER usando XMLHttpRequest (más compatible)
    var xhrHeader = new XMLHttpRequest();
    xhrHeader.open('GET', 'components/header.html', true);
    xhrHeader.onreadystatechange = function() {
        if (xhrHeader.readyState === 4) {
            if (xhrHeader.status === 200 || xhrHeader.status === 0) {
                document.body.insertAdjacentHTML('afterbegin', xhrHeader.responseText);
                initHeader();
            } else {
                console.error('Error cargando header:', xhrHeader.status);
                mostrarHeaderRespaldo();
            }
        }
    };
    xhrHeader.send();

    // Cargar FOOTER usando XMLHttpRequest
    var xhrFooter = new XMLHttpRequest();
    xhrFooter.open('GET', 'components/footer.html', true);
    xhrFooter.onreadystatechange = function() {
        if (xhrFooter.readyState === 4) {
            if (xhrFooter.status === 200 || xhrFooter.status === 0) {
                document.body.insertAdjacentHTML('beforeend', xhrFooter.responseText);
            } else {
                console.error('Error cargando footer:', xhrFooter.status);
                mostrarFooterRespaldo();
            }
        }
    };
    xhrFooter.send();
}

// ============================================================
// HEADER DE RESPALDO (si no carga)
// ============================================================
function mostrarHeaderRespaldo() {
    var headerHTML = `
    <header class="header" id="header">
        <div class="container header__inner">
            <div class="header__brand">
                <img src="img/fca_simbolo.jpeg" alt="Acción Popular" />
                <span class="header__brand-text">
                    Fernando Clemente <span>Arana</span>
                </span>
            </div>
            <nav class="header__nav">
                <ul class="header__menu" id="mainMenu">
                    <li><a href="index.html" id="nav-inicio">Inicio</a></li>
                    <li><a href="conoceme.html" id="nav-conoceme">Conóceme</a></li>
                    <li><a href="propuestas.html" id="nav-propuestas">Propuestas</a></li>
                    <li><a href="huancavelica.html" id="nav-huancavelica">Huancavelica</a></li>
                    <li><a href="noticias.html" id="nav-noticias">Noticias</a></li>
                    <li><a href="sumate.html" class="btn-sumate" id="nav-sumate"><i class="fas fa-handshake"></i> Súmate</a></li>
                </ul>
            </nav>
            <button class="header__hamburger" id="hamburger" aria-label="Menú">
                <span></span><span></span><span></span>
            </button>
        </div>
    </header>`;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    initHeader();
}

// ============================================================
// FOOTER DE RESPALDO (si no carga)
// ============================================================
function mostrarFooterRespaldo() {
    var footerHTML = `
    <footer class="footer">
        <div class="container footer__inner">
            <div class="footer__col">
                <img src="img/fca_simbolo.jpeg" alt="Acción Popular" class="footer__logo" />
                <p class="footer__slogan">Por el desarrollo de Huancavelica</p>
            </div>
            <div class="footer__col">
                <h4>Enlaces</h4>
                <ul>
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="conoceme.html">Conóceme</a></li>
                    <li><a href="propuestas.html">Propuestas</a></li>
                    <li><a href="huancavelica.html">Huancavelica</a></li>
                    <li><a href="noticias.html">Noticias</a></li>
                    <li><a href="sumate.html">Súmate</a></li>
                </ul>
            </div>
            <div class="footer__col">
                <h4>Redes Sociales</h4>
                <div class="footer__social">
                    <a href="https://facebook.com/fclementearana" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://twitter.com/fclementearana" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a href="https://youtube.com/@fclementearana" target="_blank"><i class="fab fa-youtube"></i></a>
                    <a href="https://tiktok.com/@fclementearana" target="_blank"><i class="fab fa-tiktok"></i></a>
                    <a href="https://instagram.com/fclementearana" target="_blank"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
            <div class="footer__col">
                <h4>Contacto</h4>
                <p style="color: rgba(255,255,255,0.4); font-size: 0.9rem; font-weight: 300;">
                    <i class="fas fa-envelope" style="margin-right: 8px;"></i> fclementearana@gmail.com
                </p>
                <a href="sumate.html" class="btn btn-footer">ÚNETE AQUÍ</a>
            </div>
        </div>
        <div class="footer__bottom">
            <div class="container">
                <p>© 2026 Fernando Clemente Arana - Acción Popular. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>`;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// ============================================================
// INICIALIZAR HEADER
// ============================================================
function initHeader() {
    // Detectar página actual
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = {
        'index.html': 'nav-inicio',
        'conoceme.html': 'nav-conoceme',
        'propuestas.html': 'nav-propuestas',
        'huancavelica.html': 'nav-huancavelica',
        'noticias.html': 'nav-noticias',
        'sumate.html': 'nav-sumate'
    };

    var activeId = navLinks[currentPage];
    if (activeId) {
        var activeLink = document.getElementById(activeId);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // HEADER SCROLL
    var header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // HAMBURGUESA
    var hamburger = document.getElementById('hamburger');
    var mainMenu = document.getElementById('mainMenu');

    if (hamburger && mainMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mainMenu.classList.toggle('open');
        });

        document.querySelectorAll('.header__menu a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mainMenu.classList.remove('open');
            });
        });
    }
}

// ============================================================
// SCROLL ANIMATION
// ============================================================
function initScrollAnimations() {
    var animateElements = document.querySelectorAll('.animate-on-scroll');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    animateElements.forEach(function(el) { observer.observe(el); });
}

// ============================================================
// COUNTER ANIMATION
// ============================================================
function initCounters() {
    var counters = document.querySelectorAll('.counter');
    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var target = parseInt(entry.target.getAttribute('data-target'));
                var current = 0;
                var increment = target / 50;
                var timer = setInterval(function() {
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
    counters.forEach(function(counter) { counterObserver.observe(counter); });
}

// ============================================================
// FORMULARIO
// ============================================================
function initForm() {
    var form = document.getElementById('formSumate');
    var message = document.getElementById('formMessage');
    if (form && message) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            message.style.color = '#C8102E';
            message.textContent = '✅ ¡Gracias por sumarte! Pronto recibirás más información.';
            form.reset();
            setTimeout(function() { message.textContent = ''; }, 5000);
        });
    }

    var formCompleto = document.getElementById('formSumateCompleto');
    var messageCompleto = document.getElementById('formMessageCompleto');
    if (formCompleto && messageCompleto) {
        formCompleto.addEventListener('submit', function(e) {
            e.preventDefault();
            messageCompleto.style.color = '#C8102E';
            messageCompleto.textContent = '✅ ¡Gracias por registrarte! Pronto recibirás más información.';
            formCompleto.reset();
            setTimeout(function() { messageCompleto.textContent = ''; }, 5000);
        });
    }
}

// ============================================================
// SMOOTH SCROLL
// ============================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================================
// INICIAR TODO
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
    setTimeout(function() {
        initScrollAnimations();
        initCounters();
        initForm();
        initSmoothScroll();
        document.querySelectorAll('.filtros__btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filtros__btn').forEach(function(b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }, 500);
});