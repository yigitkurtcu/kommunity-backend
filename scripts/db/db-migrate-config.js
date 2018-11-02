const dbCnf = require('../../config/config').getAppConfig().dbServer;
const dbSettings = {
    username: dbCnf.username,
    password: dbCnf.password,
    database: dbCnf.database,
    host: dbCnf.hostname,
    dialect: dbCnf.dialect
};
module.exports = {
  local: dbSettings,
  production: dbSettings,
  staging: dbSettings,
  test: dbSettings,
};
