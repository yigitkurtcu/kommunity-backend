import Sequelize, { type DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const CommunityUser = sequelize.define('CommunityUser', {
    communityUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'community_uuid',
      validate: {
        isUUID: 4,
      },
    },
    userUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'user_uuid',
      validate: {
        isUUID: 4,
      },
    },
    status: {
      type: dataTypes.ENUM('invited', 'applied', 'approved', 'banned'),
      allowNull: false,
      field: 'status',
      validate: {
        isIn: [['invited', 'applied', 'approved', 'banned']],
      },
    },
    role: {
      type: dataTypes.ENUM('guest', 'member', 'moderator', 'admin', 'owner'),
      allowNull: false,
      field: 'role',
      validate: {
        isIn: [['guest', 'member', 'moderator', 'admin', 'owner']],
      },
    },
  }, {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'community_users',
  });

  return CommunityUser;
};
