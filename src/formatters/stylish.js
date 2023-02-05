import _ from 'lodash';

const makeIndent = (depth, spaces = 4) => ' '.repeat(depth * spaces - 2);

const stringify = (nodeValue, depth = 1) => {
  if (!_.isObject(nodeValue)) {
    return nodeValue;
  }
  const keys = Object.keys(nodeValue);
  const getKeys = keys.map(
    (key) => ` ${makeIndent(depth + 1)} ${key}: ${stringify(nodeValue[key], depth + 1)}`,
  );
  return `{\n${getKeys.join('\n')}\n ${makeIndent(depth)} }`;
};

const getFormatStylish = (node, depth = 1) => {
  switch (node.type) {
    case 'added':
      return `${makeIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
    case 'deleted':
      return `${makeIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
    case 'unchanged':
      return `${makeIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
    case 'changed':
      return `${makeIndent(depth)}- ${node.key}: ${stringify(node.value1, depth)}\n${makeIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
    case 'nested':
      return `${makeIndent(depth)}  ${node.key}: {\n${node.children.map((a) => getFormatStylish(a, depth + 1)).join('\n')}\n ${makeIndent(depth)} }`;
    default:
      throw new Error(`Unknown type of data ${node.type}!`);
  }
};

export default (formatStylish) => `{\n${formatStylish.map((tree) => getFormatStylish(tree, 1)).join('\n')}\n}`;
