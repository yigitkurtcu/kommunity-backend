module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email',
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password_hash',
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
    },
    userAttributes: {
      type: DataTypes.TEXT('long'),
      field: 'user_attributes',
    },
    location: {
      type: DataTypes.STRING,
      field: 'location',
    },
    avatarUploadUuid: {
      type: DataTypes.UUID,
      field: 'avatar_upload_uuid',
    },
    lastSeenAt: {
      type: DataTypes.DATE,
      field: 'last_seen_at',
    },
    confirmedEmailAt: {
      type: DataTypes.DATE,
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
