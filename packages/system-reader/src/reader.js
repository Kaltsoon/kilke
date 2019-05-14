import Observable from 'zen-observable';
import { isNumber, get, isObject, isBoolean } from 'lodash';

const createSensorMeasurements = ({ apiClient, data, systemId, time }) => {
  const rows = Object.entries(data)
    .filter(([, value]) => isNumber(value))
    .map(([type, value]) => {
      return {
        type,
        createdAt: time,
        rawValue: value,
      };
    });

  return apiClient.createSensorMeasurements({ measurements: rows, systemId });
};

const createPumpMeasurements = ({ apiClient, data, systemId, time }) => {
  const rows = Object.entries(data)
    .filter(([, value]) => isNumber(get(value, 'rpm')) && get(value, 'status'))
    .map(([type, value]) => {
      return {
        type,
        createdAt: time,
        rpm: value.rpm,
        status: value.status,
      };
    });

  return apiClient.createPumpMeasurements({ measurements: rows, systemId });
};

const createBinarySensorMeasurements = ({
  apiClient,
  data,
  systemId,
  time,
}) => {
  const rows = Object.entries(data)
    .filter(([, value]) => isBoolean(value))
    .map(([type, value]) => {
      return {
        type,
        createdAt: time,
        value,
      };
    });

  return apiClient.createBinarySensorMeasurements({
    measurements: rows,
    systemId,
  });
};

const createMeasurementSubscribe = ({ apiClient, logger }) => async ({
  payload,
  systemId,
}) => {
  if (!systemId) {
    return logger.error('Measurement systemId is not defined in the message');
  }

  const measurementType = get(payload, 'type');
  const data = get(payload, 'data');
  const time = get(payload, 'time');

  if (!isObject(data)) {
    return logger.error('Measurement data is not defined in the message', {
      payload,
    });
  }

  logger.info('New measurement', { payload, systemId });

  const measurementTime = isNumber(time) ? new Date(time * 1000) : new Date();

  const measurementArgs = {
    apiClient,
    data,
    time: measurementTime,
    systemId,
  };

  try {
    if (measurementType === 'sensor') {
      await createSensorMeasurements(measurementArgs);
    } else if (measurementType === 'pump') {
      await createPumpMeasurements(measurementArgs);
    } else if (measurementType === 'binary') {
      await createBinarySensorMeasurements(measurementArgs);
    }
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
