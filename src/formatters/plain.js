import _ from 'lodash';

const stringify = (nodeValue) => {
  if (_.isObject(nodeValue)) {
    return '[complex value]';
  }
  return typeof nodeValue === 'string' ? `'${nodeValue}'` : nodeValue;
};

const getFormatPlain = (node, parent = '') => {
  switch (node.type) {
    case 'added':
      return `Property '${parent}${node.key}' was added with value: ${stringify(node.value)}`;
    case 'deleted':
      return `Property '${parent}${node.key}' was removed`;
    case 'unchanged':
      return null;
    case 'changed':
      return `Property '${parent}${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
    case 'nested':
      return node.children.map((value) => getFormatPlain(value, `${parent + node.key}.`))
        .filter((item) => item !== null).join('\n');
    default:
      throw new Error(`Unknown type of data ${node.tpe}`);
  }
};

export default (formatPlain) => `${formatPlain.map((tree) => getFormatPlain(tree)).join('\n')}`.trim();
