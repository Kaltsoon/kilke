import Router from 'koa-router';
import uuid from 'uuid/v4';

const router = new Router();

router.post('/:type/calibrations', async ctx => {
  const id = uuid();

  const { db } = ctx;
  const { type } = ctx.params;
  const { x1, x2, y1, y2 } = ctx.request.body;

  await db('calibrations').insert({
    id,
    type,
    created_at: new Date(),
    x_1: x1,
    x_2: x2,
    y_1: y1,
    y_2: y2,
  });

  const inserted = await db('calibrations')
    .where({ id })
    .first('*');

  if (inserted) {
    ctx.body = {
      x1: inserted.x_1,
      x2: inserted.x_2,
      y1: inserted.y_1,
      y2: inserted.y_2,
      createdAt: inserted.created_at,
      id: inserted.id,
      type: inserted.type,
    };
  } else {
    ctx.body = null;
  }
});

router.get('/:type/calibrations', async ctx => {
  const { db, query, params } = ctx;

  const { type } = params;
  const limit = query.limit ? parseInt(query.limit) : 20;

  const results = await db('calibrations')
    .select('*')
    .where({
      type,
    })
    .orderBy('created_at', 'desc')
    .limit(limit);

  ctx.body = results.map(({ x_1, y_1, x_2, y_2, created_at, id, type }) => ({
    type,
    x1: x_1,
    y1: y_1,
    x2: x_2,
    y2: y_2,
    createdAt: created_at,
    id,
  }));
});

export default router;
