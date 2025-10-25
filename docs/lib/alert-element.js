/*!
 * @georapbox/alert-element
 * A custom HTML element for displaying dismissible alerts and toast notifications
 *
 * @version 1.2.0
 * @homepage https://github.com/georapbox/alert-element#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
function u(){let r=Object.assign(document.createElement("div"),{className:"alert-toast-stack"}),t=r.attachShadow({mode:"open"}),e=`
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
  `,r}function m(){return"performance"in window?window.performance.now():Date.now()}function g(r){r._started!==!1&&(r._time=r._time+m()-r._now,r.stop().start(),typeof r._callback=="function"&&r._callback(r))}var l=class{constructor(t,e,o){if(typeof t!="number"||Number.isNaN(t))throw new TypeError('Expected a number for "elapsedTime"');if(typeof e!="number"||Number.isNaN(e))throw new TypeError('Expected a number for "duration"');this._started=!1,this._now=0,this._elapsedTime=t,this._duration=e,this._callback=o,this._duration<0&&(this._duration=0),this._elapsedTime>this._duration&&(this._elapsedTime=this._duration),this._elapsedTime<0&&(this._elapsedTime=0),this._time=this._elapsedTime}time(){return{remaining:Math.max(0,this._duration-this._time),elapsed:this._time}}start(){return this._started||this._duration>=0&&this._time>this._duration?this:(this._started=!0,this._now=m(),window.requestAnimationFrame(g.bind(this,this)),this)}stop(){return this._started=!1,this}reset(){return this._started=!1,this._time=this._elapsedTime,this._now=0,this}isRunning(){return this._started}};var f="alert-element",w="alert-show",b="alert-after-show",_="alert-hide",h="alert-after-hide",E="--alert-show",y="--alert-hide",A="user",k="timeout",d="api",L=String.raw,T=String.raw,i=u(),S=T`
  :host {
    --alert-border-radius: 0.25rem;
    --alert-top-border-width: 0.1875rem;
    --alert-countdown-height: 0.1875rem;
    --alert-fg-color: #3f3f46;
    --alert-bg-color: #ffffff;
    --alert-border-color: #e4e4e7;
    --alert-info-variant-color: #0584c7;
    --alert-success-variant-color: #16a34a;
    --alert-neutral-variant-color: #52525b;
    --alert-warning-variant-color: #d87708;
    --alert-danger-variant-color: #dc2626;
    display: contents;
    box-sizing: border-box;
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
    position: relative;
    display: flex;
    align-items: center;
    margin: inherit;
    border: 1px solid var(--alert-border-color);
    border-top-width: var(--alert-top-border-width);
    border-top-color: var(--alert-fg-color);
    border-radius: var(--alert-border-radius);
    overflow: hidden;
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

  .alert:has(.alert__countdown:not([hidden])) .alert__message {
    padding-bottom: calc(1.25rem + var(--alert-countdown-height));
  }

  .alert__close {
    display: flex;
    align-items: center;
    margin-inline-end: 1rem;
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

  .alert__countdown {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--alert-countdown-height);
    background-color: var(--alert-border-color);
  }

  .alert__countdown-elapsed {
    width: 0;
    height: 100%;
    background-color: var(--alert-fg-color);
  }

  :host([variant='info']) .alert__countdown-elapsed {
    background-color: var(--alert-info-variant-color);
  }
  :host([variant='success']) .alert__countdown-elapsed {
    background-color: var(--alert-success-variant-color);
  }
  :host([variant='neutral']) .alert__countdown-elapsed {
    background-color: var(--alert-neutral-variant-color);
  }
  :host([variant='warning']) .alert__countdown-elapsed {
    background-color: var(--alert-warning-variant-color);
  }
  :host([variant='danger']) .alert__countdown-elapsed {
    background-color: var(--alert-danger-variant-color);
  }
`,v=document.createElement("template");v.innerHTML=L`
  <style>
    ${S}
  </style>

  <div class="alert" part="base" role="alert" hidden>
    <div class="alert__icon" part="icon">
      <slot name="icon"></slot>
    </div>
    <div class="alert__message" part="message"><slot></slot></div>
    <div class="alert__countdown" part="countdown" hidden>
      <div class="alert__countdown-elapsed" part="countdown-elapsed"></div>
    </div>
    <button type="button" class="alert__close" part="close" aria-label="Close">
      <slot name="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="currentColor"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
          />
        </svg>
      </slot>
    </button>
  </div>
`;var p=class r extends HTMLElement{#l=!1;#t=null;#s=null;#n=null;#o=null;#u;static customAnimations;#i=d;#e=null;#c=null;#h=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(v.content.cloneNode(!0))}static get observedAttributes(){return["open","duration","close-label","announce","countdown"]}attributeChangedCallback(t,e,o){if(!(!this.#l||e===o))switch(t){case"open":this.open?(this.duration!==1/0&&this.#e?.start(),this.#t?.removeAttribute("hidden"),this.#a(w),this.#E(this.#t)?.finished.finally(()=>{this.#a(b)})):(this.duration!==1/0&&this.#e?.reset(),this.#a(_,{reason:this.#i}),this.#y(this.#t)?.finished.finally(()=>{this.#t?.setAttribute("hidden",""),this.#a(h,{reason:this.#i}),this.#i=d}));break;case"duration":this.#e?.reset(),this.#e=new l(0,this.duration,this.#m),this.open&&this.duration!==1/0&&this.#e.start();break;case"close-label":this.#d();break;case"announce":this.announce!=="none"?this.#t?.setAttribute("role",this.announce):this.#t?.removeAttribute("role");break;case"countdown":this.#c?.toggleAttribute("hidden",!this.countdown);break;default:break}}get closable(){return this.hasAttribute("closable")}set closable(t){this.toggleAttribute("closable",!!t)}get open(){return this.hasAttribute("open")}set open(t){this.toggleAttribute("open",!!t)}get duration(){let t=this.getAttribute("duration");if(t===null)return 1/0;let e=Number(t);return Number.isNaN(e)?1/0:e}set duration(t){this.setAttribute("duration",t!=null?t.toString():t)}get variant(){return this.getAttribute("variant")||""}set variant(t){this.setAttribute("variant",t)}get closeLabel(){return this.getAttribute("close-label")||"Close"}set closeLabel(t){this.setAttribute("close-label",t!=null?t.toString():t)}get announce(){let t=this.getAttribute("announce");return t==="alert"||t==="status"||t==="none"?t:"alert"}set announce(t){this.setAttribute("announce",t!=null?t.toString():t)}get countdown(){return this.hasAttribute("countdown")}set countdown(t){this.toggleAttribute("countdown",!!t)}get customAnimations(){return this.#u}set customAnimations(t){this.#u=t}connectedCallback(){this.#l=!0,this.#r("closable"),this.#r("open"),this.#r("duration"),this.#r("variant"),this.#r("closeLabel"),this.#r("announce"),this.#r("countdown"),this.#r("customAnimations"),this.#t=this.shadowRoot?.querySelector(".alert")??null,this.#s=this.shadowRoot?.querySelector(".alert__close")??null,this.#n=this.shadowRoot?.querySelector('slot[name="close"]')??null,this.#c=this.shadowRoot?.querySelector(".alert__countdown")??null,this.#h=this.shadowRoot?.querySelector(".alert__countdown-elapsed")??null,this.#s?.addEventListener("click",this.#f),this.#n?.addEventListener("slotchange",this.#v),this.addEventListener("mouseenter",this.#b),this.addEventListener("mouseleave",this.#p),this.addEventListener("command",this.#g),this.#e=new l(0,this.duration,this.#m),this.open?(this.duration!==1/0&&this.#e?.start(),this.#t?.removeAttribute("hidden")):this.#t?.setAttribute("hidden",""),this.closeLabel&&this.#d(),this.announce!=="none"?this.#t?.setAttribute("role",this.announce):this.#t?.removeAttribute("role"),this.#c?.toggleAttribute("hidden",!this.countdown)}disconnectedCallback(){this.#l=!1,this.#e?.reset(),this.#e=null,this.#s?.removeEventListener("click",this.#f),this.#n?.removeEventListener("slotchange",this.#v),this.removeEventListener("mouseenter",this.#b),this.removeEventListener("mouseleave",this.#p),this.removeEventListener("command",this.#g)}#m=t=>{let{remaining:e}=t.time();this.#h!=null&&(this.#h.style.width=`${e/t._duration*100}%`),e<=0&&(this.#i=k,this.open=!1)};#f=()=>{this.closable&&(this.#i=A,this.open=!1)};#b=()=>{this.open&&this.duration!==1/0&&this.#e?.stop()};#p=()=>{this.open&&this.duration!==1/0&&this.#e?.start()};#v=()=>{this.#d()};#g=t=>{switch(t.command){case E:this.open=!0;break;case y:this.#i=d,this.open=!1;break;default:break}};#d(){if(!this.#s)return;(this.#n?.assignedElements()||[])?.some(o=>o.textContent?.replace(/\s/g,"")!=="")?this.#s.removeAttribute("aria-label"):this.#s.setAttribute("aria-label",this.closeLabel)}#w(){let t=window.matchMedia("(prefers-reduced-motion: reduce)").matches,e={show:{keyframes:[{opacity:0,transform:"scale(0.9)"},{opacity:1,transform:"scale(1)"}],options:{duration:250,easing:"ease"}},hide:{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.9)"}],options:{duration:250,easing:"ease"}}},o=this.customAnimations||r.customAnimations||{},s=n=>{let a=o[n]?.options??{},c=e[n].options;return{...c,...a,duration:t||this.customAnimations===null||r.customAnimations===null?0:a.duration??c.duration}};return{show:{keyframes:o.show?.keyframes??e.show.keyframes,options:s("show")},hide:{keyframes:o.hide?.keyframes??e.hide.keyframes,options:s("hide")}}}#E(t){let{keyframes:e,options:o}=this.#w().show;return t?.animate(e,o)}#y(t){let{keyframes:e,options:o}=this.#w().hide;return t?.animate(e,o)}#a(t,e=null){let o={bubbles:!0,composed:!0,detail:e},s=new CustomEvent(t,o);this.dispatchEvent(s)}#_(t,e){return new Promise(o=>{let s=n=>{n.target===t&&o()};t.addEventListener(e,s,{once:!0})})}show(){return this.open?Promise.resolve():(this.open=!0,this.#_(this,b))}hide(){return this.open?(this.open=!1,this.#_(this,h)):Promise.resolve()}toast(t={}){if(t={...{forceRestart:!1},...t},this.#o){if(!t.forceRestart)return this.#o.promise;this.#o.resolve(),this.#o.cleanup()}let o=()=>{},s=new Promise(c=>o=c),n=()=>{this.#o?.resolve(),this.#o?.cleanup()};this.#o={promise:s,resolve:o,cleanup:()=>{this.removeEventListener(h,n),this.parentNode===i&&i.removeChild(this),i.querySelector(f)||i.remove(),this.open=!1,this.#o=null}},i.parentElement||document.body.append(i),i.appendChild(this),this.#t?.setAttribute("data-toast",""),this.open=!0;let a=i.shadowRoot?.querySelector(".stack");return a?.scrollTo({top:a.scrollHeight}),this.addEventListener(h,n,{once:!0}),s}#r(t){let e=this;if(Object.prototype.hasOwnProperty.call(e,t)){let o=e[t];delete e[t],e[t]=o}}static defineCustomElement(t=f){typeof window<"u"&&!window.customElements.get(t)&&window.customElements.define(t,r)}};export{p as AlertElement,d as CLOSE_REASON_API,k as CLOSE_REASON_TIMEOUT,A as CLOSE_REASON_USER,y as COMMAND_ALERT_HIDE,E as COMMAND_ALERT_SHOW,h as EVT_ALERT_AFTER_HIDE,b as EVT_ALERT_AFTER_SHOW,_ as EVT_ALERT_HIDE,w as EVT_ALERT_SHOW};
