(async function () {
  const includes = document.querySelectorAll('[data-include]');
  const fetches = Array.from(includes).map(el =>
    fetch(el.getAttribute('data-include'))
      .then(r => r.text())
      .then(html => {
        el.insertAdjacentHTML('afterend', html);
        el.remove();
      })
  );
  await Promise.all(fetches);
  const navLinks = document.querySelectorAll('.nav-link');
  const path = window.location.pathname.replace(/\/+/g, '/');
  navLinks.forEach(link => {
    link.classList.remove('text-primary', 'border-b-2', 'border-primary', 'pb-1', 'font-bold', 'bg-primary/10');
    link.classList.add('text-on-surface-variant', 'font-medium');
    const href = link.getAttribute('href');
    let match = false;
    if (href && href !== '#') {
      const cleanHref = href.replace('..', '').replace(/\?.*$/, '').replace(/\/$/, '');
      if (path.includes(cleanHref)) {
        match = true;
      }
    }
    if (href && href.includes('Portfolio_Page') && path.includes('Product_Page')) {
      match = true;
    }
    if (href && href.includes('Blog_Page') && path.includes('Article_Page')) {
      match = true;
    }
    if (link.dataset.nav === 'products' && (path.includes('Portfolio_Page') || path.includes('Product_Page'))) {
      match = true;
    }
    if (match) {
      link.classList.add('text-primary', 'font-bold');
      link.classList.remove('text-on-surface-variant', 'font-medium');
      if (link.closest('#mobile-menu')) {
        link.classList.add('bg-primary/10');
      } else {
        link.classList.add('border-b-2', 'border-primary', 'pb-1');
      }
    }
  });

  // Mobile menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navIcon = document.getElementById('nav-toggle-icon');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mobileMenu && navIcon) {
    function closeMenu() {
      mobileMenu.classList.add('hidden');
      navIcon.textContent = 'menu';
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.querySelectorAll('.mobile-submenu').forEach(function (sub) {
        sub.classList.add('hidden');
      });
      mobileMenu.querySelectorAll('.mobile-submenu-toggle .material-symbols-outlined').forEach(function (icon) {
        icon.style.transform = '';
      });
    }
    navToggle.addEventListener('click', function () {
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        navIcon.textContent = 'close';
        navToggle.setAttribute('aria-expanded', 'true');
      } else {
        closeMenu();
      }
    });
    mobileMenu.querySelectorAll('.mobile-submenu-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.mobile-nav-item');
        var sub = item ? item.querySelector('.mobile-submenu') : null;
        var icon = btn.querySelector('.material-symbols-outlined');
        if (sub) {
          sub.classList.toggle('hidden');
          if (icon) {
            icon.style.transform = sub.classList.contains('hidden') ? '' : 'rotate(180deg)';
          }
        }
      });
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', function (e) {
      if (mainNav && !mainNav.contains(e.target)) closeMenu();
    });
  }
  // initLenis
  window.lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - 2 ** (-10 * t))
  });
  function raf(time) { window.lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  var ro = new ResizeObserver(function () { window.lenis.resize(); });
  ro.observe(document.documentElement);

  // Navbar shadow on scroll
  window.lenis.on('scroll', function () {
    var nav = document.getElementById('main-nav');
    if (nav) {
      if (window.lenis.scroll > 20) {
        nav.classList.add('top-12', 'shadow-xl');
        nav.classList.remove('top-14');
      } else {
        nav.classList.remove('top-12', 'shadow-xl');
        nav.classList.add('top-14');
      }
    }
  });

  // Jump-to-top button
  var topBtn = document.createElement('a');
  topBtn.href = '#';
  topBtn.id = 'top-btn';
  topBtn.setAttribute('aria-label', 'Scroll to top');
  topBtn.innerHTML =
    '<div class="bg-white text-primary w-11 h-11 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 border border-outline" style="border-radius:50%">' +
    '<span class="material-symbols-outlined text-[22px]">arrow_upward</span></div>';
  Object.assign(topBtn.style, {
    position: 'fixed', bottom: '104px', right: '32px', zIndex: '99',
    opacity: '0', transform: 'translateY(20px)',
    transition: 'opacity 0.3s, transform 0.3s', pointerEvents: 'none'
  });
  topBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.lenis.scrollTo(0);
  });
  document.body.appendChild(topBtn);

  window.lenis.on('scroll', function () {
    if (window.lenis.scroll > 400) {
      topBtn.style.opacity = '1';
      topBtn.style.transform = 'translateY(0)';
      topBtn.style.pointerEvents = 'auto';
    } else {
      topBtn.style.opacity = '0';
      topBtn.style.transform = 'translateY(20px)';
      topBtn.style.pointerEvents = 'none';
    }
  });
  // Google Translate
  var gtStyle = document.createElement('style');
  gtStyle.textContent =
    '.goog-te-banner-frame{display:none!important}body{top:0!important}' +
    '.goog-te-gadget-simple{background:transparent!important;border:none!important;font-size:inherit!important;line-height:inherit!important;display:inline-flex!important;align-items:center!important;gap:4px!important;padding:0!important}' +
    '.goog-te-gadget-simple .goog-te-menu-value{color:inherit!important;text-decoration:none!important}' +
    '.goog-te-gadget-simple .goog-te-menu-value span{color:inherit!important;border-bottom:none!important}' +
    '.goog-te-gadget-simple .goog-te-gadget-icon{display:none!important}' +
    '.goog-te-gadget-simple .goog-te-menu-value span[style]{display:none!important}' +
    '.goog-te-gadget-simple .goog-te-menu-value span:last-child{display:inline!important}';
  document.head.appendChild(gtStyle);

  // Protect icons from Google Translate
  document.querySelectorAll('.material-symbols-outlined, .fas, .far, .fab').forEach(function (el) {
    el.classList.add('notranslate');
  });

  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  };
  var gts = document.createElement('script');
  gts.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  gts.async = true;
  document.head.appendChild(gts);

  // Wire language button to Google Translate widget
  document.getElementById('lang-btn')?.addEventListener('click', function () {
    var gadget = document.querySelector('#google_translate_element .goog-te-gadget-simple');
    if (gadget) gadget.click();
  });

  document.dispatchEvent(new CustomEvent('partialsLoaded'));
})();