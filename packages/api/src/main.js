import through from 'through2';
import http from 'http';
import knex from 'knex';
import path from 'path';
import { readFileSync } from 'fs';

import createApp from './app';
import createLogger from './logger';

import createSensorIoClient, {
  createApi as createSensorIoApi,
} from './sensorIo';

const {
  PORT = 5000,
  SENSOR_CONFIGURATION_SERVER_URL = 'http://localhost:4001',
} = process.env;

const config = JSON.parse(
  readFileSync(path.join(__dirname, '..', '..', '..', 'config.json')),
);

const logger = createLogger();

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '..', '..', '..', 'db.sqlite'),
  },
  useNullAsDefault: true,
});

const sensorIoClient = createSensorIoClient({
  url: SENSOR_CONFIGURATION_SERVER_URL,
});
const sensorIoApi = createSensorIoApi({ client: sensorIoClient });

const context = {
  logger,
  db,
  sensorIoClient,
  sensorIoApi,
  config,
};

const logStream = through((chunk, enc, callback) => {
  logger.info(chunk.toString());
});

const app = createApp({ context, logStream });

const server = http.createServer(app.callback()).listen(PORT);

server.on('listening', () => {
  logger.info(`Server listening to port ${PORT}`);
});
