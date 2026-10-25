# QuizMaster ⚡

[![Node.js CI](https://github.com/OiMoulder/Quiz/actions/workflows/node.js.yml/badge.svg)](https://github.com/OiMoulder/Quiz/actions/workflows/node.js.yml)
[![Node 24](https://img.shields.io/badge/node-24.x-brightgreen.svg)](https://nodejs.org/)
[![React 18](https://img.shields.io/badge/react-18.3.1-blue.svg)](https://react.dev/)
[![GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-success.svg)](https://oimoulder.github.io/Quiz/)

An interactive, responsive trivia and quiz web application built with React, styled with vanilla modern CSS, and deployed automatically to GitHub Pages.

🎮 **Live Application**: [https://oimoulder.github.io/Quiz/](https://oimoulder.github.io/Quiz/)

---

## ✨ Features & Highlights

- **Modern React Architecture**: Built with React 18 functional components and hooks (`useState`, `useEffect`, `useCallback`, `useRef`).
- **Resilient Client-Side Routing**: GitHub Pages-compatible routing using `HashRouter` and relative asset resolution (`homepage: "."`) to ensure seamless navigation and zero 404s on page reloads.
- **Multiple Categories & Topics**:
  - 🌍 **World Geography**: Capitals, landmarks, and continents.
  - ⚡ **Science & Tech**: Computing, space, physics, and modern inventions.
  - 🏛️ **History & Culture**: Historic milestones, key treaties, and famous figures.
  - 🎬 **Pop & Entertainment**: Cinema, music, television, and gaming.
  - 🎯 **Mixed Trivia**: Curated randomized mix across all domains.
- **Engaging Gameplay Modes**:
  - **Quick Blitz**: 5 fast-paced trivia questions.
  - **Full Challenge**: 10 comprehensive questions for serious players.
  - **Multi-Round Tournament**: 3 rounds with intermission holding screens between rounds.
- **Dynamic Gameplay Experience**:
  - 20-second per-question countdown timer with warning alerts.
  - Real-time streak tracking with streak bonuses (`🔥 3 Streak!`).
  - Instant visual feedback on answer selection with color-coded markers.
  - Educational explanation callouts revealing trivia facts after answering.
  - In-browser Web Audio API sound effects with a mute/unmute control.
- **Comprehensive Results & Review**:
  - Animated SVG circular accuracy meter.
  - Performance tier badges (Grandmaster, Quiz Prodigy, Sharp Mind) with celebratory confetti.
  - Filterable question breakdown (All / Correct / Incorrect) with your answer vs. the correct answer.
  - One-click score sharing to clipboard.
- **Modern Dark UI**: Sleek dark aesthetic with glassmorphic cards, vibrant gradient accents, and responsive layout for mobile, tablet, and desktop screens.

---

## 🚀 Quick Start

### Prerequisites
* **Node.js**: `24.x` or later (managed via `.nvmrc`)
* **npm**: `10.x` or later

### Installation
```bash
# Clone the repository
git clone https://github.com/OiMoulder/Quiz.git
cd Quiz

# Install dependencies
npm install
```

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Runs the development server at [http://localhost:3000](http://localhost:3000) |
| `CI=true npm test` | Runs the test suite via Jest and React Testing Library |
| `CI=true npm run build` | Builds the optimized production bundle to the `build/` directory |
| `npm run deploy` | Deploys the production bundle to the `gh-pages` branch |

---

## 🛠️ Project Structure

```
Quiz/
├── .devcontainer/        # Dev Container configuration (Node 24 Bookworm)
├── .github/
│   └── workflows/
│       └── node.js.yml   # Automated CI/CD pipeline on ubuntu-latest
├── public/
│   ├── favicon.ico       # Favicon
│   └── index.html        # HTML document template
├── src/
│   ├── App.js            # Main application shell, navbar, routes, footer
│   ├── App.css           # Modern styles, animations, design tokens, confetti
│   ├── Home.js           # Category & game mode selection screen
│   ├── Quiz.js           # Interactive quiz engine, countdown timer, streaks
│   ├── QuizData.js       # Curated question dataset and filtering logic
│   ├── Holding.js        # Intermission & round transition screen
│   ├── Result.js         # Final score report, accuracy ring, question review
│   ├── soundEffects.js   # Zero-dependency Web Audio sound effects
│   ├── index.js          # React DOM root mounting
│   └── App.test.js       # Automated unit and integration test suite
├── .nvmrc                # Node version specification (24)
├── AGENTS.md             # Guidelines for AI coding agents & contributors
├── package.json          # Dependencies, scripts, and overrides
└── README.md
```

---

## 🔒 Security & Dependency Hygiene

This repository proactively manages its dependencies:
* Transitive vulnerabilities from legacy build dependencies are neutralized using the `overrides` section in `package.json`.
* Critical and high-severity security vulnerabilities are kept at zero.
* Automated testing and build verification run on every Pull Request via GitHub Actions before code is merged.

---

## 🤖 AI Agent Guidelines

For developers or AI coding agents making changes in this repository, please review [AGENTS.md](AGENTS.md) for strict guidelines on author attribution, commit conventions, architectural rules, and test verification requirements.

---

## 📄 License

This project is open-source and created by [Josh Moulder](https://github.com/OiMoulder).
