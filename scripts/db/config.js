// we need this for es6 features:
require('babel-core/register');

const {
  db: {
    hostname, dialect, database, username, password,
  },
} = require('../../src/config');

const sequelizeCliConfig = {
  [process.env.NODE_ENV]: {
    database,
    dialect,
    host: hostname,
    password,
    username,
  },
};

module.exports = sequelizeCliConfig;
