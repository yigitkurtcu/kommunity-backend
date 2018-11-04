import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

const CommunityUser = sequelize.define('CommunityUser', {
  communityUuid: {
    type: Sequelize.UUID,
    allowNull: false,
    field: 'community_uuid',
  },
  userUuid: {
    type: Sequelize.UUID,
    allowNull: false,
    field: 'user_uuid',
  },
  status: {
    type: Sequelize.ENUM('invited', 'applied', 'approved', 'banned'),
    allowNull: false,
    field: 'status',
  },
  role: {
    type: Sequelize.ENUM('guest', 'member', 'moderator', 'admin', 'owner'),
    allowNull: false,
    field: 'role',
  },
}, {
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 'community_users',
});

export default CommunityUser;
