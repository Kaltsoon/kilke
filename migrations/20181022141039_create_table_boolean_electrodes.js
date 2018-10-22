exports.up = function(knex, Promise) {
  return knex.schema.createTable('boolean_electrodes', table => {
    table.text('id').primary();
    table.boolean('value');
    table.timestamp('created_at');
    table.text('type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('boolean_electrodes');
};
