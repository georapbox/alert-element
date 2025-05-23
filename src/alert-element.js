// @ts-check

import { createToastStack } from './toast-stack.js';
import {
  COMPONENT_NAME,
  EVT_ALERT_SHOW,
  EVT_ALERT_AFTER_SHOW,
  EVT_ALERT_HIDE,
  EVT_ALERT_AFTER_HIDE,
  COMMAND_ALERT_SHOW,
  COMMAND_ALERT_HIDE,
  CLOSE_REASON_USER,
  CLOSE_REASON_TIMEOUT,
  CLOSE_REASON_API
} from './constants.js';

const toastStack = createToastStack();

/**
 * Represents a value that may be of type T, or null.
 *
 * @template T
 * @typedef {T | null} Nullable
 */

/**
 * Represents the keyframe animation options.
 *
 * @typedef {{ keyframes: Keyframe[]; options?: KeyframeAnimationOptions }} AnimationDefinition
 * @typedef {{ show?: AnimationDefinition; hide?: AnimationDefinition }} CustomAnimations
 */

/**
 * Represents a command event.
 *
 * @typedef {Event & { command: string }} CommandEvent
 */

/**
 * Represents the close reason for the alert.
 *
 * @typedef { 'user' | 'timeout' | 'api' } CloseReason
 */

const styles = /* css */ `
  :host {
    display: contents;
    box-sizing: border-box;

    --alert-border-radius: 0.25rem;
    --alert-fg-color: #3f3f46;
    --alert-bg-color: #ffffff;
    --alert-border-color: #e4e4e7;
    --alert-info-variant-color: #0584c7;
    --alert-success-variant-color: #16a34a;
    --alert-neutral-variant-color: #52525b;
    --alert-warning-variant-color: #d87708;
    --alert-danger-variant-color: #dc2626;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --alert-fg-color: #b6b6be;
      --alert-bg-color: #252528;
      --alert-border-color: #36363a;
      --alert-info-variant-color: #27bbfc;
      --alert-success-variant-color: #3ae075;
      --alert-neutral-variant-color: #8e8e9a;
      --alert-warning-variant-color: #ffbd11;
      --alert-danger-variant-color: #fe5c5c;
    }
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  :host([hidden]),
  [hidden],
  ::slotted([hidden]) {
    display: none !important;
  }

  .alert {
    display: flex;
    align-items: center;
    margin: inherit;
    border: 1px solid var(--alert-border-color);
    border-top-width: 3px;
    border-radius: var(--alert-border-radius);
    background-color: var(--alert-bg-color);
  }

  :host([variant='info']) .alert {
    border-top-color: var(--alert-info-variant-color);
  }

  :host([variant='success']) .alert {
    border-top-color: var(--alert-success-variant-color);
  }

  :host([variant='neutral']) .alert {
    border-top-color: var(--alert-neutral-variant-color);
  }

  :host([variant='warning']) .alert {
    border-top-color: var(--alert-warning-variant-color);
  }

  :host([variant='danger']) .alert {
    border-top-color: var(--alert-danger-variant-color);
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--alert-fg-color);
    font-size: inherit;
    line-height: 0;
  }

  .alert__icon ::slotted(*) {
    margin-inline-start: 1rem;
  }

  :host([variant='info']) .alert__icon {
    color: var(--alert-info-variant-color);
  }

  :host([variant='success']) .alert__icon {
    color: var(--alert-success-variant-color);
  }

  :host([variant='neutral']) .alert__icon {
    color: var(--alert-neutral-variant-color);
  }

  :host([variant='warning']) .alert__icon {
    color: var(--alert-warning-variant-color);
  }

  :host([variant='danger']) .alert__icon {
    color: var(--alert-danger-variant-color);
  }

  .alert__message {
    flex: 1 1 auto;
    padding: 1.25rem;
    overflow: hidden;
    color: var(--alert-fg-color);
    line-height: 1.5;
  }

  .alert__close {
    display: flex;
    align-items: center;
    margin-inline-end:  1rem;
    padding: 0.5rem;
    border: none;
    line-height: 0;
    background: transparent;
    color: var(--alert-fg-color);
    font-size: inherit;
    cursor: pointer;
  }

  :host(:not([closable])) .alert__close {
    display: none !important;
  }
`;

const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles}</style>
  <div class="alert" part="base" role="alert" hidden>
    <div class="alert__icon" part="icon">
      <slot name="icon"></slot>
    </div>
    <div class="alert__message" part="message" aria-live="polite">
      <slot></slot>
    </div>
    <button type="button" class="alert__close" part="close" aria-label="Close">
      <slot name="close">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
        </svg>
      </slot>
    </button>
  </div>
`;

/**
 * @summary A custom HTML element for displaying dismissible alerts and toast notifications
 * @documentation https://github.com/georapbox/alert-element
 *
 * @tagname alert-element - This is the default tag name, unless overridden by the `defineCustomElement` method.
 * @extends HTMLElement
 *
 * @property {boolean} closable - Indicates whether the alert can be closed by the user by providing a close button.
 * @property {boolean} open - Indicates whether the alert is open or not.
 * @property {number} duration - The duration in milliseconds for which the alert will be displayed before automatically closing. Default is `Infinity`.
 * @property {string} variant - The alert's theme variant. Can be one of `info`, `success`, `neutral`, `warning`, or `danger`.
 * @property {string} closeLabel - The label of the default close button, used as the aria-label attribute of the close button.
 * @property {Animations | undefined} customAnimations - Custom animation keyframes and options for show/hide.
 *
 * @attribute {boolean} closable - Reflects the closable property.
 * @attribute {boolean} open - Reflects the open property.
 * @attribute {number} duration - Reflects the duration property.
 * @attribute {string} variant - Reflects the variant property.
 * @attribute {string} close-label - Reflects the closeLabel property.
 *
 * @slot - The default slot for the alert message.
 * @slot icon - Slot to display an icon before the alert message.
 * @slot close - Slot to display custom content for the close button.
 *
 * @csspart base - The base element of the alert.
 * @csspart icon - The icon element of the alert.
 * @csspart message - The message element of the alert.
 * @csspart close - The close button element of the alert.
 *
 * @cssproperty --alert-border-radius - The border radius of the alert.
 * @cssproperty --alert-fg-color - The foreground color of the alert.
 * @cssproperty --alert-bg-color - The background color of the alert.
 * @cssproperty --alert-border-color - The border color of the alert.
 * @cssproperty --alert-info-variant-color - The color variant for info alerts.
 * @cssproperty --alert-success-variant-color - The color variant for success alerts.
 * @cssproperty --alert-neutral-variant-color - The color variant for neutral alerts.
 * @cssproperty --alert-warning-variant-color - The color variant for warning alerts.
 * @cssproperty --alert-danger-variant-color - The color variant for danger alerts.
 *
 * @method defineCustomElement - Static method. Defines a custom element with the given name.
 * @method show - Instance method. Shows the alert; similar to setting the `open` attribute to true.
 * @method hide - Instance method. Hides the alert; similar to setting the `open` attribute to false.
 * @method toast - Instance method. Displays the alert as a toast notification.
 *
 * @event alert-show - Emitted when the alert is shown.
 * @event alert-after-show - Emitted after the alert is shown and all animations are complete.
 * @event alert-hide - Emitted when the alert is hidden.
 * @event alert-after-hide - Emitted after the alert is hidden and all animations are complete.
 */
class AlertElement extends HTMLElement {
  /** @type {Nullable<HTMLElement>} */
  #baseEl = null;

  /** @type {Nullable<HTMLButtonElement>} */
  #closeBtn = null;

  /** @type {Nullable<HTMLSlotElement>} */
  #closeSlotEl = null;

  /** @type {number | undefined} */
  #autoHideTimeout = undefined;

  /** @type {Nullable<{ promise: Promise<any>; resolve: (value?: any) => void; cleanup: () => void; }>} */
  #toastInProgress = null;

  /** @type {CustomAnimations | undefined} */
  #animations;

  /** @type {CustomAnimations | undefined} */
  static customAnimations;

  /** @type {CloseReason} */
  #closeReason = CLOSE_REASON_API;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  static get observedAttributes() {
    return ['open', 'duration', 'close-label'];
  }

  /**
   * Lifecycle method that is called when attributes are changed, added, removed, or replaced.
   *
   * @param {string} name - The name of the attribute.
   * @param {string} oldValue - The old value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.isConnected || oldValue === newValue) {
      return;
    }

    switch (name) {
      case 'open':
        this.#handleOpenAttributeChange();
        break;
      case 'duration':
        this.#clearAutoHideTimer();
        this.#shouldStartAutoHideTimer() && this.#startAutoHideTimer();
        break;
      case 'close-label':
        this.#updateCloseLabel();
        break;
      default:
        break;
    }
  }

  /**
   * Indicates whether the alert element can be closed by the user.
   *
   * @type {boolean}
   * @default false
   * @attribute closable - Reflects the closable property.
   */
  get closable() {
    return this.hasAttribute('closable');
  }

  set closable(value) {
    this.toggleAttribute('closable', !!value);
  }

  /**
   * Indicates whether the alert element is open.
   *
   * @type {boolean}
   * @default false
   * @attribute open - Reflects the open property.
   */
  get open() {
    return this.hasAttribute('open');
  }

  set open(value) {
    this.toggleAttribute('open', !!value);
  }

  /**
   * The duration in milliseconds for which the alert will be displayed before automatically closing.
   *
   * @type {number}
   * @default Infinity
   * @attribute duration - Reflects the duration property.
   */
  get duration() {
    const attr = this.getAttribute('duration');

    if (attr === null) {
      return Infinity;
    }

    const value = Number(attr);
    return Number.isNaN(value) ? Infinity : value;
  }

  set duration(value) {
    this.setAttribute('duration', value != null ? value.toString() : value);
  }

  /**
   * The alert's theme variant.
   * Can be one of `info`, `success`, `neutral`, `warning`, or `danger`.
   *
   * @type {string}
   * @default ''
   * @attribute variant - Reflects the variant property.
   */
  get variant() {
    return this.getAttribute('variant') || '';
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  /**
   * The label of the default close button, used as the aria-label attribute of the close button.
   * If user provides text content for the close button using the `close` slot,
   * this property is ignored and the aria-label attribute is removed.
   *
   * @type {string}
   * @default 'Close'
   * @attribute close-label - Reflects the closeLabel property.
   */
  get closeLabel() {
    return this.getAttribute('close-label') || 'Close';
  }

  set closeLabel(value) {
    this.setAttribute('close-label', value != null ? value.toString() : value);
  }

  /**
   * Custom animation keyframes and options for show/hide.
   *
   * @type {CustomAnimations | undefined}
   * @default undefined
   */
  get customAnimations() {
    return this.#animations;
  }

  set customAnimations(value) {
    this.#animations = value;
  }

  /**
   * Lifecycle method that is called when the element is added to the DOM.
   */
  connectedCallback() {
    this.#upgradeProperty('closable');
    this.#upgradeProperty('open');
    this.#upgradeProperty('duration');
    this.#upgradeProperty('variant');
    this.#upgradeProperty('closeLabel');
    this.#upgradeProperty('customAnimations');

    this.#baseEl = this.shadowRoot?.querySelector('.alert') ?? null;
    this.#closeBtn = this.shadowRoot?.querySelector('.alert__close') ?? null;
    this.#closeSlotEl = this.shadowRoot?.querySelector('slot[name="close"]') ?? null;

    this.#closeBtn?.addEventListener('click', this.#handleCloseBtnClick);
    this.#closeSlotEl?.addEventListener('slotchange', this.#handleCloseSlotChange);
    this.addEventListener('mouseenter', this.#handleMouseEnter);
    this.addEventListener('mouseleave', this.#handleMouseLeave);
    this.addEventListener('command', /** @type {EventListener} */ (this.#handleCommandEvent));

    if (this.open) {
      this.#baseEl?.removeAttribute('hidden');
      this.#shouldStartAutoHideTimer() && this.#startAutoHideTimer();
    } else {
      this.#baseEl?.setAttribute('hidden', '');
    }

    if (this.closeLabel) {
      this.#updateCloseLabel();
    }
  }

  /**
   * Lifecycle method that is called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    this.#clearAutoHideTimer();
    this.#closeBtn?.removeEventListener('click', this.#handleCloseBtnClick);
    this.#closeSlotEl?.removeEventListener('slotchange', this.#handleCloseSlotChange);
    this.removeEventListener('mouseenter', this.#handleMouseEnter);
    this.removeEventListener('mouseleave', this.#handleMouseLeave);
    this.removeEventListener('command', /** @type {EventListener} */ (this.#handleCommandEvent));
  }

  /**
   * Handles the change of the open attribute.
   * If the open attribute is set to true, the alert is shown and an event is dispatched.
   * If the open attribute is set to false, the alert is hidden and an event is dispatched.
   */
  #handleOpenAttributeChange() {
    this.#clearAutoHideTimer();

    if (this.open) {
      this.#shouldStartAutoHideTimer() && this.#startAutoHideTimer();
      this.#baseEl?.removeAttribute('hidden');
      this.#emitEvent(EVT_ALERT_SHOW);
      this.#playEntryAnimation(this.#baseEl)?.finished.finally(() => {
        this.#emitEvent(EVT_ALERT_AFTER_SHOW);
      });
    } else {
      this.#emitEvent(EVT_ALERT_HIDE, { reason: this.#closeReason });
      this.#playExitAnimation(this.#baseEl)?.finished.finally(() => {
        this.#baseEl?.setAttribute('hidden', '');
        this.#emitEvent(EVT_ALERT_AFTER_HIDE, { reason: this.#closeReason });
        this.#closeReason = CLOSE_REASON_API;
      });
    }
  }

  /**
   * Clears the auto-hide timer if it is set.
   */
  #clearAutoHideTimer() {
    if (this.#autoHideTimeout === undefined) {
      return;
    }

    clearTimeout(this.#autoHideTimeout);
    this.#autoHideTimeout = undefined;
  }

  /**
   * Starts the auto-hide timer for the alert.
   * This method sets a timeout to close the alert after the specified duration.
   */
  #startAutoHideTimer() {
    this.#autoHideTimeout = window.setTimeout(() => {
      this.#closeReason = CLOSE_REASON_TIMEOUT;
      this.open = false;
    }, this.duration);
  }

  /**
   * Determines if the auto-hide timer should be started.
   *
   * @returns {boolean} - Returns true if the auto-hide timer should be started; otherwise false.
   */
  #shouldStartAutoHideTimer() {
    return this.open && this.duration !== Infinity;
  }

  /**
   * Handles the click event on the close button.
   * If the alert is closable, it hides the alert.
   */
  #handleCloseBtnClick = () => {
    if (!this.closable) {
      return;
    }
    this.#closeReason = CLOSE_REASON_USER;
    this.open = false;
  };

  /**
   * Handles the mouse enter event on the alert.
   */
  #handleMouseEnter = () => {
    this.#clearAutoHideTimer();
  };

  /**
   * Handles the mouse leave event on the alert.
   */
  #handleMouseLeave = () => {
    this.#clearAutoHideTimer();
    this.#shouldStartAutoHideTimer() && this.#startAutoHideTimer();
  };

  /**
   * Handles the slotchange event of the close slot.
   */
  #handleCloseSlotChange = () => {
    this.#updateCloseLabel();
  };

  /**
   * Handles the command event.
   *
   * @param {CommandEvent} evt - The command event.
   */
  #handleCommandEvent = evt => {
    switch (evt.command) {
      case COMMAND_ALERT_SHOW:
        this.open = true;
        break;
      case COMMAND_ALERT_HIDE:
        this.#closeReason = CLOSE_REASON_API;
        this.open = false;
        break;
      default:
        break;
    }
  };

  /**
   * Updates the aria-label attribute of the close button.
   * If the slot for the close button has text content, the aria-label attribute is removed to allow the text content to be used as the label.
   * Otherwise, the aria-label attribute is set to the `closeLabel` property.
   */
  #updateCloseLabel() {
    if (!this.#closeBtn) {
      return;
    }

    const assignedElements = this.#closeSlotEl?.assignedElements() || [];
    const hasTextContent = assignedElements?.some(el => el.textContent?.replace(/\s/g, '') !== '');

    hasTextContent
      ? this.#closeBtn.removeAttribute('aria-label')
      : this.#closeBtn.setAttribute('aria-label', this.closeLabel);
  }

  /**
   * Resolves the animation keyframes and options for show/hide.
   * Prioritizes instance-level settings, then static/global fallback, then defaults.
   *
   * @returns {{show: AnimationDefinition, hide: AnimationDefinition}}
   */
  #getAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const defaultAnimations = {
      show: {
        keyframes: [
          { opacity: 0, transform: 'scale(0.9)' },
          { opacity: 1, transform: 'scale(1)' }
        ],
        options: {
          duration: 250,
          easing: 'ease'
        }
      },
      hide: {
        keyframes: [
          { opacity: 1, transform: 'scale(1)' },
          { opacity: 0, transform: 'scale(0.9)' }
        ],
        options: {
          duration: 250,
          easing: 'ease'
        }
      }
    };

    const userAnimations = this.customAnimations || AlertElement.customAnimations || {};

    /** @type {(key: 'show' | 'hide') => KeyframeAnimationOptions} */
    const resolveOptions = key => {
      const user = userAnimations[key]?.options ?? {};
      const fallback = defaultAnimations[key].options;
      return {
        ...fallback,
        ...user,
        duration:
          prefersReducedMotion || this.customAnimations === null || AlertElement.customAnimations === null
            ? 0
            : (user.duration ?? fallback.duration)
      };
    };

    return {
      show: {
        keyframes: userAnimations.show?.keyframes ?? defaultAnimations.show.keyframes,
        options: resolveOptions('show')
      },
      hide: {
        keyframes: userAnimations.hide?.keyframes ?? defaultAnimations.hide.keyframes,
        options: resolveOptions('hide')
      }
    };
  }

  /**
   * Plays the entry animation for the alert element.
   *
   * @param {Nullable<HTMLElement>} element - The element to animate.
   * @returns {Animation | undefined} - The animation object or undefined if the element is not provided.
   */
  #playEntryAnimation(element) {
    const { keyframes, options } = this.#getAnimations().show;
    return element?.animate(keyframes, options);
  }

  /**
   * Plays the exit animation for the alert element.
   *
   * @param {Nullable<HTMLElement>} element - The element to animate.
   * @returns {Animation | undefined} - The animation object or undefined if the element is not provided.
   */
  #playExitAnimation(element) {
    const { keyframes, options } = this.#getAnimations().hide;
    return element?.animate(keyframes, options);
  }

  /**
   * Dispatches a custom event with the given name.
   *
   * @param {string} eventName - The name of the event to dispatch.
   * @param {Nullable<any>} detail - The detail object to include with the event.
   */
  #emitEvent(eventName, detail = null) {
    const options = { bubbles: true, composed: true, detail };
    const evt = new CustomEvent(eventName, options);
    this.dispatchEvent(evt);
  }

  /**
   * Waits for an event to be triggered on the specified element.
   *
   * @param {HTMLElement} element - The element to wait for the event on.
   * @param {string} eventName - The name of the event to wait for.
   * @returns {Promise<void>} - A promise that resolves when the event is triggered.
   */
  #waitForEvent(element, eventName) {
    return new Promise(resolve => {
      const done = (/** @type {Event} */ evt) => {
        if (evt.target !== element) {
          return;
        }
        resolve();
      };

      element.addEventListener(eventName, done, { once: true });
    });
  }

  /**
   * Shows the alert element.
   *
   * @returns {Promise<void>} - A promise that resolves when the alert is shown, after the show animation is complete.
   */
  show() {
    if (this.open) {
      return Promise.resolve();
    }

    this.open = true;
    return this.#waitForEvent(this, EVT_ALERT_AFTER_SHOW);
  }

  /**
   * Hides the alert element.
   *
   * @returns {Promise<void>} - A promise that resolves when the alert is hidden, after the hide animation is complete.
   */
  hide() {
    if (!this.open) {
      return Promise.resolve();
    }

    this.open = false;
    return this.#waitForEvent(this, EVT_ALERT_AFTER_HIDE);
  }

  /**
   * Displays the alert as a toast notification.
   * This method appends the alert to a toast stack and automatically hides it after the specified duration.
   * If the toast stack is not already in the DOM, it will be appended to the body.
   *
   * @param {object} [options={}] - Options for the toast notification.
   * @param {boolean} [options.forceRestart=false] - If true, immediately cancels the active toast and starts a new one. Otherwise, if a toast is still active, any subsequent calls to toast() will be ignored.
   * @returns {Promise<void>} - A promise that resolves when the toast is closed.
   */
  toast(options = {}) {
    const defaults = { forceRestart: false };
    options = { ...defaults, ...options };

    if (this.#toastInProgress) {
      if (!options.forceRestart) {
        return this.#toastInProgress.promise;
      }

      this.#toastInProgress.resolve();
      this.#toastInProgress.cleanup();
    }

    /** @type (v?: any) => void */
    let resolveFn = () => {};
    const promise = new Promise(resolve => (resolveFn = resolve));

    const onAfterHide = () => {
      this.#toastInProgress?.resolve();
      this.#toastInProgress?.cleanup();
    };

    this.#toastInProgress = {
      promise,
      resolve: resolveFn,
      cleanup: () => {
        this.removeEventListener(EVT_ALERT_AFTER_HIDE, onAfterHide);

        if (this.parentNode === toastStack) {
          toastStack.removeChild(this);
        }

        if (!toastStack.querySelector(COMPONENT_NAME)) {
          toastStack.remove();
        }

        this.open = false;
        this.#toastInProgress = null;
      }
    };

    if (!toastStack.parentElement) {
      document.body.append(toastStack);
    }

    toastStack.appendChild(this);
    this.#baseEl?.setAttribute('data-toast', '');
    this.open = true;

    const toastStackBaseEl = toastStack.shadowRoot?.querySelector('.stack');
    toastStackBaseEl?.scrollTo({ top: toastStackBaseEl.scrollHeight });

    this.addEventListener(EVT_ALERT_AFTER_HIDE, onAfterHide, { once: true });

    return promise;
  }

  /**
   * This is to safe guard against cases where, for instance, a framework may have added the element to the page and set a
   * value on one of its properties, but lazy loaded its definition. Without this guard, the upgraded element would miss that
   * property and the instance property would prevent the class property setter from ever being called.
   *
   * https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
   *
   * @param {'closable' | 'open' | 'duration' | 'variant' | 'closeLabel' | 'customAnimations'} prop - The property name to upgrade.
   */
  #upgradeProperty(prop) {
    /** @type {any} */
    const instance = this;

    if (Object.prototype.hasOwnProperty.call(instance, prop)) {
      const value = instance[prop];
      delete instance[prop];
      instance[prop] = value;
    }
  }

  /**
   * Defines a custom element with the given name.
   * The name must contain a dash (-).
   *
   * @param {string} [elementName] - The name of the custom element.
   */
  static defineCustomElement(elementName = COMPONENT_NAME) {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, AlertElement);
    }
  }
}

export { AlertElement };
