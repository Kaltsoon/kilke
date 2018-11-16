import knex from 'knex';
import path from 'path';

import { createTcpClientObservable } from './utils';
import createReader from './reader';
import createLogger from './logger';

const {
  RECORD_SERVER_PORT = 4000,
  RECORD_SERVER_HOST = '127.0.0.1',
} = process.env;

const logger = createLogger();

const observable = createTcpClientObservable({
  host: RECORD_SERVER_HOST,
  port: parseInt(RECORD_SERVER_PORT),
  onError: e => logger.error(e),
});

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '..', '..', '..', 'db.sqlite'),
  },
  useNullAsDefault: true,
});

createReader({ sensorObservable: observable, db, logger });
