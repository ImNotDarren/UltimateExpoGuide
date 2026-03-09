# Ultimate Expo Guide

An interactive, beautifully designed guide to building mobile apps with **React Native** and **Expo** — built for students with basic JavaScript/TypeScript knowledge and zero mobile development experience.

**Course:** CS 130R — Selected Programming Languages: JavaScript and Web Development
**Instructor:** Darren Liu
**Institution:** Nell Hodgson Woodruff School of Nursing, Emory University

## What You'll Learn

- **Why Expo?** — How cross-platform beats native for learning, with a feature-by-feature breakdown
- **How It Works** — The code → dev server → phone pipeline explained visually
- **Environment Setup** — Expandable step-by-step guide (Node.js, Expo CLI, VS Code, Expo Go)
- **Core Concepts** — Interactive tabbed explorer with web-vs-native comparisons, code examples, and quizzes
- **Build a Project** — Full Todo app walkthrough with live Expo Snack playground
- **Resources** — Curated links and "what to learn next" roadmap

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A modern web browser

### Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/UltimateExpoGuide.git
cd UltimateExpoGuide
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- **Vite** — Build tool
- **React 19** + **TypeScript** — UI framework
- **Tailwind CSS v4** — Styling (custom dark theme with gradient effects)
- **Lucide React** — Icons
- **Prism React Renderer** — Syntax highlighting

## Deployment

Auto-deploys to **GitHub Pages** on push to `main` via GitHub Actions.

### Setup GitHub Pages

1. Go to **Settings → Pages**
2. Under "Build and deployment", select **GitHub Actions**
3. Push to `main` — done!

### Manual build

```bash
npm run build   # outputs to dist/
```

## About Expo Go

This guide uses [Expo Go](https://expo.dev/go) for testing on real devices — a **free** app on iOS and Android. No Apple Developer account ($99/year) needed. Write code, run `npx expo start`, scan the QR code, and your app appears on your phone with live hot reloading.

## License

MIT
