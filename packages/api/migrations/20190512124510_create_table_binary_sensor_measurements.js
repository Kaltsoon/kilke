exports.up = function(knex, Promise) {
  return knex.schema.createTable('binary_sensor_measurements', table => {
    table
      .text('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.text('system_id');
    table.foreign('system_id').references('systems.id');
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.text('type');
    table.boolean('value');

    table.index(['system_id', 'type', 'created_at']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('binary_sensor_measurements');
};
