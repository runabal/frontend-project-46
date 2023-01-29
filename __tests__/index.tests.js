import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFixture = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8').trim();

const cases = ['json', 'yml'];

const expectedStylish = readFixture('resultStylish.txt');
const expectedPlain = readFixture('resultPlain.txt');
const expectedJson = readFixture('resultJson.txt');

describe('test genDiff, each cases', () => {
  test.each(cases)('%s format', (format) => {
    const file1 = getFixturePath(`file1.${format}`);
    const file2 = getFixturePath(`file2.${format}`);
    expect(genDiff(file1, file2)).toEqual(expectedStylish);
    expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
    expect(genDiff(file1, file2, 'json')).toEqual(expectedJson);
  });
});
