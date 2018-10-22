import Router from 'koa-router';
import { groupBy, mapValues } from 'lodash';

const router = new Router();

import { ApplicationError } from '@/errors';

const oneHour = 3600000;

router.get('/analogue-electrodes/:type', async ctx => {
  const { db, query } = ctx;

  const now = new Date();

  const to = query.to ? new Date(query.to) : now;
  const from = query.from ? new Date(query.from) : new Date(+now - oneHour);

  const results = await db('analogue_electrodes')
    .select('*')
    .where({
      type: ctx.params.type,
    })
    .andWhere('created_at', '>=', from)
    .andWhere('created_at', '<=', to)
    .orderBy('created_at', 'desc');

  const data = results.map(({ created_at, value }) => ([new Date(created_at), value]));

  ctx.body = { data, options: { to, from } };
});

export default router;
