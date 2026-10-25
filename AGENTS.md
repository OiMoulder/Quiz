# AGENTS.md — Development & Contribution Guide for AI Agents

Welcome to **QuizMaster** (`OiMoulder/Quiz`). This repository is an interactive trivia and quiz web application built with React, styled with vanilla modern CSS, and hosted entirely on GitHub Pages.

This document serves as the single source of truth for AI agents (and human contributors paired with AI) working on this codebase.

---

## 1. Repository Identity & Git Guidelines (CRITICAL)

### Identity & Author Attribution
* **Owner & Account**: This repository belongs to **`OiMoulder`** (`Josh Moulder`).
* **Author Email**: All git commits **must** be authored and committed using Josh's personal GitHub noreply email:
  ```bash
  git config user.name "Josh Moulder"
  git config user.email "56400569+OiMoulder@users.noreply.github.com"
  ```
* **NEVER** use work emails (e.g., `@yell.com`), corporate accounts, or any credentials from outside this personal GitHub identity.
* When pushing or interacting with the GitHub API, use the personal `GITHUB_TOKEN` from `.env.local` or environment variables.

### Secrets & Environment Safety
* **NEVER commit `.env.local` or any secret tokens.**
* `.env.local` is listed in `.gitignore`. Always run `git status` before staging and verify that `.env.local` remains untracked/ignored.

### Branching & PR Workflow
* Branch from `master` using descriptive names:
  * Features: `feature/<feature-name>`
  * Fixes: `fix/<bug-description>`
  * Chores/Dependencies: `chore/<description>`
* Open Pull Requests against `master`.

---

## 2. Technical Architecture & Core Principles

### React & Modern Hooks
* **Functional Components Only**: All components use functional React with hooks (`useState`, `useEffect`, `useCallback`, `useRef`). Legacy class components have been retired.
* **Component Responsibilities**:
  * `App.js`: Top navbar, route definitions, sound toggle state, and footer.
  * `Home.js`: Category selection, game mode selector (Quick Blitz, Full Challenge, Multi-Round), and start actions.
  * `Quiz.js`: Core quiz gameplay engine, 20-second countdown timer, live streak counter, instant color-coded feedback, and explanation callouts.
  * `Holding.js`: Intermission screen for multi-round tournaments, showing round recap and continue controls.
  * `Result.js`: Final score dashboard, animated SVG accuracy ring, score tier badges, celebratory confetti, filterable question review, and clipboard share.
  * `soundEffects.js`: Zero-dependency Web Audio API oscillator synthesis (correct chime, incorrect boop, clicks, fanfare) with mute toggle support.
  * `QuizData.js`: Curated question dataset and filtering helpers.

### Routing & GitHub Pages Compatibility
* **Always use `HashRouter`**: GitHub Pages is a static host. Using `BrowserRouter` causes HTTP 404 errors on direct navigation or page refresh for subroutes (`/quiz`, `/result`, `/holding`). `HashRouter` (`/#/quiz`, `/#/result`) guarantees 100% reliable navigation.
* **Relative Asset URLs**: In `package.json`, `"homepage": "."` is required. This ensures all compiled bundles in `build/` use relative paths (`./static/...`), making the app resilient regardless of repository casing (`/Quiz/` vs `/quiz/`) or custom domains.

### Zero-Bloat Styling
* Styled entirely with modern CSS in `App.css` and `index.css`.
* Uses CSS variables for theming, responsive flex/grid layouts, smooth CSS animations, and dark-mode aesthetic.
* **Do not install heavy third-party UI frameworks** (Bootstrap, Semantic UI, Tailwind builds) to keep dependencies clean, fast, and free of security vulnerabilities.

---

## 3. Toolchain & Node.js Environment

* **Node.js Version**: **Node.js 24** (`.nvmrc` and `engines` in `package.json`: `>=24.0.0`).
* **CI Runner**: GitHub Actions runs on **`ubuntu-latest`** with Node 24.
* **Dependency Management**:
  * Transitive security patches must be placed in the `"overrides"` section of `package.json` to keep `npm audit` clean without breaking the Create React App build pipeline.
  * Always verify that `npm audit` reports zero critical or high vulnerabilities.

---

## 4. Key Developer Commands

Before opening or updating a Pull Request, always execute and verify these commands:

| Command | Purpose | Expected Result |
| :--- | :--- | :--- |
| `npm install` | Install/sync dependencies | Exits cleanly, updates `package-lock.json` |
| `npm start` | Run local dev server | Starts dev server at `http://localhost:3000` |
| `CI=true npm test` | Run test suite with Jest/RTL | **All test suites pass** with zero failures |
| `CI=true npm run build` | Compile production build | **Compiles with 0 errors and 0 warnings** |
| `npm audit` | Run npm vulnerability scan | No critical or high vulnerabilities |

---

## 5. Automated CI/CD Pipeline

The workflow defined in `.github/workflows/node.js.yml`:
* **Pull Requests to `master`**: Runs `npm ci`, `CI=true npm test`, and `CI=true npm run build`. Does **not** deploy.
* **Push to `master`**: Tests, builds, and deploys the production `build/` artifact to the `gh-pages` branch using `JamesIves/github-pages-deploy-action@v4`.

---

## 6. Checklist for Changes

- [ ] Git author is set to `Josh Moulder <56400569+OiMoulder@users.noreply.github.com>`
- [ ] `.env.local` is **NOT** staged or committed
- [ ] `HashRouter` is preserved for all routes
- [ ] `CI=true npm test` passes 100%
- [ ] `CI=true npm run build` succeeds without ESLint or compiler warnings
- [ ] Pull request opened under `OiMoulder` account
