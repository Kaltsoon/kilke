import { get, keyBy, mapValues } from 'lodash';

import makeController from './controller';

const getPumpTypes = config => Object.keys(get(config, 'pumps') || {});

const getByTypes = ({ measurements = [], types = [] }) => {
  const byType = keyBy(
    measurements.filter(
      ({ type, value_1 }) =>
        Boolean(type) && types.includes(type) && typeof value_1 === 'number',
    ),
    ({ type }) => type,
  );

  return mapValues(byType, v => {
    return {
      value: v.value_1,
      createdAt: v.max_created_at ? new Date(v.max_created_at) : null,
    };
  });
};

const getSensors = ({ measurements = [], config = {} }) => {
  return getByTypes({
    measurements,
    types: Object.keys(get(config, 'sensors') || {}),
  });
};

const getPumps = ({ measurements = [], config = {} }) => {
  return getByTypes({
    measurements,
    types: getPumpTypes(config),
  });
};

const getLatestMeasurements = ({ db }) => {
  return db.select('sa.type', 'sa.max_created_at', 'sb.value_1').from(
    db.raw(
      `(select max(created_at) as max_created_at, type from sensor_measurements sa group by type) sa left join sensor_measurements sb on sa.max_created_at = sb.created_at and sa.type = sb.type;
`,
    ),
  );
};

const getAutomaticPumpTypes = async ({ db }) => {
  const automaticPumps = await db('pumps').where('status', '=', 'automatic');

  return automaticPumps.map(({ id }) => id);
};

const runController = async context => {
  const { db, sendPumpConfiguration, logger, config, controller } = context;

  const [measurements, automaticPumps] = await Promise.all([
    getLatestMeasurements({ db }),
    getAutomaticPumpTypes({ db }),
  ]);

  const controllerArgs = {
    measurements: {
      sensors: getSensors({ measurements, config }),
      pumps: getPumps({ measurements, config }),
    },
    automaticPumps,
  };

  logger.info('Running the pump controller', controllerArgs);

  try {
    const manualRpms = await controller(controllerArgs);

    manualRpms.forEach(({ id, manualRpm }) => {
      logger.info(`Setting rpm of ${manualRpm} RPM for pump "${id}"`);
      sendPumpConfiguration({
        id,
        manual_rpm: manualRpm,
        status: 'manual',
      }).catch(e => logger.error(e));
    });
  } catch (e) {
    logger.error(e);
  }
};

export const startControllerLoop = context => {
  const { logger, interval } = context;

  logger.info('Pump controller is online');

  const controller = makeController(context);

  setInterval(() => {
    runController({ ...context, controller });
  }, interval);
};

export default startControllerLoop;
