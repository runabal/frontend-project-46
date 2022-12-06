#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuratioj files and shows a difference')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, option) => {
    console.log(genDiff(filepath1, filepath2, option.format));
  });
program.parse(process.argv);
