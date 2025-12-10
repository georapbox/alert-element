/*!
 * @georapbox/alert-element
 * A custom HTML element for displaying dismissible alerts and toast notifications.
 *
 * @version 1.2.1
 * @homepage https://github.com/georapbox/alert-element#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
var g=String.raw;function m(){let o=Object.assign(document.createElement("div"),{className:"alert-toast-stack"}),t=o.attachShadow({mode:"open"});return t.innerHTML=g`
    <style>
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
    </style>

    <div class="stack" part="base"><slot></slot></div>
  `,o}var l=class o extends EventTarget{#i=!1;#t=0;#e=0;#a=0;#n=0;#l=0;constructor(t){super();let s={...{elapsed:0,duration:1/0},...t},{elapsed:i,duration:n}=s;if(typeof i!="number"||Number.isNaN(i))throw new TypeError("elapsed option must be a number");if(typeof n!="number"||Number.isNaN(n))throw new TypeError("duration option must be a number");this.#i=!1,this.#t=Math.max(0,n),this.#e=Math.min(Math.max(0,i),this.#t),this.#a=this.#e,this.#n=0,this.#l=this.#e}#o(t){this.dispatchEvent(new Event(t))}#s=()=>{if(!this.#i)return;let t=o.now()-this.#n+this.#l;this.#e=Math.min(t,this.#t),this.#o("tick"),t<this.#t?requestAnimationFrame(this.#s):(this.#i=!1,this.#l=this.#e,this.#o("finish"))};on(t,e,s){return this.addEventListener(t,e,s),this}off(t,e,s){return this.removeEventListener(t,e,s),this}start(){return this.#i||this.#e>=this.#t?this:(this.#i=!0,this.#n=o.now(),this.#o("start"),requestAnimationFrame(this.#s),this)}stop(){return this.#i?(this.#i=!1,this.#l=this.#e,this.#o("stop"),this):this}reset(){return this.#i=!1,this.#e=this.#a,this.#l=this.#a,this.#n=0,this.#o("reset"),this}time(){return{elapsed:this.#e,remaining:this.remaining}}get elapsed(){return this.#e}get remaining(){return Math.max(0,this.#t-this.#e)}get running(){return this.#i}static now(){return"performance"in window?performance.now():Date.now()}};var f="alert-element",w="alert-show",b="alert-after-show",E="alert-hide",c="alert-after-hide",A="--alert-show",y="--alert-hide",k="user",_="timeout",d="api",L=String.raw,S=String.raw,r=m(),T=S`
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

  :host([countdown]) .alert {
    padding-bottom: var(--alert-countdown-height);
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
    overflow: hidden;
    width: 100%;
    height: var(--alert-countdown-height);
    background-color: var(--alert-border-color);
  }

  .alert__countdown-elapsed {
    width: 100%;
    height: 100%;
    background-color: var(--alert-base-variant-color);
  }
`,v=document.createElement("template");v.innerHTML=L`
  <style>
    ${T}
  </style>

  <div class="alert" part="base" role="alert" hidden>
    <div class="alert__icon" part="icon">
      <slot name="icon"></slot>
    </div>
    <div class="alert__message" part="message"><slot></slot></div>
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
    <div class="alert__countdown" part="countdown" hidden>
      <div class="alert__countdown-elapsed" part="countdown-elapsed"></div>
    </div>
  </div>
`;var p=class o extends HTMLElement{#i=!1;#t=null;#e=null;#a=null;#n=null;#l;static customAnimations;#o=d;#s=null;#b=null;#h=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(v.content.cloneNode(!0))}static get observedAttributes(){return["open","duration","close-label","announce","countdown"]}attributeChangedCallback(t,e,s){if(!(!this.#i||e===s))switch(t){case"open":this.open?(this.duration!==1/0&&this.#s?.start(),this.#t?.removeAttribute("hidden"),this.#h?.style.setProperty("width","100%"),this.#f(w),this.#k(this.#t)?.finished.finally(()=>{this.#f(b)})):(this.duration!==1/0&&this.#s?.reset(),this.#f(E,{reason:this.#o}),this.#_(this.#t)?.finished.finally(()=>{this.#t?.setAttribute("hidden",""),this.#f(c,{reason:this.#o}),this.#o=d}));break;case"duration":this.#s?.stop().off("tick",this.#c).off("finish",this.#d),this.#s=new l({duration:this.duration}).on("tick",this.#c).on("finish",this.#d),this.open&&this.duration!==1/0&&!this.#y()&&this.#s.start(),this.duration===1/0&&this.#h?.style.setProperty("width","100%");break;case"close-label":this.#p();break;case"announce":this.announce!=="none"?this.#t?.setAttribute("role",this.announce):this.#t?.removeAttribute("role");break;case"countdown":this.#b?.toggleAttribute("hidden",!this.countdown);break;default:break}}get closable(){return this.hasAttribute("closable")}set closable(t){this.toggleAttribute("closable",!!t)}get open(){return this.hasAttribute("open")}set open(t){this.toggleAttribute("open",!!t)}get duration(){let t=this.getAttribute("duration");if(t===null||t==="")return 1/0;let e=Number(t);return e<=0?10:Number.isNaN(e)?1/0:e}set duration(t){this.setAttribute("duration",t!=null?t.toString():t)}get variant(){return this.getAttribute("variant")||""}set variant(t){this.setAttribute("variant",t)}get closeLabel(){return this.getAttribute("close-label")||"Close"}set closeLabel(t){this.setAttribute("close-label",t!=null?t.toString():t)}get announce(){let t=this.getAttribute("announce");return t==="alert"||t==="status"||t==="none"?t:"alert"}set announce(t){this.setAttribute("announce",t!=null?t.toString():t)}get countdown(){return this.hasAttribute("countdown")}set countdown(t){this.toggleAttribute("countdown",!!t)}get noAnimations(){return this.hasAttribute("no-animations")}set noAnimations(t){this.toggleAttribute("no-animations",!!t)}get customAnimations(){return this.#l}set customAnimations(t){this.#l=t}connectedCallback(){this.#r("closable"),this.#r("open"),this.#r("duration"),this.#r("variant"),this.#r("closeLabel"),this.#r("announce"),this.#r("countdown"),this.#r("noAnimations"),this.#r("customAnimations"),this.#t=this.shadowRoot?.querySelector(".alert")??null,this.#e=this.shadowRoot?.querySelector(".alert__close")??null,this.#a=this.shadowRoot?.querySelector('slot[name="close"]')??null,this.#b=this.shadowRoot?.querySelector(".alert__countdown")??null,this.#h=this.shadowRoot?.querySelector(".alert__countdown-elapsed")??null,this.#e?.addEventListener("click",this.#v),this.#a?.addEventListener("slotchange",this.#g),this.addEventListener("mouseenter",this.#u),this.addEventListener("mouseleave",this.#m),this.addEventListener("focusin",this.#u),this.addEventListener("focusout",this.#m),this.addEventListener("command",this.#w),this.#s=new l({duration:this.duration}).on("tick",this.#c).on("finish",this.#d),this.open?(this.duration!==1/0&&this.#s?.start(),this.#t?.removeAttribute("hidden")):this.#t?.setAttribute("hidden",""),this.closeLabel&&this.#p(),this.announce!=="none"?this.#t?.setAttribute("role",this.announce):this.#t?.removeAttribute("role"),this.#b?.toggleAttribute("hidden",!this.countdown),this.#i=!0}disconnectedCallback(){this.#i=!1,this.#s?.stop().off("tick",this.#c).off("finish",this.#d),this.#s=null,this.#e?.removeEventListener("click",this.#v),this.#a?.removeEventListener("slotchange",this.#g),this.removeEventListener("mouseenter",this.#u),this.removeEventListener("mouseleave",this.#m),this.removeEventListener("focusin",this.#u),this.removeEventListener("focusout",this.#m),this.removeEventListener("command",this.#w)}connectedMoveCallback(){}#c=t=>{if(!this.countdown||!this.#h)return;let{remaining:e}=t.currentTarget;this.#h.style.width=`${e/this.duration*100}%`};#d=()=>{this.#o=_,this.open=!1};#v=()=>{this.closable&&(this.#o=k,this.open=!1)};#u=()=>{!this.open||this.duration===1/0||this.#s?.stop()};#m=()=>{!this.open||this.duration===1/0||this.#y()||this.#s?.start()};#g=()=>{this.#p()};#w=t=>{switch(t.command){case A:this.open=!0;break;case y:this.#o=d,this.open=!1;break;default:break}};#p(){if(!this.#e)return;(this.#a?.assignedElements()||[])?.some(s=>s.textContent?.replace(/\s/g,"")!=="")?this.#e.removeAttribute("aria-label"):this.#e.setAttribute("aria-label",this.closeLabel)}#E(){let t=window.matchMedia("(prefers-reduced-motion: reduce)").matches,e={show:{keyframes:[{opacity:0,transform:"scale(0.9)"},{opacity:1,transform:"scale(1)"}],options:{duration:250,easing:"ease"}},hide:{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.9)"}],options:{duration:250,easing:"ease"}}},s=this.customAnimations||o.customAnimations||{},i=t||this.noAnimations||this.customAnimations===null||o.customAnimations===null,n=a=>{let h=s[a]?.options??{},u=e[a].options;return{...u,...h,duration:i?0:h.duration??u.duration}};return{show:{keyframes:s.show?.keyframes??e.show.keyframes,options:n("show")},hide:{keyframes:s.hide?.keyframes??e.hide.keyframes,options:n("hide")}}}#k(t){let{keyframes:e,options:s}=this.#E().show;return t?.animate(e,s)}#_(t){let{keyframes:e,options:s}=this.#E().hide;return t?.animate(e,s)}#f(t,e=null){let s={bubbles:!0,composed:!0,detail:e},i=new CustomEvent(t,s);this.dispatchEvent(i)}#A(t,e){return new Promise(s=>{let i=n=>{n.target===t&&s()};t.addEventListener(e,i,{once:!0})})}#y(){return this.matches(":focus-within")}show(){return this.open?Promise.resolve():(this.open=!0,this.#A(this,b))}hide(){return this.open?(this.open=!1,this.#A(this,c)):Promise.resolve()}toast(t={}){if(t={...{forceRestart:!1},...t},this.#n){if(!t.forceRestart)return this.#n.promise;this.#n.resolve(),this.#n.cleanup()}let s=()=>{},i=new Promise(h=>s=h),n=()=>{this.#n?.resolve(),this.#n?.cleanup()};this.#n={promise:i,resolve:s,cleanup:()=>{this.removeEventListener(c,n),this.parentNode===r&&r.removeChild(this),r.querySelector(f)||r.remove(),this.open=!1,this.#n=null}},r.parentElement||document.body.append(r),r.appendChild(this),this.#t?.setAttribute("data-toast",""),this.open=!0;let a=r.shadowRoot?.querySelector(".stack");return a?.scrollTo({top:a.scrollHeight}),this.addEventListener(c,n,{once:!0}),i}#r(t){let e=this;if(Object.prototype.hasOwnProperty.call(e,t)){let s=e[t];delete e[t],e[t]=s}}static defineCustomElement(t=f){typeof window<"u"&&!window.customElements.get(t)&&window.customElements.define(t,o)}};export{p as AlertElement,d as CLOSE_REASON_API,_ as CLOSE_REASON_TIMEOUT,k as CLOSE_REASON_USER,y as COMMAND_ALERT_HIDE,A as COMMAND_ALERT_SHOW,c as EVENT_ALERT_AFTER_HIDE,b as EVENT_ALERT_AFTER_SHOW,E as EVENT_ALERT_HIDE,w as EVENT_ALERT_SHOW};
