import lodash from 'lodash';
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '../models/sql/user';

const LocalPassportStrategy = () => {
  return new LocalStrategy((username, password, done) => {
    User.findOne({
      where: {
        username,
        password,
      },
    }).then((user) => {
      if (!user) {
        return done(null, false);
      }

      return done(null, lodash.pick(user, ['uuid', 'username', 'firstname', 'lastname']));
    });
  });
};

export default LocalPassportStrategy;
