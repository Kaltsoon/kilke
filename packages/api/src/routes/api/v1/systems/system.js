import Router from 'koa-router';
import { mapValues } from 'lodash';

const router = new Router();

import * as yup from 'yup';

const keySchema = schema =>
  yup.lazy(values => yup.object().shape(mapValues(values, schema)));

const configSchema = yup.object().shape({
  pumps: keySchema(
    yup.object().shape({
      unit: yup.object().shape({
        unit: yup.string(),
        title: yup.string(),
      }),
      title: yup.string().required(),
      subtitle: yup.string(),
      minRpm: yup.number(),
      maxRpm: yup.number(),
    }),
  ),
  sensors: keySchema(
    yup.object().shape({
      unit: yup.object().shape({
        unit: yup.string(),
        title: yup.string(),
      }),
      title: yup.string().required(),
      subtitle: yup.string(),
      reactorTitle: yup.string(),
      calibration: yup.object().shape({
        x1: yup.number(),
        x2: yup.number(),
        y1: yup.number(),
        y2: yup.number(),
      }),
    }),
  ),
  reactor: yup.object().shape({
    sensors: keySchema(yup.object()),
    pumps: keySchema(yup.object()),
  }),
  visualization: yup.object().shape({
    tabs: yup.array().of(
      yup.object().shape({
        title: yup.string().required(),
        sensors: yup.array().of(yup.string()),
      }),
    ),
  }),
});

const systemSchema = yup.object().shape({
  name: yup.string(),
  config: configSchema,
});

router.get('/', async ctx => {
  const {
    models: { System },
    params: { systemId },
  } = ctx;

  const system = await System.query().findById(systemId);

  ctx.body = system;
});

router.put('/', async ctx => {
  const {
    models: { System },
    request: { body },
    params: { systemId },
  } = ctx;

  const validBody = await systemSchema.validate(body);

  const updatedSystem = await System.query().patchAndFetchById(
    systemId,
    validBody,
  );

  ctx.body = updatedSystem;
});

export default router;
