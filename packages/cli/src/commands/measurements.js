import parseDate from 'date-fns/parse';
import formatDate from 'date-fns/format';
import isValidDate from 'date-fns/is_valid';

import { selectAsTimeslot } from '../utils';

const getMeasurements = async ({ db, from, to, interval }) => {
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
    .where('created_at', '>=', from)
    .andWhere('created_at', '<=', to)
    .groupBy('created_at_fixed')
    .orderBy('created_at_fixed');

  return results.map(({ created_at_fixed, avg_value, type }) => ({
    createdAt: created_at_fixed,
    value: avg_value,
    type,
  }));
};

const toCSVString = data => {
  return data.reduce((acc, curr) => {
    return `${acc}${curr.join(';')}\n`;
  }, '');
};

const createCommandFn = ({
  db,
  program,
  writeFileOutput,
  logger,
}) => async argv => {
  if (!argv.from) {
    throw new Error('From date is required');
  }

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

  logger.info('Generating a CSV file out of the measurements...');

  const data = await getMeasurements({
    db,
    from: fromDate,
    to: toDate,
    interval,
  });

  const content = data.map(({ createdAt, value, type }) => [
    createdAt ? Math.round(+new Date(createdAt) / 1000) : 0,
    type,
    value,
  ]);

  const fileName = `measurements-${formatDate(
    new Date(),
    'dd-M-yyyy-H-m-s',
  )}.csv`;

  await writeFileOutput({
    fileName,
    content: toCSVString(content),
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
