import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from './QuizData';
import { soundManager } from './soundEffects';

function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [gameMode, setGameMode] = useState('quick'); // 'quick' (5) | 'full' (10) | 'rounds'

  const handleStart = () => {
    soundManager.playClick();
    if (gameMode === 'rounds') {
      navigate('/quiz', {
        state: {
          category: selectedCategory,
          round: 1,
          totalRounds: 3,
          carryScore: 0
        }
      });
    } else {
      navigate('/quiz', {
        state: {
          category: selectedCategory,
          limit: gameMode === 'full' ? 10 : 5
        }
      });
    }
  };

  return (
    <div className="card home-card animate-fade-in">
      <div className="hero-banner text-center mb-6">
        <div className="hero-badge mb-2">⚡ Interactive Trivia</div>
        <h1 className="hero-title title-gradient text-4xl font-extrabold mb-2">
          The Ultimate Quiz
        </h1>
        <p className="hero-subtitle text-muted">
          Test your knowledge, challenge your mind, and beat your high score.
        </p>
      </div>

      <div className="category-selection mb-6">
        <h2 className="section-title text-sm uppercase tracking-wider text-muted font-bold mb-3">
          1. Choose a Category
        </h2>
        <div className="category-grid">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`category-card ${isSelected ? 'category-active' : ''}`}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat.id);
                }}
              >
                <span className="cat-icon-lg">{cat.icon}</span>
                <span className="cat-name font-semibold">{cat.name}</span>
                <span className="cat-desc text-xs text-muted">{cat.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mode-selection mb-6">
        <h2 className="section-title text-sm uppercase tracking-wider text-muted font-bold mb-3">
          2. Select Game Mode
        </h2>
        <div className="mode-toggle-group">
          <button
            type="button"
            className={`mode-btn ${gameMode === 'quick' ? 'mode-active' : ''}`}
            onClick={() => {
              soundManager.playClick();
              setGameMode('quick');
            }}
          >
            <span className="mode-title font-semibold">⚡ Quick Blitz</span>
            <span className="mode-meta text-xs">5 Questions</span>
          </button>

          <button
            type="button"
            className={`mode-btn ${gameMode === 'full' ? 'mode-active' : ''}`}
            onClick={() => {
              soundManager.playClick();
              setGameMode('full');
            }}
          >
            <span className="mode-title font-semibold">🧠 Full Challenge</span>
            <span className="mode-meta text-xs">10 Questions</span>
          </button>

          <button
            type="button"
            className={`mode-btn ${gameMode === 'rounds' ? 'mode-active' : ''}`}
            onClick={() => {
              soundManager.playClick();
              setGameMode('rounds');
            }}
          >
            <span className="mode-title font-semibold">🏆 Multi-Round</span>
            <span className="mode-meta text-xs">3 Rounds with Breaks</span>
          </button>
        </div>
      </div>

      <div className="home-action-row pt-2 text-center">
        <button
          type="button"
          className="btn btn-primary btn-large pulse-glow w-full"
          onClick={handleStart}
        >
          Start Quiz Now 🚀
        </button>
      </div>
    </div>
  );
}

export default Home;
