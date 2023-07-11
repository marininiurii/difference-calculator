import fs from 'fs';
import path from 'path';
import process from 'process';
import makeDiffTree from './makeDiffTree.js';

const genDiff = (filepath1, filepath2) => {
  const makeObject1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath1)));
  const makeObject2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath2)));
  const getTree = makeDiffTree(makeObject1, makeObject2);
  return getTree;
};

export default genDiff;
