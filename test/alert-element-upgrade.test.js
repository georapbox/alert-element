import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { AlertElement } from '../src/alert-element.js';

describe('alert-element upgrading', () => {
  it('default properties', async () => {
    const el = await fixture(html`<alert-element></alert-element>`);

    // Update properties before upgrading
    el.closable = true;
    el.duration = 5000;
    el.open = true;
    el.variant = 'info';
    el.closeLabel = 'Close alert';
    el.announce = 'status';
    el.countdown = true;

    // Upgrade custom element
    AlertElement.defineCustomElement();

    await elementUpdated(el);

    expect(el.getAttribute('closable')).to.equal('');
    expect(el.getAttribute('duration')).to.equal('5000');
    expect(el.getAttribute('open')).to.equal('');
    expect(el.getAttribute('variant')).to.equal('info');
    expect(el.getAttribute('close-label')).to.equal('Close alert');
    expect(el.getAttribute('announce')).to.equal('status');
    expect(el.getAttribute('countdown')).to.equal('');
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
