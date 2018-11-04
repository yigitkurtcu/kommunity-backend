import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

const User = sequelize.define('User', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    field: 'uuid',
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'email',
  },
  passwordHash: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'password_hash',
  },
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name',
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name',
  },
  userAttributes: {
    type: Sequelize.TEXT('long'),
    field: 'user_attributes',
  },
  location: {
    type: Sequelize.STRING,
    field: 'location',
  },
  avatarUploadUuid: {
    type: Sequelize.UUID,
    field: 'avatar_upload_uuid',
  },
  lastSeenAt: {
    type: Sequelize.DATE,
    field: 'last_seen_at',
  },
  confirmedEmailAt: {
    type: Sequelize.DATE,
    field: 'confirmed_email_at',
  },
}, {
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 'users',
});

User.prototype.associate = function associate(models) {
  User.hasMany(models.CommunityUser, {
    foreignKey: 'userUuid',
  });
};

export default User;
