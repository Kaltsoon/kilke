import Router from 'koa-router';

import ping from './ping';

const router = new Router();

router.use('/ping', ping.routes());

export default router;
