import Observable from 'zen-observable';
import uuid from 'uuid/v4';
import { isNumber } from 'lodash';

import { calibrate, isCalibrated } from './utils';

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
        raw_value: value,
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

const createPumpAckSubscribe = ({ db, logger }) => async ({ payload }) => {
  logger.info('Pump ack', { payload });

  const { pumpId, data } = payload;

  if (isNumber(data)) {
    await db('sensor_measurements').insert({
      type: pumpId,
      value_1: data,
      id: uuid(),
      created_at: new Date(),
    });
  } else {
    logger.warning(`Pump "${pumpId}" did not provide a numeric rpm`);
  }
};

export default ({ sensorIoOutput, db, logger, config }) => {
  const observable = Observable.from(sensorIoOutput.observable());

  observable
    .filter(({ type }) => type === 'measurement')
    .subscribe(createMeasurementSubscribe({ db, logger, config }));

  observable
    .filter(({ type }) => type === 'pump_fault')
    .subscribe(createPumpFaultSubscribe({ db, logger }));

  observable
    .filter(({ type }) => type === 'pump_ack')
    .subscribe(createPumpAckSubscribe({ db, logger }));
};
