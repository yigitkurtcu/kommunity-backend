// we need this for es6 features:
require('babel-core/register');

const { dbClient: { hostname, dialect, database, username, password }, env: { current }  } = require('../app/config');;
const dbSettings = { host: hostname, dialect: dialect, database: database, username: username, password: password };
const sequelizeCliConfig = {};
sequelizeCliConfig[current] = dbSettings;

module.exports = sequelizeCliConfig;
