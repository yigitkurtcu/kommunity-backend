import util from 'util';
import { get } from 'lodash';
import Strategy from 'passport-strategy';
import { getUserFromToken } from '../lib/token';

const UNAUTH_URLS = [
  '/health',
  '/member/login',
];

const JwtStrategy = function JwtStrategy() {
  Strategy.call(this);
  this.name = 'jwt';
};

JwtStrategy.prototype.authenticate = function authenticate(req: express$Request) {
  // TODO: authenticate request
  if (UNAUTH_URLS.indexOf(req.path) > -1) {
    return this.fail();
  }

  const token = get(req, 'body.token') || req.headers['x-access-token'];
  return getUserFromToken(token, (err, user) => {
    if (err) {
      return this.fail();
    }
    return this.success(user);
  });
};

util.inherits(JwtStrategy, Strategy);

const JwtPassportStrategy = () => {
  return new JwtStrategy();
};

export default JwtPassportStrategy;
