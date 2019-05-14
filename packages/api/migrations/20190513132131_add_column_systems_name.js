exports.up = function(knex, Promise) {
  knex.schema.table('systems', function(table) {
    table.text('name');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.table('systems', function(table) {
    table.dropColumn('name');
  });
};
