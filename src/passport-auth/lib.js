import jwt, { type VerifyCallback } from 'jsonwebtoken';
import config from '$/config';

export const getUserFromToken = (token: string, done: (err: boolean, token: ?string) => void) => {
  const cb: VerifyCallback = (err, decodedObject) => {
    if (err) {
      return done(true);
    }
    return done(false, decodedObject.user);
  };
  jwt.verify(token, config.server.secrets.jwt, cb);
};

export const generateTokenForUser = (user: {}) => {
  return jwt.sign({
    user,
  }, config.server.secrets.jwt, { expiresIn: 60 * 60 * 24 * 24 });
};
