# AGENTS.md — Development & Contribution Guide for AI Agents

Welcome to **QuizMaster** (`OiMoulder/Quiz`). This repository is an interactive trivia and quiz web application built with native browser JavaScript and CSS, and hosted entirely on GitHub Pages.

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

### Native Browser JavaScript
* The application uses browser-native ES modules, HTML, and CSS; it has no runtime framework or third-party dependencies.
* `index.html` is the static entry point. `src/app.js` handles screens, navigation, state, and user interaction.
* `src/quiz-engine.js` contains question selection and shuffle helpers. `src/QuizData.js` holds the curated questions and categories.
* `src/soundEffects.js` synthesizes optional audio with the Web Audio API.
* Keep the app runnable from static files on GitHub Pages; do not add a client router, bundler, remote font, or external runtime asset without a measured need.

### Routing & GitHub Pages Compatibility
* Use hash navigation so the static site works on GitHub Pages project URLs without server-side routing.
* Keep asset paths relative so the same static output works at the repository root and under `/Quiz/`.

### Zero-Bloat Styling
* Styled entirely with modern CSS in `App.css` and `index.css`.
* Uses CSS variables for theming, responsive flex/grid layouts, smooth CSS animations, and dark-mode aesthetic.
* **Do not install heavy third-party UI frameworks** (Bootstrap, Semantic UI, Tailwind builds) to keep dependencies clean, fast, and free of security vulnerabilities.

---

## 3. Toolchain & Node.js Environment

* **Node.js Version**: **Node.js 24** (`engines` in `package.json`: `>=24.0.0`).
* **CI Runner**: GitHub Actions runs on **`ubuntu-latest`** with Node 24.
* **Dependencies**: No npm packages are required. Use Node's built-in HTTP server, file utilities, and test runner.

---

## 4. Key Developer Commands

Before opening or updating a Pull Request, always execute and verify these commands:

| Command | Purpose | Expected Result |
| :--- | :--- | :--- |
| `npm start` | Run the local static server | Starts at `http://127.0.0.1:4173` |
| `npm test` | Run the built-in Node test suite | All tests pass |
| `npm run build` | Copy static files into `dist/` | Completes without external tooling |

---

## 5. Automated CI/CD Pipeline

The workflow defined in `.github/workflows/node.js.yml`:
* **Pull Requests to `master`**: Runs `npm ci`, `npm test`, and `npm run build`. Does **not** deploy.
* **Push to `master`**: Tests, copies the static app to `dist/`, and deploys it to the `gh-pages` branch using `JamesIves/github-pages-deploy-action@v4`.

---

## 6. Checklist for Changes

- [ ] Git author is set to `Josh Moulder <56400569+OiMoulder@users.noreply.github.com>`
- [ ] `.env.local` is **NOT** staged or committed
- [ ] Hash-based navigation is preserved for GitHub Pages
- [ ] `npm test` passes
- [ ] `npm run build` succeeds
- [ ] Pull request opened under `OiMoulder` account
