module.exports = {
  apps : [
    {
      name: 'api',
      script: './packages/api/build/index.js',
    },
    {
      name: 'sensor-io',
      script: './packages/sensor-io/src/index.py',
      env: {
        RECORD_SERVER_PORT: 4000,
      },
    },
    {
      name: 'sensor-reader',
      script: './packages/sensor-reader/src/index.js',
      env: {
        RECORD_SERVER_PORT: 4000,
        RECORD_SERVER_HOST: '127.0.0.1',
      },
    },
  ],
};
