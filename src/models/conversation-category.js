import Sequelize, { type DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const ConversationCategory = sequelize.define('ConversationCategory', {
    uuid: {
      type: dataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
      validate: {
        isUUID: 4,
      },
    },
    communityUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'community_uuid',
      validate: {
        isUUID: 4,
      },
    },
    name: {
      type: dataTypes.STRING(30),
      allowNull: false,
      field: 'name',
      validate: {
        len: [1, 30],
      },
    },
    visibility: {
      type: dataTypes.ENUM('public', 'private', 'secret'),
      allowNull: false,
      field: 'visibility',
      validate: {
        isIn: [['public', 'private', 'secret']],
      },
    },
    minRoleRequired: {
      type: dataTypes.ENUM('guest', 'member', 'moderator', 'admin'),
      allowNull: false,
      field: 'min_role_required',
      validate: {
        isIn: [['guest', 'member', 'moderator', 'admin']],
      },
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
