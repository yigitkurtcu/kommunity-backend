import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

const ConversationPost = sequelize.define('ConversationPost', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    field: 'uuid',
  },
  userUuid: {
    type: Sequelize.UUID,
    allowNull: false,
    field: 'user_uuid',
  },
  parentUuid: {
    type: Sequelize.UUID,
    field: 'parent_uuid',
  },
  communityUuid: {
    type: Sequelize.UUID,
    allowNull: false,
    field: 'community_uuid',
  },
  categoryUuid: {
    type: Sequelize.UUID,
    allowNull: false,
    field: 'category_uuid',
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    field: 'content',
  },
  viewCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    field: 'view_count',
  },
  attachmentUploadUuids: {
    type: Sequelize.STRING,
    field: 'attachment_upload_uuids',
  },
}, {
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 'conversation_posts',
});

export default ConversationPost;
