import Router from 'koa-router';

const router = new Router();

import formatDate from 'date-fns/format';
import isValidDate from 'date-fns/is_valid';
import { pick, zipObject, sortBy } from 'lodash';

import { selectAsTimeslot } from '@/utils';

const round = (value, decimal = 3) => {
  return parseFloat(value.toFixed(decimal));
};

const periodsToCommas = value => value.toString().replace(/\./g, ',');

const getMeasurements = async ({ db, from, to, interval, types }) => {
  const results = await db('sensor_measurements')
    .select(
      'created_at',
      'value',
      'type',
      selectAsTimeslot({
        db,
        column: 'created_at',
        columnAlias: 'created_at_fixed',
        interval: interval * 1000,
      }),
      db.raw('avg(value) as avg_value'),
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

const parseDate = dateString => {
  const [day, month, year, hour, minute] = dateString.split('-');

  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hour),
    parseInt(minute),
  );
};

const getMeasurementsCsv = async ({
  db,
  from,
  to,
  types: typesArg,
  interval: intervalArg,
}) => {
  if (!from) {
    throw new Error('From date is required');
  }

  if (!typesArg || typesArg.split(',').length === 0) {
    throw new Error('Sensor types are required');
  }

  const types = typesArg.split(',');

  const fromDate = parseDate(from);

  if (!isValidDate(fromDate)) {
    throw new Error('From date is invalid');
  }

  const toDate = to ? parseDate(to) : new Date();

  if (!isValidDate(toDate)) {
    throw new Error('To date is invalid');
  }

  const interval = intervalArg ? parseInt(intervalArg) : 60;

  if (isNaN(interval)) {
    throw new Error('Interval is not a valid number');
  }

  const data = await getMeasurements({
    db,
    from: fromDate,
    to: toDate,
    interval,
    types,
  });

  const content = data.map(({ createdAt, ...typeData }) => {
    return [
      formatDate(new Date(createdAt), 'DD/MM/YYYY'),
      formatDate(new Date(createdAt), 'HH:mm:ss'),
      ...sortBy(Object.entries(typeData), ([type]) => type).map(([, value]) =>
        periodsToCommas(value),
      ),
    ];
  });

  return toCSVString([['date', 'time', ...types.sort()], ...content]);
};

const getFileName = types => {
  return `${types.join('-')}-${Math.round(Date.now() / 1000)}.csv`;
};

router.get('/measurements', async ctx => {
  const { db } = ctx;
  const { to, from, types, interval } = ctx.query;

  const csv = await getMeasurementsCsv({ db, to, from, types, interval });

  const fileName = getFileName(types.split(','));

  ctx.response.set('Content-Type', 'application/csv');
  ctx.response.set('Content-disposition', `attachment; filename=${fileName}`);

  ctx.body = csv;
});

export default router;
