import _ from 'lodash';

const makeIndent = (depth, spaces = 4) => ' '.repeat(depth * spaces - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const keys = Object.entries(data).map(([key, value]) => `${makeIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${keys.join('\n')}\n  ${makeIndent(depth)}}`;
};

const iter = (children, depth) => children.map((node) => {
  switch (node.type) {
    case 'added':
      return `${makeIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
    case 'deleted':
      return `${makeIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
    case 'unchanged':
      return `${makeIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
    case 'changed': {
      const output1 = `${makeIndent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
      const output2 = `${makeIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      return `${output1}\n${output2}`;
    }
    case 'nested': {
      const output3 = iter(node.children, depth + 1);
      return `${makeIndent(depth)}  ${node.key}: {\n${output3.join('\n')}\n ${makeIndent(depth)} }`;
    }
    default:
      throw new Error(`Unknown type of data ${node.type}!`);
  }
});

const formatStylish = (tree) => `{\n${iter(tree, 1).join('\n')}\n}`;

export default formatStylish;
