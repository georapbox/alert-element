import { expect, fixture, fixtureCleanup, html, elementUpdated, aTimeout } from '@open-wc/testing';
import sinon from 'sinon';
import { AlertElement } from '../src/alert-element.js';

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

  describe('attributes - properties', () => {
    // closable
    it('reflects attribute "closable" to property "closable"', async () => {
      const el = await fixture(html`<alert-element closable></alert-element>`);
      expect(el.closable).to.be.true;
    });

    it('reflects property "closable" to attribute "closable"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.closable = true;
      await elementUpdated(el);
      expect(el.hasAttribute('closable')).to.be.true;
      el.closable = false;
      await elementUpdated(el);
      expect(el.hasAttribute('closable')).to.be.false;
    });

    // open
    it('reflects attribute "open" to property "open"', async () => {
      const el = await fixture(html`<alert-element open></alert-element>`);
      expect(el.open).to.be.true;
    });

    it('reflects property "open" to attribute "open"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.open = true;
      await elementUpdated(el);
      expect(el.hasAttribute('open')).to.be.true;
      el.open = false;
      await elementUpdated(el);
      expect(el.hasAttribute('open')).to.be.false;
    });

    // duration
    it('reflects attribute "duration" to property "duration"', async () => {
      const el = await fixture(html`<alert-element duration="3000"></alert-element>`);
      expect(el.duration).to.equal(3000);
    });

    it('reflects property "duration" to attribute "duration"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.duration = 3000;
      await elementUpdated(el);
      expect(el.getAttribute('duration')).to.equal('3000');
    });

    // variant
    it('reflects attribute "variant" to property "variant"', async () => {
      const el = await fixture(html`<alert-element variant="info"></alert-element>`);
      expect(el.variant).to.equal('info');
    });

    it('reflects property "variant" to attribute "variant"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.variant = 'info';
      await elementUpdated(el);
      expect(el.getAttribute('variant')).to.equal('info');
    });

    // close-label
    it('reflects attribute "close-label" to property "closeLabel"', async () => {
      const el = await fixture(html`<alert-element close-label="Close me"></alert-element>`);
      expect(el.closeLabel).to.equal('Close me');
    });

    it('reflects property "closeLabel" to attribute "close-label"', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.closeLabel = 'Close me';
      await elementUpdated(el);
      expect(el.getAttribute('close-label')).to.equal('Close me');
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
      await elementUpdated(el);
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
      await elementUpdated(el);
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
      await elementUpdated(el);
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
    it('should fire "alert-show" event', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      const spy = sinon.spy();
      el.addEventListener('alert-show', spy);
      el.setAttribute('open', '');
      expect(spy).to.have.been.called;
    });

    it('should fire "alert-hide" event', async () => {
      const el = await fixture(html`<alert-element open></alert-element>`);
      const spy = sinon.spy();
      el.addEventListener('alert-hide', spy);
      el.removeAttribute('open');
      expect(spy).to.have.been.called;
    });
  });

  describe('methods', () => {
    it('should show alert when calling "show()" method', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      aTimeout(100);
      el.show();
      await elementUpdated(el);
      expect(el.open).to.be.true;
    });

    it('should hide alert when calling "hide()" method', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.setAttribute('open', '');
      await elementUpdated(el);
      aTimeout(100);
      el.hide();
      await elementUpdated(el);
      expect(el.open).to.be.false;
    });
  });

  describe('mouse events', () => {
    it('should prevent auto-hide on mouse enter and resume on mouse out', async () => {
      const el = await fixture(html`<alert-element open duration="100"></alert-element>`);
      const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
      const mouseOutEvent = new MouseEvent('mouseleave', { bubbles: true });
      el.dispatchEvent(mouseEnterEvent);
      await aTimeout(200);
      expect(el.open).to.be.true;
      el.dispatchEvent(mouseOutEvent);
      await aTimeout(200);
      expect(el.open).to.be.false;
    });
  });

  describe('duration', () => {
    it('should hide alert after duration expires', async () => {
      const el = await fixture(html`<alert-element open duration="100"></alert-element>`);
      expect(el.open).to.be.true;
      await aTimeout(200);
      expect(el.open).to.be.false;
    });
  });

  describe('closable', () => {
    it('should close alert when clicking on close button', async () => {
      const el = await fixture(html`<alert-element closable></alert-element>`);
      el.setAttribute('open', '');
      await elementUpdated(el);
      const closeButton = el.shadowRoot.querySelector('.alert__close');
      closeButton.click();
      await elementUpdated(el);
      expect(el.open).to.be.false;
    });

    it('should not close alert when clicking on close button if closable is false', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.setAttribute('open', '');
      await elementUpdated(el);
      const closeButton = el.shadowRoot.querySelector('.alert__close');
      closeButton.click();
      await elementUpdated(el);
      expect(el.open).to.be.true;
    });
  });

  describe('toast', () => {
    it('toast alert and hide it manually', async () => {
      const el = await fixture(html`<alert-element></alert-element>`);
      el.toast();
      await elementUpdated(el);
      expect(el.open).to.be.true;
      expect([...el.parentElement.classList]).to.include('alert-toast-stack');
      el.open = false;
      await elementUpdated(el);
      expect(el.open).to.be.false;
      expect(document.querySelector('.alert-toast-stack')).to.be.null;
    });

    it('toast alert and hide it automatically after duration expires', async () => {
      const DURATION = 100;
      const el = await fixture(html`<alert-element duration="${DURATION}"></alert-element>`);
      el.toast();
      await elementUpdated(el);
      expect(el.open).to.be.true;
      expect([...el.parentElement.classList]).to.include('alert-toast-stack');
      await aTimeout(DURATION + 100); // wait for duration to expire + some buffer
      expect(el.open).to.be.false;
      expect(document.querySelector('.alert-toast-stack')).to.be.null;
    });
  });
});
