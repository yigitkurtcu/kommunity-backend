module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const CommunityUser = sequelize.define('CommunityUser', {
    communityUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'community_uuid',
    },
    userUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'user_uuid',
    },
    status: {
      type: DataTypes.ENUM('invited', 'applied', 'approved', 'banned'),
      allowNull: false,
      field: 'status',
    },
    role: {
      type: DataTypes.ENUM('guest', 'member', 'moderator', 'admin', 'owner'),
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
