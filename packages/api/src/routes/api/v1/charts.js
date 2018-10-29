import Router from 'koa-router';
import { groupBy, mapValues } from 'lodash';

const router = new Router();

import { ApplicationError } from '@/errors';
import { getChartData, getAverages } from '@/utils';
import { sensorUnits } from '@/constants';

const fiveMinutes = 300000;

const getUnit = type => sensorUnits[type] || null;

router.get('/:type', async ctx => {
  const { db, query } = ctx;

  const now = new Date();

  const to = query.to ? new Date(query.to) : now;
  const from = query.from ? new Date(query.from) : new Date(+now - fiveMinutes);
  const points = query.points ? parseInt(query.points) : 50;
  const { type } = ctx.params;

  const interval = Math.round(((to.getTime() - from.getTime()) / points));

  const [data, averages] = await Promise.all([
    getChartData({ db, table: 'sensor_measurements', from, to, points, type }),
    getAverages({ db, table: 'sensor_measurements', from, to, type }),
  ]);

  ctx.body = { data, averages, options: { to, from, points }, unit: getUnit(type) };
});

export default router;
