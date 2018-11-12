import Router from 'koa-router';

import ping from './ping';
import charts from './charts';
import sensors from './sensors';
import pumps from './pumps';

const router = new Router();

router.use('/ping', ping.routes());
router.use('/charts', charts.routes());
router.use('/sensors', sensors.routes());
router.use('/pumps', pumps.routes());

export default router;
