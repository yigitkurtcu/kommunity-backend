import { sequelize } from '../clients/sequelize';
import { Community, CommunityUser, User } from '../models/sql';

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
        include: [{ model: User }],
        where: {
          uuid: {
            $in: uuids,
          },
        },
      });
    },

    searchCommunities: (obj: {}, args: {name: string}) => Community.findAll({
      include: [{ model: User }],
      where: {
        name: {
          $like: `%${args.name}%`,
        },
      },
    }),
  },
};
