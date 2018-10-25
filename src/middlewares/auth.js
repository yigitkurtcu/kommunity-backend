import passport from 'passport';

const USERNAME_LOGIN_ROUTE = '/api/v1/member/login';

// TODO write unit test to ensure all endpoints are secured
export default (req: express$Request, res: express$Response, next: express$NextFunction) => {
  if (req.originalUrl === USERNAME_LOGIN_ROUTE) {
    return passport.authenticate('local', { session: false })(req, res, next);
  }
  return passport.authenticate('jwt', { session: false })(req, res, next);
};
