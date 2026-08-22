# Changelog

All notable changes to **FLAMES — The Classic Name Game** are documented here.

## [1.0.3] — 2026-08-22

### 🛠️ Website Credit & PWA Synchronization Release

#### Fixed
- **Website credit visibility** — added a dedicated, responsive footer credit reading **Made by Ghanashyam Pabbuleti** so it remains visible above the mobile navigation and at the bottom on desktop.
- **PWA stale-cache issue** — service-worker cache is now `flames-v1.0.3`, which removes older FLAMES caches during activation.

#### Updated
- Application version in `index.html` updated to **1.0.3**.
- Application version exposed by `js/app.js` updated to **1.0.3**.
- PWA manifest now records application version **1.0.3**.
- README synchronized with the 1.0.3 release.

## [1.0.1] — 2026-08-22

### 🛠️ Maintenance Release

#### Fixed
- **Normalized same-name validation** — names that differ only by spaces, case, hyphens, apostrophes, or other ignored formatting are now correctly recognized as the same normalized name.

#### Updated
- README now matches the actual repository structure.
- Removed outdated instructions referring to the temporary icon generator.
- Documented the generated PWA icons already included in the repository.
- Updated the project version to **1.0.1**.
- Updated PWA cache version to **1.0.1** so deployed clients can receive the maintenance release cleanly.

## [1.0.0] — 2026-08-22

### 🎉 Initial Release

#### Added
- **Core FLAMES algorithm** — faithful implementation of the traditional letter-cancellation method with deterministic results.
- **Five-screen flow**: Hero → Name Input → Animated Calculation → Result → How It Works.
- **Animated calculation sequence** — steps shown one by one with the FLAMES letters eliminating in real time.
- **Skip animation** button for accessibility.
- **Six result categories** — Friends 🤝, Love 💕, Affection 💛, Marriage 💍, Enemies ⚡, Siblings 👨‍👩‍👧.
- **Copy Result** with clipboard fallback.
- **Share Result** with Web Share API and clipboard fallback.
- **Inline form validation** with no `alert()` calls.
- **PWA support** with manifest, service worker, versioned cache, and offline behavior.
- **Reduced-motion support** for users who prefer less animation.
- **Bottom navigation** — Home / Play / How.
- **Educational "How FLAMES Works"** section.
- **Responsive mobile-first design** through desktop.
- **Privacy-first client-side processing** with no analytics or tracking.
- **PWA icons** for standard and maskable installation surfaces.
