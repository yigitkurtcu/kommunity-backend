import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/me', (req: express$Request, res: express$Response) => {
  return res.json(req.user);
});

router.post('/login', (req: express$RenderCallback, res: express$Response, next: express$NextFunction) => {
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

      return res.json({ user });
    });
  })(req, res, next);
});

router.post('/logout', (req: express$Request, res: express$Response) => {
  req.logout();
  res.json({ success: true });
});

module.exports = router;
