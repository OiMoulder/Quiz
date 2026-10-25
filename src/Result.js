import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { soundManager } from './soundEffects';

function Result({
  score: propScore,
  totalQuestions: propTotal,
  history: propHistory,
  onRestart
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state || {};
  const score = propScore ?? state.score ?? 0;
  const total = propTotal ?? state.totalQuestions ?? (state.history?.length || 1);
  const history = propHistory || state.history || [];
  const categoryName = state.categoryName || 'Quiz';

  const [filter, setFilter] = useState('all'); // 'all' | 'correct' | 'incorrect'
  const [copied, setCopied] = useState(false);

  const percentage = Math.round((score / Math.max(total, 1)) * 100);

  useEffect(() => {
    if (percentage >= 70) {
      soundManager.playFanfare();
    }
  }, [percentage]);

  const getPerformanceBadge = () => {
    if (percentage === 100) return { icon: '🏆', title: 'Grandmaster!', desc: 'Flawless victory! You answered every question correctly.' };
    if (percentage >= 80) return { icon: '🌟', title: 'Quiz Prodigy!', desc: 'Exceptional knowledge! Outstanding performance.' };
    if (percentage >= 60) return { icon: '✨', title: 'Sharp Mind!', desc: 'Solid effort! You know your trivia well.' };
    if (percentage >= 40) return { icon: '📚', title: 'Knowledge Seeker', desc: 'Good attempt! A few tricky ones caught you.' };
    return { icon: '🌱', title: 'Keep Exploring!', desc: 'Every quiz is a stepping stone. Try again to beat your score!' };
  };

  const badge = getPerformanceBadge();

  const handleShare = () => {
    const text = `🎯 I scored ${score}/${total} (${percentage}%) on the ${categoryName} in Josh's Quiz App! Can you beat me?`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const filteredHistory = history.filter((item) => {
    if (filter === 'correct') return item.isCorrect;
    if (filter === 'incorrect') return !item.isCorrect;
    return true;
  });

  return (
    <div className="card result-card animate-fade-in">
      {percentage >= 80 && (
        <div className="confetti-container" aria-hidden="true">
          <div className="confetti-piece p1" />
          <div className="confetti-piece p2" />
          <div className="confetti-piece p3" />
          <div className="confetti-piece p4" />
          <div className="confetti-piece p5" />
          <div className="confetti-piece p6" />
        </div>
      )}

      <div className="result-header text-center">
        <div className="result-badge-icon pulse-bounce">{badge.icon}</div>
        <h1 className="title-gradient text-3xl font-bold">{badge.title}</h1>
        <p className="subtitle mt-1">{badge.desc}</p>
      </div>

      <div className="score-summary-banner mt-6">
        <div className="score-circle-container">
          <svg className="progress-ring" width="130" height="130">
            <circle
              className="progress-ring__circle-bg"
              strokeWidth="10"
              fill="transparent"
              r="52"
              cx="65"
              cy="65"
            />
            <circle
              className="progress-ring__circle"
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={2 * Math.PI * 52 * (1 - percentage / 100)}
              strokeLinecap="round"
              fill="transparent"
              r="52"
              cx="65"
              cy="65"
            />
          </svg>
          <div className="score-percentage-text">
            <span className="percent-num">{percentage}%</span>
            <span className="percent-label">Accuracy</span>
          </div>
        </div>

        <div className="score-meta-stats">
          <div className="meta-stat-item">
            <span className="meta-label">Final Score</span>
            <span className="meta-value text-accent">{score} / {total}</span>
          </div>
          <div className="meta-stat-item">
            <span className="meta-label">Correct Answers</span>
            <span className="meta-value text-green">
              {history.filter(h => h.isCorrect).length}
            </span>
          </div>
          <div className="meta-stat-item">
            <span className="meta-label">Incorrect Answers</span>
            <span className="meta-value text-rose">
              {history.filter(h => !h.isCorrect).length}
            </span>
          </div>
        </div>
      </div>

      <div className="action-buttons-row mt-6">
        <button
          className="btn btn-primary"
          onClick={() => {
            if (onRestart) onRestart();
            else navigate('/quiz', { state: { category: state.category || 'all' } });
          }}
        >
          🔄 Play Again
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          🏠 Choose Category
        </button>

        <button
          className="btn btn-ghost"
          onClick={handleShare}
          title="Copy score to clipboard"
        >
          {copied ? '✓ Copied!' : '📤 Share Score'}
        </button>
      </div>

      {history.length > 0 && (
        <div className="review-section mt-8">
          <div className="review-header flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Question Review</h2>
            <div className="filter-pill-group">
              <button
                className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({history.length})
              </button>
              <button
                className={`filter-pill ${filter === 'correct' ? 'active' : ''}`}
                onClick={() => setFilter('correct')}
              >
                Correct ({history.filter(h => h.isCorrect).length})
              </button>
              <button
                className={`filter-pill ${filter === 'incorrect' ? 'active' : ''}`}
                onClick={() => setFilter('incorrect')}
              >
                Incorrect ({history.filter(h => !h.isCorrect).length})
              </button>
            </div>
          </div>

          <div className="review-list">
            {filteredHistory.map((item, index) => (
              <div
                key={item.id || index}
                className={`review-card ${item.isCorrect ? 'is-correct' : 'is-wrong'}`}
              >
                <div className="review-card-top flex items-start justify-between">
                  <span className="review-q-num">Q{index + 1}</span>
                  <span className={`review-status-tag ${item.isCorrect ? 'tag-correct' : 'tag-wrong'}`}>
                    {item.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>

                <p className="review-question font-medium mt-1">{item.question}</p>

                <div className="review-answers-grid mt-3">
                  <div className="review-answer-col">
                    <span className="sub-tag">Your Answer:</span>
                    <span className={`answer-text ${item.isCorrect ? 'text-green' : 'text-rose'}`}>
                      {item.userAnswer || '(None selected)'}
                    </span>
                  </div>

                  {!item.isCorrect && (
                    <div className="review-answer-col">
                      <span className="sub-tag">Correct Answer:</span>
                      <span className="answer-text text-green font-semibold">
                        {item.correctAnswer}
                      </span>
                    </div>
                  )}
                </div>

                {item.explanation && (
                  <div className="review-explanation mt-3">
                    💡 <em>{item.explanation}</em>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Result;
