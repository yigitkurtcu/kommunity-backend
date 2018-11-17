import type App from '$/lib/App';

export const getResolvers = (app: App) => {
  return {
    Query: {
      // returns communities with most members
      findPopularCommunities: async () => {
        // executing 2 queries here, can we do it in 1?
        const popularCommunities = await app.models.CommunityUser.findAll({
          group: ['community_uuid'],
          attributes: ['community_uuid', [app.sequelize.fn('COUNT', 'community_uuid'), 'count']],
          limit: 10,
          order: [[app.sequelize.literal('count'), 'DESC']],
        });
        const uuids = popularCommunities.map(community => community.community_uuid);
        return app.models.Community.findAll({
          include: [{ model: app.models.User }],
          where: {
            uuid: {
              $in: uuids,
            },
          },
        });
      },

      searchCommunities: (obj: {}, args: {name: string}) => app.models.Community.findAll({
        include: [{ model: app.models.User }],
        where: {
          name: {
            $like: `%${args.name}%`,
          },
        },
      }),
    },
  };
};
