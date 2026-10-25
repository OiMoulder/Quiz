import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QuizData, getQuestionsByFilter, CATEGORIES } from './QuizData';
import { soundManager } from './soundEffects';
import Result from './Result';

const QUESTION_TIMER_SECONDS = 20;

function Quiz({
  initialQuestions = null,
  category: propCategory = null,
  onComplete = null
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location?.state || {};
  const selectedCategory = propCategory || state.category || 'all';
  const round = state.round || 1;
  const totalRounds = state.totalRounds || 1;
  const carryScore = state.carryScore || 0;
  const questionLimit = state.limit || 5;

  // Load questions
  const [questions, setQuestions] = useState(() => {
    if (initialQuestions && initialQuestions.length > 0) {
      return initialQuestions;
    }
    const filtered = getQuestionsByFilter({
      category: selectedCategory,
      round: state.totalRounds ? round : null,
      limit: questionLimit
    });
    return filtered.length > 0 ? filtered : QuizData.slice(0, questionLimit);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(carryScore);
  const [streak, setStreak] = useState(state.streak || 0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIMER_SECONDS);
  const [timerActive, setTimerActive] = useState(true);
  const [history, setHistory] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];
  const timerRef = useRef(null);

  const handleTimeOut = useCallback(() => {
    if (isAnswered) return;
    setIsAnswered(true);
    setTimerActive(false);
    setStreak(0);
    soundManager.playIncorrect();

    const record = {
      id: currentQ.id,
      question: currentQ.question,
      userAnswer: null,
      correctAnswer: currentQ.answer,
      isCorrect: false,
      explanation: currentQ.explanation
    };
    setHistory((prev) => [...prev, record]);
  }, [isAnswered, currentQ]);

  // Timer countdown
  useEffect(() => {
    if (!timerActive || isAnswered || isQuizComplete) return;

    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, timerActive, isAnswered, isQuizComplete, handleTimeOut]);

  // Option select handler
  const handleSelectOption = (option) => {
    if (isAnswered) return; // Prevent re-clicks

    clearInterval(timerRef.current);
    setSelectedOption(option);
    setIsAnswered(true);
    setTimerActive(false);

    const isCorrect = option === currentQ.answer;

    if (isCorrect) {
      soundManager.playCorrect();
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      soundManager.playIncorrect();
      setStreak(0);
    }

    const record = {
      id: currentQ.id,
      question: currentQ.question,
      userAnswer: option,
      correctAnswer: currentQ.answer,
      isCorrect,
      explanation: currentQ.explanation
    };
    setHistory((prev) => [...prev, record]);
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(QUESTION_TIMER_SECONDS);
      setTimerActive(true);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setIsQuizComplete(true);
    if (onComplete) {
      onComplete({ score, totalQuestions: questions.length, history });
    } else if (state.totalRounds && round < totalRounds) {
      navigate('/holding', {
        state: {
          round,
          totalRounds,
          score,
          streak,
          category: selectedCategory
        }
      });
    } else {
      const categoryObj = CATEGORIES.find((c) => c.id === selectedCategory);
      navigate('/result', {
        state: {
          score,
          totalQuestions: questions.length,
          history,
          category: selectedCategory,
          categoryName: categoryObj ? categoryObj.name : 'Trivia'
        }
      });
    }
  };

  const handleRestartQuiz = () => {
    const refreshed = getQuestionsByFilter({
      category: selectedCategory,
      round: state.totalRounds ? 1 : null,
      limit: questionLimit
    });
    setQuestions(refreshed.length > 0 ? refreshed : QuizData.slice(0, questionLimit));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setTimeLeft(QUESTION_TIMER_SECONDS);
    setTimerActive(true);
    setHistory([]);
    setIsQuizComplete(false);
  };

  if (isQuizComplete && !onComplete) {
    return (
      <Result
        score={score}
        totalQuestions={questions.length}
        history={history}
        onRestart={handleRestartQuiz}
      />
    );
  }

  const categoryInfo = CATEGORIES.find((c) => c.id === currentQ?.category) || {
    name: 'General',
    icon: '💡'
  };

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="card quiz-card animate-fade-in">
      {/* Top Meta Bar */}
      <div className="quiz-meta-header flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="category-pill flex items-center gap-1">
            <span className="cat-icon">{categoryInfo.icon}</span>
            <span className="cat-text">{categoryInfo.name}</span>
          </div>
          {totalRounds > 1 && (
            <div className="category-pill font-semibold text-accent">
              Round {round}/{totalRounds}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <div className="streak-badge animate-bounce" title="Current streak">
              🔥 {streak} Streak!
            </div>
          )}

          <div
            className={`timer-badge ${
              timeLeft <= 5 ? 'timer-warning' : ''
            }`}
            title="Time remaining for this question"
          >
            ⏱️ {timeLeft}s
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-container mb-6">
        <div className="progress-bar-labels flex justify-between text-xs mb-1">
          <span className="font-semibold text-accent">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-muted">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="question-content mb-6">
        <h2 className="question-text text-xl font-bold">
          {currentQ.question}
        </h2>
      </div>

      {/* Options List */}
      <div className="options-grid">
        {currentQ.options.map((option, idx) => {
          let btnClass = 'option-btn';
          const isSelected = selectedOption === option;
          const isCorrect = option === currentQ.answer;

          if (isAnswered) {
            if (isCorrect) {
              btnClass += ' option-correct';
            } else if (isSelected && !isCorrect) {
              btnClass += ' option-incorrect';
            } else {
              btnClass += ' option-dimmed';
            }
          } else if (isSelected) {
            btnClass += ' option-selected';
          }

          return (
            <button
              key={`${currentQ.id}-opt-${idx}`}
              className={btnClass}
              onClick={() => handleSelectOption(option)}
              disabled={isAnswered}
              type="button"
            >
              <span className="option-marker">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="option-label">{option}</span>
              {isAnswered && isCorrect && <span className="option-icon">✓</span>}
              {isAnswered && isSelected && !isCorrect && (
                <span className="option-icon">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box on Answer */}
      {isAnswered && currentQ.explanation && (
        <div className="explanation-callout animate-slide-down mt-5">
          <div className="explanation-header font-semibold mb-1 flex items-center gap-1">
            <span>💡 Did you know?</span>
          </div>
          <p className="explanation-body text-sm">
            {currentQ.explanation}
          </p>
        </div>
      )}

      {/* Action Footer */}
      <div className="quiz-footer flex justify-between items-center mt-6 pt-4 border-t border-muted">
        <div className="score-counter text-sm">
          Score: <strong className="text-accent">{score}</strong> / {questions.length}
        </div>

        <div>
          {isAnswered ? (
            currentIndex < questions.length - 1 ? (
              <button
                className="btn btn-primary pulse-subtle"
                onClick={handleNext}
                type="button"
              >
                Next Question →
              </button>
            ) : (
              <button
                className="btn btn-primary pulse-subtle"
                onClick={handleFinish}
                type="button"
              >
                Finish Quiz 🏁
              </button>
            )
          ) : (
            <button
              className="btn btn-disabled"
              disabled
              type="button"
            >
              Choose an answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { Quiz as MainQuiz };
export default Quiz;
