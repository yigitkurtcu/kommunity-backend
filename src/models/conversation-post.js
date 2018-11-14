import Sequelize, { type DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const ConversationPost = sequelize.define('ConversationPost', {
    uuid: {
      type: dataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
    },
    authorUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'author_uuid',
    },
    parentUuid: {
      type: dataTypes.UUID,
      field: 'parent_uuid',
    },
    communityUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'community_uuid',
    },
    categoryUuid: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'category_uuid',
    },
    content: {
      type: dataTypes.TEXT,
      allowNull: false,
      field: 'content',
    },
    viewCount: {
      type: dataTypes.INTEGER,
      defaultValue: 0,
      field: 'view_count',
    },
    attachmentUploadUuids: {
      type: dataTypes.STRING,
      field: 'attachment_upload_uuids',
    },
  }, {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'conversation_posts',
  });

  ConversationPost.associate = (models) => {
    ConversationPost.hasOne(models.ConversationPost, {
      as: 'parentPost',
      foreignKey: 'parentUuid',
    });
  };

  return ConversationPost;
};
