import lodash from 'lodash';
import md5 from 'md5';
import { Strategy as LocalStrategy } from 'passport-local';

const Sentry = require('@sentry/node');

const LocalPassportStrategy = (models) => {
  return new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }, async (email, password, done) => {
    try {
      const user = await models.User.findOne({
        where: {
          email,
          passwordHash: md5(password),
        },
      });

      if (user) {
        return done(null, lodash.pick(user, ['uuid', 'username', 'firstName', 'lastName']));
      }

      // eslint-disable-next-line no-empty
    } catch (ex) {
      Sentry.captureException(ex);
    }

    // couldn't find/authenticate the user
    return done(null, false);
  });
};

module.exports = LocalPassportStrategy;
