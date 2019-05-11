import Router from 'koa-router';

import charts from './charts';
import system from './system';
import pumps from './pumps';
import sensors from './sensorMeasurements';
import systems from './systemsRoot';

const router = new Router();

router.use(systems.routes());
router.use('/:systemId', system.routes());
router.use('/:systemId/charts', charts.routes());
router.use('/:systemId/pumps', pumps.routes());
router.use('/:systemId/sensor-measurements', sensors.routes());

export default router;
