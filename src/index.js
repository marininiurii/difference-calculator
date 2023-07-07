import _ from 'lodash';

const makeDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(Object.entries(_.merge(obj1, obj2)));
  const getDiff = keys.map(([key, value]) => {
    if (!_.has(obj1, key)) {
      return { key, value, status: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value, status: 'deleted' };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj[key])) {
      return {
        key,
        value: makeDiffTree(obj1[key], obj[key]),
        status: 'nested',
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        oldValue: obj1[key],
        newValue: obj2[key],
        status: 'changed',
      };
    }
    return { key, value, status: 'unchanged' };
  });
  return getDiff;
};

export default makeDiffTree;
