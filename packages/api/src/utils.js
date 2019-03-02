export const selectAsTimeslot = ({ db, column, columnAlias, interval }) => {
  return db.raw(
    `cast((extract(epoch from :column:) / :interval) as int) * :interval as :column_alias:`,
    {
      column,
      column_alias: columnAlias,
      interval,
    },
  );
};

export const getChartData = async ({
  db,
  table,
  valueColumn = 'value_1',
  createdAtColumn = 'created_at',
  from,
  to,
  points,
  type,
}) => {
  const interval = Math.round((to.getTime() - from.getTime()) / points / 1000);

  const results = await db(table)
    .select(
      selectAsTimeslot({
        db,
        column: createdAtColumn,
        columnAlias: 'created_at_fixed',
        interval,
      }),
      db.raw('avg(:value:) as avg_value', { value: valueColumn }),
    )
    .where({ type })
    .andWhere(createdAtColumn, '>=', from)
    .andWhere(createdAtColumn, '<=', to)
    .groupBy('created_at_fixed')
    .orderBy('created_at_fixed');

  return results.map(({ created_at_fixed, avg_value }) => [
    new Date(created_at_fixed * 1000).getTime(),
    avg_value,
  ]);
};

export const getAverages = async ({
  db,
  table,
  valueColumn = 'value_1',
  createdAtColumn = 'created_at',
  from,
  to,
  type,
}) => {
  const delta = to.getTime() - from.getTime();

  const previousFrom = new Date(from.getTime() - delta);

  const results = await db(table)
    .select(
      db.raw(
        `
          CASE
            WHEN :created_at: <= :to and created_at >= :from THEN
              1
            ELSE
              0
          END time_group
        `,
        { created_at: createdAtColumn, to, from },
      ),
      db.raw('avg(:value:) as avg_value', { value: valueColumn }),
    )
    .where({ type })
    .andWhere(createdAtColumn, '>=', previousFrom)
    .andWhere(createdAtColumn, '<=', to)
    .groupBy('time_group');

  const current = results.find(({ time_group }) => time_group === 1);
  const previous = results.find(({ time_group }) => time_group === 0);

  return {
    current: current ? current.avg_value : 0,
    previous: previous ? previous.avg_value : 0,
  };
};
