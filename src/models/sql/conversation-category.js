import Sequelize, { type DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const ConversationCategory = sequelize.define('ConversationCategory', {
    uuid: {
      type: dataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
    },
    communityUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'community_uuid',
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    visibility: {
      type: dataTypes.ENUM('public', 'private', 'secret'),
      allowNull: false,
      field: 'visibility',
    },
    minRoleRequired: {
      type: dataTypes.ENUM('guest', 'member', 'moderator', 'admin'),
      allowNull: false,
      field: 'min_role_required',
    },
  }, {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'conversation_categories',
  });

  ConversationCategory.associate = (models) => {
    ConversationCategory.hasMany(models.ConversationPost, {
      foreignKey: 'categoryUuid',
    });
  };

  return ConversationCategory;
};
