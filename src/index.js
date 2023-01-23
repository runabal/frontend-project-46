import fs from 'fs';
import path from 'path';
import process from 'process';
import build from './compare.js';
import parse from './parsers.js';
import formatDiff from './formatters/index.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};

const getFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(readFile(filepath1), getFormat(filepath1));
  const data2 = parse(readFile(filepath2), getFormat(filepath2));
  const compareDate = build(data1, data2);
  return formatDiff(compareDate, formatName);
};

export default genDiff;
