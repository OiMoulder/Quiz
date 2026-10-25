# QuizMaster

A fast, responsive trivia game built with native browser JavaScript, HTML, and CSS. It runs directly on GitHub Pages without a framework, runtime dependency, bundler, or external asset request.

## Features

- Five trivia categories, three game modes, and a 20-second question timer.
- Quick Blitz, Full Challenge, and a three-round tournament with score review.
- Responsive dark UI, synthesized optional audio, answer explanations, and shareable results.
- Hash navigation and relative assets work on GitHub Pages project sites.

## Run locally

Requires Node.js 24 or later. No packages need to be installed.

```sh
npm start
```

Open the local URL printed by the server (default `http://127.0.0.1:4173`).

## Test and build

```sh
npm test
npm run build
```

Tests use Node's built-in test runner. The build script copies only the static app files into `dist/`; GitHub Pages can serve the app directly from the repository root or deploy that `dist/` folder.
