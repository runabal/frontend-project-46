import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return String(data);
};

const iter = (children, parent) => {
  const lines = children.map((node) => {
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
        return iter(node.children, `${parent}${node.key}.`);
      default:
        throw new Error(`Unknown type of data ${node.tpe}`);
    }
  });
  return lines.filter((item) => item !== null).join('\n');
};

const formatPlain = (tree) => iter(tree, '');

export default formatPlain;
