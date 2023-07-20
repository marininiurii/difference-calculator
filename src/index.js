import fs from 'fs';
import path from 'path';
import process from 'process';
import makeDiffTree from './makeDiffTree.js';
import parsers from './parsers.js';
import stringify from './formaters/stylish.js';

const genDiff = (filepath1, filepath2) => {
  const format = path.extname(filepath1);
  const makeObject1 = parsers(fs.readFileSync(path.resolve(process.cwd(), filepath1)), format);
  const makeObject2 = parsers(fs.readFileSync(path.resolve(process.cwd(), filepath2)), format);
  const getTree = makeDiffTree(makeObject1, makeObject2);
  return stringify(getTree);
};

export default genDiff;
