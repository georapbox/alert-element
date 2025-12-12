import '../lib/browser-window.js';

const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/alert-element.js' : '../lib/alert-element.js';
const { AlertElement, EVENT_ALERT_SHOW, EVENT_ALERT_AFTER_SHOW, EVENT_ALERT_HIDE, EVENT_ALERT_AFTER_HIDE } =
  await import(componentUrl);

AlertElement.defineCustomElement();

document.querySelectorAll('h3[id^="example-"]').forEach((el, index) => {
  el.insertAdjacentHTML('afterbegin', `<a href="#${el.getAttribute('id')}">#</a> Example ${index + 1} - `);
});

document.querySelectorAll('.card').forEach(el => {
  el.insertAdjacentHTML('afterend', `<div class="back-top"><a href="#">↑ Back to top</a></div>`);
});

document.querySelectorAll('button[data-action="toggle-alert"]').forEach(btn => {
  btn.addEventListener(
    'click',
    throttle(() => {
      const alert = btn.closest('.card')?.querySelector('alert-element');
      if (alert instanceof AlertElement) {
        alert.open ? alert.hide() : alert.show();
      }
    }, 300)
  );
});

function throttle(fn, wait = 0) {
  let timerId, lastRan;

  return (...args) => {
    if (!lastRan) {
      fn(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(timerId);

      timerId = setTimeout(
        () => {
          if (Date.now() - lastRan >= wait) {
            fn(...args);
            lastRan = Date.now();
          }
        },
        wait - (Date.now() - lastRan) || 0
      );
    }
  };
}

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
    variant: 'info',
    duration: 3000,
    closable: true
  });

  alert.addEventListener(EVENT_ALERT_AFTER_HIDE, () => {
    document.body.removeAttribute('data-toast-stack-position');
  });

  button.addEventListener('click', () => {
    const checkedRadio = document.querySelector(
      '[data-example="custom-toast-stack-position"] input[type="radio"]:checked'
    );
    const position = checkedRadio ? checkedRadio.value : 'top-right';

    alert.textContent = `This alert is currently positioned at ${position}.`;
    alert.toast({ forceRestart: true });

    document.body.setAttribute('data-toast-stack-position', position);
  });
})();

// Custom animations
(function () {
  const alert = document.querySelector('[data-example="custom-animations"] > alert-element');

  alert.customAnimations = {
    show: {
      keyframes: [
        { opacity: 0, transform: 'rotateX(90deg) scale(0.8)', filter: 'blur(8px)' },
        { opacity: 1, transform: 'rotateX(-10deg) scale(1.05)', filter: 'blur(2px)' },
        { opacity: 1, transform: 'rotateX(5deg) scale(0.97)', filter: 'blur(1px)' },
        { opacity: 1, transform: 'rotateX(0deg) scale(1)', filter: 'blur(0)' }
      ],
      options: {
        duration: 700,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards'
      }
    },
    hide: {
      keyframes: [
        { opacity: 1, transform: 'scale(1)', filter: 'blur(0)' },
        { opacity: 0, transform: 'scale(0.8)', filter: 'blur(6px)' }
      ],
      options: {
        duration: 450,
        easing: 'ease-in',
        fill: 'forwards'
      }
    }
  };
})();

// Directionality
document.getElementById('directionality-form').addEventListener('change', evt => {
  const alert = document.getElementById('dir-alert');

  if (!alert) {
    return;
  }

  const input = evt.target;

  if (input.name === 'directionality') {
    alert.setAttribute('dir', input.value);
    alert.querySelector('.dir').textContent = input.value === 'rtl' ? 'right-to-left (RTL)' : 'left-to-right (LTR)';
  }

  if (input.name === 'with-countdown') {
    if (input.checked) {
      alert.setAttribute('countdown', '');
      alert.setAttribute('duration', '10000');
    } else {
      alert.removeAttribute('countdown');
      alert.removeAttribute('duration');
    }
  }
});

// Events
document.addEventListener(EVENT_ALERT_SHOW, evt => {
  console.log(EVENT_ALERT_SHOW, evt.target);
});
document.addEventListener(EVENT_ALERT_AFTER_SHOW, evt => {
  console.log(EVENT_ALERT_AFTER_SHOW, evt.target);
});
document.addEventListener(EVENT_ALERT_HIDE, evt => {
  console.log(EVENT_ALERT_HIDE, evt.target, evt.detail);
});
document.addEventListener(EVENT_ALERT_AFTER_HIDE, evt => {
  console.log(EVENT_ALERT_AFTER_HIDE, evt.target, evt.detail);
});
