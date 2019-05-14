import Router from 'koa-router';
import { get } from 'lodash';

import { NotFoundError } from '@/errors';
import { isArray, isNumber } from '@/utils';

const router = new Router();

export const getFlowRate = ({ config, rpm, type }) => {
  const { qRpm } = get(config, ['pumps', type, 'calibration']) || {};

  return isNumber(qRpm) ? rpm * qRpm : rpm;
};

router.get('/:type', async ctx => {
  const {
    models: { PumpMeasurement },
    query,
    params,
  } = ctx;

  const { type, systemId } = params;
  const limit = query.limit ? parseInt(query.limit) : 20;

  const results = await PumpMeasurement.query()
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
    models: { System, PumpMeasurement },
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
    ({ rpm, type, flowRate, ...measurement }) => ({
      rpm,
      flowRate: isNumber(flowRate)
        ? flowRate
        : getFlowRate({ rpm, config, type }),
      type,
      ...measurement,
      systemId,
    }),
  );

  const createdMeasurements = await PumpMeasurement.query()
    .insert(calibratedMeasurements)
    .returning('*');

  ctx.body = createdMeasurements;
});

export default router;
