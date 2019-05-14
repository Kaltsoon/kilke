const path = require('path');

module.exports = {
  webpack: config => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.join(__dirname, 'src'),
    };

    return config;
  },
};
