/*!
 * @georapbox/alert-element
 * A custom HTML element for displaying dismissible alerts and toast notifications
 *
 * @version 1.0.0
 * @homepage https://github.com/georapbox/alert-element#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
function m(){let a=Object.assign(document.createElement("div"),{className:"alert-toast-stack"}),t=a.attachShadow({mode:"open"}),e=`
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
  `;return t.innerHTML=`
    <style>${e}</style>
    <div class="stack" part="base"><slot></slot></div>
  `,a}var d="alert-element",f="alert-show",u="alert-after-show",p="alert-hide",l="alert-after-hide",v="--alert-show",b="--alert-hide",E="user",g="timeout",h="api";var r=m(),w=`
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
`,A=document.createElement("template");A.innerHTML=`
  <style>${w}</style>
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
`;var _=class a extends HTMLElement{#t=null;#o=null;#a=null;#n=void 0;#e=null;#u;static customAnimations;#s=h;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(A.content.cloneNode(!0))}static get observedAttributes(){return["open","duration","close-label"]}attributeChangedCallback(t,e,o){if(!(!this.isConnected||e===o))switch(t){case"open":this.#_();break;case"duration":this.#i(),this.#c()&&this.#l();break;case"close-label":this.#d();break;default:break}}get closable(){return this.hasAttribute("closable")}set closable(t){this.toggleAttribute("closable",!!t)}get open(){return this.hasAttribute("open")}set open(t){this.toggleAttribute("open",!!t)}get duration(){let t=this.getAttribute("duration");if(t===null)return 1/0;let e=Number(t);return Number.isNaN(e)?1/0:e}set duration(t){this.setAttribute("duration",t!=null?t.toString():t)}get variant(){return this.getAttribute("variant")||""}set variant(t){this.setAttribute("variant",t)}get closeLabel(){return this.getAttribute("close-label")||"Close"}set closeLabel(t){this.setAttribute("close-label",t!=null?t.toString():t)}get customAnimations(){return this.#u}set customAnimations(t){this.#u=t}connectedCallback(){this.#r("closable"),this.#r("open"),this.#r("duration"),this.#r("variant"),this.#r("closeLabel"),this.#r("customAnimations"),this.#t=this.shadowRoot?.querySelector(".alert")??null,this.#o=this.shadowRoot?.querySelector(".alert__close")??null,this.#a=this.shadowRoot?.querySelector('slot[name="close"]')??null,this.#o?.addEventListener("click",this.#m),this.#a?.addEventListener("slotchange",this.#v),this.addEventListener("mouseenter",this.#f),this.addEventListener("mouseleave",this.#p),this.addEventListener("command",this.#b),this.open?(this.#t?.removeAttribute("hidden"),this.#c()&&this.#l()):this.#t?.setAttribute("hidden",""),this.closeLabel&&this.#d()}disconnectedCallback(){this.#i(),this.#o?.removeEventListener("click",this.#m),this.#a?.removeEventListener("slotchange",this.#v),this.removeEventListener("mouseenter",this.#f),this.removeEventListener("mouseleave",this.#p),this.removeEventListener("command",this.#b)}#_(){this.#i(),this.open?(this.#c()&&this.#l(),this.#t?.removeAttribute("hidden"),this.#h(f),this.#A(this.#t)?.finished.finally(()=>{this.#h(u)})):(this.#h(p,{reason:this.#s}),this.#w(this.#t)?.finished.finally(()=>{this.#t?.setAttribute("hidden",""),this.#h(l,{reason:this.#s}),this.#s=h}))}#i(){this.#n!==void 0&&(clearTimeout(this.#n),this.#n=void 0)}#l(){this.#n=window.setTimeout(()=>{this.#s=g,this.open=!1},this.duration)}#c(){return this.open&&this.duration!==1/0}#m=()=>{this.closable&&(this.#s=E,this.open=!1)};#f=()=>{this.#i()};#p=()=>{this.#i(),this.#c()&&this.#l()};#v=()=>{this.#d()};#b=t=>{switch(t.command){case v:this.open=!0;break;case b:this.#s=h,this.open=!1;break;default:break}};#d(){if(!this.#o)return;(this.#a?.assignedElements()||[])?.some(o=>o.textContent?.replace(/\s/g,"")!=="")?this.#o.removeAttribute("aria-label"):this.#o.setAttribute("aria-label",this.closeLabel)}#E(){let t=window.matchMedia("(prefers-reduced-motion: reduce)").matches,e={show:{keyframes:[{opacity:0,transform:"scale(0.9)"},{opacity:1,transform:"scale(1)"}],options:{duration:250,easing:"ease"}},hide:{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.9)"}],options:{duration:250,easing:"ease"}}},o=this.customAnimations||a.customAnimations||{},s=i=>{let n=o[i]?.options??{},c=e[i].options;return{...c,...n,duration:t||this.customAnimations===null||a.customAnimations===null?0:n.duration??c.duration}};return{show:{keyframes:o.show?.keyframes??e.show.keyframes,options:s("show")},hide:{keyframes:o.hide?.keyframes??e.hide.keyframes,options:s("hide")}}}#A(t){let{keyframes:e,options:o}=this.#E().show;return t?.animate(e,o)}#w(t){let{keyframes:e,options:o}=this.#E().hide;return t?.animate(e,o)}#h(t,e=null){let o={bubbles:!0,composed:!0,detail:e},s=new CustomEvent(t,o);this.dispatchEvent(s)}#g(t,e){return new Promise(o=>{let s=i=>{i.target===t&&o()};t.addEventListener(e,s,{once:!0})})}show(){return this.open?Promise.resolve():(this.open=!0,this.#g(this,u))}hide(){return this.open?(this.open=!1,this.#g(this,l)):Promise.resolve()}toast(t={}){if(t={...{forceRestart:!1},...t},this.#e){if(!t.forceRestart)return this.#e.promise;this.#e.resolve(),this.#e.cleanup()}let o=()=>{},s=new Promise(c=>o=c),i=()=>{this.#e?.resolve(),this.#e?.cleanup()};this.#e={promise:s,resolve:o,cleanup:()=>{this.removeEventListener(l,i),this.parentNode===r&&r.removeChild(this),r.querySelector(d)||r.remove(),this.open=!1,this.#e=null}},r.parentElement||document.body.append(r),r.appendChild(this),this.#t?.setAttribute("data-toast",""),this.open=!0;let n=r.shadowRoot?.querySelector(".stack");return n?.scrollTo({top:n.scrollHeight}),this.addEventListener(l,i,{once:!0}),s}#r(t){let e=this;if(Object.prototype.hasOwnProperty.call(e,t)){let o=e[t];delete e[t],e[t]=o}}static defineCustomElement(t=d){typeof window<"u"&&!window.customElements.get(t)&&window.customElements.define(t,a)}};export{_ as AlertElement};
