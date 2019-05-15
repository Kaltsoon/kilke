module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{js,css}'],
  swDest: 'build/service-worker.js',
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 10,
        },
      },
    },
  ],
};
