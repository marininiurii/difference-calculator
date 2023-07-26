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
      return [{ key, value: valueObject1, status: 'deleted' }];
    }
    if (valueObject1 === undefined) {
      return [{ key, value: valueObject2, status: 'added' }];
    }
    if (_.isObject(valueObject1) && _.isObject(valueObject2)) {
      return [{ key, value: makeDiffTree(valueObject1, valueObject2), status: 'unchanged' }];
    }
    if (valueObject1 === valueObject2) {
      return [{ key, value: valueObject1, status: 'unchanged' }];
    }
    return [
      { key, value: valueObject1, status: 'deleted' },
      { key, value: valueObject2, status: 'added' },
    ];
  };

  const getKeys = getUnionKeys(obj1, obj2);
  const diffTree = getKeys
    .reduce((acc, key) => [...acc, ...makeLeaf(key, obj1[key], obj2[key])], []);
  return diffTree;
};

export default makeDiffTree;
