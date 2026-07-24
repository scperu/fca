// ============================================================
// WEB COMPONENTS - FCA CAMPAIGN
// ============================================================

// ============================================================
// 1. HEADER COMPONENT
// ============================================================
class FcaHeader extends HTMLElement {
    constructor() {
        super();
        // Usamos Shadow DOM para encapsulamiento
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.initHeaderBehavior();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilos encapsulados para el header */
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    padding: 16px 0;
                    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    background: transparent;
                }

                :host(.scrolled) {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(24px) saturate(180%);
                    -webkit-backdrop-filter: blur(24px) saturate(180%);
                    padding: 10px 0;
                    box-shadow: 0 1px 40px rgba(0, 0, 0, 0.04);
                }

                .header__inner {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                .header__brand {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                .header__brand img {
                    width: 36px;
                    height: 36px;
                    object-fit: contain;
                    display: block;
                }

                .header__brand-text {
                    font-family: 'Playfair Display', serif;
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: #FFFFFF;
                    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    letter-spacing: 0.3px;
                    line-height: 1.2;
                }

                .header__brand-text span {
                    color: #C8102E;
                }

                :host(.scrolled) .header__brand-text {
                    color: #1A1A1A;
                }

                .header__menu {
                    display: flex;
                    align-items: center;
                    gap: 36px;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .header__menu a {
                    color: rgba(255, 255, 255, 0.7);
                    font-weight: 500;
                    font-size: 0.85rem;
                    text-decoration: none;
                    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    position: relative;
                    letter-spacing: 0.3px;
                }

                :host(.scrolled) .header__menu a {
                    color: #6C757D;
                }

                .header__menu a::after {
                    content: '';
                    position: absolute;
                    bottom: -6px;
                    left: 0;
                    width: 0;
                    height: 1.5px;
                    background: #C8102E;
                    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    opacity: 0.6;
                }

                .header__menu a:hover,
                .header__menu a.active {
                    color: #FFFFFF;
                }

                :host(.scrolled) .header__menu a:hover,
                :host(.scrolled) .header__menu a.active {
                    color: #1A1A1A;
                }

                .header__menu a:hover::after,
                .header__menu a.active::after {
                    width: 100%;
                }

                .btn-sumate {
                    padding: 10px 28px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    background: #C8102E;
                    color: #FFFFFF !important;
                    border: none;
                    border-radius: 50px;
                    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 4px 16px rgba(200, 16, 46, 0.2);
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    text-decoration: none;
                }

                .btn-sumate:hover {
                    transform: translateY(-2px) scale(1.03);
                    box-shadow: 0 8px 30px rgba(200, 16, 46, 0.3);
                    background: #8B0000 !important;
                    color: #FFFFFF !important;
                }

                .header__hamburger {
                    display: none;
                    flex-direction: column;
                    gap: 5px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 4px;
                }

                .header__hamburger span {
                    display: block;
                    width: 26px;
                    height: 1.5px;
                    background: #FFFFFF;
                    border-radius: 2px;
                    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                :host(.scrolled) .header__hamburger span {
                    background: #1A1A1A;
                }

                .header__hamburger.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }

                .header__hamburger.active span:nth-child(2) {
                    opacity: 0;
                    transform: scaleX(0);
                }

                .header__hamburger.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(5px, -5px);
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .header__brand img {
                        width: 30px;
                        height: 30px;
                    }
                    .header__brand-text {
                        font-size: 0.95rem;
                    }
                    
                    .header__menu {
                        display: none;
                        flex-direction: column;
                        width: 100%;
                        padding: 28px 24px;
                        background: rgba(255, 255, 255, 0.98);
                        backdrop-filter: blur(20px);
                        position: absolute;
                        top: 100%;
                        left: 0;
                        gap: 18px;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
                        border-top: 1px solid #E9ECEF;
                    }

                    .header__menu.open {
                        display: flex;
                    }

                    .header__menu a {
                        color: #1A1A1A !important;
                    }

                    .header__menu a::after {
                        background: #C8102E !important;
                    }

                    .header__hamburger {
                        display: flex;
                    }
                }

                @media (max-width: 480px) {
                    .header__brand img {
                        width: 26px;
                        height: 26px;
                    }
                    .header__brand-text {
                        font-size: 0.85rem;
                    }
                }
            </style>

            <div class="header__inner">
                <div class="header__brand">
                    <img src="assets/images/fca_simbolo.jpeg" alt="Acción Popular" />
                    <span class="header__brand-text">
                        Fernando Clemente <span>Arana</span>
                    </span>
                </div>

                <nav class="header__nav">
                    <ul class="header__menu" id="mainMenu">
                        <li><a href="/" class="active">Inicio</a></li>
                        <li><a href="#conoceme">Conóceme</a></li>
                        <li><a href="#pilares">Propuestas</a></li>
                        <li><a href="#huancavelica">Huancavelica</a></li>
                        <li><a href="#noticias">Noticias</a></li>
                        <li>
                            <a href="#sumate" class="btn-sumate">
                                <i class="fas fa-handshake"></i> Súmate
                            </a>
                        </li>
                    </ul>
                </nav>

                <button class="header__hamburger" id="hamburger" aria-label="Menú">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        `;
    }

    initHeaderBehavior() {
        const host = this;
        const hamburger = this.shadowRoot.getElementById('hamburger');
        const mainMenu = this.shadowRoot.getElementById('mainMenu');

        // Scroll behavior
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                host.classList.add('scrolled');
            } else {
                host.classList.remove('scrolled');
            }
        }, { passive: true });

        // Hamburger menu
        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mainMenu?.classList.toggle('open');
        });

        // Cerrar menú al hacer clic en un enlace
        this.shadowRoot.querySelectorAll('.header__menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger?.classList.remove('active');
                mainMenu?.classList.remove('open');
            });
        });
    }
}
customElements.define('fca-header', FcaHeader);

// ============================================================
// 2. HERO COMPONENT
// ============================================================
class FcaHero extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="hero" id="inicio">
                <div class="container hero__inner">
                    <div class="hero__content">
                        <div class="hero__badge">
                            <img src="assets/images/fca_simbolo.jpeg" alt="Acción Popular" />
                            Acción Popular
                        </div>
                        <h1 class="hero__title">
                            Fernando Clemente<br />
                            <span>Arana</span>
                        </h1>
                        <p class="hero__subtitle">
                            Comprometido con el desarrollo y bienestar de Huancavelica.
                        </p>
                        <div class="hero__location">
                            <i class="fas fa-map-marker-alt"></i>
                            Candidato a la Provincia de Huancavelica
                        </div>
                        <div class="hero__buttons">
                            <a href="#sumate" class="btn btn-white">
                                <i class="fas fa-handshake"></i> Súmate
                            </a>
                            <a href="conoceme.html" class="btn btn-ghost">
                                <i class="fas fa-play-circle"></i> Conóceme
                            </a>
                        </div>
                    </div>
                    <div class="hero__image">
                        <div class="hero__image-wrapper">
                            <img src="assets/images/fca.jpeg" alt="Fernando Clemente Arana" loading="lazy" />
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}
customElements.define('fca-hero', FcaHero);

// ============================================================
// 3. STATS COMPONENT
// ============================================================
class FcaStats extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="stats">
                <div class="container">
                    <div class="stats__grid">
                        <div class="stats__item animate-on-scroll">
                            <div class="stats__number"><span class="counter" data-target="5">0</span>K+</div>
                            <div class="stats__label">Voluntarios Activos</div>
                        </div>
                        <div class="stats__item animate-on-scroll delay-1">
                            <div class="stats__number"><span class="counter" data-target="12">0</span></div>
                            <div class="stats__label">Distritos Recorridos</div>
                        </div>
                        <div class="stats__item animate-on-scroll delay-2">
                            <div class="stats__number"><span class="counter" data-target="50">0</span>+</div>
                            <div class="stats__label">Propuestas Presentadas</div>
                        </div>
                        <div class="stats__item animate-on-scroll delay-3">
                            <div class="stats__number"><span class="counter" data-target="10">0</span>+</div>
                            <div class="stats__label">Años de Experiencia</div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}
customElements.define('fca-stats', FcaStats);

// ============================================================
// 4. PILARES COMPONENT
// ============================================================
class FcaPilares extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="pilares" id="pilares">
                <div class="container">
                    <div class="text-center animate-on-scroll">
                        <span class="section-tag">Nuestros Pilares</span>
                        <h2 class="section-title">Ejes de <span>Transformación</span></h2>
                        <p class="section-subtitle mx-auto">Cuatro pilares fundamentales para el desarrollo de Huancavelica</p>
                    </div>
                    <div class="pilares__grid">
                        <div class="pilares__item animate-on-scroll">
                            <div class="pilares__icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h3>Seguridad Ciudadana</h3>
                            <p>Plan integral para recuperar la tranquilidad de las familias huancavelicanas.</p>
                        </div>
                        <div class="pilares__item animate-on-scroll delay-1">
                            <div class="pilares__icon">
                                <i class="fas fa-heartbeat"></i>
                            </div>
                            <h3>Salud y Educación</h3>
                            <p>Hospitales modernos y educación de calidad para todos los distritos.</p>
                        </div>
                        <div class="pilares__item animate-on-scroll delay-2">
                            <div class="pilares__icon">
                                <i class="fas fa-road"></i>
                            </div>
                            <h3>Infraestructura</h3>
                            <p>Obras que conectan Huancavelica y generan desarrollo regional.</p>
                        </div>
                        <div class="pilares__item animate-on-scroll delay-3">
                            <div class="pilares__icon">
                                <i class="fas fa-gavel"></i>
                            </div>
                            <h3>Lucha Anticorrupción</h3>
                            <p>Gobierno transparente con cero tolerancia a la corrupción.</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}
customElements.define('fca-pilares', FcaPilares);

// ============================================================
// 5. CONÓCEME COMPONENT (ACTUALIZADO CON BIOGRAFÍA REAL)
// ============================================================
class FcaConoceme extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="conoceme" id="conoceme" style="padding: 80px 0; background: #fff;">
                <div class="container">

                    <!-- Encabezado -->
                    <div style="text-align: center; max-width: 750px; margin: 0 auto 45px;">
                        <span style="display: inline-block; background: #C8102E; color: #fff; padding: 5px 20px; border-radius: 30px; font-size: 0.75rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 14px;">Conóceme</span>
                        <h2 class="section-title" style="margin-bottom: 10px; font-size: 2.4rem;">Fernando <span>Clemente Arana</span></h2>
                        <p style="color: #C8102E; font-weight: 600; font-size: 1rem; margin-bottom: 10px;">
                            <i class="fas fa-hand-peace" style="margin-right: 8px;"></i>
                            Candidato a la Alcaldía Provincial de Huancavelica · Acción Popular
                        </p>
                        <p style="color: #6C757D; font-size: 1rem; line-height: 1.7; font-style: italic;">
                            "Hijo de auténticos huancavelicanos, formado en nuestras instituciones educativas, 
                            Contador Público Colegiado y miembro del Consejo Directivo del Colegio de Contadores de Huancavelica."
                        </p>
                    </div>

                    <!-- Grid: Foto + Texto -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 1100px; margin: 0 auto; align-items: center;">

                        <!-- Foto -->
                        <div style="position: relative;">
                            <div style="border-radius: 16px; overflow: hidden; box-shadow: 0 15px 45px rgba(0,0,0,0.12);">
                                <img 
                                    src="assets/images/fca_simbolo.jpeg" 
                                    alt="Fernando Clemente Arana" 
                                    style="width: 100%; height: auto; display: block;"
                                />
                            </div>
                            <div style="position: absolute; bottom: -12px; right: -12px; background: #C8102E; color: #fff; width: 65px; height: 65px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 900; box-shadow: 0 8px 25px rgba(200, 16, 46, 0.4); border: 3px solid #fff;">
                                AP
                            </div>
                            <div style="position: absolute; top: -8px; left: -8px; background: #1A1A2E; color: #fff; padding: 5px 14px; border-radius: 20px; font-size: 0.65rem; font-weight: 600; border: 2px solid #fff;">
                                <i class="fas fa-certificate" style="margin-right: 4px;"></i>
                                Contador Público Colegiado
                            </div>
                        </div>

                        <!-- Texto con biografía real -->
                        <div>
                            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #1A1A2E; margin-bottom: 14px;">
                                <i class="fas fa-quote-left" style="color: #C8102E; font-size: 1.2rem; margin-right: 8px;"></i>
                                Un verdadero huancavelicano
                            </h3>

                            <p style="color: #495057; line-height: 1.8; margin-bottom: 12px; font-size: 0.98rem;">
                                <strong>Fernando Clemente Arana</strong> es <strong>hijo de auténticos huancavelicanos</strong>. 
                                Estudió en la <strong>I.E. N.° 36011</strong> (San Cristóbal), el 
                                <strong>Colegio Ramón Castilla Marquesado</strong> (ex Comercio N.° 76), 
                                y es <strong>Contador Público</strong> egresado del Instituto Superior Tecnológico Público 
                                y de la Primera Casa Superior de Estudios de Huancavelica.
                            </p>

                            <p style="color: #495057; line-height: 1.8; margin-bottom: 18px; font-size: 0.98rem;">
                                Actualmente es <strong>miembro del Consejo Directivo del Colegio de Contadores Públicos de Huancavelica</strong>, 
                                con amplia experiencia en gestión pública y privada.
                            </p>

                            <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
                                <span style="background: #F8F9FA; padding: 4px 14px; border-radius: 20px; font-size: 0.8rem; color: #1A1A2E; border: 1px solid #E9ECEF;">
                                    <i class="fas fa-check-circle" style="color: #C8102E; margin-right: 4px;"></i>
                                    Contador Público Certificado
                                </span>
                                <span style="background: #F8F9FA; padding: 4px 14px; border-radius: 20px; font-size: 0.8rem; color: #1A1A2E; border: 1px solid #E9ECEF;">
                                    <i class="fas fa-check-circle" style="color: #C8102E; margin-right: 4px;"></i>
                                    Consejo Directivo CCPH
                                </span>
                                <span style="background: #F8F9FA; padding: 4px 14px; border-radius: 20px; font-size: 0.8rem; color: #1A1A2E; border: 1px solid #E9ECEF;">
                                    <i class="fas fa-check-circle" style="color: #C8102E; margin-right: 4px;"></i>
                                    Gestión Pública y Privada
                                </span>
                            </div>

                            <a href="conoceme.html" style="display: inline-flex; align-items: center; background: #C8102E; color: #fff; padding: 11px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 8px 25px rgba(200, 16, 46, 0.3);">
                                <i class="fas fa-chevron-right" style="margin-right: 10px;"></i>
                                Conoce más de mi trayectoria
                            </a>
                        </div>
                    </div>

                    <!-- Frase destacada -->
                    <div style="max-width: 900px; margin: 40px auto 0; background: linear-gradient(135deg, #C8102E, #A00D25); color: #fff; padding: 20px 30px; border-radius: 14px; text-align: center;">
                        <p style="font-size: 1.1rem; line-height: 1.6; margin: 0; font-weight: 400;">
                            <i class="fas fa-quote-left" style="font-size: 1.2rem; opacity: 0.5; margin-right: 10px;"></i>
                            <strong>"Por tal razón me considero un verdadero y auténtico huancavelicano,</strong> 
                            comprometido con el desarrollo de nuestra provincia."
                        </p>
                    </div>

                </div>
            </section>
        `;
    }
}
customElements.define('fca-conoceme', FcaConoceme);

// ============================================================
// 6. HUANCAVELICA COMPONENT
// ============================================================
class FcaHuancavelica extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="huancavelica" id="huancavelica">
                <div class="container huancavelica__inner">
                    <div class="huancavelica__image animate-on-scroll">
                        <img src="assets/images/fca_hvca.jpeg" alt="Huancavelica" loading="lazy" />
                    </div>
                    <div class="huancavelica__content animate-on-scroll delay-1">
                        <span class="section-tag section-tag-white">Huancavelica</span>
                        <h2 class="section-title section-title-white">Compromiso con <span>nuestra tierra</span></h2>
                        <p>
                            Huancavelica merece un desarrollo integral que impulse su economía,
                            mejore sus servicios y brinde oportunidades a todos sus habitantes.
                        </p>
                        <p>
                            Trabajamos por una provincia con más inversión, mejor infraestructura
                            y un gobierno cercano a la gente.
                        </p>
                        <div class="features">
                            <span><i class="fas fa-check-circle"></i> Desarrollo regional</span>
                            <span><i class="fas fa-check-circle"></i> Obras para todos</span>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}
customElements.define('fca-huancavelica', FcaHuancavelica);

// ============================================================
// 7. NOTICIAS COMPONENT
// ============================================================
class FcaNoticias extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="noticias" id="noticias">
                <div class="container">
                    <div class="text-center animate-on-scroll">
                        <span class="section-tag">Noticias</span>
                        <h2 class="section-title">Últimas <span>Actualizaciones</span></h2>
                        <p class="section-subtitle mx-auto">Mantente informado sobre las actividades y propuestas de nuestra campaña</p>
                    </div>
                    <div class="noticias__grid">
                        <article class="noticias__card animate-on-scroll">
                            <div class="noticias__img">
                                <img src="assets/images/fca_hvca.jpeg" alt="Noticia 1" loading="lazy" />
                                <span class="category-tag">Política</span>
                            </div>
                            <div class="noticias__body">
                                <span class="noticias__date"><i class="far fa-calendar-alt" style="margin-right: 6px;"></i> 18 de julio, 2026</span>
                                <h3>Fernando Arana presenta su plan de gobierno</h3>
                                <p>El candidato de Acción Popular anunció sus principales propuestas para Huancavelica.</p>
                                <a href="#" class="noticias__link">
                                    Leer más <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </article>
                        <article class="noticias__card animate-on-scroll delay-1">
                            <div class="noticias__img">
                                <img src="assets/images/fca.jpeg" alt="Noticia 2" loading="lazy" />
                                <span class="category-tag">Campaña</span>
                            </div>
                            <div class="noticias__body">
                                <span class="noticias__date"><i class="far fa-calendar-alt" style="margin-right: 6px;"></i> 15 de julio, 2026</span>
                                <h3>Más de 5 mil voluntarios se suman a la campaña</h3>
                                <p>El movimiento ciudadano crece en Huancavelica con jóvenes comprometidos con el cambio.</p>
                                <a href="#" class="noticias__link">
                                    Leer más <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </article>
                        <article class="noticias__card animate-on-scroll delay-2">
                            <div class="noticias__img">
                                <img src="assets/images/fca_hvca.jpeg" alt="Noticia 3" loading="lazy" />
                                <span class="category-tag">Desarrollo</span>
                            </div>
                            <div class="noticias__body">
                                <span class="noticias__date"><i class="far fa-calendar-alt" style="margin-right: 6px;"></i> 12 de julio, 2026</span>
                                <h3>Propuesta de infraestructura para Huancavelica</h3>
                                <p>Expertos avalan el plan de desarrollo integral presentado por el candidato.</p>
                                <a href="#" class="noticias__link">
                                    Leer más <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        `;
    }
}
customElements.define('fca-noticias', FcaNoticias);

// ============================================================
// 8. SÚMATE COMPONENT
// ============================================================
class FcaSumate extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="sumate" id="sumate">
                <div class="container sumate__inner">
                    <div class="sumate__content animate-on-scroll">
                        <span class="section-tag">Súmate</span>
                        <h2 class="section-title">Sé parte del <span>cambio</span></h2>
                        <p>
                            Únete a miles de huancavelicanos que ya están construyendo el futuro de la provincia.
                            Tu voz, tu energía y tu compromiso son fundamentales para transformar Huancavelica.
                        </p>
                        <div class="features">
                            <span><i class="fas fa-check-circle"></i> Participa activamente</span>
                            <span><i class="fas fa-check-circle"></i> Recibe información</span>
                        </div>
                    </div>
                    <div class="sumate__form animate-on-scroll delay-1">
                        <form id="formSumate" novalidate>
                            <div class="form-group">
                                <label for="nombre">Nombres y Apellidos</label>
                                <input type="text" id="nombre" placeholder="Nombres y Apellidos" required aria-required="true" />
                            </div>
                            <div class="form-group">
                                <label for="email">Correo Electrónico</label>
                                <input type="email" id="email" placeholder="Correo Electrónico" required aria-required="true" />
                            </div>
                            <div class="form-group">
                                <label for="telefono">Número Telefónico</label>
                                <input type="tel" id="telefono" placeholder="987654321" required aria-required="true" />
                            </div>
                            <div class="form-group">
                                <label for="direccion">Lugar de Residencia</label>
                                <textarea id="direccion" rows="3" placeholder="Distrito / Centro Poblado"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">
                                <i class="fas fa-handshake"></i> REGISTRARME
                            </button>
                        </form>
                        <div id="formMessage" style="margin-top: 16px; text-align: center; font-weight: 400;"></div>
                    </div>
                </div>
            </section>
        `;
    }
}
customElements.define('fca-sumate', FcaSumate);

// ============================================================
// 9. FOOTER COMPONENT
// ============================================================
class FcaFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: #1A1A1A;
                    color: #FFFFFF;
                    padding: 70px 0 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.02);
                }

                .footer__inner {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1.2fr;
                    gap: 50px;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px 50px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
                }

                .footer__logo {
                    width: 52px;
                    height: 52px;
                    object-fit: contain;
                    margin-bottom: 14px;
                    display: block;
                }

                .footer__slogan {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.95rem;
                    font-weight: 300;
                }

                .footer__col h4 {
                    font-family: 'Playfair Display', serif;
                    font-weight: 600;
                    font-size: 1rem;
                    margin-bottom: 18px;
                    color: #D4AF37;
                    letter-spacing: 0.5px;
                }

                .footer__col ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .footer__col ul li {
                    margin-bottom: 10px;
                }

                .footer__col ul li a {
                    color: rgba(255, 255, 255, 0.4);
                    font-weight: 300;
                    text-decoration: none;
                    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    font-size: 0.9rem;
                }

                .footer__col ul li a:hover {
                    color: #FFFFFF;
                    padding-left: 6px;
                }

                .footer__social {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .footer__social a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 50%;
                    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 1rem;
                    border: 1px solid rgba(255, 255, 255, 0.03);
                    text-decoration: none;
                }

                .footer__social a:hover {
                    background: #C8102E;
                    color: #FFFFFF;
                    transform: translateY(-4px) scale(1.04);
                    box-shadow: 0 8px 30px rgba(200, 16, 46, 0.2);
                }

                .btn-footer {
                    display: inline-block;
                    background: #C8102E;
                    color: #FFFFFF;
                    padding: 12px 32px;
                    font-size: 0.75rem;
                    margin-top: 12px;
                    text-decoration: none;
                    border-radius: 50px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .btn-footer:hover {
                    background: #8B0000;
                    transform: translateY(-3px);
                    box-shadow: 0 12px 40px rgba(200, 16, 46, 0.25);
                }

                .footer__bottom {
                    padding: 28px 0;
                    text-align: center;
                    color: rgba(255, 255, 255, 0.25);
                    font-size: 0.8rem;
                    font-weight: 300;
                }

                @media (max-width: 768px) {
                    .footer__inner {
                        grid-template-columns: 1fr;
                        text-align: center;
                        gap: 30px;
                    }

                    .footer__social {
                        justify-content: center;
                    }
                }
            </style>

            <div class="footer__inner">
                <div class="footer__col">
                    <img src="assets/images/fca_simbolo.jpeg" alt="Acción Popular" class="footer__logo" />
                    <p class="footer__slogan">Por el desarrollo de Huancavelica</p>
                </div>
                <div class="footer__col">
                    <h4>Enlaces</h4>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="#conoceme">Conóceme</a></li>
                        <li><a href="#pilares">Propuestas</a></li>
                        <li><a href="#huancavelica">Huancavelica</a></li>
                        <li><a href="#sumate">Súmate</a></li>
                    </ul>
                </div>
                <div class="footer__col">
                    <h4>Redes Sociales</h4>
                    <div class="footer__social">
                        <a href="https://facebook.com/fclementearana" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com/fclementearana" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="https://youtube.com/@fclementearana" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <i class="fab fa-youtube"></i>
                        </a>
                        <a href="https://tiktok.com/@fclementearana" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                            <i class="fab fa-tiktok"></i>
                        </a>
                        <a href="https://instagram.com/fclementearana" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
                <div class="footer__col">
                    <h4>Contacto</h4>
                    <p style="color: rgba(255,255,255,0.4); font-size: 0.9rem; font-weight: 300;">
                        <i class="fas fa-envelope" style="margin-right: 8px;"></i> fclementearana@gmail.com
                    </p>
                    <a href="#sumate" class="btn-footer">
                        ÚNETE AQUÍ
                    </a>
                </div>
            </div>
            <div class="footer__bottom">
                <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 24px;">
                    <p>&copy; 2026 Fernando Clemente Arana - Acción Popular. Todos los derechos reservados.</p>
                </div>
            </div>
        `;
    }
}
customElements.define('fca-footer', FcaFooter);