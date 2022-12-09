import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const file = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/resultFile.txt'),
  'utf-8',
);
const resultFile = file.trim();

test('diff', () => {
  const file1 = '__fixtures__/file1.json';
  const file2 = '__fixtures__/file2.json';
  expect(genDiff(file1, file2)).toEqual(resultFile);
});
