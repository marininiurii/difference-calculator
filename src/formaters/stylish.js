import _ from 'lodash';

const TAB = '    ';

const getValue = (propValue, depth = 0) => {
  const indent = TAB.repeat(depth);

  if (!_.isObject(propValue)) {
    return propValue;
  }
  const entries = Object.entries(propValue);
  const result = entries.map(([key, value]) => `${TAB}${indent}${key}: ${getValue(value, depth + 1)}`);

  return [
    '{',
    ...result,
    `${indent}}`,
  ].join('\n');
};

const makeStylish = (tree, depth = 0) => {
  const indent = TAB.repeat(depth);
  const result = tree.flatMap((node) => {
    switch (node.status) {
      case 'changed':
        return [
          `  ${indent}- ${node.key}: ${getValue(node.oldValue, depth + 1)}`,
          `  ${indent}+ ${node.key}: ${getValue(node.newValue, depth + 1)}`,
        ];
      case 'unchanged':
        return `  ${indent}  ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'deleted':
        return `  ${indent}- ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'added':
        return `  ${indent}+ ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'nested':
        return `  ${indent}  ${node.key}: ${makeStylish(node.value, depth + 1)}`;
      default:
        throw new Error('Unknown node.status');
    }
  });

  return [
    '{',
    ...result,
    `${indent}}`,
  ].join('\n');
};

export default makeStylish;
