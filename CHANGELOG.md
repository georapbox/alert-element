# CHANGELOG

## v2.0.0 (2026-MM-DD)

### Breaking Changes

- **Explicit Package Exports**: Added a formal `exports` map to `package.json`.
  - **Supported entry points**: `alert-element`, `alert-element/define`, and `alert-element/custom-elements.json`.
  - **Impact**: Direct imports from internal paths (e.g., `alert-element/dist/...`) are no longer part of the supported public API and may fail in environments that enforce package exports.
- **Method Renaming**: The static `defineCustomElement()` method has been renamed to `define()`.
  - **Action Required**: Update all instances of `defineCustomElement()` to `define()`.
- **Updated Default Accessibility**: Changed the default value of `announce` from `"alert"` to `"none"`.
  - **Impact**: The component no longer carries an implicit ARIA role. This provides developers more control to set the appropriate role manually based on specific context without overriding defaults.

### Added

- Added `"alertdialog"` as a supported value for the `announce` property, allowing the component to be announced as an alert dialog by assistive technologies when appropriate.
- Added `focusable` property to control whether the alert base element should be focusable. By default, alerts will not be focusable, but setting `focusable` to `true` will add `tabindex="0"` to the alert base element, making it keyboard focusable and allowing assistive technologies to interact with it more effectively.

### Fixed

- Fixed toast stack cleanup logic to remove the container when no child elements remain, instead of checking for a specific custom element tag name.

## v1.3.1 (2026-02-15)

### Fixed

- Corrected an issue where the Custom Elements Manifest (CEM) incorrectly used the parameter name `elementName` instead of the actual tag name `alert-element`. Added a build-time plugin to ensure proper IDE IntelliSense and documentation generation.

## v1.3.0 (2026-02-02)

### Added

- Custom Elements Manifest (CEM) support via `@custom-elements-manifest/analyzer`
- `analyze` script for generating the Custom Elements Manifest
- `custom-elements-manifest.config.js` configuration file
- `customElements` metadata field in `package.json`

### Changed

- Bumped package version to `1.3.0`
- Updated `.nvmrc` to Node.js 24
- Refined JSDoc attribute documentation in `src/alert-element.js` for improved tooling and editor support

## v1.2.2 (2025-12-12)

### Changed

- Improved countdown progress animation by switching to `transform: scaleX()` for smoother performance and reduced layout work in contrast to animating `width`.
- Added RTL support using directional `transform-origin`.

## v1.2.1 (2025-12-10)

### Fixed

- Fixed a stling issue that would break the layout when adjusting the height of the countdown timer via the `--alert-countdown-height` CSS custom property. Increasing the height of the countdown timer now correctly adjusts the spacing of the alert content to accommodate the larger timer bar.

### Changed

- Updated development dependencies.

## v1.2.0 (2025-11-03)

### Fixed

- Timer now correctly pauses and resumes on hover instead of restarting. Previously, when users hovered over the alert, the timer was stopped — but on mouse leave it restarted from zero rather than resuming. The timer now continues from where it left off, preserving the remaining duration as expected.
- Fixed a minor styling issue when no `variant` is specified, ensuring consistent appearance across all variants.

### Added

- Added support to display a countdown timer within the alert.
- Added new CSS custom properties:
  - `--alert-top-border-width` — controls the width of the top border.
  - `--alert-countdown-height` — controls the height of the countdown timer bar.
  - `--alert-base-variant-color` — sets the base color for the alert variants.
- Added `connectedMoveCallback()` lifecycle method, which is triggered when the element is relocated within the DOM using `Element.moveBefore()`. This allows skipping initialization or cleanup logic in `connectedCallback()` and `disconnectedCallback()` when the element is merely moved rather than added or removed.
- Exported constants for events, commands, and close reasons:
  - `EVENT_ALERT_SHOW = 'alert-show'`
  - `EVENT_ALERT_AFTER_SHOW = 'alert-after-show'`
  - `EVENT_ALERT_HIDE = 'alert-hide'`
  - `EVENT_ALERT_AFTER_HIDE = 'alert-after-hide'`
  - `COMMAND_ALERT_SHOW = '--alert-show'`
  - `COMMAND_ALERT_HIDE = '--alert-hide'`
  - `CLOSE_REASON_USER = 'user'`
  - `CLOSE_REASON_TIMEOUT = 'timeout'`
  - `CLOSE_REASON_API = 'api'`
- Added support to disable animations via the `no-animations` attribute. Previously, animations could only be disabled by setting the `customAnimations` property to `null`.
- Added support for pausing and resuming the timer not only on hover, but also when the alert gains or loses focus. This ensures that keyboard and assistive-technology users receive the same non-interruptive behavior — the timer now pauses while any focusable element inside the alert is focused, resuming once focus leaves the alert.

## v1.1.0 (2025-10-15)

### Added

- Added support to override the `role` attribute via the `announce` property.

### Changed

- Updated development dependencies.

## v1.0.1 (2025-05-26)

### Fixed

- Fixed typo in documentation.

## v1.0.0 (2025-05-26)

- Initial release.
