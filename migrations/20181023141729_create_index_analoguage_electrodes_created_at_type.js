exports.up = function(knex, Promise) {
  return knex.schema.alterTable('analogue_electrodes', table => {
    table.index(['type', 'created_at']);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('analogue_electrodes', table => {
    table.dropIndex(['type', 'created_at']);
  })
};
