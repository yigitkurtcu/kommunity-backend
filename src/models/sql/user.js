import Sequelize, { type DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      type: dataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      field: 'email',
    },
    passwordHash: {
      type: dataTypes.STRING,
      allowNull: false,
      field: 'password_hash',
    },
    firstName: {
      type: dataTypes.STRING,
      field: 'first_name',
    },
    lastName: {
      type: dataTypes.STRING,
      field: 'last_name',
    },
    userAttributes: {
      type: dataTypes.TEXT('long'),
      field: 'user_attributes',
    },
    location: {
      type: dataTypes.STRING,
      field: 'location',
    },
    avatarUploadUuid: {
      type: dataTypes.UUID,
      field: 'avatar_upload_uuid',
    },
    lastSeenAt: {
      type: dataTypes.DATE,
      field: 'last_seen_at',
    },
    confirmedEmailAt: {
      type: dataTypes.DATE,
      field: 'confirmed_email_at',
    },
  }, {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'users',
  });

  User.associate = (models) => {
    User.belongsToMany(models.Community, { through: models.CommunityUser });
  };

  return User;
};
