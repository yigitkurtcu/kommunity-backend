import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

export const Community = sequelize.define('community', {
  uuid: { type: Sequelize.STRING, primaryKey: true },
  desc: Sequelize.STRING,
  name: Sequelize.STRING,
  tagline: Sequelize.STRING,
}, {
  timestamps: false,
});
