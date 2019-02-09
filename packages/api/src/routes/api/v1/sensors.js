import Router from 'koa-router';
import uuid from 'uuid/v4';
import { subMinutes } from 'date-fns';

const router = new Router();

router.get('/log', async ctx => {
  const { db } = ctx;
  const { from: fromParam, to: toParam, limit: limitParam, types: typesString } = ctx.query;

  const to = toParam ? new Date(toParam) : new Date();
  const from = fromParam ? new Date(fromParam) : subMinutes(new Date(), 2);
  const types = typesString ? typesString.split(',') : null;
  const limit = limitParam ? parseInt(limitParam) : 100;

  let query = db('sensor_measurements')
    .select('*')
    .where('created_at', '<', to)
    .andWhere('created_at', '>', from);

  if (types) {
    query = query.andWhere(qb => qb.whereIn('type', types));
  }

  const data = await query.orderBy('created_at', 'desc').limit(limit);

  ctx.body = data.map(({ id, type, created_at, value_1, raw_value }) => ({
    id,
    type,
    createdAt: created_at ? new Date(created_at) : null,
    value: value_1,
    rawValue: raw_value,
  }));
});

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

router.get('/:type/measurements', async ctx => {
  const { db, query, params } = ctx;

  const { type } = params;
  const limit = query.limit ? parseInt(query.limit) : 20;

  const results = await db('sensor_measurements')
    .select('*')
    .where({
      type,
    })
    .orderBy('created_at', 'desc')
    .limit(limit);

  ctx.body = results.map(({ value_1, id, type, created_at }) => ({
    type,
    id,
    createdAt: created_at,
    value: value_1,
  }));
});

export default router;
