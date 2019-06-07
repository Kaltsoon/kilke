module.exports = {
  apps: [
    {
      name: 'api',
      script: './packages/api/build/index.js',
      instances: 1,
    },
    {
      name: 'system-io',
      script: './packages/system-io/src/index.js',
      instances: 1,
    },
    {
      name: 'system-reader',
      script: './packages/system-reader/src/index.js',
      instances: 1,
    },
    {
      name: 'client',
      script: './packages/client/server/index.js',
      instances: 1,
    },
  ],
};
