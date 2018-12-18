export const selectAsTimeslot = ({ db, column, columnAlias, interval }) => {
  return db.raw(
    `cast((:column: / :interval) as int) * :interval as :column_alias:`,
    {
      column,
      column_alias: columnAlias,
      interval,
    },
  );
};
