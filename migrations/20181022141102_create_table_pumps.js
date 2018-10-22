exports.up = function(knex, Promise) {
  return knex.schema.createTable('pumps', table => {
    table.text('id').primary();
    table.float('value');
    table.timestamp('created_at');
    table.text('type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('pumps');
};
