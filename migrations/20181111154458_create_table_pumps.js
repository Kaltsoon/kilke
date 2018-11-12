exports.up = function(knex, Promise) {
  return knex.schema.createTable('pumps', table => {
    table.text('id').primary();
    table.text('display_name');
    table.text('status');
    table.float('manual_rpm');
    table.float('max_rpm');
    table.float('min_rpm');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('pumps');
};