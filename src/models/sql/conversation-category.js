import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

const ConversationCategory = sequelize.define('ConversationCategory', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    field: 'uuid',
  },
  communityUuid: {
    type: Sequelize.UUID,
    allowNull: false,
    field: 'community_uuid',
  },
  userUuid: {
    type: Sequelize.UUID,
    allowNull: false,
    field: 'user_uuid',
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'name',
  },
  visibility: {
    type: Sequelize.ENUM('public', 'private', 'secret'),
    allowNull: false,
    field: 'visibility',
  },
  minRoleRequired: {
    type: Sequelize.ENUM('guest', 'member', 'moderator', 'admin'),
    allowNull: false,
    field: 'min_role_required',
  },
}, {
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 'conversation_categories',
});

ConversationCategory.prototype.associate = function associate(models) {
  ConversationCategory.hasMany(models.ConversationPost, {
    foreignKey: 'categoryUuid',
  });
};

export default ConversationCategory;
