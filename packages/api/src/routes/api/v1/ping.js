import Router from 'koa-router';

const router = new Router();

import { ApplicationError } from '@/errors';

router.get('/', async ctx => {
  ctx.body = { pong: true };
});

export default router;
