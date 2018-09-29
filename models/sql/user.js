import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

export const User = sequelize.define('user', {
  uuid: { type: Sequelize.STRING, primaryKey: true },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
});
