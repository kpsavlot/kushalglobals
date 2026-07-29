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
    link.classList.remove('text-primary', 'border-b-2', 'border-primary', 'pb-1', 'font-bold');
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
    if (match) {
      link.classList.add('text-primary', 'border-b-2', 'border-primary', 'pb-1', 'font-bold');
      link.classList.remove('text-on-surface-variant', 'font-medium');
    }
  });
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) {
      if (window.scrollY > 20) {
        nav.classList.add('top-12', 'shadow-xl');
        nav.classList.remove('top-14');
      } else {
        nav.classList.remove('top-12', 'shadow-xl');
        nav.classList.add('top-14');
      }
    }
  });
  document.dispatchEvent(new CustomEvent('partialsLoaded'));
})();