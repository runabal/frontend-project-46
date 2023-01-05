import _ from 'lodash';

const stringify = (file) => {
  if (_.isObject(file)) {
    return '[complex value]';
  }
  return typeof file === 'string' ? `'${file}'` : file;
};

const getPlain = (file, parent = '') => {
  switch (file.type) {
    case 'added':
      return `Property '${parent}${file.key}' was added with value: ${stringify(file.value)}`;
    case 'deleted':
      return `Property '${parent}${file.key}' was removed`;
    case 'unchanged':
      return null;
    case 'changed':
      return `Property '${parent}${file.key}' was updated. From ${stringify(file.valueBefore)} to ${stringify(file.valueAfter)}`;
    case 'nested':
      return file.children.map((value) => getPlain(value, `${parent + file.key}.`))
        .filter((item) => item !== null).join('\n');
    default:
      throw new Error('Unknown type!');
  }
};

export default (plain) => `${plain.map((element) => getPlain(element)).join('\n')}`.trim();
