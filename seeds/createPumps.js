exports.seed = function(knex) {
  return knex('pumps').insert({
    id: 'pump1',
    display_name: 'Pump 1',
  });
};
