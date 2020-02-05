import Router from 'koa-router';
import subMinutes from 'date-fns/subMinutes';
import { get } from 'lodash';

import { NotFoundError } from '@/errors';
import { isArray, isNumber } from '@/utils';
import csv from './csv';

const router = new Router();

export const calibrate = ({ config, value, type }) => {
  const { x1 = 1, x2 = 2, y1 = 1, y2 = 2 } =
    get(config, ['sensors', type, 'calibration']) || {};

  const k = (y1 - y2) / (x1 - x2);
  const b = (x1 * y2 - x2 * y1) / (x1 - x2);

  return k * value + b;
};

router.get('/', async ctx => {
  const {
    models: { SensorMeasurement },
    params,
  } = ctx;

  const {
    from: fromParam,
    to: toParam,
    limit: limitParam,
    offset: offsetParam,
    types: typesString,
  } = ctx.query;

  const { systemId } = params;

  const to = toParam ? new Date(toParam) : new Date();
  const from = fromParam ? new Date(fromParam) : subMinutes(new Date(), 2);
  const types = typesString ? typesString.split(',') : null;
  const limit = limitParam ? parseInt(limitParam) : 100;
  const offset = offsetParam ? parseInt(offsetParam) : 0;

  let query = SensorMeasurement.query()
    .select('*')
    .where('systemId', systemId)
    .andWhere('createdAt', '<', to)
    .andWhere('createdAt', '>', from);

  if (types) {
    query = query.andWhere(qb => qb.whereIn('type', types));
  }

  const results = await query
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .offset(offset);

  ctx.body = results;
});

router.use('/csv', csv.routes());

router.get('/:type', async ctx => {
  const {
    models: { SensorMeasurement },
    query,
    params,
  } = ctx;

  const { type, systemId } = params;
  const limit = query.limit ? parseInt(query.limit) : 20;

  const results = await SensorMeasurement.query()
    .select('*')
    .where({
      type,
      systemId,
    })
    .orderBy('created_at', 'desc')
    .limit(limit);

  ctx.body = results;
});

router.post('/', async ctx => {
  const {
    models: { System, SensorMeasurement },
    params: { systemId },
    request: { body },
  } = ctx;

  const system = await System.query().findById(systemId);

  if (!system) {
    throw new NotFoundError(`No system found with id ${systemId}`);
  }

  const { config } = system;

  const measurements = isArray(body) ? body : [body];

  const calibratedMeasurements = measurements.map(
    ({ rawValue, type, value, ...measurement }) => ({
      rawValue,
      value: isNumber(value)
        ? value
        : calibrate({ value: rawValue, config, type }),
      type,
      ...measurement,
      systemId,
    }),
  );

  const createdMeasurements = await SensorMeasurement.query()
    .insert(calibratedMeasurements)
    .returning('*');

  ctx.body = createdMeasurements;
});

export default router;
