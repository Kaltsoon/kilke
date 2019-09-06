import Observable from 'zen-observable';
import { isNumber, get, isObject, isBoolean } from 'lodash';

const createSensorMeasurements = ({
  apiClient,
  data,
  systemId,
  time,
  calibrated = false,
}) => {
  const rows = Object.entries(data)
    .filter(([, value]) => isNumber(value))
    .map(([type, value]) => {
      return {
        type,
        createdAt: time,
        ...(calibrated ? { value } : { rawValue: value }),
      };
    });

  return apiClient.createSensorMeasurements({ measurements: rows, systemId });
};

const createPumpMeasurements = async ({ apiClient, data, systemId, time }) => {
  const entries = Object.entries(data).filter(([, { rpm }]) => isNumber(rpm));

  const rows = entries.map(([type, { rpm }]) => {
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
    entries.map(([type, { status, mode }]) =>
      apiClient.updatePump({
        systemId,
        type,
        update: { status, mode },
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
  const calibrated = isBoolean(get(payload, 'calibrated'))
    ? payload.calibrated
    : false;

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
    calibrated,
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

export default ({ systemOutput, apiClient, logger }) => {
  const observable = Observable.from(systemOutput.observable());

  observable
    .filter(({ type }) => type === 'measurement')
    .subscribe(createMeasurementSubscribe({ apiClient, logger }));
};
