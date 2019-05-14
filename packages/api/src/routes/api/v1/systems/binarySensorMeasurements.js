import Router from 'koa-router';

import { NotFoundError } from '@/errors';
import { isArray } from '@/utils';

const router = new Router();

router.get('/:type', async ctx => {
  const {
    models: { BinarySensorMeasurement },
    query,
    params,
  } = ctx;

  const { type, systemId } = params;
  const limit = query.limit ? parseInt(query.limit) : 20;

  const results = await BinarySensorMeasurement.query()
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
    models: { System, BinarySensorMeasurement },
    params: { systemId },
    request: { body },
  } = ctx;

  const system = await System.query().findById(systemId);

  if (!system) {
    throw new NotFoundError(`No system found with id ${systemId}`);
  }

  const measurements = isArray(body) ? body : [body];

  const createdMeasurements = await BinarySensorMeasurement.query()
    .insert(measurements.map(measurement => ({ ...measurement, systemId })))
    .returning('*');

  ctx.body = createdMeasurements;
});

export default router;
