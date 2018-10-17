import { empty, of as observableOf } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

const isValidRecord = data => {
  return !!data;
}

const parseRecord = data => {
  try {
    return data.split(' ')
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

const createSubscribe = ({ db, logger }) => data => {
  logger.info('New record', { record: data });
};

export default ({ sensorObservable, db, logger }) => {
  createObservable({ sensorObservable, logger })
    .subscribe(createSubscribe({ db, logger }));
};
