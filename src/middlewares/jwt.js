import config from '../config';

const jwt = require('jsonwebtoken');

module.exports = {

  tokenControl: (req, res, next) => {
    if (req !== null && req.path !== '/login' && req.path !== '/test') {
      const token = req.body.token || req.headers['x-access-token'];

      // decode token
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, (err, decoded) => {
          if (err) {
            return res.status(401).json({ code: 'Failed to authenticate token.' });
          }
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          return next();
        });
      } else {
        // if there is no token
        // return an error
        return res.status(401).json({ code: 'No token provided.' });
      }
    } else { return next(); }
    return res.status(401).json({ code: 'Failed to authenticate token.' });
  },

};
