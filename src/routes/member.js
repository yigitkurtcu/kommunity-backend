import express from 'express';
import passport from 'passport';
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/me', (req, res) => {
  return res.json(req.user);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user /* , info */) => {
    if (err) {
      return next(err);
    }


    if (!user) {
      return res.status(401).json({ code: 'unauthorized' });
    }

    return req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      let token = jwt.sign({ user: user }, app.get('superSecret'),{ expiresIn: '7 days' });

      return res.json({ user,token });
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.json({ success: true });
});

module.exports = router;
