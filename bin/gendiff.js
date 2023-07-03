#!/usr/bin/env node
import { program } from 'commander';

program
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format');

program.parse();
