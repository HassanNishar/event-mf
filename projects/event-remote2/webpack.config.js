const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const path = require('path');
const { shellport } = require('./env.config');

module.exports = withModuleFederationPlugin({

  name: 'event-remote2',

  remotes: {
    // event_shell: 'http://localhost:5220/remoteEntry.js', //Dev
    // event_shell: 'http://192.168.29.189:5420/remoteEntry.js', // Prod
    event_shell: shellport,
  },

  exposes: {
    './Module': './projects/event-remote2/src/app/event-child/event-child.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  // Add this to support Tailwind via PostCSS
  webpackConfigTransform: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
      include: path.resolve(__dirname, 'src'),
    });

    return config;
  },

});