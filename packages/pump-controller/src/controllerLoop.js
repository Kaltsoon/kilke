import controller from './controller';

const runController = async context => {
  const { db, interval, sendPumpConfiguration, logger } = context;
  const now = new Date();

  const measurements = await db('sensor_measurements')
    .where('created_at', '<', now)
    .andWhere('created_at', '>', new Date(now - 2 * interval))
    .select('value_1', 'created_at');

  const manualRpms = controller({ measurements });

  manualRpms.forEach(({ id, manualRpm }) => {
    logger.info(`Setting manual rpm of ${manualRpm} RPM for pump "${id}"`);
    sendPumpConfiguration({ id, manual_rpm: manualRpm });
  });
};

export const startControllerLoop = context => {
  const { logger, interval } = context;

  logger.info('Pump controller is online');

  setInterval(() => {
    logger.info('Running pump controller...');
    runController(context);
  }, interval);
};

export default startControllerLoop;
