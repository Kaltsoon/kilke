exports.up = function(knex, Promise) {
  return knex.schema.createTable('calibrations', table => {
    table.text('id').primary();
    table.timestamp('created_at');
    table.text('type');
    table.float('x_1');
    table.float('y_1');
    table.float('x_2');
    table.float('y_2');

    table.index(['type', 'created_at']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('calibrations');
};
