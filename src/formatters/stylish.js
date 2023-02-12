import _ from 'lodash';

const makeIndent = (depth, spaces = 4) => ' '.repeat(depth * spaces - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const keys = Object.keys(data);
  const lines = keys.map(
    (line) => `${makeIndent(depth + 1)}  ${line}: ${stringify(data[line], depth + 1)}`,
  );
  const output1 = `{\n${lines.join('\n')}`;
  const output2 = `${makeIndent(depth)}`;
  return `${output1}\n  ${output2}}`;
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
      const line1 = `${makeIndent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
      const line2 = `${makeIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      return `${line1}\n${line2}`;
    }
    case 'nested': {
      const line3 = iter(node.children, depth + 1);
      return `${makeIndent(depth)}  ${node.key}: {\n${line3.join('\n')}\n ${makeIndent(depth)} }`;
    }
    default:
      throw new Error(`Unknown type of data ${node.type}!`);
  }
});

const formatStylish = (tree) => `{\n${iter(tree, 1).join('\n')}\n}`;

export default formatStylish;
