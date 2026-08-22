# Changelog

All notable changes to **FLAMES — The Classic Name Game** are documented here.

## [1.0.0] — 2026-08-22

### 🎉 Initial Release

#### Added
- **Core FLAMES algorithm** — faithful implementation of the traditional letter-cancellation method with deterministic results.
- **Five-screen flow**: Hero → Name Input → Animated Calculation → Result → How It Works.
- **Animated calculation sequence** — steps shown one by one with the FLAMES letters eliminating in real time.
- **Skip animation** button for accessibility & impatient users.
- **Six result categories** — Friends 🤝, Love 💕, Affection 💛, Marriage 💍, Enemies ⚡, Siblings 👨‍👩‍👧 — each with its own subtle visual tone.
- **Copy Result** (clipboard API + fallback).
- **Share Result** (Web Share API + clipboard fallback).
- **Inline form validation** — no `alert()` calls.
- **PWA support** — manifest + service worker with versioned cache and offline-first behavior.
- **Reduced-motion support** — animations disabled when the user prefers reduced motion.
- **Bottom navigation** — Home / Play / How.
- **Educational "How FLAMES Works"** section.
- **Responsive design** — mobile-first, tested layout up to desktop.
- **Privacy-first** — no analytics, no tracking, no network calls for user input.

#### Notes
- Icons are generated via the included `assets/icons/generate.html` helper (open once in browser, click the buttons).
