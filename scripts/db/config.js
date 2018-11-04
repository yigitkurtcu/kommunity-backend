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
