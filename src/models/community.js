import Sequelize, { type DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Community = sequelize.define('Community', {
    uuid: {
      type: dataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
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
    tagline: {
      type: dataTypes.STRING(255),
      field: 'tagline',
      validate: {
        len: [2, 255],
      },
    },
    desc: {
      type: dataTypes.STRING(255),
      allowNull: false,
      field: 'desc',
      validate: {
        len: [2, 255],
      },
    },
    location: {
      type: dataTypes.STRING(30),
      field: 'location',
      validate: {
        len: [1, 30],
      },
    },
    socialLinks: {
      type: dataTypes.TEXT('long'),
      field: 'social_links',
      validate: { },
    },
    avatarUploadUuid: {
      type: dataTypes.UUID,
      field: 'avatar_upload_uuid',
      validate: {
        isUUID: 4,
      },
    },
    tier: {
      type: dataTypes.ENUM('free', 'tier1', 'tier2', 'tier3'),
      allowNull: false,
      field: 'tier',
      validate: {
        isIn: [['free', 'tier1', 'tier2', 'tier3']],
      },
    },
    visibility: {
      type: dataTypes.ENUM('public', 'private', 'secret'),
      allowNull: false,
      defaultValue: 'public',
      field: 'visibility',
      validate: {
        isIn: [['public', 'private', 'secret']],
      },
    },
    isActive: {
      type: dataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
      validate: {
        isIn: [['true', 'false']],
      },
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
