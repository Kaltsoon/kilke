import Router from 'koa-router';
import * as yup from 'yup';

const router = new Router();

const pumpSchema = yup.object().shape({
  mode: yup.string().oneOf(['manual', 'automatic']),
  status: yup.string().oneOf(['ok', 'fault']),
  rpm: yup.number(),
});

router.get('/:type', async ctx => {
  const {
    models: { Pump },
  } = ctx;

  const { type, systemId } = ctx.params;

  const pump = await Pump.findById([systemId, type]);

  ctx.body = pump;
});

router.put('/:type', async ctx => {
  const {
    models: { Pump },
    systemInput,
    logger,
  } = ctx;
  const { type, systemId } = ctx.params;

  const { rpm, ...update } = await pumpSchema.validate(ctx.request.body, {
    stripUnknown: true,
  });

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

  if (rpm !== undefined) {
    try {
      systemInput.sendMessage({
        systemId,
        type: 'pump_configuration',
        payload: {
          type,
          rpm,
        },
      });
    } catch (e) {
      logger.error(e);
    }
  }
});

export default router;
