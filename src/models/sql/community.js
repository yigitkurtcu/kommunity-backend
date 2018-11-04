import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

const Community = sequelize.define('Community', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    field: 'uuid',
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'name',
  },
  tagline: {
    type: Sequelize.STRING,
    field: 'tagline',
  },
  desc: {
    type: Sequelize.TEXT,
    allowNull: false,
    field: 'desc',
  },
  location: {
    type: Sequelize.STRING,
    field: 'location',
  },
  socialLinks: {
    type: Sequelize.TEXT('long'),
    field: 'social_links',
  },
  avatarUploadUuid: {
    type: Sequelize.UUID,
    field: 'avatar_upload_uuid',
  },
  tier: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'tier',
  },
  visibility: {
    type: Sequelize.ENUM('public', 'private', 'secret'),
    allowNull: false,
    defaultValue: 'public',
    field: 'visibility',
  },
  isActive: {
    type: Sequelize.BOOLEAN,
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

Community.prototype.associate = function associate(models) {
  Community.hasMany(models.User, {
    foreignKey: 'communityUuid',
  });
  Community.hasMany(models.ConversationCategory, {
    foreignKey: 'communityUuid',
  });
};

export default Community;
