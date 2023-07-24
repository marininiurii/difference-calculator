const INDICATORS = { added: '+ ', deleted: '- ', unchanged: '  ' };
const TAB = '  ';

const makeStylish = (tree, level = 0) => {
  const stylishTree = tree.reduce((acc, { key, value, status }) => {
    if (Array.isArray(value)) {
      return `${acc}${TAB.repeat(level + 1)}${INDICATORS[status]}${key}: ${makeStylish(value, level + 2)}\n`;
    }
    return `${acc}${TAB.repeat(level + 1)}${INDICATORS[status]}${key}: ${value}\n`;
  }, '');
  return `{\n${stylishTree}${TAB.repeat(level)}}`;
};

export default makeStylish;
