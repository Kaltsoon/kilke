import Router from 'koa-router';

import ping from './ping';
import systems from './systems';

const router = new Router();

router.use('/ping', ping.routes());
router.use('/systems', systems.routes());

export default router;
