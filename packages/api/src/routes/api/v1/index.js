import Router from 'koa-router';

import ping from './ping';
import charts from './charts';

const router = new Router();

router.use('/ping', ping.routes());
router.use('/charts', charts.routes());

export default router;
