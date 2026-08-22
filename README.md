# 🔥 FLAMES — The Classic Name Game

A polished, mobile-first web app that brings the traditional **FLAMES** name game to life — with smooth animations, a premium dark theme, offline support, and zero data collection.

> **FLAMES is a traditional game for fun and does not measure real compatibility.**

![Status](https://img.shields.io/badge/status-ready-success)
![Tech](https://img.shields.io/badge/tech-HTML5%20%2B%20CSS3%20%2B%20Vanilla%20JS-blue)
![PWA](https://img.shields.io/badge/PWA-supported-orange)

---

## ✨ Features

- 🎮 **Classic FLAMES algorithm** — faithful to the traditional letter-cancellation method
- 🎬 **Animated calculation** — watch letters cancel and the FLAMES elimination in real time
- 🏆 **Six result categories** — Friends, Love, Affection, Marriage, Enemies, Siblings — each with its own visual treatment
- 📋 **Copy & Share** — Web Share API with clipboard fallback
- 📱 **Mobile-first** — looks great on phones, tablets, and desktops
- 🌑 **Premium dark theme** — glassmorphism, soft shadows, flame-gradient accents
- 🚀 **PWA** — installable, works offline after first visit
- ♿ **Accessible** — semantic HTML, keyboard navigation, reduced-motion support
- 🔒 **Private** — 100% client-side. No names are ever sent anywhere.

---


## 📁 Project Structure

```
FLAMES/
├── index.html              # App shell & screens
├── manifest.json           # PWA manifest
├── service-worker.js       # Offline cache
├── css/
│   └── style.css           # Premium dark theme
├── js/
│   └── app.js              # FLAMES algorithm + UI
├── assets/
│   └── icons/
│       ├── favicon.svg
│       ├── generate.html   # One-time icon generator
│       └── (PNG icons generated via generate.html)
└── README.md
```


## 🧠 How FLAMES Works

1. Enter two names.
2. Cancel common letters between them.
3. Count the remaining (uncancelled) letters.
4. Starting at F, count around `F L A M E S` using that count.
5. Eliminate the letter you land on.
6. Continue until only one letter remains — that is your result.

| Letter | Category  | Emoji |
| :----: | :-------- | :---: |
| F      | Friends   | 🤝 |
| L      | Love      | 💕 |
| A      | Affection | 💛 |
| M      | Marriage  | 💍 |
| E      | Enemies   | ⚡ |
| S      | Siblings  | 👨‍👩‍👧 |

---

## 🛠️ Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, glassmorphism, animations
- **Vanilla JavaScript** — modular IIFE with pure-function algorithm
- **PWA** — manifest + service worker (offline-first)
- **No frameworks, no build step, no backend**

---

## ♿ Accessibility

- Semantic landmarks (`<main>`, `<nav>`, `<section>`)
- Visible focus rings
- `aria-live` regions for calculation progress
- Inline validation messages (no `alert()`)
- `prefers-reduced-motion` honored — animations gracefully disabled
- Skip-to-content link

---

## 🔒 Privacy

- No analytics
- No cookies
- No network requests for user input
- Calculation runs entirely in the browser
- The only network activity is fetching the static assets themselves

---

## 📜 License

MIT — free to use, modify, and share.

---

## 🙏 Credits

Built with care as a small, focused entertainment product. Inspired by the traditional FLAMES game many of us grew up playing.
