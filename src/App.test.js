import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Quiz from './Quiz';
import Result from './Result';
import HoldingPage from './Holding';
import { HashRouter } from 'react-router-dom';

test('renders QuizMaster brand and home categories', () => {
  render(<App />);
  const brandElement = screen.getByText(/QuizMaster/i);
  expect(brandElement).toBeInTheDocument();
  expect(screen.getByText(/The Ultimate Quiz/i)).toBeInTheDocument();
  expect(screen.getByText(/Mixed Trivia/i)).toBeInTheDocument();
  expect(screen.getByText(/Start Quiz Now/i)).toBeInTheDocument();
});

test('renders quiz component with question and options', () => {
  const sampleQuestions = [
    {
      id: 1,
      category: 'geo',
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris',
      explanation: 'Paris is the capital of France.'
    }
  ];

  render(
    <HashRouter>
      <Quiz initialQuestions={sampleQuestions} />
    </HashRouter>
  );

  expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
  expect(screen.getByText('Paris')).toBeInTheDocument();
  expect(screen.getByText('London')).toBeInTheDocument();

  // Select the correct answer
  const correctBtn = screen.getByText('Paris');
  fireEvent.click(correctBtn);

  // Explanation should appear
  expect(screen.getByText(/Did you know\?/i)).toBeInTheDocument();
  expect(screen.getByText(/Paris is the capital of France\./i)).toBeInTheDocument();

  // Next/Finish button becomes available
  expect(screen.getByText(/Finish Quiz/i)).toBeInTheDocument();
});

test('renders results page with score breakdown and review', () => {
  const history = [
    {
      id: 1,
      question: 'What is the capital of India?',
      userAnswer: 'New Delhi',
      correctAnswer: 'New Delhi',
      isCorrect: true,
      explanation: 'New Delhi became the capital in 1911.'
    },
    {
      id: 2,
      question: 'Who is CEO of Tesla?',
      userAnswer: 'Bill Gates',
      correctAnswer: 'Elon Musk',
      isCorrect: false,
      explanation: 'Elon Musk is CEO.'
    }
  ];

  render(
    <HashRouter>
      <Result score={1} totalQuestions={2} history={history} />
    </HashRouter>
  );

  expect(screen.getByText(/Accuracy/i)).toBeInTheDocument();
  expect(screen.getByText('1 / 2')).toBeInTheDocument();
  expect(screen.getByText(/Question Review/i)).toBeInTheDocument();
  expect(screen.getByText(/Play Again/i)).toBeInTheDocument();
});

test('renders holding intermission page', () => {
  render(
    <HashRouter>
      <HoldingPage round={1} score={4} />
    </HashRouter>
  );

  expect(screen.getByText(/Round 1 of 3 Complete!/i)).toBeInTheDocument();
  expect(screen.getByText(/4 pts/i)).toBeInTheDocument();
  expect(screen.getByText(/Start Round 2/i)).toBeInTheDocument();
});
