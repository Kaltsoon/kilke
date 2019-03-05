import knex from 'knex';
import { createHttpInput, sendPumpConfiguration } from '@kilke/core/sensorIo';
import createLogger from '@kilke/core/logger';
import path from 'path';
import { readFileSync } from 'fs';

import knexFile from '../../../knexfile';

import startControllerLoop from './controllerLoop';

const {
  SENSOR_CONFIGURATION_SERVER_URL = 'http://localhost:4001',
} = process.env;

const INTERVAL = 15000;

const logger = createLogger();

const config = JSON.parse(
  readFileSync(path.join(__dirname, '..', '..', '..', 'config.json')),
);

const sensorIoInput = createHttpInput({
  url: SENSOR_CONFIGURATION_SERVER_URL,
});

const db = knex(knexFile);

const context = {
  logger,
  db,
  sensorIoInput,
  interval: INTERVAL,
  config,
  sendPumpConfiguration: configuration =>
    sendPumpConfiguration({ input: sensorIoInput, configuration }),
};

startControllerLoop(context);
