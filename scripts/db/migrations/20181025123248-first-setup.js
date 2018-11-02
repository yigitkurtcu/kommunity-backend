'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      [
        queryInterface.createTable('Communities',
          {
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
            name: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            tagline: {
              type: Sequelize.STRING,
            },
            desc: {
              type: Sequelize.TEXT,
              allowNull: false,
            },
            location: {
              type: Sequelize.STRING,
            },
            socialLinks: {
              type: Sequelize.JSON,
            },
            avatarUploadUuid: {
              type: Sequelize.UUID,
            },
            tier: {
              type: Sequelize.JSON,
              allowNull: false,
            },
            visibility: {
              type: Sequelize.ENUM('public', 'private', 'secret'),
              allowNull: false,
              defaultValue: 'public',
            },
            isActive: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: true,
            },
          }
        ).then(() => queryInterface.addIndex('Communities', [ 'name' ], { indicesType: 'UNIQUE' })),
        queryInterface.createTable('CommunityUsers',
          {
            communityUuid: {
              type: Sequelize.UUID,
              allowNull: false,
            },
            userUuid: {
              type: Sequelize.UUID,
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
            status: {
              type: Sequelize.ENUM('invited', 'applied', 'approved', 'banned'),
              allowNull: false,
            },
            role: {
              type: Sequelize.ENUM('guest', 'member', 'moderator', 'admin', 'owner'),
              allowNull: false,
            },
          }
        ).then(() => queryInterface.addIndex('CommunityUsers', [ 'communityUuid', 'userUuid' ], { indicesType: 'UNIQUE' })),
        queryInterface.createTable('ConversationCategories',
          {
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
            communityUuid: {
              type: Sequelize.UUID,
              allowNull: false,
            },
            userUuid: {
              type: Sequelize.UUID,
              allowNull: false,
            },
            name: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            visibility: {
              type: Sequelize.ENUM('public', 'private', 'secret'),
              allowNull: false,
            },
            minRoleRequired: {
              type: Sequelize.ENUM('guest', 'member', 'moderator', 'admin'),
              allowNull: false,
            },
          }
        ),
        queryInterface.createTable('ConversationPosts',
          {
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
              type: Sequelize.JSON,
            },
          }
        ),
        queryInterface.createTable('Uploads',
          {
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
          }
        ),
        queryInterface.createTable('Users',
          {
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
            email: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            passwordHash: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            firstName: {
              type: Sequelize.STRING,
            },
            lastName: {
              type: Sequelize.STRING,
            },
            attributes: {
              type: Sequelize.JSON,
            },
            location: {
              type: Sequelize.STRING,
            },
            avatarUploadUuid: {
              type: Sequelize.UUID,
            },
            lastSeenAt: {
              type: Sequelize.DATE,
            },
            confirmedEmailAt: {
              type: Sequelize.DATE,
            },
          }
        ).then(() => queryInterface.addIndex('Users', [ 'email' ], { indicesType: 'UNIQUE' })),
      ]
    );
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all(
      [
        queryInterface.dropTable('Communities'),
        queryInterface.dropTable('CommunityUsers'),
        queryInterface.dropTable('ConversationCategories'),
        queryInterface.dropTable('ConversationPosts'),
        queryInterface.dropTable('Uploads'),
        queryInterface.dropTable('Users'),
      ]
    )
  }
};
