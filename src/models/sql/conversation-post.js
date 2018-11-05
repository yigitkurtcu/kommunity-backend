module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const ConversationPost = sequelize.define('ConversationPost', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'uuid',
    },
    authorUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'author_uuid',
    },
    parentUuid: {
      type: DataTypes.UUID,
      field: 'parent_uuid',
    },
    communityUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'community_uuid',
    },
    categoryUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'category_uuid',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'content',
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'view_count',
    },
    attachmentUploadUuids: {
      type: DataTypes.STRING,
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
