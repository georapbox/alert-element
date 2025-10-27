/*!
 * @georapbox/alert-element
 * A custom HTML element for displaying dismissible alerts and toast notifications
 *
 * @version 1.2.0
 * @homepage https://github.com/georapbox/alert-element#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
function u(){let o=Object.assign(document.createElement("div"),{className:"alert-toast-stack"}),t=o.attachShadow({mode:"open"}),e=`
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
  `,o}function m(){return"performance"in window?window.performance.now():Date.now()}function w(o){o._started!==!1&&(o._time=o._time+m()-o._now,o.stop().start(),typeof o._callback=="function"&&o._callback(o))}var l=class{constructor(t,e,s){if(typeof t!="number"||Number.isNaN(t))throw new TypeError('Expected a number for "elapsedTime"');if(typeof e!="number"||Number.isNaN(e))throw new TypeError('Expected a number for "duration"');this._started=!1,this._now=0,this._elapsedTime=t,this._duration=e,this._callback=s,this._duration<0&&(this._duration=0),this._elapsedTime>this._duration&&(this._elapsedTime=this._duration),this._elapsedTime<0&&(this._elapsedTime=0),this._time=this._elapsedTime}time(){return{remaining:Math.max(0,this._duration-this._time),elapsed:this._time}}start(){return this._started||this._duration>=0&&this._time>this._duration?this:(this._started=!0,this._now=m(),window.requestAnimationFrame(w.bind(this,this)),this)}stop(){return this._started=!1,this}reset(){return this._started=!1,this._time=this._elapsedTime,this._now=0,this}isRunning(){return this._started}};var b="alert-element",g="alert-show",f="alert-after-show",_="alert-hide",c="alert-after-hide",E="--alert-show",y="--alert-hide",A="user",k="timeout",d="api",L=String.raw,T=String.raw,r=u(),S=T`
  :host {
    --alert-border-radius: 0.25rem;
    --alert-top-border-width: 0.1875rem;
    --alert-countdown-height: 0.1875rem;
    --alert-fg-color: #3f3f46;
    --alert-bg-color: #ffffff;
    --alert-border-color: #e4e4e7;
    --alert-base-variant-color: var(--alert-fg-color);
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

  :host([variant='info']) {
    --alert-base-variant-color: var(--alert-info-variant-color);
  }
  :host([variant='success']) {
    --alert-base-variant-color: var(--alert-success-variant-color);
  }
  :host([variant='neutral']) {
    --alert-base-variant-color: var(--alert-neutral-variant-color);
  }
  :host([variant='warning']) {
    --alert-base-variant-color: var(--alert-warning-variant-color);
  }
  :host([variant='danger']) {
    --alert-base-variant-color: var(--alert-danger-variant-color);
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
    border-top-color: var(--alert-base-variant-color);
    border-radius: var(--alert-border-radius);
    overflow: hidden;
    background-color: var(--alert-bg-color);
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--alert-base-variant-color);
    font-size: inherit;
    line-height: 0;
  }

  .alert__icon ::slotted(*) {
    margin-inline-start: 1rem;
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
    background-color: var(--alert-base-variant-color);
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
`;var p=class o extends HTMLElement{#l=!1;#t=null;#i=null;#n=null;#s=null;#u;static customAnimations;#r=d;#e=null;#h=null;#c=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(v.content.cloneNode(!0))}static get observedAttributes(){return["open","duration","close-label","announce","countdown"]}attributeChangedCallback(t,e,s){if(!(!this.#l||e===s))switch(t){case"open":this.open?(this.duration!==1/0&&this.#e?.start(),this.#t?.removeAttribute("hidden"),this.#a(g),this.#E(this.#t)?.finished.finally(()=>{this.#a(f)})):(this.duration!==1/0&&this.#e?.reset(),this.#a(_,{reason:this.#r}),this.#y(this.#t)?.finished.finally(()=>{this.#t?.setAttribute("hidden",""),this.#a(c,{reason:this.#r}),this.#r=d}));break;case"duration":this.#e?.reset(),this.#e=new l(0,this.duration,this.#m),this.open&&this.duration!==1/0&&this.#e.start();break;case"close-label":this.#d();break;case"announce":this.announce!=="none"?this.#t?.setAttribute("role",this.announce):this.#t?.removeAttribute("role");break;case"countdown":this.#h?.toggleAttribute("hidden",!this.countdown);break;default:break}}get closable(){return this.hasAttribute("closable")}set closable(t){this.toggleAttribute("closable",!!t)}get open(){return this.hasAttribute("open")}set open(t){this.toggleAttribute("open",!!t)}get duration(){let t=this.getAttribute("duration");if(t===null)return 1/0;let e=Number(t);return Number.isNaN(e)?1/0:e}set duration(t){this.setAttribute("duration",t!=null?t.toString():t)}get variant(){return this.getAttribute("variant")||""}set variant(t){this.setAttribute("variant",t)}get closeLabel(){return this.getAttribute("close-label")||"Close"}set closeLabel(t){this.setAttribute("close-label",t!=null?t.toString():t)}get announce(){let t=this.getAttribute("announce");return t==="alert"||t==="status"||t==="none"?t:"alert"}set announce(t){this.setAttribute("announce",t!=null?t.toString():t)}get countdown(){return this.hasAttribute("countdown")}set countdown(t){this.toggleAttribute("countdown",!!t)}get customAnimations(){return this.#u}set customAnimations(t){this.#u=t}connectedCallback(){this.#o("closable"),this.#o("open"),this.#o("duration"),this.#o("variant"),this.#o("closeLabel"),this.#o("announce"),this.#o("countdown"),this.#o("customAnimations"),this.#t=this.shadowRoot?.querySelector(".alert")??null,this.#i=this.shadowRoot?.querySelector(".alert__close")??null,this.#n=this.shadowRoot?.querySelector('slot[name="close"]')??null,this.#h=this.shadowRoot?.querySelector(".alert__countdown")??null,this.#c=this.shadowRoot?.querySelector(".alert__countdown-elapsed")??null,this.#i?.addEventListener("click",this.#b),this.#n?.addEventListener("slotchange",this.#v),this.addEventListener("mouseenter",this.#f),this.addEventListener("mouseleave",this.#p),this.addEventListener("command",this.#w),this.#e=new l(0,this.duration,this.#m),this.open?(this.duration!==1/0&&this.#e?.start(),this.#t?.removeAttribute("hidden")):this.#t?.setAttribute("hidden",""),this.closeLabel&&this.#d(),this.announce!=="none"?this.#t?.setAttribute("role",this.announce):this.#t?.removeAttribute("role"),this.#h?.toggleAttribute("hidden",!this.countdown),this.#l=!0}disconnectedCallback(){this.#l=!1,this.#e?.reset(),this.#e=null,this.#i?.removeEventListener("click",this.#b),this.#n?.removeEventListener("slotchange",this.#v),this.removeEventListener("mouseenter",this.#f),this.removeEventListener("mouseleave",this.#p),this.removeEventListener("command",this.#w)}connectedMoveCallback(){}#m=t=>{let{remaining:e}=t.time();this.#c!=null&&(this.#c.style.width=`${e/this.duration*100}%`),e<=0&&(this.#r=k,this.open=!1)};#b=()=>{this.closable&&(this.#r=A,this.open=!1)};#f=()=>{this.open&&this.duration!==1/0&&this.#e?.stop()};#p=()=>{this.open&&this.duration!==1/0&&this.#e?.start()};#v=()=>{this.#d()};#w=t=>{switch(t.command){case E:this.open=!0;break;case y:this.#r=d,this.open=!1;break;default:break}};#d(){if(!this.#i)return;(this.#n?.assignedElements()||[])?.some(s=>s.textContent?.replace(/\s/g,"")!=="")?this.#i.removeAttribute("aria-label"):this.#i.setAttribute("aria-label",this.closeLabel)}#g(){let t=window.matchMedia("(prefers-reduced-motion: reduce)").matches,e={show:{keyframes:[{opacity:0,transform:"scale(0.9)"},{opacity:1,transform:"scale(1)"}],options:{duration:250,easing:"ease"}},hide:{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.9)"}],options:{duration:250,easing:"ease"}}},s=this.customAnimations||o.customAnimations||{},i=n=>{let a=s[n]?.options??{},h=e[n].options;return{...h,...a,duration:t||this.customAnimations===null||o.customAnimations===null?0:a.duration??h.duration}};return{show:{keyframes:s.show?.keyframes??e.show.keyframes,options:i("show")},hide:{keyframes:s.hide?.keyframes??e.hide.keyframes,options:i("hide")}}}#E(t){let{keyframes:e,options:s}=this.#g().show;return t?.animate(e,s)}#y(t){let{keyframes:e,options:s}=this.#g().hide;return t?.animate(e,s)}#a(t,e=null){let s={bubbles:!0,composed:!0,detail:e},i=new CustomEvent(t,s);this.dispatchEvent(i)}#_(t,e){return new Promise(s=>{let i=n=>{n.target===t&&s()};t.addEventListener(e,i,{once:!0})})}show(){return this.open?Promise.resolve():(this.open=!0,this.#_(this,f))}hide(){return this.open?(this.open=!1,this.#_(this,c)):Promise.resolve()}toast(t={}){if(t={...{forceRestart:!1},...t},this.#s){if(!t.forceRestart)return this.#s.promise;this.#s.resolve(),this.#s.cleanup()}let s=()=>{},i=new Promise(h=>s=h),n=()=>{this.#s?.resolve(),this.#s?.cleanup()};this.#s={promise:i,resolve:s,cleanup:()=>{this.removeEventListener(c,n),this.parentNode===r&&r.removeChild(this),r.querySelector(b)||r.remove(),this.open=!1,this.#s=null}},r.parentElement||document.body.append(r),r.appendChild(this),this.#t?.setAttribute("data-toast",""),this.open=!0;let a=r.shadowRoot?.querySelector(".stack");return a?.scrollTo({top:a.scrollHeight}),this.addEventListener(c,n,{once:!0}),i}#o(t){let e=this;if(Object.prototype.hasOwnProperty.call(e,t)){let s=e[t];delete e[t],e[t]=s}}static defineCustomElement(t=b){typeof window<"u"&&!window.customElements.get(t)&&window.customElements.define(t,o)}};export{p as AlertElement,d as CLOSE_REASON_API,k as CLOSE_REASON_TIMEOUT,A as CLOSE_REASON_USER,y as COMMAND_ALERT_HIDE,E as COMMAND_ALERT_SHOW,c as EVENT_ALERT_AFTER_HIDE,f as EVENT_ALERT_AFTER_SHOW,_ as EVENT_ALERT_HIDE,g as EVENT_ALERT_SHOW};
