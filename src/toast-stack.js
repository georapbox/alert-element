// @ts-check

/**
 * Creates a toast stack element to display toast notifications in a stack.
 * It is a HTMLDivElement with a shadow DOM that contains styles and a slot for toast elements.
 *
 * @returns {HTMLDivElement} The toast stack element.
 */
export function createToastStack() {
  const stack = Object.assign(document.createElement('div'), {
    className: 'alert-toast-stack'
  });

  const shadowRoot = stack.attachShadow({ mode: 'open' });

  const styles = /* css */ `
    :host {
      display: contents;
      box-sizing: border-box;
    }

    :host *,
    :host *::before,
    :host *::after {
      box-sizing: inherit;
    }

    .stack {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 1000;
      width: 30rem;
      max-width: 100%;
      max-height: 100%;
      overflow: auto;
      scrollbar-width: none;
    }

    @media (prefers-reduced-motion: no-preference) {
      .stack {
        scroll-behavior: smooth;
      }
    }

    .stack > ::slotted(*) {
      margin: 1rem;
    }
  `;

  shadowRoot.innerHTML = /* html */ `
    <style>${styles}</style>
    <div class="stack" part="base"><slot></slot></div>
  `;

  return stack;
}
