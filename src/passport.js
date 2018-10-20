import lodash from 'lodash';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models/sql/user';
import config from './config';
const jwt = require('jsonwebtoken');


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
    
    const token = req.body.token || req.headers['x-access-token'];

    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, config.secret, (err, decoded) => {      

        if (err) {
          return res.status(401).json({ code: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(401).json({ code: 'No token provided.' });

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

        return done(null, lodash.pick(user, ['uuid', 'username', 'firstname', 'lastname']));
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
