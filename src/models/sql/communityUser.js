import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

const CommunityUser = sequelize.define('CommunityUser', {
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
}, {
  paranoid: true,
});
// CommunityUser.prototype.associate = function associate(models) {
// };

export { CommunityUser };
