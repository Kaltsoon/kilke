exports.up = function(knex, Promise) {
  return knex.schema.createTable('sensor_measurements', table => {
    table.text('id').primary();
    table.timestamp('created_at');
    table.text('type');
    table.float('value_1');
    table.boolean('value_2');

    table.index(['type', 'created_at']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sensor_measurements');
};
