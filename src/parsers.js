import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';

const configPath = 'path/to/eslint';
const format = path.extname(configPath);

let parse;
if (format === ' ') {
  parse = JSON.parse;
} else if (format === '.yml') {
  parse = yaml.safeLoad;
} else if (format === '.ini') {
  parse = ini.parse;
}
parse(data);
