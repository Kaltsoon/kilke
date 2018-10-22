import Router from 'koa-router';

import ping from './ping';
import visualizations from './visualizations';

const router = new Router();

router.use('/ping', ping.routes());
router.use('/visualizations', visualizations.routes());

export default router;
