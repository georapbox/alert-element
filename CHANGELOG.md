# CHANGELOG

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
