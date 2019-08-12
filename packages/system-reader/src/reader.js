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

const createPumpMeasurements = async ({ apiClient, data, systemId, time }) => {
  const rows = Object.entries(data)
    .filter(([, rpm]) => isNumber(rpm))
    .map(([type, rpm]) => {
      return {
        type,
        createdAt: time,
        rpm,
      };
    });

  const measurements = await apiClient.createPumpMeasurements({
    measurements: rows,
    systemId,
  });

  await Promise.all(
    rows.map(({ type }) =>
      apiClient.updatePump({
        systemId,
        type,
        update: { status: 'ok' },
      }),
    ),
  );

  return measurements;
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

  if (payload.type) {
    try {
      await apiClient.updatePump({
        type: payload.type,
        systemId,
        update: { status: 'fault' },
      });
    } catch (e) {
      logger.error(e);
    }
  } else {
    logger.error("Pump type is not defined in the message's payload");
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
};
