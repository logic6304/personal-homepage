const form = document.querySelector('#message-form');
const messageInput = document.querySelector('#message');
const characterCount = document.querySelector('#char-count');
const statusText = document.querySelector('#form-status');
const submitButton = form?.querySelector('button[type="submit"]');

const updateCount = () => {
  characterCount.textContent = `${messageInput.value.length} / 1200`;
};

messageInput?.addEventListener('input', updateCount);
updateCount();

form?.addEventListener('submit', async (event) => {
  const endpoint = form.getAttribute('action');
  if (endpoint?.includes('YOUR_FORM_ID')) {
    event.preventDefault();
    statusText.textContent = '提问页面已准备好；接入 Formspree 后，这里就可以真正收到问题。';
    statusText.classList.add('error');
    return;
  }

  event.preventDefault();
  submitButton.disabled = true;
  statusText.textContent = '正在发送……';
  statusText.classList.remove('error');
  try {
    const response = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('request failed');
    form.reset();
    updateCount();
    statusText.textContent = '问题已经送出，谢谢你的留言。';
  } catch {
    statusText.textContent = '发送失败，请稍后重试。';
    statusText.classList.add('error');
  } finally {
    submitButton.disabled = false;
  }
});

if (window.lucide) lucide.createIcons();
