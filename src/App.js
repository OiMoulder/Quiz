import { CATEGORIES } from './QuizData.js';
import { getCategory, selectQuestions } from './quiz-engine.js';
import { soundManager } from './soundEffects.js';

const QUESTION_SECONDS = 20;
const ROUND_COUNT = 3;
const ROUND_QUESTIONS = 5;
const app = document.querySelector('#app');
const screen = document.querySelector('#screen');

const state = {
  category: 'all',
  mode: 'quick',
  questions: [],
  questionIndex: 0,
  score: 0,
  streak: 0,
  timeLeft: QUESTION_SECONDS,
  answered: false,
  selectedOption: null,
  history: [],
  sessionHistory: [],
  filter: 'all',
  copied: false,
  shareMessage: '',
  fanfarePlayed: false,
  soundOn: soundManager.isEnabled(),
  round: 1,
  timer: null
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function currentRoute() {
  return location.hash.replace(/^#\/?/, '') || 'home';
}

function navigate(route) {
  const nextHash = `#/${route}`;
  if (location.hash === nextHash) render();
  else location.hash = nextHash;
}

function clearTimer() {
  if (state.timer !== null) {
    clearInterval(state.timer);
    state.timer = null;
  }
}

function render() {
  clearTimer();
  const route = currentRoute();

  if (route === 'quiz' && state.questions.length) renderQuiz();
  else if (route === 'holding' && state.sessionHistory.length) renderHolding();
  else if (route === 'result' && state.sessionHistory.length) renderResult();
  else renderHome();

  updateSoundButton();
}

function updateSoundButton() {
  const button = document.querySelector('[data-action="sound"]');
  if (!button) return;
  button.textContent = state.soundOn ? '🔊' : '🔇';
  button.setAttribute('aria-label', state.soundOn ? 'Mute sound' : 'Enable sound');
  button.title = state.soundOn ? 'Mute sound effects' : 'Enable sound effects';
}

function renderHome() {
  screen.innerHTML = `
    <section class="card home-card animate-fade-in">
      <div class="hero-banner text-center">
        <div class="hero-badge">⚡ Interactive Trivia</div>
        <h1 class="hero-title title-gradient">The Ultimate Quiz</h1>
        <p class="hero-subtitle text-muted">Test your knowledge, challenge your mind, and beat your high score.</p>
      </div>
      <section class="selection-section" aria-labelledby="category-title">
        <h2 id="category-title" class="section-title">1. Choose a Category</h2>
        <div class="category-grid">
          ${CATEGORIES.map(category => `
            <button type="button" class="category-card ${state.category === category.id ? 'category-active' : ''}"
              data-action="category" data-value="${category.id}" aria-pressed="${state.category === category.id}">
              <span class="cat-icon-lg" aria-hidden="true">${category.icon}</span>
              <span class="cat-name">${escapeHtml(category.name)}</span>
              <span class="cat-desc text-muted">${escapeHtml(category.description)}</span>
            </button>
          `).join('')}
        </div>
      </section>
      <section class="selection-section" aria-labelledby="mode-title">
        <h2 id="mode-title" class="section-title">2. Select Game Mode</h2>
        <div class="mode-toggle-group">
          ${[
            ['quick', '⚡ Quick Blitz', '5 Questions'],
            ['full', '🧠 Full Challenge', '10 Questions'],
            ['rounds', '🏆 Multi-Round', '3 rounds with breaks']
          ].map(([mode, title, meta]) => `
            <button type="button" class="mode-btn ${state.mode === mode ? 'mode-active' : ''}"
              data-action="mode" data-value="${mode}" aria-pressed="${state.mode === mode}">
              <span class="mode-title">${title}</span><span class="mode-meta">${meta}</span>
            </button>
          `).join('')}
        </div>
      </section>
      <div class="home-action-row">
        <button type="button" class="btn btn-primary btn-large" data-action="start">Start Quiz Now 🚀</button>
      </div>
    </section>`;
}

function startGame() {
  state.round = 1;
  state.score = 0;
  state.streak = 0;
  state.history = [];
  state.sessionHistory = [];
  state.fanfarePlayed = false;
  state.copied = false;
  state.shareMessage = '';
  const limit = state.mode === 'full' ? 10 : state.mode === 'rounds' ? ROUND_QUESTIONS : 5;
  state.questions = selectQuestions({
    category: state.category,
    round: state.mode === 'rounds' ? 1 : null,
    limit
  });
  state.questionIndex = 0;
  state.answered = false;
  state.selectedOption = null;
  state.timeLeft = QUESTION_SECONDS;
  navigate('quiz');
}

function currentQuestion() {
  return state.questions[state.questionIndex];
}

function renderQuiz() {
  const question = currentQuestion();
  if (!question) {
    finishGame();
    return;
  }

  const category = getCategory(question.category);
  const progress = Math.round(((state.questionIndex + 1) / state.questions.length) * 100);
  screen.innerHTML = `
    <section class="card quiz-card animate-fade-in">
      <div class="quiz-meta-header">
        <div class="meta-pills">
          <span class="category-pill">${category.icon} ${escapeHtml(category.name)}</span>
          ${state.mode === 'rounds' ? `<span class="category-pill text-accent">Round ${state.round}/${ROUND_COUNT}</span>` : ''}
        </div>
        <div class="meta-pills">
          ${state.streak >= 2 ? `<span class="streak-badge">🔥 ${state.streak} Streak!</span>` : ''}
          <span id="timer" class="timer-badge ${state.timeLeft <= 5 ? 'timer-warning' : ''}" aria-live="off">⏱️ ${state.timeLeft}s</span>
        </div>
      </div>
      <div class="progress-container">
        <div class="progress-bar-labels">
          <strong>Question ${state.questionIndex + 1} of ${state.questions.length}</strong><span class="text-muted">${progress}%</span>
        </div>
        <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}">
          <div class="progress-fill" style="width:${progress}%"></div>
        </div>
      </div>
      <h2 class="question-text">${escapeHtml(question.question)}</h2>
      <div class="options-grid">
        ${question.options.map((option, index) => {
          const isCorrect = option === question.answer;
          const isSelected = state.answered
            ? state.history.at(-1)?.id === question.id && state.history.at(-1)?.userAnswer === option
            : state.selectedOption === option;
          const optionClass = state.answered
            ? isCorrect ? 'option-correct' : isSelected ? 'option-incorrect' : 'option-dimmed'
            : isSelected ? 'option-selected' : '';
          return `<button type="button" class="option-btn ${optionClass}" data-action="${state.answered ? 'answer-locked' : 'select-answer'}" data-index="${index}" aria-pressed="${isSelected}" ${state.answered ? 'disabled' : ''}>
            <span class="option-marker">${String.fromCharCode(65 + index)}</span>
            <span class="option-label">${escapeHtml(option)}</span>
            ${state.answered && isCorrect ? '<span class="option-icon" aria-label="Correct">✓</span>' : ''}
            ${state.answered && isSelected && !isCorrect ? '<span class="option-icon" aria-label="Incorrect">✗</span>' : ''}
          </button>`;
        }).join('')}
      </div>
      ${state.answered ? `<aside class="explanation-callout"><strong>💡 Did you know?</strong><p>${escapeHtml(question.explanation)}</p></aside>` : ''}
      <div class="quiz-footer">
        <span>Score: <strong class="text-accent">${state.score}</strong></span>
        ${state.answered
          ? `<button type="button" class="btn btn-primary" data-action="next">${state.questionIndex < state.questions.length - 1 ? 'Next Question →' : 'Finish Quiz 🏁'}</button>`
          : `<button type="button" class="btn btn-primary" data-action="submit-answer" ${state.selectedOption === null ? 'disabled' : ''}>Submit Answer</button>`}
      </div>
    </section>`;

  if (!state.answered) startTimer();
}

function startTimer() {
  state.timer = setInterval(() => {
    state.timeLeft -= 1;
    const timer = document.querySelector('#timer');
    if (timer) {
      timer.textContent = `⏱️ ${state.timeLeft}s`;
      timer.classList.toggle('timer-warning', state.timeLeft <= 5);
    }
    if (state.timeLeft <= 0) submitAnswer(state.selectedOption);
  }, 1000);
}

function selectAnswer(option) {
  if (state.answered) return;
  state.selectedOption = option;

  for (const button of screen.querySelectorAll('[data-action="select-answer"]')) {
    const isSelected = currentQuestion().options[Number(button.dataset.index)] === option;
    button.classList.toggle('option-selected', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  }

  screen.querySelector('[data-action="submit-answer"]').disabled = false;
  soundManager.playClick();
}

function submitAnswer(option) {
  if (state.answered) return;
  clearTimer();
  const question = currentQuestion();
  state.selectedOption = option;
  const correct = option === question.answer;
  state.answered = true;
  state.timeLeft = option === null ? 0 : state.timeLeft;
  if (correct) {
    state.score += 1;
    state.streak += 1;
    soundManager.playCorrect();
  } else {
    state.streak = 0;
    soundManager.playIncorrect();
  }
  state.history.push({
    id: question.id,
    question: question.question,
    userAnswer: option,
    correctAnswer: question.answer,
    isCorrect: correct,
    explanation: question.explanation
  });
  renderQuiz();
}

function advanceQuestion() {
  soundManager.playClick();
  if (state.questionIndex < state.questions.length - 1) {
    state.questionIndex += 1;
    state.answered = false;
    state.selectedOption = null;
    state.timeLeft = QUESTION_SECONDS;
    renderQuiz();
  } else {
    finishGame();
  }
}

function finishGame() {
  state.sessionHistory.push(...state.history);
  if (state.mode === 'rounds' && state.round < ROUND_COUNT) {
    navigate('holding');
  } else {
    navigate('result');
  }
}

function nextRound() {
  const usedIds = state.sessionHistory.map(item => item.id);
  state.round += 1;
  state.history = [];
  state.questionIndex = 0;
  state.answered = false;
  state.selectedOption = null;
  state.timeLeft = QUESTION_SECONDS;
  state.questions = selectQuestions({
    category: state.category,
    round: state.round,
    limit: ROUND_QUESTIONS,
    excludeIds: usedIds
  });
  navigate('quiz');
}

function renderHolding() {
  screen.innerHTML = `
    <section class="card holding-card animate-fade-in">
      <div class="badge-pill">Round ${state.round} of ${ROUND_COUNT} Complete!</div>
      <div class="holding-trophy" aria-hidden="true">🎉</div>
      <h1 class="title-gradient">Great Job, Challenger!</h1>
      <p class="subtitle">Take a breath. You've wrapped up Round ${state.round}.</p>
      <div class="stats-grid">
        <div class="stat-box"><div class="stat-label">Current Score</div><div class="stat-value text-accent">${state.score} pts</div></div>
        <div class="stat-box"><div class="stat-label">Streak</div><div class="stat-value text-amber">${state.streak} 🔥</div></div>
      </div>
      <div class="holding-actions">
        <button class="btn btn-primary btn-large" data-action="continue">Start Round ${state.round + 1} →</button>
        <button class="btn btn-secondary" data-action="home">Exit to Menu</button>
      </div>
    </section>`;
}

function resultBadge(percentage) {
  if (percentage === 100) return ['🏆', 'Grandmaster!', 'Flawless victory! You answered every question correctly.'];
  if (percentage >= 80) return ['🌟', 'Quiz Prodigy!', 'Exceptional knowledge! Outstanding performance.'];
  if (percentage >= 60) return ['✨', 'Sharp Mind!', 'Solid effort! You know your trivia well.'];
  if (percentage >= 40) return ['📚', 'Knowledge Seeker', 'Good attempt! A few tricky ones caught you.'];
  return ['🌱', 'Keep Exploring!', 'Every quiz is a stepping stone. Try again to beat your score!'];
}

function renderResult() {
  const history = state.sessionHistory;
  const score = history.filter(item => item.isCorrect).length;
  const total = history.length;
  const percentage = Math.round((score / Math.max(total, 1)) * 100);
  const [icon, title, description] = resultBadge(percentage);
  const correctCount = history.filter(item => item.isCorrect).length;
  const incorrectCount = total - correctCount;
  const visibleHistory = history.filter(item =>
    state.filter === 'all' || (state.filter === 'correct' ? item.isCorrect : !item.isCorrect)
  );

  if (percentage >= 70 && !state.fanfarePlayed) {
    state.fanfarePlayed = true;
    soundManager.playFanfare();
  }

  screen.innerHTML = `
    <section class="card result-card animate-fade-in">
      ${percentage >= 80 ? '<div class="confetti-container" aria-hidden="true"><span>🎉</span><span>✨</span><span>🎊</span><span>🌟</span></div>' : ''}
      <header class="result-header">
        <div class="result-badge-icon">${icon}</div>
        <h1 class="title-gradient">${title}</h1>
        <p class="subtitle">${description}</p>
      </header>
      <div class="score-summary-banner">
        <div class="score-circle-container">
          <svg class="progress-ring" width="130" height="130" viewBox="0 0 130 130" aria-hidden="true">
            <circle class="progress-ring__circle-bg" stroke-width="10" fill="transparent" r="52" cx="65" cy="65"></circle>
            <circle class="progress-ring__circle" stroke-width="10" stroke-dasharray="${2 * Math.PI * 52}" stroke-dashoffset="${2 * Math.PI * 52 * (1 - percentage / 100)}" stroke-linecap="round" fill="transparent" r="52" cx="65" cy="65"></circle>
          </svg>
          <div class="score-percentage-text"><span class="percent-num">${percentage}%</span><span class="percent-label">Accuracy</span></div>
        </div>
        <div class="score-meta-stats">
          <div class="meta-stat-item"><span class="meta-label">Final Score</span><span class="meta-value text-accent">${score} / ${total}</span></div>
          <div class="meta-stat-item"><span class="meta-label">Correct Answers</span><span class="meta-value text-green">${correctCount}</span></div>
          <div class="meta-stat-item"><span class="meta-label">Incorrect Answers</span><span class="meta-value text-rose">${incorrectCount}</span></div>
        </div>
      </div>
      ${state.shareMessage ? `<p class="share-message" role="status">${escapeHtml(state.shareMessage)}</p>` : ''}
      <div class="action-buttons-row">
        <button class="btn btn-primary" data-action="restart">🔄 Play Again</button>
        <button class="btn btn-secondary" data-action="home">🏠 Choose Category</button>
        <button class="btn btn-ghost" data-action="share">${state.copied ? '✓ Copied!' : '📤 Share Score'}</button>
      </div>
      ${history.length ? `
        <section class="review-section">
          <div class="review-header"><h2>Question Review</h2>
            <div class="filter-pill-group">
              ${[['all', `All (${total})`], ['correct', `Correct (${correctCount})`], ['incorrect', `Incorrect (${incorrectCount})`]].map(([filter, label]) =>
                `<button class="filter-pill ${state.filter === filter ? 'active' : ''}" data-action="filter" data-value="${filter}" aria-pressed="${state.filter === filter}">${label}</button>`
              ).join('')}
            </div>
          </div>
          <div class="review-list">
            ${visibleHistory.map((item, index) => `
              <article class="review-card ${item.isCorrect ? 'is-correct' : 'is-wrong'}">
                <div class="review-card-top"><span class="review-q-num">Q${index + 1}</span>
                  <span class="review-status-tag ${item.isCorrect ? 'tag-correct' : 'tag-wrong'}">${item.isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
                </div>
                <p class="review-question">${escapeHtml(item.question)}</p>
                <div class="review-answers-grid">
                  <div><span class="sub-tag">Your Answer:</span><span class="answer-text ${item.isCorrect ? 'text-green' : 'text-rose'}">${escapeHtml(item.userAnswer || '(None selected)')}</span></div>
                  ${!item.isCorrect ? `<div><span class="sub-tag">Correct Answer:</span><span class="answer-text text-green">${escapeHtml(item.correctAnswer)}</span></div>` : ''}
                </div>
                ${item.explanation ? `<p class="review-explanation">💡 ${escapeHtml(item.explanation)}</p>` : ''}
              </article>
            `).join('')}
          </div>
        </section>` : ''}
    </section>`;
}

async function shareResult() {
  const score = state.sessionHistory.filter(item => item.isCorrect).length;
  const total = state.sessionHistory.length;
  const category = getCategory(state.category);
  const message = `🎯 I scored ${score}/${total} (${Math.round(score / Math.max(total, 1) * 100)}%) on ${category.name} in QuizMaster! Can you beat me?`;
  if (!navigator.clipboard?.writeText) {
    state.shareMessage = 'Clipboard access is unavailable in this browser.';
    renderResult();
    return;
  }
  try {
    await navigator.clipboard.writeText(message);
    state.copied = true;
    state.shareMessage = '';
    renderResult();
    setTimeout(() => {
      state.copied = false;
      if (currentRoute() === 'result') renderResult();
    }, 2000);
  } catch (error) {
    state.shareMessage = 'Could not copy the score. Check browser clipboard permissions and try again.';
    console.error('Could not copy the score to the clipboard.', error);
    renderResult();
  }
}

function restartGame() {
  startGame();
}

app.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;
  const { action, value } = button.dataset;

  if (action === 'sound') {
    state.soundOn = soundManager.toggle();
    updateSoundButton();
  } else if (action === 'category') {
    state.category = value;
    soundManager.playClick();
    renderHome();
  } else if (action === 'mode') {
    state.mode = value;
    soundManager.playClick();
    renderHome();
  } else if (action === 'start') {
    soundManager.playClick();
    startGame();
  } else if (action === 'quick') {
    state.mode = 'quick';
    startGame();
  } else if (action === 'select-answer') {
    const option = currentQuestion()?.options[Number(button.dataset.index)];
    if (option !== undefined) selectAnswer(option);
  } else if (action === 'submit-answer') {
    if (state.selectedOption !== null) submitAnswer(state.selectedOption);
  } else if (action === 'next') {
    advanceQuestion();
  } else if (action === 'continue') {
    soundManager.playClick();
    nextRound();
  } else if (action === 'home') {
    soundManager.playClick();
    state.sessionHistory = [];
    navigate('home');
  } else if (action === 'restart') {
    restartGame();
  } else if (action === 'share') {
    shareResult();
  } else if (action === 'filter') {
    state.filter = value;
    renderResult();
  }
});

window.addEventListener('hashchange', render);
window.addEventListener('pagehide', clearTimer);
render();
