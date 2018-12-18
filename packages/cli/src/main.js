import knex from 'knex';
import path from 'path';
import program from 'yargs';
import fs from 'fs';
import { promisify } from 'util';
import chalk from 'chalk';

import { measurements } from './commands';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '..', '..', '..', 'db.sqlite'),
  },
  useNullAsDefault: true,
});

const writeFileAsync = promisify(fs.writeFile);

const logger = {
  info: message => console.log(chalk.blue(message)),
  success: message => console.log(chalk.green(message)),
  error: message => console.log(chalk.red(message)),
};

const wrapCommandFn = fn => async (...args) => {
  try {
    await fn(...args);
    process.exit(0);
  } catch (e) {
    logger.error(e.message);
    process.exit(1);
  }
};

const context = {
  db,
  program,
  logger,
  wrapCommandFn,
  writeFileOutput: ({ fileName, content }) =>
    writeFileAsync(
      path.join(__dirname, '..', 'data', fileName),
      content,
      'utf-8',
    ),
};

const commands = [measurements];

commands.reduce((acc, curr) => {
  return curr({ ...context, program: acc });
}, program).argv;
