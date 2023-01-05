import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatDiff = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data, 0);
    case 'json':
      return json(data);
    default:
      throw new Error('Unknown format!');
  }
};

export default formatDiff;
