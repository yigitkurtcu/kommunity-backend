import express from 'express';
import passport from 'passport';
import { generateTokenForUser } from '../lib/token';

const router = express.Router();

router.get('/me', passport.authenticate('jwt', { session: false }), (req: express$Request, res: express$Response) => {
  return res.json(req.user);
});

router.post('/login',
  passport.authenticate('local', { session: false }),
  (req: express$RenderCallback, res: express$Response) => {
    const { user } = req;
    return res.json({
      user,
      token: generateTokenForUser(user),
    });
  });

router.post('/logout', (req: express$Request, res: express$Response) => {
  req.logout();
  res.json({ success: true });
});

module.exports = router;
