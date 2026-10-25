import { CATEGORIES, QuizData } from './QuizData.js';

export function shuffle(items, random = Math.random) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

export function selectQuestions({
  category = 'all',
  round = null,
  limit = 5,
  excludeIds = [],
  random = Math.random,
  questions = QuizData
} = {}) {
  const excluded = new Set(excludeIds);
  const available = questions.filter(question => !excluded.has(question.id));
  const categoryQuestions = category === 'all'
    ? available
    : available.filter(question => question.category === category);
  const preferredQuestions = round === null
    ? categoryQuestions
    : categoryQuestions.filter(question => question.round === round);
  const preferredIds = new Set(preferredQuestions.map(question => question.id));
  const fillQuestions = available.filter(question => !preferredIds.has(question.id));
  const selection = [
    ...shuffle(preferredQuestions, random),
    ...shuffle(fillQuestions, random)
  ];

  return selection.slice(0, Math.max(0, limit));
}

export function getCategory(id) {
  return CATEGORIES.find(category => category.id === id) ?? CATEGORIES[0];
}
