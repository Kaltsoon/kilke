import * as yup from 'yup';
import Router from 'koa-router';
import { mapValues, pick, merge } from 'lodash';
import produce from 'immer';

const router = new Router();

const sensorSchema = yup.object().shape({
  calibrations: yup.object().shape({
    x1: yup.number(),
    y1: yup.number(),
    x2: yup.number(),
    y2: yup.number(),
  }),
});

const configSchema = yup.lazy(config => {
  return yup.object().shape({
    ...(config.sensors && {
      sensors: yup
        .object()
        .shape(mapValues(config.sensors, () => sensorSchema)),
    }),
  });
});

router.get('/', async ctx => {
  ctx.body = ctx.config;
});

router.put('/', async ctx => {
  const {
    config,
    request: { body },
    updateConfig,
  } = ctx;

  configSchema.validateSync(body);

  const newConfig = produce(config, draft => {
    if (body.sensors) {
      draft.sensors = pick(
        merge({}, config.sensors || {}, body.sensors),
        Object.keys(body.sensors),
      );
    }
  });

  await updateConfig(newConfig);

  ctx.body = {};
});

export default router;
