import Sequelize, { type DataTypes } from 'sequelize';


module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      type: dataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
      validate: {
        isUUID: 4,
      },
    },
    email: {
      type: dataTypes.STRING(254),
      allowNull: false,
      field: 'email',
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: dataTypes.STRING(32),
      allowNull: false,
      field: 'password_hash',
      validate: {
        len: [32, 32],
      },
    },
    username: {
      type: dataTypes.STRING(20),
      field: 'username',
      validate: {
        len: [1, 20],
      },
    },
    firstName: {
      type: dataTypes.STRING(50),
      field: 'first_name',
      validate: {
        len: [1, 50],
      },
    },
    lastName: {
      type: dataTypes.STRING(50),
      field: 'last_name',
      validate: {
        len: [1, 50],
      },
    },
    userAttributes: {
      type: dataTypes.TEXT('long'),
      field: 'user_attributes',
      validate: { },
    },
    location: {
      type: dataTypes.STRING(30),
      field: 'location',
      validate: {
        len: [1, 30],
      },
    },
    avatarUploadUuid: {
      type: dataTypes.UUID,
      field: 'avatar_upload_uuid',
      validate: {
        isUUID: 4,
      },
    },
    lastSeenAt: {
      type: dataTypes.DATE,
      field: 'last_seen_at',
      validate: {
        isDate: true,
      },
    },
    confirmedEmailAt: {
      type: dataTypes.DATE,
      field: 'confirmed_email_at',
      validate: {
        isDate: true,
      },
    },
  },
  {
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
