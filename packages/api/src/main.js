import through from 'through2';
import http from 'http';
import path from 'path';
import { readFileSync, writeFile } from 'fs';
import { merge } from 'lodash';
import { promisify } from 'util';
import knex from 'knex';
import createLogger from '@kilke/core/logger';
import { createHttpOutput } from '@kilke/core/sensorIo';

import createApp from './app';
import knexFile from '../../../knexfile';

const writeFileAsync = promisify(writeFile);

const {
  PORT = 5000,
  SENSOR_CONFIGURATION_SERVER_URL = 'http://localhost:4001',
} = process.env;

const configFilePath = path.join(__dirname, '..', '..', '..', 'config.json');

const logger = createLogger();

let config = {};

try {
  config = JSON.parse(readFileSync(configFilePath));
} catch (e) {
  logger.warning('No config file found');
}

const updateConfig = (newConfig = {}) => {
  return writeFileAsync(
    configFilePath,
    JSON.stringify(
      { ...newConfig, updatedAt: new Date().toISOString() },
      null,
      2,
    ),
  );
};

config = merge(
  {
    sensors: {},
    pumps: {},
    visualization: {
      tabs: {},
      tabOrder: [],
    },
    reactor: {},
  },
  config,
);

const sensorIoOutput = createHttpOutput({
  url: SENSOR_CONFIGURATION_SERVER_URL,
});

const db = knex(knexFile);

const context = {
  logger,
  db,
  sensorIoOutput,
  config,
  updateConfig,
};

const logStream = through(chunk => {
  logger.info(chunk.toString());
});

const app = createApp({ context, logStream });

const server = http.createServer(app.callback()).listen(PORT);

server.on('listening', () => {
  logger.info(`Server listening to port ${PORT}`);
});
