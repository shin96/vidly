const config = require('config');

module.exports = function() {
    if (!config.get('jwtPrivateKey')) {
        console.error('FATAL ERROR: jwtPrivateKey is not defined please look into the config files');
        process.exit(1);
      }
};