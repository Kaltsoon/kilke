import Router from 'koa-router';
import logger from '../../../logger';

const router = new Router();

const pumpRowToObject = pump => ({
  id: pump.id,
  status: pump.status,
  displayName: pump.display_name,
  manualRpm: pump.manual_rpm,
  minRpm: pump.min_rpm,
  maxRpm: pump.max_rpm,
});

router.get('/:id', async ctx => {
  const { db } = ctx;
  const { id } = ctx.params;

  const pump = await db('pumps')
    .where({
      id,
    })
    .first('*');

  ctx.body = pump ? pumpRowToObject(pump) : null;
});

router.put('/:id', async ctx => {
  const { db, sensorIoApi, logger } = ctx;
  const { id } = ctx.params;

  const { status, minRpm, maxRpm, manualRpm } = ctx.request.body;

  const update = {
    ...(status && { status }),
    ...(minRpm && { min_rpm: minRpm }),
    ...(maxRpm && { max_rpm: maxRpm }),
    ...(manualRpm && { manual_rpm: manualRpm }),
  };

  await sensorIoApi.sendPumpConfiguration({ configuration: { ...update, id } });

  await db('pumps')
    .where({
      id,
    })
    .update(update);

  const pump = await db('pumps')
    .where({
      id,
    })
    .first('*');

  ctx.body = pump ? pumpRowToObject(pump) : null;
});

export default router;
