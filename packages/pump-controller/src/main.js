import knex from 'knex';
import { createHttpOutput } from '@kilke/core/sensorIo';
import createLogger from '@kilke/core/logger';

import knexFile from '../../../knexfile';

import controller from './controller';

const {
  SENSOR_CONFIGURATION_SERVER_URL = 'http://localhost:4001',
} = process.env;

const logger = createLogger();

const sensorIoOutput = createHttpOutput({
  url: SENSOR_CONFIGURATION_SERVER_URL,
});

const db = knex(knexFile);

const context = {
  logger,
  db,
  sensorIoOutput,
};

controller(context);
