// projects/event-shell/env.config.js
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  shellport: isProd
    ? 'http://192.168.29.189:5420/remoteEntry.js'
    : 'http://localhost:5220/remoteEntry.js'
};