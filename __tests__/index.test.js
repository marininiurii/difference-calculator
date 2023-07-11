import fs from 'fs';
import genDiff from '../src/index.js';

test('gendiff', () => {
  expect(genDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json'))
    .toEqual(fs.readFileSync('./__fixtures__/expeted_file_stylish.txt', 'utf8'));
});
