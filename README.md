[![npm version](https://img.shields.io/npm/v/@georapbox/alert-element.svg)](https://www.npmjs.com/package/@georapbox/alert-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/alert-element.svg)](https://www.npmjs.com/package/@georapbox/alert-element)

[demo]: https://georapbox.github.io/alert-element/
[license]: https://github.com/georapbox/alert-element/blob/main/LICENSE
[changelog]: https://github.com/georapbox/alert-element/blob/main/CHANGELOG.md

# &lt;alert-element&gt;

A custom HTML element for displaying dismissible alerts and toast notifications

> [!NOTE]
> The element is heavily inspired by the `sl-alert` element from [Shoelace](https://shoelace.style/components/alert), especially the API for creating toast notifications.
> However, it is not a direct copy and is build from scratch without the use of any external libraries.

[API documentation](#api) &bull; [Demo][demo]

## Install

```sh
npm install --save @georapbox/alert-element
```

## Usage

### Script

```js
import { AlertElement } from './node_modules/@georapbox/alert-element/dist/alert-element.js';

// Manually define the element.
AlertElement.defineCustomElement();
```

Alternatively, you can import the automatically defined custom element.

```js
import './node_modules/@georapbox/alert-element/dist/alert-element-defined.js';
```

### Markup

```html
<alert-element variant="success" open closable>
  <strong>Your profile has been updated</strong><br>
  All changes have been saved and will take effect immediately.
</alert-element>
```

### Style

By default, the component comes with some basic default styling. However, you can customise the styles of the various elements of the component using either [CSS Parts](#css-parts) or [CSS Custom Properties](#css-custom-properties).

## API

### Properties
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |
| `closable` | ✓ | Boolean | - | `false` | Indicates whether the alert can be closed by the user by providing a close button. |
| `open` | ✓ | Boolean | - | `false` | Indicates whether the alert is open or not. |
| `duration` | ✓ | Number | - | `Infinity` | The duration in milliseconds for which the alert will be displayed before automatically closing. If the user interacts with the alert before it closes, the duration is reset. Defaults to `Infinity`, which means the alert will not close on its own. |
| `variant` | ✓ | String | - | `""` | The alert's theme variant. Can be one of `info`, `success`, `neutral`, `warning`, or `danger`. |
| `closeLabel`<br>*`close-label`* | ✓ | String | - | `"Close"` | The label for the default close button. It is used as the `aria-label` attribute of the close button. If user provides text content for the close button using the `close` slot, this property is ignored and the `aria-label` attribute is removed. |
| `customAnimations` | - | Object | - | `undefined` | Custom animation keyframes and options for show/hide. The object should contain two properties: `show` and `hide`, each containing an object with `keyframes` and `options` properties. See [Animations](#animations) for more details. Set to `null` to disable animations altogether. |

### Slots

| Name | Description |
| ---- | ----------- |
| default/unnamed | The default slot for the alert message. |
| `icon` | Slot to display an icon before the alert message. |
| `close` | Slot to display custom content for the close button. |

### CSS Parts

| Name | Description |
| ---- | ----------- |
| `base` | The component's base wrapper. |
| `icon` | The icon element of the alert. |
| `message` | The message element of the alert. |
| `close` | The close button element of the alert. |

### CSS Custom Properties

| Name | Description | Default |
| ---- | ----------- | ------- |
| `--alert-border-radius` | The border radius of the alert. | `0.25rem` |
| `--alert-fg-color` | The foreground color of the alert. | Light: `#3f3f46` - Dark: `#b6b6be` |
| `--alert-bg-color` | The background color of the alert. | Light: `#ffffff` - Dark: `#252528` |
| `--alert-border-color` | The border color of the alert. | Light: `#e4e4e7` - Dark: `#36363a` |
| `--alert-info-variant-color` | The color variant for info alerts. | Light: `#0584c7` - Dark: `#27bbfc` |
| `--alert-success-variant-color` | The color variant for success alerts. | Light: `#16a34a` - Dark: `#3ae075` |
| `--alert-neutral-variant-color` | The color variant for neutral alerts. | Light: `#52525b` - Dark: `#8e8e9a` |
| `--alert-warning-variant-color` | The color variant for warning alerts. | Light: `#d87708` - Dark: `#ffbd11` |
| `--alert-danger-variant-color` | The color variant for danger alerts. | Light: `#dc2626` - Dark: `#fe5c5c` |

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `defineCustomElement` | Static | Defines/registers the custom element with the name provided. If no name is provided, the default name is used. The method checks if the element is already defined, hence will skip trying to redefine it. | `elementName='alert-element'` |
| `show`<sup>1</sup> | Instance | Shows the alert. | - |
| `hide`<sup>1</sup> | Instance | Hides the alert. | - |
| `toast`<sup>1</sup> | Instance | Displays the alert as a toast notification. See [Toast notifications](#toast-notifications) for more details. | `{ forceRestart: false }` |

<sup>1</sup> Instance methods are only available after the component has been defined. To ensure the component is defined, you can use `whenDefined` method of the `CustomElementRegistry` interface, eg `customElements.whenDefined('alert-element').then(() => { /* call methods here */ });`

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
| `alert-show` | Emitted when the alert is shown. | - |
| `alert-after-show` | Emitted after the alert is shown and all animations are complete. | - |
| `alert-hide` | Emitted when the alert is hidden. | - |
| `alert-after-hide` | Emitted after the alert is hidden and all animations are complete. | - |

## Toast notifications

To display an alert as a toast notification, create an instance of the alert element and call the `toast()` method.
This will move the alert out of its initial position in the DOM into the toast stack and display it as a toast notification.
When there are more than one toast notifications, they will stack vertically in the toast stack.

The toast stack is a container element that is created and managed internally by the alert element and it will be 
added in the DOM when there is at least one toast notification to display. If there are no toast notifications to display,
the toast stack will be removed from the DOM.

By default, the toast stack is a fixed positioned element that is displayed at the top-right corner of the viewport,
but you can override its position by targeting `.alert-toast-stack` class in your stylesheet.

Below are some examples of how to position the toast stack in the viewport.

```css
/* Position toast stack at the top-center of the viewport */
.alert-toast-stack::part(base) {
  right: 50%;
  transform: translateX(50%);
}

/* Position toast stack at the top-left of the viewport */
.alert-toast-stack::part(base) {
  right: auto;
  left: 0;
}

/* Position toast stack at the bottom-left of the viewport */
.alert-toast-stack::part(base) {
  right: auto;
  left: 0;
  top: auto;
  bottom: 0;
}

/* Position toast stack at the bottom-center of the viewport */
.alert-toast-stack::part(base) {
  right: 50%;
  transform: translateX(50%);
  top: auto;
  bottom: 0;
}

/* Position toast stack at the bottom-right of the viewport */
.alert-toast-stack::part(base) {
  top: auto;
  bottom: 0;
}
```

> [!NOTE]
> The toast stack has a shadow DOM root, so you need to use the `::part` pseudo-element to style it.
> The reason for this is to encapsulate the styles of the toast stack and prevent them from leaking into the rest of your application.

The default styles of the toast stack are as follows:

```css
.alert-toast-stack::part(base) {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  width: 30rem;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
```

## Creating toasts imperatively

For convenience, you can create a utility function that creates a toast notification imperatively,
instead of creating the alert elements in your markup. To do this, you can generate the alert element
using JavaScript and call the `toast()` method on it.

#### HTML

```html
<button type="button">Create toast</button>
```

#### JavaScript

```js
const button = document.querySelector('button');

button.addEventListener('click', () => {
  toastify('This is a toast notification', {
    variant: 'success',
    duration: 3000,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
    </svg>`
  });
});

function escapeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

function toastify(message, options = {}) {
  const defaults = {
    duration: 3000,
    variant: 'neutral',
    icon: ''
  };

  options = { ...defaults, ...options };

  const icon = options.icon ? `<span slot="icon">${options.icon}</span>` : '';

  const alert = Object.assign(document.createElement('alert-element'), {
    closable: true, // Always provide a way to close the toast notification
    duration: options.duration,
    variant: options.variant,
    innerHTML: `${icon}${escapeHtml(message)}` // Escape message to prevent XSS ig you don't control the content
  });

  return alert.toast();
}
```

## Animations

The element uses the [Web Animations API](https://developer.mozilla.org/docs/Web/API/Web_Animations_API) to animate the alert when it is shown or hidden.
It comes with a default animation, but you can override it by providing your own animation options, either globally using the static `AlertElement.customAnimations` property or per instance using the `customAnimations` property.
For example, you can override the default animation options for the `show` and `hide` animations as follows:

```js
const customAnimations = {
  show: {
    keyframes: [
      { opacity: 0, transform: 'rotateX(90deg) scale(0.8)' },
      { opacity: 1, transform: 'rotateX(-10deg) scale(1.05)' },
      { opacity: 1, transform: 'rotateX(5deg) scale(0.97)' },
      { opacity: 1, transform: 'rotateX(0deg) scale(1)' }
    ],
    options: {
      duration: 600,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    }
  },
  hide: {
    keyframes: [
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0, transform: 'scale(0.8)' }
    ],
    options: {
      duration: 400,
      easing: 'ease-in'
    }
  }
};

// Set the custom animations globally
AlertElement.customAnimations = customAnimations;

// Or set the custom animations for a specific instance
const alert = document.querySelector('alert-element');
alert.customAnimations = customAnimations;
````

> [!NOTE]
> Animations respect the users' `prefers-reduced-motion` setting.
> If the user has enabled the setting on their system, the animations will be disabled and the element will be shown/hidden instantly.
> To disable animations for all users no matter their settings, you can set the `customAnimations` property to `null`.

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## Development setup

### Prerequisites

The project requires `Node.js` and `npm` to be installed on your environment. Preferrably, use [nvm](https://github.com/nvm-sh/nvm) Node Version Manager and use the version of Node.js specified in the `.nvmrc` file by running `nvm use`.

### Install dependencies

Install the project dependencies by running the following command.

```sh
npm install
```

### Build for development

Watch for changes and start a development server by running the following command.

```sh
npm start
```

### Linting

Lint the code by running the following command.

```sh
npm run lint
```

### Testing

Run the tests by running any of the following commands.

```sh
npm test
npm run test:watch # watch mode
```

### Build for production

Create a production build by running the following command.

```sh
npm run build
```

## License

[The MIT License (MIT)][license]
