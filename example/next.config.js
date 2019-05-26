/* eslint-disable */
const withTypescript = require('@zeit/next-typescript');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = withTypescript({
  webpack(config) {
    config.resolve.plugins = [];
    config.resolve.plugins.push(new TsconfigPathsPlugin());

    config.module.rules.forEach(rule => {
      if (!rule.test.test('PATTERN.tsx')) {
        return;
      }

      const included = rule.include.some(pattern => {
        if (typeof pattern === 'string') {
          return false;
        }

        return pattern.test('react-dayo/packages/component/pattern.tsx');
      });
      if (included) {
        return;
      }

      rule.include.push(/react-dayo\/packages\/.*\.(ts|tsx)$/);
    });

    config.module.rules.push({
      test: /react-dayo\/packages\/.*\.(js|jsx|ts|tsx)$/,
      // for debug
      include(path) {
        console.log(path);
        return /\.(ts|tsx)$/.test(path);
      },
      exclude: [/\.test\.(ts|tsx)$/, /node_modules/],
      use: {
        loader: 'ts-loader',
      },
    });

    return config;
  },
});
