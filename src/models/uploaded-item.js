import Sequelize, { type DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const UploadedItem = sequelize.define('UploadedItem', {
    uuid: {
      type: dataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
      validate: {
        isUUID: 4,
      },
    },
    ownerUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'owner_uuid',
      validate: {
        isUUID: 4,
      },
    },
    name: {
      type: dataTypes.STRING(100),
      allowNull: false,
      field: 'name',
      validate: {
        len: [1, 100],
      },
    },
    originalFileName: {
      type: dataTypes.STRING(30),
      allowNull: false,
      field: 'original_file_name',
      validate: {
        len: [3, 30],
      },
    },
    type: {
      type: dataTypes.ENUM('user_avatar', 'community_avatar', 'post_attachment'),
      allowNull: false,
      field: 'type',
      validate: {
        isIn: [['user_avatar', 'community_avatar', 'post_attachment']],
      },
    },
    shortDesc: {
      type: dataTypes.STRING(255),
      field: 'short_desc',
      validate: {
        len: [1, 255],
      },
    },
  }, {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'uploaded_item',
  });

  return UploadedItem;
};
