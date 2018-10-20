import lodash from 'lodash';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models/sql/user';

const UNAUTH_URLS = [
  '/health',
  '/member/login',
];

export const initializePassport = (app:any) => {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    if (UNAUTH_URLS.indexOf(req.path) > -1) {
      return next();
    } if (req.isAuthenticated()) {
      return next();
    }

    return res.status(401).send({ code: 'unauthorized' }).end();

  });

  passport.use(new LocalStrategy(
    ((username, password, done) => {
      User.findOne({
        where: {
          username,
          password,
        },
      }).then((user) => {
        if (!user) {
          return done(null, false);
         }

        return done(null, lodash.pick(user, ['uuid', 'username', 'firstname', 'lastname','token']));
      });
    }),
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
