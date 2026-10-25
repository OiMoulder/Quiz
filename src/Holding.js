import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function HoldingPage({ round: propRound, score: propScore, onNextRound }) {
  const navigate = useNavigate();
  const location = useLocation();

  const round = propRound || location.state?.round || 1;
  const score = propScore ?? location.state?.score ?? 0;
  const totalRounds = location.state?.totalRounds || 3;
  const streak = location.state?.streak || 0;

  const handleContinue = () => {
    if (onNextRound) {
      onNextRound();
    } else if (round < totalRounds) {
      navigate('/quiz', {
        state: {
          round: round + 1,
          carryScore: score,
          streak
        }
      });
    } else {
      navigate('/result', {
        state: {
          score,
          totalQuestions: totalRounds * 5
        }
      });
    }
  };

  return (
    <div className="card holding-card animate-fade-in">
      <div className="badge-pill mb-4">
        <span>Round {round} of {totalRounds} Complete!</span>
      </div>

      <div className="holding-trophy">🎉</div>

      <h1 className="title-gradient text-3xl font-bold mb-2">
        Great Job, Challenger!
      </h1>
      
      <p className="subtitle mb-6">
        Take a breath. You've wrapped up Round {round}.
      </p>

      <div className="stats-grid mb-6">
        <div className="stat-box">
          <div className="stat-label">Current Score</div>
          <div className="stat-value text-accent">{score} pts</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Streak</div>
          <div className="stat-value text-amber">{streak} 🔥</div>
        </div>
      </div>

      <div className="holding-actions">
        {round < totalRounds ? (
          <button
            className="btn btn-primary btn-large pulse-glow"
            onClick={handleContinue}
          >
            Start Round {round + 1} →
          </button>
        ) : (
          <button
            className="btn btn-primary btn-large pulse-glow"
            onClick={handleContinue}
          >
            See Final Results 🏆
          </button>
        )}

        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate('/')}
        >
          Exit to Menu
        </button>
      </div>
    </div>
  );
}

export default HoldingPage;
