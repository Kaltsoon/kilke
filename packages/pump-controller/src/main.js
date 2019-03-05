import knex from 'knex';
import { createHttpInput } from '@kilke/core/sensorIo';
import createLogger from '@kilke/core/logger';

import knexFile from '../../../knexfile';

import controller from './controller';

const {
  SENSOR_CONFIGURATION_SERVER_URL = 'http://localhost:4001',
} = process.env;

const logger = createLogger();

const sensorIoInput = createHttpInput({
  url: SENSOR_CONFIGURATION_SERVER_URL,
});

const db = knex(knexFile);

const context = {
  logger,
  db,
  sensorIoInput,
};

controller(context);
