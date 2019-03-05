import 'any-observable/register/zen';

import path from 'path';
import { readFileSync } from 'fs';
import knex from 'knex';
import { createTcpOutput } from '@kilke/core/sensorIo';
import createLogger from '@kilke/core/logger';

import knexFile from '../../../knexfile';
import createReader from './reader';

const {
  RECORD_SERVER_PORT = 4000,
  RECORD_SERVER_HOST = '127.0.0.1',
} = process.env;

const config = JSON.parse(
  readFileSync(path.join(__dirname, '..', '..', '..', 'config.json')),
);

const db = knex(knexFile);

const logger = createLogger();

const sensorIoOutput = createTcpOutput({
  host: RECORD_SERVER_HOST,
  port: parseInt(RECORD_SERVER_PORT),
  onError: e => logger.error(e),
});

createReader({ sensorIoOutput, db, logger, config });
