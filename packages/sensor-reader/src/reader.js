import { empty, of as observableOf } from 'rxjs';
import { map, flatMap, filter } from 'rxjs/operators';
import uuid from 'uuid/v4';

import { calibrate } from './utils';

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

const createMeasurementSubscribe = ({ db, logger }) => async ({
  payload: data,
}) => {
  logger.info('New measurement', { measurement: data });

  const { time: rawTime, cond, tco, phd, phf, wd, wf, tamb } = data;

  const time = new Date(parseInt(rawTime) * 1000);

  let calibratedPhd = null;
  let calibratedPhf = null;
  let calibratedWd = null;
  let calibratedWf = null;

  if (typeof phd === 'number') {
    try {
      calibratedPhd = await calibrate({ db, value: phd, type: 'phd' });
      console.log(calibratedPhd);
    } catch (e) {
      logger.info(`Sensor "phd" is not calibrated`);
    }
  }

  if (typeof phf === 'number') {
    try {
      calibratedPhf = await calibrate({ db, value: phf, type: 'phf' });
    } catch (e) {
      logger.info(`Sensor "phf" is not calibrated`);
    }
  }

  if (typeof wd === 'number') {
    try {
      calibratedWd = await calibrate({ db, value: wd, type: 'wd' });
    } catch (e) {
      logger.info(`Sensor "wd" is not calibrated`);
    }
  }

  if (typeof wf === 'number') {
    try {
      calibratedWf = await calibrate({ db, value: wf, type: 'wf' });
    } catch (e) {
      logger.info(`Sensor "wf" is not calibrated`);
    }
  }

  const rows = [
    cond !== null
      ? { type: 'cond', created_at: time, id: uuid(), value_1: cond }
      : null,
    tco !== null
      ? { type: 'tco', created_at: time, id: uuid(), value_1: tco }
      : null,
    calibratedPhd !== null
      ? { type: 'phd', created_at: time, id: uuid(), value_1: calibratedPhd }
      : null,
    calibratedPhf !== null
      ? { type: 'phf', created_at: time, id: uuid(), value_1: calibratedPhf }
      : null,
    calibratedWd !== null
      ? { type: 'wd', created_at: time, id: uuid(), value_1: calibratedWd }
      : null,
    calibratedWf !== null
      ? { type: 'wf', created_at: time, id: uuid(), value_1: calibratedWf }
      : null,
    tamb !== null
      ? { type: 'tamb', created_at: time, id: uuid(), value_1: tamb }
      : null,
  ].filter(r => !!r);

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

export default ({ sensorObservable, db, logger }) => {
  const observable = createObservable({ sensorObservable, logger });

  observable
    .pipe(filter(({ type }) => type === 'measurement'))
    .subscribe(createMeasurementSubscribe({ db, logger }));

  observable
    .pipe(filter(({ type }) => type === 'pump_fault'))
    .subscribe(createPumpFaultSubscribe({ db, logger }));
};
