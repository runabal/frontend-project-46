import fs from 'fs';
import path from 'path';
import build from './compare.js';
import mappingFile from './mapping.js';
import readFile from './readFile.js'



const genDiff = (path1, path2) => {
  const data1 = readFile(path1);
  const data2 = readFile(path2);
  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2)
  const obj3 = build(obj1, obj2);
  const result = mappingFile(obj3);
  return result;
};

export default genDiff;
