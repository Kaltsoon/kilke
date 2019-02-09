
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('sensor_measurements', table => {
    table.float('raw_value');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('sensor_measurements', table => {
    table.dropColumn('raw_value');
  });
};
