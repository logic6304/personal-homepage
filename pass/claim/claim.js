const themeToggle = document.querySelector('#theme-toggle');
const savedTheme = localStorage.getItem('logic-theme');
const tabs = document.querySelectorAll('.account-tab');
const form = document.querySelector('#account-form');
const emailInput = document.querySelector('#account-email');
const passwordInput = document.querySelector('#account-password');
const confirmInput = document.querySelector('#account-confirm');
const statusText = document.querySelector('#account-status');
const verificationPreview = document.querySelector('#verification-preview');
const maskedEmail = document.querySelector('#masked-email');
const stepArrow = document.querySelector('#step-arrow');

stepArrow?.addEventListener('click', () => {
  stepArrow.classList.remove('is-moving');
  void stepArrow.offsetWidth;
  stepArrow.classList.add('is-moving');
});

document.querySelectorAll('.input-shell').forEach((shell) => {
  const moveGlow = (event) => {
    const bounds = shell.getBoundingClientRect();
    shell.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    shell.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
    shell.classList.add('pointer-active');
  };

  shell.addEventListener('pointerenter', moveGlow);
  shell.addEventListener('pointermove', moveGlow);
  shell.addEventListener('pointerleave', () => shell.classList.remove('pointer-active'));
});

if (savedTheme === 'dark') document.body.classList.add('dark');

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('logic-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const isLogin = tab.dataset.mode === 'login';
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    form.classList.toggle('login-mode', isLogin);
    statusText.textContent = '';
    verificationPreview.hidden = true;
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  statusText.textContent = '';
  verificationPreview.hidden = true;

  if (!form.classList.contains('login-mode') && passwordInput.value !== confirmInput.value) {
    statusText.textContent = '两次输入的密码不一致。';
    return;
  }

  statusText.textContent = '当前是前端预览，尚未连接服务器，表单不会发送或保存任何信息。';
  if (!form.classList.contains('login-mode')) {
    const value = emailInput.value.trim();
    maskedEmail.textContent = value.replace(/^(.{2}).*(@.*)$/, '$1***$2');
    verificationPreview.hidden = false;
  }
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
if (window.lucide) lucide.createIcons();
