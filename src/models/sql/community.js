module.exports = (sequelize, DataTypes) => {
  const Community = sequelize.define('Community', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    tagline: {
      type: DataTypes.STRING,
      field: 'tagline',
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'desc',
    },
    location: {
      type: DataTypes.STRING,
      field: 'location',
    },
    socialLinks: {
      type: DataTypes.TEXT('long'),
      field: 'social_links',
    },
    avatarUploadUuid: {
      type: DataTypes.UUID,
      field: 'avatar_upload_uuid',
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'tier',
    },
    visibility: {
      type: DataTypes.ENUM('public', 'private', 'secret'),
      allowNull: false,
      defaultValue: 'public',
      field: 'visibility',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
    },
  }, {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'communities',
  });

  Community.associate = (models) => {
    Community.belongsToMany(models.User, { through: models.CommunityUser });
    Community.hasMany(models.ConversationCategory, {
      foreignKey: 'communityUuid',
    });
  };

  return Community;
};
