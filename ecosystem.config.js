module.exports = {
  apps: [
    {
      name: 'api',
      script: './packages/api/build/index.js',
    },
    {
      name: 'system-io',
      script: './packages/system-io/src/index.js',
    },
    {
      name: 'system-reader',
      script: './packages/system-reader/src/index.js',
    },
    {
      name: 'client',
      script: './packages/client/server/index.js',
    },
  ],
};
