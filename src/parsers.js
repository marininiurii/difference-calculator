import yaml from 'js-yaml';

const parsers = (file, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(file);
    case '.yaml':
    case '.yml':
      return yaml.load(file);
    default:
      throw new Error('Invalid format');
  }
};

export default parsers;
