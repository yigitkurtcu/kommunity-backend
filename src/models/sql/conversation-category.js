module.exports = (sequelize, DataTypes) => {
  const ConversationCategory = sequelize.define('ConversationCategory', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
    },
    communityUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'community_uuid',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    visibility: {
      type: DataTypes.ENUM('public', 'private', 'secret'),
      allowNull: false,
      field: 'visibility',
    },
    minRoleRequired: {
      type: DataTypes.ENUM('guest', 'member', 'moderator', 'admin'),
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
