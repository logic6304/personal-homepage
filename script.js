const themeToggle = document.querySelector('#theme-toggle');
const menuToggle = document.querySelector('#menu-toggle');
const mainNav = document.querySelector('.main-nav');

const savedTheme = localStorage.getItem('logic-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('logic-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

if (window.lucide) lucide.createIcons();
