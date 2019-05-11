import Observable from 'zen-observable';
import { isNumber } from 'lodash';

const createMeasurementSubscribe = ({ apiClient, logger }) => async ({
  payload: data,
  systemId,
}) => {
  if (!systemId) {
    return logger.error('systemId is not defined in the message');
  }

  logger.info('New measurement', { measurement: data });

  const { time, ...sensors } = data;
  const measurementTime = isNumber(time) ? new Date(time * 1000) : new Date();

  const nonNumberSensors = Object.entries(sensors)
    .filter(([, value]) => !isNumber(value))
    .map(([type]) => type);

  if (nonNumberSensors.length > 0) {
    logger.warn(
      `Sensors "${nonNumberSensors.join(
        ', ',
      )}" did not provide a numeric measurement`,
    );
  }

  const rows = Object.entries(sensors)
    .filter(([, value]) => isNumber(value))
    .map(([type, value]) => {
      return {
        type,
        createdAt: measurementTime,
        rawValue: value,
      };
    });

  try {
    await apiClient.createSensorMeasurements({ measurements: rows, systemId });
  } catch (e) {
    logger.error(e);
  }
};

const createPumpFaultSubscribe = ({ apiClient, logger }) => async ({
  payload,
  systemId,
}) => {
  if (!systemId) {
    return logger.error('systemId is not defined in the message');
  }

  logger.info('Pump fault', { payload });

  if (payload.pumpId) {
    try {
      await apiClient.updatePump({
        type: payload.pumpId,
        systemId,
        update: { status: 'fault' },
      });
    } catch (e) {
      logger.error(e);
    }
  } else {
    logger.error("pumpId is not defined in the message's payload");
  }
};

const createPumpAckSubscribe = ({ apiClient, logger }) => async ({
  payload,
  systemId,
}) => {
  if (!systemId) {
    return logger.error('systemId is not defined in the message');
  }

  logger.info('Pump ack', { payload });

  const { pumpId, data } = payload;

  if (pumpId) {
    return logger.error("pumpId is not defined in the message's payload");
  }

  if (isNumber(data)) {
    const measurement = {
      type: pumpId,
      rawValue: data,
      value: data,
    };

    try {
      await apiClient.createSensorMeasurements({
        measurements: [measurement],
        systemId,
      });
    } catch (e) {
      logger.error(e);
    }
  } else {
    logger.warning(`Pump "${pumpId}" did not provide a numeric rpm`);
  }
};

export default ({ systemOutput, apiClient, logger }) => {
  const observable = Observable.from(systemOutput.observable());

  observable
    .filter(({ type }) => type === 'measurement')
    .subscribe(createMeasurementSubscribe({ apiClient, logger }));

  observable
    .filter(({ type }) => type === 'pump_fault')
    .subscribe(createPumpFaultSubscribe({ apiClient, logger }));

  observable
    .filter(({ type }) => type === 'pump_ack')
    .subscribe(createPumpAckSubscribe({ apiClient, logger }));
};
