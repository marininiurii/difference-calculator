import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

test('gendiff', () => {
  expect(genDiff(path.join('.', '__fixtures__', 'file1.json'), path.join('.', '__fixtures__', 'file2.json')))
    .toEqual(fs.readFileSync(path.join('.', '__fixtures__', 'expected_file_stylish.txt'), 'utf8'));
});
