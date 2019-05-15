exports.up = function(knex, Promise) {
  return knex.schema.createTable('pumps', table => {
    table.text('type');
    table.text('system_id');
    table.foreign('system_id').references('systems.id');
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.primary(['system_id', 'type']);

    table.index('system_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('pumps');
};
