import Sequelize from 'sequelize';
import { Community } from '../models/sql';

export default {
  Query: {
    findCommunityByName: (obj: {}, args: {name: string}) => Community.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${args.name}%`,
        },
      },
    }),
  },
};
