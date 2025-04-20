const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'event_shell',

  remotes: {
    "eventRemote1": "http://localhost:5221/remoteEntry.js",
    "eventRemote2": "http://localhost:5222/remoteEntry.js",
  },

  exposes: {
    './Utils': './projects/event-shell/src/app/shared/utils.ts',
    './DevInfo': './projects/event-shell/src/app/shared/ProjectInfo.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
