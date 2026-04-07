/* ============================================================
   header.js — Universal navbar for Alidaunia Services
   Inject via: <script src="header.js"></script> (first in <body>)
   ============================================================ */

(function () {

  /* ── Shared width token — page containers must also use this ── */
  const NAV_MAX = '1360px';
  const NAV_H   = '68px';

  /* ============================================================
     CSS — Navbar only
     ============================================================ */
  const CSS = `

    /* ── Tokens ── */
    :root {
      --nav-max      : ${NAV_MAX};
      --nav-h        : ${NAV_H};
      --nav-bg       : #ffffff;
      --nav-border   : #111111;
      --nav-text     : #111111;
      --nav-muted    : #555555;
      --nav-hover-bg : #f4f4f4;
      --nav-active-ln: #111111;
      --sub-bg       : #ffffff;
      --sub-border   : #111111;
      --sub-hover-bg : #f4f4f4;
      --nav-font     : system-ui, -apple-system, 'Segoe UI', sans-serif;
      --transition   : 0.15s ease;
    }

    /* ── Body top offset so fixed bar doesn't hide content ── */
    body {
      padding-top : calc(var(--nav-h) + 48px) !important;
      margin-top  : 0 !important;
    }

    /* ── Force all page containers to honour the shared max-width ── */
    .container {
      max-width    : var(--nav-max) !important;
      margin-left  : auto          !important;
      margin-right : auto          !important;
      padding-left : 40px          !important;
      padding-right: 40px          !important;
      box-sizing   : border-box    !important;
    }

    /* ======================================================
       BAR
       ====================================================== */
    #site-header {
      position          : fixed;
      top               : 0;
      left              : 0;
      right             : 0;
      height            : var(--nav-h);
      background        : var(--nav-bg);
      border-bottom     : 2px solid var(--nav-border);
      z-index           : 9000;
      font-family       : var(--nav-font);
      -webkit-font-smoothing: antialiased;
    }

    /* ── Inner wrapper: same max-width + side padding as .container ── */
    #site-header .nav-inner {
      max-width      : var(--nav-max);
      width          : 100%;
      height         : 100%;
      margin          : 0 auto;
      padding         : 0 40px;
      display         : flex;
      align-items     : center;
      justify-content : space-between;
      box-sizing      : border-box;
    }

    /* ======================================================
       BRAND
       ====================================================== */
    #site-header .nav-brand {
      font-size      : 1rem;
      font-weight    : 800;
      letter-spacing : 0.12em;
      text-transform : uppercase;
      color          : var(--nav-text);
      text-decoration: none;
      white-space    : nowrap;
      flex-shrink    : 0;
      line-height    : 1;
    }

    #site-header .nav-brand:hover {
      opacity: 0.7;
    }

    /* ======================================================
       NAV LIST (desktop)
       ====================================================== */
    #site-header .nav-list {
      display        : flex;
      align-items    : center;
      list-style     : none;
      margin         : 0;
      padding        : 0;
      gap            : 0;
      height         : 100%;
    }

    /* ── Each top-level item ── */
    #site-header .nav-list > li {
      position       : relative;
      height         : 100%;
      display        : flex;
      align-items    : center;
    }

    /* ── Shared style for <a> and the Servizi <button> ── */
    #site-header .nav-link,
    #site-header .nav-trigger {
      display        : flex;
      align-items    : center;
      gap            : 5px;
      height         : 100%;
      padding        : 0 16px;
      font-family    : var(--nav-font);
      font-size      : 0.72rem;
      font-weight    : 700;
      letter-spacing : 0.09em;
      text-transform : uppercase;
      color          : var(--nav-muted);
      text-decoration: none;
      background     : none;
      border         : none;
      border-bottom  : 3px solid transparent;
      cursor         : pointer;
      white-space    : nowrap;
      transition     : color var(--transition), border-color var(--transition);
      box-sizing     : border-box;
    }

    #site-header .nav-link:hover,
    #site-header .nav-trigger:hover {
      color        : var(--nav-text);
      border-color : var(--nav-text);
    }

    /* Active state — injected by JS */
    #site-header .nav-link.is-active {
      color        : var(--nav-text);
      border-color : var(--nav-text);
    }

    /* ======================================================
       DROPDOWN ARROW (inside .nav-trigger)
       ====================================================== */
    #site-header .nav-arrow {
      display    : inline-block;
      font-size  : 0.55rem;
      line-height: 1;
      transition : transform 0.2s ease;
      margin-top : 1px;
    }

    /* Rotate on hover of the parent li */
    #site-header .has-submenu:hover .nav-arrow {
      transform: rotate(180deg);
    }

    /* ======================================================
       SUBMENU
       ====================================================== */
    #site-header .submenu {
      display        : none;            /* shown on hover via CSS */
      position       : absolute;
      top            : calc(var(--nav-h) - 2px); /* flush below border-bottom */
      left           : 0;
      min-width      : 310px;
      background     : var(--sub-bg);
      border         : 2px solid var(--sub-border);
      border-top     : none;
      list-style     : none;
      margin         : 0;
      padding        : 6px 0;
      z-index        : 9100;
      /* subtle appear animation */
      animation      : subReveal 0.12s ease forwards;
    }

    @keyframes subReveal {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    /* ── Show on hover of the parent li ── */
    #site-header .has-submenu:hover > .submenu {
      display: block;
    }

    /* ── Submenu link ── */
    #site-header .submenu li a {
      display        : flex;
      align-items    : center;
      gap            : 10px;
      padding        : 13px 22px;
      font-family    : var(--nav-font);
      font-size      : 0.72rem;
      font-weight    : 600;
      letter-spacing : 0.07em;
      text-transform : uppercase;
      color          : var(--nav-muted);
      text-decoration: none;
      border-left    : 3px solid transparent;
      transition     : color var(--transition), border-color var(--transition), background var(--transition);
      line-height    : 1.4;
    }

    #site-header .submenu li a:hover {
      color        : var(--nav-text);
      border-color : var(--nav-text);
      background   : var(--sub-hover-bg);
    }

    /* Number badge inside submenu */
    #site-header .submenu li a .sub-num {
      font-size    : 0.65rem;
      font-weight  : 800;
      color        : #bbb;
      flex-shrink  : 0;
      letter-spacing: 0;
      line-height  : 1;
    }

    /* Divider between submenu items */
    #site-header .submenu li + li {
      border-top: 1px solid #f0f0f0;
    }

    /* ======================================================
       HAMBURGER (mobile)
       ====================================================== */
    #site-header .nav-hamburger {
      display        : none;          /* hidden on desktop */
      flex-direction : column;
      justify-content: center;
      gap            : 5px;
      width          : 40px;
      height         : 40px;
      padding        : 0;
      background     : none;
      border         : none;
      cursor         : pointer;
      flex-shrink    : 0;
    }

    #site-header .nav-hamburger span {
      display        : block;
      width          : 24px;
      height         : 2px;
      background     : var(--nav-text);
      border-radius  : 1px;
      transition     : all 0.22s ease;
      transform-origin: center;
    }

    /* Animate to X when open */
    #site-header .nav-hamburger.is-open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    #site-header .nav-hamburger.is-open span:nth-child(2) {
      opacity  : 0;
      transform: scaleX(0);
    }
    #site-header .nav-hamburger.is-open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    /* ======================================================
       MOBILE BREAKPOINT  ≤ 960px
       ====================================================== */
    @media (max-width: 960px) {

      /* Show hamburger, hide desktop nav */
      #site-header .nav-hamburger { display: flex; }
      #site-header .nav-list      { display: none; }

      /* Mobile panel */
      #site-header .nav-list.is-open {
        display        : flex;
        flex-direction : column;
        align-items    : stretch;
        gap            : 0;
        height         : auto;

        position       : fixed;
        top            : var(--nav-h);
        left           : 0;
        right          : 0;
        bottom         : 0;
        background     : var(--nav-bg);
        border-top     : 1px solid #e5e5e5;
        overflow-y     : auto;
        z-index        : 8999;
        padding        : 12px 0 40px;
        animation      : mobileIn 0.2s ease forwards;
      }

      @keyframes mobileIn {
        from { opacity: 0; transform: translateY(-8px); }
        to   { opacity: 1; transform: translateY(0);    }
      }

      /* Each top-level item in mobile */
      #site-header .nav-list.is-open > li {
        height     : auto;
        flex-shrink: 0;
        border-bottom: 1px solid #f0f0f0;
      }

      /* Links/triggers in mobile */
      #site-header .nav-list.is-open .nav-link,
      #site-header .nav-list.is-open .nav-trigger {
        height         : auto;
        width          : 100%;
        padding        : 16px 32px;
        border-bottom  : none;
        border-left    : 3px solid transparent;
        font-size      : 0.8rem;
        justify-content: space-between;
        color          : var(--nav-text);
      }

      #site-header .nav-list.is-open .nav-link:hover,
      #site-header .nav-list.is-open .nav-trigger:hover {
        border-left-color: var(--nav-text);
        background       : var(--nav-hover-bg);
        border-bottom    : none;
      }

      /* Submenu in mobile: always block (controlled by JS toggle) */
      #site-header .has-submenu:hover > .submenu {
        display: none;  /* disable CSS hover in mobile */
      }

      #site-header .submenu.is-open {
        display  : block;
        position : static;
        border   : none;
        border-left: 3px solid #e5e5e5;
        margin-left: 32px;
        min-width: auto;
        padding  : 4px 0;
        animation: none;
      }

      #site-header .submenu.is-open li + li {
        border-top: 1px solid #f5f5f5;
      }

      #site-header .submenu.is-open li a {
        padding  : 12px 16px;
        border-left: none;
        font-size: 0.72rem;
      }

      #site-header .submenu.is-open li a:hover {
        background  : var(--sub-hover-bg);
        border-left : none;
      }

      /* Arrow points down/right in mobile */
      #site-header .nav-list.is-open .nav-arrow {
        transition: transform 0.2s ease;
      }
      #site-header .nav-list.is-open .has-submenu.sub-open .nav-arrow {
        transform: rotate(180deg);
      }
    }

    /* ======================================================
       VERY NARROW  ≤ 400px
       ====================================================== */
    @media (max-width: 400px) {
      #site-header .nav-inner      { padding: 0 20px; }
      #site-header .nav-brand      { font-size: 0.85rem; letter-spacing: 0.06em; }
      .container { padding-left: 20px !important; padding-right: 20px !important; }
    }

  `;

  /* ============================================================
     HTML
     ============================================================ */
  const HTML = `
    <header id="site-header" role="banner">
      <div class="nav-inner">

        <a class="nav-brand" href="01_manifesto.html" aria-label="Alidaunia Services — Home">
          Alidaunia Services
        </a>

        <ul class="nav-list" id="main-nav" role="list">
          <li>
            <a class="nav-link" href="01_manifesto.html">Manifesto</a>
          </li>
          <li>
            <a class="nav-link" href="02_vision_mission_values.html">Vision &amp; Mission</a>
          </li>
          <li>
            <a class="nav-link" href="03_ahvs_management.html">AHVS Management</a>
          </li>
          <li>
            <a class="nav-link" href="04_organigramma.html">Organigramma</a>
          </li>
          <li>
            <a class="nav-link" href="05_fattibilita_progettuale.html">Fattibilit&agrave;</a>
          </li>

          <li class="has-submenu" id="nav-servizi">
            <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">
              Servizi
              <span class="nav-arrow" aria-hidden="true">&#9660;</span>
            </button>

            <ul class="submenu" role="menu">
              <li role="none">
                <a href="06a_progettazione_eliporti.html" role="menuitem">
                  <span class="sub-num">01</span>Progettazione Eliporti e Vertiporti
                </a>
              </li>
              <li role="none">
                <a href="06b_consulenza_infrastrutture.html" role="menuitem">
                  <span class="sub-num">02</span>Consulenza &amp; Gestione Infrastrutture
                </a>
              </li>
              <li role="none">
                <a href="06c_sistemi_digitali.html" role="menuitem">
                  <span class="sub-num">03</span>Sistemi Digitali Avanzati
                </a>
              </li>
              <li role="none">
                <a href="06d_urban_air_mobility.html" role="menuitem">
                  <span class="sub-num">04</span>Servizi di Urban Air Mobility
                </a>
              </li>
              <li role="none">
                <a href="06e_formazione_piloti.html" role="menuitem">
                  <span class="sub-num">05</span>Formazione e Addestramento Piloti
                </a>
              </li>
              <li role="none">
                <a href="06f_attivita_droni.html" role="menuitem">
                  <span class="sub-num">06</span>Servizi ed Attivit&agrave; con Droni
                </a>
              </li>
              <li role="none">
                <a href="06g_prevenzione_incendi.html" role="menuitem">
                  <span class="sub-num">07</span>Sorveglianza e Prevenzione Incendi
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a class="nav-link" href="08_referenze.html">Referenze</a>
          </li>
          <li>
            <a class="nav-link" href="07_sede_contatti.html">Contatti</a>
          </li>
        </ul>

        <button
          class="nav-hamburger"
          id="nav-hamburger"
          aria-label="Apri menu"
          aria-expanded="false"
          aria-controls="main-nav"
        >
          <span></span><span></span><span></span>
        </button>

      </div>
    </header>
  `;

  /* ============================================================
     Inject  CSS
     ============================================================ */
  const styleEl = document.createElement('style');
  styleEl.id = 'nav-styles';
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* ============================================================
     Inject  HTML
     ============================================================ */
  document.body.insertAdjacentHTML('afterbegin', HTML);

  /* ============================================================
     Active link highlight
     ============================================================ */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('#site-header .nav-link').forEach(a => {
    if (a.getAttribute('href') === currentFile) {
      a.classList.add('is-active');
    }
  });

  /* Also highlight "Servizi" trigger if we're on any service sub-page */
  const servicePages = [
    '06a_progettazione_eliporti.html',
    '06b_consulenza_infrastrutture.html',
    '06c_sistemi_digitali.html',
    '06d_urban_air_mobility.html',
    '06e_formazione_piloti.html',
    '06f_attivita_droni.html',
    '06g_prevenzione_incendi.html',
    '06_prodotti_servizi.html',
  ];
  if (servicePages.includes(currentFile)) {
    const trigger = document.querySelector('#nav-servizi .nav-trigger');
    if (trigger) {
      trigger.style.color       = 'var(--nav-text)';
      trigger.style.borderColor = 'var(--nav-text)';
    }
  }

  /* ============================================================
     Mobile: hamburger toggle
     ============================================================ */
  const hamburger = document.getElementById('nav-hamburger');
  const navList   = document.getElementById('main-nav');

  hamburger.addEventListener('click', function () {
    const isOpen = navList.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu');
    // Close any open submenu when toggling main menu
    document.querySelectorAll('.submenu.is-open').forEach(s => s.classList.remove('is-open'));
    document.querySelectorAll('.has-submenu.sub-open').forEach(s => s.classList.remove('sub-open'));
  });

  /* ============================================================
     Mobile: submenu toggle (tap the trigger button)
     ============================================================ */
  const serviziItem    = document.getElementById('nav-servizi');
  const serviziTrigger = serviziItem.querySelector('.nav-trigger');
  const serviziSub     = serviziItem.querySelector('.submenu');

  serviziTrigger.addEventListener('click', function (e) {
    // On mobile, toggle; on desktop <960px check is irrelevant since
    // CSS hover handles it — but if panel is open, toggle matters.
    if (window.innerWidth <= 960) {
      e.preventDefault();
      const isSubOpen = serviziSub.classList.toggle('is-open');
      serviziItem.classList.toggle('sub-open', isSubOpen);
      serviziTrigger.setAttribute('aria-expanded', isSubOpen);
    }
  });

  /* ============================================================
     Close mobile menu on outside click / Escape key
     ============================================================ */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      navList.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      serviziSub.classList.remove('is-open');
      serviziItem.classList.remove('sub-open');
    }
  });

  document.addEventListener('click', function (e) {
    const header = document.getElementById('site-header');
    if (!header.contains(e.target) && navList.classList.contains('is-open')) {
      navList.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ============================================================
     Close mobile menu when a link is clicked
     ============================================================ */
  navList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', function () {
      navList.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

})();
