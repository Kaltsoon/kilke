import Router from 'koa-router';
import { sendPumpConfiguration } from '@kilke/core/sensorIo';

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
  const { db, sensorIoOutput } = ctx;
  const { id } = ctx.params;

  const { status, manualRpm } = ctx.request.body;

  const update = {
    ...(status && { status }),
    ...(manualRpm && { manual_rpm: manualRpm }),
  };

  await sendPumpConfiguration({
    configuration: { ...update, id },
    sensorIoOutput,
  });

  const existingPump = await await db('pumps')
    .where({
      id,
    })
    .first('*');

  if (existingPump) {
    await db('pumps')
      .where({
        id,
      })
      .update(update);
  } else {
    await db('pumps').insert({ ...update, id });
  }

  const updatedPump = await db('pumps')
    .where({
      id,
    })
    .first('*');

  ctx.body = updatedPump ? pumpRowToObject(updatedPump) : null;
});

export default router;
