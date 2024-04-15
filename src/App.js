import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from './Quiz';
import HoldingPage from './Holding';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/holding" exact element={HoldingPage} />
        <Route path="/quiz" element={Quiz} />
      </Routes>
    </Router>
  );
}

export default App;
