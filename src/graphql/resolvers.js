import Sequelize from 'sequelize';
import { sequelize } from '../clients/sequelize';
import { Community, CommunityUser } from '../models/sql';

export default {
  Query: {
    // returns communities with most members
    findPopularCommunities: async () => {
      // executing 2 queries here, can we do it in 1?
      const popularCommunities = await CommunityUser.findAll({
        group: ['community_uuid'],
        attributes: ['community_uuid', [sequelize.fn('COUNT', 'community_uuid'), 'count']],
        limit: 10,
        order: [[sequelize.literal('count'), 'DESC']],
      });
      const uuids = popularCommunities.map(community => community.community_uuid);
      return Community.findAll({
        where: {
          uuid: {
            [Sequelize.Op.in]: uuids,
          },
        },
      });
    },

    searchCommunities: (obj: {}, args: {name: string}) => Community.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${args.name}%`,
        },
      },
    }),
  },
};
