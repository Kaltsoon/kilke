exports.up = function(knex) {
  return knex.schema.alterTable('sensor_measurements', table => {
    table.index(['created_at']);
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('sensor_measurements', table => {
    table.dropIndex(['created_at']);
  });
};
