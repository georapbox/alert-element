/*!
 * @georapbox/alert-element
 * A custom HTML element for displaying dismissible alerts and toast notifications
 *
 * @version 1.1.0
 * @homepage https://github.com/georapbox/alert-element#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
function m(){let n=Object.assign(document.createElement("div"),{className:"alert-toast-stack"}),t=n.attachShadow({mode:"open"}),e=`
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
  `,n}var h="alert-element",f="alert-show",d="alert-after-show",b="alert-hide",l="alert-after-hide",p="--alert-show",v="--alert-hide",g="user",E="timeout";var r=m(),w=`
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
`,_=document.createElement("template");_.innerHTML=`
  <style>${w}</style>
  <div class="alert" part="base" role="alert" hidden>
    <div class="alert__icon" part="icon">
      <slot name="icon"></slot>
    </div>
    <div class="alert__message" part="message">
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
`;var A=class n extends HTMLElement{#t=null;#s=null;#n=null;#a=void 0;#e=null;#u;static customAnimations;#r="api";constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(_.content.cloneNode(!0))}static get observedAttributes(){return["open","duration","close-label","announce"]}attributeChangedCallback(t,e,o){if(!(!this.isConnected||e===o))switch(t){case"open":this.#A();break;case"duration":this.#i(),this.#c()&&this.#l();break;case"close-label":this.#d();break;case"announce":this.announce!=="none"?this.#t?.setAttribute("role",this.announce):this.#t?.removeAttribute("role");break;default:break}}get closable(){return this.hasAttribute("closable")}set closable(t){this.toggleAttribute("closable",!!t)}get open(){return this.hasAttribute("open")}set open(t){this.toggleAttribute("open",!!t)}get duration(){let t=this.getAttribute("duration");if(t===null)return 1/0;let e=Number(t);return Number.isNaN(e)?1/0:e}set duration(t){this.setAttribute("duration",t!=null?t.toString():t)}get variant(){return this.getAttribute("variant")||""}set variant(t){this.setAttribute("variant",t)}get closeLabel(){return this.getAttribute("close-label")||"Close"}set closeLabel(t){this.setAttribute("close-label",t!=null?t.toString():t)}get announce(){let t=this.getAttribute("announce");return t==="alert"||t==="status"||t==="none"?t:"alert"}set announce(t){this.setAttribute("announce",t!=null?t.toString():t)}get customAnimations(){return this.#u}set customAnimations(t){this.#u=t}connectedCallback(){this.#o("closable"),this.#o("open"),this.#o("duration"),this.#o("variant"),this.#o("closeLabel"),this.#o("announce"),this.#o("customAnimations"),this.#t=this.shadowRoot?.querySelector(".alert")??null,this.#s=this.shadowRoot?.querySelector(".alert__close")??null,this.#n=this.shadowRoot?.querySelector('slot[name="close"]')??null,this.#s?.addEventListener("click",this.#m),this.#n?.addEventListener("slotchange",this.#p),this.addEventListener("mouseenter",this.#f),this.addEventListener("mouseleave",this.#b),this.addEventListener("command",this.#v),this.open?(this.#t?.removeAttribute("hidden"),this.#c()&&this.#l()):this.#t?.setAttribute("hidden",""),this.closeLabel&&this.#d(),this.announce!=="none"?this.#t?.setAttribute("role",this.announce):this.#t?.removeAttribute("role")}disconnectedCallback(){this.#i(),this.#s?.removeEventListener("click",this.#m),this.#n?.removeEventListener("slotchange",this.#p),this.removeEventListener("mouseenter",this.#f),this.removeEventListener("mouseleave",this.#b),this.removeEventListener("command",this.#v)}#A(){this.#i(),this.open?(this.#c()&&this.#l(),this.#t?.removeAttribute("hidden"),this.#h(f),this.#_(this.#t)?.finished.finally(()=>{this.#h(d)})):(this.#h(b,{reason:this.#r}),this.#w(this.#t)?.finished.finally(()=>{this.#t?.setAttribute("hidden",""),this.#h(l,{reason:this.#r}),this.#r="api"}))}#i(){this.#a!==void 0&&(clearTimeout(this.#a),this.#a=void 0)}#l(){this.#a=window.setTimeout(()=>{this.#r=E,this.open=!1},this.duration)}#c(){return this.open&&this.duration!==1/0}#m=()=>{this.closable&&(this.#r=g,this.open=!1)};#f=()=>{this.#i()};#b=()=>{this.#i(),this.#c()&&this.#l()};#p=()=>{this.#d()};#v=t=>{switch(t.command){case p:this.open=!0;break;case v:this.#r="api",this.open=!1;break;default:break}};#d(){if(!this.#s)return;(this.#n?.assignedElements()||[])?.some(o=>o.textContent?.replace(/\s/g,"")!=="")?this.#s.removeAttribute("aria-label"):this.#s.setAttribute("aria-label",this.closeLabel)}#g(){let t=window.matchMedia("(prefers-reduced-motion: reduce)").matches,e={show:{keyframes:[{opacity:0,transform:"scale(0.9)"},{opacity:1,transform:"scale(1)"}],options:{duration:250,easing:"ease"}},hide:{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.9)"}],options:{duration:250,easing:"ease"}}},o=this.customAnimations||n.customAnimations||{},s=i=>{let a=o[i]?.options??{},c=e[i].options;return{...c,...a,duration:t||this.customAnimations===null||n.customAnimations===null?0:a.duration??c.duration}};return{show:{keyframes:o.show?.keyframes??e.show.keyframes,options:s("show")},hide:{keyframes:o.hide?.keyframes??e.hide.keyframes,options:s("hide")}}}#_(t){let{keyframes:e,options:o}=this.#g().show;return t?.animate(e,o)}#w(t){let{keyframes:e,options:o}=this.#g().hide;return t?.animate(e,o)}#h(t,e=null){let o={bubbles:!0,composed:!0,detail:e},s=new CustomEvent(t,o);this.dispatchEvent(s)}#E(t,e){return new Promise(o=>{let s=i=>{i.target===t&&o()};t.addEventListener(e,s,{once:!0})})}show(){return this.open?Promise.resolve():(this.open=!0,this.#E(this,d))}hide(){return this.open?(this.open=!1,this.#E(this,l)):Promise.resolve()}toast(t={}){if(t={...{forceRestart:!1},...t},this.#e){if(!t.forceRestart)return this.#e.promise;this.#e.resolve(),this.#e.cleanup()}let o=()=>{},s=new Promise(c=>o=c),i=()=>{this.#e?.resolve(),this.#e?.cleanup()};this.#e={promise:s,resolve:o,cleanup:()=>{this.removeEventListener(l,i),this.parentNode===r&&r.removeChild(this),r.querySelector(h)||r.remove(),this.open=!1,this.#e=null}},r.parentElement||document.body.append(r),r.appendChild(this),this.#t?.setAttribute("data-toast",""),this.open=!0;let a=r.shadowRoot?.querySelector(".stack");return a?.scrollTo({top:a.scrollHeight}),this.addEventListener(l,i,{once:!0}),s}#o(t){let e=this;if(Object.prototype.hasOwnProperty.call(e,t)){let o=e[t];delete e[t],e[t]=o}}static defineCustomElement(t=h){typeof window<"u"&&!window.customElements.get(t)&&window.customElements.define(t,n)}};export{A as AlertElement};
