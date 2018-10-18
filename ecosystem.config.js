module.exports = {
  apps : [
    {
      name: 'api',
      script: './packages/api/build/index.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'sensor-io',
      script: './packages/sensor-io/build/sensor',
    },
    {
      name: 'sensor-reader',
      script: './packages/sensor-reader/src/index.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
