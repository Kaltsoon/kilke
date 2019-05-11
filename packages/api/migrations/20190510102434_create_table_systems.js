exports.up = function(knex, Promise) {
  return knex.schema.createTable('systems', table => {
    table
      .text('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.jsonb('config');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('systems');
};
