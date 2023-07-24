import _ from 'lodash';

const getUnionKeys = (data1, data2) => {
  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);
  const sortUnionKeys = _.sortBy(_.union(keysData1, keysData2));
  return sortUnionKeys;
};

const makeDiffTree = (obj1, obj2) => {
  const makeLeaf = (key, valueObject1, valueObject2) => {
    if (valueObject2 === undefined) {
      if (_.isObject(valueObject1)) {
        return [{ key, value: makeDiffTree(valueObject1, valueObject1), status: 'deleted' }];
      }
      return [{ key, value: valueObject1, status: 'deleted' }]; // isDeleted
    }
    if (valueObject1 === undefined) {
      if (_.isObject(valueObject2)) {
        return [{ key, value: makeDiffTree(valueObject2, valueObject2), status: 'deleted' }];
      }
      return [{ key, value: valueObject2, status: 'added' }]; // isAdded
    }
    if (_.isObject(valueObject1) && _.isObject(valueObject2)) {
      return [{ key, value: makeDiffTree(valueObject1, valueObject2), status: 'unchanged' }];
    }
    if (valueObject1 === valueObject2) {
      return [{ key, value: valueObject1, status: 'unchanged' }]; // unchanged
    }
    if (_.isObject(valueObject1)) {
      return [{ key, value: makeDiffTree(valueObject1, valueObject1), status: 'deleted' },
        { key, value: valueObject2, status: 'added' }];
    }
    if (_.isObject(valueObject2)) {
      return [{ key, value: valueObject2, status: 'deleted' },
        { key, value: makeDiffTree(valueObject2, valueObject2), status: 'added' }];
    }
    return [
      { key, value: valueObject1, status: 'deleted' },
      { key, value: valueObject2, status: 'added' },
    ]; // changed
  };
  const getKeys = getUnionKeys(obj1, obj2);
  const DiffTree = getKeys
    .reduce((acc, key) => [...acc, ...makeLeaf(key, obj1[key], obj2[key])], []);
  return DiffTree;
};

export default makeDiffTree;
