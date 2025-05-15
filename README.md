[![npm version](https://img.shields.io/npm/v/@georapbox/alert-element.svg)](https://www.npmjs.com/package/@georapbox/alert-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/alert-element.svg)](https://www.npmjs.com/package/@georapbox/alert-element)

[demo]: https://georapbox.github.io/alert-element/
[license]: https://github.com/georapbox/alert-element/blob/main/LICENSE
[changelog]: https://github.com/georapbox/alert-element/blob/main/CHANGELOG.md

# &lt;alert-element&gt;

A custom element for displaying alerts and toasts.

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
<alert-element></alert-element>
```

### Style

By default, the component comes with basic styling. However, you can customise the styles of the various elements of the component using either [CSS Parts](#css-parts) or [CSS Custom Properties](#css-custom-properties).

## API

### Properties
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |

### Slots

| Name | Description |
| ---- | ----------- |

### CSS Parts

| Name | Description |
| ---- | ----------- |

### CSS Custom Properties

| Name | Description | Default |
| ---- | ----------- | ------- |

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `defineCustomElement` | Static | Defines/registers the custom element with the name provided. If no name is provided, the default name is used. The method checks if the element is already defined, hence will skip trying to redefine it. | elementName='alert-element' |

<sup>1</sup> Instance methods are only available after the component has been defined. To ensure the component is defined, you can use `whenDefined` method of the `CustomElementRegistry` interface, eg `customElements.whenDefined('alert-element').then(() => { /* call methods here */ });`

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |

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
