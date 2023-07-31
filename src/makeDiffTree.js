import _ from 'lodash';

const getUnionKeys = (object1, object2) => _.sortBy(_.union(_.keys(object1), _.keys(object2)));

const makeDiffTree = (obj1, obj2) => {
  const unionKeys = getUnionKeys(obj1, obj2);
  return unionKeys.reduce((acc, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      acc.push({ key, value: makeDiffTree(obj1[key], obj2[key]), status: 'nested' });
    } else if (!_.has(obj1, key)) {
      acc.push({ key, value: obj2[key], status: 'added' });
    } else if (!_.has(obj2, key)) {
      acc.push({ key, value: obj1[key], status: 'deleted' });
    } else if (obj1[key] === obj2[key]) {
      acc.push({ key, value: obj1[key], status: 'unchanged' });
    } else {
      acc.push({
        key, oldValue: obj1[key], newValue: obj2[key], status: 'changed',
      });
    }
    return acc;
  }, []);
};

export default makeDiffTree;
