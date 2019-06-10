import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

import 'any-observable/register/zen';

import { SystemClient, SystemOutput } from '@kilke/core/systemIo';
import createLogger from '@kilke/core/logger';

import createReader from './reader';
import ApiClient from './apiClient';

const { API_URL, SYSTEM_IO_HOST, SYSTEM_IO_PORT } = process.env;

const apiClient = new ApiClient({ url: API_URL });
const logger = createLogger();

const systemClient = new SystemClient({
  port: SYSTEM_IO_PORT,
  host: SYSTEM_IO_HOST,
  onConnect: () => {
    logger.info('Connected to system-io');
  },
});

const systemOutput = new SystemOutput({
  client: systemClient,
});

createReader({ systemOutput, logger, apiClient });
