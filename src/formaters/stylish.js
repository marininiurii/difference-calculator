import _ from 'lodash';

const stringify = (val, replacer = ' ', spacesCount = 1, level = 0) => {
  if (!_.isPlainObject(val) || val === null) {
    return String(val);
  }
  const indent = replacer.repeat(spacesCount).repeat(level);
  const result = Object.keys(val)
    .map((key) => {
      const value = val[key];
      const recursionResult = stringify(value, replacer, spacesCount, level + 1);
      const nestedIndent = replacer.repeat(spacesCount).repeat(level + 1);
      const makeTemplate = `${nestedIndent}${key}: ${recursionResult}`;
      return makeTemplate;
    })
    .join('\n');
  return `{\n${result}\n${indent}}`;
};

export default stringify;
