import _ from 'lodash';

const INDICATORS = { added: '+ ', deleted: '- ', unchanged: '  ' };
const TAB = '  ';
const stylishObject = (object, level = 0) => {
  const entries = Object.entries(object);
  const rows = entries.reduce((acc, [key, value]) => {
    if (_.isObject(value)) {
      return `${acc}${TAB.repeat(level + 2)}${key}: ${stylishObject(value, level + 2)}\n`;
    }
    return `${acc}${TAB.repeat(level + 2)}${key}: ${value}\n`;
  }, '');
  return `{\n${rows}${TAB.repeat(level)}}`;
};

const stylish = (tree, level = 0) => {
  const stylishTree = tree.reduce((acc, { key, value, status }) => {
    if (Array.isArray(value)) {
      return `${acc}${TAB.repeat(level + 1)}${
        INDICATORS[status]
      }${key}: ${stylish(value, level + 2)}\n`;
    }
    if (_.isObject(value)) {
      return `${acc}${TAB.repeat(level + 1)}${
        INDICATORS[status]
      }${key}: ${stylishObject(value, level + 2)}\n`;
    }
    return `${acc}${TAB.repeat(level + 1)}${
      INDICATORS[status]
    }${key}: ${value}\n`;
  }, '');
  return `{\n${stylishTree}${TAB.repeat(level)}}`;
};

export default stylish;
