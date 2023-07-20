import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiffJSON', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
    .toEqual(readFile('expected_file_stylish.txt'));
});

test('gendiffYAML', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml')))
    .toEqual(readFile('expected_file_stylish.txt'));
});
