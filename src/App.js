import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz';
import HoldingPage from './Holding';
import Result from './Result';
import { soundManager } from './soundEffects';
import './App.css';

function App() {
  const [soundOn, setSoundOn] = useState(soundManager.isEnabled());

  const handleToggleSound = () => {
    const newState = soundManager.toggle();
    setSoundOn(newState);
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app-shell">
        {/* Navigation Bar */}
        <header className="navbar">
          <div className="nav-container">
            <Link to="/" className="brand-logo">
              <span className="brand-icon">✨</span>
              <span className="brand-name">QuizMaster</span>
            </Link>

            <nav className="nav-links">
              <Link to="/" className="nav-link">
                Categories
              </Link>
              <Link to="/quiz" className="nav-link">
                Quick Play
              </Link>
              <button
                type="button"
                className="sound-toggle-btn"
                onClick={handleToggleSound}
                title={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
                aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
              >
                {soundOn ? '🔊' : '🔇'}
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="main-content">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/holding" element={<HoldingPage />} />
              <Route path="/result" element={<Result />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>
            Crafted with React • <a href="https://github.com/OiMoulder/Quiz" target="_blank" rel="noreferrer">GitHub</a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
