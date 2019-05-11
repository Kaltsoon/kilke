import Router from 'koa-router';

const router = new Router();

router.get('/', async ctx => {
  const {
    models: { System },
  } = ctx;

  const systems = await System.query();

  ctx.body = systems;
});

router.post('/', async ctx => {
  const {
    models: { System },
    request: { body },
  } = ctx;

  const createdSystem = await System.query()
    .insert(body)
    .returning('*');

  ctx.body = createdSystem;
});

export default router;
