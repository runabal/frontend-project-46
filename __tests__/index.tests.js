import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', `/${filename}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const cases = [
  ['json', 'stylish', 'resultStylish.txt'],
  ['json', 'plain', 'resultPlain.txt'],
  ['json', 'json', 'resultJson.txt'],
  ['yml', 'stylish', 'resultStylish.txt'],
  ['yml', 'plain', 'resultPlain.txt'],
  ['yml', 'json', 'resultJson.txt'],
];

describe('test genDiff, each cases', () => {
  test.each(cases)('files of type, formatted', (type, format, expectedResult) => {
    const file1 = getFixturePath(`file1.${type}`);
    const file2 = getFixturePath(`file2.${type}`);
    const result = readFile(expectedResult);
    const readDiff = genDiff(file1, file2, format);
    expect(readDiff).toEqual(result);
  });
});

describe('test default value', () => {
  test.each(cases)('files of type with default value', (type) => {
    const file1 = getFixturePath(`file1.${type}`);
    const file2 = getFixturePath(`file2.${type}`);
    const result = readFile('resultStylish.txt');
    const readDiff = genDiff(file1, file2);
    expect(readDiff).toEqual(result);
  });
});
