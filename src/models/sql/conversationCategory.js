import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

const ConversationCategory = sequelize.define('ConversationCategory', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
  deletedAt: {
    type: Sequelize.DATE,
  },
  communityUuid: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  userUuid: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  visibility: {
    type: Sequelize.ENUM('public', 'private', 'secret'),
    allowNull: false,
  },
  minRoleRequired: {
    type: Sequelize.ENUM('guest', 'member', 'moderator', 'admin'),
    allowNull: false,
  },
}, {
  paranoid: true,
});
ConversationCategory.prototype.associate = function associate(models) {
  ConversationCategory.hasMany(models.ConversationPost, {
    foreignKey: 'categoryUuid',
  });
};

export { ConversationCategory };
