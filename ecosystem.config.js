module.exports = {
  apps: [
    {
      name: 'api',
      script: './packages/api/build/index.js',
      env: {
        PORT: 5000,
      },
    },
    {
      name: 'sensor-io',
      script: './packages/sensor-io/src/index.py',
      env: {
        RECORD_SERVER_PORT: 4000,
        CONFIGURATION_SERVER_PORT: 4001,
      },
    },
    {
      name: 'sensor-reader',
      script: './packages/sensor-reader/src/index.js',
      env: {
        RECORD_SERVER_PORT: 4000,
        RECORD_SERVER_HOST: '127.0.0.1',
        SENSOR_CONFIGURATION_SERVER_URL: 'http://localhost:4001',
      },
    },
    {
      name: 'client',
      script: './packages/client/server/index.js',
      env: {
        PORT: 8080,
      },
    },
  ],
};
