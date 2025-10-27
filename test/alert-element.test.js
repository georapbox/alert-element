import { expect, fixture, fixtureCleanup, html, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import {
  AlertElement,
  EVENT_ALERT_SHOW,
  EVENT_ALERT_AFTER_SHOW,
  EVENT_ALERT_HIDE,
  EVENT_ALERT_AFTER_HIDE,
  COMMAND_ALERT_SHOW,
  COMMAND_ALERT_HIDE,
  CLOSE_REASON_USER,
  CLOSE_REASON_TIMEOUT,
  CLOSE_REASON_API
} from '../src/alert-element.js';

AlertElement.defineCustomElement();

function stubMatchMedia(reducedMotion) {
  return sinon.stub(window, 'matchMedia').callsFake(query => ({
    matches: query === `(prefers-reduced-motion: ${reducedMotion})`,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  }));
}

describe('alert-element', () => {
  let matchMediaStub;

  beforeEach(() => {
    document.querySelector('.alert-toast-stack')?.remove();

    // Emulate prefers-reduced-motion: reduce
    // to avoid waiting for animations to complete
    matchMediaStub = stubMatchMedia('reduce');
  });

  afterEach(() => {
    fixtureCleanup();
    matchMediaStub.restore();
  });

  describe('accessibility', () => {
    it('passes accessibility test when enabled without attributes', async () => {
      const el = await fixture(html`<alert-element open>Foo</alert-element>`);
      await expect(el).to.be.accessible();
    });

    it('base element has a default role="alert" attribute if announce is not set', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      const base = el.shadowRoot.querySelector('.alert');
      expect(base).to.have.attribute('role', 'alert');
    });

    it('base element has role="status" attribute if announce="status"', async () => {
      const el = await fixture(html`<alert-element announce="status"></alert-element>`);
      const base = el.shadowRoot.querySelector('.alert');
      expect(base).to.have.attribute('role', 'status');
    });

    it('base element does not have role attribute if announce="none"', async () => {
      const el = await fixture(html`<alert-element announce="none"></alert-element>`);
      const base = el.shadowRoot.querySelector('.alert');
      expect(base).to.not.have.attribute('role');
    });

    it('base element has role="alert" if announce has an invalid value', async () => {
      const el = await fixture(html`<alert-element announce="invalid"></alert-element>`);
      const base = el.shadowRoot.querySelector('.alert');
      expect(base).to.have.attribute('role', 'alert');
    });

    it('close button has a default aria-label attribute', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      const closeButton = el.shadowRoot.querySelector('.alert__close');
      expect(closeButton).to.have.attribute('aria-label', 'Close');
    });

    it('close button has a custom aria-label attribute', async () => {
      const el = await fixture(html`<alert-element close-label="Close me"></alert-element>`);
      const closeButton = el.shadowRoot.querySelector('.alert__close');
      expect(closeButton).to.have.attribute('aria-label', 'Close me');
    });

    it('close button does not have aria-label attribute if user provides text content for the button', async () => {
      const el = await fixture(html`<alert-element><span slot="close">Close me</span></alert-element>`);
      const closeButton = el.shadowRoot.querySelector('.alert__close');
      expect(closeButton).to.not.have.attribute('aria-label');
    });

    it('close button has default aria-label attribute if user provides non-text content for the button', async () => {
      const el = await fixture(html`
        <alert-element>
          <span slot="close"><img src="" /></span>
        </alert-element>
      `);
      const closeButton = el.shadowRoot.querySelector('.alert__close');
      expect(closeButton).to.have.attribute('aria-label', 'Close');
    });

    it('close button has custom aria-label attribute if user provides non-text content for the button and close-label attribute', async () => {
      const el = await fixture(html`
        <alert-element close-label="Close me">
          <span slot="close"><img src="" /></span>
        </alert-element>
      `);
      const closeButton = el.shadowRoot.querySelector('.alert__close');
      expect(closeButton).to.have.attribute('aria-label', 'Close me');
    });
  });

  describe('properties - attribures', () => {
    // closable
    it('reflects property "closable" to attribute "closable"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.closable = true;
      expect(el.hasAttribute('closable')).to.be.true;
      el.closable = false;
      expect(el.hasAttribute('closable')).to.be.false;
    });

    it('reflects attribute "closable" to property "closable"', async () => {
      const el = await fixture(html`<alert-element closable></alert-element>`);
      expect(el.closable).to.be.true;
    });

    // open
    it('reflects property "open" to attribute "open"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.open = true;
      expect(el.hasAttribute('open')).to.be.true;
      el.open = false;
      expect(el.hasAttribute('open')).to.be.false;
    });

    it('reflects attribute "open" to property "open"', async () => {
      const el = await fixture(html`<alert-element open></alert-element>`);
      expect(el.open).to.be.true;
    });

    // duration
    it('reflects property "duration" to attribute "duration"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.duration = 3000;
      expect(el.getAttribute('duration')).to.equal('3000');
    });

    it('reflects attribute "duration" to property "duration"', async () => {
      const el = await fixture(html`<alert-element duration="3000"></alert-element>`);
      expect(el.duration).to.equal(3000);
    });

    it('property duration returns Infinity if invalid value is set', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.duration = 'invalid';
      expect(el.duration).to.equal(Infinity);
      el.duration = null;
      expect(el.duration).to.equal(Infinity);
      el.duration = undefined;
      expect(el.duration).to.equal(Infinity);
      el.duration = NaN;
      expect(el.duration).to.equal(Infinity);
    });

    // variant
    it('reflects property "variant" to attribute "variant"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.variant = 'info';
      expect(el.getAttribute('variant')).to.equal('info');
    });

    it('reflects attribute "variant" to property "variant"', async () => {
      const el = await fixture(html`<alert-element variant="info"></alert-element>`);
      expect(el.variant).to.equal('info');
    });

    it('property variant returns empty string if not set', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      expect(el.variant).to.equal('');
    });

    // closeLabel
    it('reflects property "closeLabel" to attribute "close-label"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.closeLabel = 'Close me';
      expect(el.getAttribute('close-label')).to.equal('Close me');
    });

    it('reflects attribute "close-label" to property "closeLabel"', async () => {
      const el = await fixture(html`<alert-element close-label="Close me"></alert-element>`);
      expect(el.closeLabel).to.equal('Close me');
    });

    // announce
    it('reflects property "announce" to attribute "announce"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.announce = 'status';
      expect(el.getAttribute('announce')).to.equal('status');
    });

    it('reflects attribute "announce" to property "announce"', async () => {
      const el = await fixture(html`<alert-element announce="status"></alert-element>`);
      expect(el.announce).to.equal('status');
    });

    // countdown
    it('reflects property "countdown" to attribute "countdown"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.countdown = true;
      expect(el.hasAttribute('countdown')).to.be.true;
    });

    it('reflects attribute "countdown" to property "countdown"', async () => {
      const el = await fixture(html`<alert-element countdown></alert-element>`);
      expect(el.countdown).to.be.true;
    });

    // noAnimations
    it('reflects property "noAnimations" to attribute "no-animations"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.noAnimations = true;
      expect(el.hasAttribute('no-animations')).to.be.true;
    });

    it('reflects attribute "no-animations" to property "noAnimations"', async () => {
      const el = await fixture(html`<alert-element no-animations></alert-element>`);
      expect(el.noAnimations).to.be.true;
    });

    // customAnimations
    it('does not reflect attribute "custom-animations" to property "customAnimations"', async () => {
      const el = await fixture(html`<alert-element custom-animations></alert-element>`);
      expect(el.customAnimations).to.be.undefined;
    });

    it('does not reflect property "customAnimations" to attribute "custom-animations"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.customAnimations = { show: null, hide: null };
      expect(el.getAttribute('custom-animations')).to.be.null;
    });
  });

  describe('slots', () => {
    it('should have a default/unnamed slot', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      const bodySlot = el.shadowRoot.querySelector('slot:not([name])');
      expect(bodySlot).to.exist;
      const p = document.createElement('p');
      p.textContent = 'Main content goes here';
      el.appendChild(p);
      expect(bodySlot.assignedElements()).to.deep.equal([p]);
    });

    it('should have "close" slot', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      const closeSlot = el.shadowRoot.querySelector('slot[name="close"]');
      expect(closeSlot).to.exist;
      const close = document.createElement('button');
      close.setAttribute('slot', 'close');
      close.textContent = 'Close';
      el.appendChild(close);
      expect(closeSlot.assignedElements()).to.deep.equal([close]);
    });

    it('should have "icon" slot', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      const iconSlot = el.shadowRoot.querySelector('slot[name="icon"]');
      expect(iconSlot).to.exist;
      const icon = document.createElement('img');
      icon.setAttribute('slot', 'icon');
      icon.src = '';
      el.appendChild(icon);
      expect(iconSlot.assignedElements()).to.deep.equal([icon]);
    });
  });

  describe('CSS Parts', () => {
    it('should have "base" CSS part', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      const dialog = el.shadowRoot.querySelector('.alert');
      expect(dialog.getAttribute('part')).to.equal('base');
    });

    it('should have "icon" CSS part', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      const closeButton = el.shadowRoot.querySelector('.alert__icon');
      expect(closeButton.getAttribute('part')).to.equal('icon');
    });

    it('should have "close" CSS part', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      const closeButton = el.shadowRoot.querySelector('.alert__close');
      expect(closeButton.getAttribute('part')).to.equal('close');
    });

    it('should have "message" CSS part', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      const message = el.shadowRoot.querySelector('.alert__message');
      expect(message.getAttribute('part')).to.equal('message');
    });
  });

  describe('custom events', () => {
    it(`fires "${EVENT_ALERT_SHOW}" and "${EVENT_ALERT_AFTER_SHOW}" with null detail`, async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      const showEvent = oneEvent(el, EVENT_ALERT_SHOW);
      const afterShowEvent = oneEvent(el, EVENT_ALERT_AFTER_SHOW);
      el.setAttribute('open', '');
      expect(await showEvent).to.be.an.instanceOf(CustomEvent);
      expect((await showEvent).detail).to.be.null;
      expect(await showEvent).to.be.an.instanceOf(CustomEvent);
      expect((await afterShowEvent).detail).to.be.null;
    });

    it(`fires "${EVENT_ALERT_HIDE}" and "${EVENT_ALERT_AFTER_HIDE}" with detail containing reason`, async () => {
      const el = await fixture(html`<alert-element open></alert-element>`);
      const hideEvent = oneEvent(el, EVENT_ALERT_HIDE);
      const afterHideEvent = oneEvent(el, EVENT_ALERT_AFTER_HIDE);
      el.removeAttribute('open');
      expect(await hideEvent).to.be.an.instanceOf(CustomEvent);
      expect((await hideEvent).detail).to.be.an('object');
      expect(await afterHideEvent).to.be.an.instanceOf(CustomEvent);
      expect((await afterHideEvent).detail).to.be.an('object');
    });

    describe('close reason', () => {
      it(`should set reason to "${CLOSE_REASON_USER}" when alert closed by user clicking on close button`, async () => {
        const el = await fixture(html`<alert-element open closable></alert-element>`);
        const hideEvent = oneEvent(el, EVENT_ALERT_HIDE);
        const afterHideEvent = oneEvent(el, EVENT_ALERT_AFTER_HIDE);
        const closeButton = el.shadowRoot.querySelector('.alert__close');
        closeButton.click();
        expect((await hideEvent).detail).to.deep.equal({ reason: CLOSE_REASON_USER });
        expect((await afterHideEvent).detail).to.deep.equal({ reason: CLOSE_REASON_USER });
      });

      it(`should set reason to "${CLOSE_REASON_TIMEOUT}" when alert closed by timeout`, async () => {
        const el = await fixture(html`<alert-element open duration="100"></alert-element>`);
        const hideEvent = oneEvent(el, EVENT_ALERT_HIDE);
        const afterHideEvent = oneEvent(el, EVENT_ALERT_AFTER_HIDE);
        expect((await hideEvent).detail).to.deep.equal({ reason: CLOSE_REASON_TIMEOUT });
        expect((await afterHideEvent).detail).to.deep.equal({ reason: CLOSE_REASON_TIMEOUT });
      });

      it(`should set reason to "${CLOSE_REASON_API}" when alert closed by API`, async () => {
        const el = await fixture(html`<alert-element open></alert-element>`);
        const hideEvent = oneEvent(el, EVENT_ALERT_HIDE);
        const afterHideEvent = oneEvent(el, EVENT_ALERT_AFTER_HIDE);
        await el.hide();
        expect((await hideEvent).detail).to.deep.equal({ reason: CLOSE_REASON_API });
        expect((await afterHideEvent).detail).to.deep.equal({ reason: CLOSE_REASON_API });
      });
    });
  });

  describe('methods', () => {
    it('should show alert when calling "show()" method', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      await el.show();
      expect(el.open).to.be.true;
    });

    it(`should not fire "${EVENT_ALERT_SHOW}" when alert is already open`, async () => {
      const el = await fixture(html`<alert-element open></alert-element>`);
      const listener = sinon.spy();
      el.addEventListener(EVENT_ALERT_SHOW, listener);
      await el.show(); // Call show() while alert is already open
      expect(listener).to.not.have.been.called;
    });

    it('should hide alert when calling "hide()" method', async () => {
      const el = await fixture(html`<alert-element open></alert-element>`);
      await el.hide();
      expect(el.open).to.be.false;
    });

    it(`should not fire "${EVENT_ALERT_HIDE}" when alert is already closed`, async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      const listener = sinon.spy();
      el.addEventListener(EVENT_ALERT_HIDE, listener);
      await el.hide(); // Call show() while alert is already open
      expect(listener).to.not.have.been.called;
    });
  });

  describe('mouse events', () => {
    it('should prevent auto-hide on mouse enter and resume on mouse out', async () => {
      const DURATION = 100;
      const el = await fixture(html`<alert-element open duration="${DURATION}"></alert-element>`);
      el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true })); // Simulate mouseenter (pause auto-hide)
      await new Promise(resolve => setTimeout(resolve, DURATION + 50)); // Wait longer than the duration to verify it didn't auto-close
      expect(el.open).to.be.true;
      const hideEvent = oneEvent(el, EVENT_ALERT_AFTER_HIDE);
      el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true })); // Resume auto-hide by simulating mouseleave
      await hideEvent;
      expect(el.open).to.be.false;
    });
  });

  describe('duration', () => {
    it('should hide alert after duration expires', async () => {
      const el = await fixture(html`<alert-element open></alert-element>`);
      expect(el.open).to.be.true;
      el.duration = 100;
      await oneEvent(el, EVENT_ALERT_AFTER_HIDE);
      expect(el.open).to.be.false;
    });
  });

  describe('closable', () => {
    it('should close alert when clicking on close button', async () => {
      const el = await fixture(html`<alert-element closable></alert-element>`);
      el.setAttribute('open', '');
      const closeButton = el.shadowRoot.querySelector('.alert__close');
      closeButton.click();
      expect(el.open).to.be.false;
    });

    it('should not close alert when clicking on close button if closable is false', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.setAttribute('open', '');
      const closeButton = el.shadowRoot.querySelector('.alert__close');
      closeButton.click();
      expect(el.open).to.be.true;
    });
  });

  describe('toast', () => {
    it('toast alert and hide it manually', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.toast();
      expect(el.open).to.be.true;
      expect([...el.parentElement.classList]).to.include('alert-toast-stack');
      el.open = false;
      expect(el.open).to.be.false;
      await oneEvent(el, EVENT_ALERT_AFTER_HIDE);
      expect(document.querySelector('.alert-toast-stack')).to.be.null;
    });

    it('toast alert and hide it automatically after duration expires', async () => {
      const el = await fixture(html`<alert-element duration="100"></alert-element>`);
      el.toast();
      expect(el.open).to.be.true;
      expect([...el.parentElement.classList]).to.include('alert-toast-stack');
      await oneEvent(el, EVENT_ALERT_AFTER_HIDE);
      expect(el.open).to.be.false;
      expect(document.querySelector('.alert-toast-stack')).to.be.null;
    });
  });

  describe('command events', () => {
    it(`should open alert on "${COMMAND_ALERT_SHOW}" command`, async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      const afterShowEvent = oneEvent(el, EVENT_ALERT_AFTER_SHOW);
      const commandEvent = new Event('command', { bubbles: true, composed: true });
      Object.defineProperty(commandEvent, 'command', { value: COMMAND_ALERT_SHOW });
      el.dispatchEvent(commandEvent);
      await afterShowEvent;
      expect(el.open).to.be.true;
    });

    it(`should close alert on "${COMMAND_ALERT_HIDE}" command`, async () => {
      const el = await fixture(html`<alert-element open></alert-element>`);
      const afterHideEvent = oneEvent(el, EVENT_ALERT_AFTER_HIDE);
      const commandEvent = new Event('command', { bubbles: true, composed: true });
      Object.defineProperty(commandEvent, 'command', { value: COMMAND_ALERT_HIDE });
      el.dispatchEvent(commandEvent);
      await afterHideEvent;
      expect(el.open).to.be.false;
    });
  });
});
