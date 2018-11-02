import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

const Community = sequelize.define('Community', {
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
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tagline: {
    type: Sequelize.STRING,
  },
  desc: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
  },
  socialLinks: {
    type: Sequelize.JSON,
  },
  avatarUploadUuid: {
    type: Sequelize.UUID,
  },
  tier: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  visibility: {
    type: Sequelize.ENUM('public', 'private', 'secret'),
    allowNull: false,
    defaultValue: 'public',
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  paranoid: true,
});
Community.prototype.associate = function associate(models) {
  Community.hasMany(models.User, {
    foreignKey: 'communityUuid',
  });
  Community.hasMany(models.ConversationCategory, {
    foreignKey: 'communityUuid',
  });
};

export { Community };
