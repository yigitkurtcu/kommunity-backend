import Util from 'util';
import { get } from 'lodash';
import Strategy from 'passport-strategy';
import { getUserFromToken } from '$/passport-auth/lib';

const JwtStrategy = function JwtStrategy() {
  Strategy.call(this);
  this.name = 'jwt';
};

JwtStrategy.prototype.authenticate = function authenticate(req: exExpress$Request) {
  const token = get(req, 'body.token') || req.headers.authorization;
  return getUserFromToken(token, (err, user) => {
    if (err) {
      return this.fail();
    }
    return this.success(user);
  });
};

Util.inherits(JwtStrategy, Strategy);

const JwtPassportStrategy = () => {
  return new JwtStrategy();
};

module.exports = JwtPassportStrategy;
