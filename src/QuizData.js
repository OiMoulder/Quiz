export const CATEGORIES = [
  { id: 'all', name: 'Mixed Trivia', icon: '🎯', description: 'A curated mix of all topics' },
  { id: 'geo', name: 'World Geography', icon: '🌍', description: 'Capitals, landmarks, and continents' },
  { id: 'tech', name: 'Science & Tech', icon: '⚡', description: 'Computing, space, and modern wonders' },
  { id: 'history', name: 'History & Culture', icon: '🏛️', description: 'Key events, civilizations, and icons' },
  { id: 'entertainment', name: 'Pop & Entertainment', icon: '🎬', description: 'Cinema, music, and gaming' }
];

export const QuizData = [
  // Geography
  {
    id: 1,
    category: 'geo',
    difficulty: 'easy',
    round: 1,
    question: 'What is the capital of India?',
    options: ['New Delhi', 'Mumbai', 'Kolkata', 'Bengaluru'],
    answer: 'New Delhi',
    explanation: 'New Delhi replaced Calcutta as the capital of British India in 1911 and was inaugurated in 1931.'
  },
  {
    id: 2,
    category: 'geo',
    difficulty: 'easy',
    round: 1,
    question: 'What is traditionally considered the world\'s longest river?',
    options: ['River Nile', 'Amazon River', 'Yangtze River', 'Mississippi River'],
    answer: 'River Nile',
    explanation: 'The Nile stretches roughly 6,650 kilometers (4,132 miles) through northeastern Africa.'
  },
  {
    id: 3,
    category: 'geo',
    difficulty: 'medium',
    round: 2,
    question: 'Which country has the most natural lakes in the world?',
    options: ['Canada', 'Russia', 'United States', 'Finland'],
    answer: 'Canada',
    explanation: 'Canada contains more than half of all the natural lakes on Earth — over 2 million lakes!'
  },
  {
    id: 4,
    category: 'geo',
    difficulty: 'medium',
    round: 2,
    question: 'What is the smallest country in the world by land area?',
    options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'],
    answer: 'Vatican City',
    explanation: 'Vatican City measures just 0.49 square kilometers (about 121 acres).'
  },
  {
    id: 5,
    category: 'geo',
    difficulty: 'hard',
    round: 3,
    question: 'Which desert is the driest non-polar desert on Earth?',
    options: ['Atacama Desert', 'Sahara Desert', 'Gobi Desert', 'Mojave Desert'],
    answer: 'Atacama Desert',
    explanation: 'The Atacama Desert in Chile receives less than 1 mm of precipitation per year in some weather stations.'
  },

  // Tech & Science
  {
    id: 6,
    category: 'tech',
    difficulty: 'easy',
    round: 1,
    question: 'Who is the CEO of Tesla Motors?',
    options: ['Elon Musk', 'Bill Gates', 'Steve Jobs', 'Satya Nadella'],
    answer: 'Elon Musk',
    explanation: 'Elon Musk joined Tesla in 2004 as head of product design and became CEO in 2008.'
  },
  {
    id: 7,
    category: 'tech',
    difficulty: 'easy',
    round: 1,
    question: 'Which company developed the JavaScript programming language in 1995?',
    options: ['Netscape', 'Microsoft', 'Sun Microsystems', 'Bell Labs'],
    answer: 'Netscape',
    explanation: 'Brendan Eich designed JavaScript in just 10 days while working at Netscape Communications.'
  },
  {
    id: 8,
    category: 'tech',
    difficulty: 'medium',
    round: 2,
    question: 'What does "HTTP" stand for in web addresses?',
    options: [
      'HyperText Transfer Protocol',
      'High Transfer Text Program',
      'Hyperlink Transmission Tool Protocol',
      'Hybrid Telecommunication Protocol'
    ],
    answer: 'HyperText Transfer Protocol',
    explanation: 'HTTP is an application-layer protocol created by Tim Berners-Lee to exchange hypertext documents.'
  },
  {
    id: 9,
    category: 'tech',
    difficulty: 'medium',
    round: 2,
    question: 'Which planet in our solar system has the most moons?',
    options: ['Saturn', 'Jupiter', 'Uranus', 'Neptune'],
    answer: 'Saturn',
    explanation: 'Saturn leads with 146 confirmed moons as of recent astronomical surveys.'
  },
  {
    id: 10,
    category: 'tech',
    difficulty: 'hard',
    round: 3,
    question: 'What was the first computer virus ever detected in the wild on MS-DOS (1986)?',
    options: ['Brain', 'Creeper', 'ILOVEYOU', 'Morris Worm'],
    answer: 'Brain',
    explanation: 'The Brain boot sector virus was created by two Pakistani brothers to track software piracy.'
  },

  // History & Culture
  {
    id: 11,
    category: 'history',
    difficulty: 'easy',
    round: 1,
    question: 'Who founded Amazon in 1994 as an online bookstore?',
    options: ['Jeff Bezos', 'Bill Gates', 'Mark Zuckerberg', 'Larry Ellison'],
    answer: 'Jeff Bezos',
    explanation: 'Jeff Bezos founded Amazon out of his garage in Bellevue, Washington in July 1994.'
  },
  {
    id: 12,
    category: 'history',
    difficulty: 'easy',
    round: 1,
    question: 'In which year did the Apollo 11 mission first land humans on the Moon?',
    options: ['1969', '1965', '1971', '1973'],
    answer: '1969',
    explanation: 'Neil Armstrong and Buzz Aldrin set foot on the lunar surface on July 20, 1969.'
  },
  {
    id: 13,
    category: 'history',
    difficulty: 'medium',
    round: 2,
    question: 'Which ancient wonder of the world is the only one still standing today?',
    options: [
      'Great Pyramid of Giza',
      'Colossus of Rhodes',
      'Lighthouse of Alexandria',
      'Hanging Gardens of Babylon'
    ],
    answer: 'Great Pyramid of Giza',
    explanation: 'The Great Pyramid in Egypt was built around 2560 BC and remains largely intact.'
  },
  {
    id: 14,
    category: 'history',
    difficulty: 'medium',
    round: 2,
    question: 'Who painted the ceiling of the Sistine Chapel in Vatican City?',
    options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
    answer: 'Michelangelo',
    explanation: 'Michelangelo painted the masterpiece between 1508 and 1512 at the behest of Pope Julius II.'
  },
  {
    id: 15,
    category: 'history',
    difficulty: 'hard',
    round: 3,
    question: 'Which peace treaty officially concluded the First World War in 1919?',
    options: ['Treaty of Versailles', 'Treaty of Paris', 'Treaty of Ghent', 'Treaty of Utrecht'],
    answer: 'Treaty of Versailles',
    explanation: 'The Treaty of Versailles was signed on June 28, 1919 in the Hall of Mirrors.'
  },

  // Pop & Entertainment
  {
    id: 16,
    category: 'entertainment',
    difficulty: 'easy',
    round: 1,
    question: 'What is the name of the fictional African kingdom ruled by Black Panther?',
    options: ['Wakanda', 'Zamunda', 'Genovia', 'Elbonia'],
    answer: 'Wakanda',
    explanation: 'Wakanda is Marvel Comics\' technologically advanced nation hidden in East Africa.'
  },
  {
    id: 17,
    category: 'entertainment',
    difficulty: 'easy',
    round: 1,
    question: 'Which video game features characters named Mario, Luigi, Bowser, and Peach?',
    options: ['Super Mario Bros.', 'The Legend of Zelda', 'Sonic the Hedgehog', 'Donkey Kong Country'],
    answer: 'Super Mario Bros.',
    explanation: 'Created by Shigeru Miyamoto at Nintendo, Super Mario is one of the most iconic game franchises ever.'
  },
  {
    id: 18,
    category: 'entertainment',
    difficulty: 'medium',
    round: 2,
    question: 'Which film won the Best Picture Oscar at the 92nd Academy Awards, making history as the first non-English film to do so?',
    options: ['Parasite', 'Roma', 'Crouching Tiger, Hidden Dragon', 'Life is Beautiful'],
    answer: 'Parasite',
    explanation: 'Bong Joon-ho\'s South Korean thriller Parasite won four Oscars in 2020 including Best Picture.'
  },
  {
    id: 19,
    category: 'entertainment',
    difficulty: 'medium',
    round: 2,
    question: 'Which legendary British rock band recorded the albums "Abbey Road" and "Revolver"?',
    options: ['The Beatles', 'The Rolling Stones', 'Queen', 'Led Zeppelin'],
    answer: 'The Beatles',
    explanation: 'The Beatles released Revolver in 1966 and Abbey Road in 1969.'
  },
  {
    id: 20,
    category: 'entertainment',
    difficulty: 'hard',
    round: 3,
    question: 'In the original arcade release of Pac-Man (1980), what is the orange ghost\'s name?',
    options: ['Clyde', 'Inky', 'Blinky', 'Pinky'],
    answer: 'Clyde',
    explanation: 'The four ghosts are Blinky (red), Pinky (pink), Inky (cyan), and Clyde (orange).'
  }
];

export function getQuestionsByFilter({ category = 'all', round = null, limit = 5 } = {}) {
  let pool = QuizData;
  if (category && category !== 'all') {
    pool = pool.filter(q => q.category === category);
  }
  if (round !== null && round !== undefined) {
    pool = pool.filter(q => q.round === round);
  }

  const shuffled = [...pool];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return limit > 0 ? shuffled.slice(0, limit) : shuffled;
}

export default QuizData;
