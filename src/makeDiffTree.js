import _ from 'lodash';

const getUnionKeys = (data1, data2) => {
  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);
  const sortUnionKeys = _.sortBy(_.union(keysData1, keysData2));
  return sortUnionKeys;
};

const makeDiffTree = (obj1, obj2) => {
  const getKeys = getUnionKeys(obj1, obj2);
  return getKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, value: makeDiffTree(obj1[key], obj2[key]), status: 'nested' };
    }
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], status: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], status: 'deleted' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        oldValue: obj1[key],
        newValue: obj2[key],
        status: 'changed',
      };
    }
    return { key, value: obj1[key], status: 'unchanged' };
  });
};

export default makeDiffTree;
