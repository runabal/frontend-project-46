import fs from 'fs';
import path from 'path';
import build from './compare.js';
import mappingFile from './mapping.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  const obj3 = build(obj1, obj2);
  const result = mappingFile(obj3);
  return result;
};

export default genDiff;
