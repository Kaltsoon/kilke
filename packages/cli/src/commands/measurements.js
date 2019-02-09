import parseDate from 'date-fns/parse';
import formatDate from 'date-fns/format';
import isValidDate from 'date-fns/is_valid';
import { pick, mapValues, zipObject } from 'lodash';

import { selectAsTimeslot } from '../utils';

const round = (value, decimal = 3) => {
  return parseFloat(value.toFixed(decimal));
};

const periodsToCommas = value => value.toString().replace(/\./g, ',');

const getMeasurements = async ({ db, from, to, interval, types }) => {
  const results = await db('sensor_measurements')
    .select(
      'created_at',
      'value_1',
      'type',
      selectAsTimeslot({
        db,
        column: 'created_at',
        columnAlias: 'created_at_fixed',
        interval: interval * 1000,
      }),
      db.raw('avg(value_1) as avg_value'),
    )
    .whereIn('type', types)
    .andWhere('created_at', '>=', from)
    .andWhere('created_at', '<=', to)
    .groupBy('created_at_fixed', 'type')
    .orderBy('created_at_fixed');

  const byTime = results.reduce((acc, curr) => {
    const timeKey = curr.created_at_fixed
      ? curr.created_at_fixed.toString()
      : '_';
    const typeKey = curr.type || '_';

    acc[timeKey] = acc[timeKey] || {};
    acc[timeKey][typeKey] = round(curr.avg_value);

    return acc;
  }, {});

  return Object.keys(byTime)
    .filter(k => k !== '_')
    .map(k => {
      const entry = byTime[k];

      return {
        createdAt: parseInt(k),
        ...zipObject(types, new Array(types.length).fill(0)),
        ...pick(entry, types),
      };
    })
    .sort((a, b) => a.createdAt - b.createdAt);
};

const toCSVString = data => {
  return data.reduce((acc, curr) => {
    return `${acc}${curr.join(';')}\n`;
  }, '');
};

const createCommandFn = ({ db, writeFileOutput, logger }) => async argv => {
  if (!argv.from) {
    throw new Error('From date is required');
  }

  if (!argv.sesonrs || argv.sensors.split(',').length === 0) {
    throw new Error('Sensors are required');
  }

  const types = argv.sensors.split(',');

  const dateFormat = 'd-M-yyyy-H-m-s';

  const fromDate = parseDate(argv.from, dateFormat, new Date());

  if (!isValidDate(fromDate)) {
    throw new Error('From date is invalid');
  }

  const toDate = argv.to
    ? parseDate(argv.to, dateFormat, new Date())
    : new Date();

  if (!isValidDate(toDate)) {
    throw new Error('To date is invalid');
  }

  const interval = argv.interval ? parseInt(argv.interval) : 60;

  if (isNaN(interval)) {
    throw new Error('Interval is not a valid number');
  }

  logger.info(`Generating a CSV file out of the measurements of sensors ${types.join(', ')}...`);

  const data = await getMeasurements({
    db,
    from: fromDate,
    to: toDate,
    interval,
    types,
  });

  const content = data.map(({ createdAt, ...typeData }) => [
    formatDate(new Date(createdAt), 'dd/MM/yyyy'),
    formatDate(new Date(createdAt), 'HH:mm:ss'),
    ...mapValues(typeData, value => periodsToCommas(value)),
  ]);

  const fileName = `measurements-${formatDate(
    new Date(),
    'dd-M-yyyy-H-m-s',
  )}.csv`;

  await writeFileOutput({
    fileName,
    content: toCSVString([['date', ...types], ...content]),
  });

  logger.success(`Generated CSV file ${fileName}`);
};

const measurements = ctx => {
  const { wrapCommandFn, program } = ctx;

  return program.command(
    'measurements',
    'Get a CSV file of measurements',
    yargs => {
      return yargs
        .options('sensors', {
          alias: 's',
          describe:
            'List of sensors separated by comma, to include measurements',
        })
        .option('from', {
          alias: 'f',
          describe: 'Date from which to include measurements',
        })
        .option('to', {
          alias: 't',
          describe: 'Date to which to include measurements',
        })
        .option('interval', {
          alias: 'i',
          describe:
            'Time interval in seconds which is used to group measurements',
        });
    },
    wrapCommandFn(createCommandFn(ctx)),
  );
};

export default measurements;
