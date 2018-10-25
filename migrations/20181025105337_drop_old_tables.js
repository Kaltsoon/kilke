exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('analogue_electrodes'),
    knex.schema.dropTableIfExists('pumps'),
    knex.schema.dropTableIfExists('boolean_electrodes'),
  ]);
};

exports.down = function(knex, Promise) {

};
