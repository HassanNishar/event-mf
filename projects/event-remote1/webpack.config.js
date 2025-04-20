const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const { shellport } = require('./env.config');
const path = require('path');

module.exports = withModuleFederationPlugin({

  name: 'event-remote1',

  remotes: {
    // event_shell: 'http://localhost:5220/remoteEntry.js', //Dev
    // event_shell: 'http://192.168.29.189:5420/remoteEntry.js', // Prod
    event_shell: shellport,
  },

  exposes: {
    './Module': './projects/event-remote1/src/app/event-child/event-child.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
