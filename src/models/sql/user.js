import Sequelize, { DATE } from 'sequelize';
import { sequelize } from '../../clients/sequelize';

export const User = sequelize.define('user', {
  uuid: { type: Sequelize.STRING, primaryKey: true },
  password_hash: Sequelize.STRING,
  email: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  createdAt: {
    field: 'created_at',
    type: DATE,
  },
  updatedAt: {
    field: 'updated_at',
    type: DATE,
  },
  deletedAt: {
    field: 'deleted_at',
    type: DATE,
  },
}, {
  paranoid: true,
});
