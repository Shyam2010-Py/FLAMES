# 🔥 FLAMES — The Classic Name Game

A polished, mobile-first web app that brings the traditional **FLAMES** name game to life with smooth animations, a premium dark theme, PWA support, offline functionality, and zero data collection.

> **FLAMES is a traditional game for fun and does not measure real compatibility.**

![Version](https://img.shields.io/badge/version-1.0.3-orange)
![Status](https://img.shields.io/badge/status-stable-success)
![Tech](https://img.shields.io/badge/tech-HTML5%20%2B%20CSS3%20%2B%20Vanilla%20JS-blue)
![PWA](https://img.shields.io/badge/PWA-supported-orange)

## ✨ Features

- 🎮 **Classic FLAMES algorithm** — deterministic letter-cancellation and elimination
- 🎬 **Animated calculation** — watch the calculation and FLAMES elimination
- 🏆 **Six result categories** — Friends, Love, Affection, Marriage, Enemies, Siblings
- 📋 **Copy & Share** — Web Share API with clipboard fallback
- 📱 **Mobile-first** — responsive across phones, tablets, and desktops
- 🌑 **Premium dark theme** — glassmorphism, soft shadows, and flame-inspired accents
- 🚀 **PWA** — installable and usable offline after the first visit
- ♿ **Accessible** — semantic HTML, keyboard navigation, focus states, and reduced-motion support
- 🔒 **Private** — 100% client-side; entered names are never uploaded
- 🧪 **Input validation** — including normalized same-name detection
- ✍️ **Website credit** — visible creator credit for Ghanashyam Pabbuleti

## 📁 Project Structure

```text
FLAMES/
├── index.html              # App shell and five screens
├── manifest.json           # PWA manifest and app version
├── service-worker.js       # Versioned offline cache
├── css/
│   └── style.css           # Application styling and website credit
├── js/
│   └── app.js              # FLAMES algorithm and UI controller
├── assets/
│   └── icons/
│       ├── favicon.svg
│       ├── icon-192.png
│       ├── icon-512.png
│       └── maskable-512.png
├── CHANGELOG.md
└── README.md
```

The PNG icons are already included in the repository. **No icon generator is required for deployment.**

## 🧠 How FLAMES Works

1. Enter two names.
2. Normalize the names and remove irrelevant characters.
3. Cancel common letters between the names.
4. Count the remaining letters.
5. Starting at F, count around `F L A M E S` using that count.
6. Eliminate the selected letter and continue until one remains.
7. The final letter determines the result.

| Letter | Category | Emoji |
| :----: | :------- | :---: |
| F | Friends | 🤝 |
| L | Love | 💕 |
| A | Affection | 💛 |
| M | Marriage | 💍 |
| E | Enemies | ⚡ |
| S | Siblings | 👨‍👩‍👧 |

## 🛠️ Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, responsive layout, animations
- **Vanilla JavaScript** — modular client-side algorithm and UI controller
- **PWA** — manifest + service worker
- **No frameworks, no build step, no backend**

## ♿ Accessibility

- Semantic landmarks
- Visible focus states
- `aria-live` regions for calculation progress
- Inline validation messages
- `prefers-reduced-motion` support
- Skip-to-content link
- Keyboard-friendly controls

## 🔒 Privacy

- No analytics
- No accounts
- No cookies used for the game
- No location collection
- No network requests containing entered names
- All calculations run locally in the browser
- Static assets may be fetched normally by the browser/PWA

## 📱 PWA

The app includes a versioned service worker and the required PNG/SVG icons. The **1.0.3** cache version automatically removes older FLAMES caches when the new service worker activates.

## 🚀 Deployment

FLAMES is a static website and requires no build process.

For GitHub Pages:

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Select the `main` branch and the root folder.
4. Save and open the generated Pages URL.

## 📜 Version

**1.0.3** — Website credit and PWA cache/version synchronization release.

See [`CHANGELOG.md`](CHANGELOG.md) for release history.

## 📄 License

MIT — free to use, modify, and share.

## 🙏 Credits

**Made by Ghanashyam Pabbuleti.**

Built as a small, focused entertainment project inspired by the traditional FLAMES game.
