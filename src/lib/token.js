const jwt = require('jsonwebtoken');

export const getUserFromToken = (token: string, done: (err: boolean, token: ?string) => void) => {
  // TODO move secret to config
  jwt.verify(token, 'secret', (err, decodedObject) => {
    if (err) {
      return done(true);
    }

    return done(false, decodedObject.user);
  });
};

export const generateTokenForUser = (user: {}) => {
  return jwt.sign({
    user,
  // TODO move secret to config
  }, 'secret', { expiresIn: 60 * 60 * 24 * 24 });
};
