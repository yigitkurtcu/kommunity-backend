// we need this for es6 features:
require('babel-core/register');

const dbConfig = require('../../config').dbServer;

const dbSettings = {
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.hostname,
  dialect: dbConfig.dialect,
};

module.exports = {
  development: dbSettings,
  test: dbSettings,
  production: dbSettings,
};
