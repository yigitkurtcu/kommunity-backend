import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

const User = sequelize.define('User', {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  userAttributes: {
    type: Sequelize.JSON,
  },
  location: {
    type: Sequelize.STRING,
  },
  avatarUploadUuid: {
    type: Sequelize.UUID,
  },
  lastSeenAt: {
    type: Sequelize.DATE,
  },
  confirmedEmailAt: {
    type: Sequelize.DATE,
  },
}, {
  paranoid: true,
});
User.prototype.associate = function associate(models) {
  User.hasMany(models.CommunityUser, {
    foreignKey: 'userUuid',
  });
};

export { User };
