import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('JSON_stylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
    .toEqual(readFile('expectedStylish.txt'));
});

test('YAML_stylish', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml')))
    .toEqual(readFile('expectedStylish.txt'));
});

test('JSON_plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain'))
    .toEqual(readFile('expectedPlain.txt'));
});

test('YAML_plain', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain'))
    .toEqual(readFile('expectedPlain.txt'));
});
