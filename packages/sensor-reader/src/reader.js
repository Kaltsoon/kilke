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
}

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

  const rows = [
    cond !== null ? { type: 'cond', created_at: time, id: uuid(), value_1: cond } : null,
    tco !== null ? { type: 'tco', created_at: time, id: uuid(), value_1: tco } : null,
    phd !== null ? { type: 'phd', created_at: time, id: uuid(), value_1: phd } : null,
    phf !== null ? { type: 'phf', created_at: time, id: uuid(), value_1: phf } : null,
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
