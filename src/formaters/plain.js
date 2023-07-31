import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isBoolean(value) || _.isNumber(value) || _.isNull(value)) {
    return value;
  }
  return `'${value}'`;
};

const makePlain = (tree, path = '') => {
  const lines = tree.flatMap(({
    key, value, oldValue, newValue, status,
  }) => {
    switch (status) {
      case 'nested': {
        return makePlain(value, `${path}${key}.`);
      }
      case 'added': {
        return `Property '${path}${key}' was added with value: ${getValue(value)}`;
      }
      case 'deleted': {
        return `Property '${path}${key}' was removed`;
      }
      case 'changed': {
        return `Property '${path}${key}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`;
      }
      default:
        return [];
    }
  });
  return lines.join('\n');
};

export default makePlain;
