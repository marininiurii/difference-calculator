import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const formatDefin = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return makeStylish(tree);
    case 'json':
      return makeJson(tree);
    case 'plain':
      return makePlain(tree);
    default:
      throw new Error('Invalid file format');
  }
};

export default formatDefin;
