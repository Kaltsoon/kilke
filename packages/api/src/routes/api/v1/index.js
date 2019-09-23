import Router from 'koa-router';

import ping from './ping';
import systems from './systems';
import pumpControllers from './pumpControllers';

const router = new Router();

router.use('/ping', ping.routes());
router.use('/systems', systems.routes());
router.use('/pump-controllers', pumpControllers.routes());

export default router;
