import Router from 'koa-router';

import charts from './charts';
import system from './system';
import pumps from './pumps';
import sensorMeasurements from './sensorMeasurements';
import systems from './systemsRoot';
import pumpMeasurements from './pumpMeasurements';
import binarySensorMeasurements from './binarySensorMeasurements';

const router = new Router();

router.use(systems.routes());
router.use('/:systemId', system.routes());
router.use('/:systemId/charts', charts.routes());
router.use('/:systemId/pumps', pumps.routes());
router.use('/:systemId/sensor-measurements', sensorMeasurements.routes());
router.use('/:systemId/pump-measurements', pumpMeasurements.routes());

router.use(
  '/:systemId/binary-sensor-measurements',
  binarySensorMeasurements.routes(),
);

export default router;
