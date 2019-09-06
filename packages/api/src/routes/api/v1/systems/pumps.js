import Router from 'koa-router';
import * as yup from 'yup';

const router = new Router();

const pumpSchema = yup.object().shape({
  mode: yup.string().oneOf(['manual', 'automatic']),
  status: yup.string().oneOf(['ok', 'fault']),
  rpm: yup
    .number()
    .when('mode', {
      is: 'manual',
      then: yup.number().required(),
    })
    .when('mode', {
      is: 'automatic',
      then: yup.number().required(),
    }),
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

  const { rpm, mode, status } = await pumpSchema.validate(ctx.request.body, {
    stripUnknown: true,
  });

  const update = { mode, status };

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

  if (rpm !== undefined || mode !== undefined) {
    try {
      systemInput.sendMessage({
        systemId,
        type: 'pump_configuration',
        payload: {
          type,
          mode,
          ...(mode === 'automatic' && { automaticRpm: rpm }),
          ...(mode === 'manual' && { manualRpm: rpm }),
        },
      });
    } catch (e) {
      logger.error(e);
    }
  }
});

export default router;
