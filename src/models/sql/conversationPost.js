import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

const ConversationPost = sequelize.define('ConversationPost', {
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
  userUuid: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  parentUuid: {
    type: Sequelize.UUID,
  },
  communityUuid: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  categoryUuid: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  viewCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  attachmentUploadUuids: {
    type: Sequelize.STRING,
  },
}, {
  paranoid: true,
});
// ConversationPost.prototype.associate = function associate(models) {
// };

export default ConversationPost;
