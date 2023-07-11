import _ from 'lodash';

const getUnionKeys = (data1, data2) => {
  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);
  const sortUnionKeys = _.sortBy(_.union(keysData1, keysData2));
  return sortUnionKeys;
};

const makeLeaf = (key, valueObject1, valueObject2) => {
  if (valueObject2 === undefined) {
    return `  - ${key}: ${valueObject1}\n`;
  }
  if (valueObject1 === undefined) {
    return `  + ${key}: ${valueObject2}\n`;
  }
  if (valueObject1 === valueObject2) {
    return `    ${key}: ${valueObject1}\n`;
  }
  if (valueObject1 !== valueObject2) {
    return `  - ${key}: ${valueObject1}\n  + ${key}: ${valueObject2}\n`;
  }
};

const makeDiffTree = (obj1, obj2) => {
  const getKeys = getUnionKeys(obj1, obj2);
  const buildDiffTree = getKeys.reduce((acc, key) => acc + makeLeaf(key, obj1[key], obj2[key]), '');
  return `{\n${buildDiffTree}}`;
};

export default makeDiffTree;
