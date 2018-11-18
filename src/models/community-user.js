import Sequelize, { type DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const CommunityUser = sequelize.define('CommunityUser', {
    communityUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'community_uuid',
    },
    userUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'user_uuid',
    },
    status: {
      type: dataTypes.ENUM('invited', 'applied', 'approved', 'banned'),
      allowNull: false,
      field: 'status',
    },
    role: {
      type: dataTypes.ENUM('guest', 'member', 'moderator', 'admin', 'owner'),
      allowNull: false,
      field: 'role',
    },
  }, {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'community_users',
  });

  return CommunityUser;
};
