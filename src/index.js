import fs from 'fs';
import path from 'path';
import process from 'process';
import makeDiffTree from './makeDiffTree.js';
import parsers from './parsers.js';
import formatDefin from './formaters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const format = path.extname(filepath1).substring(1);

  const getPathForFile1 = path.resolve(process.cwd(), filepath1);
  const getPathForFile2 = path.resolve(process.cwd(), filepath2);

  const readFile1 = fs.readFileSync(getPathForFile1, 'utf-8');
  const readFile2 = fs.readFileSync(getPathForFile2, 'utf-8');

  const object1 = parsers(readFile1, format);
  const object2 = parsers(readFile2, format);

  const tree = makeDiffTree(object1, object2);
  return formatDefin(tree, formatName);
};

export default genDiff;
