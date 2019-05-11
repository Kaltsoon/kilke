exports.up = function(knex, Promise) {
  return knex.schema.createTable('sensor_measurements', table => {
    table
      .text('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.text('system_id');
    table.foreign('system_id').references('systems.id');
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.text('type');
    table.float('value');

    table.index(['system_id', 'type', 'created_at']);
    table.index(['system_id', 'created_at']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sensor_measurements');
};
