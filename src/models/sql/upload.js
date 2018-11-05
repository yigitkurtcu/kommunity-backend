module.exports = (sequelize, DataTypes) => {
  const Upload = sequelize.define('Upload', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
    },
    ownerUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'owner_uuid',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    originalFileName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'original_file_name',
    },
    type: {
      type: DataTypes.ENUM('user_avatar', 'community_avatar', 'post_attachment'),
      allowNull: false,
      field: 'type',
    },
    shortDesc: {
      type: DataTypes.STRING,
      field: 'short_desc',
    },
  }, {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'uploads',
  });

  return Upload;
};
