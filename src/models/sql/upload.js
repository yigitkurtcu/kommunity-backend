import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

const Upload = sequelize.define('Upload', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
  deletedAt: {
    type: Sequelize.DATE,
  },
  ownerUuid: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  originalFileName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM('user_avatar', 'community_avatar', 'post_attachment'),
    allowNull: false,
  },
  shortDesc: {
    type: Sequelize.STRING,
  },
}, {
  paranoid: true,
});
// Upload.prototype.associate = function associate(models) {
// };

export default Upload;
