import Router from 'koa-router';

const router = new Router();

router.get('/:systemId/state', async ctx => {
  const {
    models: { Pump },
    db,
    params: { systemId },
  } = ctx;

  const [
    automaticPumps,
    latestSensorMeasurements,
    latestPumpMeasurements,
  ] = await Promise.all([
    Pump.query().where({
      systemId,
      status: 'automatic',
    }),
    db
      .select('sa.type', 'sa.max_created_at', 'sb.value')
      .from(
        db.raw(
          `(select max(created_at) as max_created_at, type from sensor_measurements sa where system_id = ? group by type) sa left join sensor_measurements sb on sa.max_created_at = sb.created_at and sa.type = sb.type;`,
          [systemId],
        ),
      ),
    db
      .select('pa.type', 'pa.max_created_at', 'pb.rpm')
      .from(
        db.raw(
          `(select max(created_at) as max_created_at, type from pump_measurements pa where system_id = ? group by type) pa left join pump_measurements pb on pa.max_created_at = pb.created_at and pa.type = pb.type;`,
          [systemId],
        ),
      ),
  ]);

  ctx.body = {
    automaticPumps,
    latestSensorMeasurements: latestSensorMeasurements.map(
      ({ value, maxCreatedAt }) => ({ value, createdAt: maxCreatedAt }),
    ),
    latestPumpMeasurements: latestPumpMeasurements.map(
      ({ rpm, maxCreatedAt }) => ({ rpm, createdAt: maxCreatedAt }),
    ),
  };
});

export default router;
