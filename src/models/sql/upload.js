import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

const Upload = sequelize.define('Upload', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    field: 'uuid',
  },
  ownerUuid: {
    type: Sequelize.UUID,
    allowNull: false,
    field: 'owner_uuid',
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'name',
  },
  originalFileName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'original_file_name',
  },
  type: {
    type: Sequelize.ENUM('user_avatar', 'community_avatar', 'post_attachment'),
    allowNull: false,
    field: 'type',
  },
  shortDesc: {
    type: Sequelize.STRING,
    field: 'short_desc',
  },
}, {
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 'uploads',
});

export default Upload;
