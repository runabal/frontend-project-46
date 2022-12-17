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
  const file1Json = '__fixtures__/file1.json';
  const file2Json = '__fixtures__/file2.json';
  const file1Yml = '__fixtures__/file1.yml';
  const file2Yml = '__fixtures__/file2.yml';
  expect(genDiff(file1Json, file2Json)).toEqual(resultFile);
  expect(genDiff(file1Yml, file2Yml)).toEqual(resultFile);
});
