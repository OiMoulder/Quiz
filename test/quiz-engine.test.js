import assert from 'node:assert/strict';
import test from 'node:test';
import { CATEGORIES, QuizData } from '../src/QuizData.js';
import { getCategory, selectQuestions, shuffle } from '../src/quiz-engine.js';

test('shuffles without changing the original array or losing items', () => {
  const original = [1, 2, 3, 4];
  const shuffled = shuffle(original, () => 0);

  assert.deepEqual(original, [1, 2, 3, 4]);
  assert.deepEqual(shuffled, [2, 3, 4, 1]);
  assert.deepEqual([...shuffled].sort(), original);
});

test('selects the requested category and prioritizes the selected round', () => {
  const selected = selectQuestions({
    category: 'geo',
    round: 2,
    limit: 3,
    random: () => 0
  });

  assert.equal(selected.length, 3);
  assert.deepEqual(selected.slice(0, 2).map(question => question.round), [2, 2]);
  assert.ok(selected.every(question => question.category === 'geo'));
});

test('fills a full challenge from other categories when needed', () => {
  const selected = selectQuestions({
    category: 'geo',
    limit: 10,
    random: () => 0
  });

  assert.equal(selected.length, 10);
  assert.equal(new Set(selected.map(question => question.id)).size, 10);
  assert.equal(selected[0].category, 'geo');
});

test('excludes used questions across tournament rounds', () => {
  const firstRound = selectQuestions({ category: 'geo', round: 1, limit: 5, random: () => 0 });
  const secondRound = selectQuestions({
    category: 'geo',
    round: 2,
    limit: 5,
    excludeIds: firstRound.map(question => question.id),
    random: () => 0
  });

  assert.equal(firstRound.length, 5);
  assert.equal(secondRound.length, 5);
  assert.equal(new Set([...firstRound, ...secondRound].map(question => question.id)).size, 10);
});

test('category lookup falls back to mixed trivia', () => {
  assert.equal(getCategory('not-a-category'), CATEGORIES[0]);
});

test('every quiz item has four options and a valid answer', () => {
  assert.ok(QuizData.length > 0);
  for (const question of QuizData) {
    assert.equal(question.options.length, 4, question.question);
    assert.ok(question.options.includes(question.answer), question.question);
  }
});
