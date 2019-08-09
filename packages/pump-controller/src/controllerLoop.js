import { keyBy, mapValues } from 'lodash';

import makeController from './controller';

const getMeasurementsByType = (measurements, getValue) => {
  const byType = keyBy(measurements, ({ type }) => type);

  return mapValues(byType, v => {
    return {
      value: getValue(v),
      createdAt: v.createdAt ? new Date(v.createdAt) : null,
    };
  });
};

const runController = async context => {
  const {
    sendPumpConfiguration,
    logger,
    apiClient,
    controller,
    systemId,
  } = context;

  const {
    automaticPumps,
    pumpMeasurements,
    sensorMeasurements,
  } = await apiClient.getPumpControllerState(systemId);

  const controllerArgs = {
    measurements: {
      sensors: getMeasurementsByType(sensorMeasurements, ({ value }) => value),
      pumps: getMeasurementsByType(pumpMeasurements, ({ rpm }) => rpm),
    },
    automaticPumps: automaticPumps.map(({ type }) => type),
  };

  logger.info('Running the pump controller', controllerArgs);

  try {
    const manualRpms = await controller(controllerArgs);

    manualRpms.forEach(({ id, manualRpm }) => {
      logger.info(`Setting rpm of ${manualRpm} RPM for pump "${id}"`);
      sendPumpConfiguration({
        id,
        manual_rpm: manualRpm,
        status: 'manual',
      }).catch(e => logger.error(e));
    });
  } catch (e) {
    logger.error(e);
  }
};

export const startControllerLoop = async context => {
  const { logger, interval, apiClient, systemId } = context;

  const system = await apiClient.getSystem(systemId);

  logger.info('Pump controller is online');

  const controller = makeController({ ...context, system });

  setInterval(() => {
    runController({ ...context, controller });
  }, interval);
};

export default startControllerLoop;
