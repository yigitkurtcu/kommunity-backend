import Util from 'util';
import { get } from 'lodash';
import Strategy from 'passport-strategy';
import type App from '$/../lib/App';
import { getUserFromToken } from '$/../lib/Helpers';

const JwtStrategy = function JwtStrategy(secret: string) {
  Strategy.call(this);
  this.name = 'jwt';
  this.secret = secret;
};
JwtStrategy.prototype.authenticate = function authenticate(req: express$Request) {
  const token = get(req, 'body.token') || req.headers.authorization;
  return getUserFromToken(this.secret, token, (err, user) => {
    if (err) {
      return this.fail();
    }
    return this.success(user);
  });
};
Util.inherits(JwtStrategy, Strategy);
const PassportStrategy = (app: App) => {
  return new JwtStrategy(app.config.appServer.secrets.jwt);
};
module.exports = PassportStrategy;
