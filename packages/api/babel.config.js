module.exports = api => {
  api.cache(true);

  return {
    plugins: [
      ['module-resolver', {
        root: './src',
        alias: {
          '@': './src',
        },
      }],
      '@babel/plugin-proposal-object-rest-spread',
    ],
  };
};
