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