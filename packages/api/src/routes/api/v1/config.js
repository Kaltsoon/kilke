import Router from 'koa-router';

const router = new Router();

router.get('/', async ctx => {
  ctx.body = ctx.config;
});

export default router;
