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

const getPropertyName = (propertyName, nodeKey) => `${propertyName}${nodeKey}.`;

const iter = (children, propertyName) => children
  .map((node) => {
    switch (node.type) {
      case 'added':
        return `Property '${propertyName}${node.key}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${propertyName}${node.key}' was removed`;
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${propertyName}${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'nested':
        return iter(node.children, getPropertyName(propertyName, node.key));
      default:
        throw new Error(`Unknown type of data ${node.type}`);
    }
  })
  .filter(Boolean)
  .join('\n');
const formatPlain = (tree) => iter(tree, '');

export default formatPlain;
