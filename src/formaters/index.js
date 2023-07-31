import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatDefin = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return makeStylish(tree);
    case 'json':
      return JSON.stringify(tree);
    case 'plain':
      return makePlain(tree);
    default:
      throw new Error('Invalid file format');
  }
};

export default formatDefin;
