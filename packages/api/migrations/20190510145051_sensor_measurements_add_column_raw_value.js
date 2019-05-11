exports.up = function(knex, Promise) {
  return knex.schema.alterTable('sensor_measurements', function(t) {
    t.float('raw_value');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('sensor_measurements', function(t) {
    t.dropColumn('raw_value');
  });
};
