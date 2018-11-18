import Sequelize, { type DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Community = sequelize.define('Community', {
    uuid: {
      type: dataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    tagline: {
      type: dataTypes.STRING,
      field: 'tagline',
    },
    desc: {
      type: dataTypes.TEXT,
      allowNull: false,
      field: 'desc',
    },
    location: {
      type: dataTypes.STRING,
      field: 'location',
    },
    socialLinks: {
      type: dataTypes.TEXT('long'),
      field: 'social_links',
    },
    avatarUploadUuid: {
      type: dataTypes.UUID,
      field: 'avatar_upload_uuid',
    },
    tier: {
      type: dataTypes.STRING,
      allowNull: false,
      field: 'tier',
    },
    visibility: {
      type: dataTypes.ENUM('public', 'private', 'secret'),
      allowNull: false,
      defaultValue: 'public',
      field: 'visibility',
    },
    isActive: {
      type: dataTypes.BOOLEAN,
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
