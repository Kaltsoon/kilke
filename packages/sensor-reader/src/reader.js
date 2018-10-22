import { empty, of as observableOf } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import uuid from 'uuid/v4';

const isValidRecord = data => {
  if (!data) {
    return false;
  }

  const { time, temperature1, conductivity1 } = data;

  if (!time || time.toString() === 'Invalid Date') {
    return false;
  }

  if (isNaN(temperature1)) {
    return false;
  }

  if (isNaN(conductivity1)) {
    return false;
  }

  return true;
}

const parseRecord = data => {
  try {
    const [time, temperature1, conductivity1] = data.split(' ');

    return {
      time: time ? new Date(parseInt(time) * 1000) : null,
      temperature1: temperature1 ? parseFloat(temperature1) : null,
      conductivity1: conductivity1 ? parseFloat(conductivity1) : null,
    };
  } catch {
    return null;
  }
};

const createObservable = ({ sensorObservable, logger }) => {
  return sensorObservable
    .pipe(
      map(parseRecord),
      flatMap(data => {
        if (!isValidRecord(data)) {
          logger.error('Invalid record', { record: data });

          return empty();
        }

        return observableOf(data);
      }),
    );
};

const createSubscribe = ({ db, logger }) => async data => {
  logger.info('New record', { record: data });

  const { time, temperature1, conductivity1 } = data;

  try {
    await Promise.all([
      db('analogue_electrodes').insert([
        { type: 'tco', created_at: time, id: uuid(), value: temperature1 },
        { type: 'con', created_at: time, id: uuid(), value: conductivity1 },
      ]),
    ]);
  } catch (e) {
    log.error(e);
  }
};

export default ({ sensorObservable, db, logger }) => {
  createObservable({ sensorObservable, logger })
    .subscribe(createSubscribe({ db, logger }));
};
