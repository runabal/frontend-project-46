import fs from 'fs';
import path from 'path';
import process from 'process';
import build from './compare.js';
import parse from './parsers.js';
import formatDiff from './formatters/index.js';

const readFile = (file) => {
  const fullPath = path.resolve(process.cwd(), file);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};

const getExtension = (file) => path.extname(file).slice(1);

const genDiff = (file1, file2, formatName = 'stylish') => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);
  const obj1 = parse(data1, getExtension(file1));
  const obj2 = parse(data2, getExtension(file2));
  const obj = build(obj1, obj2);
  return formatDiff(obj, formatName);
};

export default genDiff;
