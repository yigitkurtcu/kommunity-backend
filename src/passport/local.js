import lodash from 'lodash';
import md5 from 'md5';
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '../models/sql/user';

const LocalPassportStrategy = () => {
  return new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({
        where: {
          email,
          password_hash: md5(password),
        },
      });
      if (user) {
        return done(null, lodash.pick(user, ['uuid', 'username', 'firstname', 'lastname']));
      }
      // eslint-disable-next-line no-empty
    } catch (ex) {}

    // couldn't find/authenticate the user
    return done(null, false);
  });
};

export default LocalPassportStrategy;
