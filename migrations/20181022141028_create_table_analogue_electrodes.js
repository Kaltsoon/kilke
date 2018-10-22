exports.up = function(knex, Promise) {
  return knex.schema.createTable('analogue_electrodes', table => {
    table.text('id').primary();
    table.float('value');
    table.timestamp('created_at');
    table.text('type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('analogue_electrodes');
};
