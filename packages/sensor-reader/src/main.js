import knex from 'knex';
import path from 'path';

import { createTcpClientObservable } from './utils';
import createReader from './reader';
import createLogger from './logger';

const { PORT = 4000, HOST = '127.0.0.1' } = process.env;

const logger = createLogger();

const observable = createTcpClientObservable({
  host: HOST,
  port: PORT,
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
