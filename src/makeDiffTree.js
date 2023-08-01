import _ from 'lodash';

const getUnionKeys = (object1, object2) => _.sortBy(_.union(_.keys(object1), _.keys(object2)));

const makeDiffTree = (obj1, obj2) => {
  const unionKeys = getUnionKeys(obj1, obj2);
  return unionKeys.reduce((acc, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return [...acc, { key, value: makeDiffTree(obj1[key], obj2[key]), status: 'nested' }];
    }
    if (!_.has(obj1, key)) {
      return [...acc, { key, value: obj2[key], status: 'added' }];
    }
    if (!_.has(obj2, key)) {
      return [...acc, { key, value: obj1[key], status: 'deleted' }];
    }
    if (obj1[key] === obj2[key]) {
      return [...acc, { key, value: obj1[key], status: 'unchanged' }];
    }
    return [...acc, {
      key, oldValue: obj1[key], newValue: obj2[key], status: 'changed',
    }];
  }, []);
};

export default makeDiffTree;
