import Router from 'koa-router';

const router = new Router();

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

  const updatedSystem = await System.query().patchAndFetchById(systemId, body);

  ctx.body = updatedSystem;
});

export default router;
