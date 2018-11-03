const dbCnf = require('../../config/development.json').dbServer;

const dbSettings = {
  username: dbCnf.username,
  password: dbCnf.password,
  database: dbCnf.database,
  host: dbCnf.hostname,
  dialect: dbCnf.dialect,
};

module.exports = {
  development: dbSettings,
  test: dbSettings,
  production: dbSettings,
};
