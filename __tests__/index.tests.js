import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const fileStylish = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/resultStylish.txt'),
  'utf-8',
);
const filePlain = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/resultPlain.txt'),
  'utf-8',
);

const fileJson = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/resultJson.txt'),
  'utf-8',
);

const resultStylish = fileStylish.trim();
const resultPlain = filePlain.trim().trim();
const resultJson = fileJson.trim();

test('diff', () => {
  const file1Json = '__fixtures__/file1.json';
  const file2Json = '__fixtures__/file2.json';
  const file1Yml = '__fixtures__/file1.yml';
  const file2Yml = '__fixtures__/file2.yml';
  expect(genDiff(file1Json, file2Json, 'stylish')).toEqual(resultStylish);
  expect(genDiff(file1Yml, file2Yml, 'stylish')).toEqual(resultStylish);
  expect(genDiff(file1Json, file2Json, 'plain')).toEqual(resultPlain);
  expect(genDiff(file1Yml, file2Yml, 'plain')).toEqual(resultPlain);
  expect(genDiff(file1Yml, file2Yml, 'json')).toEqual(resultJson);
  expect(genDiff(file1Json, file2Json, 'json')).toEqual(resultJson);
});
