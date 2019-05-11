import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

import through from 'through2';
import http from 'http';
import knex from 'knex';
import createLogger from '@kilke/core/logger';
import { SystemClient, SystemInput } from '@kilke/core/systemIo';
import { knexSnakeCaseMappers } from 'objection';

import createApp from './app';
import knexFile from '../knexfile';
import bindModels from './models';

const { PORT, SYSTEM_IO_PORT, SYSTEM_IO_HOST } = process.env;

const logger = createLogger();

const systemClient = new SystemClient({
  port: SYSTEM_IO_PORT,
  host: SYSTEM_IO_HOST,
});

const systemInput = new SystemInput({ client: systemClient });

const db = knex({
  ...knexFile,
  ...knexSnakeCaseMappers(),
});

const models = bindModels(db);

const context = {
  logger,
  db,
  systemInput,
  models,
};

const logStream = through(chunk => {
  logger.info(chunk.toString());
});

const app = createApp({ context, logStream });

const server = http.createServer(app.callback()).listen(PORT);

server.on('listening', () => {
  logger.info(`Server listening to port ${PORT}`);
});
