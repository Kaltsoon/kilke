import { empty, of as observableOf } from 'rxjs';
import { flatMap, filter } from 'rxjs/operators';
import uuid from 'uuid/v4';
import { isNumber } from 'lodash';

import { calibrate, isCalibrated } from './utils';
import { __values } from 'tslib';

const isValidMessage = data => {
  if (!data && typeof data === 'object') {
    return false;
  }

  const { type } = data;

  if (typeof type !== 'string') {
    return false;
  }

  return true;
};

const createObservable = ({ sensorObservable, logger }) => {
  return sensorObservable.pipe(
    flatMap(message => {
      if (!isValidMessage(message)) {
        logger.info('Message is invalid', { message });

        return empty();
      }

      return observableOf(message);
    }),
  );
};

const createMeasurementSubscribe = ({ db, logger, config }) => async ({
  payload: data,
}) => {
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
      if (!isCalibrated({ config, type })) {
        logger.warn(`Sensor of type "${type}" is not calibrated`);
      }

      const calibratedValue = calibrate({ config, type, value });

      return {
        type,
        created_at: measurementTime,
        id: uuid(),
        value_1: calibratedValue,
      };
    });

  try {
    return db('sensor_measurements').insert(rows);
  } catch (e) {
    logger.error(e);
  }
};

const createPumpFaultSubscribe = ({ db, logger }) => async ({ payload }) => {
  logger.info('Pump fault', { payload });

  if (payload.pumpId) {
    try {
      await db('pumps')
        .where({ id: payload.pumpId })
        .update({ status: 'fault' });
    } catch (e) {
      logger.error(e);
    }
  }
};

export default ({ sensorObservable, db, logger, config }) => {
  const observable = createObservable({ sensorObservable, logger });

  observable
    .pipe(filter(({ type }) => type === 'measurement'))
    .subscribe(createMeasurementSubscribe({ db, logger, config }));

  observable
    .pipe(filter(({ type }) => type === 'pump_fault'))
    .subscribe(createPumpFaultSubscribe({ db, logger }));
};
