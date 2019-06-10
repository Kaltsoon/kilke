import Router from 'koa-router';
import isValidDate from 'date-fns/is_valid';

import { selectAsTimeslot } from '@/utils';
import getMeasurementsCsvString from '@/utils/getMeasurementsCsvString';
import { BadRequestError } from '@/errors';

const router = new Router();

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

const getCsv = async ({
  db,
  from,
  to,
  types: typesArg,
  interval: intervalArg,
  systemId,
}) => {
  if (!from) {
    throw new BadRequestError('From date is required');
  }

  if (!typesArg || typesArg.split(',').length === 0) {
    throw new BadRequestError('Sensor types are required');
  }

  const types = typesArg.split(',');

  const fromDate = parseDate(from);

  if (!isValidDate(fromDate)) {
    throw new BadRequestError('From date is invalid');
  }

  const toDate = to ? parseDate(to) : new Date();

  if (!isValidDate(toDate)) {
    throw new BadRequestError('To date is invalid');
  }

  const interval = intervalArg ? parseInt(intervalArg) : 60;

  if (isNaN(interval)) {
    throw new BadRequestError('Interval is not a valid number');
  }

  const measurements = await db('sensor_measurements')
    .select(
      'type',
      selectAsTimeslot({
        db,
        column: 'created_at',
        columnAlias: 'created_at_fixed',
        interval,
      }),
      db.raw('avg(value) as avg_value'),
    )
    .whereIn('type', types)
    .andWhere('systemId', systemId)
    .andWhere('created_at', '>=', fromDate)
    .andWhere('created_at', '<=', toDate)
    .groupBy('created_at_fixed', 'type')
    .orderBy('created_at_fixed');

  return getMeasurementsCsvString({
    measurements,
    types,
    getCreatedAt: ({ createdAtFixed }) => createdAtFixed,
    getValue: ({ avgValue }) => avgValue,
  });
};

const getFileName = types => {
  return `${types.join('-')}-${Math.round(Date.now() / 1000)}.csv`;
};

router.get('/', async ctx => {
  const { db } = ctx;
  const { to, from, types, interval } = ctx.query;
  const { systemId } = ctx.params;

  const csv = await getCsv({ db, to, from, types, interval, systemId });

  const fileName = getFileName(types.split(','));

  ctx.response.set('Content-Type', 'application/csv');
  ctx.response.set('Content-disposition', `attachment; filename=${fileName}`);

  ctx.body = csv;
});

export default router;
