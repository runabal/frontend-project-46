import fs from 'fs';
import path from 'path';
import buildTree from './compare.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};
const getFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => parse(readFile(filepath), getFormat(filepath));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diffTree = buildTree(data1, data2);
  return format(diffTree, formatName);
};

export default genDiff;
