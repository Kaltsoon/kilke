import { empty, of as observableOf } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import uuid from 'uuid/v4';

const isValidRecord = data => {
  if (!data) {
    return false;
  }

  const { time } = data;

  if (!time || time.toString() === 'Invalid Date') {
    return false;
  }

  return true;
};

const calibrate = async ({ db, value, type }) => {
  const calibration = await db('calibrations')
    .where({ type })
    .orderBy('created_at', 'desc')
    .first('x_1', 'y_1', 'x_2', 'y_2');

  if (!calibration) {
    throw new Error(`No calibration found for sensor type "${type}"`);
  }

  const { x_1: x1, y_1: y1, x_2: x2, y_2: y2 } = calibration;

  const k = (y1 - y2) / (x1 - x2);
  const b = (x1 * y2 - x2 * y1) / (x1 - x2);

  return k * value + b;
};

const floatOrNull = val => !isNaN(parseFloat(val)) ? parseFloat(val) : null;

const parseRecord = data => {
  try {
    const [time, cond, tco, phd, phf, wd, wf, tamb] = data.split(' ');

    return {
      time: time ? new Date(parseInt(time) * 1000) : null,
      cond: floatOrNull(cond),
      tco: floatOrNull(tco),
      phd: floatOrNull(phd),
      phf: floatOrNull(phf),
      wd: floatOrNull(wd),
      wf: floatOrNull(wf),
      tamb: floatOrNull(tamb),
    };
  } catch {
    return null;
  }
};

const createObservable = ({ sensorObservable, logger }) => {
  return sensorObservable
    .pipe(
      map(parseRecord),
      flatMap(record => {
        if (!isValidRecord(record)) {
          logger.info('Record is invalid', { record });

          return empty();
        }

        return observableOf(record);
      }),
    );
};

const createSubscribe = ({ db, logger }) => async data => {
  logger.info('New record', { record: data });

  const { time, cond, tco, phd, phf, wd, wf, tamb } = data;

  let calibratedPhd = null;
  let calibratedPhf = null;

  if (typeof phd === 'number') {
    try {
      calibratedPhd = await calibrate({ db, value: phd, type: 'phd' });
      console.log(calibratedPhd);
    } catch (e) {
      log.info(`Sensor "phd" is not calibrated`);
    }
  }

  if (typeof phf === 'number') {
    try {
      calibratedPhf = await calibrate({ db, value: phf, type: 'phf' });
    } catch (e) {
      log.info(`Sensor "phf" is not calibrated`);
    }
  }

  const rows = [
    cond !== null ? { type: 'cond', created_at: time, id: uuid(), value_1: cond } : null,
    tco !== null ? { type: 'tco', created_at: time, id: uuid(), value_1: tco } : null,
    calibratedPhd !== null ? { type: 'phd', created_at: time, id: uuid(), value_1: calibratedPhd } : null,
    calibratedPhf !== null ? { type: 'phf', created_at: time, id: uuid(), value_1: calibratedPhf } : null,
    wd !== null ? { type: 'wd', created_at: time, id: uuid(), value_1: wd } : null,
    wf !== null ? { type: 'wf', created_at: time, id: uuid(), value_1: wf } : null,
    tamb !== null ? { type: 'tamb', created_at: time, id: uuid(), value_1: tamb } : null,
  ].filter(r => !!r);

  try {
    return db('sensor_measurements').insert(rows)
  } catch (e) {
    log.error(e);
  }
};

export default ({ sensorObservable, db, logger }) => {
  createObservable({ sensorObservable, logger })
    .subscribe(createSubscribe({ db, logger }));
};
