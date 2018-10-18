import through from 'through2';
import http from 'http';

import createApp from './app';
import createLogger from './logger';

const { PORT = 3000 } = process.env;

const logger = createLogger();

const context = {
  logger,
};

const logStream = through((chunk, enc, callback) => {
  logger.info(chunk.toString());
});

const app = createApp({ context, logStream });

const server = http.createServer(app.callback()).listen(PORT);

server.on('listening', () => {
  logger.info(`Server listening to port ${PORT}`);
});
