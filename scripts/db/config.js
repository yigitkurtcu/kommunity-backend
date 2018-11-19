// we need this for es6 features:
require('babel-core/register');

const {
  dbClient: {
    hostname, dialect, database, username, password,
  }, env: { current },
} = require('../../src/config');

const dbSettings = {
  host: hostname, dialect, database, username, password,
};
const sequelizeCliConfig = {};
sequelizeCliConfig[current] = dbSettings;

module.exports = sequelizeCliConfig;
