import Router from 'koa-router';

const router = new Router();

router.get('/:type', async ctx => {
  const {
    models: { Pump },
  } = ctx;

  const { type, systemId } = ctx.params;

  const pump = await Pump.query()
    .where({
      type,
      systemId,
    })
    .first();

  ctx.body = pump;
});

router.put('/:type', async ctx => {
  const {
    models: { Pump },
    systemInput,
    logger,
  } = ctx;
  const { type, systemId } = ctx.params;

  const { status } = ctx.request.body;

  const update = {
    ...(status && { status }),
  };

  const existingPump = await Pump.query().findById([systemId, type]);

  if (existingPump) {
    const updatedPump = await Pump.query()
      .findById([systemId, type])
      .patch(update)
      .returning('*');

    ctx.body = updatedPump;
  } else {
    const createdPump = await Pump.query()
      .insert({ ...update, type, systemId })
      .returning('*');

    ctx.body = createdPump;
  }

  try {
    systemInput.sendMessage({
      systemId,
      type: 'pump_configuration',
      payload: {
        type,
        status,
      },
    });
  } catch (e) {
    logger.error(e);
  }
});

export default router;
