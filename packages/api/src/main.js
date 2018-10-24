import through from 'through2';
import http from 'http';
import knex from 'knex';
import path from 'path';

import createApp from './app';
import createLogger from './logger';

const { PORT = 5000 } = process.env;

const logger = createLogger();

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '..', '..', '..', 'db.sqlite'),
  },
  useNullAsDefault: true,
});

const context = {
  logger,
  db,
};

const logStream = through((chunk, enc, callback) => {
  logger.info(chunk.toString());
});

const app = createApp({ context, logStream });

const server = http.createServer(app.callback()).listen(PORT);

server.on('listening', () => {
  logger.info(`Server listening to port ${PORT}`);
});
