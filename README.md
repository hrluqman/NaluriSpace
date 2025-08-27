# NaluriSpace

NaluriSpace, a dark-theme mobile frontend built with **Expo (TypeScript)** and **expo-router** that consumes a backend Pi calculation server. The app displays the evolving value of π and computes planetary circumferences (Sun, Earth, Mars). 

It displays a progressively-improving approximation of π (provided by a backend server that computes π using the Leibniz series) and uses that value to compute circumferences for Solar bodies.

---

## Table of contents

* [Project overview](#project-overview)
* [Features](#features)
* [Project structure](#project-structure)
* [Prerequisites](#prerequisites)
* [Installation & setup](#installation--setup)
* [Environment & backend URL](#environment--backend-url)
* [Running the app](#running-the-app)
* [Test evidence](#test-evidence)
* [Development notes & UX behavior](#development-notes--ux-behavior)
* [Troubleshooting](#troubleshooting)
* [Future enhancements](#future-enhancements)

---

## Project overview

* **Framework:** Expo (React Native) with TypeScript
* **Routing:** expo-router (file-based routing)
* **State:** React Context
* **Storage:** AsyncStorage for cached last-state
* **Networking:** Axios wrapper backend endpoints
* **Visualization:** Animated bars using built-in Animated API

---

## Features

* Dashboard: live π display, iteration count, status (running/paused/stopped)
* Control: Start / Pause / Stop / Reset controls with per-button loading indicators
* Solar Calculator: circumferences for Sun, Earth, Mars computed using live π
* Logarithmic and linear comparative visualization with animated bars
* Persistent last-known π and state for offline fallback
* Safe hooks: `usePi()` returns a safe fallback if provider missing

---

## Project structure (relevant files)

```
NaluriSpace/
├── app/                     # File-based routes
│   ├── _layout.tsx          # Root stack layout
│   ├── index.tsx            # Dashboard route
│   └── solar.tsx            # Solar Calculator route
├── src/
│   ├── context/
│   │   └── AppProvider.tsx  # Main provider file
│   │   └── PiContext.tsx    # Provider + persistence (AsyncStorage)
│   ├── hooks/
│   │   └── usePi.ts         # Custom hook to fetch PiContext value
│   │   └── usePolling.ts    # Custom hook for time interval callback
│   ├── services/
│   │   └── api.ts           # Axios wrapper
│   │   └── storage.ts       # AsyncStorage helpers & keys
│   ├── screens/
│   │   ├── Dashboard/       # Dashboard UI components
│   │   └── Calculator/      # Solar Calculator UI components
│   ├── utils/
│   │   └── calc.ts          # Circumference logic + parsePi
│   └── theme/
│       └── colors.ts        # Color constant
└── README.md
```

---

## Prerequisites

* Node.js (LTS recommended)
* npm (or yarn)
* Expo CLI: `npm install -g expo-cli` (optional — `npx expo` works)
* A running backend server providing `/status` and `/control` (see backend [README](https://github.com/hrluqman/naluri-space-pi))

---

## Installation & setup

1. Clone the repository:

```bash
git clone https://github.com/hrluqman/NaluriSpace.git
cd NaluriSpace
```

2. Install dependencies:

```bash
npm install
```

3. Configure backend environment (see backend [README](https://github.com/hrluqman/naluri-space-pi))

4. Start Expo:

```bash
npx expo start
```

Open in Expo Go (mobile) or run on simulator.

---

## Environment & backend URL

The frontend needs to know where the backend is (local machine or LAN). There are two ways to configure:

1. **Development (quick):** edit `src/services/api.ts` and set `BASE_URL` to your backend host, for example:

```ts
const BASE_URL = 'http://192.000.0.0:3001'; // use your machine LAN IP for device testing
```

2. **Recommended (env):** set `EXPO_PUBLIC_API_URL` in your environment (Expo supports `app.config.js` / `.env` packages if desired).

```bash
EXPO_PUBLIC_API_URL=http://192.000.0.0:3001
```

> **Note:** When testing on a physical device, `localhost` will not work — use your computer's LAN IP.

---

## Running the app

* Start backend server (see backend [README](https://github.com/hrluqman/naluri-space-pi)) then run Expo:

```bash
npx expo start
```

* Scan QR with Expo Go or open simulator via Metro UI.

---

## Test evidence

### 1. **Dashboard Screen (Start/Pause/Stop/Reset)**
![Dashboard Screen (Start/Pause/Stop/Reset)](docs/screenrecordings/Dashboard_screen_online.mp4)

### 2. **Dashboard Screen (Offline)**
![Dashboard Screen (Offline)](docs/screenrecordings/Dashboard_screen_offline.mp4)

### 3. **Solar Calculator Screen**
![Solar Calculator Screen](docs/screenrecordings/Solar_Calculator_Screen.mp4)

---

## Development notes & UX behavior

* **Per-control loading:** each control button shows a spinner only while its request is in progress.
* **Polling:** Dashboard polls `/status` every 2s (configurable in `usePolling` hook).
* **Cached state:** the last successfully fetched `/status` is persisted to AsyncStorage and used when offline.
* **Safe hook:** `usePi()` returns a safe fallback context if provider missing to avoid runtime crashes in production.

---

## Troubleshooting

* **Nodemon restarting backend due to state.json:** add `.nodemonignore` with `state/*`.
* **Device can't reach backend:** replace `localhost` with your computer's LAN IP in `src/services/api.ts` or set `EXPO_PUBLIC_API_URL`.

---

## Future enhancements

* Switch from Context API to Redux for better scalability.
* Create themed UI components for consistent design.
* Further classify components into domain-based modules.
* Consolidate all constants into a single reference file.

---