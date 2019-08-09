import { SystemClient, SystemInput } from '@kilke/core/systemIo';
import createLogger from '@kilke/core/logger';
import dotenv from 'dotenv';
import path from 'path';

import startControllerLoop from './controllerLoop';
import ApiClient from './apiClient';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const { SYSTEM_IO_PORT, SYSTEM_IO_HOST, API_URL, SYSTEM_ID } = process.env;

if (!SYSTEM_ID) {
  throw new Error(
    'System id is not defined in the SYSTEM_ID environment variable',
  );
}

const INTERVAL = 15000;

const logger = createLogger();

const systemClient = new SystemClient({
  port: SYSTEM_IO_PORT,
  host: SYSTEM_IO_HOST,
  onConnect: () => {
    logger.info('Connected to system-io');
  },
});

const systemInput = new SystemInput({
  client: systemClient,
});

const context = {
  logger,
  apiClient: new ApiClient({ url: API_URL }),
  interval: INTERVAL,
  systemId: SYSTEM_ID,
  sendPumpConfiguration: configuration =>
    systemInput.sendMessage({
      systemId: SYSTEM_ID,
      type: 'pump_configuration',
      payload: configuration,
    }),
};

startControllerLoop(context);
