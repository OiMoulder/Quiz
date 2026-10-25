import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const output = resolve(root, 'dist');
const browserFiles = [
  'App.js',
  'quiz-engine.js',
  'QuizData.js',
  'soundEffects.js',
  'App.css',
  'index.css'
];

await rm(output, { recursive: true, force: true });
await mkdir(resolve(output, 'src'), { recursive: true });
await cp(resolve(root, 'index.html'), resolve(output, 'index.html'));

for (const file of browserFiles) {
  await cp(resolve(root, 'src', file), resolve(output, 'src', file));
}

await mkdir(resolve(output, 'public'), { recursive: true });
await cp(resolve(root, 'public', 'favicon.ico'), resolve(output, 'public', 'favicon.ico'));
console.log(`Static site copied to ${output}`);
