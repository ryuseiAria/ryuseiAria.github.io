const THEME_KEY = 'site-theme';

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  document.body.classList.toggle('light-mode', !isDark);
  const nav = document.querySelector('.navbar');
  if (nav) nav.classList.toggle('dark-mode', isDark);
  localStorage.setItem(THEME_KEY, theme);
}
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefers ? 'dark' : 'light'));
}

function setupThemeToggle() {

  const oldBtn = document.getElementById('theme-toggle');
  if (oldBtn) oldBtn.style.display = 'none';

  const btn = document.createElement('button');
  btn.id = 'theme-toggle-mini';
  btn.className = 'btn btn-outline-morado btn-sm rounded-pill';
  btn.innerHTML = '<i class="bi bi-moon"></i>'; 
  btn.style.position = 'fixed';
  btn.style.bottom = '1rem';
  btn.style.right = '1rem';
  btn.style.zIndex = '1000';
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(newTheme);
    btn.innerHTML = newTheme === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
  });
}

function demoContentAndAttribute() {
  const firstLink = document.querySelector('.navbar a.nav-link');
  if (!firstLink) return;
  firstLink.textContent = 'Inicio';
  firstLink.setAttribute('href', 'index.html?ref=updated');
}

function setupHover() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  hero.addEventListener('mouseenter', () => hero.classList.add('bg-morado'));
  hero.addEventListener('mouseleave', () => hero.classList.remove('bg-morado'));
}

function setupScrollTopButton() {
  const btn = document.createElement('button');
  btn.id = 'scroll-top';
  btn.className = 'btn btn-morado rounded-pill scroll-top';
  btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  btn.style.position = 'fixed';
  btn.style.bottom = '1.5rem';
  btn.style.right = '1.5rem';
  btn.style.display = 'none';
  btn.style.zIndex = '1000';
  document.body.appendChild(btn);

  const toggle = () => {
    btn.style.display = window.scrollY > 200 ? 'block' : 'none';
  };
  window.addEventListener('scroll', toggle);

  btn.addEventListener('click', () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) window.scrollTo(0, 0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
function setupCvButton() {
  const btn = document.getElementById('btn-cv');
  if (!btn) return;
  const wrap = document.createElement('div');
  wrap.className = 'toast-container position-fixed bottom-0 start-0 p-3';
  wrap.innerHTML = `
    <div id="cv-toast" class="toast align-items-center text-bg-dark border-0" role="status" aria-live="polite">
      <div class="d-flex">
        <div class="toast-body"> “Estoy actualizando mi CV. Estará disponible muy pronto.”</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
      </div>
    </div>`;
  document.body.appendChild(wrap);
  const toast = bootstrap.Toast.getOrCreateInstance(wrap.querySelector('#cv-toast'), { delay: 3000 });
  btn.addEventListener('click', (e) => {
    e.preventDefault();   
    toast.show();
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupThemeToggle();         
  demoContentAndAttribute();   
  setupHover();                
  setupScrollTopButton();      
  setupCvButton(); 
});