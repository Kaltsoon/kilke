import path from 'path';
import { readFileSync } from 'fs';
import knex from 'knex';

import { createTcpClientObservable } from './utils';
import createReader from './reader';
import createLogger from './logger';
import knexFile from '../../../knexfile';

const {
  RECORD_SERVER_PORT = 4000,
  RECORD_SERVER_HOST = '127.0.0.1',
} = process.env;

const config = JSON.parse(
  readFileSync(path.join(__dirname, '..', '..', '..', 'config.json')),
);

const db = knex(knexFile);

const logger = createLogger();

const observable = createTcpClientObservable({
  host: RECORD_SERVER_HOST,
  port: parseInt(RECORD_SERVER_PORT),
  onError: e => logger.error(e),
});

createReader({ sensorObservable: observable, db, logger, config });
