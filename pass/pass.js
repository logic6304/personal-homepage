const themeToggle = document.querySelector('#theme-toggle');
const savedTheme = localStorage.getItem('logic-theme');

if (savedTheme === 'dark') document.body.classList.add('dark');

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('logic-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
if (window.lucide) lucide.createIcons();
