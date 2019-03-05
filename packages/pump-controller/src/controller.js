const INTERVAL = 10000;

const runController = () => {};

export const controller = context => {
  const { logger } = context;

  logger.info('Pump controller is online');

  setInterval(() => {
    logger.info('Running pump controller...');
    runController(context);
  }, INTERVAL);
};

export default controller;
