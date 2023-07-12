import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('gendiff', () => {
  const filePath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const filePath2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');
  const expectedFilePath = path.join(__dirname, '..', '__fixtures__', 'expected_file_stylish.txt');
  expect(genDiff(filePath1, filePath2)).toEqual(fs.readFileSync(expectedFilePath, 'utf8'));
});
