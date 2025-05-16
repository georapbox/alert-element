[![npm version](https://img.shields.io/npm/v/@georapbox/alert-element.svg)](https://www.npmjs.com/package/@georapbox/alert-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/alert-element.svg)](https://www.npmjs.com/package/@georapbox/alert-element)

[demo]: https://georapbox.github.io/alert-element/
[license]: https://github.com/georapbox/alert-element/blob/main/LICENSE
[changelog]: https://github.com/georapbox/alert-element/blob/main/CHANGELOG.md

# &lt;alert-element&gt;

A custom element for displaying alerts and toasts.

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
| `closable` | ✓ | Boolean | - | `false` | Indicates if the alert can be closed by the user. |
| `open` | ✓ | Boolean | - | `false` | Indicates if the alert is currently open. |
| `duration` | ✓ | Number | - | `Infinity` | The duration in milliseconds for which the alert will be displayed before automatically closing. |
| `variant` | ✓ | String | - | `""` | The variant of the alert. Can be one of `info`, `success`, `neutral`, `warning`, or `danger`. |
| `closeLabel`<br>*`close-label`* | ✓ | String | - | `"Close"` | The label for the default close button. It is used as the `aria-label` attribute of the close button. If user provides text content for the close button using the `close` slot, this property is ignored and the `aria-label` attribute is removed. |

### Slots

| Name | Description |
| ---- | ----------- |
| default/unnamed | The default slot for the alert message. |
| `icon` | The icon slot for the alert icon. |
| `close` | The close button slot that overrides its content. |

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
| `--alert-fg-color` | The foreground color of the alert. | Light: `#3f3f46` - Dark: `#b6b6be` |
| `--alert-bg-color` | The background color of the alert. | Light: `#ffffff` - Dark: `#252528` |
| `--alert-border-color` | The border color of the alert. | Light: `#e4e4e7` - Dark: `#36363a` |
| `--alert-border-radius` | The border radius of the alert. | `0.25rem` |
| `--alert-info-variant-color` | The color variant for info alerts. | Light: `#0584c7` - Dark: `#27bbfc` |
| `--alert-success-variant-color` | The color variant for success alerts. | Light: `#16a34a` - Dark: `#3ae075` |
| `--alert-neutral-variant-color` | The color variant for neutral alerts. | Light: `#52525b` - Dark: `#8e8e9a` |
| `--alert-warning-variant-color` | The color variant for warning alerts. | Light: `#d87708` - Dark: `#ffbd11` |
| `--alert-danger-variant-color` | The color variant for danger alerts. | Light: `#dc2626` - Dark: `#fe5c5c` |

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `defineCustomElement` | Static | Defines/registers the custom element with the name provided. If no name is provided, the default name is used. The method checks if the element is already defined, hence will skip trying to redefine it. | elementName='alert-element' |
| `show`<sup>1</sup> | Instance | Shows the alert. | - |
| `hide`<sup>1</sup> | Instance | Hides the alert. | - |
| `toast`<sup>1</sup> | Instance | Displays the alert as a toast notification. | - |

<sup>1</sup> Instance methods are only available after the component has been defined. To ensure the component is defined, you can use `whenDefined` method of the `CustomElementRegistry` interface, eg `customElements.whenDefined('alert-element').then(() => { /* call methods here */ });`

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
| `alert-show` | Emitted when the alert is shown. | - |
| `alert-hide` | Emitted when the alert is hidden. | - |

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
