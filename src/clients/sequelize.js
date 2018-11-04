import Sequelize from 'sequelize';
import config from '../../config';

const {
  dbServer: {
    hostname, dialect, database, username, password,
  },
} = config;

export const sequelize = new Sequelize(database, username, password, {
  host: hostname,
  dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,
});
