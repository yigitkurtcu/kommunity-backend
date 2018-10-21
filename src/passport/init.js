import passport from 'passport';
import LocalPassportStrategy from './local';
import JwtPassportStrategy from './jwt';

export const initializePassport = (app: express$Application) => {
  app.use(passport.initialize());
  passport.use(LocalPassportStrategy());
  passport.use(JwtPassportStrategy());
};
