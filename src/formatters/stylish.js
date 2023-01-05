import _ from 'lodash';

const symbols = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
  nested: ' ',
};

const makeIndent = (deep) => {
  const str = ' ';
  return str.repeat(deep * 4 - 2);
};

const stringify = (file, deep = 1) => {
  if (!_.isObject(file)) {
    return file;
  }
  const keys = Object.keys(file);
  const getKeys = keys.map(
    (key) => ` ${makeIndent(deep + 1)} ${key}: ${stringify(file[key], deep + 1)}`,
  );
  return `{\n${getKeys.join('\n')}\n ${makeIndent(deep)} }`;
};

const getMappingFile = (file, deep = 1) => {
  switch (file.type) {
    case 'added':
    case 'deleted':
    case 'unchanged':
      return `${makeIndent(deep)}${symbols[file.type]} ${file.key}: ${stringify(file.value, deep)}`;
    case 'changed':
      return `${makeIndent(deep)}${symbols.deleted} ${file.key}: ${stringify(file.valueBefore, deep)}\n${makeIndent(deep)}${symbols.added} ${file.key}: ${stringify(file.valueAfter, deep)}`;
    case 'nested':
      return `${makeIndent(deep)}  ${file.key}: {\n${file.children.map((a) => getMappingFile(a, deep + 1)).join('\n')}\n ${makeIndent(deep)} }`;
    default:
      throw new Error('Unknown type!');
  }
};

export default (stylish) => `{\n${stylish.map((file) => getMappingFile(file, 1)).join('\n')}\n}`;
