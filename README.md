# QuizMaster ⚡

An interactive, responsive quiz and trivia application built with React.

Live Demo: [https://oimoulder.github.io/quiz](https://oimoulder.github.io/quiz)

---

## ✨ Features & Overhaul Highlights

- **Modern React Architecture**: Refactored from legacy class components to React 18 functional components with hooks (`useState`, `useEffect`, `useCallback`, `useRef`).
- **Robust Routing**: GitHub Pages-compatible routing using `HashRouter` to prevent 404 errors on direct navigation or page refresh.
- **Multiple Categories & Modes**:
  - Categories: Mixed Trivia, World Geography, Science & Tech, History & Culture, Pop & Entertainment.
  - Modes: Quick Blitz (5 questions), Full Challenge (10 questions), Multi-Round Tournament (with interstitial holding screens between rounds).
- **Interactive Gameplay**:
  - 20-second per-question countdown timer with warning alerts.
  - Real-time streak tracking with streak bonuses.
  - Immediate visual feedback on answer selection (color coded with check/cross icons).
  - Educational explanation callouts explaining facts behind answers.
  - Web Audio API sound effects (synthesized in-browser with mute/unmute toggle).
- **Polished Results & Review**:
  - Animated SVG circular accuracy meter.
  - Performance badges and confetti celebrations for high scorers.
  - Filterable question-by-question review (All / Correct / Incorrect).
  - One-click score sharing to clipboard.
- **Sleek, Responsive UI**:
  - Modern dark-mode aesthetic with gradient accents, smooth card transitions, and mobile-friendly layout.

---

## 🚀 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`
Runs the automated test suite with Jest and React Testing Library.

### `npm run build`
Bundles the app into static files in the `build/` folder for production deployment.

### `npm run deploy`
Deploys the production build to GitHub Pages via `gh-pages`.

---

## 🛠️ Project Structure

```
Quiz/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── App.js            # App shell, routing, navbar, footer
│   ├── App.css           # Modern styles, themes, animations, confetti
│   ├── Home.js           # Category & game mode selector
│   ├── Quiz.js           # Core interactive quiz engine & timer
│   ├── QuizData.js       # Curated question dataset and filters
│   ├── Holding.js        # Intermission & round transition screen
│   ├── Result.js         # Score report, accuracy ring, question review
│   ├── soundEffects.js   # Zero-dependency Web Audio sound effects
│   ├── index.js          # React DOM root mounting
│   └── App.test.js       # Component & integration test suite
└── package.json
```
