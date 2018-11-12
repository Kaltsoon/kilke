module.exports = {
  client: 'sqlite3',
  connection: './db.sqlite',
  useNullAsDefault: true,
  seeds: {
    directory: './seeds',
  },
};
