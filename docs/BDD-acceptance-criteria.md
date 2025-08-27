# Frontend Acceptance Criteria (BDD Format)

This document lists acceptance criteria for the **NaluriSpace** frontend in Behavior-Driven Development (BDD) style. Each scenario assumes the backend `/status` and `/control` endpoints are available and functioning according to the backend specification.

---

## Feature: Dashboard — Pi monitoring and controls

As a user,
I want to view the current approximation of π and control the backend calculation,
So that I can observe progress and start/pause/stop/reset the calculation.

### Scenario: Display last known state on startup

**Given** the app is started
**And** there is a cached last-known state stored locally
**When** the Dashboard mounts
**Then** the UI shows the cached `pi`, `status`, and `iteration` values immediately.

### Scenario: Poll for live status updates

**Given** the backend is reachable
**When** the Dashboard is visible
**Then** it polls `GET /status` periodically (default: 1s)
**And** updates the displayed `pi`, `status`, and `iteration` when responses arrive.

### Scenario: Start action

**Given** the current status is `stopped` or `paused`
**When** the user taps the **Start** button
**Then** the Start button shows a spinner while the request is in-flight
**And** the app sends `POST /control` with `{ "action": "start" }`
**And** when the request succeeds the Dashboard reflects the new `status` and `pi` returned by the server.

### Scenario: Pause action

**Given** the current status is `running`
**When** the user taps the **Pause** button
**Then** the Pause button shows a spinner while the request is in-flight
**And** the app sends `POST /control` with `{ "action": "pause" }`
**And** when the request succeeds the Dashboard shows `status: paused` and preserves `pi` and `iteration`.

### Scenario: Stop action

**Given** the current status is `running`
**When** the user taps the **Stop** button
**Then** the Stop button shows a spinner while the request is in-flight
**And** the app sends `POST /control` with `{ "action": "stop" }`
**And** on success the Dashboard shows `status: stopped` and preserves the final `pi` and `iteration`.

### Scenario: Reset action

**Given** any current status
**When** the user taps the **Reset** button
**Then** the Reset button shows a spinner while the request is in-flight
**And** the app sends `POST /control` with `{ "action": "reset" }`
**And** on success the Dashboard shows the reset state: `pi: "0"`, `iteration: 0`, `status: stopped`.

### Scenario: Per-control loading behavior

**Given** multiple control buttons are visible
**When** the user triggers a control action
**Then** only the triggered button shows a spinner while its request runs
**And** the other buttons remain interactive (unless a global loading state applies)

### Scenario: Offline cached fallback

**Given** the backend becomes unreachable
**When** the Dashboard fails to fetch `/status`
**Then** the app shows a visible banner: `Offline — showing cached values`
**And** the UI continues to display the last persisted `pi`, `status`, and `iteration`.

### Scenario: Error handling on control fail

**Given** a control request fails (network or server error)
**When** the request returns an error
**Then** the app displays a non-blocking error message (toast or inline)
**And** preserves the last known state in the UI.

---

## Feature: Solar Calculator — Circumference & Visualization

As a user,
I want to compute circumferences for Sun, Earth, and Mars using the backend-provided π,
So that I can compare sizes and visualise them on a log scale.

### Scenario: Compute circumferences using backend π

**Given** the app has a current `pi` value
**When** the user opens the Solar Calculator screen
**Then** the app calculates circumference as `2 * π * radius` for each body using the live/cached `pi`
**And** displays the results formatted with thousands separators.

### Scenario: Display three body cards

**Given** the Solar Calculator is visible
**When** the app computes circumferences
**Then** it shows three cards: Sun, Earth, Mars
**And** each card shows body name, radius, formatted circumference, and unit label.

### Scenario: Log-scale visualization

**Given** the circumferences are computed
**When** the visualization renders
**Then** it maps circumference values to a log-scale width
**And** each bar animates smoothly when values change (e.g., when `pi` updates).

### Scenario: Toggle true scale (linear)

**Given** the visualization is in log-scale
**When** the user toggles `View True Scale`
**Then** the visualization transitions to linear scale with a smooth animation
**And** axis labels/ticks update to reflect the linear mapping.

### Scenario: Unit toggle (km / miles)

**Given** the user toggles the unit control
**When** the unit is changed
**Then** the app recalculates circunferences in the selected unit
**And** updates the cards and visualization accordingly.

---

## Feature: UI & UX

### Scenario: Progressive decimal display for π (presentation only)

**Given** the backend supplies a high-precision `pi` string
**When** the Dashboard renders the pi value
**Then** the UI formats and reveals decimals progressively based on `iteration` (presentation logic)
**And** the app never modifies the backend-supplied `pi` value, only how many decimals are shown.

### Scenario: Copy result to clipboard

**Given** a body card is visible
**When** the user taps the `Copy` action
**Then** the circumference value is copied to the clipboard
**And** a short success confirmation (toast) appears.

---

## Notes & Non-functional requirements

* **Polling interval**: default 1s; configurable in `usePolling` hook.
* **Persistence**: last known `/status` is persisted to AsyncStorage under a centralized storage key.
* **Accessibility**: interactive elements provide `accessibilityLabel` and meet minimum touch targets.
* **Animations**: smooth animations for bar widths and number changes (duration \~300–600ms).
* **Error handling**: control actions show per-button loading and non-blocking error messages; cached state preserved on errors.

---
