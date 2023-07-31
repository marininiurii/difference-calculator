import fs from 'fs';
import path from 'path';
import process from 'process';
import makeDiffTree from './makeDiffTree.js';
import parsers from './parsers.js';
import formatDefin from './formaters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const format = path.extname(filepath1);
  const makeObject1 = parsers(fs.readFileSync(path.resolve(process.cwd(), filepath1)), format);
  const makeObject2 = parsers(fs.readFileSync(path.resolve(process.cwd(), filepath2)), format);
  const tree = makeDiffTree(makeObject1, makeObject2);
  return formatDefin(tree, formatName);
};

export default genDiff;
