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

// Closable Alert
(function () {
  const button = document.querySelector('[data-example="closable"] > button');
  const alert = document.querySelector('[data-example="closable"] > alert-element');

  alert.addEventListener('alert-show', () => {
    button.setAttribute('disabled', '');
  });

  alert.addEventListener('alert-hide', () => {
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

  // alert.addEventListener('alert-show', () => {
  //   button.setAttribute('disabled', '');
  // });

  // alert.addEventListener('alert-hide', () => {
  //   button.removeAttribute('disabled');
  // });

  button.addEventListener('click', () => {
    alert.open = true;
  });
})();
