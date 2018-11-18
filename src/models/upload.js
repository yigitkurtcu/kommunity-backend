import Sequelize, { type DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Upload = sequelize.define('Upload', {
    uuid: {
      type: dataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
    },
    ownerUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'owner_uuid',
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    originalFileName: {
      type: dataTypes.STRING,
      allowNull: false,
      field: 'original_file_name',
    },
    type: {
      type: dataTypes.ENUM('user_avatar', 'community_avatar', 'post_attachment'),
      allowNull: false,
      field: 'type',
    },
    shortDesc: {
      type: dataTypes.STRING,
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
