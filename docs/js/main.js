import '../lib/browser-window.js';

const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/alert-element.js' : '../lib/alert-element.js';

const { AlertElement } = await import(componentUrl);

AlertElement.defineCustomElement();

document.querySelectorAll('h3[id^="example-"]').forEach((el, index) => {
  el.insertAdjacentHTML('afterbegin', `<a href="#${el.getAttribute('id')}">#</a> Example ${index + 1} - `);
});

document.querySelectorAll('.card').forEach(el => {
  el.insertAdjacentHTML('afterend', `<div class="back-top"><a href="#">↑ Back to top</a></div>`);
});

function escapeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

function toastify(message, options = {}) {
  const defaults = {
    duration: 3000,
    variant: 'neutral',
    icon: ''
  };

  options = { ...defaults, ...options };

  const icon = options.icon ? `<span slot="icon">${options.icon}</span>` : '';

  const alert = Object.assign(document.createElement('alert-element'), {
    closable: true,
    duration: options.duration,
    variant: options.variant,
    innerHTML: `${icon}${escapeHtml(message)}`
  });

  return alert.toast();
}

// Closable Alert
(function () {
  const button = document.querySelector('[data-example="closable"] > button');
  const alert = document.querySelector('[data-example="closable"] > alert-element');

  alert.addEventListener('alert-show', () => {
    button.setAttribute('disabled', '');
  });

  alert.addEventListener('alert-after-hide', () => {
    button.removeAttribute('disabled');
  });

  button.addEventListener('click', () => {
    alert.open = true;
  });
})();

// Alert with duration
(function () {
  const button = document.querySelector('[data-example="duration"] > button');
  const alert = document.querySelector('[data-example="duration"] > alert-element');

  alert.addEventListener('alert-show', () => {
    button.setAttribute('disabled', '');
  });

  alert.addEventListener('alert-after-hide', () => {
    button.removeAttribute('disabled');
  });

  button.addEventListener('click', () => {
    alert.open = true;
  });
})();

// Custom styling
(function () {
  const button = document.querySelector('[data-example="custom-styling"] > button');
  const alert = document.querySelector('[data-example="custom-styling"] > alert-element');

  button.addEventListener('click', () => {
    const alert = document.querySelector('[data-example="custom-styling"] > alert-element');
    alert.open = true;
  });

  alert.addEventListener('alert-show', () => {
    button.setAttribute('hidden', '');
  });

  alert.addEventListener('alert-after-hide', () => {
    button.removeAttribute('hidden');
  });
})();

// Toast alerts
(function () {
  let forceRestart = false;
  const variants = ['info', 'success', 'neutral', 'warning', 'danger'];

  variants.forEach(variant => {
    const button = document.querySelector(`[data-example="toasts"] > button[data-variant="${variant}"]`);
    const alert = document.querySelector(`[data-example="toasts"] > alert-element[variant="${variant}"]`);
    button.addEventListener('click', () => alert.toast({ forceRestart }));
  });

  document.querySelector('[data-example="toasts"] input[type="checkbox"]').addEventListener('change', evt => {
    forceRestart = evt.target.checked;
  });
})();

// Creating toasts imperatively
(function () {
  const button = document.querySelector('[data-example="imperative-toasts"] > button');
  let count = 0;

  button.addEventListener('click', () => {
    toastify(`This is a custom toast alert #${++count}`, {
      icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
        </svg>
      `,
      variant: 'info'
    });
  });
})();

// Custom toast stack position
(function () {
  const button = document.querySelector('[data-example="custom-toast-stack-position"] > button');
  const alert = Object.assign(document.createElement('alert-element'), {
    variant: ['info', 'success', 'neutral', 'warning', 'danger'][Math.floor(Math.random() * 5)],
    duration: 3000,
    closable: true
  });

  alert.addEventListener('alert-after-hide', () => {
    document.body.removeAttribute('data-toast-stack-position');
  });

  button.addEventListener('click', () => {
    const checkedRadio = document.querySelector(
      '[data-example="custom-toast-stack-position"] input[type="radio"]:checked'
    );
    const position = checkedRadio ? checkedRadio.value : 'top-right';

    alert.textContent = `I'm positioned at ${position}.`;
    alert.toast({ forceRestart: true });

    document.body.setAttribute('data-toast-stack-position', position);
  });
})();
